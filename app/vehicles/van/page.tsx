import type { Metadata } from "next";
import { VehicleTypeLandingView } from "@/components/vehicles/vehicle-type-landing";
import { VAN_CONFIG } from "@/lib/vehicle-types-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: VAN_CONFIG.title,
  description: VAN_CONFIG.metaDesc,
  alternates: {
    canonical: "https://tourmate.lk/vehicles/van",
  },
  openGraph: {
    title: VAN_CONFIG.title,
    description: VAN_CONFIG.metaDesc,
    url: "https://tourmate.lk/vehicles/van",
    siteName: "Tourmate Rentals Sri Lanka",
    type: "website",
    locale: "en_LK",
    images: [
      {
        url: "https://tourmate.lk/images/hero-sri-lanka.jpg",
        width: 1200,
        height: 630,
        alt: "Van Rental Sri Lanka - Tourmate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: VAN_CONFIG.title,
    description: VAN_CONFIG.metaDesc,
  },
};

export default function VanLandingPage() {
  return <VehicleTypeLandingView config={VAN_CONFIG} />;
}
