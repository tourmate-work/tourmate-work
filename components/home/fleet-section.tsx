"use client";

import Image from "next/image";
import Link from "next/link";
import { Gauge, Fuel, Snowflake, ArrowRight, Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface CarItem {
  id: string;
  name: string;
  category: string;
  pricePerDay: string;
  transmission: string;
  fuelEfficiency: string;
  ac: boolean;
  image: string;
  badge?: string;
  rating?: string;
}

export function FleetSection() {
  const featuredCars: CarItem[] = [
    {
      id: "1",
      name: "Mercedes Benz C-Class",
      category: "Sedan",
      pricePerDay: "LKR 25,000",
      transmission: "Automatic",
      fuelEfficiency: "15 km/l",
      ac: true,
      image: "/images/car-side.jpg",
      badge: "Luxury Favorite",
      rating: "4.9",
    },
    {
      id: "2",
      name: "Toyota Premio G-Superior",
      category: "Sedan",
      pricePerDay: "LKR 16,500",
      transmission: "Automatic",
      fuelEfficiency: "16 km/l",
      ac: true,
      image: "/images/car-side.jpg",
      badge: "Best Value",
      rating: "4.9",
    },
    {
      id: "3",
      name: "Honda Vezel Hybrid Sensing",
      category: "SUV",
      pricePerDay: "LKR 22,000",
      transmission: "Automatic",
      fuelEfficiency: "18 km/l",
      ac: true,
      image: "/images/car-side.jpg",
      badge: "Top Rated",
      rating: "5.0",
    },
    {
      id: "4",
      name: "Toyota KDH Super GL Luxury",
      category: "Minivan",
      pricePerDay: "LKR 28,000",
      transmission: "Automatic",
      fuelEfficiency: "12 km/l",
      ac: true,
      image: "/images/car-side.jpg",
      badge: "Family & Tour",
      rating: "4.8",
    },
    {
      id: "5",
      name: "Ford Mustang Convertible",
      category: "Cabriolet",
      pricePerDay: "LKR 45,000",
      transmission: "Automatic",
      fuelEfficiency: "10 km/l",
      ac: true,
      image: "/images/car-side.jpg",
      badge: "Celebration",
      rating: "5.0",
    },
    {
      id: "6",
      name: "Toyota Hilux 4x4 Offroad",
      category: "Pickup",
      pricePerDay: "LKR 32,000",
      transmission: "Automatic",
      fuelEfficiency: "13 km/l",
      ac: true,
      image: "/images/car-side.jpg",
      badge: "Rugged 4WD",
      rating: "4.9",
    },
  ];

  const handleCarBooking = (car: CarItem) => {
    const msg = `Hello Tourmate! I would like to check availability and reserve the ${car.name} (${car.category}) at ${car.pricePerDay} per day.`;
    window.open(`https://wa.me/94703236834?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full mb-3">
            <span>Premium Verified Fleet</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
            Choose the car that <br />
            suits your journey.
          </h2>
        </div>

        <Link
          href="/vehicles"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors group"
        >
          <span>View all vehicles</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 6 Featured Car Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {featuredCars.map((car, index) => (
          <ScrollReveal key={car.id} delay={index * 60} direction="up">
            <div className="stripe-card rounded-[30px] p-6 shadow-sm hover:shadow-2xl flex flex-col justify-between h-full group">
              {/* Top Row: Category & Rating */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  {car.badge ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wide bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20 px-2.5 py-0.5 rounded-full">
                      {car.badge}
                    </span>
                  ) : (
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      {car.category}
                    </span>
                  )}

                  {car.rating && (
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500 dark:text-amber-400">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{car.rating}</span>
                    </div>
                  )}
                </div>

                {/* Car Image Container */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/[0.03] mb-5 flex items-center justify-center p-4 border border-slate-100 dark:border-white/5">
                  <Image
                    src={car.image}
                    alt={`${car.name} ${car.category}`}
                    fill
                    className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Name and Price Header */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {car.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {car.category} • Fully Insured
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-lg font-extrabold text-slate-950 dark:text-white block leading-tight">
                      {car.pricePerDay}
                    </span>
                    <span className="text-[11px] text-slate-400">per day</span>
                  </div>
                </div>

                {/* 3 Specs Capsules */}
                <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-100 dark:border-white/10 text-[11px] text-slate-600 dark:text-slate-400 mb-5">
                  <div className="flex items-center gap-1 bg-slate-50 dark:bg-white/5 py-1.5 px-2 rounded-xl">
                    <Gauge className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 dark:bg-white/5 py-1.5 px-2 rounded-xl">
                    <Fuel className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{car.fuelEfficiency}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 dark:bg-white/5 py-1.5 px-2 rounded-xl">
                    <Snowflake className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">AC</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Details + Direct Reserve */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href={`/details?id=${car.id}`}
                  className="w-full py-3 rounded-[30px] border border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 font-bold text-xs transition-colors text-center"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleCarBooking(car)}
                  className="w-full bg-slate-950 hover:bg-violet-700 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-400 dark:hover:text-white text-white font-bold text-xs py-3 rounded-[30px] shadow-sm transition-all active:scale-95 text-center cursor-pointer"
                >
                  Reserve Now
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Bottom CTA to Vehicles Catalog */}
      <div className="mt-14 text-center">
        <Link
          href="/vehicles"
          className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-900 dark:text-white font-bold px-8 py-3.5 rounded-[30px] text-sm transition-all shadow-sm active:scale-95"
        >
          <span>Explore complete vehicle catalog</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

