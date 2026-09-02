import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DetailsView } from "@/components/details/details-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehicle Specifications & Details | Tourmate Rentals Sri Lanka",
  description:
    "Explore detailed vehicle specifications, features, equipment, and pricing for our premium rental fleet in Sri Lanka.",
};

export default function DetailsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <Header />
      <main className="flex-1">
        <DetailsView />
      </main>
      <Footer />
    </div>
  );
}
