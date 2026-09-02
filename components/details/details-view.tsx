"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
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

const VEHICLES: VehicleDetail[] = [
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
];

function VehicleVectorGraphic({ type }: { type: string }) {
  if (type === "sport") {
    return (
      <svg
        viewBox="0 0 450 160"
        className="w-full max-w-[360px] h-auto text-slate-300 drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
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
        className="w-full max-w-[360px] h-auto text-slate-300 drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
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
      className="w-full max-w-[360px] h-auto text-slate-300 drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
      fill="currentColor"
    >
      <path d="M42 108c0-10 6-18 16-20l22-4c12-26 36-44 66-46l88-4c30 0 58 14 74 38l48 18c14 6 26 16 33 28 8 12 12 24 12 38v10c0 6-4 10-10 10h-26c-4-18-20-32-40-32s-36 14-40 32H147c-4-18-20-32-40-32s-36 14-40 32H52c-6 0-10-4-10-10v-30zm65 30c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20zm214 0c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20zm-186-62h78l-2-32c-24 2-46 12-58 32h-18zm96 0h70l-42-30c-14-4-28-4-42-2l14 32z" />
    </svg>
  );
}

function DetailsContentInner() {
  const searchParams = useSearchParams();
  const initialCarId = searchParams.get("car") || "bmw-3";

  const foundCar =
    VEHICLES.find((v) => v.id === initialCarId) || VEHICLES[0];

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleDetail>(foundCar);
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);

  const handleSelectCar = (car: VehicleDetail) => {
    setSelectedVehicle(car);
    setActiveThumbnailIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookNow = () => {
    const msg = `Hello Tourmate! I would like to rent the ${selectedVehicle.name} (${selectedVehicle.category}) at ${selectedVehicle.price} ${selectedVehicle.period}.`;
    window.open(
      `https://wa.me/94703236834?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const otherCars = VEHICLES.filter((v) => v.id !== selectedVehicle.id).slice(0, 6);

  return (
    <div className="w-full bg-white text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* TOP SECTION: Featured Car Details + Tech Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-20 pt-4">
          {/* Left Column: Title, Price, Silhouette, Thumbnails */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                {selectedVehicle.name}
              </h1>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-violet-600">
                  {selectedVehicle.price}
                </span>
                <span className="text-sm font-medium text-slate-400">
                  {selectedVehicle.period}
                </span>
              </div>
            </div>

            {/* Main Silhouette View */}
            <div className="relative aspect-[16/9] w-full rounded-3xl bg-slate-50 border border-slate-100/90 flex items-center justify-center p-8 overflow-hidden shadow-inner">
              <VehicleVectorGraphic type={selectedVehicle.type} />
            </div>

            {/* 3 Thumbnail Gallery Previews */}
            <div className="flex items-center gap-4">
              {selectedVehicle.thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveThumbnailIndex(idx)}
                  className={`relative h-20 w-24 sm:h-24 sm:w-28 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeThumbnailIndex === idx
                      ? "border-violet-600 ring-2 ring-violet-600/30 scale-105 shadow-md"
                      : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={thumb}
                    alt={`${selectedVehicle.name} preview ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Technical Specification & Equipment */}
          <div className="lg:col-span-6 space-y-8">
            {/* Technical Specification Heading */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                Technical Specification
              </h2>

              {/* 2x3 Spec Cards Grid */}
              <div className="grid grid-cols-3 gap-3.5 sm:gap-4">
                {/* 1. Gear Box */}
                <div className="bg-slate-50/90 hover:bg-slate-100/80 rounded-2xl p-4 border border-slate-100 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 mb-2">
                    <SlidersHorizontal className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Gear Box
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium truncate block">
                      {selectedVehicle.specs.gearBox}
                    </span>
                  </div>
                </div>

                {/* 2. Fuel */}
                <div className="bg-slate-50/90 hover:bg-slate-100/80 rounded-2xl p-4 border border-slate-100 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 mb-2">
                    <Fuel className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Fuel
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium truncate block">
                      {selectedVehicle.specs.fuel}
                    </span>
                  </div>
                </div>

                {/* 3. Doors */}
                <div className="bg-slate-50/90 hover:bg-slate-100/80 rounded-2xl p-4 border border-slate-100 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 mb-2">
                    <DoorOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Doors
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium truncate block">
                      {selectedVehicle.specs.doors}
                    </span>
                  </div>
                </div>

                {/* 4. Air Conditioner */}
                <div className="bg-slate-50/90 hover:bg-slate-100/80 rounded-2xl p-4 border border-slate-100 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 mb-2">
                    <Snowflake className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">
                      Air Conditioner
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium truncate block">
                      {selectedVehicle.specs.ac}
                    </span>
                  </div>
                </div>

                {/* 5. Seats */}
                <div className="bg-slate-50/90 hover:bg-slate-100/80 rounded-2xl p-4 border border-slate-100 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 mb-2">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Seats
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium truncate block">
                      {selectedVehicle.specs.seats}
                    </span>
                  </div>
                </div>

                {/* 6. Distance */}
                <div className="bg-slate-50/90 hover:bg-slate-100/80 rounded-2xl p-4 border border-slate-100 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 mb-2">
                    <Gauge className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Distance
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium truncate block">
                      {selectedVehicle.specs.distance}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rent A Car CTA Button */}
            <div>
              <button
                onClick={handleBookNow}
                className="w-full sm:w-3/5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm sm:text-base py-3.5 rounded-2xl shadow-lg shadow-violet-500/25 transition-all duration-200 transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Rent a car
              </button>
            </div>

            {/* Car Equipment Checklist */}
            <div className="pt-2">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Car Equipment
              </h3>
              <div className="grid grid-cols-2 gap-y-3.5 gap-x-6">
                {selectedVehicle.equipment.map((item, idx) => (
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

        {/* BOTTOM SECTION: Other Cars Grid */}
        <div className="pt-10 border-t border-slate-200">
          {/* Section Heading */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Other cars
            </h2>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-950 hover:text-violet-600 transition-colors group"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 6 Car Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {otherCars.map((car, index) => (
              <div
                key={car.id}
                style={{ animationDelay: `${index * 60}ms` }}
                className="card-hover-lift bg-[#f8fafc] hover:bg-white rounded-3xl p-6 border border-slate-100/90 shadow-sm hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group animate-fade-in-up"
              >
                {/* Silhouette Container */}
                <div className="relative aspect-[16/9] w-full rounded-2xl bg-white border border-slate-100 mb-6 flex items-center justify-center overflow-hidden p-4 group-hover:bg-slate-50/50 transition-colors">
                  <VehicleVectorGraphic type={car.type} />
                </div>

                {/* Specs and Details */}
                <div className="space-y-4">
                  {/* Name and Price */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="title-hover-glow text-lg font-bold text-slate-900 leading-snug group-hover:text-violet-600 transition-colors">
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

                  {/* 3 Specs: Automatic, Fuel / 70 Ltr, AC */}
                  <div className="grid grid-cols-3 gap-1.5 py-3 border-t border-slate-200/70 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate">{car.specs.gearBox}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate">{car.specs.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Snowflake className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate">Air Conditioner</span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleSelectCar(car)}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-center"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
