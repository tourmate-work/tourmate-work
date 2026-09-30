"use client";

import { useState, useEffect } from "react";
import {
  X,
  Sliders,
  Fuel,
  Users,
  DoorOpen,
  Gauge,
  Snowflake,
  DollarSign,
  MapPin,
  Car,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { SellerVehicle } from "@/components/seller/add-vehicle-modal";

interface EditVehicleModalProps {
  isOpen: boolean;
  vehicle: SellerVehicle | null;
  onClose: () => void;
  onSuccess: (updatedVehicle: SellerVehicle) => void;
}

const CATEGORY_OPTIONS = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Van",
  "Luxury",
  "Convertible",
  "Electric",
  "Pickup",
];

const TRANSMISSION_OPTIONS: Array<SellerVehicle["transmission"]> = [
  "Automatic",
  "Manual",
  "Tiptronic",
];

const FUEL_OPTIONS: Array<SellerVehicle["fuel"]> = [
  "Petrol",
  "Diesel",
  "Hybrid",
  "Electric",
];

const MILEAGE_PRESETS = [
  "Unlimited",
  "100 km/day included (LKR 55/km excess)",
  "150 km/day included (LKR 65/km excess)",
  "200 km/day included (LKR 75/km excess)",
  "250 km/day included (LKR 85/km excess)",
];

const AVAILABLE_FEATURES = [
  "Air Conditioner",
  "Reverse Camera",
  "Bluetooth Audio",
  "Apple CarPlay / Android Auto",
  "GPS Navigation",
  "24/7 Roadside Assist",
  "Push Start",
  "Leather Seats",
  "Sunroof / Moonroof",
  "USB Fast Charging",
];

