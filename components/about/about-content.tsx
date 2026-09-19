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
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useLanguage } from "@/lib/i18n/language-context";
import { useSiteAssets } from "@/lib/site-assets-context";
import { SITE_CONTACT } from "@/lib/constants";


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
  const { t, language } = useLanguage();
  const { getAsset } = useSiteAssets();
  const aboutHeroImage = getAsset("about_hero", "/images/hero-sri-lanka.jpg");
  const aboutFleetImage = getAsset("about_fleet", "/images/car-fleet.jpg");
  const aboutMissionImage = getAsset("about_mission", "/images/car-side.jpg");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleBookingClick = () => {
    const msg =
      "Hello Tourmate! I am viewing your About Us page and would like to inquire about renting a car.";
    window.open(
      `https://wa.me/${SITE_CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <div className="w-full bg-white text-slate-900 pb-24">
      {/* 1. HEADER & BREADCRUMB */}
      <section className="pt-10 pb-8 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight mb-2">
            {t("nav_about_us")}
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              {t("nav_home")}
            </Link>
            <span>/</span>
            <span className="text-slate-800">{t("nav_about_us")}</span>
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
          <div className="relative aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-[30px] overflow-hidden shadow-2xl group border border-slate-100">
            <Image
              src={aboutHeroImage}
              alt="Tourmate scenic road trip video preview in Sri Lanka"
              fill
              unoptimized={aboutHeroImage.startsWith("http")}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

            {/* Centered Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                aria-label="Play promotional video"
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xl shadow-emerald-600/50 transform hover:scale-110 active:scale-95 transition-all duration-300"
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
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-600 block tracking-tight">
                20k+
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider block">
                {language === "si" ? "තෘප්තිමත් පාරිභෝගිකයින්" : "Happy customers"}
              </span>
            </div>

            {/* Stat 2 */}
            <div className="space-y-2">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-600 block tracking-tight">
                540+
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider block">
                {language === "si" ? "ලියාපදිංචි වාහන" : "Count of cars"}
              </span>
            </div>

            {/* Stat 3 */}
            <div className="space-y-2">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-600 block tracking-tight">
                25+
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider block">
                {language === "si" ? "වසර ගණනාවක පළපුරුද්ද" : "Years of experience"}
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
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 fill-emerald-100 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">
                    Well-maintained and sanitized vehicles
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 fill-emerald-100 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">
                    Free GPS & baby seat options on request
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 fill-emerald-100 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">
                    24/7 Roadside breakdown assistance
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 fill-emerald-100 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">
                    Flexible instant booking & cancellations
                  </span>
                </div>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full rounded-[30px] overflow-hidden shadow-2xl border border-slate-100 group">
                <Image
                  src={aboutFleetImage}
                  alt="Tourmate rental fleet travelers exploring Sri Lanka"
                  fill
                  unoptimized={aboutFleetImage.startsWith("http")}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 7. REVIEWS FROM OUR CUSTOMERS */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="title-hover-glow text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Reviews from our customers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 120}
                direction="up"
                distance={28}
              >
                <div className="card-hover-lift bg-slate-50 rounded-[30px] overflow-hidden border border-slate-100 shadow-sm hover:border-slate-200 transition-all duration-300 flex flex-col justify-between h-full">
                  {/* Top Quote Content */}
                  <div className="p-8 space-y-4">
                    <Quote className="h-8 w-8 text-emerald-600 fill-emerald-600/10" />
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Bottom Green Ribbon with Author */}
                  <div className="bg-emerald-600 text-white p-4 px-6 flex items-center justify-center gap-3 text-center">
                    <div>
                      <span className="text-sm font-bold block leading-tight">
                        {item.author}
                      </span>
                      <span className="text-[11px] text-emerald-200 block">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TOP CAR RENTAL QUESTIONS (FAQ ACCORDION) */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              {language === "si" ? "නිතර අසන ප්‍රශ්න" : "Top Car Rental Questions"}
            </h2>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-[20px] border border-slate-200/90 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50/80 transition-colors font-bold text-sm sm:text-base text-slate-900"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-emerald-600" : ""
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
          <div className="relative rounded-[30px] overflow-hidden bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Phone / CTA Details */}
            <div className="space-y-4 max-w-xl text-center md:text-left z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {language === "si" ? "ඔබට වාහනයක් අවශ්‍යද?" : "Looking for a car?"}
              </h2>
              <a
                href={`tel:${SITE_CONTACT.phone}`}
                className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-black text-amber-300 hover:text-amber-200 transition-colors"
              >
                <Phone className="h-6 w-6" />
                <span>{SITE_CONTACT.phoneDisplay}</span>
              </a>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
                {language === "si"
                  ? "කොළඹ, ගුවන් තොටුපළ, නුවර, ගාල්ල හෝ ශ්‍රී ලංකාවේ ඕනෑම තැනකදී ක්ෂණික WhatsApp තහවුරු කිරීම සමඟින් ඔබේ සිහින වාහනය අදම වෙන්කරවා ගන්න."
                  : "Reserve your dream car today in Colombo, CMB Airport, Kandy, Galle, or anywhere across Sri Lanka with instant WhatsApp confirmation."}
              </p>

              <div className="pt-2">
                <button
                  onClick={handleBookingClick}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-8 py-3.5 rounded-[30px] text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
                >
                  {language === "si" ? "දැන්ම වෙන්කරන්න" : "Book now"}
                </button>
              </div>
            </div>

            {/* Right Car Graphic / Render */}
            <div className="relative aspect-[16/9] w-full max-w-sm sm:max-w-md flex items-center justify-center z-10">
              <Image
                src={aboutMissionImage}
                alt="Tourmate rental car"
                fill
                unoptimized={aboutMissionImage.startsWith("http")}
                className="object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
