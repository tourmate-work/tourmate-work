"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Car, LayoutDashboard, MessageCircle, User } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { useAuth } from "@/components/auth/auth-context";

export function MobileBottomBar() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const isHome = pathname === "/";
  const isVehicles = pathname.startsWith("/vehicles");

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-[#070709]/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-white/10 px-2 py-2 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] pb-[calc(env(safe-area-inset-bottom,0px)+8px)] transition-colors duration-300"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-2xl transition-all active:scale-90 ${
            isHome
              ? "text-violet-600 dark:text-violet-400 font-bold"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <div className="relative">
            <Home className={`h-5 w-5 ${isHome ? "stroke-[2.5]" : "stroke-2"}`} />
            {isHome && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-violet-600 dark:bg-violet-400" />
            )}
          </div>
          <span className="text-[10px] tracking-tight">{language === "si" ? "මුල් පිටුව" : "Home"}</span>
        </Link>

        {/* Vehicles */}
        <Link
          href="/vehicles"
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-2xl transition-all active:scale-90 ${
            isVehicles
              ? "text-violet-600 dark:text-violet-400 font-bold"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <div className="relative">
            <Car className={`h-5 w-5 ${isVehicles ? "stroke-[2.5]" : "stroke-2"}`} />
            {isVehicles && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-violet-600 dark:bg-violet-400" />
            )}
          </div>
          <span className="text-[10px] tracking-tight">{language === "si" ? "වාහන" : "Vehicles"}</span>
        </Link>

        {/* List Vehicle WhatsApp CTA */}
        <a
          href="https://wa.me/94703236834?text=I%20want%20to%20list%20a%20vehicle"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-1 px-2.5 text-violet-600 dark:text-violet-400 transition-all active:scale-90"
        >
          <div className="relative">
            <LayoutDashboard className="h-5 w-5 stroke-2" />
          </div>
          <span className="text-[10px] font-semibold tracking-tight">{language === "si" ? "ලියාපදිංචි" : "List Car"}</span>
        </a>

        {/* Direct WhatsApp CTA */}
        <a
          href="https://wa.me/94703236834?text=Hello%20Tourmate!%20I%20have%20an%20inquiry%20about%20renting%20a%20car."
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-1 py-1 px-2.5 text-emerald-600 dark:text-emerald-400 transition-all active:scale-90"
        >
          <div className="relative">
            <MessageCircle className="h-5 w-5 stroke-[2.2]" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-black animate-pulse" />
          </div>
          <span className="text-[10px] font-bold tracking-tight">{language === "si" ? "සහය" : "Chat"}</span>
        </a>

        {/* Account / Sign In */}
        <button
          type="button"
          onClick={() => openAuthModal("phone")}
          className="flex flex-col items-center gap-1 py-1 px-2.5 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all active:scale-90 cursor-pointer"
        >
          <div className="relative">
            {isAuthenticated && user ? (
              <div className="h-5 w-5 rounded-full bg-violet-600 text-white flex items-center justify-center text-[9px] font-bold overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
            ) : (
              <User className="h-5 w-5 stroke-2" />
            )}
          </div>
          <span className="text-[10px] tracking-tight">
            {isAuthenticated ? (language === "si" ? "ගිණුම" : "Account") : (language === "si" ? "ලොගින්" : "Sign In")}
          </span>
        </button>
      </div>
    </nav>
  );
}
