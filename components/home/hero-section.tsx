"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const [carType, setCarType] = useState("Sedan");
  const [pickupPlace, setPickupPlace] = useState("Bandaranaike Airport (CMB)");
  const [returnPlace, setReturnPlace] = useState("Same as pickup");
  const [rentalDate, setRentalDate] = useState("2026-09-01");
  const [returnDate, setReturnDate] = useState("2026-09-07");

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Tourmate! I would like to book a ${carType} from ${pickupPlace} (${rentalDate}) to ${returnPlace} (${returnDate}).`;
    window.open(`https://wa.me/94703236834?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10">
      {/* Hero Container with Rounded corners */}
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-violet-950 via-purple-900 to-indigo-950 text-white min-h-[560px] lg:min-h-[600px] flex items-center shadow-2xl">
        {/* Background Image with Sri Lanka landmarks & cars */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-sri-lanka.jpg"
            alt="Sri Lanka scenic landmarks and Tourmate rental fleet"
            fill
            priority
            className="object-cover object-center opacity-85 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-950/90 via-purple-900/60 to-transparent lg:w-3/5" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.15] text-white drop-shadow-md">
              Experience the road <br className="hidden sm:inline" />
              like never before
            </h1>

            <p className="max-w-xl text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal">
              A strong commitment that remains consistent & pure and steady
              journey filled with growth and progress. At every moment, there is
              continuous development and support.
            </p>
          </div>

          {/* Right Floating Booking Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm sm:max-w-md bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/20 backdrop-blur-md">
              <h2 className="text-xl font-bold text-center text-slate-900 mb-5">
                Book your car
              </h2>

              <form onSubmit={handleBookNow} className="space-y-3.5">
                {/* Car type */}
                <div className="relative">
                  <select
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                    className="w-full appearance-none bg-slate-100/90 hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
                  >
                    <option value="Sedan">Sedan (Axio, Premio, Allion)</option>
                    <option value="SUV">SUV (Vezel, RAV4, CR-V)</option>
                    <option value="Luxury">Luxury (Mercedes, BMW, Audi)</option>
                    <option value="Van">Van (KDH Super GL, Caravan)</option>
                    <option value="Hatchback">Hatchback (WagonR, Aqua, Vitz)</option>
                    <option value="Electric">Electric / Hybrid</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Place of rental */}
                <div className="relative">
                  <select
                    value={pickupPlace}
                    onChange={(e) => setPickupPlace(e.target.value)}
                    className="w-full appearance-none bg-slate-100/90 hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
                  >
                    <option value="Bandaranaike Airport (CMB)">Place of rental: CMB Airport</option>
                    <option value="Colombo City / Fort">Colombo City / Fort</option>
                    <option value="Negombo Beach">Negombo Beach</option>
                    <option value="Kandy City">Kandy City</option>
                    <option value="Galle / Mirissa / South">Galle / Mirissa / South</option>
                    <option value="Ella / Hill Country">Ella / Hill Country</option>
                    <option value="Sigiriya / Dambulla">Sigiriya / Dambulla</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Place of return */}
                <div className="relative">
                  <select
                    value={returnPlace}
                    onChange={(e) => setReturnPlace(e.target.value)}
                    className="w-full appearance-none bg-slate-100/90 hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
                  >
                    <option value="Same as pickup">Place of return: Same as pickup</option>
                    <option value="Bandaranaike Airport (CMB)">Bandaranaike Airport (CMB)</option>
                    <option value="Colombo City / Fort">Colombo City / Fort</option>
                    <option value="Negombo Beach">Negombo Beach</option>
                    <option value="Kandy City">Kandy City</option>
                    <option value="Galle / South Coast">Galle / South Coast</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Rental Date */}
                <div className="relative">
                  <input
                    type="date"
                    value={rentalDate}
                    onChange={(e) => setRentalDate(e.target.value)}
                    placeholder="Rental Date"
                    className="w-full bg-slate-100/90 hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>

                {/* Return Date */}
                <div className="relative">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    placeholder="Return Date"
                    className="w-full bg-slate-100/90 hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>

                {/* CTA Yellow Button */}
                <button
                  type="submit"
                  className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-bold text-sm sm:text-base py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
                >
                  Book now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
