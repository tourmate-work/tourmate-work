"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  CheckCircle2,
  ChevronDown,
  Quote,
  Phone,
} from "lucide-react";

function AppleLogoIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1.01.08 2.03-.49 2.64-1.24z" />
    </svg>
  );
}

function GooglePlayIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M3.609 1.814L13.792 12 3.61 22.186c-.365-.366-.61-.884-.61-1.464V3.278c0-.58.245-1.098.61-1.464zm11.235 11.238l2.586 2.586-12.012 6.95 9.426-9.536zm0-2.104L5.418 1.412l12.012 6.95-2.586 2.586zm1.485 1.052l4.062 2.35c1.17.677 1.17 1.782 0 2.458l-4.062 2.35-2.67-2.67 2.67-2.488z" />
    </svg>
  );
}

const FAQS = [
  {
    question: "How does it work?",
    answer:
      "Renting with Tourmate is quick and easy. Simply choose your desired vehicle from our fleet, select your pickup and drop-off dates, and complete the booking via WhatsApp or online. Our team ensures your car is fully inspected, cleaned, and ready on time.",
  },
  {
    question: "Can I rent a car without a credit card?",
    answer:
      "Yes! Tourmate accepts multiple payment methods including cash in LKR, USD, EUR, direct bank transfer, and credit/debit cards upon vehicle collection.",
  },
  {
    question: "What are the requirements for renting a car in Sri Lanka?",
    answer:
      "You will need a valid National Identity Card or Passport, and a valid Driving License (International Driving Permit with local endorsement for foreign tourists). Minimum driver age is 21 years.",
  },
  {
    question: "Does Tourmate allow airport pickup and drop-off?",
    answer:
      "Yes, we provide 24/7 dedicated Bandaranaike International Airport (CMB) pickup and drop-off services for seamless arrivals and departures.",
  },
  {
    question: "Does Tourmate offer comprehensive insurance and 24/7 road support?",
    answer:
      "Every Tourmate vehicle comes with full comprehensive rental insurance coverage and 24/7 island-wide emergency roadside assistance for complete peace of mind.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Tourmate made our family road trip across Sri Lanka unforgettable. The Mercedes was in immaculate condition, fuel-efficient, and delivered right to our hotel in Colombo. Highly recommended!",
    author: "Crescent Kayla",
    role: "Tourist from UK",
    avatar: "/images/car-side.jpg",
  },
  {
    quote:
      "Super responsive customer service and hassle-free booking. The pickup at CMB airport was smooth, and the car drove like a dream across the hill country roads in Ella.",
    author: "Alex Gomez",
    role: "Frequent Traveler",
    avatar: "/images/car-fleet.jpg",
  },
  {
    quote:
      "Best car rental agency in Sri Lanka! Honest pricing with no hidden charges. The vehicle was clean, well-maintained, and the WhatsApp team answered all questions within minutes.",
    author: "Ryder Nelson",
    role: "Business Traveler",
    avatar: "/images/hero-sri-lanka.jpg",
  },
];

