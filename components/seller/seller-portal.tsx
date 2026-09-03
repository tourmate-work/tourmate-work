"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Car,
  TrendingUp,
  CalendarCheck,
  Star,
  Plus,
  ArrowUpRight,
  SlidersHorizontal,
  Fuel,
  MapPin,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  Users,
  Search,
  Filter,
} from "lucide-react";
import { AddVehicleModal, SellerVehicle } from "./add-vehicle-modal";
import { VehicleListingForm } from "./vehicle-listing-form";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const INITIAL_SELLER_FLEET: SellerVehicle[] = [
  {
    id: "sv-1",
    name: "Toyota Axio WXB Hybrid",
    category: "Sedan",
    year: 2022,
    dailyRate: 15500,
    currency: "LKR",
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    doors: 4,
    location: "Wennapuwa / Airport (CMB)",
    status: "On Rental",
    totalTrips: 18,
    totalEarnings: 279000,
    rating: 4.9,
    type: "sedan",
    features: ["Air Conditioner", "Bluetooth Audio", "Reverse Camera", "GPS"],
  },
  {
    id: "sv-2",
    name: "Honda Vezel RS Sensing",
    category: "SUV",
    year: 2023,
    dailyRate: 22000,
    currency: "LKR",
    transmission: "Automatic",
    fuel: "Hybrid",
    seats: 5,
    doors: 5,
    location: "Colombo / Negombo",
    status: "Available",
    totalTrips: 12,
    totalEarnings: 264000,
    rating: 5.0,
    type: "suv",
    features: ["Air Conditioner", "Cruise Control", "Leather Seats", "Dashcam"],
  },
  {
    id: "sv-3",
    name: "Mercedes-Benz C200 AMG",
    category: "Luxury",
    year: 2022,
    dailyRate: 48000,
    currency: "LKR",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    doors: 4,
    location: "Colombo 03 / Airport",
    status: "On Rental",
    totalTrips: 7,
    totalEarnings: 336000,
    rating: 4.9,
    type: "sedan",
    features: ["Sunroof", "Burmester Audio", "Executive Leather", "Chauffeur Option"],
  },
  {
    id: "sv-4",
    name: "Toyota KDH Super GL Luxury",
    category: "Van",
    year: 2021,
    dailyRate: 28000,
    currency: "LKR",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 10,
    doors: 5,
    location: "Wennapuwa / Kandy",
    status: "Available",
    totalTrips: 15,
    totalEarnings: 420000,
    rating: 4.8,
    type: "van",
    features: ["Dual AC", "Reclining Seats", "Luggage Carrier", "Curtains"],
  },
  {
    id: "sv-5",
    name: "Toyota Premio G-Superior",
    category: "Sedan",
    year: 2020,
    dailyRate: 16500,
    currency: "LKR",
    transmission: "Automatic",
    fuel: "Petrol",
    seats: 5,
    doors: 4,
    location: "Wennapuwa Beach",
    status: "Available",
    totalTrips: 22,
    totalEarnings: 363000,
    rating: 4.9,
    type: "sedan",
    features: ["Air Conditioner", "Touch Display", "Keyless Entry"],
  },
  {
    id: "sv-6",
    name: "Toyota Land Cruiser Prado TX",
    category: "SUV",
    year: 2022,
    dailyRate: 55000,
    currency: "LKR",
    transmission: "Automatic",
    fuel: "Diesel",
    seats: 7,
    doors: 5,
    location: "Colombo / South Coast",
    status: "Maintenance",
    totalTrips: 9,
    totalEarnings: 495000,
    rating: 5.0,
    type: "suv",
    features: ["4x4 Drive", "Sunroof", "360 Camera", "Cool Box"],
  },
];

interface BookingRecord {
  id: string;
  renterName: string;
  renterPhone: string;
  vehicleName: string;
  dates: string;
  days: number;
  totalAmount: number;
  status: "Active" | "Upcoming" | "Completed" | "Pending";
}

