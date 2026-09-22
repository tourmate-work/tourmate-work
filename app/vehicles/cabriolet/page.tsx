import type { Metadata } from "next";
import { VehicleTypeLandingView } from "@/components/vehicles/vehicle-type-landing";
import { CABRIOLET_CONFIG } from "@/lib/vehicle-types-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: CABRIOLET_CONFIG.title,
  description: CABRIOLET_CONFIG.metaDesc,
  alternates: {
    canonical: "https://tourmate.lk/vehicles/cabriolet",
  },
  openGraph: {
    title: CABRIOLET_CONFIG.title,
    description: CABRIOLET_CONFIG.metaDesc,
    url: "https://tourmate.lk/vehicles/cabriolet",
    siteName: "Tourmate Rentals Sri Lanka",
    type: "website",
    locale: "en_LK",
    images: [
      {
        url: "https://tourmate.lk/images/hero-sri-lanka.jpg",
        width: 1200,
        height: 630,
        alt: "Cabriolet Rental Sri Lanka - Tourmate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: CABRIOLET_CONFIG.title,
    description: CABRIOLET_CONFIG.metaDesc,
  },
};

export default function CabrioletLandingPage() {
  return <VehicleTypeLandingView config={CABRIOLET_CONFIG} />;
}
