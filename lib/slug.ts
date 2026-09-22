/**
 * Utility functions for generating and resolving SEO-friendly vehicle URL slugs.
 * Format: [make]-[model]-[year]-[location] (e.g. "toyota-aqua-2022-colombo")
 */

import type { PrismaClient } from "@prisma/client";

/**
 * Standardize text into an alphanumeric, lowercase, hyphenated slug segment.
 */
export function slugify(text: string): string {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric except space and hyphen
    .replace(/[\s_]+/g, "-") // Replace spaces/underscores with hyphens
    .replace(/-+/g, "-") // Replace consecutive hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
}

/**
 * Extract clean, concise city/location slug segment from raw location strings.
 * e.g. "Bandaranaike Int'l Airport (CMB) / Katunayake" -> "katunayake"
 * e.g. "Colombo / Katunayake Airport" -> "colombo"
 */
export function cleanLocationForSlug(rawLocation?: string | null): string {
  if (!rawLocation) return "sri-lanka";
  
  // Prefer secondary part if primary is lengthy airport description, or clean primary
  const parts = rawLocation.split("/").map((p) => p.trim());
  let target = parts[0];
  
  // If first part is airport code, and second is a city, e.g. "Bandaranaike Int'l Airport (CMB) / Katunayake"
  if (parts.length > 1 && parts[0].toLowerCase().includes("airport") && parts[1]) {
    target = parts[1];
  }

  // Strip parentheses like (CMB)
  target = target.replace(/\([^)]*\)/g, "");
  // Strip common noisy words
  target = target.replace(/\b(int'l|international|district|province|city)\b/gi, "");

  const cleaned = slugify(target);
  return cleaned || "sri-lanka";
}

export interface VehicleSlugInput {
  id?: string;
  brand?: string | null;
  model?: string | null;
  name?: string | null;
  year?: number | null;
  location?: string | null;
}

/**
 * Generates the human-readable base slug: make-model-year-location
 * e.g. "toyota-aqua-2022-colombo"
 */
export function generateBaseVehicleSlug(car: VehicleSlugInput): string {
  const brand = car.brand ? slugify(car.brand) : (car.name ? slugify(car.name.split(" ")[0]) : "car");
  
  let modelStr = car.model || car.name || "vehicle";
  // Avoid repeating brand in model if name has "Toyota Aqua"
  if (car.brand && modelStr.toLowerCase().startsWith(car.brand.toLowerCase())) {
    modelStr = modelStr.slice(car.brand.length).trim();
  }
  const model = slugify(modelStr) || "model";

  const year = car.year ? String(car.year) : "";
  const location = cleanLocationForSlug(car.location);

  const segments = [brand, model, year, location].filter(Boolean);
  return segments.join("-");
}

/**
 * Returns deterministic last 6 characters of cuid as collision suffix.
 */
export function getSlugSuffixFromId(id: string): string {
  if (!id) return "";
  const cleanId = id.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleanId.slice(-6);
}

/**
 * Derives a fallback slug for a vehicle in-memory (e.g. for components).
 */
export function getVehicleSlug(car: VehicleSlugInput): string {
  const base = generateBaseVehicleSlug(car);
  return base;
}

/**
 * Resolves a guaranteed-unique vehicle slug against the Prisma database.
 * If two vehicles share the same make/model/year/location:
 * Appends the last 6 characters of the cuid (e.g. toyota-aqua-2022-colombo-3z7l3x).
 */
export async function resolveUniqueVehicleSlug(
  prismaClient: PrismaClient,
  car: VehicleSlugInput,
  existingVehicleId?: string
): Promise<string> {
  const baseSlug = generateBaseVehicleSlug(car);
  const targetId = car.id || existingVehicleId;

  // 1. Check if baseSlug is available or already held by this car
  const existingWithBase = await prismaClient.vehicle.findFirst({
    where: {
      slug: baseSlug,
      ...(targetId ? { id: { not: targetId } } : {}),
    },
    select: { id: true },
  });

  if (!existingWithBase) {
    return baseSlug;
  }

  // 2. Collision detected: append last 6 characters of the cuid
  const cuidSuffix = targetId ? getSlugSuffixFromId(targetId) : "";
  if (cuidSuffix) {
    const candidateSlugWithCuid = `${baseSlug}-${cuidSuffix}`;
    const existingWithCuid = await prismaClient.vehicle.findFirst({
      where: {
        slug: candidateSlugWithCuid,
        ...(targetId ? { id: { not: targetId } } : {}),
      },
      select: { id: true },
    });

    if (!existingWithCuid) {
      return candidateSlugWithCuid;
    }
  }

  // 3. Counter fallback (e.g. toyota-aqua-2022-colombo-2) in extreme edge cases
  let counter = 2;
  while (counter <= 50) {
    const candidateWithCounter = cuidSuffix
      ? `${baseSlug}-${cuidSuffix}-${counter}`
      : `${baseSlug}-${counter}`;

    const existingWithCounter = await prismaClient.vehicle.findFirst({
      where: {
        slug: candidateWithCounter,
        ...(targetId ? { id: { not: targetId } } : {}),
      },
      select: { id: true },
    });

    if (!existingWithCounter) {
      return candidateWithCounter;
    }
    counter++;
  }

  // Fallback timestamp if 50 collisions
  return `${baseSlug}-${Date.now()}`;
}
