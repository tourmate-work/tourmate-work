import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturePillars } from "@/components/home/feature-pillars";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { FleetSection } from "@/components/home/fleet-section";
import { SelfDriveVsDriverSection } from "@/components/home/self-drive-vs-driver-section";
import { StatsSection } from "@/components/home/stats-section";
import { VehicleOwnerSection } from "@/components/home/vehicle-owner-cta";
import { PopularSearches } from "@/components/home/popular-searches";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Header Navigation */}
      <Header />

      {/* Main Landing Content */}
      <main className="flex-1 space-y-4">
        {/* 1. Hero Section with Booking Widget */}
        <HeroSection />

        {/* 2. Three Feature Pillars (Availability, Comfort, Savings) */}
        <FeaturePillars />

        {/* 3. How It Works (3 Steps) */}
        <WhyChooseUs />

        {/* 4. Car Selection Grid (Choose the car that suits you) */}
        <FleetSection />

        {/* 5. Self-Drive vs Driver-Driven Choice */}
        <SelfDriveVsDriverSection />

        {/* 6. Facts In Numbers Stats */}
        <StatsSection />

        {/* 7. Vehicle Owner Section (Have a Vehicle You Want to Rent Out?) */}
        <VehicleOwnerSection />

        {/* 8. Top Rental Locations & Vehicle Categories Internal Links */}
        <PopularSearches />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
