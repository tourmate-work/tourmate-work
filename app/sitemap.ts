import { MetadataRoute } from "next";
import { getAllActiveVehicleSlugs } from "@/lib/vehicles";

export const revalidate = 3600; // Regenerate sitemap at most every hour

const BASE_URL = "https://tourmate.lk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // 1. Core Public Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/vehicles`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/self-drive-vs-with-driver`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // 2. Dedicated Location Landing Routes
  const dedicatedLocationRoutes: MetadataRoute.Sitemap = [
    "colombo",
    "airport",
    "negombo",
    "wennapuwa",
  ].map((loc) => ({
    url: `${BASE_URL}/rentals/${loc}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Dedicated Vehicle Category Landing Routes
  const categoryRoutes: MetadataRoute.Sitemap = [
    "suv",
    "sedan",
    "minivan",
    "van",
    "pickup",
    "cabriolet",
  ].map((cat) => ({
    url: `${BASE_URL}/vehicles/${cat}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 4. Dynamic Active Vehicle Detail Pages from Database
  let vehicleRoutes: MetadataRoute.Sitemap = [];
  try {
    const activeVehicles = await getAllActiveVehicleSlugs();
    vehicleRoutes = activeVehicles.map((item) => ({
      url: `${BASE_URL}/vehicles/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (err) {
    console.error("Sitemap dynamic vehicle generation error:", err);
  }

  // Strictly excludes: /admin, /dashboard, /checkout, /account, /seller, /api
  return [
    ...staticRoutes,
    ...dedicatedLocationRoutes,
    ...categoryRoutes,
    ...vehicleRoutes,
  ];
}
