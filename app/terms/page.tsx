import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  DollarSign,
  AlertCircle,
  Users,
  Handshake,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getPolicy } from "@/lib/policies";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terms & Conditions | TourMate Rentals Sri Lanka",
  description:
    "Review the official Terms & Conditions of TourMate Rentals Sri Lanka. Transparent guidelines covering bookings, payments, handovers, renter and owner responsibilities.",
};

const SECTION_ICONS = [
  { icon: Handshake, color: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  { icon: Clock, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { icon: DollarSign, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  { icon: MapPin, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  { icon: CheckCircle2, color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  { icon: Users, color: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  { icon: ShieldCheck, color: "bg-teal-500/10 text-teal-600 dark:text-teal-400" },
  { icon: Handshake, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
  { icon: AlertCircle, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  { icon: Sparkles, color: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
];

export default async function TermsPage() {
  const terms = await getPolicy("terms");

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#070709] text-slate-900 dark:text-white font-sans selection:bg-violet-600 selection:text-white">
      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header Banner */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-black uppercase tracking-wider">
              <FileText className="h-4 w-4" />
              <span>{terms.subtitle || "Official Policy Agreement"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
              {terms.title}
            </h1>

            {terms.lastUpdated && (
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                <Clock className="h-4 w-4 text-violet-500" />
                <span>Last Updated: {terms.lastUpdated}</span>
              </div>
            )}

            {terms.intro && (
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed pt-2">
                {terms.intro}
              </p>
            )}
          </div>

          {/* Policy Sections Grid */}
          <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {terms.sections.map((sec, idx) => {
              const iconConfig = SECTION_ICONS[idx % SECTION_ICONS.length];
              const Icon = iconConfig.icon;
              const isAcceptanceSection =
                sec.title.toLowerCase().includes("acceptance") ||
                idx === terms.sections.length - 1 && terms.sections.length > 5;

              if (isAcceptanceSection) {
                return (
                  <section
                    key={sec.id || idx}
                    className="bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-transparent border border-violet-500/30 rounded-[28px] p-6 sm:p-8 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-violet-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <h2 className="text-lg sm:text-xl font-black text-violet-950 dark:text-violet-200">
                        {sec.title}
                      </h2>
                    </div>
                    <p className="text-violet-950 dark:text-violet-300 font-medium">
                      {sec.content}
                    </p>
                    {sec.note && (
                      <p className="text-xs text-violet-800 dark:text-violet-400">
                        {sec.note}
                      </p>
                    )}
                  </section>
                );
              }

              return (
                <section
                  key={sec.id || idx}
                  className="bg-slate-50/80 dark:bg-[#0f0f13] border border-slate-200/80 dark:border-white/10 rounded-[28px] p-6 sm:p-8 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-2xl ${iconConfig.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                      {sec.title}
                    </h2>
                  </div>
                  <p>{sec.content}</p>
                  {sec.note && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {sec.note}
                    </p>
                  )}
                </section>
              );
            })}
          </div>

          {/* Bottom Back Button */}
          <div className="pt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
