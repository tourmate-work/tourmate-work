"use client";

import Image from "next/image";
import Link from "next/link";
import { Gauge, Fuel, Snowflake, ArrowRight } from "lucide-react";

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
  const featuredCars: CarItem[] = [
    {
      id: "1",
      name: "Mercedes Benz C-Class",
      category: "Sedan",
      pricePerDay: "LKR 2500",
      transmission: "Automatic",
      fuelEfficiency: "15 km/l",
      ac: true,
      image: "/images/car-side.jpg",
    },
    {
      id: "2",
      name: "Toyota Premio",
      category: "Sedan",
      pricePerDay: "LKR 2500",
      transmission: "Automatic",
      fuelEfficiency: "16 km/l",
      ac: true,
      image: "/images/car-side.jpg",
    },
    {
      id: "3",
      name: "Honda Vezel Hybrid",
      category: "SUV",
      pricePerDay: "LKR 2800",
      transmission: "Automatic",
      fuelEfficiency: "18 km/l",
      ac: true,
      image: "/images/car-side.jpg",
    },
    {
      id: "4",
      name: "Toyota KDH Super GL",
      category: "Minivan",
      pricePerDay: "LKR 3500",
      transmission: "Automatic",
      fuelEfficiency: "12 km/l",
      ac: true,
      image: "/images/car-side.jpg",
    },
    {
      id: "5",
      name: "Ford Mustang Convertible",
      category: "Cabriolet",
      pricePerDay: "LKR 4500",
      transmission: "Automatic",
      fuelEfficiency: "10 km/l",
      ac: true,
      image: "/images/car-side.jpg",
    },
    {
      id: "6",
      name: "Toyota Hilux 4x4",
      category: "Pickup",
      pricePerDay: "LKR 3200",
      transmission: "Automatic",
      fuelEfficiency: "13 km/l",
      ac: true,
      image: "/images/car-side.jpg",
    },
  ];

  const handleCarBooking = (car: CarItem) => {
    const msg = `Hello Tourmate! I am interested in viewing details and booking the ${car.name} (${car.category}) at ${car.pricePerDay} per day.`;
    window.open(`https://wa.me/94703236834?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950">
            Choose the car that
            <br />
            suits you.
          </h2>
        </div>

        <Link
          href="/vehicles"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-950 hover:text-slate-600 transition-colors group"
        >
          <span>View all vehicles</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 6 Featured Car Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {featuredCars.map((car) => (
          <div
            key={car.id}
            className="bg-slate-50/80 hover:bg-white rounded-3xl p-5 border border-slate-100/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Top Car Image Container */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-white mb-5 flex items-center justify-center p-3 border border-slate-100">
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
                  <span className="text-lg font-extrabold text-slate-950 block leading-tight">
                    {car.pricePerDay}
                  </span>
                  <span className="text-[11px] text-slate-400">per day</span>
                </div>
              </div>

              {/* 3 Specs Pills (Automatic, Efficiency, Air Conditioner) */}
              <div className="grid grid-cols-3 gap-1.5 py-3 border-t border-slate-200/60 text-[11px] text-slate-600">
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

              {/* View Details Black CTA Button */}
              <button
                onClick={() => handleCarBooking(car)}
                className="w-full bg-black hover:bg-slate-800 text-white font-semibold text-sm py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-center"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA to Vehicles Catalog */}
      <div className="mt-12 text-center">
        <Link
          href="/vehicles"
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold px-8 py-3.5 rounded-full text-sm transition-all shadow-sm"
        >
          <span>Explore complete vehicle catalog</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
