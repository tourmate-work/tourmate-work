import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface CacheEntry {
  data: FormattedLocation[];
  timestamp: number;
}

export interface FormattedLocation {
  id: string;
  name: string;
  displayName: string;
  subtext: string;
  city?: string;
  district?: string;
  province?: string;
  lat?: string;
  lon?: string;
}

// Built-in Sri Lanka presets for instant fallback if external network is slow
const SRI_LANKA_PRESETS = [
  { name: "Bandaranaike Int'l Airport (CMB)", subtext: "Katunayake, Gampaha District, Western Province", city: "Katunayake", district: "Gampaha", province: "Western Province" },
  { name: "Colombo Fort / Pettah", subtext: "Commercial Capital, Colombo District, Western Province", city: "Colombo", district: "Colombo", province: "Western Province" },
  { name: "Colombo 03 (Colpetty / Kollupitiya)", subtext: "Galle Face & Marine Drive, Colombo District", city: "Colombo", district: "Colombo", province: "Western Province" },
  { name: "Colombo 07 (Cinnamon Gardens)", subtext: "Viharamahadevi Park, Colombo District", city: "Colombo", district: "Colombo", province: "Western Province" },
  { name: "Negombo Beach / Porutota", subtext: "Gampaha District, Western Province", city: "Negombo", district: "Gampaha", province: "Western Province" },
  { name: "Kandy City Center", subtext: "Temple of the Tooth, Kandy District, Central Province", city: "Kandy", district: "Kandy", province: "Central Province" },
  { name: "Nuwara Eliya (Little England)", subtext: "Nuwara Eliya District, Central Province", city: "Nuwara Eliya", district: "Nuwara Eliya", province: "Central Province" },
  { name: "Ella (Nine Arch Bridge)", subtext: "Badulla District, Uva Province", city: "Ella", district: "Badulla", province: "Uva Province" },
  { name: "Galle Fort / Unawatuna", subtext: "Galle District, Southern Province", city: "Galle", district: "Galle", province: "Southern Province" },
  { name: "Bentota / Beruwala", subtext: "Galle District, Southern Province", city: "Bentota", district: "Galle", province: "Southern Province" },
  { name: "Hikkaduwa Coral Reef", subtext: "Galle District, Southern Province", city: "Hikkaduwa", district: "Galle", province: "Southern Province" },
  { name: "Mirissa Beach / Coconut Tree Hill", subtext: "Matara District, Southern Province", city: "Mirissa", district: "Matara", province: "Southern Province" },
  { name: "Weligama Bay", subtext: "Matara District, Southern Province", city: "Weligama", district: "Matara", province: "Southern Province" },
  { name: "Tangalle / Hiriketiya", subtext: "Hambantota District, Southern Province", city: "Tangalle", district: "Hambantota", province: "Southern Province" },
  { name: "Sigiriya (Lion Rock Fortress)", subtext: "Matale District, Central Province", city: "Sigiriya", district: "Matale", province: "Central Province" },
  { name: "Dambulla (Cave Temple)", subtext: "Matale District, Central Province", city: "Dambulla", district: "Matale", province: "Central Province" },
  { name: "Anuradhapura Sacred City", subtext: "Anuradhapura District, North Central Province", city: "Anuradhapura", district: "Anuradhapura", province: "North Central Province" },
  { name: "Trincomalee / Nilaveli", subtext: "Trincomalee District, Eastern Province", city: "Trincomalee", district: "Trincomalee", province: "Eastern Province" },
  { name: "Arugam Bay", subtext: "Ampara District, Eastern Province", city: "Arugam Bay", district: "Ampara", province: "Eastern Province" },
  { name: "Jaffna Town / Fort", subtext: "Jaffna District, Northern Province", city: "Jaffna", district: "Jaffna", province: "Northern Province" },
];

function getFallbackMatches(q: string): FormattedLocation[] {
  const lower = q.toLowerCase();
  return SRI_LANKA_PRESETS.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.subtext.toLowerCase().includes(lower) ||
      p.city.toLowerCase().includes(lower)
  ).map((p, idx) => ({
    id: `preset-${idx}`,
    name: p.name,
    displayName: `${p.name}, ${p.subtext}, Sri Lanka`,
    subtext: p.subtext,
    city: p.city,
    district: p.district,
    province: p.province,
  }));
}

// Simple in-memory cache to respect Nominatim usage policy & deliver sub-millisecond responses for repeated queries
const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("q") || "").trim();

    if (!query || query.length < 2) {
      return NextResponse.json({ success: true, locations: [] });
    }

    const normalizedKey = query.toLowerCase();

    // Check cache
    const cached = cache.get(normalizedKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        success: true,
        locations: cached.data,
        source: "cache",
      });
    }

    // Call OpenStreetMap Nominatim with strict Sri Lanka bounds (countrycodes=lk)
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&countrycodes=lk&addressdetails=1&limit=8`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    let rawData: unknown[] = [];
    try {
      const response = await fetch(nominatimUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Tourmate-CarRental-SriLanka/1.0 (info@tourmate.lk)",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const json = await response.json();
        if (Array.isArray(json)) {
          rawData = json;
        }
      }
    } catch (fetchErr) {
      console.warn("Nominatim fetch warning:", fetchErr instanceof Error ? fetchErr.message : fetchErr);
    } finally {
      clearTimeout(timeoutId);
    }

    // If Nominatim returned no results or timed out, fall back to matching our curated Sri Lanka database
    if (rawData.length === 0) {
      const fallbacks = getFallbackMatches(query);
      if (fallbacks.length > 0) {
        return NextResponse.json({
          success: true,
          locations: fallbacks,
          source: "presets",
        });
      }
      return NextResponse.json({ success: true, locations: [] });
    }

    // Format OpenStreetMap results
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatted: FormattedLocation[] = rawData.map((item: any) => {
      const addr = item.address || {};
      const primaryName =
        item.name ||
        addr.tourism ||
        addr.road ||
        addr.suburb ||
        addr.city ||
        addr.town ||
        addr.village ||
        item.display_name.split(",")[0].trim();

      // Build clean secondary address line
      const parts: string[] = [];
      if (addr.road && addr.road !== primaryName) parts.push(addr.road);
      if (addr.suburb && addr.suburb !== primaryName) parts.push(addr.suburb);
      if (addr.city || addr.town || addr.village) {
        const c = addr.city || addr.town || addr.village;
        if (c !== primaryName) parts.push(c);
      }
      if (addr.state_district) parts.push(addr.state_district);
      if (addr.state && !parts.includes(addr.state)) parts.push(addr.state);

      const subtext = parts.length > 0 ? parts.join(", ") : item.display_name;

      return {
        id: String(item.place_id || Math.random()),
        name: primaryName,
        displayName: item.display_name,
        subtext,
        city: addr.city || addr.town || addr.village || "",
        district: addr.state_district || "",
        province: addr.state || "",
        lat: item.lat,
        lon: item.lon,
      };
    });

    // Cache the clean results
    cache.set(normalizedKey, {
      data: formatted,
      timestamp: Date.now(),
    });

    // Prevent excessive memory growth
    if (cache.size > 500) {
      const oldestKey = cache.keys().next().value;
      if (oldestKey) cache.delete(oldestKey);
    }

    return NextResponse.json({
      success: true,
      locations: formatted,
      source: "osm",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.warn("Location search error:", errorMsg);
    return NextResponse.json({ success: true, locations: [] });
  }
}

