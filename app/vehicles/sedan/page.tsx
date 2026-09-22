import type { Metadata } from "next";
import { VehicleTypeLandingView } from "@/components/vehicles/vehicle-type-landing";
import { SEDAN_CONFIG } from "@/lib/vehicle-types-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: SEDAN_CONFIG.title,
  description: SEDAN_CONFIG.metaDesc,
  alternates: {
    canonical: "https://tourmate.lk/vehicles/sedan",
  },
  openGraph: {
    title: SEDAN_CONFIG.title,
    description: SEDAN_CONFIG.metaDesc,
    url: "https://tourmate.lk/vehicles/sedan",
    siteName: "Tourmate Rentals Sri Lanka",
    type: "website",
    locale: "en_LK",
    images: [
      {
        url: "https://tourmate.lk/images/hero-sri-lanka.jpg",
        width: 1200,
        height: 630,
        alt: "Sedan Car Rental Sri Lanka - Tourmate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEDAN_CONFIG.title,
    description: SEDAN_CONFIG.metaDesc,
  },
};

export default function SedanLandingPage() {
  return <VehicleTypeLandingView config={SEDAN_CONFIG} />;
}