export function AboutContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleBookingClick = () => {
    const msg =
      "Hello Tourmate! I am viewing your About Us page and would like to inquire about renting a car.";
    window.open(
      `https://wa.me/94703236834?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <div className="w-full bg-white text-slate-900 pb-24">
      {/* 1. HEADER & BREADCRUMB */}
      <section className="pt-10 pb-8 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-2">
            About Us
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-800">About Us</span>
          </div>
        </div>
      </section>

      {/* 2. SECTION: Where every drive feels extraordinary + 4 Pillars */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Big Heading */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-slate-950 tracking-tight leading-[1.2]">
                Where every drive feels extraordinary
              </h2>
            </div>

            {/* Right 2x2 Grid of Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Variety Brands */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Variety Brands
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Choose from luxury sedans, family SUVs, vans, and sporty convertibles tailored to every budget and road adventure.
                </p>
              </div>

              {/* Awesome Support */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Awesome Support
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Our dedicated 24/7 customer support and island-wide roadside assistance are always on standby to keep your journey seamless.
                </p>
              </div>

              {/* Maximum Freedom */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Maximum Freedom
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Enjoy unlimited kilometers, flexible pickup/drop-off points, and self-drive freedom across the entire paradise island.
                </p>
              </div>

              {/* Flexibility On The Go */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Flexibility On The Go
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Modify or extend your reservation effortlessly with transparent pricing and zero hidden fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HERO VIDEO BANNER WITH PLAY BUTTON */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-[2.5rem] overflow-hidden shadow-2xl group border border-slate-100">
            <Image
              src="/images/hero-sri-lanka.jpg"
              alt="Tourmate scenic road trip video preview in Sri Lanka"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

            {/* Centered Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                aria-label="Play promotional video"
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center shadow-xl shadow-violet-600/50 transform hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <Play className="h-7 w-7 sm:h-8 sm:w-8 fill-white translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATS NUMBERS: 20k+ / 540+ / 25+ */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {/* Stat 1 */}
            <div className="space-y-2">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-violet-600 block tracking-tight">
                20k+
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider block">
                Happy customers
              </span>
            </div>

            {/* Stat 2 */}
            <div className="space-y-2">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-violet-600 block tracking-tight">
                540+
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider block">
                Count of cars
              </span>
            </div>

            {/* Stat 3 */}
            <div className="space-y-2">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-violet-600 block tracking-tight">
                25+
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider block">
                Years of experience
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION: Unlock unforgettable memories on the road */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Unlock unforgettable <br />
                memories on the road
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
                Whether cruising scenic coastal roads in Mirissa or exploring the majestic misty mountains of Nuwara Eliya, our luxury fleet delivers supreme comfort, safety, and reliability at every turn.
              </p>

              {/* 4 Checkmark Points in 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-violet-600 fill-violet-100 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">
                    Well-maintained and sanitized vehicles
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-violet-600 fill-violet-100 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">
                    Free GPS & baby seat options on request
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-violet-600 fill-violet-100 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">
                    24/7 Roadside breakdown assistance
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-violet-600 fill-violet-100 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">
                    Flexible instant booking & cancellations
                  </span>
                </div>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 group">
                <Image
                  src="/images/car-fleet.jpg"
                  alt="Tourmate rental fleet travelers exploring Sri Lanka"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DOWNLOAD OUR APP BANNER */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700 text-white p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Phone Mockup Illustration */}
            <div className="flex-shrink-0 flex justify-center">
              <div className="relative w-48 h-80 sm:w-56 sm:h-96 rounded-[2.5rem] border-4 border-slate-900 bg-white shadow-2xl overflow-hidden p-2 flex flex-col justify-between">
                {/* Dynamic Island Notch */}
                <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto mt-1" />
                <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                  <div className="h-12 w-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center mb-3 shadow-md">
                    <span className="font-extrabold text-sm">TM</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Tourmate App
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Instant Car Hire in Sri Lanka
                  </span>
                </div>
                <div className="w-24 h-1 bg-slate-300 rounded-full mx-auto mb-1" />
              </div>
            </div>

            {/* Right App Text & Store Buttons */}
            <div className="space-y-6 max-w-xl text-center lg:text-left">
              <span className="inline-block uppercase tracking-widest text-[11px] font-bold text-violet-200 bg-white/15 px-3.5 py-1 rounded-full backdrop-blur-sm">
                Download Our App
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Download our app
              </h2>
              <p className="text-sm sm:text-base text-violet-100/90 leading-relaxed font-normal">
                Book your rental car in seconds, unlock exclusive discounts, track your chauffeur, and manage your trips on the go with the Tourmate mobile app.
              </p>

              {/* Download Badges */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#"
                  className="flex items-center gap-3 bg-slate-950 hover:bg-slate-900 border border-white/20 px-4 py-2.5 rounded-2xl transition-all shadow-lg hover:scale-105"
                >
                  <AppleLogoIcon className="h-6 w-6 text-white" />
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 block leading-tight">
                      Download on the
                    </span>
                    <span className="text-xs font-bold text-white block leading-tight">
                      App Store
                    </span>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 bg-slate-950 hover:bg-slate-900 border border-white/20 px-4 py-2.5 rounded-2xl transition-all shadow-lg hover:scale-105"
                >
                  <GooglePlayIcon className="h-6 w-6 text-white" />
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 block leading-tight">
                      GET IT ON
                    </span>
                    <span className="text-xs font-bold text-white block leading-tight">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REVIEWS FROM OUR CUSTOMERS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Reviews from our customers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Quote Content */}
                <div className="p-8 space-y-4">
                  <Quote className="h-8 w-8 text-violet-600 fill-violet-600/10" />
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Bottom Purple Ribbon with Author */}
                <div className="bg-violet-600 text-white p-4 px-6 flex items-center justify-center gap-3 text-center">
                  <div>
                    <span className="text-sm font-bold block leading-tight">
                      {item.author}
                    </span>
                    <span className="text-[11px] text-violet-200 block">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TOP CAR RENTAL QUESTIONS (FAQ ACCORDION) */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Top Car Rental Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50/80 transition-colors font-bold text-sm sm:text-base text-slate-900"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-violet-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 bg-slate-50/50 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. LOOKING FOR A CAR CTA BANNER */}
      <section className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-800 text-white p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Phone / CTA Details */}
            <div className="space-y-4 max-w-xl text-center md:text-left z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Looking for a car?
              </h2>
              <a
                href="tel:+94772973530"
                className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-black text-amber-300 hover:text-amber-200 transition-colors"
              >
                <Phone className="h-6 w-6" />
                <span>+94 (77) 297 3530</span>
              </a>
              <p className="text-xs sm:text-sm text-violet-100/90 leading-relaxed font-normal">
                Reserve your dream car today in Colombo, CMB Airport, Kandy, Galle, or anywhere across Sri Lanka with instant WhatsApp confirmation.
              </p>

              <div className="pt-2">
                <button
                  onClick={handleBookingClick}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-8 py-3.5 rounded-full text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
                >
                  Book now
                </button>
              </div>
            </div>

            {/* Right Car Graphic / Render */}
            <div className="relative aspect-[16/9] w-full max-w-sm sm:max-w-md flex items-center justify-center z-10">
              <Image
                src="/images/car-side.jpg"
                alt="Tourmate rental car"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
