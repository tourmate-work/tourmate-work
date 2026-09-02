"use client";

import { useState } from "react";
import Image from "next/image";
import { CustomDropdown } from "@/components/ui/custom-dropdown";
import { CustomDatePicker } from "@/components/ui/custom-datepicker";

const CAR_TYPE_OPTIONS = [
  { value: "Sedan", label: "Sedan (Axio, Premio, Allion)" },
  { value: "SUV", label: "SUV (Vezel, RAV4, CR-V)" },
  { value: "Luxury", label: "Luxury (Mercedes, BMW, Audi)" },
  { value: "Van", label: "Van (KDH Super GL, Caravan)" },
  { value: "Hatchback", label: "Hatchback (WagonR, Aqua, Vitz)" },
  { value: "Electric", label: "Electric / Hybrid" },
];

const PICKUP_OPTIONS = [
  { value: "Bandaranaike Airport (CMB)", label: "Place of rental: CMB Airport" },
  { value: "Colombo City / Fort", label: "Colombo City / Fort" },
  { value: "Wennapuwa / Negombo Beach", label: "Wennapuwa / Negombo Beach" },
  { value: "Kandy City", label: "Kandy City" },
  { value: "Galle / Mirissa / South", label: "Galle / Mirissa / South" },
  { value: "Ella / Hill Country", label: "Ella / Hill Country" },
  { value: "Sigiriya / Dambulla", label: "Sigiriya / Dambulla" },
];

const RETURN_OPTIONS = [
  { value: "Same as pickup", label: "Place of return: Same as pickup" },
  { value: "Bandaranaike Airport (CMB)", label: "Bandaranaike Airport (CMB)" },
  { value: "Colombo City / Fort", label: "Colombo City / Fort" },
  { value: "Wennapuwa / Negombo Beach", label: "Wennapuwa / Negombo Beach" },
  { value: "Kandy City", label: "Kandy City" },
  { value: "Galle / South Coast", label: "Galle / South Coast" },
];

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
      <div className="relative rounded-[30px] overflow-hidden bg-gradient-to-r from-violet-950 via-purple-900 to-indigo-950 text-white min-h-[560px] lg:min-h-[600px] flex items-center shadow-2xl">
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
            <div className="w-full max-w-sm sm:max-w-md bg-white text-slate-900 rounded-[30px] p-6 sm:p-7 shadow-2xl border border-white/20 backdrop-blur-md">
              <h2 className="text-xl font-bold text-center text-slate-900 mb-5">
                Book your car
              </h2>

              <form onSubmit={handleBookNow} className="space-y-3.5">
                {/* Custom Car Type Dropdown */}
                <CustomDropdown
                  options={CAR_TYPE_OPTIONS}
                  value={carType}
                  onChange={setCarType}
                  variant="light"
                />

                {/* Custom Place of Rental Dropdown */}
                <CustomDropdown
                  options={PICKUP_OPTIONS}
                  value={pickupPlace}
                  onChange={setPickupPlace}
                  variant="light"
                />

                {/* Custom Place of Return Dropdown */}
                <CustomDropdown
                  options={RETURN_OPTIONS}
                  value={returnPlace}
                  onChange={setReturnPlace}
                  variant="light"
                />

                {/* Custom Rental Datepicker */}
                <CustomDatePicker
                  value={rentalDate}
                  onChange={setRentalDate}
                  placeholder="Rental Date"
                  variant="light"
                />

                {/* Custom Return Datepicker */}
                <CustomDatePicker
                  value={returnDate}
                  onChange={setReturnDate}
                  placeholder="Return Date"
                  variant="light"
                />

                {/* CTA Yellow Button */}
                <button
                  type="submit"
                  className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-bold text-sm sm:text-base py-3.5 rounded-[30px] shadow-lg hover:shadow-xl transition-all duration-200 transform active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
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
