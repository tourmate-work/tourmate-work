import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FileText, ShieldCheck, CheckCircle2, Clock, MapPin, DollarSign, AlertCircle, Users, Handshake } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | TourMate Rentals Sri Lanka",
  description:
    "Review the official Terms & Conditions of TourMate Rentals Sri Lanka. Transparent guidelines covering bookings, payments, handovers, renter and owner responsibilities.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#070709] text-slate-900 dark:text-white font-sans selection:bg-violet-600 selection:text-white">
      <Header />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header Banner */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-black uppercase tracking-wider">
              <FileText className="h-4 w-4" />
              <span>Official Policy Agreement</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
              TOURMATE RENTALS – TERMS & CONDITIONS
            </h1>

            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
              <Clock className="h-4 w-4 text-violet-500" />
              <span>Last Updated: September 2026</span>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed pt-2">
              By using the TourMate Rentals website or requesting a rental through our platform, you agree to these Terms & Conditions.
            </p>
          </div>

          {/* Policy Sections Grid */}
          <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {/* 1. About TourMate Rentals */}
            <section className="bg-slate-50/80 dark:bg-[#0f0f13] border border-slate-200/80 dark:border-white/10 rounded-[28px] p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
                  <Handshake className="h-5 w-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                  1. About TourMate Rentals
                </h2>
              </div>
              <p>
                TourMate Rentals is a <strong>vehicle rental platform</strong> that connects vehicle owners with customers looking to rent vehicles.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                TourMate Rentals does not own the vehicles. The vehicles are provided by their respective owners.
              </p>
            </section>

            {/* 2. Booking Requests */}
            <section className="bg-slate-50/80 dark:bg-[#0f0f13] border border-slate-200/80 dark:border-white/10 rounded-[28px] p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                  2. Booking Requests
                </h2>
              </div>
              <p>
                Submitting a booking request does not automatically guarantee a confirmed rental.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                A booking is confirmed only after TourMate Rentals confirms the booking and the required advance payment has been received.
              </p>
            </section>

            {/* 3. Payments */}
            <section className="bg-slate-50/80 dark:bg-[#0f0f13] border border-slate-200/80 dark:border-white/10 rounded-[28px] p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-5 w-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                  3. Payments
                </h2>
              </div>
              <p>
                A minimum advance payment of <strong>LKR 20,000</strong> may be required to confirm a rental.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The remaining rental amount and any security deposit will be communicated before the vehicle is handed over.
              </p>
            </section>

            {/* 4. Vehicle Handover */}
            <section className="bg-slate-50/80 dark:bg-[#0f0f13] border border-slate-200/80 dark:border-white/10 rounded-[28px] p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                  4. Vehicle Handover
                </h2>
              </div>
              <p>
                The vehicle owner and renter will meet at the agreed location for the handover.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Before the rental begins, the vehicle condition, fuel level and mileage may be recorded. The required rental agreement must be completed and signed before the vehicle is handed over.
              </p>
            </section>

            {/* 5. Vehicle Return */}
            <section className="bg-slate-50/80 dark:bg-[#0f0f13] border border-slate-200/80 dark:border-white/10 rounded-[28px] p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                  5. Vehicle Return
                </h2>
              </div>
              <p>
                The renter must return the vehicle on the agreed date and time and in the agreed condition.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The vehicle condition, fuel level and mileage may be checked upon return. Additional charges may apply for late returns, fuel differences or damage according to the agreed rental terms.
              </p>
            </section>

            {/* 6. Renter Responsibility */}
            <section className="bg-slate-50/80 dark:bg-[#0f0f13] border border-slate-200/80 dark:border-white/10 rounded-[28px] p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                  6. Renter Responsibility
                </h2>
              </div>
              <p>
                The renter must use the vehicle responsibly and follow all applicable laws and agreed rental conditions.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The renter must provide accurate information and valid identification when requested.
              </p>
            </section>

            {/* 7. Vehicle Owner Responsibility */}
            <section className="bg-slate-50/80 dark:bg-[#0f0f13] border border-slate-200/80 dark:border-white/10 rounded-[28px] p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                  7. Vehicle Owner Responsibility
                </h2>
              </div>
              <p>
                The vehicle owner must provide a properly maintained and legally usable vehicle.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The owner is responsible for ensuring that the vehicle has the necessary documents, insurance and legal requirements for the rental.
              </p>
            </section>

            {/* 8. Owner & Renter Agreement */}
            <section className="bg-slate-50/80 dark:bg-[#0f0f13] border border-slate-200/80 dark:border-white/10 rounded-[28px] p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                  <Handshake className="h-5 w-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                  8. Owner & Renter Agreement
                </h2>
              </div>
              <p>
                The final rental arrangement is between the <strong>vehicle owner and renter</strong>.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Both parties must review and sign the required rental agreement before the vehicle is handed over. TourMate Rentals acts as the platform connecting the parties and facilitating the rental process.
              </p>
            </section>

            {/* 9. Cancellation & Refunds */}
            <section className="bg-slate-50/80 dark:bg-[#0f0f13] border border-slate-200/80 dark:border-white/10 rounded-[28px] p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                  9. Cancellation & Refunds
                </h2>
              </div>
              <p>
                Cancellation and refund eligibility will depend on the cancellation and refund terms provided at the time of booking.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Any applicable refund will be processed according to TourMate Rentals&apos; cancellation and refund policy.
              </p>
            </section>

            {/* 10. Acceptance */}
            <section className="bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-transparent border border-violet-500/30 rounded-[28px] p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-violet-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-black text-violet-950 dark:text-violet-200">
                  10. Acceptance
                </h2>
              </div>
              <p className="text-violet-950 dark:text-violet-300 font-medium">
                By using the TourMate Rentals website or submitting a booking request, you confirm that you have read, understood and agreed to these Terms & Conditions.
              </p>
            </section>
          </div>

          {/* Bottom Back Button */}
          <div className="pt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
