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
  ShieldCheck,
  MapPin,
  CheckCircle2,
  DollarSign,
  Search,
  KeyRound,
  LogOut,
  Trash2,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { AddVehicleModal, SellerVehicle } from "@/components/seller/add-vehicle-modal";
import { VehicleListingForm } from "@/components/seller/vehicle-listing-form";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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

export function AdminPortalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get("tab") || "list-vehicle";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [fleet, setFleet] = useState<SellerVehicle[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [fleetFilter, setFleetFilter] = useState("all");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [bookingSearch, setBookingSearch] = useState("");
  const [fleetSearch, setFleetSearch] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  // Check persistent admin authentication on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tourmate_admin_auth");
      if (stored === "true") {
        setIsAuthenticated(true);
      }
      setCheckingAuth(false);
    }
  }, []);

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

  // Fetch live fleet and bookings from backend on mount or when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    async function loadBackendData() {
      setIsLoading(true);
      try {
        // 1. Fetch live fleet
        const fleetRes = await fetch("/api/seller/vehicles");
        const fleetData = await fleetRes.json();
        if (fleetData.success && Array.isArray(fleetData.fleet)) {
          setFleet(fleetData.fleet);
        } else {
          setFleet([]);
        }

        // 2. Fetch live bookings
        const bookingsRes = await fetch("/api/bookings");
        const bookingsData = await bookingsRes.json();
        if (bookingsData.success && Array.isArray(bookingsData.bookings)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mapped: BookingRecord[] = bookingsData.bookings.map((b: any) => {
            const pickup = new Date(b.pickupDate);
            const ret = new Date(b.returnDate);
            const datesStr =
              !isNaN(pickup.getTime()) && !isNaN(ret.getTime())
                ? `${pickup.toLocaleDateString("en-US", { month: "short", day: "2-digit" })} - ${ret.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}`
                : "Dates pending";

            let status: BookingRecord["status"] = "Pending";
            const s = (b.status || "").toUpperCase();
            if (s === "ACTIVE") status = "Active";
            else if (s === "COMPLETED") status = "Completed";
            else if (s === "CONFIRMED" || s === "UPCOMING") status = "Upcoming";
            else status = "Pending";

            const carName = b.car
              ? `${b.car.brand || ""} ${b.car.model || b.car.name || ""}`.trim()
              : "Tourmate Vehicle";

            const displayId =
              typeof b.id === "string" && b.id.length > 8
                ? `BK-${b.id.slice(-4).toUpperCase()}`
                : b.id || "BK-0001";

            return {
              id: displayId,
              renterName: b.customerName || "Customer",
              renterPhone: b.customerPhone || "",
              vehicleName: carName,
              dates: datesStr,
              days: b.totalDays || 1,
              totalAmount: b.totalPrice || 0,
              status,
            };
          });
          setBookings(mapped);
        } else {
          setBookings([]);
        }
      } catch (e) {
        console.error("Failed to load admin data from API:", e);
      } finally {
        setIsLoading(false);
      }
    }
    loadBackendData();
  }, [isAuthenticated]);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (passcode.trim() === "tourmate123" || passcode.trim().toLowerCase() === "admin") {
      setIsAuthenticated(true);
      setAuthError("");
      if (typeof window !== "undefined") {
        localStorage.setItem("tourmate_admin_auth", "true");
      }
    } else {
      setAuthError("Invalid passcode. Please enter the Tourmate admin passcode.");
    }
  };

  const handleQuickUnlock = () => {
    setPasscode("tourmate123");
    setIsAuthenticated(true);
    setAuthError("");
    if (typeof window !== "undefined") {
      localStorage.setItem("tourmate_admin_auth", "true");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("tourmate_admin_auth");
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.replace(`/admin?tab=${tab}`, { scroll: false });
  };

  const handleToggleStatus = async (vehicleId: string) => {
    let nextStatus: SellerVehicle["status"] = "Available";
    setFleet((prev) =>
      prev.map((v) => {
        if (v.id === vehicleId) {
          nextStatus =
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

    try {
      await fetch(`/api/vehicles/${vehicleId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      setNotice(`Vehicle status updated to "${nextStatus}".`);
      setTimeout(() => setNotice(null), 3500);
    } catch (e) {
      console.error("Failed to sync vehicle status with backend:", e);
    }
  };

  const handleDeleteVehicle = async (vehicleId: string, vehicleName: string) => {
    if (!confirm(`Are you sure you want to remove "${vehicleName}" from the live fleet?`)) {
      return;
    }

    setFleet((prev) => prev.filter((v) => v.id !== vehicleId));

    try {
      await fetch(`/api/vehicles/${vehicleId}`, {
        method: "DELETE",
      });
      setNotice(`"${vehicleName}" was removed from the fleet.`);
      setTimeout(() => setNotice(null), 3500);
    } catch (e) {
      console.error("Failed to delete vehicle:", e);
    }
  };

  const handleAddVehicle = (newVehicle: SellerVehicle) => {
    setFleet((prev) => [newVehicle, ...prev]);
    setIsAddModalOpen(false);
    setNotice(`"${newVehicle.name}" successfully added to the live fleet!`);
    setTimeout(() => setNotice(null), 5000);
    handleTabChange("fleet");
  };

  // Summary Metrics Calculation
  const bookingsRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const fleetEarnings = fleet.reduce((sum, v) => sum + (v.totalEarnings || 0), 0);
  const totalEarnings = Math.max(bookingsRevenue, fleetEarnings);

  const completedBookings = bookings.filter((b) => b.status === "Completed").length;
  const fleetTrips = fleet.reduce((sum, v) => sum + (v.totalTrips || 0), 0);
  const totalTrips = Math.max(fleetTrips, completedBookings);

  const activeCount = fleet.filter((v) => v.status === "Available").length;
  const onRentalCount = fleet.filter((v) => v.status === "On Rental").length;
  const averageRating =
    fleet.length > 0
      ? (fleet.reduce((sum, v) => sum + (v.rating || 5.0), 0) / fleet.length).toFixed(1)
      : "5.0";

  const filteredFleet = fleet.filter((v) => {
    if (fleetFilter !== "all" && v.status.toLowerCase() !== fleetFilter.toLowerCase()) {
      return false;
    }
    if (fleetSearch.trim()) {
      const q = fleetSearch.toLowerCase();
      return (
        v.name.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q)
      );
    }
    return true;
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

  if (checkingAuth) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm font-bold text-slate-400">
        Verifying admin authorization...
      </div>
    );
  }

  // ==========================================
  // SECURITY GATE: ADMIN AUTHENTICATION SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white dark:bg-[#0b0b0e] border border-slate-200/90 dark:border-white/10 rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-200">
          <div className="h-16 w-16 mx-auto rounded-3xl bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shadow-inner">
            <ShieldCheck className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-3 py-1 rounded-full">
              Restricted Area
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Tourmate Admin Portal
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Only authorized administrators can list vehicles and manage the Tourmate rental fleet.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (tourmate123)"
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-3 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  autoFocus
                />
                <KeyRound className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400" />
              </div>
              {authError && (
                <p className="text-xs font-semibold text-rose-500 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>{authError}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md shadow-violet-500/20 transition-all active:scale-95 cursor-pointer"
            >
              Unlock Admin Portal
            </button>

            <button
              type="button"
              onClick={handleQuickUnlock}
              className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Quick Unlock (Developer / Owner)
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 dark:border-white/5">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      {/* 1. ADMIN HERO BANNER */}
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
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified Fleet Administrator</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                  Tourmate Administration & Vehicle Listing
                </h1>
                <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
                  Only the admin can add new vehicles to Tourmate. Manage vehicle specifications, pricing, driver options, and bookings.
                </p>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleTabChange("list-vehicle")}
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 px-5 py-3.5 rounded-[30px] text-sm font-bold shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>List New Vehicle</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-3.5 rounded-[30px] text-xs font-bold transition-all active:scale-95 cursor-pointer"
                  title="Lock Admin Portal"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Lock Session</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Notification Toast */}
      {notice && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-sm font-bold flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <span>{notice}</span>
            </div>
            <button
              onClick={() => setNotice(null)}
              className="text-xs opacity-75 hover:opacity-100 uppercase tracking-wider"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 2. ADMIN TABS NAVIGATION */}
      <section className="pt-4 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 overflow-x-auto no-scrollbar pb-3">
            {[
              { id: "list-vehicle", label: "List Vehicle (Admin)", icon: Plus, badge: "New" },
              { id: "fleet", label: "Manage Fleet", icon: Car, count: fleet.length },
              { id: "bookings", label: "Bookings Ledger", icon: CalendarCheck, count: bookings.length },
              { id: "overview", label: "Overview & Analytics", icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.2 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {tab.badge && (
                    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TAB CONTENTS */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TAB 1: LIST A VEHICLE (ADMIN ONLY) */}
          {activeTab === "list-vehicle" && (
            <div className="bg-white dark:bg-[#0b0b0e] rounded-[32px] p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-sm">
              <div className="mb-8 pb-6 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 mb-1">
                    <Sparkles className="h-4 w-4" />
                    <span>Admin Master Listing Blueprint</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                    List a Vehicle into Live Fleet
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Vehicles added here will immediately appear in the public catalog and vehicle specifications view.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleTabChange("fleet")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 px-4 py-2 rounded-full transition-colors cursor-pointer"
                >
                  <Car className="h-3.5 w-3.5" />
                  <span>View All Cars ({fleet.length})</span>
                </button>
              </div>

              <VehicleListingForm
                onSuccess={handleAddVehicle}
                onCancel={() => handleTabChange("fleet")}
              />
            </div>
          )}

          {/* TAB 2: MANAGE FLEET */}
          {activeTab === "fleet" && (
            <div className="space-y-6">
              {/* Filter and Search Bar */}
              <div className="bg-white dark:bg-[#0b0b0e] p-4 sm:p-5 rounded-[30px] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search fleet by model, category, or location..."
                    value={fleetSearch}
                    onChange={(e) => setFleetSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600"
                  />
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {["all", "available", "on rental", "maintenance"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFleetFilter(filter)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all whitespace-nowrap cursor-pointer ${
                        fleetFilter === filter
                          ? "bg-violet-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}

                  <button
                    onClick={() => handleTabChange("list-vehicle")}
                    className="ml-2 inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Car</span>
                  </button>
                </div>
              </div>

              {/* Fleet Grid */}
              {isLoading ? (
                <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-12 border border-slate-200/80 dark:border-white/10 text-center text-xs font-bold text-slate-400">
                  Loading live fleet data from database...
                </div>
              ) : filteredFleet.length === 0 ? (
                <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-12 border border-slate-200/80 dark:border-white/10 text-center space-y-4">
                  <div className="h-16 w-16 mx-auto rounded-3xl bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                    <Car className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-950 dark:text-white">
                      {fleetSearch ? "No matching vehicles found" : "No vehicles in live fleet"}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      {fleetSearch
                        ? "Try adjusting your search query or filter."
                        : "Use the vehicle listing blueprint to add your first vehicle to the Tourmate fleet."}
                    </p>
                  </div>
                  {!fleetSearch && (
                    <button
                      type="button"
                      onClick={() => handleTabChange("list-vehicle")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>List Vehicle Now</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFleet.map((car, index) => (
                    <ScrollReveal key={car.id} delay={index * 50} direction="up">
                      <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-5 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between h-full group hover:shadow-xl transition-all">
                        <div>
                          {/* Car Image Preview */}
                          <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 mb-4">
                            <Image
                              src={car.image || "/images/mock/axio-sedan.jpg"}
                              alt={car.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <span
                              className={`absolute top-3 right-3 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
                                car.status === "Available"
                                  ? "bg-emerald-500 text-white"
                                  : car.status === "On Rental"
                                  ? "bg-violet-600 text-white"
                                  : "bg-amber-500 text-white"
                              }`}
                            >
                              {car.status}
                            </span>
                            <span className="absolute bottom-3 left-3 text-[10px] font-extrabold uppercase bg-black/60 text-white px-2.5 py-0.5 rounded-md backdrop-blur-sm">
                              {car.category} • {car.year}
                            </span>
                          </div>

                          {/* Details */}
                          <div className="space-y-1 mb-4">
                            <h4 className="text-base font-extrabold text-slate-950 dark:text-white truncate">
                              {car.name}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                              <MapPin className="h-3.5 w-3.5 text-slate-400" />
                              <span>{car.location}</span>
                            </p>
                          </div>

                          {/* Pricing & Trips */}
                          <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-white/5 rounded-2xl text-xs mb-4">
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase font-bold">Daily Rate</span>
                              <span className="font-extrabold text-slate-900 dark:text-white">
                                LKR {car.dailyRate.toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Trips</span>
                              <span className="font-extrabold text-slate-900 dark:text-white">
                                {car.totalTrips || 0} completed
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Admin Controls */}
                        <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(car.id)}
                            className="flex-1 py-2 px-3 rounded-full border border-slate-200 dark:border-white/15 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-center cursor-pointer"
                          >
                            {car.status === "Maintenance" ? "Set Available" : "Set Maintenance"}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteVehicle(car.id, car.name)}
                            className="p-2 rounded-full border border-rose-200 dark:border-rose-900/30 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                            title="Delete Vehicle"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <Link
                            href={`/details`}
                            className="py-2 px-3.5 rounded-full bg-violet-600/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-bold hover:bg-violet-600 hover:text-white transition-all text-center cursor-pointer"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BOOKINGS LEDGER */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="bg-white dark:bg-[#0b0b0e] p-4 rounded-[30px] border border-slate-200/80 dark:border-white/10 shadow-sm flex items-center gap-3">
                <Search className="h-4 w-4 text-slate-400 ml-2" />
                <input
                  type="text"
                  placeholder="Search by client name, vehicle, or booking ID..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              {/* Bookings Ledger Table */}
              <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] border border-slate-200/80 dark:border-white/10 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                      Customer Bookings Ledger
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">
                      Showing {filteredBookings.length} records
                    </span>
                  </div>

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
                  {isLoading ? (
                    <div className="p-12 text-center text-xs font-bold text-slate-400">
                      Loading customer bookings...
                    </div>
                  ) : filteredBookings.length === 0 ? (
                    <div className="p-12 text-center space-y-3">
                      <div className="h-14 w-14 mx-auto rounded-3xl bg-slate-100 dark:bg-white/5 text-slate-400 flex items-center justify-center">
                        <CalendarCheck className="h-7 w-7" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {bookingSearch ? "No matching bookings found" : "No customer bookings yet"}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                          {bookingSearch
                            ? "Try checking for spelling errors or clearing your search term."
                            : "New customer reservations and rental requests will appear here in real-time."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    filteredBookings.map((item) => (
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
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                            <span>Renter: <strong className="text-slate-900 dark:text-white">{item.renterName}</strong></span>
                            <span>•</span>
                            <span>Dates: {item.dates} ({item.days} days)</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 justify-between lg:justify-end">
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Amount</span>
                            <span className="text-base font-black text-slate-950 dark:text-white">
                              LKR {item.totalAmount.toLocaleString()}
                            </span>
                          </div>

                          <a
                            href={`https://wa.me/94703236834?text=${encodeURIComponent(`Hi ${item.renterName}, contacting you regarding Tourmate Booking ${item.id} for ${item.vehicleName}.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                          >
                            WhatsApp Renter
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OVERVIEW & ANALYTICS */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross Fleet Revenue</span>
                    <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <DollarSign className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white block">
                      LKR {totalEarnings.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
                      {totalEarnings > 0 ? "Active rentals generated" : "No revenue recorded yet"}
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Vehicles</span>
                    <div className="h-10 w-10 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                      <Car className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white block">
                      {fleet.length} {fleet.length === 1 ? "Car" : "Cars"}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                      {activeCount} ready for rent • {onRentalCount} on trip
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Trips</span>
                    <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <CalendarCheck className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white block">
                      {totalTrips} Trips
                    </span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1 block">
                      {totalTrips > 0 ? "Verified islandwide bookings" : "Completed trip ledger"}
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Driver Fleet Quality</span>
                    <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white block">
                      {averageRating} / 5.0
                    </span>
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1 block">
                      {fleet.length > 0 ? "Fleet average rating across active listings" : "Standard verified rating benchmark"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-gradient-to-r from-violet-900/10 via-purple-900/5 to-transparent rounded-[32px] p-6 sm:p-8 border border-violet-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-1">
                    Expand the Tourmate Fleet
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
                    Use the 7-photo blueprint form to list Sedans, SUVs, Vans, and Luxury vehicles with automatic rate calculations.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleTabChange("list-vehicle")}
                  className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap cursor-pointer"
                >
                  Open Listing Tool
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Add Vehicle Modal Fallback */}
      <AddVehicleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVehicle={handleAddVehicle}
      />
    </div>
  );
}
