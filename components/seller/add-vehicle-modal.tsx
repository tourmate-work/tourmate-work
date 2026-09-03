"use client";

import { useState } from "react";
import { X, Car, DollarSign, MapPin, CheckCircle, ShieldCheck, Sparkles } from "lucide-react";

export interface SellerVehicle {
  id: string;
  name: string;
  category: string;
  year: number;
  dailyRate: number;
  currency: string;
  transmission: "Automatic" | "Manual";
  fuel: "Hybrid" | "Petrol" | "Diesel" | "Electric";
  seats: number;
  doors: number;
  location: string;
  status: "Available" | "On Rental" | "Maintenance";
  totalTrips: number;
  totalEarnings: number;
  rating: number;
  type: "sedan" | "sport" | "suv" | "van";
  features: string[];
}

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (vehicle: SellerVehicle) => void;
}

export function AddVehicleModal({
  isOpen,
  onClose,
  onAddVehicle,
}: AddVehicleModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Sedan");
  const [year, setYear] = useState(2024);
  const [dailyRate, setDailyRate] = useState(16500);
  const [transmission, setTransmission] = useState<"Automatic" | "Manual">("Automatic");
  const [fuel, setFuel] = useState<"Hybrid" | "Petrol" | "Diesel" | "Electric">("Hybrid");
  const [seats, setSeats] = useState(5);
  const [doors, setDoors] = useState(4);
  const [location, setLocation] = useState("Wennapuwa / Airport (CMB)");
  const [vehicleType, setVehicleType] = useState<"sedan" | "sport" | "suv" | "van">("sedan");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "Air Conditioner",
    "Bluetooth Audio",
    "Reverse Camera",
  ]);

  if (!isOpen) return null;

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newVehicle: SellerVehicle = {
      id: `sv-${Date.now()}`,
      name: name.trim(),
      category,
      year: Number(year) || 2024,
      dailyRate: Number(dailyRate) || 15000,
      currency: "LKR",
      transmission,
      fuel,
      seats: Number(seats) || 5,
      doors: Number(doors) || 4,
      location,
      status: "Available",
      totalTrips: 0,
      totalEarnings: 0,
      rating: 5.0,
      type: vehicleType,
      features: selectedFeatures,
    };

    onAddVehicle(newVehicle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0b0b0e] border border-slate-200 dark:border-white/10 rounded-[30px] shadow-2xl p-6 sm:p-8 overflow-hidden z-10 animate-in fade-in-0 zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-violet-600/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Car className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                List a New Vehicle
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Add your car to the Tourmate rental marketplace
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5 max-h-[70vh] overflow-y-auto pr-1">
          {/* Make & Model */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Vehicle Name & Model *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Toyota Axio WXB, Honda Vezel RS, Benz C200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Grid: Category & Year & Silhouette Style */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value === "SUV") setVehicleType("suv");
                  else if (e.target.value === "Van") setVehicleType("van");
                  else if (e.target.value === "Cabriolet") setVehicleType("sport");
                  else setVehicleType("sedan");
                }}
                className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
                <option value="Van">Van / MPV</option>
                <option value="Cabriolet">Cabriolet</option>
                <option value="Pickup">Pickup 4x4</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Model Year
              </label>
              <input
                type="number"
                min="2012"
                max="2026"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Daily Rate (LKR) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="5000"
                  step="500"
                  required
                  value={dailyRate}
                  onChange={(e) => setDailyRate(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 pl-8 text-sm text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Grid: Transmission & Fuel & Seats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Transmission
              </label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value as "Automatic" | "Manual")}
                className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Fuel Type
              </label>
              <select
                value={fuel}
                onChange={(e) => setFuel(e.target.value as SellerVehicle["fuel"])}
                className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Seats & Doors
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-3 py-3 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value={4}>4 Seats</option>
                  <option value={5}>5 Seats</option>
                  <option value={7}>7 Seats</option>
                  <option value={10}>10+ Seats</option>
                </select>
                <select
                  value={doors}
                  onChange={(e) => setDoors(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-3 py-3 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value={2}>2 Doors</option>
                  <option value={4}>4 Doors</option>
                  <option value={5}>5 Doors</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Pickup & Handover Location
            </label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Wennapuwa, Colombo Airport, Negombo"
                className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 pl-9 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Features Checkboxes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
              Key Features & Inclusions
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                "Air Conditioner",
                "GPS Navigation",
                "Bluetooth Audio",
                "Reverse Camera",
                "Leather Seats",
                "Child Safety Seat",
                "Comprehensive Insurance",
                "Unlimited Mileage",
                "24/7 Roadside Assist",
              ].map((feat) => {
                const checked = selectedFeatures.includes(feat);
                return (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => toggleFeature(feat)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                      checked
                        ? "bg-violet-50 dark:bg-violet-900/30 border-violet-400 dark:border-violet-500/50 text-violet-700 dark:text-violet-300"
                        : "bg-slate-50 dark:bg-[#15151a] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    <CheckCircle
                      className={`h-4 w-4 flex-shrink-0 ${
                        checked ? "text-violet-600 dark:text-violet-400 fill-violet-600/20" : "text-slate-300 dark:text-slate-600"
                      }`}
                    />
                    <span className="truncate">{feat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Host Assurance Note */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3.5 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              Every vehicle listed is covered under the Tourmate Host Protection Guarantee with zero listing fees. You earn 85% of each rental payout.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-[30px] border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-3 rounded-[30px] bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-lg shadow-violet-500/25 transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Publish Vehicle</span>
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
