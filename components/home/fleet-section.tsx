"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Gauge, Snowflake, ArrowRight, Star, Car, Users, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { BookingInquiryModal, BookingVehicleInfo } from "@/components/booking/booking-inquiry-modal";
import { useLanguage } from "@/lib/i18n/language-context";
import { SITE_CONTACT } from "@/lib/constants";
import { VehicleImage } from "@/components/ui/vehicle-image";
import { LottieLoader } from "@/components/ui/lottie-loader";

interface CarItem {
  id: string;
  name: string;
  category: string;
  pricePerDay: string;
  priceNum: number;
  transmission: string;
  seats: number;
  location: string;
  fuelEfficiency: string;
  ac: boolean;
  image: string;
  badge?: string;
  rating?: string;
}

export function FleetSection() {
  const { t, language } = useLanguage();
  const [featuredCars, setFeaturedCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookingCar, setSelectedBookingCar] = useState<BookingVehicleInfo | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadCars() {
      setLoading(true);
      const startTime = Date.now();
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
              priceNum: Number(v.pricePerDay),
              transmission: v.transmission || "Automatic",
              seats: v.seats || 5,
              location: v.location || "Colombo / CMB Airport",
              fuelEfficiency: "16 km/l",
              ac: true,
              image: validImage,
              badge: v.isFeatured ? (language === "si" ? "විශේෂිත" : "Featured") : v.category,
              rating: String(v.rating || "5.0"),
            };
          });
          if (isMounted) setFeaturedCars(mapped);
        } else {
          if (isMounted) setFeaturedCars([]);
        }
      } catch {
        if (isMounted) setFeaturedCars([]);
      } finally {
        const elapsed = Date.now() - startTime;
        const remainingDelay = Math.max(0, 800 - elapsed);
        setTimeout(() => {
          if (isMounted) setLoading(false);
        }, remainingDelay);
      }
    }
    loadCars();
    return () => {
      isMounted = false;
    };
  }, [language]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full mb-3">
            <span>{t("fleet_badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
            {t("fleet_heading_1")} <br />
            {t("fleet_heading_2")}
          </h2>
        </div>

        <Link
          href="/vehicles"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors group"
        >
          <span>{t("fleet_view_all")}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Loading & Empty States */}
      {loading ? (
        <LottieLoader
          title="Loading Featured Fleet..."
          subtitle="Gathering handpicked vehicles with islandwide delivery across Sri Lanka"
        />
      ) : featuredCars.length === 0 ? (
        <div className="text-center py-16 px-4 bg-slate-50 dark:bg-white/5 rounded-[30px] border border-dashed border-slate-200 dark:border-white/10">
          <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center">
            <Car className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {t("fleet_no_vehicles")}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-6">
            There are currently no featured vehicles available. Want to list your vehicle on Tourmate? Contact our admin team on WhatsApp.
          </p>
          <a
            href={`https://wa.me/${SITE_CONTACT.whatsappNumber}?text=I%20want%20to%20list%20a%20vehicle`}
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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
        {featuredCars.map((car, index) => (
          <ScrollReveal key={car.id} delay={index * 60} direction="up">
            <div className="stripe-card rounded-[18px] sm:rounded-[30px] p-2.5 sm:p-6 shadow-sm hover:shadow-2xl flex flex-col justify-between h-full group">
              {/* Top Row: Category & Rating */}
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  {car.badge ? (
                    <span className="inline-flex items-center gap-1 text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wide bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20 px-2 sm:px-2.5 py-0.5 rounded-full truncate max-w-[90px] sm:max-w-none">
                      {car.badge}
                    </span>
                  ) : (
                    <span className="text-[9px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-400 truncate max-w-[80px] sm:max-w-none">
                      {car.category}
                    </span>
                  )}

                  {car.rating && (
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-amber-500 dark:text-amber-400 flex-shrink-0">
                      <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400" />
                      <span>{car.rating}</span>
                    </div>
                  )}
                </div>

                {/* Car Image Container */}
                <div className="relative aspect-[16/10] w-full rounded-[14px] sm:rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/[0.03] mb-2 sm:mb-4 flex items-center justify-center p-2 sm:p-4 border border-slate-100 dark:border-white/5">
                  <VehicleImage
                    src={car.image}
                    alt={`${car.name} ${car.category}`}
                    fallbackName={car.name}
                    className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Location Badge on Image */}
                  <div className="absolute bottom-1.5 left-1.5 z-20 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center gap-0.5 sm:gap-1 pointer-events-none max-w-[90%] truncate">
                    <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-violet-400 flex-shrink-0" />
                    <span className="truncate">{car.location}</span>
                  </div>
                </div>

                {/* Name and Price Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-0.5 sm:gap-2 mb-1.5 sm:mb-3">
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white leading-snug truncate">
                      {car.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-medium mt-0.5 truncate">
                      {car.category} • {t("fleet_fully_insured")}
                    </p>
                  </div>

                  <div className="text-left sm:text-right flex-shrink-0 flex items-baseline sm:block gap-1 mt-0.5 sm:mt-0">
                    <span className="text-xs sm:text-base lg:text-lg font-extrabold text-slate-950 dark:text-white block leading-tight">
                      {car.pricePerDay}
                    </span>
                    <span className="text-[9px] sm:text-[11px] text-slate-400">{t("fleet_per_day")}</span>
                  </div>
                </div>

                {/* 3 Specs Capsules: Transmission, Seats, AC */}
                <div className="grid grid-cols-3 gap-0.5 sm:gap-2 py-1 sm:py-2.5 border-t border-slate-100 dark:border-white/10 text-[9px] sm:text-[11px] text-slate-600 dark:text-slate-400 mb-2 sm:mb-4">
                  <div className="flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1 bg-slate-50 dark:bg-white/5 py-1 sm:py-1.5 px-1 sm:px-2 rounded-lg sm:rounded-xl">
                    <Gauge className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{car.transmission}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1 bg-slate-50 dark:bg-white/5 py-1 sm:py-1.5 px-1 sm:px-2 rounded-lg sm:rounded-xl">
                    <Users className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{car.seats} {language === "si" ? "ආසන" : "Seats"}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1 bg-slate-50 dark:bg-white/5 py-1 sm:py-1.5 px-1 sm:px-2 rounded-lg sm:rounded-xl">
                    <Snowflake className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{language === "si" ? "වායුසමනය" : "AC"}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: View Vehicle + Request to Book */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pt-1">
                <Link
                  href={`/details?car=${car.id}`}
                  className="w-full py-1.5 sm:py-3 rounded-[14px] sm:rounded-[30px] border border-slate-200 dark:border-white/15 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 font-bold text-[10px] sm:text-xs transition-colors text-center"
                >
                  {t("fleet_btn_details")}
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedBookingCar({
                      id: car.id,
                      name: car.name,
                      category: car.category,
                      pricePerDay: car.pricePerDay,
                      imageUrl: car.image,
                      location: car.location,
                      transmission: car.transmission,
                      seats: car.seats,
                    })
                  }
                  className="w-full bg-slate-950 hover:bg-violet-700 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-400 dark:hover:text-white text-white font-bold text-[10px] sm:text-xs py-1.5 sm:py-3 rounded-[14px] sm:rounded-[30px] shadow-sm transition-all active:scale-95 text-center cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>{t("fleet_btn_book")}</span>
                </button>
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
          <span>{t("fleet_btn_explore")}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Booking Inquiry Modal */}
      {selectedBookingCar && (
        <BookingInquiryModal
          isOpen={Boolean(selectedBookingCar)}
          onClose={() => setSelectedBookingCar(null)}
          vehicle={selectedBookingCar}
        />
      )}
    </section>
  );
}

