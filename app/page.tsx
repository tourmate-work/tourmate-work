import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturePillars } from "@/components/home/feature-pillars";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { FleetSection } from "@/components/home/fleet-section";
import { SelfDriveVsDriverSection } from "@/components/home/self-drive-vs-driver-section";
import { StatsSection } from "@/components/home/stats-section";
import { VehicleOwnerSection } from "@/components/home/vehicle-owner-cta";
import { PopularSearches } from "@/components/home/popular-searches";
import { SITE_URL, SITE_NAME, buildCanonical, buildOpenGraphMetadata } from "@/lib/seo-config";
import { SITE_CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Car Rental in Sri Lanka | Self Drive & Airport Car Hire | Tourmate",
  description:
    "Rent self-drive and verified cars in Sri Lanka with Tourmate. Free airport delivery at CMB, comprehensive insurance, unlimited mileage, and 24/7 road assistance.",
  alternates: {
    canonical: buildCanonical("/"),
  },
  ...buildOpenGraphMetadata({
    title: "Car Rental in Sri Lanka | Self Drive & Airport Car Hire | Tourmate",
    description:
      "Rent self-drive and verified cars in Sri Lanka with Tourmate. Free airport delivery at CMB, comprehensive insurance, unlimited mileage, and 24/7 road assistance.",
    path: "/",
  }),
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
          "Sri Lanka's trusted verified self-drive car rental and airport vehicle hire service.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/vehicles?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "AutoRental",
        "@id": `${SITE_URL}#autorental`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        image: `${SITE_URL}/images/hero-sri-lanka.jpg`,
        description:
          "Verified self-drive car rental in Sri Lanka. Wide fleet of sedans, SUVs, and passenger vans with full insurance and airport delivery.",
        telephone: SITE_CONTACT.phone,
        priceRange: "LKR 8,000 - 35,000 per day",
        paymentAccepted: "Cash, Credit Card, Bank Transfer",
        currenciesAccepted: "LKR, USD, EUR, GBP",
        areaServed: {
          "@type": "Country",
          name: "Sri Lanka",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "LK",
          addressRegion: "Western Province",
          addressLocality: "Colombo",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Top Header Navigation */}
      <Header />

      {/* Main Landing Content */}
      <main className="flex-1 space-y-4">
        {/* 1. Hero Section with Booking Widget */}
        <HeroSection />

        {/* 2. Three Feature Pillars (Availability, Comfort, Savings) */}
        <FeaturePillars />

        {/* 3. How It Works (3 Steps) */}
        <WhyChooseUs />

        {/* 4. Car Selection Grid (Choose the car that suits you) */}
        <FleetSection />

        {/* 5. Self-Drive vs Driver-Driven Choice */}
        <SelfDriveVsDriverSection />

        {/* 6. Facts In Numbers Stats */}
        <StatsSection />

        {/* 7. Vehicle Owner Section (Have a Vehicle You Want to Rent Out?) */}
        <VehicleOwnerSection />

        {/* 8. Top Rental Locations & Vehicle Categories Internal Links */}
        <PopularSearches />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
