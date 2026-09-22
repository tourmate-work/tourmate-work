import type { Metadata } from "next";
import { VehicleTypeLandingView } from "@/components/vehicles/vehicle-type-landing";
import { SEDAN_CONFIG } from "@/lib/vehicle-types-config";
import { buildCanonical, buildOpenGraphMetadata } from "@/lib/seo-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: SEDAN_CONFIG.title,
  description: SEDAN_CONFIG.metaDesc,
  alternates: {
    canonical: buildCanonical("/vehicles/sedan"),
  },
  ...buildOpenGraphMetadata({
    title: SEDAN_CONFIG.title,
    description: SEDAN_CONFIG.metaDesc,
    path: "/vehicles/sedan",
    imageAlt: "Sedan Car Rental Sri Lanka - Tourmate",
  }),
};

export default function SedanLandingPage() {
  return <VehicleTypeLandingView config={SEDAN_CONFIG} />;
}