const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: "BK-9801",
    renterName: "David Miller",
    renterPhone: "+44 7911 123456",
    vehicleName: "Toyota Axio WXB Hybrid",
    dates: "Sep 01 - Sep 07, 2026",
    days: 6,
    totalAmount: 93000,
    status: "Active",
  },
  {
    id: "BK-9802",
    renterName: "Sophie Martin",
    renterPhone: "+33 612 345678",
    vehicleName: "Mercedes-Benz C200 AMG",
    dates: "Aug 29 - Sep 05, 2026",
    days: 7,
    totalAmount: 336000,
    status: "Active",
  },
  {
    id: "BK-9803",
    renterName: "Kasun Jayasuriya",
    renterPhone: "+94 77 123 4567",
    vehicleName: "Honda Vezel RS Sensing",
    dates: "Sep 10 - Sep 14, 2026",
    days: 4,
    totalAmount: 88000,
    status: "Upcoming",
  },
  {
    id: "BK-9804",
    renterName: "Elena Rostova",
    renterPhone: "+7 903 123 4567",
    vehicleName: "Toyota KDH Super GL Luxury",
    dates: "Sep 15 - Sep 22, 2026",
    days: 7,
    totalAmount: 196000,
    status: "Upcoming",
  },
  {
    id: "BK-9799",
    renterName: "Marcus Becker",
    renterPhone: "+49 151 2345678",
    vehicleName: "Toyota Land Cruiser Prado TX",
    dates: "Aug 18 - Aug 25, 2026",
    days: 7,
    totalAmount: 385000,
    status: "Completed",
  },
  {
    id: "BK-9805",
    renterName: "Arun Patel",
    renterPhone: "+91 98200 12345",
    vehicleName: "Toyota Premio G-Superior",
    dates: "Sep 08 - Sep 11, 2026",
    days: 3,
    totalAmount: 49500,
    status: "Pending",
  },
];

