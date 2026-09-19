const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DEFAULT_ASSETS = [
  {
    id: "home_hero",
    title: "Home Hero Main Background",
    description: "Primary visual behind the hero search widget on the home page",
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

async function main() {
  console.log("Setting up SiteAsset table in database...");
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "SiteAsset" (
      "id" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "description" TEXT,
      "section" TEXT NOT NULL,
      "url" TEXT NOT NULL,
      "fallbackUrl" TEXT NOT NULL,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "SiteAsset_pkey" PRIMARY KEY ("id")
    );
  `);
  console.log("SiteAsset table ensured.");

  console.log("Seeding default site assets...");
  for (const asset of DEFAULT_ASSETS) {
    const existing = await prisma.siteAsset.findUnique({ where: { id: asset.id } });
    if (!existing) {
      await prisma.siteAsset.create({ data: asset });
      console.log(`Created asset: ${asset.id} (${asset.title})`);
    } else {
      console.log(`Asset already exists: ${asset.id}`);
    }
  }
  console.log("Site assets setup complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
