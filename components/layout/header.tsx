"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isVehicles = pathname.startsWith("/vehicles");
  const isDetails = pathname.startsWith("/details");
  const isAbout = pathname.startsWith("/about");
  const isContact = pathname.startsWith("/contact");

  const activeNavClass =
    "text-slate-950 font-semibold relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black";
  const inactiveNavClass =
    "text-slate-600 hover:text-slate-950 transition-colors py-1";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group py-1">
          <Image
            src="/images/logo-transparent.png"
            alt="Tourmate Rentals"
            width={160}
            height={52}
            className="h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
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
        </nav>

        {/* Support Phone Pill */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+94772973530"
            className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3.5 py-2 rounded-full transition-all group shadow-sm"
          >
            <div className="h-8 w-8 rounded-full bg-violet-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <Phone className="h-4 w-4" />
            </div>
            <div className="flex flex-col text-left pr-2">
              <span className="text-[11px] font-medium text-slate-500 leading-tight">
                Need help?
              </span>
              <span className="text-xs font-bold text-slate-900 leading-tight">
                +94 (77) 297 3530
              </span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
}
