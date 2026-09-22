import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  ShieldCheck,
  Fuel,
  Car,
  CheckCircle2,
  Phone,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { VehicleImage } from "@/components/ui/vehicle-image";
import { SITE_CONTACT } from "@/lib/constants";
import { getVehiclesByLocation } from "@/lib/vehicles";

interface LocationPageProps {
  params: {
    location: string;
  };
}

interface LocationConfig {
  slug: string;
  name: string;
  title: string;
  h1: string;
  metaDesc: string;
  badge: string;
  heroTagline: string;
  intro: string[];
  perks: Array<{ title: string; desc: string }>;
  deliveryAreas: string[];
  drivingTips: Array<{ title: string; desc: string }>;
  faqs: Array<{ q: string; a: string }>;
}

const LOCATIONS: Record<string, LocationConfig> = {
  colombo: {
    slug: "colombo",
    name: "Colombo",
    title: "Car Rental Colombo | Self Drive & Car Hire Sri Lanka - Tourmate",
    h1: "Car Rental in Colombo & Self Drive Car Hire",
    metaDesc:
      "Reliable car rental in Colombo, Sri Lanka. Rent self-drive or chauffeur-driven sedans, SUVs, and compact cars with full insurance, unlimited mileage, and free hotel delivery in Colombo.",
    badge: "Colombo Commercial Capital Hub",
    heroTagline: "Self-drive freedom & executive chauffeur service delivered across Colombo 01-15.",
    intro: [
      "Looking for trusted car rental in Colombo? Tourmate delivers pristine, fully insured vehicles straight to your hotel, residence, or commercial hub in Colombo, Colpetty, Fort, and Mount Lavinia.",
      "Whether you need an economical compact car for inner-city commuting, a comfortable hybrid sedan for Southern Expressway cruising to Galle, or a premium SUV for cross-country exploration, we offer flexible self-drive and driver-driven options at competitive Sri Lankan rupee rates.",
    ],
    perks: [
      {
        title: "Doorstep Colombo Delivery",
        desc: "Free or low-cost vehicle handovers across Colombo 01–15, Colpetty, Cinnamon Gardens, Bambalapitiya, and Mount Lavinia.",
      },
      {
        title: "Expressway Connectivity",
        desc: "Instant access to the Southern Expressway (E01) to Bentota & Galle, and the Central Expressway (E04) to Kandy.",
      },
      {
        title: "Full Comprehensive Insurance",
        desc: "Drive with peace of mind. Every vehicle includes valid comprehensive insurance covering third-party and accidental collision.",
      },
      {
        title: "Foreign License Assistance",
        desc: "Visiting Sri Lanka? We guide you through the fast Automobile Association of Ceylon (AAC) endorsement for overseas licenses.",
      },
    ],
    deliveryAreas: [
      "Colombo 01 - Fort & Port City",
      "Colombo 02 - Slave Island",
      "Colombo 03 - Colpetty (Kollupitiya)",
      "Colombo 04 - Bambalapitiya",
      "Colombo 07 - Cinnamon Gardens",
      "Mount Lavinia & Dehiwala",
      "Rajagiriya & Battaramulla",
    ],
    drivingTips: [
      {
        title: "Peak Hour Traffic",
        desc: "Morning rush occurs between 7:30 AM – 9:30 AM, and evening rush between 5:00 PM – 7:30 PM along Galle Road and Baseline Road. Use Google Maps navigation to bypass congested corridors.",
      },
      {
        title: "Highway Toll Payments",
        desc: "Expressway tolls are payable in cash (Sri Lankan Rupees) or via Electronic Toll Collection (ETC). Keep LKR 300 - 1,000 cash handy for toll booths.",
      },
      {
        title: "City Center Parking",
        desc: "Street parking in Colombo 01-04 is managed by Tenaga car parking zones. Look out for marked parking bays and street attendants.",
      },
    ],
    faqs: [
      {
        q: "What documents are required for self drive car rental in Colombo?",
        a: "Sri Lankan residents need a valid national driving license and National Identity Card (NIC) or passport. Tourists need their national driver's license, an International Driving Permit (IDP), and a temporary Sri Lankan endorsement issued by the Automobile Association of Ceylon (AAC). Tourmate assists overseas visitors with endorsement procedures.",
      },
      {
        q: "Can you deliver the rental car to my hotel in Colombo?",
        a: "Yes! We offer direct delivery and collection to hotels, Airbnb apartments, and residences anywhere in Colombo and nearby suburbs. Just share your address or Google Maps pin during booking.",
      },
      {
        q: "Are monthly car rentals available in Colombo?",
        a: "Absolutely. We offer discounted long-term and monthly car hire rates for expats, corporate clients, and extended holidaymakers, inclusive of regular routine maintenance and replacement vehicle support.",
      },
    ],
  },
  airport: {
    slug: "airport",
    name: "Bandaranaike Airport (CMB) / Katunayake",
    title: "Airport Car Rental Sri Lanka | Bandaranaike Airport (CMB) - Tourmate",
    h1: "Airport Car Rental Sri Lanka — Bandaranaike Airport (CMB)",
    metaDesc:
      "24/7 Bandaranaike International Airport (CMB) car rental in Katunayake, Sri Lanka. Step off your flight and drive away with fully insured self-drive or driver-driven cars. Book online.",
    badge: "24/7 International Flight Terminal Delivery",
    heroTagline: "Fast terminal handovers at Katunayake Airport with flight tracking and 24/7 assistance.",
    intro: [
      "Arriving at Bandaranaike International Airport (CMB) in Katunayake? Skip stressful airport taxi counters and start your Sri Lankan journey immediately with Tourmate's seamless airport car rental service.",
      "Our representative meets you at the arrivals terminal with your reserved vehicle pre-checked, cleaned, and ready to go. Connect directly to the Colombo Katunayake Expressway (E03) or head north towards Sigiriya, Kandy, and the cultural triangle.",
    ],
    perks: [
      {
        title: "24/7 Terminal Meet & Greet",
        desc: "We monitor flight arrival schedules so our airport delivery agent is ready when you step out of baggage claim, regardless of flight delays.",
      },
      {
        title: "Expressway Express Access",
        desc: "Direct exit onto the Katunayake Expressway (E03) connects you to downtown Colombo in just 20–25 minutes.",
      },
      {
        title: "Zero Waiting Queues",
        desc: "Skip cumbersome airport rental desk queues. Complete quick digital paperwork and drive away in under 10 minutes.",
      },
      {
        title: "Luggage-Friendly Vehicles",
        desc: "Spacious sedans, SUVs, and passenger vans (like Toyota KDH and Shuttle) with ample trunk space for large suitcases and family gear.",
      },
    ],
    deliveryAreas: [
      "Bandaranaike Int'l Airport (CMB) Arrivals Terminal",
      "Katunayake Airport Road Hotels",
      "Seeduwa & Negombo Junction",
      "Free delivery within 15km of Katunayake Airport",
    ],
    drivingTips: [
      {
        title: "Navigating After Long Flights",
        desc: "If landing late at night after a long-haul flight, consider taking a chauffeur or resting in Negombo/Katunayake for a few hours before driving across mountain roads.",
      },
      {
        title: "Expressway Entry from Airport",
        desc: "The airport toll gate enters right onto the E03 Katunayake Expressway towards Peliyagoda/Colombo or connects toward the Northern/Central highway network.",
      },
    ],
    faqs: [
      {
        q: "How does airport car pickup work at Bandaranaike Airport (CMB)?",
        a: "When you land and retrieve your luggage, simply connect to free airport Wi-Fi and message our delivery representative on WhatsApp. We meet you outside the arrivals concourse, conduct a brief 5-minute vehicle walkaround, hand over the keys, and you are ready to drive.",
      },
      {
        q: "What happens if my incoming flight is delayed?",
        a: "We track your flight number in real time. If your arrival is delayed, your vehicle will still be held and your handover agent will be rescheduled automatically at no extra penalty.",
      },
      {
        q: "Can I pick up at the airport and drop off in Colombo or Galle?",
        a: "Yes, we support flexible one-way rental handovers between Katunayake Airport, Colombo, Negombo, and selected southern hubs with prior arrangement.",
      },
    ],
  },
  negombo: {
    slug: "negombo",
    name: "Negombo",
    title: "Car Rental Negombo & Beach Road Car Hire Sri Lanka - Tourmate",
    h1: "Car Rental in Negombo & Beach Road Car Hire",
    metaDesc:
      "Affordable car rental in Negombo, Porutota Road, and Beach Road. Self-drive hatchbacks, sedans, and vans with full insurance and airport delivery. Reserve your Negombo car hire.",
    badge: "Coastal Resort & Beach Gateway",
    heroTagline: "Coastal leisure and gateway road trips with doorstep delivery along Negombo Beach Road.",
    intro: [
      "Located just 15 minutes north of Bandaranaike International Airport, Negombo is Sri Lanka's beloved seaside launchpad for international travelers. Tourmate provides reliable, fully insured car hire throughout Negombo town, Lewis Place, and Porutota Road.",
      "Explore the golden coastline, visit the historic Dutch canal and fish market, or start an adventurous road trip north towards Wilpattu, Anuradhapura, or down the coast to Colombo and Bentota.",
    ],
    perks: [
      {
        title: "15-Minute Airport Proximity",
        desc: "Conveniently located for travelers staying in Negombo before or after their flights.",
      },
      {
        title: "Resort & Villa Delivery",
        desc: "We bring your vehicle directly to your beach resort, guest house, or private villa anywhere along the Negombo shoreline.",
      },
      {
        title: "Budget & Premium Choices",
        desc: "Choose from fuel-efficient compacts, executive sedans, spacious passenger vans, and rugged utility pickups.",
      },
      {
        title: "Local Roadside Support",
        desc: "Rapid mechanical and roadside assistance throughout the Western and North Western coastal provinces.",
      },
    ],
    deliveryAreas: [
      "Negombo Beach Road (Porutota Road)",
      "Lewis Place & Ethukala",
      "Negombo Town & Bus Stand Area",
      "Kochchikade & Marawila Link Road",
    ],
    drivingTips: [
      {
        title: "Beach Road Pedestrian Traffic",
        desc: "Porutota Road and Lewis Place have numerous cafes, tourists, and tuk-tuks. Keep speeds below 40 km/h in tourist zones.",
      },
      {
        title: "Coastal Road to Colombo",
        desc: "While the A3 highway connects Negombo to Colombo, taking the E03 expressway via Katunayake cuts transit time in half.",
      },
    ],
    faqs: [
      {
        q: "Can you drop the car off at my hotel on Negombo Beach Road?",
        a: "Yes! Delivery to all hotels and guest houses along Porutota Road and Lewis Place is available free or for a minimal token fee.",
      },
      {
        q: "Is self-drive safe for tourists starting in Negombo?",
        a: "Negombo is one of the easiest places to start driving in Sri Lanka because roads are flat, clearly marked, and provide quick access to uncongested highways heading north or onto expressways.",
      },
    ],
  },
  wennapuwa: {
    slug: "wennapuwa",
    name: "Wennapuwa & Marawila",
    title: "Car Rental Wennapuwa & Marawila Coastal Corridor - Tourmate",
    h1: "Car Rental in Wennapuwa, Marawila & Katuneriya",
    metaDesc:
      "Reliable car hire in Wennapuwa and Marawila. Self-drive sedans, SUVs, and passenger vans with comprehensive insurance for local visits, weddings, and tours. Book online.",
    badge: "North-Western Coastal Hub",
    heroTagline: "Trusted vehicles for family functions, local holidays, and coastal travel.",
    intro: [
      "Serving the bustling North-Western coastal belt including Wennapuwa, Marawila, Katuneriya, and Nainamadama. Tourmate offers top-quality vehicles for residents, visiting diaspora, weddings, and local exploration.",
      "Enjoy dependable, air-conditioned cars delivered to your doorstep, backed by comprehensive insurance, transparent pricing, and 24/7 roadside assistance.",
    ],
    perks: [
      {
        title: "Local Community Focus",
        desc: "Dedicated service for overseas Sri Lankans visiting family in Wennapuwa, Marawila, and Puttalam district.",
      },
      {
        title: "Wedding & Event Fleet",
        desc: "Clean, decorated-ready sedans and spacious passenger vans for wedding entourages and family celebrations.",
      },
      {
        title: "Long-Term & Monthly Discounts",
        desc: "Great monthly discounts for month-long holidays and family visits across the island.",
      },
      {
        title: "Flexible Security Deposits",
        desc: "Transparent deposit terms returned promptly upon vehicle check-in.",
      },
    ],
    deliveryAreas: [
      "Wennapuwa Town & Church Road",
      "Marawila Beach & Coastal Resorts",
      "Katuneriya & Thoduwawa",
      "Nainamadama & Kochchikade Border",
    ],
    drivingTips: [
      {
        title: "Colombo-Chilaw Main Highway (A3)",
        desc: "The A3 main road connects Wennapuwa quickly to Negombo (20 mins) and Colombo. Watch for local bus halts and pedestrian crossings.",
      },
    ],
    faqs: [
      {
        q: "Do you offer passenger vans like Toyota KDH in Wennapuwa?",
        a: "Yes, we have high-roof and standard-roof passenger vans perfect for large family trips, weddings, and airport group transfers.",
      },
      {
        q: "Can I book a vehicle from overseas before arriving in Wennapuwa?",
        a: "Yes! Many of our clients book from Italy, the UK, Australia, and the Middle East via WhatsApp. We reserve your vehicle in advance and have it ready when you reach Wennapuwa.",
      },
    ],
  },
};

