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
              <div className="h-10 w-10 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  TOURMATE RENTALS – TERMS & CONDITIONS
                </h3>
                <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                  Last Updated: September 2026
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-3 rounded-2xl border border-slate-200/80 dark:border-white/10 font-medium">
              By using the TourMate Rentals website or requesting a rental through our platform, you agree to these Terms & Conditions.
            </p>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
              <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-1">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                  1. About TourMate Rentals
                </h4>
                <p>
                  TourMate Rentals is a <strong>vehicle rental platform</strong> that connects vehicle owners with customers looking to rent vehicles.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  TourMate Rentals does not own the vehicles. The vehicles are provided by their respective owners.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-1">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                  2. Booking Requests
                </h4>
                <p>
                  Submitting a booking request does not automatically guarantee a confirmed rental.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  A booking is confirmed only after TourMate Rentals confirms the booking and the required advance payment has been received.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-1">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                  3. Payments
                </h4>
                <p>
                  A minimum advance payment of <strong>LKR 20,000</strong> may be required to confirm a rental.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  The remaining rental amount and any security deposit will be communicated before the vehicle is handed over.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-1">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                  4. Vehicle Handover
                </h4>
                <p>
                  The vehicle owner and renter will meet at the agreed location for the handover.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Before the rental begins, the vehicle condition, fuel level and mileage may be recorded. The required rental agreement must be completed and signed before the vehicle is handed over.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-1">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                  5. Vehicle Return
                </h4>
                <p>
                  The renter must return the vehicle on the agreed date and time and in the agreed condition.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  The vehicle condition, fuel level and mileage may be checked upon return. Additional charges may apply for late returns, fuel differences or damage according to the agreed rental terms.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-1">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                  6. Renter Responsibility
                </h4>
                <p>
                  The renter must use the vehicle responsibly and follow all applicable laws and agreed rental conditions.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  The renter must provide accurate information and valid identification when requested.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-1">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                  7. Vehicle Owner Responsibility
                </h4>
                <p>
                  The vehicle owner must provide a properly maintained and legally usable vehicle.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  The owner is responsible for ensuring that the vehicle has the necessary documents, insurance and legal requirements for the rental.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-1">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                  8. Owner & Renter Agreement
                </h4>
                <p>
                  The final rental arrangement is between the <strong>vehicle owner and renter</strong>.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Both parties must review and sign the required rental agreement before the vehicle is handed over. TourMate Rentals acts as the platform connecting the parties and facilitating the rental process.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 space-y-1">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                  9. Cancellation & Refunds
                </h4>
                <p>
                  Cancellation and refund eligibility will depend on the cancellation and refund terms provided at the time of booking.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Any applicable refund will be processed according to TourMate Rentals&apos; cancellation and refund policy.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-violet-50/60 dark:bg-violet-950/20 border border-violet-200/60 dark:border-violet-900/30 space-y-1">
                <h4 className="font-extrabold text-violet-950 dark:text-violet-200 text-xs uppercase tracking-wide">
                  10. Acceptance
                </h4>
                <p className="text-violet-900 dark:text-violet-300 font-medium">
                  By using the TourMate Rentals website or submitting a booking request, you confirm that you have read, understood and agreed to these Terms & Conditions.
                </p>
              </div>
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
