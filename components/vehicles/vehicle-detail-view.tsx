"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Fuel,
  Snowflake,
  Users,
  Gauge,
  CheckCircle2,
  SlidersHorizontal,
  DoorOpen,
  ArrowRight,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { LocationSearchInput } from "@/components/ui/location-search-input";
import { BookingInquiryModal } from "@/components/booking/booking-inquiry-modal";
import { useLanguage } from "@/lib/i18n/language-context";
import { SITE_CONTACT } from "@/lib/constants";
import { VehicleImage } from "@/components/ui/vehicle-image";
import type { VehicleDetail } from "@/components/details/details-view";

interface VehicleDetailViewProps {
  initialVehicle: VehicleDetail;
  otherVehicles?: VehicleDetail[];
}

export function VehicleDetailView({
  initialVehicle,
  otherVehicles = [],
}: VehicleDetailViewProps) {
  const { t, language } = useLanguage();
  const [selectedVehicle] = useState<VehicleDetail>(initialVehicle);
  const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [pickupLocation, setPickupLocation] = useState(
    initialVehicle.location || "Bandaranaike Int'l Airport (CMB) / Katunayake"
  );

  const handleBookNow = () => {
    const chosenLoc = pickupLocation.trim() || selectedVehicle.location || "Sri Lanka";
    const msg = `Hello Tourmate! I would like to book the ${selectedVehicle.name} (${selectedVehicle.category}) at ${selectedVehicle.price} ${selectedVehicle.period}, pickup at ${chosenLoc}.`;
    window.open(
      `https://wa.me/${SITE_CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const pool = otherVehicles.filter((v) => v.id !== selectedVehicle.id).slice(0, 6);

  return (
    <div className="w-full bg-white dark:bg-black text-slate-900 dark:text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb Navigation for SEO & UX */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <li>
              <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/vehicles" className="hover:text-emerald-600 dark:hover:text-emerald-400">
                Vehicles
              </Link>
            </li>
            <li>/</li>
            <li className="text-slate-900 dark:text-white font-semibold truncate max-w-[200px] sm:max-w-xs">
              {selectedVehicle.name}
            </li>
          </ol>
        </nav>

        {/* TOP SECTION: Featured Car Details + Tech Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-20 pt-2">
          {/* Left Column: Title, Price, Silhouette, Thumbnails */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full mb-3">
                <span>
                  {selectedVehicle.category} {t("details_category_suffix")}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                {selectedVehicle.name}
              </h1>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {selectedVehicle.price}
                </span>
                <span className="text-sm font-medium text-slate-400 ml-1">
                  {language === "si" ? t("fleet_per_day") : selectedVehicle.period}
                </span>
              </div>
            </div>

            {/* Main Hero Photo View */}
            <div className="relative aspect-[16/9] w-full rounded-[30px] bg-slate-50 dark:bg-[#111116] border border-slate-100/90 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-inner group">
              <VehicleImage
                src={
                  selectedVehicle.thumbnails?.[activeThumbnailIndex] ||
                  selectedVehicle.thumbnails?.[0] ||
                  ""
                }
                alt={`${selectedVehicle.name} - View ${activeThumbnailIndex + 1}`}
                fallbackName={selectedVehicle.name}
                priority={true}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Photo Counter Badge */}
              {selectedVehicle.thumbnails && selectedVehicle.thumbnails.length > 1 && (
                <div className="absolute bottom-3.5 right-3.5 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-sm pointer-events-none">
                  {activeThumbnailIndex + 1} / {selectedVehicle.thumbnails.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery Previews (only when multiple photos exist) */}
            {selectedVehicle.thumbnails && selectedVehicle.thumbnails.length > 1 && (
              <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 no-scrollbar">
                {selectedVehicle.thumbnails.map((thumb, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveThumbnailIndex(idx)}
                    className={`relative h-20 w-24 sm:h-24 sm:w-28 flex-shrink-0 rounded-[20px] overflow-hidden border-2 transition-all cursor-pointer ${
                      activeThumbnailIndex === idx
                        ? "border-emerald-600 ring-2 ring-emerald-600/30 scale-105 shadow-md"
                        : "border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <VehicleImage
                      src={thumb}
                      alt={`${selectedVehicle.name} preview ${idx + 1}`}
                      fallbackName={selectedVehicle.name}
                      showSpinner={false}
                      quality={70}
                      className="object-cover"
                      sizes="(max-width: 640px) 96px, 112px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Technical Specification & Equipment */}
          <div className="lg:col-span-6 space-y-8">
            {/* Technical Specification Heading */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
                {t("details_tech_spec")}
              </h2>

              {/* 2x3 Spec Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {/* 1. Gear Box */}
                <div className="bg-slate-50/90 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1c1c24] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 dark:text-slate-200 mb-2">
                    <SlidersHorizontal className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {t("details_gearbox")}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                      {selectedVehicle.specs.gearBox}
                    </span>
                  </div>
                </div>

                {/* 2. Fuel */}
                <div className="bg-slate-50/90 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1c1c24] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 dark:text-slate-200 mb-2">
                    <Fuel className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {t("details_fuel")}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                      {selectedVehicle.specs.fuel}
                    </span>
                  </div>
                </div>

                {/* 3. Doors */}
                <div className="bg-slate-50/90 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1c1c24] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 dark:text-slate-200 mb-2">
                    <DoorOpen className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {t("details_doors")}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                      {selectedVehicle.specs.doors}
                    </span>
                  </div>
                </div>

                {/* 4. Air Conditioner */}
                <div className="bg-slate-50/90 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1c1c24] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 dark:text-slate-200 mb-2">
                    <Snowflake className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                      {t("details_ac")}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                      {selectedVehicle.specs.ac}
                    </span>
                  </div>
                </div>

                {/* 5. Seats */}
                <div className="bg-slate-50/90 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1c1c24] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 dark:text-slate-200 mb-2">
                    <Users className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {t("details_seats")}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                      {selectedVehicle.specs.seats} {language === "si" ? "ආසන" : "Seats"}
                    </span>
                  </div>
                </div>

                {/* 6. Distance */}
                <div className="bg-slate-50/90 dark:bg-[#15151a] hover:bg-slate-100/80 dark:hover:bg-[#1c1c24] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 border border-slate-100 dark:border-white/5 transition-all flex flex-col justify-between">
                  <div className="text-slate-800 dark:text-slate-200 mb-2">
                    <Gauge className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {t("details_distance")}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate block">
                      {selectedVehicle.specs.distance}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Adaptive Pickup Location Selection */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#15151a] border border-slate-200/80 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t("details_pickup_label")}</span>
                </label>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {t("details_live_search")}
                </span>
              </div>
              <LocationSearchInput
                value={pickupLocation}
                onChange={setPickupLocation}
                placeholder={t("details_pickup_placeholder")}
                variant="catalog"
              />
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {t("details_delivery_guarantee")}
              </p>
            </div>

            {/* Maintenance Warning Banner if vehicle is under maintenance */}
            {selectedVehicle.status?.toLowerCase() === "maintenance" && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs sm:text-sm font-semibold flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <span>
                  This vehicle is currently undergoing scheduled maintenance and is temporarily unavailable for booking.
                </span>
              </div>
            )}

            {/* Main Action Buttons: Request to Book + Direct WhatsApp */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                disabled={
                  selectedVehicle.status?.toLowerCase() === "maintenance" ||
                  selectedVehicle.isAvailable === false
                }
                className={`w-full sm:flex-1 ${
                  selectedVehicle.status?.toLowerCase() === "maintenance" ||
                  selectedVehicle.isAvailable === false
                    ? "bg-slate-300 dark:bg-white/10 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/25 active:scale-[0.98] cursor-pointer"
                } font-black text-sm sm:text-base py-3.5 sm:py-4 rounded-[30px] transition-all duration-200 flex items-center justify-center gap-2 min-h-[48px]`}
              >
                <MessageCircle className="h-5 w-5" />
                <span>
                  {selectedVehicle.status?.toLowerCase() === "maintenance"
                    ? "Currently Under Maintenance"
                    : t("details_btn_request")}
                </span>
              </button>

              <button
                type="button"
                onClick={handleBookNow}
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[48px]"
              >
                <span>{t("details_btn_whatsapp")}</span>
              </button>
            </div>

            {/* Car Equipment Checklist */}
            <div className="pt-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                {t("details_equipment_title")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-y-3.5 gap-x-4 sm:gap-x-6">
                {selectedVehicle.equipment.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-900/30 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rental Highlights & SEO Trust Bar */}
            <div className="pt-6 border-t border-slate-100 dark:border-white/5 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-slate-400">
                Rental Highlights & Benefits
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span>Self-Drive or Chauffeur Driven</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span>Bandaranaike Airport (CMB) & Colombo Delivery</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span>Comprehensive Insurance Included</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span>Monthly & Long-Term Hire Discounts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Other Cars Grid */}
        {pool.length > 0 && (
          <div className="pt-10 border-t border-slate-200 dark:border-white/10">
            {/* Section Heading */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                {t("details_other_cars")}
              </h2>
              <Link
                href="/vehicles"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-950 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group"
              >
                <span>{t("details_view_all")}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* 6 Car Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
              {pool.map((car, index) => (
                <ScrollReveal
                  key={car.id}
                  delay={(index % 3) * 100}
                  direction="up"
                  distance={28}
                >
                  <div className="bg-slate-50/90 dark:bg-[#15151a] hover:bg-slate-100/90 dark:hover:bg-[#1c1c24] rounded-[24px] sm:rounded-[30px] p-3 sm:p-5 border border-slate-100 dark:border-white/5 transition-all duration-300 hover:shadow-xl flex flex-col justify-between h-full group">
                    <div>
                      {/* Car Photo */}
                      <Link
                        href={`/vehicles/${car.slug || car.id}`}
                        className="block relative aspect-[16/10] w-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-white dark:bg-black/30 border border-slate-200/50 dark:border-white/5 mb-3 sm:mb-4"
                      >
                        <VehicleImage
                          src={car.thumbnails[0] || ""}
                          alt={car.name}
                          fallbackName={car.name}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </Link>

                      {/* Name & Price */}
                      <div className="flex items-start justify-between gap-1 mb-2">
                        <div>
                          <Link
                            href={`/vehicles/${car.slug || car.id}`}
                            className="font-extrabold text-xs sm:text-base text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1"
                          >
                            {car.name}
                          </Link>
                          <span className="text-[10px] sm:text-xs text-slate-400 block">
                            {car.category}
                          </span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 block">
                            {car.price}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-slate-400 block">
                            {language === "si" ? t("fleet_per_day") : car.period}
                          </span>
                        </div>
                      </div>

                      {/* Specs Row */}
                      <div className="grid grid-cols-2 gap-1 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 pt-1 pb-3">
                        <div className="flex items-center gap-1 truncate">
                          <SlidersHorizontal className="h-3 w-3 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{car.specs.gearBox}</span>
                        </div>
                        <div className="flex items-center gap-1 truncate">
                          <Fuel className="h-3 w-3 text-slate-400 flex-shrink-0" />
                          <span className="truncate">{car.specs.fuel}</span>
                        </div>
                      </div>
                    </div>

                    {/* View Details Link */}
                    <Link
                      href={`/vehicles/${car.slug || car.id}`}
                      className="w-full py-2 sm:py-2.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white font-bold text-[11px] sm:text-xs text-center transition-all flex items-center justify-center gap-1"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Inquiry Modal */}
      <BookingInquiryModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        vehicle={{
          id: selectedVehicle.id,
          name: selectedVehicle.name,
          brand: selectedVehicle.brand,
          category: selectedVehicle.category,
          pricePerDay: selectedVehicle.price,
          imageUrl: selectedVehicle.thumbnails[0] || "",
          location: pickupLocation || selectedVehicle.location || "Sri Lanka",
          transmission: selectedVehicle.specs.gearBox,
          seats: selectedVehicle.specs.seats,
        }}
        initialPickupLocation={pickupLocation || selectedVehicle.location}
      />
    </div>
  );
}
