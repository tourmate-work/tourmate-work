"use client";

import Link from "next/link";
import { MapPin, Car, ChevronRight, ShieldCheck } from "lucide-react";

export function PopularSearches() {
  const locations = [
    {
      name: "Colombo & Colpetty",
      keyword: "Car Rental Colombo",
      href: "/rentals/colombo",
      desc: "Commercial hub delivery, Fort & Mount Lavinia",
    },
    {
      name: "Bandaranaike Airport (CMB)",
      keyword: "Airport Car Rental Sri Lanka",
      href: "/rentals/airport",
      desc: "24/7 Katunayake terminal meet & greet handover",
    },
    {
      name: "Negombo & Beach Road",
      keyword: "Car Rental Negombo",
      href: "/rentals/negombo",
      desc: "Porutota Road resorts, coastal road trip gateway",
    },
    {
      name: "Wennapuwa & Marawila",
      keyword: "Car Rental Wennapuwa",
      href: "/rentals/wennapuwa",
      desc: "Family functions, diaspora visits & wedding cars",
    },
  ];

  const vehicleCategories = [
    {
      name: "SUVs & 4x4 Rentals",
      keyword: "SUV Rental Sri Lanka",
      href: "/vehicles/suv",
      desc: "Hill country, Kandy, Nuwara Eliya & Ella exploration",
    },
    {
      name: "Sedans & Compact Cars",
      keyword: "Sedan Rental Sri Lanka",
      href: "/vehicles/sedan",
      desc: "Fuel-efficient Toyota Prius & Aqua for city & highway",
    },
    {
      name: "Passenger Vans & KDH",
      keyword: "Van Rental Sri Lanka",
      href: "/vehicles/minivan",
      desc: "Family tours, surf trips & group airport luggage",
    },
    {
      name: "Double-Cab Pickups",
      keyword: "Pickup Rental Sri Lanka",
      href: "/vehicles/pickup",
      desc: "Heavy-duty cargo beds & off-pavement adventure",
    },
    {
      name: "Cabriolets & Convertibles",
      keyword: "Cabriolet Rental Sri Lanka",
      href: "/vehicles/cabriolet",
      desc: "Open-air scenic coastal driving along the South Coast",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#0b0b0e] border-t border-slate-100 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Explore Sri Lanka by Car
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1 mb-2">
            Popular Car Rental Hubs & Vehicle Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Choose your ideal pickup location or vehicle type. All Tourmate rentals include comprehensive insurance, verified maintenance, and 24/7 roadside assistance.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Locations */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-500" />
              <span>Top Car Hire Locations in Sri Lanka</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {locations.map((loc, idx) => (
                <Link
                  key={idx}
                  href={loc.href}
                  className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#15151a] hover:bg-white dark:hover:bg-[#1a1a22] border border-slate-100 dark:border-white/5 hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block">
                      {loc.keyword}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1 leading-snug">
                      {loc.desc}
                    </span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span>{loc.name}</span>
                    <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Vehicle Types */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Car className="h-4 w-4 text-emerald-500" />
              <span>Browse Fleet by Vehicle Category</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vehicleCategories.slice(0, 4).map((cat, idx) => (
                <Link
                  key={idx}
                  href={cat.href}
                  className="p-4 rounded-2xl bg-slate-50/80 dark:bg-[#15151a] hover:bg-white dark:hover:bg-[#1a1a22] border border-slate-100 dark:border-white/5 hover:border-emerald-300 dark:hover:border-emerald-500/40 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block">
                      {cat.keyword}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1 leading-snug">
                      {cat.desc}
                    </span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span>{cat.name}</span>
                    <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Link Pills */}
        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">Quick Guides:</span>
            <Link
              href="/self-drive-vs-with-driver"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
            >
              Self-Drive vs Chauffeur Guide (2026)
            </Link>
            <span>•</span>
            <Link
              href="/vehicles/cabriolet"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
            >
              Cabriolet & Luxury Car Hire
            </Link>
            <span>•</span>
            <Link
              href="/vehicles/pickup"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
            >
              4x4 Pickup Truck Rental
            </Link>
            <span>•</span>
            <Link
              href="/rentals/airport"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
            >
              Bandaranaike Airport (CMB) Delivery
            </Link>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Comprehensive Insurance on Every Booking</span>
          </div>
        </div>
      </div>
    </section>
  );
}
