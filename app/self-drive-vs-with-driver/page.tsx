import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Car,
  UserCheck,
  Compass,
  FileText,
  MessageCircle,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE_CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Self Drive vs Car Rental With Driver Sri Lanka (2026 Guide) | Tourmate",
  description:
    "Planning a trip to Sri Lanka? Compare self-drive car rental vs chauffeur-driven car hire. Discover pricing, international driving permit (IDP) requirements, fuel costs, and freedom.",
  alternates: {
    canonical: "https://tourmate.lk/self-drive-vs-with-driver",
  },
  openGraph: {
    title: "Self Drive vs Car Rental With Driver Sri Lanka (2026 Guide)",
    description:
      "Comprehensive comparison between self-drive car rental and chauffeur-driven car hire in Sri Lanka. Costs, IDP permits, road conditions, and recommendations.",
    url: "https://tourmate.lk/self-drive-vs-with-driver",
    siteName: "Tourmate Rentals Sri Lanka",
    type: "article",
    locale: "en_LK",
    images: [
      {
        url: "https://tourmate.lk/images/hero-sri-lanka.jpg",
        width: 1200,
        height: 630,
        alt: "Self Drive vs Car Rental With Driver Sri Lanka - Tourmate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Self Drive vs Car Rental With Driver in Sri Lanka",
    description:
      "Compare costs, licensing, freedom, and safety between self-drive and chauffeur car rentals in Sri Lanka.",
  },
};

const COMPARISON_POINTS = [
  {
    criterion: "Total Privacy & Freedom",
    selfDrive: "100% private. Stop anywhere, blast your own music, and set spontaneous departure times.",
    withDriver: "A third party is always with you in the vehicle, though experienced drivers give you space.",
  },
  {
    criterion: "Navigating Sri Lankan Traffic",
    selfDrive: "Requires confident driving. Must adapt to left-hand traffic, roundabouts, tuk-tuks, and aggressive buses.",
    withDriver: "Zero stress. Sit back, relax, take photos, and let a seasoned local navigate chaotic junctions.",
  },
  {
    criterion: "Driver's License & Permits",
    selfDrive: "Tourists must obtain an International Driving Permit (IDP) and an AAC endorsement in Colombo.",
    withDriver: "Zero paperwork. You don't need any driver's license or permits.",
  },
  {
    criterion: "Cost & Budget",
    selfDrive: "More economical. You only pay daily car rental + fuel + expressway tolls. No driver food/lodging fees.",
    withDriver: "Higher daily cost. Includes driver daily allowance + driver meals and accommodation (if hotel doesn't provide it).",
  },
  {
    criterion: "Mountain & Hill Country Driving",
    selfDrive: "Winding roads and steep climbs require engine braking and mountain handling skill.",
    withDriver: "Drivers are experts on Nuwara Eliya, Ella, and Knuckles mountain roads in rain or fog.",
  },
  {
    criterion: "Parking & Vehicle Security",
    selfDrive: "You must find parking spots in crowded towns like Kandy and Galle Fort.",
    withDriver: "Driver drops you right at attraction entrances and takes care of parking and vehicle watch.",
  },
];

const FAQS = [
  {
    q: "Is it difficult for foreigners to self-drive in Sri Lanka?",
    a: "Driving in Sri Lanka is on the left-hand side. While highway expressways (Colombo, Galle, Airport) are modern and very easy to navigate, rural and central town roads feature mixed traffic (tuk-tuks, motorbikes, pedestrians, and public buses). Confident drivers with international experience usually adapt within the first day.",
  },
  {
    q: "How do I get the temporary driving endorsement for Sri Lanka?",
    a: "You need your home country driving license and an International Driving Permit (IDP - 1949 or 1968 convention). With these, you obtain a temporary endorsement from the Automobile Association of Ceylon (AAC) in Colombo. Tourmate can assist international travelers with advance paperwork so you can pick up your car without delays.",
  },
  {
    q: "Does Tourmate provide both self-drive and with-driver options?",
    a: "Yes! All vehicles in our fleet can be rented on a self-drive basis with comprehensive insurance. If you prefer a chauffeur-driven experience, we can assign a licensed, professional English-speaking driver to any car or van.",
  },
  {
    q: "What is typically expected for driver accommodation and meals?",
    a: "Most tourist hotels and resorts in Sri Lanka provide complimentary or subsidized driver quarters. If your accommodation does not offer driver lodging, a modest daily allowance (approx. LKR 2,500 – 3,500/day) covers the driver's bed and meals.",
  },
];

export default function SelfDriveVsWithDriverPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Self-Drive vs Chauffeur-Driven Car Rental in Sri Lanka",
    description:
      "A complete guide comparing self-drive car hire and chauffeur-driven car rental in Sri Lanka, covering costs, licensing, roads, and traveler recommendations.",
    url: "https://tourmate.lk/self-drive-vs-with-driver",
    publisher: {
      "@type": "Organization",
      name: "Tourmate Rentals Sri Lanka",
      url: "https://tourmate.lk",
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-black text-slate-900 dark:text-white selection:bg-slate-900 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Header />

      <main className="flex-1 pb-20">
        {/* Breadcrumb */}
        <div className="bg-white dark:bg-[#0c0c10] border-b border-slate-200/80 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 space-x-2">
              <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-slate-900 dark:text-white font-bold">
                Self-Drive vs Chauffeur Guide
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-12 pb-14 bg-gradient-to-b from-white via-slate-50 to-slate-100/60 dark:from-[#0c0c10] dark:via-black dark:to-black border-b border-slate-200/60 dark:border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-4">
              <Compass className="h-3.5 w-3.5 text-emerald-600" />
              <span>Sri Lanka Travel Planning Guide</span>
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight mb-4">
              Self-Drive vs Car Rental With Driver in Sri Lanka
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
              Deciding how to explore Sri Lanka? Compare freedom, costs, International Driving Permits (IDP), local traffic conditions, and mountain roads to pick the right option for your trip.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/vehicles"
                className="px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-emerald-700 dark:bg-white dark:text-slate-950 dark:hover:bg-emerald-400 dark:hover:text-white text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                Browse Self-Drive Fleet
              </Link>
              <a
                href={`https://wa.me/${SITE_CONTACT.whatsappNumber}?text=Hi%20Tourmate,%20I'd%20like%20a%20quote%20for%20a%20car%20rental%20with%20driver.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Inquire for Driver Options</span>
              </a>
            </div>
          </div>
        </section>

        {/* Quick Decision Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Self-Drive */}
            <div className="bg-white dark:bg-[#121218] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Car className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
                    Choose Self-Drive If You:
                  </h2>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    Ultimate Freedom & Value
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Value 100% privacy with your partner, family, or travel friends.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Want to make spontaneous stops at roadside fruit stalls and viewpoint pullouts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Want to stick to a lower daily budget without paying driver fees or lodging.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Are a confident driver comfortable with left-hand traffic and manual/automatic controls.</span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5">
                <Link
                  href="/vehicles"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <span>Explore Self-Drive Cars from LKR 8,000/day</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: With Driver */}
            <div className="bg-white dark:bg-[#121218] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
                    Choose With-Driver If You:
                  </h2>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                    Zero-Stress Luxury & Local Expertise
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Prefer zero stress navigating Sri Lanka&apos;s winding roads, tuk-tuks, and buses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Do not want to hassle with foreign driving permits, AAC endorsements, or paperwork.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Are traveling with elderly family or small children and want smooth point-to-point drop-offs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Want a courteous local guide who knows the best scenic routes, eateries, and shortcuts.</span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5">
                <a
                  href={`https://wa.me/${SITE_CONTACT.whatsappNumber}?text=Hi,%20I%20would%20like%20to%20hire%20a%20car%20with%20a%20driver%20for%20my%20trip.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Chat on WhatsApp for Chauffeur Quotes</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Side by Side
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
              Detailed Comparison Matrix
            </h2>
          </div>

          <div className="bg-white dark:bg-[#121218] rounded-3xl border border-slate-200/80 dark:border-white/10 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200/80 dark:border-white/10">
                    <th className="py-4 px-5 font-extrabold text-slate-900 dark:text-white w-1/4">
                      Feature
                    </th>
                    <th className="py-4 px-5 font-extrabold text-emerald-700 dark:text-emerald-400 w-3/8">
                      Self-Drive Rental
                    </th>
                    <th className="py-4 px-5 font-extrabold text-blue-700 dark:text-blue-400 w-3/8">
                      Chauffeur / With Driver
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {COMPARISON_POINTS.map((pt, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                      <td className="py-4 px-5 font-bold text-slate-900 dark:text-white align-top">
                        {pt.criterion}
                      </td>
                      <td className="py-4 px-5 text-slate-600 dark:text-slate-300 align-top leading-relaxed">
                        {pt.selfDrive}
                      </td>
                      <td className="py-4 px-5 text-slate-600 dark:text-slate-300 align-top leading-relaxed">
                        {pt.withDriver}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tourist Driving License & Paperwork Guide */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="bg-white dark:bg-[#121218] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
              <FileText className="h-6 w-6 text-emerald-600" />
              <span>Foreign License Requirements for Self-Drive</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              If you decide to self-drive in Sri Lanka, the law requires overseas visitors to hold valid driving authorization before operating a motor vehicle on public roads.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  1. International Driving Permit (IDP)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Issued in your home country prior to departure (valid under 1949 or 1968 Geneva/Vienna conventions).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  2. AAC Endorsement in Colombo
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  The Automobile Association of Ceylon (AAC) verifies your IDP and issues a temporary driving permit for Sri Lanka. Tourmate can assist you with this process to save time upon landing.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  3. Comprehensive Insurance
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  All Tourmate vehicles come pre-insured with comprehensive collision and third-party coverage so you are protected against unexpected incidents.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#121218] rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 shadow-sm"
              >
                <h3 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
