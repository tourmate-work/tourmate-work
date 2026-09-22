import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactContent } from "@/components/contact/contact-content";
import { SITE_URL, SITE_NAME, buildCanonical, buildOpenGraphMetadata } from "@/lib/seo-config";
import { SITE_CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Tourmate Rentals Sri Lanka",
  description:
    "Get in touch with Tourmate Rentals for car hire bookings, airport transfers, and customer support across Sri Lanka. Available 24/7 via WhatsApp and phone.",
  alternates: {
    canonical: buildCanonical("/contact"),
  },
  ...buildOpenGraphMetadata({
    title: "Contact Us | Tourmate Rentals Sri Lanka",
    description:
      "Get in touch with Tourmate Rentals for car hire bookings, airport transfers, and customer support across Sri Lanka. Available 24/7 via WhatsApp and phone.",
    path: "/contact",
  }),
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contact#contactpage`,
        url: `${SITE_URL}/contact`,
        name: "Contact Tourmate Rentals Sri Lanka",
        description:
          "24/7 customer service and vehicle reservation center for Tourmate Rentals.",
        mainEntity: {
          "@type": "AutoRental",
          name: SITE_NAME,
          url: SITE_URL,
          telephone: SITE_CONTACT.phone,
          priceRange: "LKR 8,000 - 35,000 per day",
          areaServed: "Sri Lanka",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact Us",
            item: `${SITE_URL}/contact`,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <ContactContent />
      </main>
      <Footer />
    </div>
  );
}
