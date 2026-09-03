"use client";

import { useState, useRef } from "react";
import {
  Car,
  Camera,
  Upload,
  CheckCircle,
  AlertCircle,
  MapPin,
  Calendar,
  Phone,
  ShieldCheck,
  Sparkles,
  Sliders,
  DollarSign,
  Trash2,
} from "lucide-react";
import { SellerVehicle } from "./add-vehicle-modal";
import { CustomDropdown, DropdownOption } from "@/components/ui/custom-dropdown";

export interface VehicleListingFormProps {
  onSuccess?: (vehicle: SellerVehicle) => void;
  onCancel?: () => void;
  isModal?: boolean;
}

// Visual Guides & Blueprints for the 7 Required Photos
interface PhotoGuideSlot {
  id: string;
  type: "exterior" | "interior";
  slotNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  angleInstructions: string;
  sampleUrl: string;
  svgIcon: (active: boolean) => React.ReactNode;
}

const PHOTO_GUIDES: PhotoGuideSlot[] = [
  // 4 OUTSIDE PHOTOS
  {
    id: "ext_front_three_quarter",
    type: "exterior",
    slotNumber: 1,
    title: "Front 3/4 Exterior",
    subtitle: "Recommended Primary Hero Shot",
    badge: "Cover Photo",
    angleInstructions:
      "Park at 45° angle showing front grille, headlights, hood, and driver side alloy wheels. Daylight, car centered.",
    sampleUrl: "/images/mock/axio-sedan.jpg",
    svgIcon: (active) => (
      <svg
        viewBox="0 0 120 70"
        fill="none"
        className={`w-full h-20 transition-all ${
          active ? "text-violet-500 stroke-violet-500" : "text-slate-400 stroke-slate-400 dark:text-slate-600 dark:stroke-slate-600"
        }`}
      >
        {/* Angled Front 3/4 Wireframe */}
        <path
          d="M15 46L30 25L75 22L105 32L112 45L108 53L95 55L90 48L80 48L75 55L35 55L30 48L20 48L15 53Z"
          strokeWidth="2.2"
          strokeLinejoin="round"
          className="fill-slate-100/50 dark:fill-white/5"
        />
        {/* Windshield & Cabin */}
        <path d="M35 26L48 12L80 12L92 28L35 26Z" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M60 12L60 26" strokeWidth="1.5" strokeDasharray="2 2" />
        {/* Front Wheel angled */}
        <circle cx="26" cy="48" r="8" strokeWidth="2.2" className="fill-white dark:fill-[#121217]" />
        <circle cx="26" cy="48" r="3.5" strokeWidth="1.5" />
        {/* Rear Wheel angled */}
        <circle cx="85" cy="48" r="8" strokeWidth="2.2" className="fill-white dark:fill-[#121217]" />
        <circle cx="85" cy="48" r="3.5" strokeWidth="1.5" />
        {/* Headlight beam indicator */}
        <path d="M12 45L4 42M12 48L3 48M12 51L4 54" strokeWidth="1.5" strokeLinecap="round" />
        {/* 45 Degree Angle indicator icon */}
        <path d="M102 14L114 14L114 26" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M114 14L100 28" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "ext_rear_three_quarter",
    type: "exterior",
    slotNumber: 2,
    title: "Rear 3/4 Exterior",
    subtitle: "Tail & Trunk Perspective",
    badge: "Angle 2",
    angleInstructions:
      "Park at 45° angle from rear passenger corner. Show taillights, trunk/boot line, exhaust tips, and side body contours.",
    sampleUrl: "/images/mock/premio-sedan.jpg",
    svgIcon: (active) => (
      <svg
        viewBox="0 0 120 70"
        fill="none"
        className={`w-full h-20 transition-all ${
          active ? "text-violet-500 stroke-violet-500" : "text-slate-400 stroke-slate-400 dark:text-slate-600 dark:stroke-slate-600"
        }`}
      >
        {/* Rear 3/4 Wireframe */}
        <path
          d="M10 38L22 28L60 22L98 25L108 42L105 53L95 55L90 48L80 48L75 55L35 55L30 48L20 48L12 53Z"
          strokeWidth="2.2"
          strokeLinejoin="round"
          className="fill-slate-100/50 dark:fill-white/5"
        />
        {/* Rear glass & Roofline */}
        <path d="M26 28L36 14L74 14L86 26L26 28Z" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M52 14L52 27" strokeWidth="1.5" strokeDasharray="2 2" />
        {/* Wheels */}
        <circle cx="26" cy="48" r="8" strokeWidth="2.2" className="fill-white dark:fill-[#121217]" />
        <circle cx="26" cy="48" r="3.5" strokeWidth="1.5" />
        <circle cx="85" cy="48" r="8" strokeWidth="2.2" className="fill-white dark:fill-[#121217]" />
        <circle cx="85" cy="48" r="3.5" strokeWidth="1.5" />
        {/* Taillight glow indicator */}
        <rect x="12" y="38" width="8" height="5" rx="1.5" strokeWidth="1.5" className="fill-red-500/20" />
      </svg>
    ),
  },
  {
    id: "ext_side_profile",
    type: "exterior",
    slotNumber: 3,
    title: "Side Profile (Full)",
    subtitle: "Complete Wheelbase View",
    badge: "Angle 3",
    angleInstructions:
      "Step back 5-7 meters. Camera level with door handles. Capture the entire vehicle length straight-on from wheel to wheel.",
    sampleUrl: "/images/car-side.jpg",
    svgIcon: (active) => (
      <svg
        viewBox="0 0 120 70"
        fill="none"
        className={`w-full h-20 transition-all ${
          active ? "text-violet-500 stroke-violet-500" : "text-slate-400 stroke-slate-400 dark:text-slate-600 dark:stroke-slate-600"
        }`}
      >
        {/* Straight Side Profile */}
        <path
          d="M8 44L14 36L30 34L44 18L84 18L98 34L112 37L114 45L106 48L98 48L90 48L82 48L38 48L30 48L22 48L14 48Z"
          strokeWidth="2.2"
          strokeLinejoin="round"
          className="fill-slate-100/50 dark:fill-white/5"
        />
        {/* Side windows */}
        <path d="M46 20L82 20L92 33L36 33Z" strokeWidth="1.8" />
        <path d="M63 20L63 33" strokeWidth="1.8" />
        {/* Door handles */}
        <rect x="48" y="37" width="7" height="2" rx="1" strokeWidth="1.5" />
        <rect x="74" y="37" width="7" height="2" rx="1" strokeWidth="1.5" />
        {/* Front & Rear Wheels */}
        <circle cx="26" cy="48" r="9" strokeWidth="2.2" className="fill-white dark:fill-[#121217]" />
        <circle cx="26" cy="48" r="4" strokeWidth="1.5" />
        <circle cx="90" cy="48" r="9" strokeWidth="2.2" className="fill-white dark:fill-[#121217]" />
        <circle cx="90" cy="48" r="4" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "ext_front_face",
    type: "exterior",
    slotNumber: 4,
    title: "Front Direct (Face)",
    subtitle: "Headlights & Grille Center",
    badge: "Angle 4",
    angleInstructions:
      "Dead center straight shot facing front bumper. Ensure clean headlights, emblem, and number plate are clearly legible.",
    sampleUrl: "/images/mock/prado-4x4.jpg",
    svgIcon: (active) => (
      <svg
        viewBox="0 0 120 70"
        fill="none"
        className={`w-full h-20 transition-all ${
          active ? "text-violet-500 stroke-violet-500" : "text-slate-400 stroke-slate-400 dark:text-slate-600 dark:stroke-slate-600"
        }`}
      >
        {/* Symmetrical Front Face */}
        <path
          d="M24 24L34 10L86 10L96 24L104 38L100 52L90 54L86 51L34 51L30 54L20 52L16 38Z"
          strokeWidth="2.2"
          strokeLinejoin="round"
          className="fill-slate-100/50 dark:fill-white/5"
        />
        {/* Front Windshield */}
        <path d="M35 12L85 12L92 23L28 23Z" strokeWidth="1.8" />
        {/* Left & Right Headlights */}
        <polygon points="22,34 36,32 34,40 22,38" strokeWidth="1.8" />
        <polygon points="98,34 84,32 86,40 98,38" strokeWidth="1.8" />
        {/* Front Grille & Badge */}
        <rect x="42" y="32" width="36" height="10" rx="2" strokeWidth="1.8" />
        <circle cx="60" cy="37" r="2.5" strokeWidth="1.5" />
        {/* Number plate area */}
        <rect x="46" y="45" width="28" height="6" rx="1.5" strokeWidth="1.5" />
      </svg>
    ),
  },

  // 3 INSIDE PHOTOS
  {
    id: "int_driver_cockpit",
    type: "interior",
    slotNumber: 5,
    title: "Driver Cockpit & Steering",
    subtitle: "Instrument Cluster & Controls",
    badge: "Inside 1",
    angleInstructions:
      "Shoot from open driver door looking forward at the steering wheel, digital speedometer cluster, and air vents.",
    sampleUrl: "/images/mock/mercedes-amg.jpg",
    svgIcon: (active) => (
      <svg
        viewBox="0 0 120 70"
        fill="none"
        className={`w-full h-20 transition-all ${
          active ? "text-violet-500 stroke-violet-500" : "text-slate-400 stroke-slate-400 dark:text-slate-600 dark:stroke-slate-600"
        }`}
      >
        {/* Steering Wheel Wireframe */}
        <circle cx="48" cy="38" r="20" strokeWidth="2.5" className="fill-slate-100/50 dark:fill-white/5" />
        <circle cx="48" cy="38" r="8" strokeWidth="2" />
        <path d="M28 38L40 38M56 38L68 38M48 46L48 58" strokeWidth="2" strokeLinecap="round" />
        {/* Instrument cluster background */}
        <path d="M30 16L66 16L72 26L24 26Z" strokeWidth="1.8" />
        <circle cx="39" cy="21" r="3" strokeWidth="1.2" />
        <circle cx="57" cy="21" r="3" strokeWidth="1.2" />
        {/* Dashboard sweep */}
        <path d="M12 28L80 28L108 34" strokeWidth="2" strokeLinecap="round" />
        {/* Center AC Vent */}
        <rect x="80" y="24" width="16" height="8" rx="2" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "int_center_console",
    type: "interior",
    slotNumber: 6,
    title: "Center Console & Front Seats",
    subtitle: "Touchscreen & Gear Shifter",
    badge: "Inside 2",
    angleInstructions:
      "Shoot from between front headrests showing infotainment screen, AC controls, gear selector, and seat upholstery.",
    sampleUrl: "/images/mock/rear-cabin.jpg",
    svgIcon: (active) => (
      <svg
        viewBox="0 0 120 70"
        fill="none"
        className={`w-full h-20 transition-all ${
          active ? "text-violet-500 stroke-violet-500" : "text-slate-400 stroke-slate-400 dark:text-slate-600 dark:stroke-slate-600"
        }`}
      >
        {/* Center Infotainment Tablet Display */}
        <rect x="44" y="10" width="32" height="22" rx="3" strokeWidth="2.2" className="fill-slate-100/50 dark:fill-white/5" />
        <path d="M50 18L70 18M50 24L64 24" strokeWidth="1.5" strokeLinecap="round" />
        {/* Center Gear Shifter Console */}
        <path d="M42 34L78 34L74 58L46 58Z" strokeWidth="2" />
        <ellipse cx="60" cy="44" rx="4" ry="7" strokeWidth="1.8" />
        <line x1="60" y1="44" x2="60" y2="52" strokeWidth="2.5" strokeLinecap="round" />
        {/* Left & Right Bucket Seats */}
        <path d="M14 22L34 22L36 56L16 56Z" strokeWidth="1.8" rx="2" />
        <path d="M86 22L106 22L104 56L84 56Z" strokeWidth="1.8" rx="2" />
      </svg>
    ),
  },
  {
    id: "int_rear_cabin_trunk",
    type: "interior",
    slotNumber: 7,
    title: "Rear Cabin & Boot Space",
    subtitle: "Passenger Legroom & Luggage",
    badge: "Inside 3",
    angleInstructions:
      "Show clean rear passenger legroom and second-row seats, or wide view of trunk/boot showing luggage capacity.",
    sampleUrl: "/images/mock/kdh-van.jpg",
    svgIcon: (active) => (
      <svg
        viewBox="0 0 120 70"
        fill="none"
        className={`w-full h-20 transition-all ${
          active ? "text-violet-500 stroke-violet-500" : "text-slate-400 stroke-slate-400 dark:text-slate-600 dark:stroke-slate-600"
        }`}
      >
        {/* Rear passenger bench seat */}
        <rect x="20" y="24" width="80" height="26" rx="4" strokeWidth="2.2" className="fill-slate-100/50 dark:fill-white/5" />
        {/* 3 Headrests */}
        <rect x="26" y="14" width="16" height="8" rx="3" strokeWidth="1.8" />
        <rect x="52" y="14" width="16" height="8" rx="3" strokeWidth="1.8" />
        <rect x="78" y="14" width="16" height="8" rx="3" strokeWidth="1.8" />
        {/* Seat dividers & Belts */}
        <line x1="46" y1="24" x2="46" y2="50" strokeWidth="1.5" strokeDasharray="2 2" />
        <line x1="74" y1="24" x2="74" y2="50" strokeWidth="1.5" strokeDasharray="2 2" />
        {/* Luggage icon outline */}
        <rect x="48" y="52" width="24" height="14" rx="2" strokeWidth="1.6" />
        <path d="M56 52V49C56 47.9 56.9 47 58 47H62C63.1 47 64 47.9 64 49V52" strokeWidth="1.4" />
      </svg>
    ),
  },
];

// In-Web App Message Routing Categories
const MESSAGE_CATEGORIES = [
  {
    id: "instant_booking",
    title: "⚡ Instant Booking Requests",
    desc: "Direct reservation requests for confirmed dates. Immediate host approval required.",
  },
  {
    id: "general_inquiry",
    title: "💬 Pricing, Dates & Availability",
    desc: "Renters asking general questions, negotiating multi-day rates, or checking specific calendar slots.",
  },
  {
    id: "airport_pickup",
    title: "✈️ Airport Pickup & Chauffeur",
    desc: "Inquiries specifically requesting CMB Katunayake airport meet & greet or driver-assisted options.",
  },
  {
    id: "tour_package",
    title: "🗺️ Sri Lanka Road Trip & Itinerary",
    desc: "Foreign tourists seeking route advice, hill-country clearance info, or coastal drop-offs.",
  },
  {
    id: "corporate_longterm",
    title: "💼 Corporate & Monthly Rental",
    desc: "Long-term monthly rentals, expat leases, and corporate business billing inquiries.",
  },
];

// Popular Sri Lanka Pickup Locations
const POPULAR_LOCATIONS = [
  "Bandaranaike Int'l Airport (CMB) / Katunayake",
  "Colombo 03 / Colpetty & Fort",
  "Wennapuwa / Marawila Coastal Hub",
  "Negombo Beach Road",
  "Kandy City Center / Peradeniya",
  "Galle Fort & Unawatuna",
  "Bentota / Beruwala",
  "Mirissa / Weligama",
];

// Vehicle Categories with Silhouettes
const VEHICLE_CATEGORIES = [
  { id: "Sedan", label: "Sedan", desc: "Premio, Axio, Grace, C-Class", type: "sedan" },
  { id: "SUV", label: "SUV / Crossover", desc: "Vezel, Prado, CR-V, Outlander", type: "suv" },
  { id: "Luxury", label: "Luxury Executive", desc: "Mercedes, BMW, Audi, Wedding", type: "sedan" },
  { id: "Van", label: "Van / MPV (Group)", desc: "Toyota KDH, HiAce, Alphard", type: "van" },
  { id: "Hatchback", label: "Hatchback", desc: "Wagon R, Alto, Vitz, Aqua", type: "sedan" },
  { id: "Pickup", label: "Pickup 4x4", desc: "Toyota Hilux, Isuzu D-Max", type: "suv" },
  { id: "Cabriolet", label: "Cabriolet / Sport", desc: "Mustang, Coupe, Open-top", type: "sport" },
];

// Custom Animated Dropdown Option Datasets
const COUNTRY_CODES: DropdownOption[] = [
  { value: "+94", label: "Sri Lanka (+94)", icon: <span className="text-base leading-none">🇱🇰</span>, sublabel: "LK • Primary" },
  { value: "+1", label: "United States (+1)", icon: <span className="text-base leading-none">🇺🇸</span>, sublabel: "US / Canada" },
  { value: "+44", label: "United Kingdom (+44)", icon: <span className="text-base leading-none">🇬🇧</span>, sublabel: "UK / Europe" },
  { value: "+971", label: "United Arab Emirates (+971)", icon: <span className="text-base leading-none">🇦🇪</span>, sublabel: "UAE / Middle East" },
  { value: "+61", label: "Australia (+61)", icon: <span className="text-base leading-none">🇦🇺</span>, sublabel: "AUS / Oceania" },
  { value: "+91", label: "India (+91)", icon: <span className="text-base leading-none">🇮🇳</span>, sublabel: "IND • South Asia" },
  { value: "+49", label: "Germany (+49)", icon: <span className="text-base leading-none">🇩🇪</span>, sublabel: "DE • European Union" },
];

const FUEL_OPTIONS: DropdownOption[] = [
  { value: "Hybrid", label: "Hybrid (Petrol + Electric)", icon: <span className="text-sm">⚡</span>, sublabel: "High fuel economy (18-24 km/l)" },
  { value: "Petrol", label: "Petrol", icon: <span className="text-sm">⛽</span>, sublabel: "Standard 92 / 95 Octane" },
  { value: "Diesel", label: "Diesel", icon: <span className="text-sm">🛢️</span>, sublabel: "Auto / Super Diesel" },
  { value: "Electric", label: "Pure Electric (EV)", icon: <span className="text-sm">🔋</span>, sublabel: "Zero emission battery power" },
];

const SEATING_OPTIONS: DropdownOption[] = [
  { value: "4", label: "4 Passengers", sublabel: "Compact or Coupe" },
  { value: "5", label: "5 Passengers", sublabel: "Standard Sedan / Compact SUV" },
  { value: "7", label: "7 Passengers", sublabel: "3-Row Large SUV / MPV" },
  { value: "10", label: "10+ Passengers", sublabel: "Tour Group Van (KDH / HiAce)" },
];

const DOORS_OPTIONS: DropdownOption[] = [
  { value: "2", label: "2 Doors", sublabel: "Sport Coupe / Convertible" },
  { value: "4", label: "4 Doors", sublabel: "Standard 4-Door Saloon" },
  { value: "5", label: "5 Doors", sublabel: "Hatchback or SUV with Tailgate" },
];

const LOCATION_OPTIONS: DropdownOption[] = POPULAR_LOCATIONS.map((loc) => ({
  value: loc,
  label: loc,
  icon: <span className="text-sm">📍</span>,
}));

const FUEL_POLICY_OPTIONS: DropdownOption[] = [
  { value: "Full-to-Full (Recommended)", label: "Full-to-Full", badge: "Recommended", sublabel: "Renter receives full tank, returns full tank" },
  { value: "Same-as-Received", label: "Same-as-Received", sublabel: "Return with exact gauge level provided at pickup" },
];

const MILEAGE_OPTIONS: DropdownOption[] = [
  { value: "100 km/day included (LKR 55/km excess)", label: "100 km / day (Standard)", sublabel: "LKR 55/km excess mileage rate" },
  { value: "150 km/day included", label: "150 km / day (Extended)", sublabel: "Best for island-wide touring" },
  { value: "Unlimited Mileage", label: "Unlimited Mileage", badge: "Popular", sublabel: "Zero mileage caps or extra km fees" },
];

export function VehicleListingForm({
  onSuccess,
  onCancel,
}: VehicleListingFormProps) {
  // 1. Basic Info
  const [vehicleName, setVehicleName] = useState("");
  const [category, setCategory] = useState("Sedan");
  const [vehicleType, setVehicleType] = useState<"sedan" | "sport" | "suv" | "van">("sedan");
  const [transmission, setTransmission] = useState<"Automatic" | "Manual" | "Tiptronic">("Automatic");
  const [fuel, setFuel] = useState<"Hybrid" | "Petrol" | "Diesel" | "Electric">("Hybrid");
  const [seats, setSeats] = useState(5);
  const [doors, setDoors] = useState(4);
  const [dailyRate, setDailyRate] = useState(16500);

  // 2. Registration & Contact
  const [registrationDate, setRegistrationDate] = useState("2023-04-18");
  const [modelYear, setModelYear] = useState(2023);
  const [licensePlate, setLicensePlate] = useState("WP CBH-4820");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+94");
  const [phoneNumber, setPhoneNumber] = useState("77 123 4567");
  const [enableWhatsApp, setEnableWhatsApp] = useState(true);

  // 3. Location & Messaging Category
  const [pickupLocation, setPickupLocation] = useState("Bandaranaike Int'l Airport (CMB) / Katunayake");
  const [customAddress, setCustomAddress] = useState("Airport Road, Katunayake / Free Delivery within 15km");
  const [messageCategory, setMessageCategory] = useState("instant_booking");

  // 4. Features Checklist
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "Air Conditioner",
    "Apple CarPlay / Android Auto",
    "Bluetooth Audio",
    "Reverse Camera",
    "GPS Navigation",
    "24/7 Roadside Assist",
  ]);

  // 5. Photos Upload State (holds uploaded file data/preview URLs for the 7 slots)
  const [uploadedPhotos, setUploadedPhotos] = useState<{ [slotId: string]: string }>({});
  const fileInputRefs = useRef<{ [slotId: string]: HTMLInputElement | null }>({});

  // 6. Terms and Conditions
  const [fuelPolicy, setFuelPolicy] = useState("Full-to-Full (Recommended)");
  const [mileageAllowance, setMileageAllowance] = useState("100 km/day included (LKR 55/km excess)");
  const [securityDeposit, setSecurityDeposit] = useState(25000);
  const [noSmoking, setNoSmoking] = useState(true);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [minAge21, setMinAge21] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Handle Photo Upload
  const handlePhotoFileChange = (slotId: string, file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setUploadedPhotos((prev) => ({ ...prev, [slotId]: objectUrl }));
    setValidationError(null);
  };

  const handleRemovePhoto = (slotId: string) => {
    setUploadedPhotos((prev) => {
      const copy = { ...prev };
      delete copy[slotId];
      return copy;
    });
  };

  // Demo helper: Fill sample photos and dummy data for immediate testing
  const handleFillDemoData = () => {
    setVehicleName("Toyota Premio G-Superior Hybrid 2023");
    setCategory("Sedan");
    setVehicleType("sedan");
    setTransmission("Automatic");
    setFuel("Hybrid");
    setDailyRate(17500);
    setRegistrationDate("2023-06-15");
    setModelYear(2023);
    setLicensePlate("WP CBA-7921");
    setPhoneNumber("77 890 1234");
    setPickupLocation("Bandaranaike Int'l Airport (CMB) / Katunayake");
    setCustomAddress("Negombo Road, Katunayake / Free Airport Delivery");
    setMessageCategory("instant_booking");
    setSelectedFeatures([
      "Air Conditioner",
      "Apple CarPlay / Android Auto",
      "Bluetooth Audio",
      "Reverse Camera",
      "GPS Navigation",
      "Sunroof / Moonroof",
      "Leather Seats",
      "Cruise Control",
      "24/7 Roadside Assist",
    ]);

    // Populate the 7 photo slots with valid sample images
    const samples: { [id: string]: string } = {};
    PHOTO_GUIDES.forEach((guide) => {
      samples[guide.id] = guide.sampleUrl;
    });
    setUploadedPhotos(samples);
    setAgreeTerms(true);
  };

  const toggleFeature = (feat: string) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  // Form Submit Validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!vehicleName.trim()) {
      setValidationError("Please enter the vehicle make and model name.");
      return;
    }

    if (!phoneNumber.trim()) {
      setValidationError("Please enter a valid host contact phone number.");
      return;
    }

    if (!agreeTerms) {
      setValidationError("You must agree to Tourmate's Host Terms & Vehicle Quality Guarantee.");
      return;
    }

    setIsSubmitting(true);

    const exteriorPhotosList = PHOTO_GUIDES.filter((g) => g.type === "exterior").map(
      (g) => uploadedPhotos[g.id] || g.sampleUrl
    );

    const interiorPhotosList = PHOTO_GUIDES.filter((g) => g.type === "interior").map(
      (g) => uploadedPhotos[g.id] || g.sampleUrl
    );

    const newVehicle: SellerVehicle = {
      id: `sv-${Date.now()}`,
      name: vehicleName.trim(),
      category,
      year: Number(modelYear) || 2023,
      dailyRate: Number(dailyRate) || 16500,
      currency: "LKR",
      transmission: transmission === "Tiptronic" ? "Automatic" : transmission,
      fuel,
      seats: Number(seats) || 5,
      doors: Number(doors) || 4,
      location: customAddress.trim() ? `${pickupLocation} (${customAddress.trim()})` : pickupLocation,
      status: "Available",
      totalTrips: 0,
      totalEarnings: 0,
      rating: 5.0,
      type: vehicleType,
      features: selectedFeatures,
      registrationDate,
      phoneNumber: `${phoneCountryCode} ${phoneNumber}`,
      messageCategory,
      licensePlate,
      fuelPolicy,
      mileageAllowance,
      securityDeposit,
      exteriorPhotos: exteriorPhotosList,
      interiorPhotos: interiorPhotosList,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessBanner(true);

      if (onSuccess) {
        onSuccess(newVehicle);
      }
    }, 600);
  };

  const exteriorSlots = PHOTO_GUIDES.filter((g) => g.type === "exterior");
  const interiorSlots = PHOTO_GUIDES.filter((g) => g.type === "interior");
  const exteriorUploadedCount = exteriorSlots.filter((g) => !!uploadedPhotos[g.id]).length;
  const interiorUploadedCount = interiorSlots.filter((g) => !!uploadedPhotos[g.id]).length;

  return (
    <div className="w-full">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Tourmate Verified Host Marketplace</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            List Your Vehicle
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Complete the official Tourmate vehicle listing form. High-clarity photos following our 7 angle blueprints ensure 3x faster booking confirmations.
          </p>
        </div>

        {/* Demo Auto-fill Helper */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleFillDemoData}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-violet-500/30 bg-violet-50 dark:bg-violet-950/30 hover:bg-violet-100 dark:hover:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5 text-violet-500" />
            <span>Fill Sample Data & Photos</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {showSuccessBanner && (
        <div className="my-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-start gap-3 animate-in fade-in-0 duration-300">
          <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold">Vehicle Successfully Published to Fleet!</p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
              Your car is now visible in the Tourmate catalog. Renter inquiries will be routed via your selected message category and WhatsApp.
            </p>
          </div>
        </div>
      )}

      {/* Validation Error Alert */}
      {validationError && (
        <div className="my-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-semibold">{validationError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-10">
        {/* ======================================================== */}
        {/* SECTION 1: PHOTO BLUEPRINT HOLDERS (4 OUT + 3 IN)       */}
        {/* ======================================================== */}
        <div className="bg-slate-50/70 dark:bg-[#0d0d12] rounded-[30px] p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-violet-600/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                  <Camera className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Photo Gallery Blueprints (7 Required Shots)
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Follow each diagram guide below. 4 outside shots establish vehicle condition, and 3 inside shots assure comfort & hygiene.
              </p>
            </div>

            {/* Photo Completion Counter */}
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="px-3 py-1.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-slate-200">
                Exterior: {exteriorUploadedCount}/4
              </span>
              <span className="px-3 py-1.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-slate-200">
                Interior: {interiorUploadedCount}/3
              </span>
            </div>
          </div>

          {/* 1A. EXTERIOR PHOTOS (4 SLOTS) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-violet-600 text-white text-xs font-black flex items-center justify-center">
                  A
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  4 Exterior Angle Shots (From Outside)
                </h4>
              </div>
              <span className="text-xs font-medium text-slate-400">
                Front 3/4 • Rear 3/4 • Side Profile • Front Face
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {exteriorSlots.map((guide) => {
                const isUploaded = !!uploadedPhotos[guide.id];
                const previewImg = uploadedPhotos[guide.id];

                return (
                  <div
                    key={guide.id}
                    className={`relative rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                      isUploaded
                        ? "bg-white dark:bg-[#15151d] border-violet-500/50 shadow-md ring-1 ring-violet-500/30"
                        : "bg-white dark:bg-[#121217] border-slate-200 dark:border-white/10 hover:border-violet-400/50"
                    }`}
                  >
                    {/* Badge / Slot Header */}
                    <div className="p-3 pb-2 flex items-center justify-between text-xs border-b border-slate-100 dark:border-white/5">
                      <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <span className="h-4 w-4 rounded-full bg-slate-100 dark:bg-white/10 text-[10px] font-extrabold flex items-center justify-center">
                          {guide.slotNumber}
                        </span>
                        <span>{guide.title}</span>
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isUploaded
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                        }`}
                      >
                        {isUploaded ? "✓ Ready" : guide.badge}
                      </span>
                    </div>

                    {/* Preview or Blueprint Diagram */}
                    <div className="relative p-4 flex flex-col items-center justify-center min-h-[160px] bg-slate-50/50 dark:bg-black/30">
                      {isUploaded && previewImg ? (
                        <div className="relative w-full h-36 rounded-xl overflow-hidden shadow-inner">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={previewImg}
                            alt={guide.title}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(guide.id)}
                            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                            title="Remove photo"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center w-full">
                          {/* Visual Guide Wireframe */}
                          {guide.svgIcon(false)}
                          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-2 px-1">
                            {guide.subtitle}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Angle Instructions & Action */}
                    <div className="p-3 pt-2 bg-white dark:bg-[#121217] border-t border-slate-100 dark:border-white/5 flex flex-col justify-between flex-grow">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                        {guide.angleInstructions}
                      </p>

                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          ref={(el) => {
                            fileInputRefs.current[guide.id] = el;
                          }}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handlePhotoFileChange(guide.id, file);
                          }}
                        />

                        <button
                          type="button"
                          onClick={() => fileInputRefs.current[guide.id]?.click()}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            isUploaded
                              ? "bg-slate-100 dark:bg-white/10 hover:bg-slate-200 text-slate-800 dark:text-white"
                              : "bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
                          }`}
                        >
                          <Upload className="h-3.5 w-3.5" />
                          <span>{isUploaded ? "Replace Shot" : "Upload Photo"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 1B. INTERIOR PHOTOS (3 SLOTS) */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-violet-600 text-white text-xs font-black flex items-center justify-center">
                  B
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  3 Interior Cabin Shots (From Inside)
                </h4>
              </div>
              <span className="text-xs font-medium text-slate-400">
                Cockpit & Steering • Center Console & Seats • Rear Cabin & Trunk
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {interiorSlots.map((guide) => {
                const isUploaded = !!uploadedPhotos[guide.id];
                const previewImg = uploadedPhotos[guide.id];

                return (
                  <div
                    key={guide.id}
                    className={`relative rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                      isUploaded
                        ? "bg-white dark:bg-[#15151d] border-violet-500/50 shadow-md ring-1 ring-violet-500/30"
                        : "bg-white dark:bg-[#121217] border-slate-200 dark:border-white/10 hover:border-violet-400/50"
                    }`}
                  >
                    {/* Badge / Slot Header */}
                    <div className="p-3 pb-2 flex items-center justify-between text-xs border-b border-slate-100 dark:border-white/5">
                      <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <span className="h-4 w-4 rounded-full bg-slate-100 dark:bg-white/10 text-[10px] font-extrabold flex items-center justify-center">
                          {guide.slotNumber}
                        </span>
                        <span>{guide.title}</span>
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isUploaded
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                        }`}
                      >
                        {isUploaded ? "✓ Ready" : guide.badge}
                      </span>
                    </div>

                    {/* Preview or Blueprint Diagram */}
                    <div className="relative p-4 flex flex-col items-center justify-center min-h-[160px] bg-slate-50/50 dark:bg-black/30">
                      {isUploaded && previewImg ? (
                        <div className="relative w-full h-36 rounded-xl overflow-hidden shadow-inner">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={previewImg}
                            alt={guide.title}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(guide.id)}
                            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                            title="Remove photo"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center w-full">
                          {/* Visual Guide Wireframe */}
                          {guide.svgIcon(false)}
                          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-2 px-1">
                            {guide.subtitle}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Angle Instructions & Action */}
                    <div className="p-3 pt-2 bg-white dark:bg-[#121217] border-t border-slate-100 dark:border-white/5 flex flex-col justify-between flex-grow">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                        {guide.angleInstructions}
                      </p>

                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          ref={(el) => {
                            fileInputRefs.current[guide.id] = el;
                          }}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handlePhotoFileChange(guide.id, file);
                          }}
                        />

                        <button
                          type="button"
                          onClick={() => fileInputRefs.current[guide.id]?.click()}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            isUploaded
                              ? "bg-slate-100 dark:bg-white/10 hover:bg-slate-200 text-slate-800 dark:text-white"
                              : "bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
                          }`}
                        >
                          <Upload className="h-3.5 w-3.5" />
                          <span>{isUploaded ? "Replace Shot" : "Upload Photo"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 2: VEHICLE CATEGORY & TRANSMISSION TYPE          */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-white/10">
            <div className="h-9 w-9 rounded-xl bg-violet-600/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Vehicle Category & Transmission
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select category and driving transmission to target right renters
              </p>
            </div>
          </div>

          {/* Vehicle Category Selector Cards */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              Vehicle Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {VEHICLE_CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategory(cat.id);
                      setVehicleType(cat.type as "sedan" | "sport" | "suv" | "van");
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "bg-violet-50 dark:bg-violet-950/40 border-violet-600 dark:border-violet-500 ring-2 ring-violet-500/30 shadow-sm"
                        : "bg-slate-50 dark:bg-[#15151a] border-slate-200 dark:border-white/10 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {cat.label}
                      </span>
                      {isSelected && (
                        <CheckCircle className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {cat.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Make, Model Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Make & Model Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Toyota Premio G-Superior, Honda Vezel RS, Benz C200"
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Daily Rental Rate (LKR) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Daily Rate (LKR) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="5000"
                  step="500"
                  required
                  value={dailyRate}
                  onChange={(e) => setDailyRate(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 pl-8 text-sm text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Recommended for {category}: LKR 14,000 - 28,000/day</p>
            </div>
          </div>

          {/* Transmission Type Selector Pills */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
              Transmission Type *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "Automatic", label: "Automatic (AT)", desc: "Effortless drive, popular with tourists" },
                { id: "Manual", label: "Manual (MT)", desc: "5/6-Speed stick-shift transmission" },
                { id: "Tiptronic", label: "Tiptronic / CVT", desc: "Dual-clutch with steering paddle shifters" },
              ].map((item) => {
                const active = transmission === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTransmission(item.id as "Automatic" | "Manual" | "Tiptronic")}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      active
                        ? "bg-violet-50 dark:bg-violet-950/40 border-violet-600 dark:border-violet-500 ring-2 ring-violet-500/20"
                        : "bg-slate-50 dark:bg-[#15151a] border-slate-200 dark:border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.label}
                      </span>
                      {active && <CheckCircle className="h-4 w-4 text-violet-600 dark:text-violet-400" />}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {item.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fuel, Seats & Doors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Fuel Type
              </label>
              <CustomDropdown
                options={FUEL_OPTIONS}
                value={fuel}
                onChange={(val) => setFuel(val as SellerVehicle["fuel"])}
                variant="seller"
                position="auto"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Passenger Seating
              </label>
              <CustomDropdown
                options={SEATING_OPTIONS}
                value={String(seats)}
                onChange={(val) => setSeats(Number(val))}
                variant="seller"
                position="auto"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Doors Count
              </label>
              <CustomDropdown
                options={DOORS_OPTIONS}
                value={String(doors)}
                onChange={(val) => setDoors(Number(val))}
                variant="seller"
                position="auto"
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 3: DATE OF REGISTRATION & CONTACT PHONE NUMBER   */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-white/10">
            <div className="h-9 w-9 rounded-xl bg-violet-600/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Registration Records & Host Contact
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official registration details for verification and renter direct communications
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Date of Registration */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Date of Registration (CR Book) *
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={registrationDate}
                  onChange={(e) => setRegistrationDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 pl-10 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Official DMT registration date</p>
            </div>

            {/* Model Manufacturing Year */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Model Year *
              </label>
              <input
                type="number"
                min="2012"
                max="2026"
                value={modelYear}
                onChange={(e) => setModelYear(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">Year of manufacture</p>
            </div>

            {/* License Plate Registration No */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Vehicle Plate Number
              </label>
              <input
                type="text"
                placeholder="e.g. WP CBH-4820"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 uppercase tracking-wider"
              />
              <p className="text-[11px] text-slate-400 mt-1">Revealed only after booking confirmation</p>
            </div>
          </div>

          {/* Host Phone Number & WhatsApp Integration */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Host Contact Phone Number *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <CustomDropdown
                  options={COUNTRY_CODES}
                  value={phoneCountryCode}
                  onChange={setPhoneCountryCode}
                  variant="seller"
                  position="auto"
                />
              </div>

              <div className="sm:col-span-2 relative">
                <input
                  type="tel"
                  required
                  placeholder="77 123 4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 pl-10 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* WhatsApp Integration Toggle */}
            <div className="mt-3 flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                  Allow Renters to Chat directly via WhatsApp on this number
                </span>
              </div>
              <input
                type="checkbox"
                checked={enableWhatsApp}
                onChange={(e) => setEnableWhatsApp(e.target.checked)}
                className="h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 4: LOCATION OF PICKUP & IN-APP MESSAGE CATEGORY  */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-white/10">
            <div className="h-9 w-9 rounded-xl bg-violet-600/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Handover Location & In-Web App Message Category
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Where renters pick up the car and how renter chat messages are routed in your portal
              </p>
            </div>
          </div>

          {/* Pickup Hub Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Primary Handover Hub *
            </label>
            <CustomDropdown
              options={LOCATION_OPTIONS}
              value={pickupLocation}
              onChange={setPickupLocation}
              variant="seller"
              position="auto"
            />
          </div>

          {/* Detailed Street / Meeting Landmark */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Exact Address or Landmark Details
            </label>
            <input
              type="text"
              placeholder="e.g. Near Negombo Beach Road or Airport Arrivals Gate / Free Delivery within 20km"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* IN-WEB APP MESSAGE CATEGORY */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                In-Web App Message Category *
              </label>
              <span className="text-xs text-slate-400">Routes incoming renter requests</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MESSAGE_CATEGORIES.map((cat) => {
                const active = messageCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setMessageCategory(cat.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      active
                        ? "bg-violet-50 dark:bg-violet-950/40 border-violet-600 dark:border-violet-500 ring-2 ring-violet-500/20"
                        : "bg-slate-50 dark:bg-[#15151a] border-slate-200 dark:border-white/10 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {cat.title}
                      </span>
                      {active && <CheckCircle className="h-4 w-4 text-violet-600 dark:text-violet-400" />}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                      {cat.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 5: FEATURES & EQUIPMENT CHECKLIST               */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-white/10">
            <div className="h-9 w-9 rounded-xl bg-violet-600/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Vehicle Features & Inclusions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select all features installed on this vehicle to boost search visibility
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {[
              "Air Conditioner",
              "Dual Climate AC",
              "Apple CarPlay / Android Auto",
              "Bluetooth Audio",
              "GPS Navigation",
              "Reverse Camera",
              "360 Parking Sensors",
              "Sunroof / Moonroof",
              "Leather Seats",
              "Cruise Control",
              "Keyless Push Start",
              "Baby / Child Safety Seat",
              "Chauffeur Option Available",
              "Roof Luggage Rack",
              "24/7 Roadside Assist",
              "Unlimited Mileage Included",
            ].map((feat) => {
              const checked = selectedFeatures.includes(feat);
              return (
                <button
                  key={feat}
                  type="button"
                  onClick={() => toggleFeature(feat)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                    checked
                      ? "bg-violet-50 dark:bg-violet-900/30 border-violet-400 dark:border-violet-500/50 text-violet-700 dark:text-violet-300 shadow-sm"
                      : "bg-slate-50 dark:bg-[#15151a] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                  }`}
                >
                  <CheckCircle
                    className={`h-4 w-4 flex-shrink-0 ${
                      checked
                        ? "text-violet-600 dark:text-violet-400 fill-violet-600/20"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                  <span className="truncate">{feat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 6: TERMS AND CONDITIONS & HOST AGREEMENT        */}
        {/* ======================================================== */}
        <div className="bg-white dark:bg-[#0b0b0e] rounded-[30px] p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-white/10">
            <div className="h-9 w-9 rounded-xl bg-violet-600/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Terms and Conditions & Rental Rules
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Define fuel policies, deposit limits, and host protection agreements
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Fuel Policy */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Fuel Policy
              </label>
              <CustomDropdown
                options={FUEL_POLICY_OPTIONS}
                value={fuelPolicy}
                onChange={setFuelPolicy}
                variant="seller"
                position="auto"
              />
            </div>

            {/* Mileage Allowance */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Daily Mileage Allowance
              </label>
              <CustomDropdown
                options={MILEAGE_OPTIONS}
                value={mileageAllowance}
                onChange={setMileageAllowance}
                variant="seller"
                position="auto"
              />
            </div>

            {/* Refundable Deposit */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Refundable Security Deposit (LKR)
              </label>
              <input
                type="number"
                step="5000"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          {/* Rules Checkboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={noSmoking}
                onChange={(e) => setNoSmoking(e.target.checked)}
                className="h-4 w-4 text-violet-600 rounded border-slate-300 focus:ring-violet-500"
              />
              <span className="text-slate-800 dark:text-slate-200">Strict No Smoking in car</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={minAge21}
                onChange={(e) => setMinAge21(e.target.checked)}
                className="h-4 w-4 text-violet-600 rounded border-slate-300 focus:ring-violet-500"
              />
              <span className="text-slate-800 dark:text-slate-200">Renter must be 21+ with IDP</span>
            </label>

            <label className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#15151a] border border-slate-200 dark:border-white/10 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={petsAllowed}
                onChange={(e) => setPetsAllowed(e.target.checked)}
                className="h-4 w-4 text-violet-600 rounded border-slate-300 focus:ring-violet-500"
              />
              <span className="text-slate-800 dark:text-slate-200">Pets Allowed with carrier</span>
            </label>
          </div>

          {/* Host Terms of Service Agreement Checkbox */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-5 w-5 text-violet-600 rounded border-slate-300 focus:ring-violet-500 mt-0.5"
              />
              <div className="text-xs text-amber-900 dark:text-amber-300 leading-relaxed">
                <span className="font-bold">Mandatory Host Terms Agreement:</span> I certify that I am the legal owner or authorized custodian of this vehicle. I declare that the vehicle has valid Sri Lanka revenue license, comprehensive commercial insurance, and that all 7 uploaded photos accurately reflect its current physical state. I agree to the{" "}
                <span className="underline font-bold text-violet-700 dark:text-violet-400">
                  Tourmate Host Marketplace Terms & Conditions
                </span>.
              </div>
            </label>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SUBMIT ACTIONS                                           */}
        {/* ======================================================== */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>0% listing fee • 85% payout on each completed booking • Covered by Tourmate Host Guarantee</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 font-bold text-sm transition-colors text-center"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-xl shadow-violet-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? "Publishing Listing..." : "Publish Vehicle Listing"}</span>
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
