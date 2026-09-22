import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AboutContent } from "@/components/about/about-content";
import { SITE_URL, SITE_NAME, buildCanonical, buildOpenGraphMetadata } from "@/lib/seo-config";
import { SITE_CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Tourmate Rentals Sri Lanka",
  description:
    "Learn more about Tourmate Rentals. Decades of experience delivering reliable, luxurious, and affordable car hire services across Sri Lanka.",
  alternates: {
    canonical: buildCanonical("/about"),
  },
  ...buildOpenGraphMetadata({
    title: "About Us | Tourmate Rentals Sri Lanka",
    description:
      "Learn more about Tourmate Rentals. Decades of experience delivering reliable, luxurious, and affordable car hire services across Sri Lanka.",
    path: "/about",
  }),
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about#aboutpage`,
        url: `${SITE_URL}/about`,
        name: "About Tourmate Rentals Sri Lanka",
        description:
          "Tourmate Rentals provides premier self-drive and chauffeur-driven car hire services across Sri Lanka.",
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
            name: "About Us",
            item: `${SITE_URL}/about`,
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
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
