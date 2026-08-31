"use client";

import Image from "next/image";
import Link from "next/link";
import { Gauge, Fuel, Snowflake } from "lucide-react";

interface CarItem {
  id: string;
  name: string;
  category: string;
  pricePerDay: string;
  transmission: string;
  fuelEfficiency: string;
  ac: boolean;
  image: string;
}

export function FleetSection() {
  const cars: CarItem[] = [
    {
      id: "1",
      name: "Mercedes",
      category: "Sedan",
      pricePerDay: "LKR 2500",
      transmission: "Automatic",
      fuelEfficiency: "15 km/l",
      ac: true,
      image: "/images/car-side.jpg",
    },
    {
      id: "2",
      name: "Mercedes",
      category: "Sedan",
      pricePerDay: "LKR 2500",
      transmission: "Automatic",
      fuelEfficiency: "15 km/l",
      ac: true,
      image: "/images/car-side.jpg",
    },
    {
      id: "3",
      name: "Mercedes",
      category: "Sedan",
      pricePerDay: "LKR 2500",
      transmission: "Automatic",
      fuelEfficiency: "15 km/l",
      ac: true,
      image: "/images/car-side.jpg",
    },
    {
      id: "4",
      name: "Mercedes",
      category: "Sedan",
      pricePerDay: "LKR 3500",
      transmission: "Automatic",
      fuelEfficiency: "15 km/l",
      ac: true,
      image: "/images/car-side.jpg",
    },
    {
      id: "5",
      name: "Mercedes",
      category: "Sedan",
      pricePerDay: "LKR 3500",
      transmission: "Automatic",
      fuelEfficiency: "15 km/l",
      ac: true,
      image: "/images/car-side.jpg",
    },
    {
      id: "6",
      name: "Mercedes",
      category: "Sedan",
      pricePerDay: "LKR 3500",
      transmission: "Automatic",
      fuelEfficiency: "15 km/l",
      ac: true,
      image: "/images/car-side.jpg",
    },
  ];

  const handleCarBooking = (car: CarItem) => {
    const msg = `Hello Tourmate! I am interested in viewing details and booking the ${car.name} (${car.category}) at ${car.pricePerDay} per day.`;
    window.open(`https://wa.me/94703236834?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="vehicles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Choose the car that
            <br />
            suits you.
          </h2>
        </div>

        <Link
          href="#vehicles"
          className="inline-flex items-center gap-1 text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors"
        >
          <span>View all</span>
          <span className="text-base font-normal">+</span>
        </Link>
      </div>

      {/* 6 Car Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <div
            key={index}
            className="bg-slate-50/80 hover:bg-white rounded-3xl p-5 border border-slate-100/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Top Car Image Container */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100/60 mb-5 flex items-center justify-center p-3">
              <Image
                src={car.image}
                alt={`${car.name} ${car.category}`}
                fill
                className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Middle Specs and Titles */}
            <div className="space-y-4">
              {/* Name and Price Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {car.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {car.category}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-base font-extrabold text-emerald-500 block leading-tight">
                    {car.pricePerDay}
                  </span>
                  <span className="text-[11px] text-slate-400">per day</span>
                </div>
              </div>

              {/* 3 Specs Pills (Automatic, Efficiency, Air Conditioner) */}
              <div className="grid grid-cols-3 gap-1.5 py-3 border-t border-slate-200/60 text-[11px] text-slate-500">
                <div className="flex items-center gap-1">
                  <Gauge className="h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate">{car.transmission}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Fuel className="h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate">{car.fuelEfficiency}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Snowflake className="h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate">Air Conditioner</span>
                </div>
              </div>

              {/* View Details Green CTA Button */}
              <button
                onClick={() => handleCarBooking(car)}
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold text-sm py-3 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-center"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
