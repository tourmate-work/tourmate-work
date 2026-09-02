import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactContent } from "@/components/contact/contact-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Tourmate Rentals Sri Lanka",
  description:
    "Get in touch with Tourmate Rentals for car hire bookings, airport transfers, and customer support across Sri Lanka.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <Header />
      <main className="flex-1">
        <ContactContent />
      </main>
      <Footer />
    </div>
  );
}
