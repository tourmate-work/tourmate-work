import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  X,
  ChevronDown,
  Check,
  Navigation,
  Loader2,
  Globe,
  Search,
  ArrowUpLeft,
} from "lucide-react";

export interface SriLankaLocation {
  name: string;
  category:
    | "Airports & Transit"
    | "Colombo & Suburbs"
    | "Western Province"
    | "Central & Hill Country"
    | "Southern Coast"
    | "Cultural & North/East";
  subtext?: string;
  keywords?: string[];
}

export interface LiveLocationItem {
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

// Comprehensive Sri Lanka Locations Database for instant Google-style Autocomplete
export const POPULAR_SRI_LANKA_LOCATIONS: SriLankaLocation[] = [
  // 1. Airports & Transit Hubs
  {
    name: "Bandaranaike Int'l Airport (CMB) / Katunayake",
    category: "Airports & Transit",
    subtext: "Free Airport Meet & Greet • Katunayake, Western Province",
    keywords: ["cmb", "airport", "katunayake", "international", "flight"],
  },
  {
    name: "Colombo Fort Railway Station",
    category: "Airports & Transit",
    subtext: "Central Transit Terminal • Fort / Pettah, Western Province",
    keywords: ["train", "station", "fort", "pettah", "railway"],
  },
  {
    name: "Mattala Rajapaksa Int'l Airport (HRI)",
    category: "Airports & Transit",
    subtext: "Southern Province International Airport • Hambantota",
    keywords: ["hri", "mattala", "airport", "hambantota"],
  },
  {
    name: "Ratmalana Domestic Airport (RML)",
    category: "Airports & Transit",
    subtext: "Colombo South Domestic Airport • Mount Lavinia",
    keywords: ["rml", "ratmalana", "airport", "domestic"],
  },
  {
    name: "Kandy Railway Station",
    category: "Airports & Transit",
    subtext: "Central Province Scenic Train Hub • Temple of the Tooth",
    keywords: ["kandy", "train", "station", "railway"],
  },
  {
    name: "Ella Railway Station",
    category: "Airports & Transit",
    subtext: "Scenic Blue Train Route • Nine Arch Bridge, Uva Province",
    keywords: ["ella", "train", "station", "railway", "badulla"],
  },
  {
    name: "Galle Railway Station",
    category: "Airports & Transit",
    subtext: "Southern Coast Coastal Line Station • Galle Fort",
    keywords: ["galle", "train", "station", "railway"],
  },

  // 2. Colombo & Suburbs
  {
    name: "Colombo City (Fort / Pettah)",
    category: "Colombo & Suburbs",
    subtext: "Commercial Capital • Port City • Central Business District",
    keywords: ["colombo", "fort", "pettah", "port city", "city"],
  },
  {
    name: "Colombo 03 (Colpetty / Kollupitiya)",
    category: "Colombo & Suburbs",
    subtext: "Galle Face Green • Marine Drive • Embassies",
    keywords: ["colpetty", "kollupitiya", "galle face", "marine drive", "colombo"],
  },
  {
    name: "Colombo 04 (Bambalapitiya)",
    category: "Colombo & Suburbs",
    subtext: "Marine Drive • Majestic City • Shopping & Dining",
    keywords: ["bambalapitiya", "colombo", "marine drive"],
  },
  {
    name: "Colombo 07 (Cinnamon Gardens)",
    category: "Colombo & Suburbs",
    subtext: "Viharamahadevi Park • Town Hall • Independence Square",
    keywords: ["cinnamon gardens", "colombo", "independence square", "town hall"],
  },
  {
    name: "Colombo 05 (Havelock Town / Kirulapone)",
    category: "Colombo & Suburbs",
    subtext: "Havelock City Mall • Residential Hub",
    keywords: ["havelock", "kirulapone", "colombo"],
  },
  {
    name: "Colombo 02 (Slave Island / Union Place)",
    category: "Colombo & Suburbs",
    subtext: "Beira Lake • Altair • Park Street Mews",
    keywords: ["slave island", "union place", "beira lake", "colombo"],
  },
  {
    name: "Dehiwala / Mount Lavinia Beach",
    category: "Colombo & Suburbs",
    subtext: "Mount Lavinia Hotel • Golden Beach Promenade",
    keywords: ["dehiwala", "mount lavinia", "beach", "colombo"],
  },
  {
    name: "Battaramulla / Rajagiriya",
    category: "Colombo & Suburbs",
    subtext: "Parliament Administrative Zone • Diyatha Uyana",
    keywords: ["battaramulla", "rajagiriya", "parliament", "colombo"],
  },
  {
    name: "Nugegoda / Kohuwala",
    category: "Colombo & Suburbs",
    subtext: "High Level Road • Commercial & Shopping District",
    keywords: ["nugegoda", "kohuwala", "colombo"],
  },
  {
    name: "Maharagama / Kottawa",
    category: "Colombo & Suburbs",
    subtext: "Southern Expressway Entrance • Makumbura Multimodal",
    keywords: ["maharagama", "kottawa", "makumbura", "expressway"],
  },
  {
    name: "Malabe / Kaduwela / Pelawatte",
    category: "Colombo & Suburbs",
    subtext: "IT Hub • Outer Circular Expressway Corridor",
    keywords: ["malabe", "kaduwela", "pelawatte", "expressway"],
  },
  {
    name: "Moratuwa / Panadura",
    category: "Colombo & Suburbs",
    subtext: "Galle Road Coastal Corridor • South Gateway",
    keywords: ["moratuwa", "panadura", "galle road"],
  },

  // 3. Western Province & Coast
  {
    name: "Negombo Beach / Porutota Road",
    category: "Western Province",
    subtext: "Major Tourist Beach Hub • Resorts near Airport",
    keywords: ["negombo", "porutota", "beach", "airport"],
  },
  {
    name: "Negombo Town & Lagoon",
    category: "Western Province",
    subtext: "Dutch Canal • Fish Market • Gampaha District",
    keywords: ["negombo", "lagoon", "town", "canal"],
  },
  {
    name: "Wennapuwa / Waikkal / Marawila",
    category: "Western Province",
    subtext: "North Western Coastal Belt • Dolphin Coast",
    keywords: ["wennapuwa", "waikkal", "marawila", "beach"],
  },
  {
    name: "Katunayake Free Trade Zone",
    category: "Western Province",
    subtext: "Airport Expressway Terminal • Colombo-Katunayake",
    keywords: ["katunayake", "airport", "expressway"],
  },
  {
    name: "Ja-Ela / Kandana / Seeduwa",
    category: "Western Province",
    subtext: "Colombo-Negombo Highway • K-Zone Mall",
    keywords: ["ja-ela", "kandana", "seeduwa"],
  },
  {
    name: "Wattala / Peliyagoda",
    category: "Western Province",
    subtext: "Colombo North Corridor • Central Fish Market",
    keywords: ["wattala", "peliyagoda", "colombo north"],
  },
  {
    name: "Gampaha City Center",
    category: "Western Province",
    subtext: "District Capital • Henarathgoda Botanical Garden",
    keywords: ["gampaha", "botanical garden"],
  },
  {
    name: "Kalutara City (Kalutara Bodhiya)",
    category: "Western Province",
    subtext: "Kalu Ganga River • South Coastal Highway",
    keywords: ["kalutara", "bodhiya", "south coast"],
  },
  {
    name: "Wadduwa / Beruwala / Moragalla Beach",
    category: "Western Province",
    subtext: "Golden Mile Beach Strip • Ayurveda & Luxury Resorts",
    keywords: ["wadduwa", "beruwala", "moragalla", "beach"],
  },
  {
    name: "Aluthgama / Kande Viharaya",
    category: "Western Province",
    subtext: "Bentota River Estuary Gateway • Giant Buddha Statue",
    keywords: ["aluthgama", "kande viharaya", "bentota river"],
  },

  // 4. Southern Coast (Beaches & Heritage)
  {
    name: "Bentota Beach (National Holiday Resort)",
    category: "Southern Coast",
    subtext: "Water Sports Hub • River Safari • 5-Star Beach Resorts",
    keywords: ["bentota", "beach", "water sports", "safari"],
  },
  {
    name: "Hikkaduwa Coral Reef / Narigama Beach",
    category: "Southern Coast",
    subtext: "Marine Sanctuary • Surfing • Beach Dining & Nightlife",
    keywords: ["hikkaduwa", "coral", "reef", "narigama", "surfing"],
  },
  {
    name: "Ambalangoda / Balapitiya (Madu River)",
    category: "Southern Coast",
    subtext: "Madu Ganga Mangrove Boat Safari • Mask Museum",
    keywords: ["ambalangoda", "balapitiya", "madu river", "safari"],
  },
  {
    name: "Galle Fort (UNESCO World Heritage)",
    category: "Southern Coast",
    subtext: "17th Century Dutch Ramparts • Boutique Cafes • Lighthouse",
    keywords: ["galle", "fort", "unesco", "lighthouse", "dutch"],
  },
  {
    name: "Unawatuna Beach & Jungle Beach",
    category: "Southern Coast",
    subtext: "Calm Swimming Bay • Japanese Peace Pagoda",
    keywords: ["unawatuna", "jungle beach", "swimming", "galle"],
  },
  {
    name: "Ahangama / Midigama Surf Breaks",
    category: "Southern Coast",
    subtext: "World-Class Surfing Reefs • Coconut Tree Swings",
    keywords: ["ahangama", "midigama", "surf", "surfing"],
  },
  {
    name: "Koggala Beach & Lake",
    category: "Southern Coast",
    subtext: "Stilt Fishermen • Martin Wickramasinghe Folk Museum",
    keywords: ["koggala", "lake", "stilt fishermen"],
  },
  {
    name: "Weligama Bay (Surf School Hub)",
    category: "Southern Coast",
    subtext: "Beginner Surfing • Taprobane Island • Catamaran Harbor",
    keywords: ["weligama", "bay", "surf", "surfing"],
  },
  {
    name: "Mirissa Beach / Coconut Tree Hill",
    category: "Southern Coast",
    subtext: "Whale Watching Harbor • Parrot Rock • Sunset Viewpoint",
    keywords: ["mirissa", "coconut tree hill", "whale watching", "beach"],
  },
  {
    name: "Matara City & Star Fort",
    category: "Southern Coast",
    subtext: "Nilwala River • Pigeon Island • Southern Expressway End",
    keywords: ["matara", "star fort", "city"],
  },
  {
    name: "Dondra Head & Lighthouse",
    category: "Southern Coast",
    subtext: "Southernmost Tip of Sri Lanka • Giant Octagonal Lighthouse",
    keywords: ["dondra", "lighthouse", "southernmost"],
  },
  {
    name: "Dikwella / Hiriketiya Horseshoe Bay",
    category: "Southern Coast",
    subtext: "Trendy Surf Haven • Turquoise Horseshoe Cove",
    keywords: ["dikwella", "hiriketiya", "bay", "surf"],
  },
  {
    name: "Tangalle / Goyambokka / Silent Beach",
    category: "Southern Coast",
    subtext: "Secluded Paradise Beaches • Rekawa Turtle Watch",
    keywords: ["tangalle", "goyambokka", "silent beach", "turtle"],
  },
  {
    name: "Hambantota Port & Shangri-La",
    category: "Southern Coast",
    subtext: "Southern Province Port City • Golf Resort",
    keywords: ["hambantota", "port", "shangri-la"],
  },
  {
    name: "Tissamaharama / Yala National Park",
    category: "Southern Coast",
    subtext: "Leopard Safari Gateway • Ancient Tissa Wewa Lake",
    keywords: ["tissamaharama", "yala", "safari", "leopard", "national park"],
  },
  {
    name: "Kataragama Sacred Town",
    category: "Southern Coast",
    subtext: "Multireligious Shrine • Menik Ganga River Sanctuary",
    keywords: ["kataragama", "temple", "shrine"],
  },

  // 5. Central & Hill Country
  {
    name: "Kandy City Center (Temple of the Tooth)",
    category: "Central & Hill Country",
    subtext: "UNESCO World Heritage • Kandy Lake • Sacred Relic Palace",
    keywords: ["kandy", "temple of the tooth", "lake", "dalada maligawa", "city"],
  },
  {
    name: "Peradeniya Royal Botanical Gardens",
    category: "Central & Hill Country",
    subtext: "Mahaweli River • Giant Javan Fig Tree • University City",
    keywords: ["peradeniya", "botanical garden", "kandy"],
  },
  {
    name: "Katugastota / Polgolla Reservoir",
    category: "Central & Hill Country",
    subtext: "Kandy Northern Suburban Corridor",
    keywords: ["katugastota", "polgolla", "kandy"],
  },
  {
    name: "Gampola / Ambuluwawa Biodiversity Tower",
    category: "Central & Hill Country",
    subtext: "Panoramic Spiral Tower Peak • Central Mountain Ridge",
    keywords: ["gampola", "ambuluwawa", "tower"],
  },
  {
    name: "Hatton / Castlereagh Reservoir / Tea Valley",
    category: "Central & Hill Country",
    subtext: "Ceylon Tea Country • Seaplane Landing Site",
    keywords: ["hatton", "castlereagh", "tea"],
  },
  {
    name: "Nallathanniya (Adam's Peak / Sri Pada)",
    category: "Central & Hill Country",
    subtext: "Sacred Mountain Pilgrimage Base • Sunrise Cloud Walk",
    keywords: ["adam's peak", "sri pada", "nallathanniya", "mountain"],
  },
  {
    name: "Nuwara Eliya (Little England)",
    category: "Central & Hill Country",
    subtext: "Gregory Lake • Victoria Park • Pedro Tea Plantations",
    keywords: ["nuwara eliya", "little england", "gregory lake", "tea", "cool"],
  },
  {
    name: "Nanu Oya Station",
    category: "Central & Hill Country",
    subtext: "Main Railway Junction for Nuwara Eliya",
    keywords: ["nanu oya", "station", "train", "nuwara eliya"],
  },
  {
    name: "Horton Plains National Park (World's End)",
    category: "Central & Hill Country",
    subtext: "Baker's Falls • Precipice Cliff Viewpoint • Cloud Forest",
    keywords: ["horton plains", "world's end", "baker's falls"],
  },
  {
    name: "Bandarawela Town & Mountain Heights",
    category: "Central & Hill Country",
    subtext: "Fruit Orchards • Colonial Hill Station • Clean Climate",
    keywords: ["bandarawela", "hills", "orchard"],
  },
  {
    name: "Haputale / Lipton's Seat",
    category: "Central & Hill Country",
    subtext: "Sir Thomas Lipton Viewpoint • Infinite Tea Sea",
    keywords: ["haputale", "lipton's seat", "tea"],
  },
  {
    name: "Ella (Nine Arch Bridge / Little Adam's Peak)",
    category: "Central & Hill Country",
    subtext: "Scenic Ravana Falls • Flying Ravana Zipline • Hiking Hub",
    keywords: ["ella", "nine arch bridge", "ravana falls", "little adam's peak"],
  },
  {
    name: "Badulla City (Muthiyangana Temple)",
    category: "Central & Hill Country",
    subtext: "Uva Province Capital • Dunhinda Waterfall",
    keywords: ["badulla", "dunhinda", "uva"],
  },
  {
    name: "Matale / Aluvihare Rock Temple",
    category: "Central & Hill Country",
    subtext: "Spice Gardens Belt • Gateway to Cultural Triangle",
    keywords: ["matale", "spice garden", "aluvihare"],
  },

  // 6. Cultural Triangle, North & East
  {
    name: "Sigiriya (Lion Rock Fortress)",
    category: "Cultural & North/East",
    subtext: "5th Century Ancient Sky Citadel • Mirror Wall • UNESCO",
    keywords: ["sigiriya", "lion rock", "citadel", "unesco", "fortress"],
  },
  {
    name: "Pidurangala Rock",
    category: "Cultural & North/East",
    subtext: "Iconic Sunrise Viewpoint overlooking Sigiriya Rock",
    keywords: ["pidurangala", "rock", "sigiriya", "viewpoint"],
  },
  {
    name: "Dambulla (Golden Cave Temple)",
    category: "Cultural & North/East",
    subtext: "UNESCO Rock Cave Frescoes • Cultural Hub Junction",
    keywords: ["dambulla", "cave temple", "golden temple", "unesco"],
  },
  {
    name: "Habarana (Minneriya Elephant Gathering)",
    category: "Cultural & North/East",
    subtext: "Wild Elephant Safari Gateway • Hurulu Eco Park",
    keywords: ["habarana", "minneriya", "elephant", "safari"],
  },
  {
    name: "Polonnaruwa Ancient City & Ruins",
    category: "Cultural & North/East",
    subtext: "Gal Vihara Granite Statues • Parakrama Samudra • UNESCO",
    keywords: ["polonnaruwa", "gal vihara", "ancient city", "unesco"],
  },
  {
    name: "Anuradhapura Sacred Ancient Capital",
    category: "Cultural & North/East",
    subtext: "Sri Maha Bodhi Tree • Ruwanwelisaya Stupa • UNESCO",
    keywords: ["anuradhapura", "ruwanwelisaya", "bodhi", "unesco", "sacred city"],
  },
  {
    name: "Mihintale Sacred Mountain Cradle",
    category: "Cultural & North/East",
    subtext: "Birthplace of Buddhism in Sri Lanka • Sacred Steps",
    keywords: ["mihintale", "mountain", "sacred"],
  },
  {
    name: "Wilpattu National Park Gateway",
    category: "Cultural & North/East",
    subtext: "Natural Lakes (Villus) • Leopard & Sloth Bear Safari",
    keywords: ["wilpattu", "safari", "leopard", "national park"],
  },
  {
    name: "Trincomalee Town & Koneswaram Temple",
    category: "Cultural & North/East",
    subtext: "Natural Deep Sea Harbor • Swami Rock Clifftop Kovil",
    keywords: ["trincomalee", "koneswaram", "swami rock", "harbor"],
  },
  {
    name: "Nilaveli Beach & Pigeon Island",
    category: "Cultural & North/East",
    subtext: "Crystal White Sands • Marine National Park Coral Reef",
    keywords: ["nilaveli", "pigeon island", "beach", "snorkeling"],
  },
  {
    name: "Pasikudah Bay & Kalkudah Beach",
    category: "Cultural & North/East",
    subtext: "Shallow Calm Waters • Luxury Coral Bay Resorts",
    keywords: ["pasikudah", "kalkudah", "bay", "beach"],
  },
  {
    name: "Batticaloa Town & Kallady Lagoon",
    category: "Cultural & North/East",
    subtext: "Singing Fish Lagoon • Dutch Fort • East Coast",
    keywords: ["batticaloa", "kallady", "lagoon"],
  },
  {
    name: "Arugam Bay (World Surfing Point Break)",
    category: "Cultural & North/East",
    subtext: "Main Surf Point • Whiskey Point • Kumana Safari Gateway",
    keywords: ["arugam bay", "surf", "surfing", "whiskey point"],
  },
  {
    name: "Jaffna Town / Jaffna Fort / Nallur",
    category: "Cultural & North/East",
    subtext: "Nallur Kandaswamy Kovil • Dutch Fort • Northern Capital",
    keywords: ["jaffna", "nallur", "fort", "north"],
  },
  {
    name: "Mannar Island & Talaimannar Pier",
    category: "Cultural & North/East",
    subtext: "Ancient Baobab Trees • Adam's Bridge Sandbanks",
    keywords: ["mannar", "talaimannar", "adam's bridge"],
  },
  {
    name: "Kurunegala (Ethagala / Elephant Rock)",
    category: "Western Province",
    subtext: "North Western Province Capital • 7 Giant Rock Formations",
    keywords: ["kurunegala", "ethagala", "rock"],
  },
  {
    name: "Chilaw / Munneswaram Hindu Kovil",
    category: "Western Province",
    subtext: "Ancient Ramayana Heritage Temple • West Coast",
    keywords: ["chilaw", "munneswaram", "temple"],
  },
  {
    name: "Kalpitiya Peninsula & Kite Surfing",
    category: "Western Province",
    subtext: "Dolphin & Sperm Whale Watching • Lagoon Kitesurfing",
    keywords: ["kalpitiya", "kitesurfing", "dolphin", "whale"],
  },
  {
    name: "Ratnapura (City of Gems)",
    category: "Central & Hill Country",
    subtext: "Sabaragamuwa Province Capital • World Famous Sapphire Mines",
    keywords: ["ratnapura", "gem", "sapphire", "sabaragamuwa"],
  },
  {
    name: "Pinnawala Elephant Orphanage",
    category: "Central & Hill Country",
    subtext: "Maha Oya River Bathing • Kegalle District",
    keywords: ["pinnawala", "elephant", "kegalle"],
  },
];

export const POPULAR_QUICK_HUBS = [
  { name: "Bandaranaike Int'l Airport (CMB) / Katunayake", shortLabel: "✈️ CMB Airport" },
  { name: "Colombo City (Fort / Pettah)", shortLabel: "🏙️ Colombo" },
  { name: "Negombo Beach / Porutota Road", shortLabel: "🏖️ Negombo" },
  { name: "Kandy City Center (Temple of the Tooth)", shortLabel: "⛰️ Kandy" },
  { name: "Galle Fort (UNESCO World Heritage)", shortLabel: "🏰 Galle Fort" },
  { name: "Mirissa Beach / Coconut Tree Hill", shortLabel: "🏄 Mirissa" },
  { name: "Nuwara Eliya (Little England)", shortLabel: "🌲 Nuwara Eliya" },
  { name: "Ella (Nine Arch Bridge / Little Adam's Peak)", shortLabel: "🚂 Ella" },
  { name: "Bentota Beach (National Holiday Resort)", shortLabel: "🌊 Bentota" },
  { name: "Sigiriya (Lion Rock Fortress)", shortLabel: "🏛️ Sigiriya" },
  { name: "Hikkaduwa Coral Reef / Narigama Beach", shortLabel: "🤿 Hikkaduwa" },
  { name: "Weligama Bay (Surf School Hub)", shortLabel: "🏄 Weligama" },
];

export const LOCATION_CATEGORIES = [
  { id: "all", label: "All Hubs" },
  { id: "Airports & Transit", label: "✈️ Airports" },
  { id: "Colombo & Suburbs", label: "🏙️ Colombo" },
  { id: "Southern Coast", label: "🏖️ South Coast" },
  { id: "Central & Hill Country", label: "⛰️ Hill Country" },
  { id: "Western Province", label: "🌊 Western Coast" },
  { id: "Cultural & North/East", label: "🏛️ Cultural / North" },
] as const;

// Helper: Highlight matching substring in Google style
function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query.trim()) {
    return <span>{text}</span>;
  }

  const q = query.trim().toLowerCase();
  const lowerText = text.toLowerCase();
  const matchIndex = lowerText.indexOf(q);

  if (matchIndex === -1) {
    return <span>{text}</span>;
  }

  const before = text.slice(0, matchIndex);
  const match = text.slice(matchIndex, matchIndex + q.length);
  const after = text.slice(matchIndex + q.length);

  return (
    <span>
      {before}
      <span className="font-extrabold text-violet-600 dark:text-violet-400 bg-violet-500/10 px-0.5 rounded">
        {match}
      </span>
      <span>{after}</span>
    </span>
  );
}

