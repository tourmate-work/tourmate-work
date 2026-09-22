import { prisma } from "@/lib/prisma";
import { resolveUniqueVehicleSlug, getVehicleSlug } from "@/lib/slug";
import type { VehicleDetail } from "@/components/details/details-view";

function isInvalidOrMockImage(url?: string | null): boolean {
  if (!url || typeof url !== "string") return true;
  const s = url.trim();
  if (!s || s.startsWith("blob:")) return true;
  if (s.includes("/images/mock/")) return true;
  if (
    s.includes("car-side.jpg") ||
    s.includes("car-fleet.jpg") ||
    s.includes("hero-sri-lanka.jpg")
  ) {
    return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformDbVehicleToDetail(v: any): VehicleDetail {
  let parsedGallery: string[] = [];
  let parsedFeatures: string[] = [];
  try {
    parsedGallery = JSON.parse(v.galleryImages || "[]");
  } catch {
    parsedGallery = [];
  }
  try {
    parsedFeatures = JSON.parse(v.features || "[]");
  } catch {
    parsedFeatures = [];
  }

  const cleanHero = !isInvalidOrMockImage(v.imageUrl) ? v.imageUrl : "";
  const cleanGallery = parsedGallery.filter((img) => !isInvalidOrMockImage(img));
  const thumbnails = cleanGallery.length > 0 ? cleanGallery : (cleanHero ? [cleanHero] : []);

  const equipment =
    parsedFeatures.length > 0
      ? parsedFeatures
      : [
          "Full Comprehensive Insurance",
          "Air Conditioning",
          "Touch Audio & Bluetooth",
          "Reverse Camera & Sensors",
          "24/7 Roadside Assistance",
        ];

  return {
    id: v.id,
    slug: v.slug || getVehicleSlug(v),
    name: v.name,
    brand: v.brand || v.name.split(" ")[0] || "Toyota",
    category: v.category,
    price: `LKR ${Number(v.pricePerDay).toLocaleString()}`,
    priceNum: Number(v.pricePerDay),
    period: "per day",
    type:
      v.category?.toLowerCase() === "suv" || v.category?.toLowerCase() === "van"
        ? v.category.toLowerCase()
        : "sedan",
    fuelCapacity: "60 Ltr",
    location: v.location || "Colombo",
    status: v.status || "Available",
    isAvailable: v.isAvailable !== false && v.status?.toLowerCase() !== "maintenance",
    year: v.year || 2022,
    specs: {
      gearBox: v.transmission || "Automatic",
      fuel: v.fuelType || "Petrol",
      doors: v.doors || 4,
      ac: "Yes",
      seats: v.seats || 5,
      distance: v.mileageLimit || "Unlimited",
    },
    equipment,
    thumbnails,
    rating: v.rating || 5.0,
    reviewsCount: v.reviewsCount || (v.reviews ? v.reviews.length : 0),
    reviews: Array.isArray(v.reviews)
      ? v.reviews.map((r: { id: string; userName: string; rating: number; comment: string; createdAt: Date }) => ({
          id: r.id,
          userName: r.userName,
          rating: r.rating,
          comment: r.comment,
          createdAt: new Date(r.createdAt).toISOString(),
        }))
      : [],
  };
}

/**
 * Fetch a single vehicle by slug (or fallback by ID) for server rendering and metadata.
 */
export async function getVehicleBySlug(slug: string): Promise<VehicleDetail | null> {
  if (!slug) return null;

  try {
    // 1. Try finding by unique slug
    let vehicle = await prisma.vehicle.findUnique({
      where: { slug },
      include: {
        reviews: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    // 2. Fallback: try finding by ID (e.g. legacy cuid link hitting /vehicles/ID)
    if (!vehicle) {
      vehicle = await prisma.vehicle.findUnique({
        where: { id: slug },
        include: {
          reviews: {
            orderBy: { createdAt: "desc" },
            take: 10,
          },
        },
      });
    }

    if (!vehicle) return null;

    // Self-healing: if vehicle has no slug in database, assign and persist it
    if (!vehicle.slug) {
      try {
        const generatedSlug = await resolveUniqueVehicleSlug(prisma, {
          id: vehicle.id,
          brand: vehicle.brand,
          model: vehicle.model,
          name: vehicle.name,
          year: vehicle.year,
          location: vehicle.location,
        });

        vehicle = await prisma.vehicle.update({
          where: { id: vehicle.id },
          data: { slug: generatedSlug },
          include: {
            reviews: {
              orderBy: { createdAt: "desc" },
              take: 10,
            },
          },
        });
      } catch (slugErr) {
        console.warn("Could not save backfilled slug:", slugErr);
      }
    }

    return transformDbVehicleToDetail(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle by slug:", error);
    return null;
  }
}

/**
 * Fetch 4-6 related vehicles for the "Similar vehicles" section on car details.
 */
export async function getRelatedVehicles(currentVehicleId: string, category?: string): Promise<VehicleDetail[]> {
  try {
    const raw = await prisma.vehicle.findMany({
      where: {
        id: { not: currentVehicleId },
        status: { not: "Maintenance" },
        isAvailable: true,
        ...(category ? { category: { equals: category, mode: "insensitive" } } : {}),
      },
      take: 6,
      orderBy: { isFeatured: "desc" },
    });

    // If fewer than 4 in same category, supplement with other available cars
    let pool = raw;
    if (pool.length < 4) {
      const extra = await prisma.vehicle.findMany({
        where: {
          id: {
            notIn: [currentVehicleId, ...pool.map((p) => p.id)],
          },
          status: { not: "Maintenance" },
          isAvailable: true,
        },
        take: 6 - pool.length,
        orderBy: { isFeatured: "desc" },
      });
      pool = [...pool, ...extra];
    }

    return pool.map(transformDbVehicleToDetail);
  } catch (err) {
    console.error("Error fetching related vehicles:", err);
    return [];
  }
}

/**
 * Get all active vehicle slugs for sitemap generation and static params.
 */
export async function getAllActiveVehicleSlugs(): Promise<
  Array<{ slug: string; updatedAt: Date }>
> {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        status: { not: "Maintenance" },
      },
      select: {
        id: true,
        slug: true,
        brand: true,
        model: true,
        name: true,
        year: true,
        location: true,
        updatedAt: true,
      },
    });

    const results: Array<{ slug: string; updatedAt: Date }> = [];

    for (const v of vehicles) {
      let finalSlug = v.slug;
      if (!finalSlug) {
        finalSlug = getVehicleSlug(v);
        // Persist in background
        prisma.vehicle
          .update({
            where: { id: v.id },
            data: { slug: finalSlug },
          })
          .catch(() => {});
      }
      results.push({
        slug: finalSlug,
        updatedAt: v.updatedAt,
      });
    }

    return results;
  } catch (error) {
    console.error("Error querying active vehicle slugs:", error);
    return [];
  }
}
