import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VehicleDetailView } from "@/components/vehicles/vehicle-detail-view";
import {
  getVehicleBySlug,
  getRelatedVehicles,
  getAllActiveVehicleSlugs,
  cleanLocationName,
} from "@/lib/vehicles";

import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  buildCanonical,
} from "@/lib/seo-config";

interface VehiclePageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 60; // Revalidate dynamic page data every 60 seconds

export async function generateStaticParams() {
  const activeSlugs = await getAllActiveVehicleSlugs();
  return activeSlugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: VehiclePageProps): Promise<Metadata> {
  const vehicle = await getVehicleBySlug(params.slug);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | Tourmate Rentals Sri Lanka",
      description: "The requested rental vehicle could not be found in our fleet.",
      robots: { index: false, follow: false },
    };
  }

  const primaryLoc = cleanLocationName(vehicle.location);
  const fullName = vehicle.name.toLowerCase().startsWith(vehicle.brand.toLowerCase())
    ? vehicle.name
    : `${vehicle.brand} ${vehicle.name}`;
  const yearStr = vehicle.year ? `${vehicle.year} ` : "";

  const title = `Rent a ${yearStr}${fullName} in ${primaryLoc} | Tourmate Rentals`;
  const description = `Rent a ${yearStr}${fullName} in ${primaryLoc}, Sri Lanka. Self-drive car rental with full comprehensive insurance, verified maintenance & 24/7 delivery. Daily rate: ${vehicle.price} ${vehicle.period}.`;
  const canonicalUrl = buildCanonical(`/vehicles/${vehicle.slug}`);
  const mainImage =
    vehicle.thumbnails && vehicle.thumbnails.length > 0
      ? vehicle.thumbnails[0]
      : DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_LK",
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 630,
          alt: `${vehicle.name} - Tourmate Car Rental Sri Lanka`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [mainImage],
    },
  };
}

export default async function VehicleDetailPage({ params }: VehiclePageProps) {
  const vehicle = await getVehicleBySlug(params.slug);

  if (!vehicle) {
    notFound();
  }

  // Canonical redirect: If user accessed by raw CUID ID instead of the slug, 301 redirect to canonical slug URL
  if (vehicle.slug && params.slug !== vehicle.slug) {
    permanentRedirect(`/vehicles/${vehicle.slug}`);
  }

  const relatedVehicles = await getRelatedVehicles(
    vehicle.id,
    vehicle.category
  );

  const mainImageUrl =
    vehicle.thumbnails && vehicle.thumbnails.length > 0
      ? vehicle.thumbnails[0]
      : DEFAULT_OG_IMAGE;

  const vehicleDisplayName = `${vehicle.year ? `${vehicle.year} ` : ""}${vehicle.brand} ${vehicle.name}`;

  // Schema.org JSON-LD Structured Data: Car, Product, and BreadcrumbList schemas
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Car",
        "@id": `${SITE_URL}/vehicles/${vehicle.slug}#car`,
        name: vehicleDisplayName,
        brand: {
          "@type": "Brand",
          name: vehicle.brand,
        },
        model: vehicle.name,
        ...(vehicle.year ? { vehicleModelDate: String(vehicle.year) } : {}),
        bodyType: vehicle.category,
        numberOfDoors: vehicle.specs?.doors || 4,
        seatingCapacity: vehicle.specs?.seats || 5,
        vehicleTransmission: vehicle.specs?.gearBox || "Automatic",
        fuelType: vehicle.specs?.fuel || "Petrol",
        image: mainImageUrl,
        description: `Rent a ${vehicle.brand} ${vehicle.name} in ${vehicle.location} with full comprehensive insurance.`,
        offers: {
          "@type": "Offer",
          price: vehicle.priceNum,
          priceCurrency: "LKR",
          availability: vehicle.isAvailable
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url: `${SITE_URL}/vehicles/${vehicle.slug}`,
          priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        },
        ...(vehicle.reviewsCount && vehicle.reviewsCount > 0 && vehicle.rating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: vehicle.rating,
                reviewCount: vehicle.reviewsCount,
                bestRating: 5,
                worstRating: 1,
              },
            }
          : {}),
      },
      {
        "@type": "Product",
        "@id": `${SITE_URL}/vehicles/${vehicle.slug}#product`,
        name: vehicleDisplayName,
        image: mainImageUrl,
        description: `Rent a ${vehicle.name} in ${vehicle.location} from Tourmate Rentals Sri Lanka.`,
        brand: {
          "@type": "Brand",
          name: vehicle.brand,
        },
        offers: {
          "@type": "Offer",
          price: vehicle.priceNum,
          priceCurrency: "LKR",
          availability: vehicle.isAvailable
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url: `${SITE_URL}/vehicles/${vehicle.slug}`,
        },
        ...(vehicle.reviewsCount && vehicle.reviewsCount > 0 && vehicle.rating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: vehicle.rating,
                reviewCount: vehicle.reviewsCount,
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Vehicles",
            item: `${SITE_URL}/vehicles`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: vehicleDisplayName,
            item: `${SITE_URL}/vehicles/${vehicle.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-slate-900 dark:text-white font-sans selection:bg-emerald-600 selection:text-white transition-colors duration-300">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <VehicleDetailView
          initialVehicle={vehicle}
          otherVehicles={relatedVehicles}
        />
      </main>
      <Footer />
    </div>
  );
}
