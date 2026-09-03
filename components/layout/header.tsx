"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  LayoutDashboard,
  ArrowLeft,
  Menu,
  X,
  Car,
  Home,
  FileText,
  Users,
  Mail,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isSeller = pathname.startsWith("/seller");
  const isHome = pathname === "/";
  const isVehicles = pathname.startsWith("/vehicles");
  const isDetails = pathname.startsWith("/details");
  const isAbout = pathname.startsWith("/about");
  const isContact = pathname.startsWith("/contact");

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const activeNavClass =
    "text-slate-950 dark:text-white font-bold relative py-1.5 px-3 rounded-full bg-slate-100/80 dark:bg-white/10 transition-all shadow-sm";
  const inactiveNavClass =
    "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all py-1.5 px-3 rounded-full hover:bg-slate-100/50 dark:hover:bg-white/5";

  return (
    <header className="sticky top-0 z-50 w-full stripe-glass border-b border-slate-200/80 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo & Portal Badge */}
        <div className="flex items-center gap-3">
          <Link href={isSeller ? "/seller" : "/"} className="flex items-center gap-2 group py-1">
            <Image
              src="/images/logo-transparent.png"
              alt="Tourmate Rentals"
              width={160}
              height={52}
              className="h-10 sm:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-200 dark:brightness-110"
              priority
            />
          </Link>
          {isSeller && (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
              Host Portal
            </span>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
          {isSeller ? (
            <>
              <Link href="/seller?tab=overview" className={activeNavClass}>
                Overview
              </Link>
              <Link href="/seller?tab=fleet" className={inactiveNavClass}>
                My Fleet
              </Link>
              <Link href="/seller?tab=bookings" className={inactiveNavClass}>
                Bookings
              </Link>
              <Link href="/seller?tab=earnings" className={inactiveNavClass}>
                Earnings
              </Link>
            </>
          ) : (
            <>
              <Link href="/" className={isHome ? activeNavClass : inactiveNavClass}>
                Home
              </Link>
              <Link href="/vehicles" className={isVehicles ? activeNavClass : inactiveNavClass}>
                Vehicles
              </Link>
              <Link href="/details" className={isDetails ? activeNavClass : inactiveNavClass}>
                Details
              </Link>
              <Link href="/about" className={isAbout ? activeNavClass : inactiveNavClass}>
                About Us
              </Link>
              <Link href="/contact" className={isContact ? activeNavClass : inactiveNavClass}>
                Contact Us
              </Link>
            </>
          )}
        </nav>

        {/* Right Actions: Portal Switcher + Theme Toggle + Phone + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Portal Switcher Button */}
          {isSeller ? (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#16161a] dark:hover:bg-[#202026] text-slate-900 dark:text-white border border-slate-200 dark:border-white/15 px-3 sm:px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm group active:scale-95"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Buyer Portal</span>
              <span className="sm:hidden">Buyer</span>
            </Link>
          ) : (
            <Link
              href="/seller"
              className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white px-3 sm:px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm shadow-violet-500/25 active:scale-95 group"
            >
              <LayoutDashboard className="h-3.5 w-3.5 opacity-90 group-hover:rotate-6 transition-transform" />
              <span className="hidden sm:inline">Seller Portal</span>
              <span className="sm:hidden">Host</span>
            </Link>
          )}

          {/* Dark Mode Toggle */}
          <ThemeToggle />

          {/* Desktop Support Phone Pill */}
          <a
            href="tel:+94772973530"
            className="hidden lg:flex items-center gap-3 bg-slate-50 dark:bg-[#16161a] hover:bg-slate-100 dark:hover:bg-[#202026] border border-slate-200/80 dark:border-white/15 px-3.5 py-2 rounded-full transition-all group shadow-sm active:scale-95"
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

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden h-10 w-10 rounded-full bg-slate-100 dark:bg-[#16161a] border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-transform active:scale-90"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Slide-down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bottom-0 z-50 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0b0b0e] border-b border-slate-200 dark:border-white/10 p-5 shadow-2xl rounded-b-[30px] space-y-5 animate-in slide-in-from-top-4 duration-300 max-h-[85vh] overflow-y-auto">
            {/* Quick Links List */}
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block mb-2">
                Navigation
              </span>

              {[
                { href: "/", label: "Home", icon: Home, active: isHome },
                { href: "/vehicles", label: "Browse Vehicles", icon: Car, active: isVehicles },
                { href: "/details", label: "Specifications & Details", icon: FileText, active: isDetails },
                { href: "/about", label: "About Tourmate", icon: Users, active: isAbout },
                { href: "/contact", label: "Contact Us", icon: Mail, active: isContact },
                { href: "/seller", label: "Seller & Host Portal", icon: LayoutDashboard, active: isSeller },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-2xl text-sm font-bold transition-all ${
                      item.active
                        ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                        : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 opacity-80" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </Link>
                );
              })}
            </div>

            {/* Direct Support Actions */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/10 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block mb-2">
                24/7 Roadside Assistance
              </span>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+94772973530"
                  className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-900 dark:text-white p-3 rounded-2xl text-xs font-bold transition-colors"
                >
                  <Phone className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  <span>Call Support</span>
                </a>

                <a
                  href="https://wa.me/94703236834"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-2xl text-xs font-bold transition-colors shadow-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