export function SellerPortalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get("tab") || "overview";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [fleet, setFleet] = useState<SellerVehicle[]>(INITIAL_SELLER_FLEET);
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [fleetFilter, setFleetFilter] = useState("all");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [bookingSearch, setBookingSearch] = useState("");

  // Sync state when URL query parameters change
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
    const filter = searchParams.get("filter");
    if (filter) {
      if (tab === "fleet") {
        setFleetFilter(filter);
      } else if (tab === "bookings") {
        setBookingStatusFilter(filter);
      }
    }
  }, [searchParams]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.replace(`/seller?tab=${tab}`, { scroll: false });
  };

  const handleToggleStatus = (vehicleId: string) => {
    setFleet((prev) =>
      prev.map((v) => {
        if (v.id === vehicleId) {
          const nextStatus: SellerVehicle["status"] =
            v.status === "Available"
              ? "Maintenance"
              : v.status === "Maintenance"
              ? "Available"
              : "Available";
          return { ...v, status: nextStatus };
        }
        return v;
      })
    );
  };

  const handleApproveBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: "Upcoming" as const } : b
      )
    );
  };

  const handleAddVehicle = (newVehicle: SellerVehicle) => {
    setFleet([newVehicle, ...fleet]);
    setActiveTab("fleet");
  };

  const totalEarnings = fleet.reduce((acc, v) => acc + v.totalEarnings, 0);
  const activeCount = fleet.filter((v) => v.status === "Available").length;
  const onRentalCount = fleet.filter((v) => v.status === "On Rental").length;
  const totalTrips = fleet.reduce((acc, v) => acc + v.totalTrips, 0);

  const filteredFleet = fleet.filter((v) => {
    if (fleetFilter === "all") return true;
    return v.status.toLowerCase() === fleetFilter.toLowerCase();
  });

  const filteredBookings = bookings.filter((b) => {
    if (bookingStatusFilter !== "all") {
      if (bookingStatusFilter === "pending" && b.status !== "Pending") return false;
      if (bookingStatusFilter === "upcoming" && b.status !== "Upcoming") return false;
      if (bookingStatusFilter === "active" && b.status !== "Active") return false;
      if (bookingStatusFilter === "completed" && b.status !== "Completed") return false;
    }
    if (!bookingSearch.trim()) return true;
    const q = bookingSearch.toLowerCase();
    return (
      b.renterName.toLowerCase().includes(q) ||
      b.vehicleName.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      {/* 1. SELLER HERO BANNER */}
      <section className="relative pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[30px] overflow-hidden bg-gradient-to-r from-violet-950 via-purple-900 to-indigo-950 text-white p-6 sm:p-10 shadow-2xl border border-white/10">
            <div className="absolute inset-0 z-0 opacity-25">
              <Image
                src="/images/hero-sri-lanka.jpg"
                alt="Tourmate Sri Lanka fleet"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Left Profile Info */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-amber-300">
                  <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                  <span>Verified Fleet Host Partner</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                  MSP Fleet Management Portal
                </h1>
                <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
                  Manage your vehicle listings, review active client trips, track daily earnings, and accept new rental inquiries.
                </p>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleTabChange("list-vehicle")}
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 px-5 py-3.5 rounded-[30px] text-sm font-bold shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>List New Vehicle</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOP METRIC STATS CARDS */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Revenue */}
            <ScrollReveal delay={0} direction="up">
              <div className="card-hover-lift bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Total Gross Revenue
                  </span>
                  <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white block">
                    LKR {totalEarnings.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>+14.2% from last month</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Listed Fleet */}
            <ScrollReveal delay={100} direction="up">
              <div className="card-hover-lift bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    My Active Fleet
                  </span>
                  <div className="h-10 w-10 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                    <Car className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white block">
                    {fleet.length} Vehicles
                  </span>
                  <div className="flex items-center gap-3 mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {activeCount} Ready
                    </span>
                    <span>•</span>
                    <span className="text-violet-600 dark:text-violet-400 font-bold">
                      {onRentalCount} on Road
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Completed Bookings */}
            <ScrollReveal delay={200} direction="up">
              <div className="card-hover-lift bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Completed Rentals
                  </span>
                  <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <CalendarCheck className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white block">
                    {totalTrips} Trips
                  </span>
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>100% verified client reviews</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Host Rating */}
            <ScrollReveal delay={300} direction="up">
              <div className="card-hover-lift bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Host Partner Score
                  </span>
                  <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
                      4.95
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ 5.0</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                    <span>SuperHost Status (Top 5% in SL)</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. TAB CONTENTS */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Active Vehicles On Road Now */}
              <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
                      Active Rentals Currently on Road
                    </h3>
                    <p className="text-xs text-slate-400">
                      Vehicles currently checked out by verified tourists and clients
                    </p>
                  </div>
                  <button
                    onClick={() => handleTabChange("bookings")}
                    className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
                  >
                    <span>View All Bookings</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookings
                    .filter((b) => b.status === "Active")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-slate-50 dark:bg-[#111115] border border-slate-200/60 dark:border-white/10 rounded-2xl p-5 flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-violet-500/10 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-md">
                              {item.id} • On Road
                            </span>
                            <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                              {item.vehicleName}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              Client: <span className="font-semibold text-slate-800 dark:text-slate-200">{item.renterName}</span> ({item.renterPhone})
                            </p>
                          </div>
                          <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                            LKR {item.totalAmount.toLocaleString()}
                          </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                            <span>{item.dates} ({item.days} days)</span>
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                            Active Rental
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Pending Inquiries to Accept */}
              <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-sm">
                <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white mb-1">
                  Pending Client Inquiries
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Review and confirm upcoming rental dates from direct WhatsApp and portal leads
                </p>

                <div className="space-y-3">
                  {bookings
                    .filter((b) => b.status === "Pending")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                              New Request
                            </span>
                            <span className="text-xs text-slate-400">• {item.id}</span>
                          </div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                            {item.vehicleName}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            Renter: {item.renterName} • {item.dates} • Payout:{" "}
                            <span className="font-bold text-slate-900 dark:text-white">
                              LKR {item.totalAmount.toLocaleString()}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleApproveBooking(item.id)}
                            className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md transition-all active:scale-95"
                          >
                            Accept & Reserve
                          </button>
                          <a
                            href={`https://wa.me/94703236834?text=${encodeURIComponent(`Hi ${item.renterName}, confirming your Tourmate rental for ${item.vehicleName}.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all"
                          >
                            WhatsApp Client
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY FLEET */}
          {activeTab === "fleet" && (
            <div className="space-y-6">
              {/* Filter and Count Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0b0b0e] p-4 rounded-[30px] border border-slate-200/80 dark:border-white/10 shadow-sm">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Filter by Status:
                  </span>
                  <div className="flex items-center gap-1">
                    {["all", "available", "on rental", "maintenance"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFleetFilter(f)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
                          fleetFilter === f
                            ? "bg-violet-600 text-white"
                            : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  <Plus className="h-4 w-4" />
                  <span>List New Vehicle</span>
                </button>
              </div>

              {/* Vehicle Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFleet.map((car, idx) => (
                  <ScrollReveal key={car.id} delay={idx * 60} direction="up">
                    <div className="card-hover-lift bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between h-full">
                      {/* Top Header: Category & Status Badge */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                            {car.category} • {car.year}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                              car.status === "Available"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                : car.status === "On Rental"
                                ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20"
                                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                            }`}
                          >
                            {car.status}
                          </span>
                        </div>

                        {/* Title & Rate */}
                        <div className="flex items-start justify-between gap-2 mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                              {car.name}
                            </h3>
                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              <span>{car.location}</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-violet-600 dark:text-violet-400 block leading-tight">
                              LKR {car.dailyRate.toLocaleString()}
                            </span>
                            <span className="text-[11px] text-slate-400">/ day</span>
                          </div>
                        </div>

                        {/* Specs Pill Summary */}
                        <div className="grid grid-cols-3 gap-1.5 py-3 border-t border-b border-slate-100 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 mb-4">
                          <div className="flex items-center gap-1">
                            <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                            <span className="truncate">{car.transmission}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Fuel className="h-3.5 w-3.5 text-slate-400" />
                            <span className="truncate">{car.fuel}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-slate-400" />
                            <span>{car.seats} Seats</span>
                          </div>
                        </div>

                        {/* Lifetime Revenue on this car */}
                        <div className="bg-slate-50 dark:bg-[#111115] rounded-2xl p-3 flex items-center justify-between text-xs mb-4">
                          <span className="text-slate-500 dark:text-slate-400">
                            Earned ({car.totalTrips} trips):
                          </span>
                          <span className="font-extrabold text-slate-900 dark:text-white">
                            LKR {car.totalEarnings.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(car.id)}
                          className="flex-1 py-2.5 px-3 rounded-[30px] border border-slate-200 dark:border-white/15 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-center"
                        >
                          {car.status === "Maintenance"
                            ? "Set to Available"
                            : "Set Maintenance"}
                        </button>
                        <Link
                          href={`/details?id=1`}
                          className="py-2.5 px-4 rounded-[30px] bg-violet-600/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-bold hover:bg-violet-600 hover:text-white transition-all text-center"
                        >
                          Preview
                        </Link>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="bg-white dark:bg-[#0b0b0e] p-4 rounded-[30px] border border-slate-200/80 dark:border-white/10 shadow-sm flex items-center gap-3">
                <Search className="h-4 w-4 text-slate-400 ml-2" />
                <input
                  type="text"
                  placeholder="Search by client name, vehicle, or reservation ID..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              {/* Bookings Table / Cards */}
              <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] border border-slate-200/80 dark:border-white/10 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                      Client Reservations Ledger
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">
                      Showing {filteredBookings.length} records
                    </span>
                  </div>

                  {/* Booking Status Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    {["all", "pending", "upcoming", "active", "completed"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setBookingStatusFilter(status)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                          bookingStatusFilter === status
                            ? "bg-violet-600 text-white shadow-sm"
                            : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-white/10">
                  {filteredBookings.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 sm:p-6 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-violet-600 dark:text-violet-400 font-mono">
                            {item.id}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                              item.status === "Active"
                                ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20"
                                : item.status === "Completed"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                : item.status === "Upcoming"
                                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {item.vehicleName}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Renter: <span className="font-semibold text-slate-800 dark:text-slate-200">{item.renterName}</span> • Phone: {item.renterPhone}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-8 text-xs">
                        <div>
                          <span className="text-slate-400 block">Dates:</span>
                          <span className="font-bold text-slate-900 dark:text-white">
                            {item.dates} ({item.days} days)
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-400 block">Payout Value:</span>
                          <span className="text-base font-extrabold text-slate-900 dark:text-white">
                            LKR {item.totalAmount.toLocaleString()}
                          </span>
                        </div>

                        <a
                          href={`https://wa.me/94703236834?text=${encodeURIComponent(`Tourmate Host Notification: Booking ${item.id} for ${item.vehicleName}`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-full border border-slate-200 dark:border-white/15 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-center w-fit"
                        >
                          Message Client
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EARNINGS & PAYOUTS */}
          {activeTab === "earnings" && (
            <div className="space-y-8">
              {/* Payout Schedule Summary Banner */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#0b0b0e] p-6 rounded-[30px] border border-slate-200/80 dark:border-white/10 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Next Scheduled Payout
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white block">
                    LKR 181,000
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block mt-1.5">
                    Transfer Date: Sep 08, 2026
                  </span>
                </div>

                <div className="bg-white dark:bg-[#0b0b0e] p-6 rounded-[30px] border border-slate-200/80 dark:border-white/10 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Settled to Bank Account
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white block">
                    LKR 1,984,000
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1.5">
                    Bank of Ceylon •••• 8291
                  </span>
                </div>

                <div className="bg-white dark:bg-[#0b0b0e] p-6 rounded-[30px] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Host Commission Tier
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-violet-600 dark:text-violet-400 block">
                      85% Net Share
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1.5">
                      Standard Tourmate Protection Tier
                    </span>
                  </div>
                </div>
              </div>

              {/* Monthly Revenue Breakdown Bars */}
              <div className="bg-white dark:bg-[#0b0b0e] p-6 sm:p-8 rounded-[30px] border border-slate-200/80 dark:border-white/10 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white">
                      Monthly Revenue Analytics
                    </h3>
                    <p className="text-xs text-slate-400">
                      Total rental earnings across all listed fleet vehicles in 2026
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/15 px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Report</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    { month: "August 2026", amount: 485000, pct: 95 },
                    { month: "July 2026", amount: 425000, pct: 82 },
                    { month: "June 2026", amount: 390000, pct: 75 },
                    { month: "May 2026", amount: 340000, pct: 65 },
                    { month: "April 2026", amount: 310000, pct: 58 },
                  ].map((row) => (
                    <div key={row.month} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-700 dark:text-slate-300">{row.month}</span>
                        <span className="text-slate-900 dark:text-white">
                          LKR {row.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${row.pct}%` }}
                          className="h-full bg-violet-600 rounded-full transition-all duration-700"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LIST A VEHICLE FORM */}
          {activeTab === "list-vehicle" && (
            <div className="bg-white dark:bg-[#0b0b0e] rounded-[32px] p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-sm">
              <VehicleListingForm
                onSuccess={handleAddVehicle}
                onCancel={() => handleTabChange("overview")}
              />
            </div>
          )}
        </div>
      </section>

      {/* 5. ADD VEHICLE MODAL */}
      <AddVehicleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVehicle={handleAddVehicle}
      />
    </div>
  );
}
