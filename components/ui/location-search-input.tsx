"use client";

import React, { useState, useRef, useEffect } from "react";
import { MapPin, X, ChevronDown, Check, Navigation, Loader2, Globe } from "lucide-react";

export interface SriLankaLocation {
  name: string;
  category: "Airports & Transit" | "Colombo & Suburbs" | "Western Province" | "Central & Hill Country" | "Southern Coast" | "Cultural & North/East";
  subtext?: string;
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

export const POPULAR_SRI_LANKA_LOCATIONS: SriLankaLocation[] = [
  // Airports & Transit
  { name: "Bandaranaike Int'l Airport (CMB) / Katunayake", category: "Airports & Transit", subtext: "Free Airport Meet & Greet" },
  { name: "Colombo Fort Railway Station", category: "Airports & Transit", subtext: "Central Rail Terminal" },
  { name: "Mattala Rajapaksa Airport (HRI)", category: "Airports & Transit", subtext: "Southern Airport" },
  { name: "Ratmalana Domestic Airport (RML)", category: "Airports & Transit", subtext: "Colombo South Airport" },

  // Colombo & Suburbs
  { name: "Colombo City (Fort / Pettah)", category: "Colombo & Suburbs", subtext: "Commercial Capital" },
  { name: "Colombo 03 (Colpetty / Kollupitiya)", category: "Colombo & Suburbs", subtext: "Galle Face & Embassies" },
  { name: "Colombo 04 (Bambalapitiya)", category: "Colombo & Suburbs", subtext: "Marine Drive & Shopping" },
  { name: "Colombo 07 (Cinnamon Gardens)", category: "Colombo & Suburbs", subtext: "Viharamahadevi Park / Town Hall" },
  { name: "Dehiwala / Mount Lavinia Beach", category: "Colombo & Suburbs", subtext: "Coastal Suburbs" },
  { name: "Battaramulla / Rajagiriya", category: "Colombo & Suburbs", subtext: "Administrative Capital Zone" },

  // Western Province & Coast
  { name: "Negombo Beach / Porutota Road", category: "Western Province", subtext: "Major Tourist Hub near Airport" },
  { name: "Wennapuwa / Waikkal / Marawila", category: "Western Province", subtext: "North Western Coast" },
  { name: "Kochchikade / Katunayake Road", category: "Western Province", subtext: "Airport Corridor" },
  { name: "Kalutara / Wadduwa / Panadura", category: "Western Province", subtext: "South Western Coast" },

  // Central & Hill Country
  { name: "Kandy City Center (Temple of the Tooth)", category: "Central & Hill Country", subtext: "Central Capital" },
  { name: "Peradeniya / Katugastota", category: "Central & Hill Country", subtext: "Botanical Gardens" },
  { name: "Nuwara Eliya (Little England)", category: "Central & Hill Country", subtext: "Tea Plantations & Gregory Lake" },
  { name: "Ella (Nine Arch Bridge / Little Adam's Peak)", category: "Central & Hill Country", subtext: "Scenic Mountain Destination" },
  { name: "Bandarawela / Haputale", category: "Central & Hill Country", subtext: "Hill Country Escapes" },

  // Southern Coast
  { name: "Galle Fort / Unawatuna Beach", category: "Southern Coast", subtext: "UNESCO World Heritage site" },
  { name: "Bentota / Beruwala / Aluthgama", category: "Southern Coast", subtext: "Water Sports & Resorts" },
  { name: "Hikkaduwa Coral Reef / Narigama", category: "Southern Coast", subtext: "Surfing & Nightlife" },
  { name: "Mirissa Beach / Coconut Tree Hill", category: "Southern Coast", subtext: "Whale Watching Hub" },
  { name: "Weligama Bay", category: "Southern Coast", subtext: "Surfing Beach" },
  { name: "Matara City / Dondra Head", category: "Southern Coast", subtext: "Southern Rail Terminus" },
  { name: "Tangalle / Dikwella / Hiriketiya", category: "Southern Coast", subtext: "Deep South Coast" },

  // Cultural Triangle & North/East
  { name: "Sigiriya (Lion Rock Fortress)", category: "Cultural & North/East", subtext: "Ancient Citadel" },
  { name: "Dambulla (Cave Temple)", category: "Cultural & North/East", subtext: "Cultural Hub" },
  { name: "Anuradhapura Sacred City", category: "Cultural & North/East", subtext: "Ancient Capital" },
  { name: "Trincomalee / Nilaveli Beach", category: "Cultural & North/East", subtext: "East Coast Beaches" },
  { name: "Arugam Bay (Point Break)", category: "Cultural & North/East", subtext: "World-class Surf Spot" },
  { name: "Jaffna Town / Jaffna Fort", category: "Cultural & North/East", subtext: "Northern Peninsula" },
];

export const POPULAR_QUICK_HUBS = [
  { name: "Bandaranaike Int'l Airport (CMB) / Katunayake", shortLabel: "✈️ CMB Airport" },
  { name: "Colombo City (Fort / Pettah)", shortLabel: "🏙️ Colombo" },
  { name: "Negombo Beach / Porutota Road", shortLabel: "🏖️ Negombo" },
  { name: "Kandy City Center (Temple of the Tooth)", shortLabel: "⛰️ Kandy" },
  { name: "Galle Fort / Unawatuna Beach", shortLabel: "🏰 Galle Fort" },
  { name: "Mirissa Beach / Coconut Tree Hill", shortLabel: "🏄 Mirissa" },
  { name: "Nuwara Eliya (Little England)", shortLabel: "🌲 Nuwara Eliya" },
  { name: "Ella (Nine Arch Bridge / Little Adam's Peak)", shortLabel: "🚂 Ella" },
  { name: "Bentota / Beruwala / Aluthgama", shortLabel: "🌊 Bentota" },
  { name: "Sigiriya (Lion Rock Fortress)", shortLabel: "🏛️ Sigiriya" },
  { name: "Hikkaduwa Coral Reef / Narigama", shortLabel: "🤿 Hikkaduwa" },
  { name: "Weligama Bay", shortLabel: "🏄 Weligama" },
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

export interface LocationSearchInputProps {
  value: string;
  onChange: (location: string) => void;
  placeholder?: string;
  label?: string;
  variant?: "light" | "catalog" | "dark";
  className?: string;
  required?: boolean;
  showQuickChips?: boolean;
}

export function LocationSearchInput({
  value,
  onChange,
  placeholder = "Search city, place, or any address in Sri Lanka...",
  label,
  variant = "light",
  className = "",
  required = false,
  showQuickChips = false,
}: LocationSearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [liveResults, setLiveResults] = useState<LiveLocationItem[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync internal query state with external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Live OpenStreetMap debounced search
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
    }, 300);

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

  // Filter preset suggestions based on user query and category
  const filteredSuggestions = POPULAR_SRI_LANKA_LOCATIONS.filter((loc) => {
    if (selectedCategory !== "all" && loc.category !== selectedCategory) {
      return false;
    }
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      loc.name.toLowerCase().includes(q) ||
      loc.category.toLowerCase().includes(q) ||
      (loc.subtext && loc.subtext.toLowerCase().includes(q))
    );
  });

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

