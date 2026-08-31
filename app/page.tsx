import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturePillars } from "@/components/home/feature-pillars";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { FleetSection } from "@/components/home/fleet-section";
import { StatsSection } from "@/components/home/stats-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header Navigation */}
      <Header />

      {/* Main Landing Content */}
      <main className="flex-1 space-y-4">
        {/* 1. Hero Section with Booking Widget */}
        <HeroSection />

        {/* 2. Three Feature Pillars (Availability, Comfort, Savings) */}
        <FeaturePillars />

        {/* 3. Why Choose Us (Fleet Photo & 4 Step Highlights) */}
        <WhyChooseUs />

        {/* 4. Car Selection Grid (Choose the car that suits you) */}
        <FleetSection />

        {/* 5. Facts In Numbers Stats */}
        <StatsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
