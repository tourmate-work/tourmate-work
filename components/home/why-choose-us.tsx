"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export function WhyChooseUs() {
  const { t, language } = useLanguage();

  const steps = [
    {
      num: "1",
      icon: Search,
      title: t("how_step1_title"),
      description: t("how_step1_desc"),
    },
    {
      num: "2",
      icon: Send,
      title: t("how_step2_title"),
      description: t("how_step2_desc"),
    },
    {
      num: "3",
      icon: CheckCircle2,
      title: t("how_step3_title"),
      description: t("how_step3_desc"),
    },
  ];

  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Image of Fleet */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-[30px] overflow-hidden shadow-2xl border border-slate-100 dark:border-white/10">
            <Image
              src="/images/car-fleet.jpg"
              alt="Tourmate luxury and commercial rental vehicle fleet in Sri Lanka"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Overlay Guarantee Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-[#0b0b0e]/90 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {language === "si" ? "සෘජු WhatsApp තහවුරු කිරීම" : "Direct WhatsApp Concierge Confirmation"}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {language === "si"
                      ? "ක්ෂණික ප්‍රතිචාර, සැඟවුණු ගාස්තු නැත, සහ දිවයින පුරා විනිවිද කුලී ගිවිසුම්."
                      : "Fast response, zero hidden fees, and transparent rental contracts across Sri Lanka."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: How It Works 3 Steps */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full mb-3">
              <span>{t("how_badge")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
              {t("how_heading")}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-md">
              {t("how_subtitle")}
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5 hover:border-violet-500/30 transition-all group"
                >
                  {/* Step Number Badge */}
                  <div className="flex-shrink-0 h-11 w-11 rounded-2xl bg-violet-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-violet-500/20 group-hover:scale-110 group-hover:bg-violet-700 transition-all mt-0.5">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 bg-slate-950 hover:bg-violet-700 dark:bg-white dark:text-slate-950 dark:hover:bg-violet-400 dark:hover:text-white text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md transition-all active:scale-95"
            >
              <span>{t("how_btn_browse")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

