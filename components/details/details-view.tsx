"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Fuel,
  Snowflake,
  Users,
  Gauge,
  CheckCircle2,
  SlidersHorizontal,
  DoorOpen,
  ArrowRight,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { LocationSearchInput } from "@/components/ui/location-search-input";
import { BookingInquiryModal } from "@/components/booking/booking-inquiry-modal";
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

const VEHICLES: VehicleDetail[] = [
  {
    id: "mercedes-sedan",
    name: "Mercedes Benz C-Class",
    brand: "Mercedes-Benz",
    category: "Sedan",
    price: "LKR 25,000",
    priceNum: 25000,
    period: "per day",
    type: "sedan",
    fuelCapacity: "66 Ltr",
    specs: {
      gearBox: "Automatic",
      fuel: "Petrol",
      doors: 4,
      ac: "Dual Climate",
      seats: 5,
      distance: "Unlimited",
    },
    equipment: [
      "Full Comprehensive Insurance",
      "Burmester Surround Sound",
      "Executive Leather Seats",
      "Reverse Camera & Sensors",
      "Blind Spot Assist",
      "Dual Zone Air Conditioning",
    ],
    thumbnails: [
      "/images/car-side.jpg",
      "/images/car-fleet.jpg",
      "/images/hero-sri-lanka.jpg",
    ],
  },
  {
    id: "toyota-premio",
    name: "Toyota Premio G-Superior",
    brand: "Toyota",
    category: "Sedan",
    price: "LKR 16,500",
    priceNum: 16500,
    period: "per day",
    type: "sedan",
    fuelCapacity: "60 Ltr",
    specs: {
      gearBox: "Automatic",
      fuel: "Petrol / Hybrid",
      doors: 4,
      ac: "Yes",
      seats: 5,
      distance: "Unlimited",
    },
    equipment: [
      "Full Comprehensive Insurance",
      "Power Seats & Teak Finish",
      "Smart Key & Push Start",
      "Touch Audio & Bluetooth",
      "Reverse Camera & Park Assist",
      "Climate Control AC",
    ],
    thumbnails: [
      "/images/car-side.jpg",
      "/images/car-fleet.jpg",
      "/images/hero-sri-lanka.jpg",
    ],
  },
  {
    id: "honda-vezel",
    name: "Honda Vezel Hybrid Sensing",
    brand: "Honda",
    category: "SUV",
    price: "LKR 22,000",
    priceNum: 22000,
    period: "per day",
    type: "suv",
    fuelCapacity: "50 Ltr",
    specs: {
      gearBox: "Automatic (e-CVT)",
      fuel: "Hybrid (18 km/l)",
      doors: 5,
      ac: "Yes",
      seats: 5,
      distance: "Unlimited",
    },
    equipment: [
      "Full Comprehensive Insurance",
      "Honda Sensing Safety Suite",
      "High Ground Clearance",
      "Adaptive Cruise Control",
      "Roof Rails & Large Boot",
      "Dual Air Conditioning",
    ],
    thumbnails: [
      "/images/car-fleet.jpg",
      "/images/car-side.jpg",
      "/images/hero-sri-lanka.jpg",
    ],
  },
  {
    id: "toyota-kdh",
    name: "Toyota KDH Super GL Luxury",
    brand: "Toyota",
    category: "Minivan",
    price: "LKR 28,000",
    priceNum: 28000,
    period: "per day",
    type: "van",
    fuelCapacity: "70 Ltr",
    specs: {
      gearBox: "Automatic",
      fuel: "Diesel",
      doors: 5,
      ac: "Dual AC Line",
      seats: 10,
      distance: "Unlimited",
    },
    equipment: [
      "Full Comprehensive Insurance",
      "Dual Line AC for all rows",
      "Reclining Velvet Captain Seats",
      "Extra Large Luggage Area",
      "Driver Option Available",
      "High-Roof Comfort",
    ],
    thumbnails: [
      "/images/car-fleet.jpg",
      "/images/hero-sri-lanka.jpg",
      "/images/car-side.jpg",
    ],
  },
  {
    id: "ford-mustang",
    name: "Ford Mustang Convertible",
    brand: "Ford",
    category: "Cabriolet",
    price: "LKR 45,000",
    priceNum: 45000,
    period: "per day",
    type: "sport",
    fuelCapacity: "61 Ltr",
    specs: {
      gearBox: "10-Speed Auto",
      fuel: "Petrol EcoBoost",
      doors: 2,
      ac: "Yes",
      seats: 4,
      distance: "Unlimited",
    },
    equipment: [
      "Power Soft-Top Convertible",
      "Shaker Pro Audio System",
      "Brembo Brakes",
      "Track Apps & Drive Modes",
      "Wedding & Celebration Shoot Ready",
      "Air Conditioner",
    ],
    thumbnails: [
      "/images/car-side.jpg",
      "/images/car-fleet.jpg",
      "/images/hero-sri-lanka.jpg",
    ],
  },
  {
    id: "toyota-hilux",
    name: "Toyota Hilux 4x4 Offroad",
    brand: "Toyota",
    category: "Pickup",
    price: "LKR 32,000",
    priceNum: 32000,
    period: "per day",
    type: "suv",
    fuelCapacity: "80 Ltr",
    specs: {
      gearBox: "Automatic 4WD",
      fuel: "Diesel Turbo",
      doors: 4,
      ac: "Yes",
      seats: 5,
      distance: "Unlimited",
    },
    equipment: [
      "Full 4x4 High & Low Range",
      "Heavy-Duty Suspension",
      "Bed Liner & Cargo Hooks",
      "Hill Assist & Diff Lock",
      "Islandwide Mountain Trail Ready",
      "Air Conditioner",
    ],
    thumbnails: [
      "/images/car-fleet.jpg",
      "/images/car-side.jpg",
      "/images/hero-sri-lanka.jpg",
    ],
  },
  {
    id: "bmw-3",
    name: "BMW 3 Series M-Sport",
    brand: "BMW",
    category: "Sedan",
    price: "LKR 26,000",
    priceNum: 26000,
    period: "per day",
    type: "sedan",
    fuelCapacity: "65 Ltr",
    specs: {
      gearBox: "Steptronic Auto",
      fuel: "Petrol",
      doors: 4,
      ac: "Yes",
      seats: 5,
      distance: "Unlimited",
    },
    equipment: [
      "M-Sport Aerodynamics Package",
      "Harman Kardon Sound",
      "Sunroof & Ambient Lighting",
      "Parking Assistant Plus",
      "Wireless Apple CarPlay",
      "Air Conditioner",
    ],
    thumbnails: [
      "/images/car-side.jpg",
      "/images/hero-sri-lanka.jpg",
      "/images/car-fleet.jpg",
    ],
  },
  {
    id: "porsche-cayenne",
    name: "Porsche Cayenne Turbo",
    brand: "Porsche",
    category: "SUV",
    price: "LKR 55,000",
    priceNum: 55000,
    period: "per day",
    type: "suv",
    fuelCapacity: "90 Ltr",
    specs: {
      gearBox: "Tiptronic S",
      fuel: "Petrol V6 Turbo",
      doors: 5,
      ac: "4-Zone Climate",
      seats: 5,
      distance: "Unlimited",
    },
    equipment: [
      "Adaptive Air Suspension",
      "Bose Surround Sound System",
      "Panoramic Glass Roof",
      "Sport Chrono Package",
      "360 Degree Surround View",
      "Air Conditioner",
    ],
    thumbnails: [
      "/images/car-fleet.jpg",
      "/images/hero-sri-lanka.jpg",
      "/images/car-side.jpg",
    ],
  },
];

