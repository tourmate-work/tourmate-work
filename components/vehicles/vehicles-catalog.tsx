"use client";

import { useState } from "react";
import { Gauge, Fuel, Snowflake } from "lucide-react";

interface CarItem {
  id: string;
  name: string;
  category: string;
  pricePerDay: string;
  transmission: string;
  fuelCapacity: string;
  ac: boolean;
}

function CarSilhouette() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg
        viewBox="0 0 420 180"
        className="w-full max-w-[280px] h-auto text-slate-300 group-hover:text-slate-400 group-hover:scale-105 transition-all duration-300"
        fill="currentColor"
      >
        <path d="M45 110c0-10 6-18 16-20l22-4c12-26 36-44 66-46l88-4c30 0 58 14 74 38l48 18c14 6 26 16 33 28 8 12 12 24 12 38v10c0 6-4 10-10 10h-26c-4-18-20-32-40-32s-36 14-40 32H150c-4-18-20-32-40-32s-36 14-40 32H55c-6 0-10-4-10-10v-30zm65 30c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20zm214 0c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20zm-186-62h78l-2-32c-24 2-46 12-58 32h-18zm96 0h70l-42-30c-14-4-28-4-42-2l14 32z" />
      </svg>
    </div>
  );
}

function CarPillIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  );
}

const CATEGORIES = [
  { id: "all", label: "All vehicles", hasIcon: false },
  { id: "Sedan", label: "Sedan", hasIcon: true },
  { id: "Cabriolet", label: "Cabriolet", hasIcon: true },
  { id: "Pickup", label: "Pickup", hasIcon: true },
  { id: "SUV", label: "SUV", hasIcon: true },
  { id: "Minivan", label: "Minivan", hasIcon: true },
];

export function VehiclesCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Generate 9 cards per page for pagination
  const getCarsForPageAndCategory = (page: number, category: string): CarItem[] => {
    const baseModels = [
      { name: "Mercedes C-Class", price: "LKR 2500", cat: "Sedan", fuel: "70 Ltr" },
      { name: "Toyota Premio", price: "LKR 2500", cat: "Sedan", fuel: "60 Ltr" },
      { name: "BMW 3 Series", price: "LKR 2500", cat: "Sedan", fuel: "65 Ltr" },
      { name: "Honda Vezel", price: "LKR 2800", cat: "SUV", fuel: "50 Ltr" },
      { name: "Toyota Land Cruiser", price: "LKR 3500", cat: "SUV", fuel: "90 Ltr" },
      { name: "Toyota Hilux", price: "LKR 2800", cat: "Pickup", fuel: "80 Ltr" },
      { name: "Toyota KDH Super GL", price: "LKR 3000", cat: "Minivan", fuel: "70 Ltr" },
      { name: "Ford Mustang", price: "LKR 4500", cat: "Cabriolet", fuel: "60 Ltr" },
      { name: "Toyota Axio", price: "LKR 2500", cat: "Sedan", fuel: "45 Ltr" },
    ];

    return baseModels.map((item, idx) => {
      const activeCat = category === "all" ? item.cat : category;
      const priceOffset = (page - 1) * 300;
      const basePrice = parseInt(item.price.replace("LKR ", ""), 10);
      return {
        id: `${page}-${category}-${idx}`,
        name: item.name,
        category: activeCat,
        pricePerDay: `LKR ${basePrice + priceOffset}`,
        transmission: "Automatic",
        fuelCapacity: item.fuel,
        ac: true,
      };
    });
  };

  const currentCars = getCarsForPageAndCategory(currentPage, selectedCategory);

  const handleCarBooking = (car: CarItem) => {
    const msg = `Hello Tourmate! I would like to book the ${car.name} (${car.category}) at ${car.pricePerDay} per day.`;
    window.open(
      `https://wa.me/94703236834?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
  };

  return (
    <section className="w-full bg-white pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                onClick={() => handleCategorySelect(cat.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm ${
                  isActive
                    ? "bg-black text-white shadow-slate-900/20 hover:bg-slate-800"
                    : "bg-slate-100/90 text-slate-700 hover:bg-slate-200/90 hover:text-slate-900"
                }`}
              >
                {cat.hasIcon && (
                  <CarPillIcon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-600"}`} />
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 9 Vehicle Cards (3x3 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {currentCars.map((car) => (
            <div
              key={car.id}
              className="bg-[#f8fafc] hover:bg-white rounded-3xl p-6 border border-slate-100/80 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Car Silhouette Container */}
              <div className="relative aspect-[16/9] w-full rounded-2xl bg-white/70 border border-slate-100 mb-6 flex items-center justify-center overflow-hidden">
                <CarSilhouette />
              </div>

              {/* Information & Specs */}
              <div className="space-y-4">
                {/* Header: Name + Price */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {car.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {car.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-slate-950 block leading-tight">
                      {car.pricePerDay}
                    </span>
                    <span className="text-xs text-slate-400">per day</span>
                  </div>
                </div>

                {/* Specs: Automatic, Fuel Capacity, Air Conditioner */}
                <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-200/70 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <Gauge className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{car.fuelCapacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Snowflake className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">Air Conditioner</span>
                  </div>
                </div>

                {/* View Details Black Action Button */}
                <button
                  onClick={() => handleCarBooking(car)}
                  className="w-full bg-black hover:bg-slate-800 text-white font-semibold text-sm py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] text-center"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination: 1 2 3 4 5 6 */}
        <div className="mt-12 flex items-center justify-center gap-3 sm:gap-4">
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
    </section>
  );
}
