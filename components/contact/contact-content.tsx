"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ChevronDown,
} from "lucide-react";

const BLOG_POSTS = [
  {
    id: "1",
    title: "How To Choose The Right Car",
    category: "Guides",
    date: "12 April, 2026",
    image: "/images/car-side.jpg",
    excerpt:
      "Find out whether a compact sedan, hybrid SUV, or luxury van is best suited for your Sri Lankan itinerary.",
  },
  {
    id: "2",
    title: "Which plan is right for me?",
    category: "Rental Tips",
    date: "12 April, 2026",
    image: "/images/hero-sri-lanka.jpg",
    excerpt:
      "Compare self-drive freedom versus chauffeur-driven tours to maximize your holiday comfort and flexibility.",
  },
  {
    id: "3",
    title: "Enjoy Speed, Choice & Total Control",
    category: "Fleet News",
    date: "10 April, 2026",
    image: "/images/car-fleet.jpg",
    excerpt:
      "Discover our newly added luxury Mercedes and BMW models equipped for pristine highway cruising.",
  },
];

function ToyotaLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 70" fill="currentColor">
      <path d="M50 0C22.4 0 0 15.7 0 35c0 19.3 22.4 35 50 35s50-15.7 50-35C100 15.7 77.6 0 50 0zm0 7c23.5 0 42.6 12.5 42.6 28S73.5 63 50 63 7.4 50.5 7.4 35 26.5 7 50 7zm0 6.5C31.5 13.5 16 23.1 16 35s15.5 21.5 34 21.5S84 46.9 84 35 68.5 13.5 50 13.5zm0 6c13.8 0 25 7 25 15.5S63.8 50.5 50 50.5 25 43.5 25 35s11.2-15.5 25-15.5zm0 3.5c-4.4 0-8 5.4-8 12s3.6 12 8 12 8-5.4 8-12-3.6-12-8-12z" />
    </svg>
  );
}

function MercedesLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" />
      <path d="M50 12 L50 50 L20 75 M50 50 L80 75" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BmwLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor">
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M50 18 A32 32 0 0 1 82 50 L50 50 Z" fill="currentColor" opacity="0.8" />
      <path d="M50 82 A32 32 0 0 1 18 50 L50 50 Z" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

function AudiLogo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 60" fill="none" stroke="currentColor" strokeWidth="5">
      <circle cx="30" cy="30" r="22" />
      <circle cx="60" cy="30" r="22" />
      <circle cx="90" cy="30" r="22" />
      <circle cx="120" cy="30" r="22" />
    </svg>
  );
}

function FordLogo() {
  return (
    <div className="font-serif italic font-black text-2xl tracking-tighter text-slate-800">
      Ford
    </div>
  );
}

function JeepLogo() {
  return (
    <div className="font-sans font-black text-2xl tracking-widest text-slate-800 uppercase">
      Jeep
    </div>
  );
}

