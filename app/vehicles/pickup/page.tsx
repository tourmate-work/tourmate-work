import type { Metadata } from "next";
import { VehicleTypeLandingView } from "@/components/vehicles/vehicle-type-landing";
import { PICKUP_CONFIG } from "@/lib/vehicle-types-config";
import { buildCanonical, buildOpenGraphMetadata } from "@/lib/seo-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: PICKUP_CONFIG.title,
  description: PICKUP_CONFIG.metaDesc,
  alternates: {
    canonical: buildCanonical("/vehicles/pickup"),
  },
  ...buildOpenGraphMetadata({
    title: PICKUP_CONFIG.title,
    description: PICKUP_CONFIG.metaDesc,
    path: "/vehicles/pickup",
    imageAlt: "Pickup Truck Rental Sri Lanka - Tourmate",
  }),
};

export default function PickupLandingPage() {
  return <VehicleTypeLandingView config={PICKUP_CONFIG} />;
}