// Google Search-style recommendation ranking:
// 1. Exact prefix match on name (Highest)
// 2. Word in name starts with query
// 3. Name contains query
// 4. Keyword starts with query
// 5. Subtext contains query
function rankLocations(
  locations: SriLankaLocation[],
  rawQuery: string,
  category: string = "all"
): SriLankaLocation[] {
  const trimmed = rawQuery.trim().toLowerCase();

  const pool =
    category === "all"
      ? locations
      : locations.filter((loc) => loc.category === category);

  if (!trimmed) {
    return pool;
  }

  const scored = pool.map((loc) => {
    const nameLower = loc.name.toLowerCase();
    const subLower = (loc.subtext || "").toLowerCase();
    const keywords = loc.keywords || [];

    let score = 0;

    // 1. Exact name match
    if (nameLower === trimmed) {
      score = 1000;
    }
    // 2. Name starts with query (e.g. "kan" -> "Kandy City Center")
    else if (nameLower.startsWith(trimmed)) {
      score = 600 + (60 - Math.min(nameLower.length, 60));
    }
    // 3. Any word in name starts with query (e.g. "air" -> "Bandaranaike Int'l Airport")
    else if (nameLower.split(/[\s(/]+/).some((w) => w.startsWith(trimmed))) {
      score = 450 + (60 - Math.min(nameLower.length, 60));
    }
    // 4. Any keyword matches or starts with query (e.g. "cmb", "safari", "train")
    else if (keywords.some((k) => k.startsWith(trimmed))) {
      score = 350;
    }
    // 5. Name contains query substring
    else if (nameLower.includes(trimmed)) {
      score = 250;
    }
    // 6. Subtext starts with query
    else if (subLower.startsWith(trimmed)) {
      score = 180;
    }
    // 7. Word in subtext starts with query
    else if (subLower.split(/[\s(•,/]+/).some((w) => w.startsWith(trimmed))) {
      score = 140;
    }
    // 8. Subtext contains query
    else if (subLower.includes(trimmed)) {
      score = 90;
    }

    return { loc, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.loc);
}

export interface LocationSearchInputProps {
  value: string;
  onChange: (location: string) => void;
  placeholder?: string;
  label?: string;
  variant?: "light" | "catalog" | "dark";
  className?: string;
  required?: boolean;
}

export function LocationSearchInput({
  value,
  onChange,
  placeholder = "Search city, place, or any address in Sri Lanka...",
  label,
  variant = "light",
  className = "",
  required = false,
}: LocationSearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [liveResults, setLiveResults] = useState<LiveLocationItem[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync internal query state with external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Live OpenStreetMap debounced search for addresses not in preset list
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setLiveResults([]);
      setIsLoadingLive(false);
      return;
    }

    setIsLoadingLive(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/locations/search?q=${encodeURIComponent(trimmed)}`
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.locations)) {
          setLiveResults(data.locations);
        } else {
          setLiveResults([]);
        }
      } catch (err) {
        console.warn("Failed to fetch live locations:", err);
        setLiveResults([]);
      } finally {
        setIsLoadingLive(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setQuery(text);
    onChange(text);
    setIsOpen(true);
  };

  const handleSelectLocation = (locName: string) => {
    setQuery(locName);
    onChange(locName);
    setIsOpen(false);
  };

  const handleSelectLiveLocation = (item: LiveLocationItem) => {
    const cleanName = item.subtext
      ? `${item.name} (${item.subtext})`
      : item.displayName;
    setQuery(cleanName);
    onChange(cleanName);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    onChange("");
    setLiveResults([]);
    if (inputRef.current) inputRef.current.focus();
  };

  // Google-style ranked recommendations based on partial characters typed
  const rankedSuggestions = rankLocations(
    POPULAR_SRI_LANKA_LOCATIONS,
    query
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (rankedSuggestions.length > 0) {
        handleSelectLocation(rankedSuggestions[0].name);
      } else if (query.trim()) {
        handleSelectLocation(query.trim());
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const isLightVariant = variant === "light";
  const isCatalogVariant = variant === "catalog";

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {label && (
        <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <MapPin
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none transition-colors ${
            query ? "text-violet-600 dark:text-violet-400" : "text-slate-400"
          }`}
        />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          required={required}
          className={`w-full pl-10 pr-9 py-2.5 text-xs font-semibold rounded-2xl transition-all focus:outline-none focus:ring-2 ${
            isLightVariant
              ? "bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-violet-600/30 focus:border-violet-600"
              : isCatalogVariant
              ? "bg-slate-50 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-violet-600/30 focus:border-violet-600"
              : "bg-white/10 border border-white/15 text-white placeholder:text-slate-300 focus:bg-white/15 focus:ring-amber-400"
          }`}
        />

        {isLoadingLive ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-violet-600 dark:text-violet-400 pointer-events-none">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          </div>
        ) : query ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            title="Clear location"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none"
          />
        )}
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 max-h-[55vh] sm:max-h-80 overflow-y-auto overscroll-contain touch-pan-y bg-white dark:bg-[#111116] border border-slate-200 dark:border-white/15 rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-150 divide-y divide-slate-100 dark:divide-white/5 scrollbar-thin">

          {/* 1. Custom typed address quick selection */}
          {query.trim() && (
            <div className="py-2">
              <button
                type="button"
                onClick={() => handleSelectLocation(query.trim())}
                className="w-full min-h-[44px] flex items-start gap-2.5 p-2 rounded-xl text-left bg-violet-50/80 dark:bg-violet-950/30 hover:bg-violet-100 dark:hover:bg-violet-950/50 transition-colors cursor-pointer"
              >
                <div className="p-1.5 rounded-lg bg-violet-600 text-white flex-shrink-0 mt-0.5 shadow-sm">
                  <Navigation className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-violet-950 dark:text-violet-200 block truncate">
                    &quot;{query.trim()}&quot;
                  </span>
                  <span className="text-[10px] text-violet-600 dark:text-violet-400 block">
                    Use this custom address or place in Sri Lanka
                  </span>
                </div>
              </button>
            </div>
          )}

          {/* 2. Google-style Ranked Suggestions */}
          <div className="pt-2 space-y-1">
            <div className="px-2 py-1 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-1.5">
                {query.trim() ? (
                  <>
                    <Search className="h-3 w-3 text-violet-600 dark:text-violet-400" />
                    <span>Suggestions for &quot;{query.trim()}&quot;</span>
                  </>
                ) : (
                  <span>Popular Sri Lanka Delivery Hubs</span>
                )}
              </span>
              <span className="text-[9px] font-medium">
                {rankedSuggestions.length} places
              </span>
            </div>

            {rankedSuggestions.length === 0 && liveResults.length === 0 && !isLoadingLive ? (
              <div className="py-4 text-center text-xs text-slate-500 dark:text-slate-400">
                <p className="font-semibold">No matching preset city found</p>
                <p className="text-[10px] mt-0.5">
                  Click the button above to use &quot;{query.trim()}&quot; as your custom address!
                </p>
              </div>
            ) : (
              rankedSuggestions.map((loc) => {
                const isSelected = value.toLowerCase() === loc.name.toLowerCase();
                return (
                  <button
                    key={loc.name}
                    type="button"
                    onClick={() => handleSelectLocation(loc.name)}
                    className={`w-full min-h-[44px] flex items-center justify-between p-2 sm:p-2.5 rounded-xl text-left transition-colors cursor-pointer group ${
                      isSelected
                        ? "bg-violet-600 text-white"
                        : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0 flex-1 pr-2">
                      <div
                        className={`p-1.5 rounded-lg mt-0.5 flex-shrink-0 transition-colors ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 group-hover:text-violet-600 group-hover:bg-violet-50 dark:group-hover:bg-violet-950/40"
                        }`}
                      >
                        {query.trim() ? (
                          <Search className="h-3.5 w-3.5" />
                        ) : (
                          <MapPin className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div className="truncate flex-1 min-w-0">
                        <span className="text-xs font-bold block truncate">
                          <HighlightMatch text={loc.name} query={query} />
                        </span>
                        {loc.subtext && (
                          <span
                            className={`text-[10px] block truncate mt-0.5 ${
                              isSelected ? "text-violet-200" : "text-slate-400"
                            }`}
                          >
                            <HighlightMatch text={loc.subtext} query={query} />
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {isSelected ? (
                        <Check className="h-4 w-4 text-white" />
                      ) : (
                        <ArrowUpLeft className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 group-hover:text-violet-500 transition-colors opacity-70 group-hover:opacity-100" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* 3. Live OpenStreetMap Real-Time Results (when user typed 2+ letters) */}
          {liveResults.length > 0 && (
            <div className="py-2 space-y-1">
              <div className="px-2 py-1 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3 text-emerald-500" />
                  <span>Live Sri Lanka Map Results</span>
                </span>
                <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400">
                  OpenStreetMap
                </span>
              </div>

              {liveResults.map((item) => {
                const isSelected =
                  value.toLowerCase() === item.name.toLowerCase() ||
                  value.toLowerCase() === item.displayName.toLowerCase();
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectLiveLocation(item)}
                    className={`w-full min-h-[44px] flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-violet-600 text-white"
                        : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0 flex-1 pr-2">
                      <MapPin
                        className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                          isSelected ? "text-white" : "text-emerald-500"
                        }`}
                      />
                      <div className="truncate">
                        <span className="text-xs font-bold block truncate">
                          <HighlightMatch text={item.name} query={query} />
                        </span>
                        <span
                          className={`text-[10px] block truncate ${
                            isSelected ? "text-violet-200" : "text-slate-400"
                          }`}
                        >
                          <HighlightMatch text={item.subtext} query={query} />
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-white flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

