"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  ChevronDown,
  MessageCircle,
  Star,
  Sparkles,
  CheckCircle2,
  Clock,
  Wrench,
  Calendar,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Download,
  Plus,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface SubMenuItem {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  badgeClass?: string;
}

interface SellerNavSection {
  id: string;
  label: string;
  href: string;
  badgeTitle: string;
  items: SubMenuItem[];
  footerAction?: {
    label: string;
    description: string;
    href: string;
    icon: React.ReactNode;
  };
}

const SELLER_NAV_SECTIONS: SellerNavSection[] = [
  {
    id: "overview",
    label: "Overview",
    href: "/seller?tab=overview",
    badgeTitle: "Host Dashboard",
    items: [
      {
        title: "Dashboard Overview",
        description: "Key performance metrics & live trips",
        href: "/seller?tab=overview",
        icon: <LayoutDashboard className="h-4 w-4 text-violet-500" />,
      },
      {
        title: "SuperHost Partner Score",
        description: "Top 5% rated host score in Sri Lanka",
        href: "/seller?tab=overview",
        icon: <Star className="h-4 w-4 text-amber-500" />,
        badge: "4.95 ★",
        badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20",
      },
      {
        title: "Add Vehicle Listing",
        description: "List a car with 7 photo blueprints",
        href: "/seller?tab=list-vehicle",
        icon: <Sparkles className="h-4 w-4 text-violet-500" />,
        badge: "New",
        badgeClass: "bg-violet-500/10 text-violet-700 dark:text-violet-400 border border-violet-500/20",
      },
    ],
  },
  {
    id: "fleet",
    label: "My Fleet",
    href: "/seller?tab=fleet",
    badgeTitle: "Fleet Operations",
    items: [
      {
        title: "All Vehicles",
        description: "Full vehicle inventory & management",
        href: "/seller?tab=fleet&filter=all",
        icon: <Car className="h-4 w-4 text-violet-500" />,
        badge: "All Cars",
        badgeClass: "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300",
      },
      {
        title: "Available for Rent",
        description: "Ready for instant tourist reservation",
        href: "/seller?tab=fleet&filter=available",
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
        badge: "Ready",
        badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
      },
      {
        title: "Currently on Road",
        description: "Active client trips in progress",
        href: "/seller?tab=fleet&filter=on rental",
        icon: <Clock className="h-4 w-4 text-violet-500" />,
        badge: "On Trip",
        badgeClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20",
      },
      {
        title: "Under Maintenance",
        description: "Vehicles undergoing service or repair",
        href: "/seller?tab=fleet&filter=maintenance",
        icon: <Wrench className="h-4 w-4 text-amber-500" />,
        badge: "Service",
        badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
      },
    ],
    footerAction: {
      label: "List a New Vehicle",
      description: "Expand your rental fleet on Tourmate",
      href: "/seller?tab=list-vehicle",
      icon: <Plus className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />,
    },
  },
  {
    id: "bookings",
    label: "Bookings",
    href: "/seller?tab=bookings",
    badgeTitle: "Reservations & Schedule",
    items: [
      {
        title: "All Bookings",
        description: "Master client reservations ledger",
        href: "/seller?tab=bookings&filter=all",
        icon: <FileText className="h-4 w-4 text-blue-500" />,
        badge: "Ledger",
        badgeClass: "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300",
      },
      {
        title: "Pending Approval",
        description: "New reservation inquiries awaiting confirmation",
        href: "/seller?tab=bookings&filter=pending",
        icon: <Clock className="h-4 w-4 text-amber-500" />,
        badge: "Action Req",
        badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
      },
      {
        title: "Upcoming Trips",
        description: "Confirmed bookings ready for vehicle handover",
        href: "/seller?tab=bookings&filter=upcoming",
        icon: <Calendar className="h-4 w-4 text-blue-500" />,
        badge: "Scheduled",
        badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
      },
      {
        title: "Completed Rentals",
        description: "Past finished trips & review ratings",
        href: "/seller?tab=bookings&filter=completed",
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
        badge: "Finished",
        badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
      },
    ],
    footerAction: {
      label: "Airport & Beach Handovers",
      description: "View today's vehicle pickup schedule",
      href: "/seller?tab=bookings",
      icon: <MapPin className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />,
    },
  },
  {
    id: "earnings",
    label: "Earnings",
    href: "/seller?tab=earnings",
    badgeTitle: "Financial Analytics & Payouts",
    items: [
      {
        title: "Payouts Overview",
        description: "Gross revenue, wallet balance & payouts",
        href: "/seller?tab=earnings",
        icon: <DollarSign className="h-4 w-4 text-emerald-500" />,
        badge: "Net Balance",
        badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
      },
      {
        title: "Monthly Revenue Analytics",
        description: "Month-over-month performance growth",
        href: "/seller?tab=earnings",
        icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
        badge: "+14.2%",
        badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
      },
      {
        title: "Host Protection Guarantee",
        description: "85% payout share with 0% listing fee",
        href: "/seller?tab=earnings",
        icon: <ShieldCheck className="h-4 w-4 text-violet-500" />,
        badge: "85% Net",
        badgeClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20",
      },
      {
        title: "Download Tax & Invoice Reports",
        description: "Export monthly statements and CSV logs",
        href: "/seller?tab=earnings",
        icon: <Download className="h-4 w-4 text-slate-500" />,
        badge: "PDF / CSV",
        badgeClass: "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300",
      },
    ],
    footerAction: {
      label: "Direct Bank Payouts",
      description: "Weekly automated transfers to your SL account",
      href: "/seller?tab=earnings",
      icon: <DollarSign className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />,
    },
  },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSellerTab, setActiveSellerTab] = useState("overview");
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>("fleet");

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isSeller = pathname.startsWith("/seller");
  const isHome = pathname === "/";
  const isVehicles = pathname.startsWith("/vehicles");
  const isDetails = pathname.startsWith("/details");
  const isAbout = pathname.startsWith("/about");
  const isContact = pathname.startsWith("/contact");

  // Sync active seller tab from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab) {
        setActiveSellerTab(tab);
      }
    }
  }, [pathname]);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Clean up hover timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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

  const handleMouseEnter = (sectionId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(sectionId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const buyerNavRef = useRef<HTMLDivElement>(null);
  const [hoveredNavHref, setHoveredNavHref] = useState<string | null>(null);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const BUYER_NAV_LINKS = useMemo(
    () => [
      { href: "/", label: "Home", isActive: isHome },
      { href: "/vehicles", label: "Vehicles", isActive: isVehicles },
      { href: "/details", label: "Details", isActive: isDetails },
      { href: "/about", label: "About Us", isActive: isAbout },
      { href: "/contact", label: "Contact Us", isActive: isContact },
    ],
    [isHome, isVehicles, isDetails, isAbout, isContact]
  );

  const updatePillPosition = useCallback(
    (targetHref?: string | null) => {
      if (!buyerNavRef.current) return;
      const container = buyerNavRef.current;

      const effectiveHref =
        targetHref !== undefined
          ? targetHref
          : BUYER_NAV_LINKS.find((l) => l.isActive)?.href || null;

      if (!effectiveHref) {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const targetLink = container.querySelector<HTMLAnchorElement>(
        `a[data-nav-href="${effectiveHref}"]`
      );
      if (targetLink) {
        setPillStyle({
          left: targetLink.offsetLeft,
          width: targetLink.offsetWidth,
          opacity: 1,
        });
      }
    },
    [BUYER_NAV_LINKS]
  );

  useEffect(() => {
    updatePillPosition(hoveredNavHref);
  }, [hoveredNavHref, updatePillPosition]);

  useEffect(() => {
    updatePillPosition();
    const handleResize = () => updatePillPosition(hoveredNavHref);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updatePillPosition, pathname, hoveredNavHref]);

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
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
          {isSeller ? (
            <div className="flex items-center gap-1 sm:gap-1.5">
              {SELLER_NAV_SECTIONS.map((section) => {
                const isOpen = activeDropdown === section.id;
                const isCurrentActive = activeSellerTab === section.id;

                return (
                  <div
                    key={section.id}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(section.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={section.href}
                      onClick={() => {
                        setActiveSellerTab(section.id);
                        setActiveDropdown(null);
                      }}
                      className={`flex items-center gap-1.5 py-2 px-3.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                        isCurrentActive
                          ? "bg-slate-100/90 dark:bg-white/10 text-slate-950 dark:text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5"
                      }`}
                    >
                      <span>{section.label}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isOpen
                            ? "rotate-180 text-violet-600 dark:text-violet-400"
                            : "text-slate-400 dark:text-slate-500 opacity-70"
                        }`}
                      />
                    </Link>

                    {/* Animated Dropdown Flyout Sub-menu */}
                    {isOpen && (
                      <div
                        className="absolute top-full -left-4 sm:left-1/2 sm:-translate-x-1/2 pt-2 z-50 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200"
                        onMouseEnter={() => handleMouseEnter(section.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="w-80 sm:w-96 rounded-[26px] bg-white/95 dark:bg-[#121217]/95 border border-slate-200/90 dark:border-white/10 shadow-2xl backdrop-blur-2xl p-2.5 space-y-1">
                          {/* Category Header */}
                          <div className="px-3 pt-1.5 pb-2 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                              {section.badgeTitle}
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-violet-400 animate-pulse" />
                          </div>

                          {/* Submenu Item Rows */}
                          <div className="py-1 space-y-0.5">
                            {section.items.map((item) => (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  if (item.href.includes("tab=")) {
                                    const match = item.href.match(/tab=([^&]+)/);
                                    if (match) setActiveSellerTab(match[1]);
                                  }
                                }}
                                className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-100/80 dark:hover:bg-white/5 transition-all group/sub cursor-pointer"
                              >
                                <div className="flex items-center gap-3 truncate pr-2">
                                  <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-white/5 group-hover/sub:bg-violet-600/15 dark:group-hover/sub:bg-violet-500/20 text-slate-700 dark:text-slate-300 group-hover/sub:text-violet-600 dark:group-hover/sub:text-violet-400 transition-all flex items-center justify-center flex-shrink-0">
                                    {item.icon}
                                  </div>
                                  <div className="truncate">
                                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover/sub:text-violet-600 dark:group-hover/sub:text-violet-400 transition-colors truncate">
                                      {item.title}
                                    </div>
                                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                      {item.description}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 flex-shrink-0 ml-1">
                                  {item.badge && (
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeClass}`}>
                                      {item.badge}
                                    </span>
                                  )}
                                  <ChevronRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 group-hover/sub:text-violet-600 dark:group-hover/sub:text-violet-400 group-hover/sub:translate-x-0.5 transition-transform" />
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Footer Action Card */}
                          {section.footerAction && (
                            <div className="pt-1 border-t border-slate-100 dark:border-white/5">
                              <Link
                                href={section.footerAction.href}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  if (section.footerAction?.href.includes("tab=")) {
                                    const match = section.footerAction.href.match(/tab=([^&]+)/);
                                    if (match) setActiveSellerTab(match[1]);
                                  }
                                }}
                                className="flex items-center justify-between p-2.5 rounded-2xl bg-violet-50/70 dark:bg-violet-950/30 hover:bg-violet-100/70 dark:hover:bg-violet-900/40 text-violet-950 dark:text-violet-200 transition-all group/foot cursor-pointer"
                              >
                                <div className="flex items-center gap-2 text-xs font-bold">
                                  {section.footerAction.icon}
                                  <span>{section.footerAction.label}</span>
                                </div>
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-violet-600 dark:text-violet-400 flex items-center gap-1">
                                  Open <ArrowRight className="h-3 w-3 group-hover/foot:translate-x-0.5 transition-transform" />
                                </span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              ref={buyerNavRef}
              onMouseLeave={() => setHoveredNavHref(null)}
              className="relative flex items-center gap-1 select-none"
            >
              {/* Sliding Animated Pill Indicator */}
              <span
                aria-hidden="true"
                style={{
                  transform: `translateX(${pillStyle.left}px)`,
                  width: `${pillStyle.width}px`,
                  opacity: pillStyle.opacity,
                }}
                className="absolute top-0 bottom-0 left-0 rounded-full bg-slate-100/90 dark:bg-white/10 shadow-xs border border-slate-200/50 dark:border-white/5 transition-all duration-300 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
              />

              {BUYER_NAV_LINKS.map((link) => {
                const isSelected = hoveredNavHref
                  ? hoveredNavHref === link.href
                  : link.isActive;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-nav-href={link.href}
                    onMouseEnter={() => setHoveredNavHref(link.href)}
                    className={`relative z-10 py-1.5 px-3.5 rounded-full text-sm transition-all duration-200 active:scale-95 cursor-pointer ${
                      isSelected
                        ? "text-slate-950 dark:text-white font-bold"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white font-medium"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>

        {/* Right Actions: Portal Switcher + Theme Toggle + Phone + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Portal Switcher Button */}
          {isSeller ? (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-[#16161a] dark:hover:bg-[#202026] text-slate-900 dark:text-white border border-slate-200 dark:border-white/15 px-3 sm:px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm group active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Buyer Portal</span>
              <span className="sm:hidden">Buyer</span>
            </Link>
          ) : (
            <Link
              href="/seller"
              className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white px-3 sm:px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm shadow-violet-500/25 active:scale-95 group cursor-pointer"
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
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 block mb-1">
                {isSeller ? "Host Portal Sub-Menus" : "Navigation"}
              </span>

              {isSeller ? (
                /* Seller Mobile Navigation with Expandable Submenus */
                <div className="space-y-2">
                  {SELLER_NAV_SECTIONS.map((sec) => {
                    const isExpanded = mobileExpandedSection === sec.id;
                    return (
                      <div
                        key={sec.id}
                        className="rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden bg-slate-50/50 dark:bg-white/[0.02]"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpandedSection(isExpanded ? null : sec.id)
                          }
                          className="w-full flex items-center justify-between p-3.5 text-left text-sm font-bold text-slate-900 dark:text-white"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="h-2 w-2 rounded-full bg-violet-600" />
                            <span>{sec.label}</span>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-violet-600" : "text-slate-400"
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="p-2 space-y-1 bg-white dark:bg-[#121217] border-t border-slate-100 dark:border-white/5 animate-in fade-in-0 duration-150">
                            {sec.items.map((sub) => (
                              <Link
                                key={sub.title}
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                              >
                                <div className="flex items-center gap-2.5 truncate pr-2">
                                  <span className="text-violet-600 dark:text-violet-400 flex-shrink-0">
                                    {sub.icon}
                                  </span>
                                  <span className="truncate">{sub.title}</span>
                                </div>
                                {sub.badge && (
                                  <span
                                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${sub.badgeClass}`}
                                  >
                                    {sub.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                            {sec.footerAction && (
                              <Link
                                href={sec.footerAction.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-between p-2.5 rounded-xl text-xs font-bold text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/30 mt-1"
                              >
                                <div className="flex items-center gap-2">
                                  {sec.footerAction.icon}
                                  <span>{sec.footerAction.label}</span>
                                </div>
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Buyer Navigation */
                [
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
                })
              )}
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