export function EditVehicleModal({
  isOpen,
  vehicle,
  onClose,
  onSuccess,
}: EditVehicleModalProps) {
  const [name, setName] = useState("");
  const [vehicleCode, setVehicleCode] = useState("");
  const [category, setCategory] = useState("Sedan");
  const [year, setYear] = useState(2023);
  const [status, setStatus] = useState<SellerVehicle["status"]>("Available");
  const [dailyRate, setDailyRate] = useState(15000);
  const [securityDeposit, setSecurityDeposit] = useState(25000);
  const [location, setLocation] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [fuelPolicy, setFuelPolicy] = useState("Full-to-Full (Recommended)");

  // Technical Specs
  const [transmission, setTransmission] = useState<SellerVehicle["transmission"]>("Automatic");
  const [fuel, setFuel] = useState<SellerVehicle["fuel"]>("Petrol");
  const [seats, setSeats] = useState(5);
  const [doors, setDoors] = useState(4);
  const [mileageAllowance, setMileageAllowance] = useState("Unlimited");
  const [customMileage, setCustomMileage] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync state whenever vehicle prop changes
  useEffect(() => {
    if (vehicle) {
      setName(vehicle.name || "");
      setVehicleCode(vehicle.vehicleCode || "");
      setCategory(vehicle.category || "Sedan");
      setYear(vehicle.year || new Date().getFullYear());
      setStatus(vehicle.status || "Available");
      setDailyRate(vehicle.dailyRate || 15000);
      setSecurityDeposit(vehicle.securityDeposit || 25000);
      setLocation(vehicle.location || "");
      setLicensePlate(vehicle.licensePlate || "");
      setFuelPolicy(vehicle.fuelPolicy || "Full-to-Full (Recommended)");

      setTransmission(vehicle.transmission || "Automatic");
      setFuel(vehicle.fuel || "Petrol");
      setSeats(vehicle.seats || 5);
      setDoors(vehicle.doors || 4);

      const mAllowance = vehicle.mileageAllowance || "Unlimited";
      setMileageAllowance(mAllowance);
      if (!MILEAGE_PRESETS.includes(mAllowance)) {
        setCustomMileage(mAllowance);
      } else {
        setCustomMileage("");
      }

      setSelectedFeatures(Array.isArray(vehicle.features) ? vehicle.features : []);
      setImageUrl(vehicle.image || "");
      setErrorMsg(null);
    }
  }, [vehicle]);

  if (!isOpen || !vehicle) return null;

  const handleToggleFeature = (feat: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Vehicle name is required.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const finalMileage =
      mileageAllowance === "custom"
        ? customMileage.trim() || "Unlimited"
        : mileageAllowance;

    try {
      const payload = {
        name: name.trim(),
        vehicleCode: vehicleCode.trim() || null,
        category,
        year: Number(year),
        status,
        isAvailable: status === "Available",
        pricePerDay: Number(dailyRate),
        depositAmount: Number(securityDeposit),
        location: location.trim(),
        licensePlate: licensePlate.trim() || null,
        fuelPolicy,
        transmission,
        fuelType: fuel,
        seats: Number(seats),
        doors: Number(doors),
        mileageAllowance: finalMileage,
        mileageLimit: finalMileage,
        features: selectedFeatures,
        imageUrl: imageUrl.trim() || vehicle.image,
      };

      const res = await fetch(`/api/vehicles/${vehicle.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update vehicle details.");
      }

      const updatedVehicle: SellerVehicle = {
        ...vehicle,
        name: name.trim(),
        vehicleCode: vehicleCode.trim() || undefined,
        category,
        year: Number(year),
        status,
        dailyRate: Number(dailyRate),
        securityDeposit: Number(securityDeposit),
        location: location.trim(),
        licensePlate: licensePlate.trim() || undefined,
        fuelPolicy,
        transmission,
        fuel,
        seats: Number(seats),
        doors: Number(doors),
        mileageAllowance: finalMileage,
        features: selectedFeatures,
        image: imageUrl.trim() || vehicle.image,
        type:
          category.toLowerCase() === "suv" || category.toLowerCase() === "van"
            ? (category.toLowerCase() as "suv" | "van")
            : "sedan",
      };

      onSuccess(updatedVehicle);
      onClose();
    } catch (err: unknown) {
      console.error("Vehicle update error:", err);
      setErrorMsg(err instanceof Error ? err.message : "Failed to update vehicle.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasAc = selectedFeatures.some(
    (f) => /air\s*condition/i.test(f) || /\bac\b/i.test(f)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0b0b0e] border border-slate-200 dark:border-white/10 rounded-[32px] shadow-2xl p-6 sm:p-8 overflow-hidden z-10 animate-in fade-in-0 zoom-in-95 duration-200 my-8 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-white/10 mb-6">
          <div>
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
              Admin Fleet Management
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              Edit Technical Details & Specs
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-3 text-sm text-rose-600 dark:text-rose-400">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* SECTION 1: IDENTITY & GENERAL INFO */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
              <Car className="h-4 w-4 text-emerald-500" />
              General Identification
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Vehicle Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Honda Shuttle 2014"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Vehicle Code / ID
                </label>
                <input
                  type="text"
                  value={vehicleCode}
                  onChange={(e) => setVehicleCode(e.target.value.toUpperCase())}
                  placeholder="e.g. TM 01"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat} className="bg-white dark:bg-[#15151a]">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Manufacturing Year
                </label>
                <input
                  type="number"
                  min="1990"
                  max="2030"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Fleet Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as SellerVehicle["status"])}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Available" className="bg-white dark:bg-[#15151a]">
                    Available
                  </option>
                  <option value="On Rental" className="bg-white dark:bg-[#15151a]">
                    On Rental
                  </option>
                  <option value="Maintenance" className="bg-white dark:bg-[#15151a]">
                    Maintenance
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: TECHNICAL SPECIFICATIONS */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-500/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              Technical Specifications (Displayed on User Details View)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Transmission */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Sliders className="h-3.5 w-3.5 text-emerald-600" />
                  Gear Box / Transmission *
                </label>
                <div className="grid grid-cols-3 gap-1 bg-slate-200/50 dark:bg-white/5 p-1 rounded-xl">
                  {TRANSMISSION_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setTransmission(opt)}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all text-center ${
                        transmission === opt
                          ? "bg-white dark:bg-emerald-600 text-emerald-600 dark:text-white shadow-sm"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                      }`}
                    >
                      {opt === "Automatic" ? "Auto" : opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Fuel className="h-3.5 w-3.5 text-emerald-600" />
                  Fuel Type *
                </label>
                <select
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value as SellerVehicle["fuel"])}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#15151a] text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {FUEL_OPTIONS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seats */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-emerald-600" />
                  Seats *
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSeats((s) => Math.max(2, s - 1))}
                    className="h-9 w-9 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center font-bold text-slate-700 dark:text-white hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-black text-sm text-slate-900 dark:text-white">
                    {seats} Seats
                  </span>
                  <button
                    type="button"
                    onClick={() => setSeats((s) => Math.min(15, s + 1))}
                    className="h-9 w-9 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center font-bold text-slate-700 dark:text-white hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Doors */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <DoorOpen className="h-3.5 w-3.5 text-emerald-600" />
                  Doors *
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDoors((d) => Math.max(2, d - 1))}
                    className="h-9 w-9 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center font-bold text-slate-700 dark:text-white hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-black text-sm text-slate-900 dark:text-white">
                    {doors} Doors
                  </span>
                  <button
                    type="button"
                    onClick={() => setDoors((d) => Math.min(6, d + 1))}
                    className="h-9 w-9 rounded-lg bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center font-bold text-slate-700 dark:text-white hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Distance / Mileage Limit */}
            <div className="mt-4 pt-4 border-t border-emerald-500/20">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                <Gauge className="h-3.5 w-3.5 text-emerald-600" />
                Distance / Mileage Limit (Displayed under &quot;Distance&quot;) *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                {MILEAGE_PRESETS.map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => {
                      setMileageAllowance(preset);
                      setCustomMileage("");
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                      mileageAllowance === preset
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-white dark:bg-[#15151a] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-emerald-500"
                    }`}
                  >
                    <span>{preset}</span>
                    {mileageAllowance === preset && <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setMileageAllowance("custom")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                    mileageAllowance === "custom" || !MILEAGE_PRESETS.includes(mileageAllowance)
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-white dark:bg-[#15151a] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-emerald-500"
                  }`}
                >
                  <span>Custom Mileage Allowance...</span>
                  {(mileageAllowance === "custom" || !MILEAGE_PRESETS.includes(mileageAllowance)) && (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  )}
                </button>
              </div>

              {(mileageAllowance === "custom" || !MILEAGE_PRESETS.includes(mileageAllowance)) && (
                <input
                  type="text"
                  value={customMileage || (mileageAllowance !== "custom" ? mileageAllowance : "")}
                  onChange={(e) => {
                    setCustomMileage(e.target.value);
                    setMileageAllowance("custom");
                  }}
                  placeholder="e.g. 100 km/day included (LKR 55/km excess) or 300 km/day"
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-500 bg-white dark:bg-[#15151a] text-slate-900 dark:text-white text-xs font-semibold focus:outline-none ring-2 ring-emerald-500/20"
                />
              )}
            </div>
          </div>

          {/* SECTION 3: AIR CONDITIONER & FEATURES */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <Snowflake className="h-4 w-4 text-emerald-500" />
                Air Conditioning & Vehicle Equipment
              </h3>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                Air Conditioner:{" "}
                <span
                  className={
                    hasAc
                      ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
                      : "text-rose-500 font-extrabold"
                  }
                >
                  {hasAc ? "YES" : "NO"}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {AVAILABLE_FEATURES.map((feat) => {
                const active = selectedFeatures.includes(feat);
                const isAc = feat === "Air Conditioner";
                return (
                  <button
                    type="button"
                    key={feat}
                    onClick={() => handleToggleFeature(feat)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col justify-between gap-2 text-left cursor-pointer ${
                      active
                        ? isAc
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/30"
                          : "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/40"
                        : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {isAc ? <Snowflake className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                      <span className="text-[10px] uppercase font-black">
                        {active ? "On" : "Off"}
                      </span>
                    </div>
                    <span className="leading-snug">{feat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: RATES & LOCATION */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-500" />
              Pricing & Location
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Daily Rental Rate (LKR) *
                </label>
                <input
                  type="number"
                  min="1000"
                  step="500"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Security Deposit (LKR)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  License Plate
                </label>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                  placeholder="e.g. WP CBH-4820"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                  Primary Location / Delivery Area *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Wennappuwa / Waikkal / Marawila (wennapuwa)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Fuel Policy
                </label>
                <select
                  value={fuelPolicy}
                  onChange={(e) => setFuelPolicy(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Full-to-Full (Recommended)">Full-to-Full (Recommended)</option>
                  <option value="Same to Same">Same to Same</option>
                  <option value="Free Tank Included">Free Tank Included</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 5: VEHICLE COVER IMAGE */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-2">
              Cover Image URL
            </h3>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-full border border-slate-200 dark:border-white/15 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-extrabold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <span>Save Changes & Sync</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
