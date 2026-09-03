"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, LayoutDashboard, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Header() {
  const pathname = usePathname();
  const isSeller = pathname.startsWith("/seller");
  const isHome = pathname === "/";
  const isVehicles = pathname.startsWith("/vehicles");
  const isDetails = pathname.startsWith("/details");
  const isAbout = pathname.startsWith("/about");
  const isContact = pathname.startsWith("/contact");

  const activeNavClass =
    "text-slate-950 dark:text-white font-semibold relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black dark:after:bg-white";
  const inactiveNavClass =
    "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors py-1";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-black/95 backdrop-blur border-b border-slate-100 dark:border-white/10 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo & Portal Badge */}
        <div className="flex items-center gap-3">
          <Link href={isSeller ? "/seller" : "/"} className="flex items-center gap-2 group py-1">
            <Image
              src="/images/logo-transparent.png"
              alt="Tourmate Rentals"
              width={160}
              height={52}
              className="h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-200 dark:brightness-110"
              priority
            />
          </Link>
          {isSeller && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
              Host Portal
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {isSeller ? (
            <>
              <Link
                href="/seller?tab=overview"
                className={activeNavClass}
              >
                Overview
              </Link>
              <Link
                href="/seller?tab=fleet"
                className={inactiveNavClass}
              >
                My Fleet
              </Link>
              <Link
                href="/seller?tab=bookings"
                className={inactiveNavClass}
              >
                Bookings
              </Link>
              <Link
                href="/seller?tab=earnings"
                className={inactiveNavClass}
              >
                Earnings
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                className={isHome ? activeNavClass : inactiveNavClass}
              >
                Home
              </Link>
              <Link
                href="/vehicles"
                className={isVehicles ? activeNavClass : inactiveNavClass}
              >
                Vehicles
              </Link>
              <Link
                href="/details"
                className={isDetails ? activeNavClass : inactiveNavClass}
              >
                Details
              </Link>
              <Link
                href="/about"
                className={isAbout ? activeNavClass : inactiveNavClass}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className={isContact ? activeNavClass : inactiveNavClass}
              >
                Contact Us
              </Link>
            </>
          )}
        </nav>

        {/* Right Actions: Portal Switcher + Theme Toggle + Phone */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Portal Switcher Button */}
          {isSeller ? (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#16161a] dark:hover:bg-[#202026] text-slate-900 dark:text-white border border-slate-200 dark:border-white/15 px-3 sm:px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm group"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
              <span>Buyer Portal</span>
            </Link>
          ) : (
            <Link
              href="/seller"
              className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white px-3 sm:px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm shadow-violet-500/20 active:scale-95 group"
            >
              <LayoutDashboard className="h-3.5 w-3.5 opacity-90 group-hover:rotate-6 transition-transform" />
              <span>Seller Portal</span>
            </Link>
          )}

          {/* Dark Mode Toggle */}
          <ThemeToggle />

          {/* Support Phone Pill */}
          <a
            href="tel:+94772973530"
            className="hidden lg:flex items-center gap-3 bg-slate-50 dark:bg-[#16161a] hover:bg-slate-100 dark:hover:bg-[#202026] border border-slate-200/80 dark:border-white/15 px-3.5 py-2 rounded-full transition-all group shadow-sm"
          >
            <div className="h-8 w-8 rounded-full bg-violet-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <Phone className="h-4 w-4" />
            </div>
            <div className="flex flex-col text-left pr-2">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
                Need help?
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                +94 (77) 297 3530
              </span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}
