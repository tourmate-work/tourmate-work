"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
} from "lucide-react";

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

const CATEGORIES = [
  { id: "all", label: "All vehicles", hasIcon: false },
  { id: "Sedan", label: "Sedan", hasIcon: true },
  { id: "Cabriolet", label: "Cabriolet", hasIcon: true },
  { id: "Pickup", label: "Pickup", hasIcon: true },
  { id: "SUV", label: "SUV", hasIcon: true },
  { id: "Minivan", label: "Minivan", hasIcon: true },
];

const ALL_VEHICLES: VehicleDetail[] = [
  {
    id: "bmw-3",
    name: "BMW",
    brand: "BMW",
    category: "Sedan",
    price: "$25",
    priceNum: 25,
    period: "/ day",
    type: "sedan",
    fuelCapacity: "65 Ltr",
    specs: {
      gearBox: "Automatic",
      fuel: "Petrol",
      doors: 5,
      ac: "Yes",
      seats: 5,
      distance: "500 KM",
    },
    equipment: [
      "ABS",
      "Air Bags",
      "Cruise control",
      "GPS Navigation",
      "Bluetooth & CarPlay",
      "Air Conditioner",
    ],
    thumbnails: [
      "/images/car-side.jpg",
      "/images/hero-sri-lanka.jpg",
      "/images/car-fleet.jpg",
    ],
  },
  {
    id: "mercedes-sedan",
    name: "Mercedes",
    brand: "Mercedes",
    category: "Sedan",
    price: "$25",
    priceNum: 25,
    period: "per day",
    type: "sedan",
    fuelCapacity: "70 Ltr",
    specs: {
      gearBox: "Automatic",
      fuel: "Petrol",
      doors: 4,
      ac: "Yes",
      seats: 5,
      distance: "500 KM",
    },
    equipment: [
      "ABS",
      "Air Bags",
      "Cruise control",
      "Reverse Camera",
      "Heated Seats",
      "Air Conditioner",
    ],
    thumbnails: [
      "/images/car-side.jpg",
      "/images/car-fleet.jpg",
      "/images/hero-sri-lanka.jpg",
    ],
  },
  {
    id: "mercedes-sport",
    name: "Mercedes",
    brand: "Mercedes",
    category: "Sport",
    price: "$50",
    priceNum: 50,
    period: "per day",
    type: "sport",
    fuelCapacity: "65 Ltr",
    specs: {
      gearBox: "Automatic",
      fuel: "Petrol",
      doors: 2,
      ac: "Yes",
      seats: 2,
      distance: "Unlimited",
    },
    equipment: [
      "ABS",
      "Dual Air Bags",
      "Sport Suspension",
      "Launch Control",
      "Premium Audio",
      "Climate Control",
    ],
    thumbnails: [
      "/images/car-side.jpg",
      "/images/car-fleet.jpg",
      "/images/hero-sri-lanka.jpg",
    ],
  },
  {
    id: "mercedes-e-class",
    name: "Mercedes",
    brand: "Mercedes",
    category: "Sedan",
    price: "$45",
    priceNum: 45,
    period: "per day",
    type: "sedan",
    fuelCapacity: "75 Ltr",
    specs: {
      gearBox: "Automatic",
      fuel: "Petrol",
      doors: 4,
      ac: "Yes",
      seats: 5,
      distance: "500 KM",
    },
    equipment: [
      "ABS",
      "Air Bags",
      "Lane Assist",
      "Adaptive Cruise",
      "Leather Interior",
      "Air Conditioner",
    ],
    thumbnails: [
      "/images/car-side.jpg",
      "/images/car-fleet.jpg",
      "/images/hero-sri-lanka.jpg",
    ],
  },
  {
    id: "porsche-macan",
    name: "Porsche",
    brand: "Porsche",
    category: "SUV",
    price: "$40",
    priceNum: 40,
    period: "per day",
    type: "suv",
    fuelCapacity: "75 Ltr",
    specs: {
      gearBox: "Automatic",
      fuel: "Petrol",
      doors: 5,
      ac: "Yes",
      seats: 5,
      distance: "600 KM",
    },
    equipment: [
      "ABS",
      "All-Wheel Drive",
      "Air Bags",
      "Panoramic Sunroof",
      "Parking Sensors",
      "Air Conditioner",
    ],
    thumbnails: [
      "/images/car-fleet.jpg",
      "/images/car-side.jpg",
      "/images/hero-sri-lanka.jpg",
    ],
  },
  {
    id: "toyota-premio",
    name: "Toyota",
    brand: "Toyota",
    category: "Sedan",
    price: "$35",
    priceNum: 35,
    period: "per day",
    type: "sedan",
    fuelCapacity: "60 Ltr",
    specs: {
      gearBox: "Automatic",
      fuel: "Hybrid",
      doors: 4,
      ac: "Yes",
      seats: 5,
      distance: "700 KM",
    },
    equipment: [
      "ABS",
      "Eco Mode",
      "Air Bags",
      "Touch Screen Audio",
      "Smart Key Entry",
      "Air Conditioner",
    ],
    thumbnails: [
      "/images/car-side.jpg",
      "/images/car-fleet.jpg",
      "/images/hero-sri-lanka.jpg",
    ],
  },
  {
    id: "porsche-cayenne",
    name: "Porsche",
    brand: "Porsche",
    category: "SUV",
    price: "$50",
    priceNum: 50,
    period: "per day",
    type: "suv",
    fuelCapacity: "90 Ltr",
    specs: {
      gearBox: "Automatic",
      fuel: "Petrol",
      doors: 5,
      ac: "Yes",
      seats: 5,
      distance: "Unlimited",
    },
    equipment: [
      "ABS",
      "AWD System",
      "Surround Air Bags",
      "360 Camera",
      "Bose Sound System",
      "Air Conditioner",
    ],
    thumbnails: [
      "/images/car-fleet.jpg",
      "/images/hero-sri-lanka.jpg",
      "/images/car-side.jpg",
    ],
  },
  {
    id: "toyota-hilux",
    name: "Toyota",
    brand: "Toyota",
    category: "Pickup",
    price: "$40",
    priceNum: 40,
    period: "per day",
    type: "suv",
    fuelCapacity: "80 Ltr",
    specs: {
      gearBox: "Automatic",
      fuel: "Diesel",
      doors: 4,
      ac: "Yes",
      seats: 5,
      distance: "Unlimited",
    },
    equipment: [
      "ABS",
      "4WD High/Low",
      "Tow Package",
      "Heavy Duty Bed Liner",
      "Air Bags",
      "Air Conditioner",
    ],
    thumbnails: [
      "/images/car-fleet.jpg",
      "/images/car-side.jpg",
      "/images/hero-sri-lanka.jpg",
    ],
  },
  {
    id: "toyota-kdh",
    name: "Toyota",
    brand: "Toyota",
    category: "Minivan",
    price: "$45",
    priceNum: 45,
    period: "per day",
    type: "van",
    fuelCapacity: "70 Ltr",
    specs: {
      gearBox: "Automatic",
      fuel: "Diesel",
      doors: 5,
      ac: "Yes",
      seats: 9,
      distance: "Unlimited",
    },
    equipment: [
      "ABS",
      "Dual Air Conditioning",
      "Adjustable Seats",
      "Huge Luggage Space",
      "Air Bags",
      "Bluetooth System",
    ],
    thumbnails: [
      "/images/car-fleet.jpg",
      "/images/hero-sri-lanka.jpg",
      "/images/car-side.jpg",
    ],
  },
];

