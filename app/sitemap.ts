import { MetadataRoute } from "next";
import { getAllActiveVehicleSlugs } from "@/lib/vehicles";

export const revalidate = 3600; // Regenerate sitemap at most every hour

const BASE_URL = "https://tourmate.lk";

// Top Sri Lanka rental destinations for dynamic discovery indexing
const SRI_LANKA_LOCATIONS = [
  "Colombo",
  "Katunayake",
  "Negombo",
  "Kandy",
  "Galle",
  "Nuwara Eliya",
  "Ella",
  "Bentota",
  "Mirissa",
  "Sigiriya",
];

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
  ];

  // 2. Sri Lanka Location Landing URLs
  const locationRoutes: MetadataRoute.Sitemap = SRI_LANKA_LOCATIONS.map((loc) => ({
    url: `${BASE_URL}/vehicles?location=${encodeURIComponent(loc)}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Dynamic Active Vehicle Detail Pages from Database
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
  return [...staticRoutes, ...locationRoutes, ...vehicleRoutes];
}
