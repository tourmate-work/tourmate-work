import type { Metadata } from "next";
import { VehicleTypeLandingView } from "@/components/vehicles/vehicle-type-landing";
import { SUV_CONFIG } from "@/lib/vehicle-types-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: SUV_CONFIG.title,
  description: SUV_CONFIG.metaDesc,
  alternates: {
    canonical: "https://tourmate.lk/vehicles/suv",
  },
  openGraph: {
    title: SUV_CONFIG.title,
    description: SUV_CONFIG.metaDesc,
    url: "https://tourmate.lk/vehicles/suv",
    siteName: "Tourmate Rentals Sri Lanka",
    type: "website",
    locale: "en_LK",
    images: [
      {
        url: "https://tourmate.lk/images/hero-sri-lanka.jpg",
        width: 1200,
        height: 630,
        alt: "SUV Rental Sri Lanka - Tourmate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SUV_CONFIG.title,
    description: SUV_CONFIG.metaDesc,
  },
};

export default function SuvLandingPage() {
  return <VehicleTypeLandingView config={SUV_CONFIG} />;
}
