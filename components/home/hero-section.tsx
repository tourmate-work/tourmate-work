"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CustomDropdown } from "@/components/ui/custom-dropdown";
import { CustomDatePicker } from "@/components/ui/custom-datepicker";
import { LocationSearchInput } from "@/components/ui/location-search-input";
import { ShieldCheck, Sparkles, MessageCircle, UserCheck, KeyRound, Search } from "lucide-react";

const CAR_TYPE_OPTIONS = [
  { value: "All", label: "All Vehicle Types" },
  { value: "Sedan", label: "Sedan (Premio, Axio, Allion)" },
  { value: "SUV", label: "SUV (Vezel, RAV4, CR-V, Prado)" },
  { value: "Luxury", label: "Luxury (Mercedes, BMW, Audi)" },
  { value: "Van", label: "Van (KDH Super GL, Caravan)" },
  { value: "Hatchback", label: "Hatchback (WagonR, Aqua, Vitz)" },
  { value: "Electric", label: "Electric / Hybrid" },
];

export function HeroSection() {
  const router = useRouter();
  const [rentalMode, setRentalMode] = useState<"self" | "driver">("self");
  const [carType, setCarType] = useState("All");
  const [pickupPlace, setPickupPlace] = useState("Bandaranaike Int'l Airport (CMB) / Katunayake");
  const [rentalDate, setRentalDate] = useState("2026-09-01");
  const [returnDate, setReturnDate] = useState("2026-09-07");

  const handleSearchVehicles = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (carType && carType !== "All") params.set("category", carType);
    if (pickupPlace.trim()) params.set("location", pickupPlace.trim());
    if (rentalDate) params.set("pickupDate", rentalDate);
    if (returnDate) params.set("returnDate", returnDate);
    params.set("available", "true");
    if (rentalMode) params.set("mode", rentalMode);
    router.push(`/vehicles?${params.toString()}`);
  };

  const handleWhatsAppBooking = () => {
    const modeText = rentalMode === "self" ? "Self-Drive" : "With Driver";
    const typeText = carType !== "All" ? carType : "Vehicle";
    const locText = pickupPlace.trim() || "Sri Lanka";
    const message = `Hello Tourmate! I would like to check available ${modeText} ${typeText} rentals for delivery at ${locText}, pickup on ${rentalDate} and return on ${returnDate}.`;
    window.open(`https://wa.me/94703236834?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10">
      {/* Hero Container with Rounded corners */}
      <div className="relative rounded-[30px] bg-gradient-to-r from-violet-950 via-purple-900 to-indigo-950 text-white min-h-[580px] lg:min-h-[620px] flex items-center shadow-2xl overflow-visible">
        {/* Background Image with Sri Lanka landmarks & cars */}
        <div className="absolute inset-0 rounded-[30px] overflow-hidden z-0 pointer-events-none">
          <Image
            src="/images/hero-sri-lanka.jpg"
            alt="Sri Lanka scenic landmarks and Tourmate rental fleet"
            fill
            priority
            className="object-cover object-center opacity-85 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-950/95 via-purple-900/65 to-transparent lg:w-3/5" />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Micro-badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full text-xs font-semibold text-amber-300 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Sri Lanka&apos;s #1 Verified Car Rental Network</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-black tracking-tight leading-[1.12] text-white drop-shadow-md">
              Experience the road <br className="hidden sm:inline" />
              like never before.
            </h1>

            <p className="max-w-xl text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal">
              Tourmate provides luxury self-drive cars, family SUVs, and driver-driven vans across Colombo, CMB Airport, Kandy, and the Southern Coast with guaranteed transparent rates.
            </p>

            {/* Quick Guarantees Pill Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-200">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <span>Zero Hidden Fees</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>24/7 Islandwide Assist</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>Free Airport Handover</span>
              </span>
            </div>
          </div>

          {/* Right Floating Booking Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm sm:max-w-md bg-white text-slate-900 rounded-[30px] p-6 sm:p-7 shadow-2xl border border-white/30 backdrop-blur-md">
              {/* Rental Mode Switch (Self-Drive vs Driver) with sliding pill animation */}
              <div className="relative grid grid-cols-2 p-1 bg-slate-100/90 rounded-full mb-5 border border-slate-200/80 shadow-inner select-none">
                {/* Sliding Animated Pill Indicator */}
                <span
                  aria-hidden="true"
                  className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] border border-slate-200/60 transition-transform duration-300 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] pointer-events-none ${
                    rentalMode === "driver" ? "translate-x-full" : "translate-x-0"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setRentalMode("self")}
                  className={`relative z-10 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                    rentalMode === "self"
                      ? "text-slate-950"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <KeyRound
                    className={`h-3.5 w-3.5 transition-all duration-300 ${
                      rentalMode === "self"
                        ? "text-violet-600 scale-110 -rotate-12"
                        : "text-slate-400 group-hover:text-slate-600 scale-100 rotate-0"
                    }`}
                  />
                  <span>Self Drive</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRentalMode("driver")}
                  className={`relative z-10 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                    rentalMode === "driver"
                      ? "text-slate-950"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <UserCheck
                    className={`h-3.5 w-3.5 transition-all duration-300 ${
                      rentalMode === "driver"
                        ? "text-violet-600 scale-110"
                        : "text-slate-400 group-hover:text-slate-600 scale-100"
                    }`}
                  />
                  <span>With Driver</span>
                </button>
              </div>

              <h2 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center justify-between">
                <span>Find & Reserve Vehicles</span>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Live Availability
                </span>
              </h2>

              <form onSubmit={handleSearchVehicles} className="space-y-3.5">
                {/* 1. Vehicle Type (Top) */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Vehicle Type
                  </label>
                  <CustomDropdown
                    options={CAR_TYPE_OPTIONS}
                    value={carType}
                    onChange={setCarType}
                    variant="light"
                    position="bottom"
                  />
                </div>

                {/* 2. Pickup Location */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Pickup Location
                  </label>
                  <LocationSearchInput
                    value={pickupPlace}
                    onChange={setPickupPlace}
                    placeholder="Search any city, airport, hotel, or address in Sri Lanka..."
                    variant="light"
                  />
                </div>

                {/* 3 & 4. Pickup Date and Return Date */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                      Pickup Date
                    </label>
                    <CustomDatePicker
                      value={rentalDate}
                      onChange={setRentalDate}
                      placeholder="Pickup Date"
                      variant="light"
                      position="auto"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                      Return Date
                    </label>
                    <CustomDatePicker
                      value={returnDate}
                      onChange={setReturnDate}
                      placeholder="Return Date"
                      variant="light"
                      position="top"
                    />
                  </div>
                </div>

                {/* Primary CTA: Search Available Vehicles */}
                <button
                  type="submit"
                  className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-extrabold text-sm py-3.5 rounded-[30px] shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all duration-200 transform active:scale-[0.98] mt-2 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="h-4 w-4" />
                  <span>Search Available Vehicles</span>
                </button>

                {/* Secondary Option: Direct WhatsApp Concierge */}
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full py-2 text-xs font-bold text-slate-500 hover:text-emerald-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Need direct help? Contact on WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

