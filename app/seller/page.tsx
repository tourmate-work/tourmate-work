import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SellerPortalContent } from "@/components/seller/seller-portal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seller & Host Portal | Tourmate Rentals Sri Lanka",
  description:
    "Host dashboard for vehicle owners and fleet operators. Manage your vehicle listings, review active client trips, track daily earnings, and accept new rental inquiries.",
};

export default function SellerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-black text-slate-900 dark:text-white font-sans selection:bg-violet-600 selection:text-white transition-colors duration-300">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm font-bold text-slate-400">Loading Seller Portal...</div>}>
          <SellerPortalContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
