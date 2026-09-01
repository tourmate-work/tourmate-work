import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VehiclesCatalog } from "@/components/vehicles/vehicles-catalog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Fleet & Groups | Tourmate Rentals Sri Lanka",
  description:
    "Choose from our wide selection of rental cars across Sri Lanka. Sedans, SUVs, luxury cars, convertibles, and minivans at unbeatable rates.",
};

export default function VehiclesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <Header />
      <main className="flex-1 py-4">
        <VehiclesCatalog />
      </main>
      <Footer />
    </div>
  );
}