function VehicleVectorGraphic({ type }: { type: string }) {
  if (type === "sport") {
    return (
      <svg
        viewBox="0 0 450 160"
        className="w-full max-w-[340px] h-auto text-slate-300 drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
        fill="currentColor"
      >
        <path d="M38 100c0-6 4-12 11-14l30-8 62-24c18-7 37-10 56-10h70c20 0 40 5 57 15l48 26c12 7 21 16 26 27 6 12 8 20 8 30v6c0 5-4 9-9 9h-24c-4-15-18-26-35-26s-31 11-35 26h-152c-4-15-18-26-35-26s-31 11-35 26H46c-5 0-8-4-8-9v-23zm73 31c9 0 17 8 17 17s-8 17-17 17-17-8-17-17 8-17 17-17zm222 0c9 0 17 8 17 17s-8 17-17 17-17-8-17-17 8-17 17-17zm-180-55h88l-14-22c-20 1-38 8-48 22h-26zm106 0h64l-38-21c-12-3-24-3-36-1l10 22z" />
      </svg>
    );
  }

  if (type === "suv" || type === "van") {
    return (
      <svg
        viewBox="0 0 450 180"
        className="w-full max-w-[340px] h-auto text-slate-300 drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
        fill="currentColor"
      >
        <path d="M40 115c0-10 6-18 16-20l18-4c12-32 38-52 74-53l120-2c28 0 54 14 70 38l38 19c15 8 26 20 32 34 5 12 7 24 7 36v12c0 6-4 10-10 10h-28c-4-18-20-32-40-32s-36 14-40 32H165c-4-18-20-32-40-32s-36 14-40 32H48c-5 0-8-4-8-10v-32zm67 33c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20zm210 0c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20zm-180-69h94l-2-36c-28 2-54 14-68 36h-24zm114 0h76l-46-33c-16-4-32-4-48-2l18 35z" />
      </svg>
    );
  }

  // Default sedan
  return (
    <svg
      viewBox="0 0 450 170"
      className="w-full max-w-[340px] h-auto text-slate-300 drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
      fill="currentColor"
    >
      <path d="M42 108c0-10 6-18 16-20l22-4c12-26 36-44 66-46l88-4c30 0 58 14 74 38l48 18c14 6 26 16 33 28 8 12 12 24 12 38v10c0 6-4 10-10 10h-26c-4-18-20-32-40-32s-36 14-40 32H147c-4-18-20-32-40-32s-36 14-40 32H52c-6 0-10-4-10-10v-30zm65 30c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20zm214 0c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20zm-186-62h78l-2-32c-24 2-46 12-58 32h-18zm96 0h70l-42-30c-14-4-28-4-42-2l14 32z" />
    </svg>
  );
}

function CarPillIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  );
}

export function VehiclesCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModalCar, setActiveModalCar] = useState<VehicleDetail | null>(null);
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);

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

  const filteredVehicles =
    selectedCategory === "all"
      ? ALL_VEHICLES
      : ALL_VEHICLES.filter((v) => v.category === selectedCategory);

  const handleOpenDetails = (car: VehicleDetail) => {
    setActiveModalCar(car);
    setActiveThumbnailIndex(0);
  };

  const handleCloseModal = () => {
    setActiveModalCar(null);
  };

  const handleBookNow = (car: VehicleDetail) => {
    const msg = `Hello Tourmate! I would like to book the ${car.name} (${car.category}) at ${car.price} ${car.period}.`;
    window.open(
      `https://wa.me/94703236834?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <div className="w-full bg-white text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight mb-3">
            Select a vehicle group
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            Explore our diverse rental fleet across Sri Lanka. Choose from premium sedans, rugged SUVs, luxury convertibles, and spacious minivans.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3.5 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage(1);
                }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm ${
                  isActive
                    ? "bg-black text-white shadow-slate-900/20 hover:bg-slate-800"
                    : "bg-slate-100/90 text-slate-700 hover:bg-slate-200/90 hover:text-slate-900"
                }`}
              >
                {cat.hasIcon && (
                  <CarPillIcon
                    className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-600"}`}
                  />
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Vehicle Cards Grid (3x3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVehicles.map((car, index) => (
            <div
              key={car.id}
              style={{ animationDelay: `${index * 60}ms` }}
              className="card-hover-lift bg-[#f8fafc] hover:bg-white rounded-[30px] p-6 border border-slate-100/90 shadow-sm hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group animate-fade-in-up"
            >
              {/* Silhouette Container */}
              <div className="relative aspect-[16/9] w-full rounded-[24px] bg-white border border-slate-100 mb-6 flex items-center justify-center overflow-hidden p-4 group-hover:bg-slate-50/50 transition-colors">
                <VehicleVectorGraphic type={car.type} />
              </div>

              {/* Specs & Info */}
              <div className="space-y-4">
                {/* Header: Name + Price */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="title-hover-glow text-xl font-bold text-slate-900 leading-snug group-hover:text-violet-600 transition-colors">
                      {car.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {car.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-violet-600 block leading-tight">
                      {car.price}
                    </span>
                    <span className="text-xs text-slate-400">{car.period}</span>
                  </div>
                </div>

                {/* 3 Quick Specs Pills */}
                <div className="grid grid-cols-3 gap-1.5 py-3 border-t border-slate-200/70 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                    <span className="truncate">{car.specs.gearBox}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="h-3.5 w-3.5 text-slate-400" />
                    <span className="truncate">{car.fuelCapacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Snowflake className="h-3.5 w-3.5 text-slate-400" />
                    <span className="truncate">Air Conditioner</span>
                  </div>
                </div>

                {/* View Details Animated Opener Button */}
                <button
                  onClick={() => handleOpenDetails(car)}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-3.5 rounded-[30px] shadow-md shadow-violet-500/15 hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 active:scale-[0.98] text-center flex items-center justify-center gap-2 group-hover:bg-violet-700"
                >
                  <span className="tracking-wide">View Details</span>
                  <Sparkles className="h-4 w-4 opacity-70 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination: 1 2 3 4 5 6 */}
        <div className="mt-14 flex items-center justify-center gap-3 sm:gap-4">
          {[1, 2, 3, 4, 5, 6].map((page) => {
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
          <div className="relative w-full max-w-5xl bg-white rounded-[30px] shadow-2xl border border-slate-100/80 my-auto z-10 max-h-[90vh] flex flex-col overflow-hidden transform transition-all duration-300 ease-out animate-in zoom-in-95 fade-in slide-in-from-bottom-6">
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-5 sm:py-6 border-b border-slate-100 bg-white/95 backdrop-blur-sm sticky top-0 z-30 flex-shrink-0">
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  {activeModalCar.name}
                </h2>
                <span className="text-xl sm:text-2xl font-bold text-violet-600">
                  {activeModalCar.price}
                  <span className="text-xs sm:text-sm font-medium text-slate-400 ml-1">
                    {activeModalCar.period}
                  </span>
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                aria-label="Close vehicle details"
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 flex items-center justify-center transition-all duration-200 hover:rotate-90 shadow-sm"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Scrollable Content inside Rounded Box */}
            <div className="overflow-y-auto px-6 sm:px-10 py-6 space-y-8 flex-1">
              {/* Main 2-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Silhouette Graphic & Gallery Thumbnails */}
                <div className="lg:col-span-6 space-y-5">
                  {/* Silhouette Card */}
                  <div className="relative aspect-[16/9] w-full rounded-[30px] bg-slate-50 border border-slate-100/90 flex items-center justify-center p-6 overflow-hidden shadow-inner">
                    <VehicleVectorGraphic type={activeModalCar.type} />
                  </div>

                  {/* 3 Thumbnail Gallery Previews */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    {activeModalCar.thumbnails.map((thumb, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveThumbnailIndex(idx)}
                        className={`relative h-20 w-24 sm:h-24 sm:w-28 rounded-[20px] overflow-hidden border-2 transition-all ${
                          activeThumbnailIndex === idx
                            ? "border-violet-600 ring-2 ring-violet-600/30 scale-105 shadow-md"
                            : "border-slate-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={thumb}
                          alt={`${activeModalCar.name} preview thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Column: Technical Specification & Equipment */}
                <div className="lg:col-span-6 space-y-7">
                  {/* Technical Specification Heading */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
                      Technical Specification
                    </h3>

                    {/* 2x3 Spec Cards Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* 1. Gear Box */}
                      <div className="bg-slate-50 hover:bg-slate-100/80 rounded-[20px] p-3.5 border border-slate-100 transition-all flex flex-col justify-between">
                        <div className="text-slate-800 mb-2">
                          <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Gear Box
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium truncate block">
                            {activeModalCar.specs.gearBox}
                          </span>
                        </div>
                      </div>

                      {/* 2. Fuel */}
                      <div className="bg-slate-50 hover:bg-slate-100/80 rounded-[20px] p-3.5 border border-slate-100 transition-all flex flex-col justify-between">
                        <div className="text-slate-800 mb-2">
                          <Fuel className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Fuel
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium truncate block">
                            {activeModalCar.specs.fuel}
                          </span>
                        </div>
                      </div>

                      {/* 3. Doors */}
                      <div className="bg-slate-50 hover:bg-slate-100/80 rounded-[20px] p-3.5 border border-slate-100 transition-all flex flex-col justify-between">
                        <div className="text-slate-800 mb-2">
                          <DoorOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Doors
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium truncate block">
                            {activeModalCar.specs.doors}
                          </span>
                        </div>
                      </div>

                      {/* 4. Air Conditioner */}
                      <div className="bg-slate-50 hover:bg-slate-100/80 rounded-[20px] p-3.5 border border-slate-100 transition-all flex flex-col justify-between">
                        <div className="text-slate-800 mb-2">
                          <Snowflake className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block leading-tight">
                            Air Conditioner
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium truncate block">
                            {activeModalCar.specs.ac}
                          </span>
                        </div>
                      </div>

                      {/* 5. Seats */}
                      <div className="bg-slate-50 hover:bg-slate-100/80 rounded-[20px] p-3.5 border border-slate-100 transition-all flex flex-col justify-between">
                        <div className="text-slate-800 mb-2">
                          <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Seats
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium truncate block">
                            {activeModalCar.specs.seats}
                          </span>
                        </div>
                      </div>

                      {/* 6. Distance */}
                      <div className="bg-slate-50 hover:bg-slate-100/80 rounded-[20px] p-3.5 border border-slate-100 transition-all flex flex-col justify-between">
                        <div className="text-slate-800 mb-2">
                          <Gauge className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Distance
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium truncate block">
                            {activeModalCar.specs.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rent A Car CTA Button */}
                  <div>
                    <button
                      onClick={() => handleBookNow(activeModalCar)}
                      className="w-full sm:w-3/5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm sm:text-base py-3.5 rounded-[30px] shadow-lg shadow-violet-500/25 transition-all duration-200 transform active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      Rent a car
                    </button>
                  </div>

                  {/* Car Equipment Checklist */}
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-3">
                      Car Equipment
                    </h4>
                    <div className="grid grid-cols-2 gap-y-2.5 gap-x-6">
                      {activeModalCar.equipment.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-violet-600 fill-violet-100 flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-medium text-slate-700">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM: "Other popular options" - Visual Car Cards Grid */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-slate-900">
                    Other popular options
                  </h4>
                  <span className="text-xs text-slate-400">
                    Click any car to view details
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {ALL_VEHICLES.filter((v) => v.id !== activeModalCar.id)
                    .slice(0, 4)
                    .map((other) => (
                      <button
                        key={other.id}
                        onClick={() => {
                          setActiveModalCar(other);
                          setActiveThumbnailIndex(0);
                        }}
                        className="text-left p-4 rounded-[24px] bg-slate-50/90 hover:bg-white border border-slate-100 hover:border-violet-200 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
                      >
                        {/* Mini Silhouette Image */}
                        <div className="relative aspect-[16/10] w-full rounded-xl bg-white border border-slate-100 mb-3 flex items-center justify-center overflow-hidden p-2">
                          <VehicleVectorGraphic type={other.type} />
                        </div>

                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-sm font-bold text-slate-900 block leading-snug group-hover:text-violet-600 transition-colors">
                                {other.name}
                              </span>
                              <span className="text-[11px] text-slate-400 font-medium">
                                {other.category}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-bold text-violet-600 block">
                                {other.price}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {other.period}
                              </span>
                            </div>
                          </div>

                          {/* Mini specs preview */}
                          <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
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
    </div>
  );
}
