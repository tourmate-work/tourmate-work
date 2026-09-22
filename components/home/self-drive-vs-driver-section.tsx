"use client";

import Link from "next/link";
import { Car, UserCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SITE_CONTACT } from "@/lib/constants";

export function SelfDriveVsDriverSection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 dark:bg-black/60 border-y border-slate-200/60 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Flexible Travel Choices
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight mt-1 mb-3">
            Self-Drive or Chauffeur Driven?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Tourmate supports both styles of exploration across Sri Lanka. Choose the option that fits your travel style, comfort, and budget.
          </p>
        </div>

        {/* 2-Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Self-Drive */}
          <ScrollReveal direction="up" distance={20}>
            <div className="bg-white dark:bg-[#121218] p-6 sm:p-8 rounded-[30px] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Car className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    Maximum Privacy
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2">
                  Self-Drive Car Rental Sri Lanka
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  Total autonomy for road trip lovers. Stop wherever you want, explore off-the-beaten-path waterfalls, and set your own pace without keeping anyone else on a schedule.
                </p>

                <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>Full comprehensive insurance included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>Unlimited mileage options on weekly/monthly hires</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>AAC endorsement guidance for foreign drivers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span>Doorstep handover at Airport, Colombo & Negombo</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <Link
                  href="/vehicles"
                  className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-emerald-700 dark:bg-white dark:text-slate-950 dark:hover:bg-emerald-400 dark:hover:text-white text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <span>Browse Self-Drive Cars</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  From LKR 8,000/day
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: With Driver */}
          <ScrollReveal direction="up" distance={20} delay={100}>
            <div className="bg-white dark:bg-[#121218] p-6 sm:p-8 rounded-[30px] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                    Zero-Stress Comfort
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2">
                  Car Rental With Driver (Chauffeur)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  Sit back, soak in scenic views, and let an experienced, English-speaking local chauffeur handle roundabouts, steep mountain passes, and congested city traffic.
                </p>

                <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span>Zero foreign permit paperwork or licensing needed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span>Courteous English-speaking tourist-licensed drivers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span>Door-to-door drop-offs at tourist sights & trailheads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span>Ideal for families, senior travelers & multi-day tours</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <a
                  href={`https://wa.me/${SITE_CONTACT.whatsappNumber}?text=Hello%20Tourmate,%20I'm%20interested%20in%20a%20chauffeur-driven%20rental.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Inquire for Driver</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <Link
                  href="/self-drive-vs-with-driver"
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white underline transition-colors"
                >
                  Read 2026 Guide
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
