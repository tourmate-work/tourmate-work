import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VehiclesCatalog } from "@/components/vehicles/vehicles-catalog";
import { LottieLoader } from "@/components/ui/lottie-loader";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, buildCanonical, buildOpenGraphMetadata } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Car Rental Sri Lanka - Browse Verified Vehicle Fleet | Tourmate",
  description:
    "Browse and book verified rental cars in Sri Lanka. Sedans, SUVs, luxury cars, convertibles, and minivans with comprehensive insurance and airport delivery.",
  alternates: {
    canonical: buildCanonical("/vehicles"),
  },
  ...buildOpenGraphMetadata({
    title: "Car Rental Sri Lanka - Browse Verified Vehicle Fleet | Tourmate",
    description:
      "Browse and book verified rental cars in Sri Lanka. Sedans, SUVs, luxury cars, convertibles, and minivans with comprehensive insurance and airport delivery.",
    path: "/vehicles",
  }),
};

export default function VehiclesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/vehicles#collection`,
        url: `${SITE_URL}/vehicles`,
        name: "Tourmate Rental Vehicle Fleet in Sri Lanka",
        description:
          "Browse our verified fleet of sedans, SUVs, vans, and convertibles available for self-drive rental across Sri Lanka.",
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
        },
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
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-slate-900 dark:text-white font-sans selection:bg-emerald-600 selection:text-white transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 py-4">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 py-12">
              <LottieLoader
                title="Loading TourMate Fleet..."
                subtitle="Fetching verified vehicles across Sri Lanka"
              />
            </div>
          }
        >
          <VehiclesCatalog />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
