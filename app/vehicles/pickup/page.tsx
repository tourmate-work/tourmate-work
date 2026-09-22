import type { Metadata } from "next";
import { VehicleTypeLandingView } from "@/components/vehicles/vehicle-type-landing";
import { PICKUP_CONFIG } from "@/lib/vehicle-types-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: PICKUP_CONFIG.title,
  description: PICKUP_CONFIG.metaDesc,
  alternates: {
    canonical: "https://tourmate.lk/vehicles/pickup",
  },
  openGraph: {
    title: PICKUP_CONFIG.title,
    description: PICKUP_CONFIG.metaDesc,
    url: "https://tourmate.lk/vehicles/pickup",
    siteName: "Tourmate Rentals Sri Lanka",
    type: "website",
    locale: "en_LK",
    images: [
      {
        url: "https://tourmate.lk/images/hero-sri-lanka.jpg",
        width: 1200,
        height: 630,
        alt: "Pickup Truck Rental Sri Lanka - Tourmate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PICKUP_CONFIG.title,
    description: PICKUP_CONFIG.metaDesc,
  },
};

export default function PickupLandingPage() {
  return <VehicleTypeLandingView config={PICKUP_CONFIG} />;
}
