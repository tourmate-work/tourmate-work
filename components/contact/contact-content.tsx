"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { CustomDropdown } from "@/components/ui/custom-dropdown";
import { CustomDatePicker } from "@/components/ui/custom-datepicker";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Guest Traveler",
          email: "traveler@tourmate.lk",
          subject: `Rental Booking Request - ${carType}`,
          message: `Booking Request: ${carType} from ${pickupPlace} to ${returnPlace}. Dates: ${rentalDate} to ${returnDate}`,
          date: `${rentalDate} to ${returnDate}`,
          carModel: carType,
        }),
      });
    } catch (err) {
      console.error("Failed to log inquiry:", err);
    } finally {
      setIsSubmitting(false);
      const msg = `Hello Tourmate! I would like to book a ${carType} from ${pickupPlace} (${rentalDate}) to ${returnPlace} (${returnDate}).`;
      window.open(
        `https://wa.me/94703236834?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
    }
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
                    <CustomDropdown
                      options={[
                        { value: "Sedan", label: "Sedan (Axio, Premio, Mercedes)" },
                        { value: "SUV", label: "SUV (Vezel, Porsche, Land Cruiser)" },
                        { value: "Cabriolet", label: "Cabriolet (Mustang, Coupe)" },
                        { value: "Minivan", label: "Minivan (Toyota KDH Super GL)" },
                        { value: "Pickup", label: "Pickup (Toyota Hilux 4x4)" },
                      ]}
                      value={carType}
                      onChange={setCarType}
                      variant="purple"
                    />

                    {/* Place of rental */}
                    <CustomDropdown
                      options={[
                        { value: "Bandaranaike Airport (CMB)", label: "CMB International Airport" },
                        { value: "Colombo City", label: "Colombo City / Fort" },
                        { value: "Wennapuwa / Negombo", label: "Wennapuwa / Negombo Beach" },
                        { value: "Kandy City", label: "Kandy City" },
                        { value: "Galle / Mirissa / South", label: "Galle / Mirissa / South Coast" },
                        { value: "Ella / Hill Country", label: "Ella / Hill Country" },
                      ]}
                      value={pickupPlace}
                      onChange={setPickupPlace}
                      variant="purple"
                    />

                    {/* Place of return */}
                    <CustomDropdown
                      options={[
                        { value: "Same as pickup", label: "Place of return: Same as pickup" },
                        { value: "Bandaranaike Airport (CMB)", label: "Bandaranaike Airport (CMB)" },
                        { value: "Colombo City", label: "Colombo City / Fort" },
                        { value: "Galle / South Coast", label: "Galle / South Coast" },
                      ]}
                      value={returnPlace}
                      onChange={setReturnPlace}
                      variant="purple"
                      position="auto"
                    />

                    {/* Rental Date */}
                    <CustomDatePicker
                      value={rentalDate}
                      onChange={setRentalDate}
                      placeholder="Rental Date"
                      variant="purple"
                      position="auto"
                    />

                    {/* Return Date */}
                    <CustomDatePicker
                      value={returnDate}
                      onChange={setReturnDate}
                      placeholder="Return Date"
                      variant="purple"
                      position="top"
                    />

                    {/* Yellow CTA Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-amber-400 hover:bg-amber-500 disabled:opacity-75 text-slate-950 font-bold text-sm sm:text-base py-3.5 rounded-[30px] shadow-lg transition-all duration-200 transform active:scale-95 mt-2"
                    >
                      {isSubmitting ? "Submitting..." : "Book now"}
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
            <ScrollReveal delay={0} direction="up">
              <div className="card-hover-lift flex items-center gap-4 p-5 rounded-[30px] bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all h-full">
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
            </ScrollReveal>

            {/* Email */}
            <ScrollReveal delay={100} direction="up">
              <div className="card-hover-lift flex items-center gap-4 p-5 rounded-[30px] bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all h-full">
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
            </ScrollReveal>

            {/* Phone */}
            <ScrollReveal delay={200} direction="up">
              <div className="card-hover-lift flex items-center gap-4 p-5 rounded-[30px] bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all h-full">
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
            </ScrollReveal>

            {/* Opening Hours */}
            <ScrollReveal delay={300} direction="up">
              <div className="card-hover-lift flex items-center gap-4 p-5 rounded-[30px] bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all h-full">
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
            </ScrollReveal>
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
              <ScrollReveal
                key={post.id}
                delay={idx * 120}
                direction="up"
                distance={28}
              >
                <div className="card-hover-lift bg-slate-50/80 hover:bg-white rounded-[30px] p-5 border border-slate-100 shadow-sm hover:border-slate-200 transition-all duration-300 flex flex-col justify-between h-full group">
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
              </ScrollReveal>
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
