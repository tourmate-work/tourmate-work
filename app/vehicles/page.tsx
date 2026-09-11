import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VehiclesCatalog } from "@/components/vehicles/vehicles-catalog";
import { LottieLoader } from "@/components/ui/lottie-loader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Fleet & Groups | Tourmate Rentals Sri Lanka",
  description:
    "Choose from our wide selection of rental cars across Sri Lanka. Sedans, SUVs, luxury cars, convertibles, and minivans at unbeatable rates.",
};

export default function VehiclesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-slate-900 dark:text-white font-sans selection:bg-violet-600 selection:text-white transition-colors duration-300">
      <Header />
      <main className="flex-1 py-4">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 py-12">
              <LottieLoader
                title="Loading TourMate Fleet..."
                subtitle="Fetching verified vehicles across Sri Lanka"
              />
            </div>
          }
        >
          <VehiclesCatalog />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