export function ContactContent() {
  const [carType, setCarType] = useState("Sedan");
  const [pickupPlace, setPickupPlace] = useState("Bandaranaike Airport (CMB)");
  const [returnPlace, setReturnPlace] = useState("Same as pickup");
  const [rentalDate, setRentalDate] = useState("2026-09-02");
  const [returnDate, setReturnDate] = useState("2026-09-08");

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello Tourmate! I would like to book a ${carType} from ${pickupPlace} (${rentalDate}) to ${returnPlace} (${returnDate}).`;
    window.open(
      `https://wa.me/94703236834?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <div className="w-full bg-white text-slate-900 pb-20">
      {/* 1. HEADER & BREADCRUMB */}
      <section className="pt-10 pb-8 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-2">
            Contact Us
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-800">Contact Us</span>
          </div>
        </div>
      </section>

      {/* 2. HERO BOOKING CARD & CAR IMAGE BANNER */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-[30px] p-4 sm:p-6 lg:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Left Purple Booking Box */}
              <div className="lg:col-span-4 bg-violet-600 text-white rounded-[30px] p-6 sm:p-7 shadow-xl flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-center text-white mb-5">
                    Book your car
                  </h2>

                  <form onSubmit={handleBookNow} className="space-y-3.5">
                    {/* Car type */}
                    <div className="relative">
                      <select
                        value={carType}
                        onChange={(e) => setCarType(e.target.value)}
                        className="w-full appearance-none bg-violet-700/80 hover:bg-violet-700 border border-violet-500/60 text-white text-xs sm:text-sm font-medium rounded-[20px] px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
                      >
                        <option value="Sedan" className="text-slate-900">
                          Sedan (Axio, Premio, Mercedes)
                        </option>
                        <option value="SUV" className="text-slate-900">
                          SUV (Vezel, Porsche, Land Cruiser)
                        </option>
                        <option value="Cabriolet" className="text-slate-900">
                          Cabriolet (Mustang, Coupe)
                        </option>
                        <option value="Minivan" className="text-slate-900">
                          Minivan (Toyota KDH Super GL)
                        </option>
                        <option value="Pickup" className="text-slate-900">
                          Pickup (Toyota Hilux 4x4)
                        </option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-violet-200 pointer-events-none" />
                    </div>

                    {/* Place of rental */}
                    <div className="relative">
                      <select
                        value={pickupPlace}
                        onChange={(e) => setPickupPlace(e.target.value)}
                        className="w-full appearance-none bg-violet-700/80 hover:bg-violet-700 border border-violet-500/60 text-white text-xs sm:text-sm font-medium rounded-[20px] px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
                      >
                        <option value="Bandaranaike Airport (CMB)" className="text-slate-900">
                          CMB International Airport
                        </option>
                        <option value="Colombo City" className="text-slate-900">
                          Colombo City / Fort
                        </option>
                        <option value="Wennapuwa / Negombo" className="text-slate-900">
                          Wennapuwa / Negombo Beach
                        </option>
                        <option value="Kandy City" className="text-slate-900">
                          Kandy City
                        </option>
                        <option value="Galle / Mirissa / South" className="text-slate-900">
                          Galle / Mirissa / South Coast
                        </option>
                        <option value="Ella / Hill Country" className="text-slate-900">
                          Ella / Hill Country
                        </option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-violet-200 pointer-events-none" />
                    </div>

                    {/* Place of return */}
                    <div className="relative">
                      <select
                        value={returnPlace}
                        onChange={(e) => setReturnPlace(e.target.value)}
                        className="w-full appearance-none bg-violet-700/80 hover:bg-violet-700 border border-violet-500/60 text-white text-xs sm:text-sm font-medium rounded-[20px] px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
                      >
                        <option value="Same as pickup" className="text-slate-900">
                          Place of return: Same as pickup
                        </option>
                        <option value="Bandaranaike Airport (CMB)" className="text-slate-900">
                          Bandaranaike Airport (CMB)
                        </option>
                        <option value="Colombo City" className="text-slate-900">
                          Colombo City / Fort
                        </option>
                        <option value="Galle / South Coast" className="text-slate-900">
                          Galle / South Coast
                        </option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-violet-200 pointer-events-none" />
                    </div>

                    {/* Rental Date */}
                    <div className="relative">
                      <input
                        type="date"
                        value={rentalDate}
                        onChange={(e) => setRentalDate(e.target.value)}
                        className="w-full bg-violet-700/80 hover:bg-violet-700 border border-violet-500/60 text-white text-xs sm:text-sm font-medium rounded-[20px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
                      />
                    </div>

                    {/* Return Date */}
                    <div className="relative">
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full bg-violet-700/80 hover:bg-violet-700 border border-violet-500/60 text-white text-xs sm:text-sm font-medium rounded-[20px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
                      />
                    </div>

                    {/* Yellow CTA Button */}
                    <button
                      type="submit"
                      className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm sm:text-base py-3.5 rounded-[30px] shadow-lg transition-all duration-200 transform active:scale-95 mt-2"
                    >
                      Book now
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Hero Road Image */}
              <div className="lg:col-span-8 relative min-h-[360px] sm:min-h-[420px] rounded-[30px] overflow-hidden border border-slate-200/60">
                <Image
                  src="/images/hero-sri-lanka.jpg"
                  alt="Tourmate rental fleet in Sri Lanka"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4 CONTACT DETAILS PILLS (Yellow/Amber Badges) */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Address */}
            <div className="card-hover-lift flex items-center gap-4 p-5 rounded-[30px] bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all">
              <div className="h-12 w-12 rounded-full bg-[#f39c12] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <MapPin className="h-6 w-6 fill-white text-[#f39c12]" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">
                  Address
                </span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">
                  Wennapuwa, Sri Lanka
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="card-hover-lift flex items-center gap-4 p-5 rounded-[30px] bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all">
              <div className="h-12 w-12 rounded-full bg-[#f39c12] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Mail className="h-6 w-6 fill-white text-[#f39c12]" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">
                  Email
                </span>
                <a
                  href="mailto:tourmaterentals@gmail.com"
                  className="text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors block mt-0.5 break-all"
                >
                  tourmaterentals@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="card-hover-lift flex items-center gap-4 p-5 rounded-[30px] bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all">
              <div className="h-12 w-12 rounded-full bg-[#f39c12] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Phone className="h-6 w-6 fill-white text-[#f39c12]" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">
                  Phone
                </span>
                <a
                  href="tel:+94772973530"
                  className="text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors block mt-0.5"
                >
                  +94 (77) 297 3530
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="card-hover-lift flex items-center gap-4 p-5 rounded-[30px] bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all">
              <div className="h-12 w-12 rounded-full bg-[#f39c12] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">
                  Opening hours
                </span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">
                  Sun-Mon: 8:00am - 10:00pm
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LATEST BLOG POSTS & NEWS */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="title-hover-glow text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Latest blog posts & news
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, idx) => (
              <div
                key={post.id}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="card-hover-lift bg-slate-50/80 hover:bg-white rounded-[30px] p-5 border border-slate-100 shadow-sm hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group animate-fade-in-up"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full rounded-[24px] overflow-hidden bg-white mb-5 border border-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="title-hover-glow text-lg font-bold text-slate-900 leading-snug group-hover:text-violet-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-200/60">
                    <span className="font-semibold text-slate-600">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BRAND LOGOS RIBBON */}
      <section className="py-12 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-center p-2 text-slate-700 hover:scale-110 transition-transform">
              <ToyotaLogo />
            </div>
            <div className="flex items-center justify-center p-2 text-slate-700 hover:scale-110 transition-transform">
              <FordLogo />
            </div>
            <div className="flex items-center justify-center p-2 text-slate-700 hover:scale-110 transition-transform">
              <MercedesLogo />
            </div>
            <div className="flex items-center justify-center p-2 text-slate-700 hover:scale-110 transition-transform">
              <JeepLogo />
            </div>
            <div className="flex items-center justify-center p-2 text-slate-700 hover:scale-110 transition-transform">
              <BmwLogo />
            </div>
            <div className="flex items-center justify-center p-2 text-slate-700 hover:scale-110 transition-transform">
              <AudiLogo />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
