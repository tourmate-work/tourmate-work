export type Language = "en" | "si";

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    si: string;
  };
}

export const translations = {
  // Navigation & Header
  nav_home: { en: "Home", si: "මුල් පිටුව" },
  nav_browse_vehicles: { en: "Browse Vehicles", si: "වාහන සොයන්න" },
  nav_details: { en: "Details", si: "විස්තර" },
  nav_about_us: { en: "About Us", si: "අප ගැන" },
  nav_contact_us: { en: "Contact Us", si: "සම්බන්ධ වන්න" },
  nav_list_vehicle: { en: "List Your Vehicle", si: "ඔබේ වාහනය ලියාපදිංචි කරන්න" },
  nav_need_help: { en: "Need help?", si: "උදව් අවශ්‍යද?" },
  nav_admin: { en: "Admin", si: "පරිපාලක" },
  nav_public_site: { en: "View Public Site", si: "ප්‍රධාන වෙබ් අඩවිය" },

  // Hero Section
  hero_badge: {
    en: "Sri Lanka's #1 Verified Car Rental Network",
    si: "ශ්‍රී ලංකාවේ අංක 1 තහවුරු කළ වාහන කුලියට දීමේ සේවාව",
  },
  hero_title_1: {
    en: "Find Your Perfect Vehicle",
    si: "ඔබට ගැළපෙන හොඳම වාහනය",
  },
  hero_title_2: {
    en: "in Sri Lanka",
    si: "ශ්‍රී ලංකාවෙන් සොයා ගන්න",
  },
  hero_subtitle: {
    en: "Browse reliable cars and vehicles available for rent across Sri Lanka.",
    si: "ශ්‍රී ලංකාව පුරා කුලියට ගැනීමට විශ්වාසදායක මෝටර් රථ සහ වාහන පිරික්සන්න.",
  },
  hero_btn_browse: {
    en: "Browse Vehicles",
    si: "වාහන සොයන්න",
  },
  hero_btn_list: {
    en: "List Your Vehicle",
    si: "ඔබේ වාහනය ලියාපදිංචි කරන්න",
  },
  hero_guarantee_1: { en: "Zero Hidden Fees", si: "සැඟවුණු ගාස්තු නැත" },
  hero_guarantee_2: { en: "24/7 Islandwide Assist", si: "24/7 දිවයින පුරා සහය" },
  hero_guarantee_3: { en: "Free Airport Handover", si: "නොමිලේ ගුවන් තොටුපළ භාරදීම" },

  // Search Section
  search_mode_self: { en: "Self Drive", si: "ස්වයං ධාවනය" },
  search_mode_driver: { en: "With Driver", si: "රියදුරු සමඟ" },
  search_title: { en: "Find & Reserve Vehicles", si: "වාහන සොයා වෙන්කරවා ගන්න" },
  search_live_avail: { en: "Live Availability", si: "ක්ෂණික ලබාගත හැක" },
  search_vehicle_type: { en: "Vehicle Type", si: "වාහන වර්ගය" },
  search_all_types: { en: "All Vehicle Types", si: "සියලු වාහන වර්ග" },
  search_pickup_loc: { en: "Pickup Location", si: "ලබාගන්නා ස්ථානය" },
  search_pickup_placeholder: {
    en: "Search any city, airport, hotel, or address in Sri Lanka...",
    si: "ශ්‍රී ලංකාවේ ඕනෑම නගරයක්, හෝටලයක්, ගුවන් තොටුපළක් හෝ ලිපිනයක් සොයන්න...",
  },
  search_pickup_date: { en: "Pickup Date", si: "ලබාගන්නා දිනය" },
  search_return_date: { en: "Return Date", si: "නැවත භාරදෙන දිනය" },
  search_btn_submit: { en: "Search Vehicles", si: "වාහන සොයන්න" },
  search_whatsapp_help: {
    en: "Need direct help? Contact on WhatsApp",
    si: "ක්ෂණික සහය අවශ්‍යද? WhatsApp මගින් අමතන්න",
  },

  // Vehicle Categories
  cat_all: { en: "All Vehicles", si: "සියලු වාහන" },
  cat_sedan: { en: "Cars / Sedan", si: "කාර් / සෙඩාන්" },
  cat_suv: { en: "SUVs", si: "SUV රථ" },
  cat_van: { en: "Vans", si: "වෑන් රථ" },
  cat_jeep: { en: "Jeeps / 4x4", si: "ජීප් / 4x4" },
  cat_luxury: { en: "Luxury", si: "සුඛෝපභෝගී" },
  cat_hatchback: { en: "Hatchback", si: "හැච්බැක්" },
  cat_electric: { en: "Electric / Hybrid", si: "විදුලි / හයිබ්‍රිඩ්" },

  // How It Works
  how_badge: { en: "Simple 3-Step Process", si: "පහසු පියවර 3" },
  how_heading: { en: "How It Works", si: "ක්‍රියා පටිපාටිය" },
  how_subtitle: {
    en: "Renting a car in Sri Lanka with TourMate is effortless, transparent, and swift.",
    si: "TourMate සමඟ ශ්‍රී ලංකාවේ වාහනයක් කුලියට ගැනීම ඉතා පහසු, විනිවිද සහ කඩිනම් වේ.",
  },
  how_step1_title: { en: "1. Browse", si: "1. පිරික්සන්න" },
  how_step1_desc: {
    en: "Find a vehicle that suits your trip.",
    si: "ඔබේ ගමනට වඩාත් ගැළපෙන වාහනයක් තෝරා ගන්න.",
  },
  how_step2_title: { en: "2. Send an Inquiry", si: "2. විමසීමක් එවන්න" },
  how_step2_desc: {
    en: "Select your dates and submit your booking request.",
    si: "ඔබේ දිනයන් තෝරා වෙන්කිරීමේ ඉල්ලීම අප වෙත යොමු කරන්න.",
  },
  how_step3_title: { en: "3. Confirm Your Rental", si: "3. කුලිය තහවුරු කරන්න" },
  how_step3_desc: {
    en: "We will contact customer and arrange the rental.",
    si: "අප ඔබව සම්බන්ධ කරගෙන වාහනය ලබාදීමට කටයුතු සූදානම් කරමු.",
  },
  how_btn_browse: { en: "Browse Available Vehicles Now", si: "දැන්ම වාහන සොයන්න" },

  // Featured Vehicles (Fleet Section)
  fleet_badge: { en: "Premium Verified Fleet", si: "තහවුරු කළ වාහන එකතුව" },
  fleet_heading_1: { en: "Choose the car that", si: "ඔබේ ගමනට ගැළපෙන" },
  fleet_heading_2: { en: "suits your journey.", si: "වාහනය තෝරා ගන්න." },
  fleet_view_all: { en: "View all vehicles", si: "සියලු වාහන බලන්න" },
  fleet_per_day: { en: "per day", si: "දිනකට" },
  fleet_fully_insured: { en: "Fully Insured", si: "පූර්ණ රක්ෂණය සහිතයි" },
  fleet_btn_details: { en: "View Vehicle", si: "වාහනය බලන්න" },
  fleet_btn_book: { en: "Request to Book", si: "වෙන්කරවා ගැනීමට ඉල්ලන්න" },
  fleet_btn_explore: {
    en: "Explore complete vehicle catalog",
    si: "සම්පූර්ණ වාහන නාමාවලිය බලන්න",
  },
  fleet_no_vehicles: {
    en: "No Vehicles Currently Listed",
    si: "දැනට වාහන ලියාපදිංචි කර නොමැත",
  },

  // Vehicle Owner Section
  owner_badge: {
    en: "Host & Partner With TourMate",
    si: "TourMate සමඟ එක්ව ආදායම් උපයන්න",
  },
  owner_heading: {
    en: "Have a Vehicle You Want to Rent Out?",
    si: "ඔබට කුලියට දීමට වාහනයක් තිබේද?",
  },
  owner_text: {
    en: "Turn your vehicle into a reliable monthly income. Register your car, SUV, van, or jeep with TourMate Rentals. We connect vehicle owners with verified tourists and corporate travelers across Sri Lanka with guaranteed security and maintenance standards.",
    si: "ඔබේ වාහනයෙන් ස්ථිර මාසික ආදායමක් උපයන්න. ඔබේ මෝටර් රථය, SUV, වෑන් හෝ ජීප් රථය TourMate Rentals හි ලියාපදිංචි කරන්න. පූර්ණ ආරක්ෂාව සහ විශ්වාසනීයත්වය සමඟ අපි සංචාරකයින් සහ ව්‍යාපාරික පාරිභෝගිකයින් සම්බන්ධ කර දෙන්නෙමු.",
  },
  owner_btn_list: {
    en: "List Your Vehicle",
    si: "ඔබේ වාහනය ලියාපදිංචි කරන්න",
  },
  owner_benefit1_title: { en: "Guaranteed Rental Income", si: "ස්ථිර කුලී ආදායම" },
  owner_benefit1_desc: {
    en: "Earn consistent, high-yield revenue on your idle car with prompt settlements.",
    si: "ඔබේ වාහනයෙන් නිසි වේලාවට ගෙවීම් සමඟ උපරිම මාසික ආදායමක් උපයන්න.",
  },
  owner_benefit2_title: { en: "Full Protection & Insurance", si: "පූර්ණ ආරක්ෂාව සහ රක්ෂණය" },
  owner_benefit2_desc: {
    en: "Every trip includes verified client identity verification and comprehensive coverage.",
    si: "සෑම ගමනකටම තහවුරු කළ පාරිභෝගික අනන්‍යතාවය සහ පූර්ණ රක්ෂණ ආවරණය හිමිවේ.",
  },
  owner_benefit3_title: { en: "Flexible Scheduling", si: "පහසු වේලාවන් තෝරා ගැනීම" },
  owner_benefit3_desc: {
    en: "You decide when your car is available. Block out personal dates anytime.",
    si: "වාහනය ලබාදෙන දින ඔබම තීරණය කරන්න. පෞද්ගලික අවශ්‍යතාවලට ඕනෑම විටක වෙන්කර ගන්න.",
  },

  // Customer Booking Inquiry Modal ("Request to Book")
  modal_title: { en: "Request to Book", si: "වෙන්කරවා ගැනීමට ඉල්ලන්න" },
  modal_subtitle: {
    en: "TourMate Rentals • Guaranteed availability & direct WhatsApp confirmation",
    si: "TourMate Rentals • සහතික කළ ලබාගැනීම සහ සෘජු WhatsApp තහවුරු කිරීම",
  },
  modal_sec_customer: { en: "Customer Information", si: "පාරිභෝගික තොරතුරු" },
  modal_name: { en: "Full Name *", si: "සම්පූර්ණ නම *" },
  modal_whatsapp: { en: "WhatsApp Number *", si: "WhatsApp අංකය *" },
  modal_email: { en: "Email Address *", si: "විද්‍යුත් තැපැල් ලිපිනය *" },
  modal_country: { en: "Country", si: "රට" },
  modal_passengers: { en: "Passengers", si: "මගීන් ගණන" },
  modal_passenger_single: { en: "Passenger", si: "මගියා" },
  modal_passenger_plural: { en: "Passengers", si: "මගීන්" },
  modal_sec_rental: { en: "Rental Information", si: "කුලියට ගැනීමේ තොරතුරු" },
  modal_pickup_loc: {
    en: "Pickup Location (Any city, airport, hotel, or address in Sri Lanka)",
    si: "ලබාගන්නා ස්ථානය (ශ්‍රී ලංකාවේ ඕනෑම නගරයක්, හෝටලයක් හෝ ලිපිනයක්)",
  },
  modal_pickup_schedule: { en: "Pickup Schedule", si: "ලබාගන්නා වේලාව" },
  modal_return_schedule: { en: "Return Schedule", si: "නැවත භාරදෙන වේලාව" },
  modal_return_loc: { en: "Return Location", si: "නැවත භාරදෙන ස්ථානය" },
  modal_date: { en: "Date", si: "දිනය" },
  modal_time: { en: "Time", si: "වේලාව" },
  modal_additional_notes: {
    en: "Additional Message / Requirements or Questions",
    si: "අමතර අවශ්‍යතා, ප්‍රශ්න හෝ සටහන් (විකල්ප)",
  },
  modal_additional_placeholder: {
    en: "Need a baby seat, flight pickup, itinerary assistance, or special drop-off request? Let us know here...",
    si: "ළදරු ආසනයක්, ගුවන් තොටුපළෙන් පිළිගැනීමක් හෝ විශේෂ අවශ්‍යතාවයක් වේ නම් මෙහි සඳහන් කරන්න...",
  },
  modal_btn_submit: { en: "Send Booking Inquiry", si: "වෙන්කිරීමේ විමසීම යවන්න" },
  modal_submitting: { en: "Sending Inquiry...", si: "විමසීම යවමින් පවතී..." },
  modal_no_payment_notice: {
    en: "No payment required right now. TourMate concierge will confirm availability on WhatsApp.",
    si: "දැනට කිසිදු ගෙවීමක් අවශ්‍ය නොවේ. TourMate කණ්ඩායම WhatsApp මගින් වාහනය තහවුරු කරනු ඇත.",
  },
  modal_success_title: {
    en: "Thank you! Your booking inquiry has been received.",
    si: "ස්තූතියි! ඔබගේ වෙන්කිරීමේ විමසීම ලැබුණි.",
  },
  modal_success_message: {
    en: "TourMate Rentals will contact you shortly via WhatsApp to confirm availability and rental details.",
    si: "ලබාගත හැකි බව සහ කුලී විස්තර තහවුරු කිරීම සඳහා TourMate Rentals ඔබව කඩිනමින් WhatsApp ඔස්සේ සම්බන්ධ කරගනු ඇත.",
  },
  modal_btn_open_whatsapp: { en: "Open in WhatsApp", si: "WhatsApp ඔස්සේ විවෘත කරන්න" },
  modal_btn_done: { en: "Done", si: "අවසන්" },

  // Browse Vehicles Catalog
  catalog_title: { en: "Select an Available Vehicle", si: "ලබාගත හැකි වාහනයක් තෝරන්න" },
  catalog_subtitle: {
    en: "Search our verified fleet across Sri Lanka. Filter by vehicle model, pickup city or address, and check real-time availability.",
    si: "ශ්‍රී ලංකාව පුරා අපගේ තහවුරු කළ වාහන සොයන්න. වාහන මාදිලිය, ලබාගන්නා ස්ථානය අනුව පෙරහන් කරන්න.",
  },
  catalog_search_placeholder: {
    en: "Search vehicle model, brand, or features...",
    si: "වාහන මාදිලිය, නම හෝ පහසුකම් සොයන්න...",
  },
  catalog_available_now: { en: "Available Now", si: "දැනට ලබාගත හැක" },
  catalog_all_vehicles: { en: "All Vehicles", si: "සියලු වාහන" },
  catalog_btn_view_details: { en: "View Details", si: "විස්තර බලන්න" },
  catalog_specs_gearbox: { en: "Gearbox", si: "ගියර් පද්ධතිය" },
  catalog_specs_seats: { en: "Seats", si: "ආසන" },
  catalog_specs_doors: { en: "Doors", si: "දොරවල්" },
  catalog_specs_ac: { en: "AC", si: "වායුසමනය" },
  catalog_specs_fuel: { en: "Fuel", si: "ඉන්ධන" },

  // Footer & Policies
  footer_desc: {
    en: "Tourmate Rentals provides premier self-drive and driver-driven car hire services across Sri Lanka. Enjoy reliable vehicles, transparent pricing, and 24/7 road support.",
    si: "TourMate Rentals ශ්‍රී ලංකාව පුරා උසස් තත්වයේ ස්වයං ධාවන සහ රියදුරු සහිත වාහන සේවා සපයයි. සාධාරණ මිල ගණන් සහ 24/7 පාරිභෝගික සහය සමඟ විශ්වාසනීය සේවාවක් භුක්ති විඳින්න.",
  },
  footer_useful_links: { en: "Useful links", si: "වැදගත් සබැඳි" },
  footer_terms: { en: "Terms & Conditions", si: "නියමයන් සහ කොන්දේසි" },
  footer_privacy: { en: "Privacy Policy", si: "පෞද්ගලිකත්ව ප්‍රතිපත්තිය" },
  footer_cancellation: { en: "Cancellation Policy", si: "අවලංගු කිරීමේ ප්‍රතිපත්තිය" },
  footer_address_title: { en: "Address", si: "ලිපිනය" },
  footer_address_value: { en: "Wennapuwa, Sri Lanka", si: "වෙන්නප්පුව, ශ්‍රී ලංකාව" },
  footer_email_title: { en: "Email", si: "විද්‍යුත් තැපෑල" },
  footer_phone_title: { en: "Phone", si: "දුරකථන අංකය" },
  footer_copyright: {
    en: "© Copyright Tourmate rentals 2026. Design by MSP Solutions",
    si: "© කතුහිමිකම Tourmate Rentals 2026. නිර්මාණය MSP Solutions",
  },

  // Details View
  details_category_suffix: { en: "Category", si: "කාණ්ඩය" },
  details_tech_spec: { en: "Technical Specification", si: "තාක්ෂණික පිරිවිතර" },
  details_gearbox: { en: "Gear Box", si: "ගියර් පද්ධතිය" },
  details_fuel: { en: "Fuel", si: "ඉන්ධන" },
  details_doors: { en: "Doors", si: "දොරවල්" },
  details_ac: { en: "Air Conditioner", si: "වායුසමීකරණය" },
  details_seats: { en: "Seats", si: "ආසන" },
  details_distance: { en: "Distance", si: "ධාවන සීමාව" },
  details_pickup_label: {
    en: "Pickup Location / Delivery Address:",
    si: "රථය ලබාගන්නා ස්ථානය / බෙදාහැරීමේ ලිපිනය:",
  },
  details_live_search: { en: "Live Map Search", si: "සජීවී සිතියම් සෙවීම" },
  details_pickup_placeholder: {
    en: "Type or select pickup hotel, street address, or city in Sri Lanka...",
    si: "ශ්‍රී ලංකාවේ හෝටලය, ලිපිනය හෝ නගරය ඇතුළත් කරන්න...",
  },
  details_delivery_guarantee: {
    en: "Tourmate delivers directly to your location anywhere across Sri Lanka.",
    si: "Tourmate මඟින් ශ්‍රී ලංකාවේ ඕනෑම තැනකට ඔබේ රථය කෙලින්ම ගෙනැවිත් භාරදෙනු ලැබේ.",
  },
  details_btn_request: { en: "Request to Book", si: "වෙන්කරවා ගැනීමට ඉල්ලන්න" },
  details_btn_whatsapp: { en: "Direct WhatsApp", si: "කෙලින්ම WhatsApp වෙත" },
  details_equipment_title: {
    en: "Car Equipment & Protection Included",
    si: "ඇතුළත් කර ඇති උපකරණ සහ ආරක්ෂණ පහසුකම්",
  },
  details_other_cars: { en: "Other cars", si: "වෙනත් රථ වාහන" },
  details_view_all: { en: "View All", si: "සියල්ල බලන්න" },
  details_view_details: { en: "View Details", si: "විස්තර බලන්න" },

  // About Page
  about_badge: { en: "About Tourmate Rentals", si: "Tourmate Rentals පිළිබඳව" },
  about_hero_title: { en: "Sri Lanka's Trusted Fleet Partner", si: "ශ්‍රී ලංකාවේ විශ්වාසනීය වාහන සේවාව" },
  about_hero_subtitle: {
    en: "Connecting travelers with high-quality vehicles across Sri Lanka for over 25 years with unmatched reliability and hospitality.",
    si: "වසර 25කට වැඩි පළපුරුද්ද සමඟින් ශ්‍රී ලංකාව පුරා උසස් තත්වයේ වාහන සහ අසමසම ආගන්තුක සත්කාරය ඔබ වෙත පිරිනමන්නෙමු.",
  },
  about_faq_badge: { en: "Got Questions?", si: "ප්‍රශ්න තිබේද?" },
  about_faq_heading: { en: "Frequently Asked Questions", si: "නිතර අසන ප්‍රශ්න" },
  about_testimonials_badge: { en: "Customer Stories", si: "පාරිභෝගික අත්දැකීම්" },
  about_testimonials_heading: { en: "What Our Travelers Say", si: "අපගේ පාරිභෝගිකයින් පවසන දේ" },
  about_cta_heading: {
    en: "Ready for an Unforgettable Sri Lankan Journey?",
    si: "අමතක නොවන ශ්‍රී ලාංකේය සංචාරයකට සූදානම්ද?",
  },
  about_cta_btn: { en: "Book Your Vehicle Today", si: "අදම ඔබේ වාහනය වෙන්කරවා ගන්න" },

  // Contact Page
  contact_badge: { en: "Get in Touch", si: "අප හා සම්බන්ධ වන්න" },
  contact_heading: { en: "We are here to help you 24/7", si: "පැය 24 පුරා ඔබගේ සහයට අප සූදානම්" },
  contact_subtitle: {
    en: "Have a question, need a quote, or require immediate roadside assistance? Reach out anytime.",
    si: "විමසීමක්, මිල ගණන් දැනගැනීමක් හෝ ක්ෂණික පාරිභෝගික සහයක් අවශ්‍යද? ඕනෑම වේලාවක අප අමතන්න.",
  },
  contact_phone: { en: "Phone & WhatsApp", si: "දුරකථන සහ WhatsApp" },
  contact_email: { en: "Email Address", si: "විද්‍යුත් තැපෑල" },
  contact_office: { en: "Head Office", si: "ප්‍රධාන කාර්යාලය" },
  contact_hours: { en: "Working Hours", si: "සේවා වේලාවන්" },
  contact_hours_val: { en: "24 Hours / 7 Days Islandwide", si: "පැය 24 / දින 7 පුරා දිවයින පුරා" },
  contact_form_title: { en: "Send Us a Message", si: "අප වෙත පණිවිඩයක් එවන්න" },
  contact_form_name: { en: "Your Name", si: "ඔබගේ නම" },
  contact_form_email: { en: "Email Address", si: "විද්‍යුත් තැපෑල" },
  contact_form_phone: { en: "Phone / WhatsApp", si: "දුරකථන / WhatsApp අංකය" },
  contact_form_msg: { en: "Message", si: "පණිවිඩය" },
  contact_form_submit: { en: "Send Message", si: "පණිවිඩය යවන්න" },
} as const;

export type TranslationKey = keyof typeof translations;
