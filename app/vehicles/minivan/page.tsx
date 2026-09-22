import type { Metadata } from "next";
import { VehicleTypeLandingView } from "@/components/vehicles/vehicle-type-landing";
import { MINIVAN_CONFIG } from "@/lib/vehicle-types-config";
import { buildCanonical, buildOpenGraphMetadata } from "@/lib/seo-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: MINIVAN_CONFIG.title,
  description: MINIVAN_CONFIG.metaDesc,
  alternates: {
    canonical: buildCanonical("/vehicles/minivan"),
  },
  ...buildOpenGraphMetadata({
    title: MINIVAN_CONFIG.title,
    description: MINIVAN_CONFIG.metaDesc,
    path: "/vehicles/minivan",
    imageAlt: "Van Rental Sri Lanka - Tourmate",
  }),
};

export default function MinivanLandingPage() {
  return <VehicleTypeLandingView config={MINIVAN_CONFIG} />;
}
