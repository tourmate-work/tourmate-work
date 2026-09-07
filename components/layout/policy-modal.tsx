"use client";

import { X, FileText, Lock, AlertCircle } from "lucide-react";

export type PolicyType = "terms" | "privacy" | "cancellation" | null;

interface PolicyModalProps {
  policy: PolicyType;
  onClose: () => void;
}

export function PolicyModal({ policy, onClose }: PolicyModalProps) {
  if (!policy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f0f13] text-slate-900 dark:text-white rounded-[32px] border border-slate-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 h-9 w-9 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {policy === "terms" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  Terms & Conditions
                </h3>
                <p className="text-xs text-slate-400">TourMate Rentals Sri Lanka</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
              <p>
                <strong>1. Driver Eligibility:</strong> The primary renter and any designated drivers must be at least 21 years of age and hold a valid National Driving License or an International Driving Permit (IDP) recognized in Sri Lanka.
              </p>
              <p>
                <strong>2. Vehicle Handover & Return:</strong> Vehicles are handed over fully inspected, clean, and in roadworthy condition. Renter agrees to return the vehicle in the same condition with the agreed fuel level.
              </p>
              <p>
                <strong>3. Insurance & Protection:</strong> All TourMate rentals include comprehensive motor vehicle insurance coverage. In case of any incident, immediate notification to TourMate 24/7 hotline is mandatory.
              </p>
              <p>
                <strong>4. Permitted Usage:</strong> Vehicles are permitted for use on all standard paved and public motorable roads across Sri Lanka. Off-roading into non-motorable terrain or unauthorized racing is strictly prohibited.
              </p>
              <p>
                <strong>5. 24/7 Islandwide Assistance:</strong> TourMate provides complimentary 24/7 breakdown and emergency support throughout Sri Lanka, with replacement vehicle provision in case of mechanical issues.
              </p>
            </div>
          </div>
        )}

        {policy === "privacy" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  Privacy Policy
                </h3>
                <p className="text-xs text-slate-400">TourMate Rentals Sri Lanka</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
              <p>
                <strong>1. Information We Collect:</strong> We collect your full name, contact phone/WhatsApp number, email address, country of residence, and trip details to process your car rental inquiry and handover.
              </p>
              <p>
                <strong>2. How We Protect Your Data:</strong> Your data is stored securely and is only accessible by authorized TourMate operations staff for scheduling vehicle deliveries and verifying driver documentation.
              </p>
              <p>
                <strong>3. No Third-Party Sharing:</strong> We do not sell, rent, or trade your personal or booking data to any third-party advertisers or external marketing organizations.
              </p>
              <p>
                <strong>4. WhatsApp Communications:</strong> Booking confirmations, delivery schedules, and support notifications are conducted directly through our official WhatsApp concierge (+94 70 323 6834).
              </p>
            </div>
          </div>
        )}

        {policy === "cancellation" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  Cancellation Policy
                </h3>
                <p className="text-xs text-slate-400">TourMate Rentals Sri Lanka</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
              <p>
                <strong>1. 100% Free Cancellation:</strong> Cancel anytime up to 48 hours before your scheduled vehicle delivery time with zero cancellation fee or penalty.
              </p>
              <p>
                <strong>2. Flexible Rescheduling:</strong> Change your pickup dates, delivery location, or vehicle category anytime by messaging our WhatsApp concierge at no additional rescheduling charge (subject to fleet availability).
              </p>
              <p>
                <strong>3. Security Deposit Return:</strong> Security deposits collected at handover are fully refunded immediately upon safe return and inspection of the vehicle.
              </p>
              <p>
                <strong>4. Flight Delays & Early Returns:</strong> We track flight arrivals at Bandaranaike International Airport (CMB). Flight delays will not incur late handover penalties.
              </p>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-slate-100 dark:border-white/10 mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-6 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
