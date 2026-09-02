import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutContent } from "@/components/about/about-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Tourmate Rentals Sri Lanka",
  description:
    "Learn more about Tourmate Rentals. Over 25 years of experience delivering reliable, luxurious, and affordable car hire services across Sri Lanka.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <Header />
      <main className="flex-1">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
