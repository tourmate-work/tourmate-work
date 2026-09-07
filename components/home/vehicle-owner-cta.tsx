"use client";

import { MessageCircle, ShieldCheck, DollarSign, CalendarCheck, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export function VehicleOwnerSection() {
  const { t, language } = useLanguage();

  const benefits = [
    {
      icon: DollarSign,
      title: t("owner_benefit1_title"),
      description: t("owner_benefit1_desc"),
    },
    {
      icon: ShieldCheck,
      title: t("owner_benefit2_title"),
      description: t("owner_benefit2_desc"),
    },
    {
      icon: CalendarCheck,
      title: t("owner_benefit3_title"),
      description: t("owner_benefit3_desc"),
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="relative rounded-[36px] bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden border border-white/10">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, Explanation & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3.5 py-1 rounded-full text-xs font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t("owner_badge")}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] text-white">
              {t("owner_heading")}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl">
              {t("owner_text")}
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/94703236834?text=I%20want%20to%20list%20a%20vehicle"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm sm:text-base px-8 py-4 rounded-full shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <MessageCircle className="h-5 w-5 fill-white stroke-none" />
                <span>{t("owner_btn_list")}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <span className="block text-xs text-slate-400 mt-2 font-medium">
                {language === "si"
                  ? "WhatsApp ඔස්සේ අපගේ සහය කණ්ඩායම සමඟ සෘජුව සම්බන්ධ වන්න"
                  : "Connects instantly with our partner management concierge on WhatsApp"}
              </span>
            </div>
          </div>

          {/* Right Column: 3 Benefit Cards */}
          <div className="lg:col-span-5 space-y-3.5">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 transition-all group"
                >
                  <div className="h-11 w-11 rounded-2xl bg-violet-500/20 border border-violet-500/30 text-violet-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1">{b.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
