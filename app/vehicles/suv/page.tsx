import type { Metadata } from "next";
import { VehicleTypeLandingView } from "@/components/vehicles/vehicle-type-landing";
import { SUV_CONFIG } from "@/lib/vehicle-types-config";
import { buildCanonical, buildOpenGraphMetadata } from "@/lib/seo-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: SUV_CONFIG.title,
  description: SUV_CONFIG.metaDesc,
  alternates: {
    canonical: buildCanonical("/vehicles/suv"),
  },
  ...buildOpenGraphMetadata({
    title: SUV_CONFIG.title,
    description: SUV_CONFIG.metaDesc,
    path: "/vehicles/suv",
    imageAlt: "SUV Rental Sri Lanka - Tourmate",
  }),
};

export default function SuvLandingPage() {
  return <VehicleTypeLandingView config={SUV_CONFIG} />;
}
