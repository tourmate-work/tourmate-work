"use client";

import { useState } from "react";
import Image from "next/image";
import { CustomDropdown } from "@/components/ui/custom-dropdown";
import { CustomDatePicker } from "@/components/ui/custom-datepicker";
import { ShieldCheck, Sparkles, MessageCircle, UserCheck, KeyRound } from "lucide-react";

const CAR_TYPE_OPTIONS = [
  { value: "Sedan", label: "Sedan (Axio, Premio, Allion)" },
  { value: "SUV", label: "SUV (Vezel, RAV4, CR-V)" },
  { value: "Luxury", label: "Luxury (Mercedes, BMW, Audi)" },
  { value: "Van", label: "Van (KDH Super GL, Caravan)" },
  { value: "Hatchback", label: "Hatchback (WagonR, Aqua, Vitz)" },
  { value: "Electric", label: "Electric / Hybrid" },
];

const PICKUP_OPTIONS = [
  { value: "Bandaranaike Airport (CMB)", label: "CMB Airport (Free Handover)" },
  { value: "Colombo City / Fort", label: "Colombo City / Fort" },
  { value: "Wennapuwa / Negombo Beach", label: "Wennapuwa / Negombo Beach" },
  { value: "Kandy City", label: "Kandy City" },
  { value: "Galle / Mirissa / South", label: "Galle / Mirissa / South" },
  { value: "Ella / Hill Country", label: "Ella / Hill Country" },
  { value: "Sigiriya / Dambulla", label: "Sigiriya / Dambulla" },
];

const RETURN_OPTIONS = [
  { value: "Same as pickup", label: "Return: Same as pickup" },
  { value: "Bandaranaike Airport (CMB)", label: "Return: CMB Airport" },
  { value: "Colombo City / Fort", label: "Return: Colombo City / Fort" },
  { value: "Wennapuwa / Negombo Beach", label: "Return: Wennapuwa / Negombo" },
  { value: "Kandy City", label: "Return: Kandy City" },
  { value: "Galle / South Coast", label: "Return: Galle / South Coast" },
];

export function HeroSection() {
  const [rentalMode, setRentalMode] = useState<"self" | "chauffeur">("self");
  const [carType, setCarType] = useState("Sedan");
  const [pickupPlace, setPickupPlace] = useState("Bandaranaike Airport (CMB)");
  const [returnPlace, setReturnPlace] = useState("Same as pickup");
  const [rentalDate, setRentalDate] = useState("2026-09-01");
  const [returnDate, setReturnDate] = useState("2026-09-07");

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    const modeText = rentalMode === "self" ? "Self-Drive" : "With Chauffeur";
    const message = `Hello Tourmate! I would like to reserve a ${modeText} ${carType} from ${pickupPlace} (${rentalDate}) to ${returnPlace} (${returnDate}).`;
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
              Tourmate provides luxury self-drive cars, family SUVs, and chauffeur-driven vans across Colombo, CMB Airport, Kandy, and the Southern Coast with guaranteed transparent rates.
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
              {/* Rental Mode Switch (Self-Drive vs Chauffeur) with sliding pill animation */}
              <div className="relative grid grid-cols-2 p-1 bg-slate-100/90 rounded-full mb-5 border border-slate-200/80 shadow-inner select-none">
                {/* Sliding Animated Pill Indicator */}
                <span
                  aria-hidden="true"
                  className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] border border-slate-200/60 transition-transform duration-300 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] pointer-events-none ${
                    rentalMode === "chauffeur" ? "translate-x-full" : "translate-x-0"
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
                  onClick={() => setRentalMode("chauffeur")}
                  className={`relative z-10 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                    rentalMode === "chauffeur"
                      ? "text-slate-950"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <UserCheck
                    className={`h-3.5 w-3.5 transition-all duration-300 ${
                      rentalMode === "chauffeur"
                        ? "text-violet-600 scale-110"
                        : "text-slate-400 group-hover:text-slate-600 scale-100"
                    }`}
                  />
                  <span>With Chauffeur</span>
                </button>
              </div>

              <h2 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center justify-between">
                <span>Reserve Your Vehicle</span>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Instant Confirmation
                </span>
              </h2>

              <form onSubmit={handleBookNow} className="space-y-3">
                {/* Custom Car Type Dropdown */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Vehicle Category
                  </label>
                  <CustomDropdown
                    options={CAR_TYPE_OPTIONS}
                    value={carType}
                    onChange={setCarType}
                    variant="light"
                    position="bottom"
                  />
                </div>

                {/* Custom Place of Rental Dropdown */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Pickup Location
                  </label>
                  <CustomDropdown
                    options={PICKUP_OPTIONS}
                    value={pickupPlace}
                    onChange={setPickupPlace}
                    variant="light"
                    position="bottom"
                  />
                </div>

                {/* Custom Place of Return Dropdown */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                    Return Location
                  </label>
                  <CustomDropdown
                    options={RETURN_OPTIONS}
                    value={returnPlace}
                    onChange={setReturnPlace}
                    variant="light"
                    position="auto"
                  />
                </div>

                {/* Dates: Pick & Return */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                      Start Date
                    </label>
                    <CustomDatePicker
                      value={rentalDate}
                      onChange={setRentalDate}
                      placeholder="Rental Date"
                      variant="light"
                      position="auto"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                      End Date
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

                {/* CTA Yellow Button with WhatsApp */}
                <button
                  type="submit"
                  className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-extrabold text-sm py-3.5 rounded-[30px] shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all duration-200 transform active:scale-[0.98] mt-3 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Reserve via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