export const revalidate = 60;

export async function generateStaticParams() {
  return Object.keys(LOCATIONS).map((location) => ({ location }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const loc = LOCATIONS[params.location.toLowerCase()];
  if (!loc) {
    return {
      title: "Car Rentals in Sri Lanka | Tourmate",
      description: "Rent a car in Sri Lanka with Tourmate Rentals.",
    };
  }

  const canonicalUrl = `https://tourmate.lk/rentals/${loc.slug}`;

  return {
    title: loc.title,
    description: loc.metaDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: loc.title,
      description: loc.metaDesc,
      url: canonicalUrl,
      siteName: "Tourmate Rentals Sri Lanka",
      type: "website",
      locale: "en_LK",
      images: [
        {
          url: "https://tourmate.lk/images/hero-sri-lanka.jpg",
          width: 1200,
          height: 630,
          alt: `${loc.h1} - Tourmate Rentals`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: loc.title,
      description: loc.metaDesc,
    },
  };
}

export default async function LocationRentalPage({ params }: LocationPageProps) {
  const locationKey = params.location.toLowerCase();
  const config = LOCATIONS[locationKey];

  if (!config) {
    notFound();
  }

  const vehicles = await getVehiclesByLocation(locationKey);

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

  // Schema.org LocalBusiness / AutoRental
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: `Tourmate Car Rental ${config.name}`,
    description: config.metaDesc,
    url: `https://tourmate.lk/rentals/${config.slug}`,
    telephone: SITE_CONTACT.phone,
    priceRange: "LKR 8,000 - 35,000 per day",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    currenciesAccepted: "LKR, USD, EUR, GBP",
    areaServed: {
      "@type": "City",
      name: config.name,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
      addressRegion: "Western Province",
      addressLocality: config.name,
    },
  };

  // Schema.org Breadcrumb
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
        name: "Rentals",
        item: "https://tourmate.lk/vehicles",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: config.name,
        item: `https://tourmate.lk/rentals/${config.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-black text-slate-900 dark:text-white selection:bg-slate-900 selection:text-white">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
                Rentals
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-slate-900 dark:text-white font-bold">{config.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-10 pb-14 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/60 dark:from-[#0c0c10] dark:via-black dark:to-black border-b border-slate-200/60 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-4">
                <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                <span>{config.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight mb-4">
                {config.h1}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {config.heroTagline}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${SITE_CONTACT.whatsappNumber}?text=Hello%20Tourmate,%20I'm%20interested%20in%20car%20rental%20in%20${encodeURIComponent(config.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Book in {config.name} via WhatsApp</span>
                </a>
                <a
                  href={`tel:${SITE_CONTACT.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-white/15 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-white/10 transition-all active:scale-95"
                >
                  <Phone className="h-4 w-4 text-emerald-500" />
                  <span>Call {SITE_CONTACT.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Location Perks */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.perks.map((perk, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#121218] p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm"
              >
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  {perk.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Available Fleet in Location */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Ready For Delivery
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
                Available Cars in & around {config.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Fully insured, verified condition, with self-drive or chauffeur options.
              </p>
            </div>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>View full Sri Lanka fleet</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {vehicles.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#121218] rounded-3xl border border-slate-200 dark:border-white/10 p-8">
              <Car className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                Cars Available on Demand
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-4">
                We can arrange custom vehicle handovers to {config.name} from our central fleet hub.
              </p>
              <a
                href={`https://wa.me/${SITE_CONTACT.whatsappNumber}?text=Inquiring%20about%20car%20delivery%20to%20${encodeURIComponent(config.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-bold"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((car) => (
                <div
                  key={car.id}
                  className="bg-white dark:bg-[#121218] rounded-[24px] p-4 sm:p-5 border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Car Image Link */}
                    <Link
                      href={`/vehicles/${car.slug || car.id}`}
                      className="block relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 mb-4 group-hover:shadow-md transition-all"
                    >
                      <VehicleImage
                        src={car.thumbnails?.[0] || ""}
                        alt={`${car.brand} ${car.name} in ${config.name}`}
                        fallbackName={car.name}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-black/75 backdrop-blur-sm text-white border border-white/20">
                        {car.location ? config.name : "Free Delivery"}
                      </div>
                    </Link>

                    {/* Header: Name + Price */}
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

                    {/* Specs Pill Bar */}
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

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Link
                      href={`/vehicles/${car.slug || car.id}`}
                      className="py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-bold text-center transition-colors flex items-center justify-center"
                    >
                      View Specs
                    </Link>
                    <a
                      href={`https://wa.me/${SITE_CONTACT.whatsappNumber}?text=Hi,%20I%20want%20to%20rent%20the%20${encodeURIComponent(car.name)}%20in%20${encodeURIComponent(config.name)}.`}
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
          )}
        </section>

        {/* Informative Intro & Driving Guide */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 7 cols: Rich editorial copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-[#121218] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-4">
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                  Everything You Need to Know About Renting a Car in {config.name}
                </h2>
                {config.intro.map((p, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {p}
                  </p>
                ))}

                <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Popular Delivery Points in {config.name}:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {config.deliveryAreas.map((area, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Driving Tips Card */}
              <div className="bg-white dark:bg-[#121218] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10">
                <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                  <Fuel className="h-5 w-5 text-emerald-500" />
                  <span>Local Driving & Navigation Advice</span>
                </h3>
                <div className="space-y-4">
                  {config.drivingTips.map((tip, idx) => (
                    <div key={idx} className="border-l-2 border-emerald-500/50 pl-3">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {tip.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {tip.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Monthly Discounts & Quick Booking Banner */}
            <div className="lg:col-span-5 space-y-6">
              {/* Monthly Rental Banner */}
              <div className="bg-gradient-to-br from-emerald-950 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-block mb-3">
                  Long-Term Hire
                </span>
                <h3 className="text-xl font-black tracking-tight mb-2">
                  Monthly Car Rental in {config.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Staying for several weeks or months? Enjoy up to 35% off standard daily rates with complimentary monthly routine servicing and swap replacement vehicles.
                </p>
                <a
                  href={`https://wa.me/${SITE_CONTACT.whatsappNumber}?text=Hi%20Tourmate,%20I'm%20looking%20for%20a%20monthly%20car%20rental%20quote%20in%20${encodeURIComponent(config.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-white text-slate-950 hover:bg-emerald-400 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Request Long-Term Quote</span>
                </a>
              </div>

              {/* Self-Drive vs With Driver Crosslink */}
              <div className="bg-white dark:bg-[#121218] p-6 rounded-3xl border border-slate-200/80 dark:border-white/10">
                <h4 className="text-sm font-bold text-slate-950 dark:text-white mb-2">
                  Unsure between Self-Drive or Chauffeur?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  Compare freedom, foreign license requirements, fuel costs, and driver allowances in our detailed Sri Lanka travel guide.
                </p>
                <Link
                  href="/self-drive-vs-with-driver"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <span>Read Self-Drive vs Driver Guide</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Other Rental Locations */}
              <div className="bg-white dark:bg-[#121218] p-6 rounded-3xl border border-slate-200/80 dark:border-white/10">
                <h4 className="text-sm font-bold text-slate-950 dark:text-white mb-3">
                  Other Popular Locations:
                </h4>
                <div className="space-y-2">
                  {Object.values(LOCATIONS)
                    .filter((l) => l.slug !== config.slug)
                    .map((otherLoc) => (
                      <Link
                        key={otherLoc.slug}
                        href={`/rentals/${otherLoc.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-xs text-slate-700 dark:text-slate-300 font-semibold transition-colors group"
                      >
                        <span className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                          {otherLoc.name}
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
              Frequently Asked Questions in {config.name}
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
