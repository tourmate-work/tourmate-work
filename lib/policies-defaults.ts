import { PoliciesMap, PolicySection } from "@/types";

export const DEFAULT_TERMS_SECTIONS: PolicySection[] = [
  {
    id: "terms-1",
    title: "1. About TourMate Rentals",
    content:
      "TourMate Rentals is a vehicle rental platform that connects vehicle owners with customers looking to rent vehicles.",
    note: "TourMate Rentals does not own the vehicles. The vehicles are provided by their respective owners.",
  },
  {
    id: "terms-2",
    title: "2. Booking Requests",
    content: "Submitting a booking request does not automatically guarantee a confirmed rental.",
    note: "A booking is confirmed only after TourMate Rentals confirms the booking and the required advance payment has been received.",
  },
  {
    id: "terms-3",
    title: "3. Payments",
    content: "A minimum advance payment of LKR 20,000 may be required to confirm a rental.",
    note: "The remaining rental amount and any security deposit will be communicated before the vehicle is handed over.",
  },
  {
    id: "terms-4",
    title: "4. Vehicle Handover",
    content: "The vehicle owner and renter will meet at the agreed location for the handover.",
    note: "Before the rental begins, the vehicle condition, fuel level and mileage may be recorded. The required rental agreement must be completed and signed before the vehicle is handed over.",
  },
  {
    id: "terms-5",
    title: "5. Vehicle Return",
    content: "The renter must return the vehicle on the agreed date and time and in the agreed condition.",
    note: "The vehicle condition, fuel level and mileage may be checked upon return. Additional charges may apply for late returns, fuel differences or damage according to the agreed rental terms.",
  },
  {
    id: "terms-6",
    title: "6. Renter Responsibility",
    content:
      "The renter must use the vehicle responsibly and follow all applicable laws and agreed rental conditions.",
    note: "The renter must provide accurate information and valid identification when requested.",
  },
  {
    id: "terms-7",
    title: "7. Vehicle Owner Responsibility",
    content: "The vehicle owner must provide a properly maintained and legally usable vehicle.",
    note: "The owner is responsible for ensuring that the vehicle has the necessary documents, insurance and legal requirements for the rental.",
  },
  {
    id: "terms-8",
    title: "8. Owner & Renter Agreement",
    content: "The final rental arrangement is between the vehicle owner and renter.",
    note: "Both parties must review and sign the required rental agreement before the vehicle is handed over. TourMate Rentals acts as the platform connecting the parties and facilitating the rental process.",
  },
  {
    id: "terms-9",
    title: "9. Cancellation & Refunds",
    content:
      "Cancellation and refund eligibility will depend on the cancellation and refund terms provided at the time of booking.",
    note: "Any applicable refund will be processed according to TourMate Rentals' cancellation and refund policy.",
  },
  {
    id: "terms-10",
    title: "10. Acceptance",
    content:
      "By using the TourMate Rentals website or submitting a booking request, you confirm that you have read, understood and agreed to these Terms & Conditions.",
  },
];

export const DEFAULT_PRIVACY_SECTIONS: PolicySection[] = [
  {
    id: "priv-1",
    title: "1. Information We Collect",
    content:
      "We collect your full name, contact phone/WhatsApp number, email address, country of residence, and trip details to process your car rental inquiry and handover.",
  },
  {
    id: "priv-2",
    title: "2. How We Protect Your Data",
    content:
      "Your data is stored securely and is only accessible by authorized TourMate operations staff for scheduling vehicle deliveries and verifying driver documentation.",
  },
  {
    id: "priv-3",
    title: "3. No Third-Party Sharing",
    content:
      "We do not sell, rent, or trade your personal or booking data to any third-party advertisers or external marketing organizations.",
  },
  {
    id: "priv-4",
    title: "4. WhatsApp Communications",
    content:
      "Booking confirmations, delivery schedules, and support notifications are conducted directly through our official WhatsApp concierge (+94 77 297 3618).",
  },
];

export const DEFAULT_CANCELLATION_SECTIONS: PolicySection[] = [
  {
    id: "canc-1",
    title: "1. 100% Free Cancellation",
    content:
      "Cancel anytime up to 48 hours before your scheduled vehicle delivery time with zero cancellation fee or penalty.",
  },
  {
    id: "canc-2",
    title: "2. Flexible Rescheduling",
    content:
      "Change your pickup dates, delivery location, or vehicle category anytime by messaging our WhatsApp concierge at no additional rescheduling charge (subject to fleet availability).",
  },
  {
    id: "canc-3",
    title: "3. Security Deposit Return",
    content:
      "Security deposits collected at handover are fully refunded immediately upon safe return and inspection of the vehicle.",
  },
  {
    id: "canc-4",
    title: "4. Flight Delays & Early Returns",
    content:
      "We track flight arrivals at Bandaranaike International Airport (CMB). Flight delays will not incur late handover penalties.",
  },
];

export const DEFAULT_POLICIES: PoliciesMap = {
  terms: {
    id: "terms",
    title: "TOURMATE RENTALS – TERMS & CONDITIONS",
    subtitle: "Official Policy Agreement",
    lastUpdated: "September 2026",
    intro:
      "By using the TourMate Rentals website or requesting a rental through our platform, you agree to these Terms & Conditions.",
    sections: DEFAULT_TERMS_SECTIONS,
  },
  privacy: {
    id: "privacy",
    title: "Privacy Policy",
    subtitle: "TourMate Rentals Sri Lanka",
    lastUpdated: "September 2026",
    intro:
      "We value your privacy and are committed to protecting your personal information during your rental journey.",
    sections: DEFAULT_PRIVACY_SECTIONS,
  },
  cancellation: {
    id: "cancellation",
    title: "Cancellation Policy",
    subtitle: "TourMate Rentals Sri Lanka",
    lastUpdated: "September 2026",
    intro:
      "Review our transparent cancellation terms, advance payment rules, and security deposit return procedures.",
    sections: DEFAULT_CANCELLATION_SECTIONS,
  },
};