      {/* Quick Horizontally Scrollable Pickup Location Chips */}
      {showQuickChips && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 pb-0.5 touch-pan-x">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0 mr-1">
            Popular:
          </span>
          {POPULAR_QUICK_HUBS.map((hub) => {
            const isMatch = value.toLowerCase() === hub.name.toLowerCase();
            return (
              <button
                key={hub.name}
                type="button"
                onClick={() => handleSelectLocation(hub.name)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isMatch
                    ? "bg-violet-600 text-white shadow-sm ring-1 ring-violet-600"
                    : isLightVariant
                    ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80"
                    : "bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10"
                }`}
              >
                {hub.shortLabel}
              </button>
            );
          })}
        </div>
      )}

      {/* Autocomplete Dropdown List */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 max-h-[55vh] sm:max-h-80 overflow-y-auto overscroll-contain touch-pan-y bg-white dark:bg-[#111116] border border-slate-200 dark:border-white/15 rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-150 divide-y divide-slate-100 dark:divide-white/5 scrollbar-thin">
          
          {/* Horizontally Scrollable Category Pills Bar */}
          <div className="pb-2 pt-0.5">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar touch-pan-x py-0.5">
              {LOCATION_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-violet-600 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

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

          {/* 2. Live OpenStreetMap Real-Time Results */}
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
                          {item.name}
                        </span>
                        <span
                          className={`text-[10px] block truncate ${
                            isSelected ? "text-violet-200" : "text-slate-400"
                          }`}
                        >
                          {item.subtext}
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

          {/* 3. Popular Sri Lanka Presets (Filtered by Category & Query) */}
          <div className="pt-2 space-y-1">
            <div className="px-2 py-1 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              <span>
                {selectedCategory !== "all"
                  ? `${selectedCategory} Hubs`
                  : query.trim().length >= 2
                  ? "Popular Hubs Matching Search"
                  : "Sri Lanka Delivery Hubs"}
              </span>
              <span className="text-[9px] font-medium">
                {filteredSuggestions.length} available
              </span>
            </div>

            {filteredSuggestions.length === 0 && liveResults.length === 0 && !isLoadingLive ? (
              <div className="py-4 text-center text-xs text-slate-500 dark:text-slate-400">
                <p className="font-semibold">No exact matching preset city</p>
                <p className="text-[10px] mt-0.5">
                  Click the button above to use your custom typed address!
                </p>
              </div>
            ) : (
              filteredSuggestions.map((loc) => {
                const isSelected = value.toLowerCase() === loc.name.toLowerCase();
                return (
                  <button
                    key={loc.name}
                    type="button"
                    onClick={() => handleSelectLocation(loc.name)}
                    className={`w-full min-h-[44px] flex items-center justify-between p-2.5 sm:p-2 rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-violet-600 text-white"
                        : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0 flex-1 pr-2">
                      <MapPin
                        className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                          isSelected ? "text-white" : "text-slate-400"
                        }`}
                      />
                      <div className="truncate">
                        <span className="text-xs font-bold block truncate">
                          {loc.name}
                        </span>
                        {loc.subtext && (
                          <span
                            className={`text-[10px] block truncate ${
                              isSelected ? "text-violet-200" : "text-slate-400"
                            }`}
                          >
                            {loc.subtext} • {loc.category}
                          </span>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-white flex-shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

