import type { Metadata } from "next";
import { VehicleTypeLandingView } from "@/components/vehicles/vehicle-type-landing";
import { VAN_CONFIG } from "@/lib/vehicle-types-config";
import { buildCanonical, buildOpenGraphMetadata } from "@/lib/seo-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: VAN_CONFIG.title,
  description: VAN_CONFIG.metaDesc,
  alternates: {
    canonical: buildCanonical("/vehicles/van"),
  },
  ...buildOpenGraphMetadata({
    title: VAN_CONFIG.title,
    description: VAN_CONFIG.metaDesc,
    path: "/vehicles/van",
    imageAlt: "Van Rental Sri Lanka - Tourmate",
  }),
};

export default function VanLandingPage() {
  return <VehicleTypeLandingView config={VAN_CONFIG} />;
}
