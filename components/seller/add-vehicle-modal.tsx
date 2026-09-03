"use client";

import { X } from "lucide-react";
import { VehicleListingForm } from "./vehicle-listing-form";

export interface SellerVehicle {
  id: string;
  name: string;
  category: string;
  year: number;
  dailyRate: number;
  currency: string;
  transmission: "Automatic" | "Manual" | "Tiptronic";
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
  registrationDate?: string;
  phoneNumber?: string;
  messageCategory?: string;
  licensePlate?: string;
  fuelPolicy?: string;
  mileageAllowance?: string;
  securityDeposit?: number;
  exteriorPhotos?: string[];
  interiorPhotos?: string[];
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#0b0b0e] border border-slate-200 dark:border-white/10 rounded-[32px] shadow-2xl p-6 sm:p-8 overflow-hidden z-10 animate-in fade-in-0 zoom-in-95 duration-200 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 z-20 h-10 w-10 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-600 dark:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Render the full comprehensive form */}
        <VehicleListingForm
          isModal={true}
          onSuccess={(vehicle) => {
            onAddVehicle(vehicle);
            setTimeout(() => {
              onClose();
            }, 700);
          }}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
