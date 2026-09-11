"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Fuel,
  Snowflake,
  Users,
  Gauge,
  CheckCircle2,
  SlidersHorizontal,
  DoorOpen,
  X,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Search,
  MapPin,
  RotateCcw,
  Check,
  MessageCircle,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CustomDropdown } from "@/components/ui/custom-dropdown";
import { LocationSearchInput } from "@/components/ui/location-search-input";
import { BookingInquiryModal, BookingVehicleInfo } from "@/components/booking/booking-inquiry-modal";
import { useLanguage } from "@/lib/i18n/language-context";
import { SITE_CONTACT } from "@/lib/constants";
import { VehicleImage } from "@/components/ui/vehicle-image";

export interface VehicleDetail {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  priceNum: number;
  period: string;
  type: "sedan" | "sport" | "suv" | "van";
  fuelCapacity: string;
  location?: string;
  isAvailable?: boolean;
  status?: string;
  rating?: number;
  specs: {
    gearBox: string;
    fuel: string;
    doors: number;
    ac: string;
    seats: number;
    distance: string;
  };
  equipment: string[];
  thumbnails: string[];
}





function CarPillIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  );
}

export function VehiclesCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();

  const categories = [
    { id: "all", label: t("cat_all"), hasIcon: false },
    { id: "Sedan", label: t("cat_sedan"), hasIcon: true },
    { id: "SUV", label: t("cat_suv"), hasIcon: true },
    { id: "Van", label: t("cat_van"), hasIcon: true },
    { id: "Jeep", label: t("cat_jeep"), hasIcon: true },
    { id: "Luxury", label: t("cat_luxury"), hasIcon: true },
    { id: "Hatchback", label: t("cat_hatchback"), hasIcon: true },
    { id: "Electric", label: t("cat_electric"), hasIcon: true },
  ];

  // Read URL search params
  const initialSearch = searchParams?.get("search") || "";
  const initialLocation = searchParams?.get("location") || "";
  const initialCategory = searchParams?.get("category") || "all";
  const initialAvailable = searchParams?.get("available") !== "false";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [locationQuery, setLocationQuery] = useState(initialLocation);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [availableOnly, setAvailableOnly] = useState(initialAvailable);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name-asc">("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModalCar, setActiveModalCar] = useState<VehicleDetail | null>(null);
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);
  const [modalPickupLocation, setModalPickupLocation] = useState(initialLocation);
  const [vehiclesList, setVehiclesList] = useState<VehicleDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [inquiryVehicle, setInquiryVehicle] = useState<BookingVehicleInfo | null>(null);

  // Sync state if URL query params change
  useEffect(() => {
    if (!searchParams) return;
    const s = searchParams.get("search");
    const l = searchParams.get("location");
    const c = searchParams.get("category");
    const a = searchParams.get("available");
    if (s !== null) setSearchQuery(s);
    if (l !== null) {
      setLocationQuery(l);
      setModalPickupLocation(l);
    }
    if (c !== null) setSelectedCategory(c);
    if (a !== null) setAvailableOnly(a !== "false");
  }, [searchParams]);

  // Fetch live vehicles from backend API
  useEffect(() => {
    async function loadVehicles() {
      try {
        const res = await fetch("/api/vehicles");
        const data = await res.json();
        if (data.success && Array.isArray(data.vehicles)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mapped: VehicleDetail[] = data.vehicles.map((v: any) => {
            const fallbackImg =
              v.category === "Van"
                ? "/images/mock/kdh-van.jpg"
                : v.category === "SUV" || v.category === "4x4"
                ? "/images/mock/prado-4x4.jpg"
                : "/images/mock/premio-sedan.jpg";

            const validHero =
              v.imageUrl && !v.imageUrl.startsWith("blob:") ? v.imageUrl : fallbackImg;

            const validGallery =
              Array.isArray(v.galleryImages) && v.galleryImages.length > 0
                ? v.galleryImages.map((img: string) =>
                    img && !img.startsWith("blob:") ? img : fallbackImg
                  )
                : [validHero];

            const isAvail =
              v.isAvailable !== false &&
              v.status !== "Rented" &&
              v.status !== "Maintenance";

            return {
              id: v.id,
              name: v.name,
              brand: v.brand || v.name.split(" ")[0] || "Toyota",
              category: v.category,
              price: `LKR ${Number(v.pricePerDay).toLocaleString()}`,
              priceNum: v.pricePerDay,
              period: "per day",
              type:
                v.category.toLowerCase() === "suv" || v.category.toLowerCase() === "van"
                  ? v.category.toLowerCase()
                  : "sedan",
              fuelCapacity: "60 Ltr",
              location: v.location || "Bandaranaike Int'l Airport (CMB) / Katunayake",
              isAvailable: isAvail,
              status: v.status || (isAvail ? "Available" : "Reserved"),
              rating: v.rating || 4.9,
              specs: {
                gearBox: v.transmission,
                fuel: v.fuelType,
                doors: v.doors || 4,
                ac: "Yes",
                seats: v.seats || 5,
                distance: v.mileageLimit || "Unlimited",
              },
              equipment: Array.isArray(v.features)
                ? v.features
                : ["Air Conditioner", "Reverse Camera", "Bluetooth"],
              thumbnails: validGallery,
            };
          });
          setVehiclesList(mapped);
        } else {
          setVehiclesList([]);
        }
      } catch {
        setVehiclesList([]);
      } finally {
        setLoading(false);
      }
    }
    loadVehicles();
  }, []);

  // Lock body scroll when modal is open and handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalCar(null);
      }
    };

    if (activeModalCar) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModalCar]);

  const QUICK_LOCATIONS = [
    { label: "All Sri Lanka", value: "" },
    { label: "Airport (CMB)", value: "Airport" },
    { label: "Colombo", value: "Colombo" },
    { label: "Negombo", value: "Negombo" },
    { label: "Kandy", value: "Kandy" },
    { label: "Galle", value: "Galle" },
    { label: "Ella", value: "Ella" },
  ];

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    Boolean(locationQuery.trim()) ||
    selectedCategory !== "all" ||
    !availableOnly;

  const handleClearFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedCategory("all");
    setAvailableOnly(true);
    setCurrentPage(1);
    router.replace("/vehicles", { scroll: false });
  };

  const filteredVehicles = vehiclesList
    .filter((v) => {
      // 1. Availability filter
      if (availableOnly && !v.isAvailable) {
        return false;
      }

      // 2. Category filter
      if (
        selectedCategory !== "all" &&
        v.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // 3. Vehicle Keyword Search (name, brand, category, specs, equipment)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = v.name.toLowerCase().includes(q);
        const matchBrand = v.brand.toLowerCase().includes(q);
        const matchCat = v.category.toLowerCase().includes(q);
        const matchFuel = v.specs.fuel.toLowerCase().includes(q);
        const matchGear = v.specs.gearBox.toLowerCase().includes(q);
        const matchEquip = v.equipment.some((eq) =>
          eq.toLowerCase().includes(q)
        );
        if (!matchName && !matchBrand && !matchCat && !matchFuel && !matchGear && !matchEquip) {
          return false;
        }
      }

      // 4. Location Search (city, place, address in Sri Lanka)
      if (locationQuery.trim()) {
        const q = locationQuery.toLowerCase().trim();
        const carLoc = (v.location || "").toLowerCase();
        
        const qWords = q.split(/[\s,/-]+/).filter((w) => w.length > 2);
        const carWords = carLoc.split(/[\s,/-]+/).filter((w) => w.length > 2);
        
        const directMatch = carLoc.includes(q) || q.includes(carLoc);
        const wordMatch =
          qWords.some((w) => carLoc.includes(w)) ||
          carWords.some((w) => q.includes(w));
        
        if (!directMatch && !wordMatch) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.priceNum - b.priceNum;
      }
      if (sortBy === "price-desc") {
        return b.priceNum - a.priceNum;
      }
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      return 0; // featured default
    });

  const handleOpenDetails = (car: VehicleDetail) => {
    setActiveModalCar(car);
    setActiveThumbnailIndex(0);
    setModalPickupLocation(locationQuery.trim() || car.location || "");
  };

  const handleCloseModal = () => {
    setActiveModalCar(null);
  };

  return (
    <div className="w-full bg-white dark:bg-black text-slate-900 dark:text-white pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-3">
            {t("catalog_title")}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            {t("catalog_subtitle")}
          </p>
        </div>

        {/* Search & Sri Lanka Location Discovery Console */}
        <div className="mb-8 p-4 sm:p-5 rounded-[28px] bg-slate-50/90 dark:bg-[#0f0f13] border border-slate-200/90 dark:border-white/10 shadow-lg shadow-slate-200/30 dark:shadow-none">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* 1. Vehicle Search Input */}
            <div className="md:col-span-5 relative">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={t("catalog_search_placeholder")}
                  className="w-full pl-10 pr-9 py-2.5 text-xs font-semibold rounded-2xl bg-white dark:bg-white/5 border border-slate-200/90 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600/30 focus:border-violet-600 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* 2. Sri Lanka Location/Address Search */}
            <div className="md:col-span-4">
              <LocationSearchInput
                value={locationQuery}
                onChange={(loc) => {
                  setLocationQuery(loc);
                  setCurrentPage(1);
                }}
                placeholder={t("search_pickup_placeholder")}
                variant="catalog"
              />
            </div>

            {/* 3. Availability Toggle & Clear */}
            <div className="md:col-span-3 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setAvailableOnly(!availableOnly);
                  setCurrentPage(1);
                }}
                className={`flex-1 py-2.5 px-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                  availableOnly
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-sm"
                    : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-all ${
                    availableOnly ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                  }`}
                />
                <span className="truncate">
                  {availableOnly ? t("catalog_available_now") : t("catalog_all_vehicles")}
                </span>
                {availableOnly && <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 ml-auto" />}
              </button>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  title="Clear all search and filters"
                  className="p-2.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex-shrink-0 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Location Chips */}
          <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1 flex-shrink-0 mr-1">
              <MapPin className="h-3 w-3 text-violet-500" />
              <span>{language === "si" ? "ප්‍රධාන ස්ථාන:" : "Sri Lanka Delivery Hubs:"}</span>
            </span>
            {QUICK_LOCATIONS.map((ql) => {
              const isActive =
                (!ql.value && !locationQuery) ||
                (ql.value && locationQuery.toLowerCase().includes(ql.value.toLowerCase()));
              return (
                <button
                  key={ql.label}
                  type="button"
                  onClick={() => {
                    setLocationQuery(ql.value);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-violet-600 text-white shadow-xs"
                      : "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
                  }`}
                >
                  {ql.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Tabs with Mobile Swipe */}
        <div className="flex items-center overflow-x-auto no-scrollbar gap-2 sm:gap-3 mb-6 pb-2 justify-start sm:justify-center px-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage(1);
                }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 shadow-sm cursor-pointer ${
                  isActive
                    ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-slate-900/20 scale-105"
                    : "bg-slate-100/90 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200/90 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat.hasIcon && (
                  <CarPillIcon
                    className={`h-4 w-4 ${isActive ? "text-white dark:text-slate-950" : "text-slate-600 dark:text-slate-400"}`}
                  />
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sorting & Filter Controls Toolbar */}
        <div className="mb-10 p-3 sm:p-4 rounded-[26px] bg-slate-50 dark:bg-[#0f0f13] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          {/* Quick Price Sort Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0 mr-1">
              <ArrowUpDown className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
              <span>Sort Price:</span>
            </span>

            <button
              type="button"
              onClick={() => {
                setSortBy(sortBy === "price-asc" ? "featured" : "price-asc");
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                sortBy === "price-asc"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-500/25 scale-[1.02]"
                  : "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-violet-400 hover:text-violet-600 dark:hover:text-white"
              }`}
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Price: Low to High</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSortBy(sortBy === "price-desc" ? "featured" : "price-desc");
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                sortBy === "price-desc"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-500/25 scale-[1.02]"
                  : "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-violet-400 hover:text-violet-600 dark:hover:text-white"
              }`}
            >
              <ArrowDown className="h-3.5 w-3.5" />
              <span>Price: High to Low</span>
            </button>

            {sortBy !== "featured" && (
              <button
                type="button"
                onClick={() => {
                  setSortBy("featured");
                  setCurrentPage(1);
                }}
                className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-2 underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* Results Count & Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-2.5 sm:gap-3 flex-shrink-0">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Showing <span className="font-extrabold text-slate-900 dark:text-white">{filteredVehicles.length}</span> vehicles
            </span>

            <div className="w-full sm:w-56">
              <CustomDropdown
                options={[
                  { value: "featured", label: "Featured Showcase", icon: <Sparkles className="h-3.5 w-3.5 text-violet-500" /> },
                  { value: "price-asc", label: "Price: Low to High", icon: <ArrowUp className="h-3.5 w-3.5 text-emerald-500" />, badge: "Budget" },
                  { value: "price-desc", label: "Price: High to Low", icon: <ArrowDown className="h-3.5 w-3.5 text-amber-500" />, badge: "Luxury" },
                  { value: "name-asc", label: "Name: A to Z" },
                ]}
                value={sortBy}
                onChange={(val) => {
                  setSortBy(val as "featured" | "price-asc" | "price-desc" | "name-asc");
                  setCurrentPage(1);
                }}
                variant="seller"
                position="auto"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Cards Grid (3x3) or Empty State */}
        {!loading && filteredVehicles.length === 0 ? (
          <div className="text-center py-16 px-4 bg-slate-50 dark:bg-white/5 rounded-[32px] border border-dashed border-slate-200 dark:border-white/10 mb-12">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Search className="h-8 w-8 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No Available Vehicles Found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-6">
              {searchQuery || locationQuery ? (
                <>
                  No vehicles found matching{" "}
                  {searchQuery ? (
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      &quot;{searchQuery}&quot;
                    </span>
                  ) : (
                    "your search"
                  )}
                  {locationQuery ? (
                    <>
                      {" "}in{" "}
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        &quot;{locationQuery}&quot;
                      </span>
                    </>
                  ) : null}
                  . Try resetting filters to see all available vehicles across Sri Lanka.
                </>
              ) : (
                "No vehicles are currently listed under this category. Check back soon or contact our concierge on WhatsApp."
              )}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset Filters & View Available</span>
              </button>
              <a
                href={`https://wa.me/${SITE_CONTACT.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Tourmate! I am looking to rent a vehicle in ${locationQuery || "Sri Lanka"} (${searchQuery || "any model"}). Could you help me with vehicle availability?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Request via WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVehicles.map((car, index) => (
              <ScrollReveal
                key={car.id}
                delay={(index % 3) * 100}
                direction="up"
                distance={28}
              >
                <div className="stripe-card rounded-[30px] p-6 shadow-sm hover:shadow-2xl flex flex-col justify-between group h-full">
                  {/* Silhouette & Top Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      {/* Availability Status Badge */}
                      {car.isAvailable ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {t("catalog_available_now")}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-500/10 px-2.5 py-0.5 rounded-full">
                          {car.status || "Reserved"}
                        </span>
                      )}

                      <span className="text-xs text-slate-400 font-bold">
                        {car.specs.distance}
                      </span>
                    </div>

                    {/* Vehicle Photo Container */}
                    <div className="relative aspect-[16/10] w-full rounded-[24px] overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-100 dark:border-white/10 mb-5 group-hover:shadow-lg transition-all">
                      <VehicleImage
                        src={car.thumbnails?.[0] || ""}
                        alt={car.name}
                        fallbackName={car.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity pointer-events-none" />

                      {/* Location Badge on Photo */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                        <div className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-black/70 backdrop-blur-md text-white border border-white/20 truncate flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-violet-400 flex-shrink-0" />
                          <span className="truncate">
                            {locationQuery.trim() ? `Pickup: ${locationQuery.trim()}` : (car.location || "Sri Lanka")}
                          </span>
                        </div>

                        <div className="px-2 py-1 rounded-full text-[10px] font-bold bg-black/70 backdrop-blur-md text-slate-200 border border-white/20 flex-shrink-0">
                          {car.specs.gearBox}
                        </div>
                      </div>
                    </div>

                    {/* Specs & Info */}
                    <div className="space-y-3">
                      {/* Header: Name + Price */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="title-hover-glow text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-violet-600 transition-colors">
                            {car.name}
                          </h3>
                          <p className="text-xs text-slate-400 font-medium mt-0.5">
                            {car.category} • {t("fleet_fully_insured")}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-lg font-bold text-violet-600 dark:text-violet-400 block leading-tight">
                            {car.price}
                          </span>
                          <span className="text-xs text-slate-400">{car.period}</span>
                        </div>
                      </div>

                      {/* 3 Quick Specs Pills: Transmission, Seats, AC */}
                      <div className="grid grid-cols-3 gap-1.5 py-2.5 border-t border-slate-100 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1 bg-slate-50 dark:bg-white/5 py-1.5 px-2 rounded-xl">
                          <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{car.specs.gearBox}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-50 dark:bg-white/5 py-1.5 px-2 rounded-xl">
                          <Users className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{car.specs.seats} {language === "si" ? "ආසන" : "Seats"}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-50 dark:bg-white/5 py-1.5 px-2 rounded-xl">
                          <Snowflake className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{language === "si" ? "වායුසමනය" : "AC"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons: View Details & Request to Book */}
                  <div className="pt-4 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOpenDetails(car)}
                      className="w-full py-3 rounded-[30px] border border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 font-bold text-xs transition-colors text-center cursor-pointer"
                    >
                      {t("catalog_btn_view_details")}
                    </button>
                    <button
                      onClick={() =>
                        setInquiryVehicle({
                          id: car.id,
                          name: car.name,
                          brand: car.brand,
                          category: car.category,
                          pricePerDay: car.price,
                          imageUrl: car.thumbnails[0],
                          location: locationQuery.trim() || car.location,
                          transmission: car.specs.gearBox,
                          seats: car.specs.seats,
                        })
                      }
                      className="w-full bg-slate-950 hover:bg-violet-700 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-400 dark:hover:text-white text-white font-bold text-xs py-3 rounded-[30px] shadow-sm transition-all active:scale-95 text-center cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>{t("fleet_btn_book")}</span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Pagination only if vehicles exist */}
        {!loading && filteredVehicles.length > 0 && (
          <div className="mt-14 flex items-center justify-center gap-3 sm:gap-4">
            {[1].map((page) => {
              const isCurrent = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full font-bold text-sm sm:text-base flex items-center justify-center transition-all duration-200 ${
                    isCurrent
                      ? "bg-black text-white shadow-md scale-105"
                      : "bg-[#e2e8f0] text-slate-800 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to page ${page}`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ANIMATED VEHICLE DETAIL SPECIFICATION MODAL */}
      {activeModalCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden">
          {/* Backdrop with Blur Fade-in */}
          <div
            onClick={handleCloseModal}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
            aria-hidden="true"
          />

          {/* Modal Container: cleanly rounded to 30px and overflow-hidden */}
          <div className="relative w-full max-w-5xl bg-white dark:bg-[#0b0b0e] rounded-[30px] shadow-2xl border border-slate-100/80 dark:border-white/10 my-auto z-10 max-h-[90vh] flex flex-col overflow-hidden transform transition-all duration-300 ease-out animate-in zoom-in-95 fade-in slide-in-from-bottom-6">
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-8 py-3.5 sm:py-5 border-b border-slate-100 dark:border-white/10 bg-white/95 dark:bg-[#0b0b0e]/95 backdrop-blur-sm sticky top-0 z-30 flex-shrink-0">
              {/* Vehicle Title + Status + Price + Location in requested sequence */}
              <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 min-w-0 flex-1">
                {/* 1. Name & Available Badge */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 dark:text-white tracking-tight capitalize">
                    {activeModalCar.name}
                  </h2>
                  {activeModalCar.isAvailable && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex-shrink-0">
                      Available
                    </span>
                  )}
                </div>

                {/* 2. Price (placed next to Available with space in between) */}
                <div className="inline-flex items-baseline gap-1 whitespace-nowrap flex-shrink-0">
                  <span className="text-lg sm:text-2xl font-black text-violet-600 dark:text-violet-400 whitespace-nowrap">
                    {activeModalCar.price}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-400 whitespace-nowrap">
                    {activeModalCar.period}
                  </span>
                </div>

                {/* 3. Location (placed after price) */}
                {(modalPickupLocation || activeModalCar.location) && (
                  <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 px-2.5 py-1 rounded-full max-w-full sm:max-w-xs truncate flex-shrink-0">
                    <MapPin className="h-3.5 w-3.5 text-violet-500 flex-shrink-0" />
                    <span className="truncate">
                      {modalPickupLocation ? `Pickup: ${modalPickupLocation}` : activeModalCar.location}
                    </span>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                aria-label="Close vehicle details"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all duration-200 hover:rotate-90 shadow-sm cursor-pointer flex-shrink-0 ml-1"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Scrollable Content inside Rounded Box */}
            <div className="overflow-y-auto px-4 sm:px-10 py-4 sm:py-6 space-y-6 sm:space-y-8 flex-1">
              {/* Main 2-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                {/* Left Column: Silhouette Graphic & Gallery Thumbnails */}
                <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                  {/* Main Selected Hero Photo with Loading Shimmer & Spinner */}
                  <div className="relative aspect-[16/10] w-full rounded-[24px] sm:rounded-[30px] overflow-hidden border border-slate-100/90 dark:border-white/5 shadow-inner group">
                    <VehicleImage
                      src={activeModalCar.thumbnails?.[activeThumbnailIndex] || activeModalCar.thumbnails?.[0] || ""}
                      alt={activeModalCar.name}
                      fallbackName={activeModalCar.name}
                      priority
                      className="object-cover group-hover:scale-105"
                    />
                    {activeModalCar.thumbnails && activeModalCar.thumbnails.length > 1 && (
                      <div className="absolute bottom-3 right-3 z-20 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold shadow-sm pointer-events-none">
                        {activeThumbnailIndex + 1} / {activeModalCar.thumbnails.length}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Gallery Previews */}
                  <div className="flex items-center gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar py-1">
                    {activeModalCar.thumbnails.map((thumb, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveThumbnailIndex(idx)}
                        className={`relative h-16 w-20 sm:h-24 sm:w-28 rounded-[16px] sm:rounded-[20px] overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                          activeThumbnailIndex === idx
                            ? "border-violet-600 ring-2 ring-violet-600/30 scale-105 shadow-md"
                            : "border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <VehicleImage
                          src={thumb}
                          alt={`${activeModalCar.name} preview thumbnail ${idx + 1}`}
                          fallbackName={activeModalCar.name}
                          showSpinner={false}
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Column: Technical Specification & Equipment */}
                <div className="lg:col-span-6 space-y-6 sm:space-y-7">
                  {/* Technical Specification Heading */}
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
                      Technical Specification
                    </h3>

                    {/* 2x3 Spec Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                      {/* 1. Gear Box */}
                      <div className="bg-slate-50 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1a1a22] rounded-[20px] p-3.5 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                        <div className="text-slate-800 dark:text-slate-200 mb-2">
                          <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">
                            Gear Box
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                            {activeModalCar.specs.gearBox}
                          </span>
                        </div>
                      </div>

                      {/* 2. Fuel */}
                      <div className="bg-slate-50 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1a1a22] rounded-[20px] p-3.5 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                        <div className="text-slate-800 dark:text-slate-200 mb-2">
                          <Fuel className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">
                            Fuel
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                            {activeModalCar.specs.fuel}
                          </span>
                        </div>
                      </div>

                      {/* 3. Doors */}
                      <div className="bg-slate-50 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1a1a22] rounded-[20px] p-3.5 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                        <div className="text-slate-800 dark:text-slate-200 mb-2">
                          <DoorOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">
                            Doors
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                            {activeModalCar.specs.doors}
                          </span>
                        </div>
                      </div>

                      {/* 4. Air Conditioner */}
                      <div className="bg-slate-50 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1a1a22] rounded-[20px] p-3.5 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                        <div className="text-slate-800 dark:text-slate-200 mb-2">
                          <Snowflake className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                            Air Conditioner
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                            {activeModalCar.specs.ac}
                          </span>
                        </div>
                      </div>

                      {/* 5. Seats */}
                      <div className="bg-slate-50 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1a1a22] rounded-[20px] p-3.5 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                        <div className="text-slate-800 dark:text-slate-200 mb-2">
                          <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">
                            Seats
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                            {activeModalCar.specs.seats}
                          </span>
                        </div>
                      </div>

                      {/* 6. Distance */}
                      <div className="bg-slate-50 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1a1a22] rounded-[20px] p-3.5 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                        <div className="text-slate-800 dark:text-slate-200 mb-2">
                          <Gauge className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white block">
                            Distance
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                            {activeModalCar.specs.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Adaptive Pickup Location in Modal */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#15151a] border border-slate-200/80 dark:border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                        <span>Pickup Location / Delivery Address:</span>
                      </label>
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full">
                        Adaptive
                      </span>
                    </div>
                    <LocationSearchInput
                      value={modalPickupLocation}
                      onChange={setModalPickupLocation}
                      placeholder="Type hotel, airport terminal, or address in Sri Lanka..."
                      variant="catalog"
                    />
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Tourmate delivers this vehicle directly to your chosen address anywhere in Sri Lanka.
                    </p>
                  </div>

                  {/* Main Action Button: Request to Book */}
                  <div>
                    <button
                      onClick={() => {
                        setInquiryVehicle({
                          id: activeModalCar.id,
                          name: activeModalCar.name,
                          brand: activeModalCar.brand,
                          category: activeModalCar.category,
                          pricePerDay: activeModalCar.price,
                          imageUrl: activeModalCar.thumbnails[0],
                          location: modalPickupLocation.trim() || activeModalCar.location,
                          transmission: activeModalCar.specs.gearBox,
                          seats: activeModalCar.specs.seats,
                        });
                      }}
                      className="w-full sm:w-3/5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm sm:text-base py-3.5 rounded-[30px] shadow-lg shadow-violet-500/25 transition-all duration-200 transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>Request to Book</span>
                    </button>
                  </div>

                  {/* Car Equipment Checklist */}
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                      Car Equipment
                    </h4>
                    <div className="grid grid-cols-2 gap-y-2.5 gap-x-6">
                      {activeModalCar.equipment.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-violet-600 dark:text-violet-400 fill-violet-100 dark:fill-violet-900/30 flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM: "Other popular options" - Visual Car Cards Grid */}
              <div className="pt-6 border-t border-slate-100 dark:border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    Other available vehicles
                  </h4>
                  <span className="text-xs text-slate-400">
                    Click any car to view details
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {vehiclesList
                    .filter((v) => v.id !== activeModalCar.id)
                    .slice(0, 4)
                    .map((other) => (
                      <button
                        key={other.id}
                        onClick={() => {
                          setActiveModalCar(other);
                          setActiveThumbnailIndex(0);
                        }}
                        className="text-left p-4 rounded-[24px] bg-slate-50/90 dark:bg-[#15151a] hover:bg-white dark:hover:bg-[#1c1c24] border border-slate-100 dark:border-white/10 hover:border-violet-200 dark:hover:border-violet-500/30 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                      >
                        {/* Mini Image Preview */}
                        <div className="relative aspect-[16/10] w-full rounded-xl bg-white dark:bg-black/40 border border-slate-100 dark:border-white/5 mb-3 flex items-center justify-center overflow-hidden">
                          <VehicleImage
                            src={other.thumbnails?.[0] || ""}
                            alt={other.name}
                            fallbackName={other.name}
                            showSpinner={false}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-sm font-bold text-slate-900 dark:text-white block leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                {other.name}
                              </span>
                              <span className="text-[11px] text-slate-400 font-medium">
                                {other.category}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 block">
                                {other.price}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {other.period}
                              </span>
                            </div>
                          </div>

                          {/* Mini specs preview */}
                          <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                            <span>{other.specs.gearBox}</span>
                            <span>{other.fuelCapacity}</span>
                            <span>AC</span>
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Booking Inquiry Modal */}
      {inquiryVehicle && (
        <BookingInquiryModal
          isOpen={Boolean(inquiryVehicle)}
          onClose={() => setInquiryVehicle(null)}
          vehicle={inquiryVehicle}
          initialPickupLocation={modalPickupLocation || locationQuery}
        />
      )}
    </div>
  );
}
