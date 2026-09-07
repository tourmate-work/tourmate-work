"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gauge, Fuel, Snowflake, ArrowRight, Star, Car } from "lucide-react";
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
  const [featuredCars, setFeaturedCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCars() {
      try {
        const res = await fetch("/api/vehicles?limit=6");
        const data = await res.json();
        if (data.success && Array.isArray(data.vehicles)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mapped: CarItem[] = data.vehicles.map((v: any) => {
            const fallbackImg =
              v.category === "Van"
                ? "/images/mock/kdh-van.jpg"
                : v.category === "SUV" || v.category === "4x4"
                ? "/images/mock/prado-4x4.jpg"
                : "/images/mock/premio-sedan.jpg";

            const validImage =
              v.imageUrl && !v.imageUrl.startsWith("blob:") ? v.imageUrl : fallbackImg;

            return {
              id: v.id,
              name: v.name,
              category: v.category,
              pricePerDay: `LKR ${Number(v.pricePerDay).toLocaleString()}`,
              transmission: v.transmission,
              fuelEfficiency: "16 km/l",
              ac: true,
              image: validImage,
              badge: v.isFeatured ? "Featured" : v.category,
              rating: String(v.rating || "5.0"),
            };
          });
          setFeaturedCars(mapped);
        } else {
          setFeaturedCars([]);
        }
      } catch {
        setFeaturedCars([]);
      } finally {
        setLoading(false);
      }
    }
    loadCars();
  }, []);

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

      {/* Empty State when Database has 0 vehicles */}
      {!loading && featuredCars.length === 0 ? (
        <div className="text-center py-16 px-4 bg-slate-50 dark:bg-white/5 rounded-[30px] border border-dashed border-slate-200 dark:border-white/10">
          <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center">
            <Car className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            No Vehicles Currently Listed
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-6">
            There are currently no featured vehicles available. Want to list your vehicle on Tourmate? Contact our admin team on WhatsApp.
          </p>
          <a
            href="https://wa.me/94703236834?text=I%20want%20to%20list%20a%20vehicle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-full text-sm shadow-md transition-all active:scale-95"
          >
            <span>List a Vehicle via WhatsApp</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      ) : (
        /* Dynamic Car Cards Grid */
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
                  href={`/details?car=${car.id}`}
                  className="w-full py-3 rounded-[30px] border border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 font-bold text-xs transition-colors text-center"
                >
                  View Details
                </Link>
                <Link
                  href={`/details?car=${car.id}`}
                  className="w-full bg-slate-950 hover:bg-violet-700 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-400 dark:hover:text-white text-white font-bold text-xs py-3 rounded-[30px] shadow-sm transition-all active:scale-95 text-center cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Reserve Now</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ))}
        </div>
      )}

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