function DetailsContentInner() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const requestedCarId = searchParams.get("car") || searchParams.get("id") || "mercedes-sedan";

  const foundCar =
    VEHICLES.find((v) => v.id === requestedCarId) || VEHICLES[0];

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleDetail>(foundCar);
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);
  const [liveVehicles, setLiveVehicles] = useState<VehicleDetail[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Fetch all live vehicles for the fleet carousel
  useEffect(() => {
    async function loadLiveVehicles() {
      try {
        const res = await fetch("/api/vehicles");
        const data = await res.json();
        if (data.success && Array.isArray(data.vehicles) && data.vehicles.length > 0) {
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
              specs: {
                gearBox: v.transmission,
                fuel: v.fuelType,
                doors: v.doors || 4,
                ac: "Yes",
                seats: v.seats || 5,
                distance: v.mileageLimit || "Unlimited",
              },
              equipment:
                Array.isArray(v.features) && v.features.length > 0
                  ? v.features
                  : ["Air Conditioner", "Reverse Camera", "Bluetooth"],
              thumbnails: validGallery,
            };
          });
          setLiveVehicles(mapped);
        }
      } catch {
        // Fallback silently to static list
      }
    }
    loadLiveVehicles();
  }, []);

  // Initial location from query param
  const [pickupLocation, setPickupLocation] = useState(
    searchParams?.get("location") || ""
  );

  // Sync state whenever URL query params change
  useEffect(() => {
    const loc = searchParams?.get("location");
    if (loc) setPickupLocation(loc);

    const id = searchParams?.get("car") || searchParams?.get("id");
    if (id) {
      const match = VEHICLES.find((v) => v.id === id) || liveVehicles.find((v) => v.id === id);
      if (match) {
        setSelectedVehicle(match);
        setActiveThumbnailIndex(0);
      } else {
        // Fetch from API in case direct link or database vehicle
        fetch(`/api/vehicles/${id}`)
          .then((r) => r.json())
          .then((data) => {
            if (data.success && data.vehicle) {
              const v = data.vehicle;
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

              setSelectedVehicle({
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
                specs: {
                  gearBox: v.transmission,
                  fuel: v.fuelType,
                  doors: v.doors || 4,
                  ac: "Yes",
                  seats: v.seats || 5,
                  distance: v.mileageLimit || "Unlimited",
                },
                equipment:
                  Array.isArray(v.features) && v.features.length > 0
                    ? v.features
                    : ["Air Conditioner", "Reverse Camera", "Bluetooth"],
                thumbnails: validGallery,
              });
              setActiveThumbnailIndex(0);
            }
          })
          .catch(() => {});
      }
    }
  }, [searchParams, liveVehicles]);

  const handleSelectCar = (car: VehicleDetail) => {
    setSelectedVehicle(car);
    setActiveThumbnailIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookNow = () => {
    const chosenLoc = pickupLocation.trim() || selectedVehicle.location || "Sri Lanka";
    const msg = `Hello Tourmate! I would like to book the ${selectedVehicle.name} (${selectedVehicle.category}) at ${selectedVehicle.price} ${selectedVehicle.period}, pickup at ${chosenLoc}.`;
    window.open(
      `https://wa.me/${SITE_CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const pool = liveVehicles.length > 0 ? liveVehicles : VEHICLES;
  const otherCars = pool.filter((v) => v.id !== selectedVehicle.id).slice(0, 6);

  return (
    <div className="w-full bg-white dark:bg-black text-slate-900 dark:text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* TOP SECTION: Featured Car Details + Tech Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-20 pt-4">
          {/* Left Column: Title, Price, Silhouette, Thumbnails */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full mb-3">
                <span>{selectedVehicle.category} {t("details_category_suffix")}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                {selectedVehicle.name}
              </h1>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-violet-600 dark:text-violet-400">
                  {selectedVehicle.price}
                </span>
                <span className="text-sm font-medium text-slate-400 ml-1">
                  {language === "si" ? t("fleet_per_day") : selectedVehicle.period}
                </span>
              </div>
            </div>

            {/* Main Hero Photo View with Loading Shimmer & Spinner */}
            <div className="relative aspect-[16/9] w-full rounded-[30px] bg-slate-50 dark:bg-[#111116] border border-slate-100/90 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-inner group">
              <VehicleImage
                src={selectedVehicle.thumbnails?.[activeThumbnailIndex] || selectedVehicle.thumbnails?.[0] || ""}
                alt={`${selectedVehicle.name} - View ${activeThumbnailIndex + 1}`}
                fallbackName={selectedVehicle.name}
                className="object-cover group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Photo Counter Badge */}
              {selectedVehicle.thumbnails && selectedVehicle.thumbnails.length > 1 && (
                <div className="absolute bottom-3.5 right-3.5 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-sm pointer-events-none">
                  {activeThumbnailIndex + 1} / {selectedVehicle.thumbnails.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery Previews */}
            <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 no-scrollbar">
              {selectedVehicle.thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveThumbnailIndex(idx)}
                  className={`relative h-20 w-24 sm:h-24 sm:w-28 flex-shrink-0 rounded-[20px] overflow-hidden border-2 transition-all cursor-pointer ${
                    activeThumbnailIndex === idx
                      ? "border-violet-600 ring-2 ring-violet-600/30 scale-105 shadow-md"
                      : "border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <VehicleImage
                    src={thumb}
                    alt={`${selectedVehicle.name} preview ${idx + 1}`}
                    fallbackName={selectedVehicle.name}
                    showSpinner={false}
                    className="object-cover"
                    sizes="(max-width: 640px) 96px, 112px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Technical Specification & Equipment */}
          <div className="lg:col-span-6 space-y-8">
            {/* Technical Specification Heading */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
                {t("details_tech_spec")}
              </h2>

              {/* 2x3 Spec Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {/* 1. Gear Box */}
                <div className="bg-slate-50/90 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1c1c24] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 dark:text-slate-200 mb-2">
                    <SlidersHorizontal className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {t("details_gearbox")}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                      {selectedVehicle.specs.gearBox}
                    </span>
                  </div>
                </div>

                {/* 2. Fuel */}
                <div className="bg-slate-50/90 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1c1c24] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 dark:text-slate-200 mb-2">
                    <Fuel className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {t("details_fuel")}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                      {selectedVehicle.specs.fuel}
                    </span>
                  </div>
                </div>

                {/* 3. Doors */}
                <div className="bg-slate-50/90 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1c1c24] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 dark:text-slate-200 mb-2">
                    <DoorOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {t("details_doors")}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                      {selectedVehicle.specs.doors}
                    </span>
                  </div>
                </div>

                {/* 4. Air Conditioner */}
                <div className="bg-slate-50/90 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1c1c24] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 dark:text-slate-200 mb-2">
                    <Snowflake className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                      {t("details_ac")}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                      {selectedVehicle.specs.ac}
                    </span>
                  </div>
                </div>

                {/* 5. Seats */}
                <div className="bg-slate-50/90 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1c1c24] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 dark:text-slate-200 mb-2">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {t("details_seats")}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                      {selectedVehicle.specs.seats} {language === "si" ? "ආසන" : "Seats"}
                    </span>
                  </div>
                </div>

                {/* 6. Distance */}
                <div className="bg-slate-50/90 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1c1c24] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 dark:text-slate-200 mb-2">
                    <Gauge className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {t("details_distance")}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                      {selectedVehicle.specs.distance}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Adaptive Pickup Location Selection */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#15151a] border border-slate-200/80 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                  <span>{t("details_pickup_label")}</span>
                </label>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {t("details_live_search")}
                </span>
              </div>
              <LocationSearchInput
                value={pickupLocation}
                onChange={setPickupLocation}
                placeholder={t("details_pickup_placeholder")}
                variant="catalog"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {t("details_delivery_guarantee")}
              </p>
            </div>

            {/* Main Action Buttons: Request to Book + Direct WhatsApp */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full sm:flex-1 bg-violet-600 hover:bg-violet-700 text-white font-black text-sm sm:text-base py-3.5 sm:py-4 rounded-[30px] shadow-lg shadow-violet-500/25 transition-all duration-200 transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{t("details_btn_request")}</span>
              </button>

              <button
                type="button"
                onClick={handleBookNow}
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[48px]"
              >
                <span>{t("details_btn_whatsapp")}</span>
              </button>
            </div>

            {/* Car Equipment Checklist */}
            <div className="pt-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                {t("details_equipment_title")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-3.5 gap-x-4 sm:gap-x-6">
                {selectedVehicle.equipment.map((item, idx) => (
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

        {/* BOTTOM SECTION: Other Cars Grid */}
        <div className="pt-10 border-t border-slate-200 dark:border-white/10">
          {/* Section Heading */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {t("details_other_cars")}
            </h2>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-950 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors group"
            >
              <span>{t("details_view_all")}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 6 Car Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
            {otherCars.map((car, index) => (
              <ScrollReveal
                key={car.id}
                delay={(index % 3) * 100}
                direction="up"
                distance={28}
              >
                <div className="card-hover-lift bg-[#f8fafc] dark:bg-[#111116] hover:bg-white dark:hover:bg-[#16161d] rounded-[18px] sm:rounded-[30px] p-2.5 sm:p-6 border border-slate-100/90 dark:border-white/10 shadow-sm hover:border-slate-200 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between group h-full">
                  {/* Car Photo Container */}
                  <div className="relative aspect-[16/9] w-full rounded-[14px] sm:rounded-[24px] bg-white dark:bg-black/40 border border-slate-100 dark:border-white/5 mb-2 sm:mb-6 flex items-center justify-center overflow-hidden group-hover:bg-slate-50/50 dark:group-hover:bg-black/60 transition-colors">
                    <VehicleImage
                      src={car.thumbnails?.[0] || ""}
                      alt={car.name}
                      fallbackName={car.name}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Specs and Details */}
                  <div className="space-y-1.5 sm:space-y-4">
                    {/* Name and Price */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-0.5 sm:gap-2">
                      <div className="min-w-0">
                        <h3 className="title-hover-glow text-xs sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                          {car.name}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-slate-400 font-medium truncate">
                          {car.category}
                        </p>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0 flex items-baseline sm:block gap-1 mt-0.5 sm:mt-0">
                        <span className="text-xs sm:text-base lg:text-lg font-bold text-violet-600 dark:text-violet-400 block leading-tight">
                          {car.price}
                        </span>
                        <span className="text-[9px] sm:text-xs text-slate-400">{language === "si" ? t("fleet_per_day") : car.period}</span>
                      </div>
                    </div>

                    {/* 3 Specs: Automatic, Fuel / 70 Ltr, AC */}
                    <div className="grid grid-cols-3 gap-0.5 sm:gap-1.5 py-1 sm:py-3 border-t border-slate-200/70 dark:border-white/10 text-[9px] sm:text-[11px] text-slate-500 dark:text-slate-400">
                      <div className="flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1">
                        <SlidersHorizontal className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{car.specs.gearBox}</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1">
                        <Fuel className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{car.specs.fuel}</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1">
                        <Snowflake className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{t("details_ac")}</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => handleSelectCar(car)}
                      className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-[10px] sm:text-sm py-1.5 sm:py-3.5 rounded-[14px] sm:rounded-[30px] shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-center cursor-pointer"
                    >
                      {t("details_view_details")}
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Inquiry Modal */}
      {selectedVehicle && (
        <BookingInquiryModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          vehicle={{
            id: selectedVehicle.id,
            name: selectedVehicle.name,
            brand: selectedVehicle.brand,
            category: selectedVehicle.category,
            pricePerDay: selectedVehicle.price,
            imageUrl: selectedVehicle.thumbnails[0],
            location: pickupLocation.trim() || selectedVehicle.location,
            transmission: selectedVehicle.specs.gearBox,
            seats: selectedVehicle.specs.seats,
          }}
          initialPickupLocation={pickupLocation}
        />
      )}
    </div>
  );
}

export function DetailsView() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[50vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-600" />
        </div>
      }
    >
      <DetailsContentInner />
    </Suspense>
  );
}
