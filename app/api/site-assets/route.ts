import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface DefaultSiteAsset {
  id: string;
  title: string;
  description: string;
  section: string;
  url: string;
  fallbackUrl: string;
}

const DEFAULT_SITE_ASSETS: DefaultSiteAsset[] = [
  {
    id: "home_hero",
    title: "Home Hero Main Background",
    description: "Primary visual graphic behind the hero search widget on the home page",
    section: "Home Page",
    url: "/images/hero-sri-lanka.png",
    fallbackUrl: "/images/hero-sri-lanka.png",
  },
  {
    id: "home_why_choose_us",
    title: "Why Choose Us Fleet Showcase",
    description: "Showcase fleet photo in the Why Choose Tourmate section on the home page",
    section: "Home Page",
    url: "/images/car-fleet.jpg",
    fallbackUrl: "/images/car-fleet.jpg",
  },
  {
    id: "about_hero",
    title: "About Us Story & Video Banner",
    description: "Top scenic road trip video preview banner on the About page",
    section: "About Page",
    url: "/images/hero-sri-lanka.jpg",
    fallbackUrl: "/images/hero-sri-lanka.jpg",
  },
  {
    id: "about_fleet",
    title: "About Page Fleet Standards",
    description: "Fleet standards and customer experience photo on the About page",
    section: "About Page",
    url: "/images/car-fleet.jpg",
    fallbackUrl: "/images/car-fleet.jpg",
  },
  {
    id: "about_mission",
    title: "About Page Driven by Excellence",
    description: "Vehicle showcase in the Driven by Excellence section on the About page",
    section: "About Page",
    url: "/images/car-side.jpg",
    fallbackUrl: "/images/car-side.jpg",
  },
  {
    id: "contact_showcase",
    title: "Contact Us Showcase Banner",
    description: "Scenic fleet showcase banner on the Contact page beside the message form",
    section: "Contact Page",
    url: "/images/hero-sri-lanka.jpg",
    fallbackUrl: "/images/hero-sri-lanka.jpg",
  },
  {
    id: "logo_dark",
    title: "Transparent Header Logo",
    description: "Site brand logo used on dark headers, hero sections, and transparent navigation bars",
    section: "Branding & Logos",
    url: "/images/logo-transparent.png",
    fallbackUrl: "/images/logo-transparent.png",
  },
  {
    id: "logo_light",
    title: "Light / Scrolled Header Logo",
    description: "Site brand logo used when navigation bar is scrolled down with white background",
    section: "Branding & Logos",
    url: "/images/logo-white-bg.png",
    fallbackUrl: "/images/logo-white-bg.png",
  },
  {
    id: "logo_footer",
    title: "Footer Brand Logo",
    description: "Site brand logo in the footer section across all pages",
    section: "Branding & Logos",
    url: "/images/logo.png",
    fallbackUrl: "/images/logo.png",
  },
];

export async function GET() {
  try {
    const assets = await prisma.siteAsset.findMany({
      orderBy: { id: "asc" },
    });

    // Ensure all default assets exist in the database
    if (assets.length < DEFAULT_SITE_ASSETS.length) {
      const existingIds = new Set(assets.map((a) => a.id));
      for (const def of DEFAULT_SITE_ASSETS) {
        if (!existingIds.has(def.id)) {
          const created = await prisma.siteAsset.create({ data: def });
          assets.push(created);
        }
      }
    }

    const assetsMap: Record<string, string> = {};
    for (const a of assets) {
      assetsMap[a.id] = a.url;
    }

    return NextResponse.json({
      success: true,
      assets,
      assetsMap,
    });
  } catch (error) {
    console.error("Fetch site assets error:", error);
    // Fallback gracefully to hardcoded defaults
    const assetsMap: Record<string, string> = {};
    for (const def of DEFAULT_SITE_ASSETS) {
      assetsMap[def.id] = def.url;
    }
    return NextResponse.json({
      success: true,
      assets: DEFAULT_SITE_ASSETS,
      assetsMap,
      fallback: true,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    // Single item update: { id: string, url: string }
    if (body.id && body.url) {
      const { id, url } = body;
      const updated = await prisma.siteAsset.upsert({
        where: { id },
        update: { url: url.trim() },
        create: {
          id,
          title: body.title || id,
          section: body.section || "General",
          url: url.trim(),
          fallbackUrl: body.fallbackUrl || url.trim(),
        },
      });

      return NextResponse.json({
        success: true,
        message: "Site asset updated successfully",
        asset: updated,
      });
    }

    // Bulk update: { updates: Array<{ id: string, url: string }> }
    if (Array.isArray(body.updates)) {
      const results = [];
      for (const item of body.updates) {
        if (item.id && item.url) {
          const updated = await prisma.siteAsset.update({
            where: { id: item.id },
            data: { url: item.url.trim() },
          });
          results.push(updated);
        }
      }

      return NextResponse.json({
        success: true,
        message: `Updated ${results.length} site assets`,
        assets: results,
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid payload: 'id' and 'url' or 'updates' array required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Update site asset error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update site asset" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, id } = body;

    if (action === "reset") {
      if (id) {
        // Reset single asset to fallbackUrl
        const asset = await prisma.siteAsset.findUnique({ where: { id } });
        if (!asset) {
          return NextResponse.json({ success: false, error: "Asset not found" }, { status: 404 });
        }
        const updated = await prisma.siteAsset.update({
          where: { id },
          data: { url: asset.fallbackUrl },
        });
        return NextResponse.json({
          success: true,
          message: `Asset ${id} reset to default`,
          asset: updated,
        });
      } else {
        // Reset ALL assets to fallbackUrl
        const assets = await prisma.siteAsset.findMany();
        for (const a of assets) {
          await prisma.siteAsset.update({
            where: { id: a.id },
            data: { url: a.fallbackUrl },
          });
        }
        return NextResponse.json({
          success: true,
          message: "All site assets reset to default fallbacks",
        });
      }
    }

    return NextResponse.json(
      { success: false, error: "Unknown action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Site assets action error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to execute site assets action" },
      { status: 500 }
    );
  }
}
