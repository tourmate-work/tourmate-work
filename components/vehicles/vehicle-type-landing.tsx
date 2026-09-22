import Link from "next/link";
import {
  ShieldCheck,
  Car,
  CheckCircle2,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VehicleImage } from "@/components/ui/vehicle-image";
import { SITE_CONTACT } from "@/lib/constants";
import { getVehiclesByCategory } from "@/lib/vehicles";

export interface VehicleTypeConfig {
  typeKey: string;
  categoryLabel: string;
  title: string;
  h1: string;
  metaDesc: string;
  badge: string;
  tagline: string;
  intro: string[];
  features: Array<{ title: string; desc: string }>;
  idealFor: string[];
  faqs: Array<{ q: string; a: string }>;
}

export async function VehicleTypeLandingView({
  config,
}: {
  config: VehicleTypeConfig;
}) {
  const vehicles = await getVehiclesByCategory(config.typeKey);

  // Schema.org FAQ data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  // Schema.org CollectionPage / AutoRental
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: config.h1,
    description: config.metaDesc,
    url: `https://tourmate.lk/vehicles/${config.typeKey}`,
    provider: {
      "@type": "AutoRental",
      name: "Tourmate Rentals Sri Lanka",
      url: "https://tourmate.lk",
      telephone: SITE_CONTACT.phone,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://tourmate.lk",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Vehicles",
        item: "https://tourmate.lk/vehicles",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: config.categoryLabel,
        item: `https://tourmate.lk/vehicles/${config.typeKey}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-black text-slate-900 dark:text-white selection:bg-slate-900 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="flex-1 pb-20">
        {/* Breadcrumb Bar */}
        <div className="bg-white dark:bg-[#0c0c10] border-b border-slate-200/80 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center text-xs font-medium text-slate-500 dark:text-slate-400 space-x-2">
              <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <Link href="/vehicles" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Vehicles
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-slate-900 dark:text-white font-bold">{config.categoryLabel}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-10 pb-14 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/60 dark:from-[#0c0c10] dark:via-black dark:to-black border-b border-slate-200/60 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-4">
                <Car className="h-3.5 w-3.5 text-emerald-600" />
                <span>{config.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight mb-4">
                {config.h1}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {config.tagline}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${SITE_CONTACT.whatsappNumber}?text=Hello%20Tourmate,%20I'm%20interested%20in%20${encodeURIComponent(config.categoryLabel)}%20rental%20in%20Sri%20Lanka.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Inquire on WhatsApp</span>
                </a>
                <Link
                  href="/vehicles"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-white/10 transition-all active:scale-95"
                >
                  <span>Browse All Categories</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.features.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#121218] p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm"
              >
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Matching Vehicles Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Available Fleet
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
                {config.categoryLabel} Models Available in Sri Lanka
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Every vehicle includes comprehensive insurance, verified maintenance, and 24/7 support.
              </p>
            </div>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>See full inventory</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((car) => (
              <div
                key={car.id}
                className="bg-white dark:bg-[#121218] rounded-[24px] p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <Link
                    href={`/vehicles/${car.slug || car.id}`}
                    className="block relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 mb-4 group-hover:shadow-md transition-all"
                  >
                    <VehicleImage
                      src={car.thumbnails?.[0] || ""}
                      alt={`${car.brand} ${car.name} ${config.categoryLabel} rental Sri Lanka`}
                      fallbackName={car.name}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-black/75 backdrop-blur-sm text-white border border-white/20">
                      {car.location || "Colombo / Airport"}
                    </div>
                  </Link>

                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white leading-tight group-hover:text-emerald-600 transition-colors">
                        <Link href={`/vehicles/${car.slug || car.id}`}>
                          {car.year ? `${car.year} ` : ""}
                          {car.brand} {car.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                        {car.category} • Fully Insured
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 block">
                        {car.price}
                      </span>
                      <span className="text-[10px] text-slate-400">per day</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-white/5 my-3 text-center text-[11px] text-slate-600 dark:text-slate-400 font-semibold">
                    <div className="bg-slate-50 dark:bg-white/5 rounded-lg py-1">
                      {car.specs.gearBox}
                    </div>
                    <div className="bg-slate-50 dark:bg-white/5 rounded-lg py-1">
                      {car.specs.fuel}
                    </div>
                    <div className="bg-slate-50 dark:bg-white/5 rounded-lg py-1">
                      {car.specs.seats} Seats
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Link
                    href={`/vehicles/${car.slug || car.id}`}
                    className="py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-bold text-center transition-colors flex items-center justify-center"
                  >
                    View Specs
                  </Link>
                  <a
                    href={`https://wa.me/${SITE_CONTACT.whatsappNumber}?text=Hi,%20I'm%20interested%20in%20booking%20the%20${encodeURIComponent(car.name)}%20(${encodeURIComponent(config.categoryLabel)}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 rounded-xl bg-slate-950 hover:bg-emerald-700 dark:bg-white dark:text-slate-950 dark:hover:bg-emerald-400 dark:hover:text-white text-white text-xs font-bold text-center transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <MessageCircle className="h-3 w-3" />
                    <span>Book Now</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Informative Editorial Copy */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-[#121218] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-4">
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                  Why Choose a {config.categoryLabel} for Your Sri Lanka Journey?
                </h2>
                {config.intro.map((p, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {p}
                  </p>
                ))}

                <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Recommended Itineraries & Routes:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {config.idealFor.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              {/* Monthly discounts banner */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-xl">
                <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-block mb-3">
                  Long-Term Discount
                </span>
                <h3 className="text-xl font-black tracking-tight mb-2">
                  Monthly {config.categoryLabel} Rental in Sri Lanka
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Looking for extended vehicle hire? Save significantly on monthly contracts with full insurance, routine maintenance, and swap coverage included.
                </p>
                <a
                  href={`https://wa.me/${SITE_CONTACT.whatsappNumber}?text=Inquiring%20about%20long%20term%20or%20monthly%20${encodeURIComponent(config.categoryLabel)}%20rental%20rates.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-white text-slate-950 hover:bg-emerald-400 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Get Monthly Quote</span>
                </a>
              </div>

              {/* Other Category Links */}
              <div className="bg-white dark:bg-[#121218] p-6 rounded-3xl border border-slate-200/80 dark:border-white/10">
                <h4 className="text-sm font-bold text-slate-950 dark:text-white mb-3">
                  Other Vehicle Categories:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "SUVs & 4x4", href: "/vehicles/suv" },
                    { label: "Sedans & Saloons", href: "/vehicles/sedan" },
                    { label: "Passenger Vans", href: "/vehicles/minivan" },
                    { label: "Pickup Trucks", href: "/vehicles/pickup" },
                    { label: "Cabriolets", href: "/vehicles/cabriolet" },
                    { label: "All Vehicles", href: "/vehicles" },
                  ]
                    .filter((c) => c.href !== `/vehicles/${config.typeKey}`)
                    .map((catItem, idx) => (
                      <Link
                        key={idx}
                        href={catItem.href}
                        className="p-2.5 rounded-xl border border-slate-100 dark:border-white/5 hover:border-emerald-500/40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-between"
                      >
                        <span>{catItem.label}</span>
                        <ChevronRight className="h-3 w-3 text-slate-400" />
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Common Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
              Frequently Asked Questions About {config.categoryLabel} Rentals
            </h2>
          </div>

          <div className="space-y-3">
            {config.faqs.map((faq, idx) => (
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
