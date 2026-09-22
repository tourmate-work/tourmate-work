import type { Metadata } from "next";
import { VehicleTypeLandingView } from "@/components/vehicles/vehicle-type-landing";
import { CABRIOLET_CONFIG } from "@/lib/vehicle-types-config";
import { buildCanonical, buildOpenGraphMetadata } from "@/lib/seo-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: CABRIOLET_CONFIG.title,
  description: CABRIOLET_CONFIG.metaDesc,
  alternates: {
    canonical: buildCanonical("/vehicles/cabriolet"),
  },
  ...buildOpenGraphMetadata({
    title: CABRIOLET_CONFIG.title,
    description: CABRIOLET_CONFIG.metaDesc,
    path: "/vehicles/cabriolet",
    imageAlt: "Cabriolet Rental Sri Lanka - Tourmate",
  }),
};

export default function CabrioletLandingPage() {
  return <VehicleTypeLandingView config={CABRIOLET_CONFIG} />;
}
