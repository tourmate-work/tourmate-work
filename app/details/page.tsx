import { permanentRedirect, redirect } from "next/navigation";
import { getVehicleBySlug } from "@/lib/vehicles";

interface DetailsPageProps {
  searchParams?: {
    car?: string;
    id?: string;
    location?: string;
  };
}

export const dynamic = "force-dynamic";

/**
 * 301 Permanent Redirect fallback from legacy /details?car=ID URLs
 * to the new SEO-optimized /vehicles/[slug] routes.
 */
export default async function LegacyDetailsRedirectPage({
  searchParams,
}: DetailsPageProps) {
  const carId = searchParams?.car || searchParams?.id;

  if (carId) {
    const vehicle = await getVehicleBySlug(carId);
    if (vehicle?.slug) {
      permanentRedirect(`/vehicles/${vehicle.slug}`);
    }
  }

  // Fallback if no specific vehicle was found or specified
  redirect("/vehicles");
}
