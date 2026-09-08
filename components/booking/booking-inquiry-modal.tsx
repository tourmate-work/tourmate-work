"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  User,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { LocationSearchInput } from "@/components/ui/location-search-input";
import { useLanguage } from "@/lib/i18n/language-context";
import { useAuth } from "@/components/auth/auth-context";

export interface CountryDialCode {
  code: string;
  country: string;
  flag: string;
  placeholder: string;
}

export const COUNTRY_DIAL_CODES: CountryDialCode[] = [
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰", placeholder: "077 123 4567" },
  { code: "+1", country: "USA / Canada", flag: "🇺🇸", placeholder: "555 123 4567" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧", placeholder: "7911 123456" },
  { code: "+971", country: "UAE", flag: "🇦🇪", placeholder: "50 123 4567" },
  { code: "+61", country: "Australia", flag: "🇦🇺", placeholder: "412 345 678" },
  { code: "+91", country: "India", flag: "🇮🇳", placeholder: "98765 43210" },
  { code: "+49", country: "Germany", flag: "🇩🇪", placeholder: "151 12345678" },
  { code: "+33", country: "France", flag: "🇫🇷", placeholder: "6 12 34 56 78" },
  { code: "+7", country: "Russia", flag: "🇷🇺", placeholder: "912 345 6789" },
  { code: "+86", country: "China", flag: "🇨🇳", placeholder: "138 0000 0000" },
  { code: "+81", country: "Japan", flag: "🇯🇵", placeholder: "90 1234 5678" },
  { code: "+65", country: "Singapore", flag: "🇸🇬", placeholder: "9123 4567" },
  { code: "+960", country: "Maldives", flag: "🇲🇻", placeholder: "771 2345" },
  { code: "+39", country: "Italy", flag: "🇮🇹", placeholder: "320 123 4567" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱", placeholder: "6 12345678" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭", placeholder: "78 123 45 67" },
  { code: "+", country: "Other Country", flag: "🌐", placeholder: "+Country & Number" },
];

export function validatePhoneNumber(
  rawInput: string,
  countryCode: string,
  language: string = "en"
): { isValid: boolean; formattedInternational: string; error?: string } {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      isValid: false,
      formattedInternational: "",
      error: language === "si" ? "දුරකථන අංකය ඇතුළත් කරන්න" : "Phone number is required",
    };
  }

  // Remove spaces, hyphens, parentheses, periods
  let clean = trimmed.replace(/[\s\-().]/g, "");

  // If user entered with '+' at the start
  if (clean.startsWith("+")) {
    const intDigits = clean.slice(1);
    if (!/^\d{7,15}$/.test(intDigits)) {
      return {
        isValid: false,
        formattedInternational: clean,
        error: language === "si"
          ? "වලංගු ජාත්‍යන්තර අංකයක් ඇතුළත් කරන්න (ඉලක්කම් 7-15)"
          : "Enter a valid international number (7-15 digits)",
      };
    }
    return {
      isValid: true,
      formattedInternational: `+${intDigits}`,
    };
  }

  // Sri Lanka validation (+94)
  if (countryCode === "+94") {
    if (clean.startsWith("94") && clean.length >= 11) {
      clean = clean.slice(2);
    }

    if (!/^\d+$/.test(clean)) {
      return {
        isValid: false,
        formattedInternational: "",
        error: language === "si" ? "ඉලක්කම් පමණක් ඇතුළත් කරන්න" : "Digits only",
      };
    }

    if (clean.startsWith("0")) {
      if (clean.length < 10) {
        return {
          isValid: false,
          formattedInternational: "",
          error: language === "si" 
            ? `ඉලක්කම් 10ක් විය යුතුය (${clean.length}/10)` 
            : `Must be 10 digits (${clean.length}/10)`,
        };
      }
      if (clean.length > 10) {
        return {
          isValid: false,
          formattedInternational: "",
          error: language === "si" 
            ? `ඉලක්කම් 10කට වැඩි විය නොහැක` 
            : `Too long for Sri Lanka (${clean.length}/10)`,
        };
      }

      const prefix = clean.slice(0, 3);
      const validMobiles = ["070", "071", "072", "074", "075", "076", "077", "078"];
      const isMobile = validMobiles.includes(prefix);
      const isLandline = /^(011|021|023|024|025|026|027|031|032|033|034|035|036|037|038|041|045|047|051|052|054|055|057|063|065|066|067|081|091)/.test(clean);

      if (!isMobile && !isLandline) {
        return {
          isValid: false,
          formattedInternational: "",
          error: language === "si"
            ? "වලංගු ජංගම උපසර්ගයක් ඇතුළත් කරන්න (උදා: 077, 071, 076, 074)"
            : "Invalid mobile prefix (e.g. 077, 071, 076, 074)",
        };
      }

      return {
        isValid: true,
        formattedInternational: `+94${clean.slice(1)}`,
      };
    } else {
      if (clean.length < 9) {
        return {
          isValid: false,
          formattedInternational: "",
          error: language === "si" 
            ? `ඉලක්කම් 9ක් විය යුතුය (${clean.length}/9)` 
            : `Must be 9 digits (${clean.length}/9)`,
        };
      }
      if (clean.length > 9) {
        return {
          isValid: false,
          formattedInternational: "",
          error: language === "si" 
            ? `ඉලක්කම් 9කට වැඩි විය නොහැක` 
            : `Too long (${clean.length}/9)`,
        };
      }

      const prefix = clean.slice(0, 2);
      const validMobiles = ["70", "71", "72", "74", "75", "76", "77", "78"];
      const isMobile = validMobiles.includes(prefix);
      const isLandline = /^(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)/.test(clean);

      if (!isMobile && !isLandline) {
        return {
          isValid: false,
          formattedInternational: "",
          error: language === "si"
            ? "වලංගු උපසර්ගයක් ඇතුළත් කරන්න (උදා: 77, 71, 76)"
            : "Invalid prefix (e.g. 77, 71, 76, 74)",
        };
      }

      return {
        isValid: true,
        formattedInternational: `+94${clean}`,
      };
    }
  }

  // Other country codes
  if (!/^\d+$/.test(clean)) {
    return {
      isValid: false,
      formattedInternational: "",
      error: language === "si" ? "ඉලක්කම් පමණක් ඇතුළත් කරන්න" : "Digits only",
    };
  }

  if (clean.length < 6 || clean.length > 15) {
    return {
      isValid: false,
      formattedInternational: "",
      error: language === "si"
        ? `ඉලක්කම් 6-15 අතර විය යුතුය (${clean.length})`
        : `Must be 6-15 digits (${clean.length})`,
    };
  }

  const prefixCode = countryCode === "+" ? "+" : countryCode;
  return {
    isValid: true,
    formattedInternational: `${prefixCode}${clean.replace(/^0+/, "")}`,
  };
}

export function validateEmailAddress(
  emailInput: string,
  language: string = "en"
): { isValid: boolean; error?: string } {
  const trimmed = emailInput.trim();
  if (!trimmed) {
    return {
      isValid: false,
      error: language === "si" ? "විද්‍යුත් ලිපිනය ඇතුළත් කරන්න" : "Email is required",
    };
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      error: language === "si"
        ? "වලංගු විද්‍යුත් ලිපිනයක් ඇතුළත් කරන්න (උදා: name@gmail.com)"
        : "Please enter a valid email (e.g. name@gmail.com)",
    };
  }

  const parts = trimmed.split("@");
  if (parts.length !== 2) {
    return { isValid: false, error: "Invalid email" };
  }
  const domainParts = parts[1].split(".");
  const tld = domainParts[domainParts.length - 1];
  if (!tld || tld.length < 2) {
    return {
      isValid: false,
      error: language === "si" ? "වලංගු ඩොමේනයක් ඇතුළත් කරන්න (උදා: .com, .lk)" : "Invalid domain extension (e.g. .com)",
    };
  }

  return { isValid: true };
}

export interface BookingVehicleInfo {
  id?: string;
  name: string;
  brand?: string;
  model?: string;
  category: string;
  pricePerDay: string | number;
  imageUrl?: string;
  location?: string;
  transmission?: string;
  seats?: number;
}

interface BookingInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: BookingVehicleInfo | null;
  initialPickupLocation?: string;
  initialPickupDate?: string;
  initialReturnDate?: string;
  initialMode?: "self" | "driver";
}

export function BookingInquiryModal({
  isOpen,
  onClose,
  vehicle,
  initialPickupLocation = "",
  initialPickupDate = "",
  initialReturnDate = "",
  initialMode = "self",
}: BookingInquiryModalProps) {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  // Form State
  const [fullName, setFullName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+94");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Sri Lanka");
  const [passengers, setPassengers] = useState(2);

  // Field touch states for real-time validation feedback
  const [nameTouched, setNameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  // Computed field validation status
  const isNameValid = fullName.trim().length >= 2;
  const phoneValidation = validatePhoneNumber(whatsappNumber, phoneCountryCode, language);
  const emailValidation = validateEmailAddress(email, language);

  // Auto-fill customer details from authenticated user profile if available
  useEffect(() => {
    if (isOpen && user) {
      if (user.name && user.name !== "Tourmate Member" && !user.name.startsWith("User ")) {
        setFullName((prev) => prev || user.name);
      }
      if (user.phone) {
        setWhatsappNumber((prev) => {
          if (prev) return prev;
          if (user.phone?.startsWith("+")) {
            const matched = COUNTRY_DIAL_CODES.find((c) => c.code !== "+" && user.phone!.startsWith(c.code));
            if (matched) {
              setPhoneCountryCode(matched.code);
              return user.phone!.slice(matched.code.length);
            }
          }
          return user.phone || "";
        });
      }
      if (user.email && !user.email.endsWith("@tourmate.lk")) {
        setEmail((prev) => prev || user.email);
      }
    }
  }, [isOpen, user]);

  const [pickupLocation, setPickupLocation] = useState(
    initialPickupLocation || vehicle?.location || "Bandaranaike Int'l Airport (CMB) / Katunayake"
  );
  const [returnLocation, setReturnLocation] = useState(
    initialPickupLocation || vehicle?.location || "Bandaranaike Int'l Airport (CMB) / Katunayake"
  );
  const [pickupDate, setPickupDate] = useState(initialPickupDate || "2026-09-10");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState(initialReturnDate || "2026-09-15");
  const [returnTime, setReturnTime] = useState("10:00");
  const [driverOption, setDriverOption] = useState<"self" | "driver">(initialMode);
  const [additionalMessage, setAdditionalMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState("");

  const handleCountryCodeChange = (code: string) => {
    setPhoneCountryCode(code);
    const selected = COUNTRY_DIAL_CODES.find((c) => c.code === code);
    if (selected && selected.country && selected.code !== "+") {
      if (country === "Sri Lanka" || !country.trim()) {
        setCountry(selected.country);
      }
    }
  };

  const currentDialObj = COUNTRY_DIAL_CODES.find((c) => c.code === phoneCountryCode) || COUNTRY_DIAL_CODES[0];
  const phonePlaceholder = currentDialObj.placeholder;

  if (!isOpen || !vehicle) return null;

  const buildWhatsAppMessage = (formattedPhone: string) => {
    const driverText = driverOption === "driver" ? "With Driver" : "Without Driver (Self-Drive)";
    const pLoc = pickupLocation.trim() || "Sri Lanka";
    const rLoc = returnLocation.trim() || pLoc;

    let msg = `*NEW BOOKING INQUIRY - TOURMATE RENTALS*\n\n`;
    msg += `👤 *Customer Name:* ${fullName.trim()}\n`;
    msg += `📱 *WhatsApp:* ${formattedPhone}\n`;
    msg += `📧 *Email:* ${email.trim()}\n`;
    msg += `🌍 *Country:* ${country.trim()}\n`;
    msg += `👥 *Number of Passengers:* ${passengers}\n\n`;
    msg += `🚗 *Selected Vehicle:* ${vehicle.name} (${vehicle.category})\n`;
    msg += `💰 *Daily Rate:* ${vehicle.pricePerDay}\n`;
    msg += `📍 *Pickup Location:* ${pLoc}\n`;
    msg += `📅 *Pickup Date & Time:* ${pickupDate} at ${pickupTime}\n`;
    msg += `📍 *Return Location:* ${rLoc}\n`;
    msg += `📅 *Return Date & Time:* ${returnDate} at ${returnTime}\n`;
    msg += `🧑‍✈️ *Driver Option:* ${driverText}\n`;

    if (additionalMessage.trim()) {
      msg += `\n💬 *Additional Requirements / Questions:*\n${additionalMessage.trim()}\n`;
    }

    return msg;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // 1. Validate Name
    if (!fullName.trim() || fullName.trim().length < 2) {
      setNameTouched(true);
      setErrorMessage(t("modal_err_name"));
      return;
    }

    // 2. Validate Phone
    const phoneVal = validatePhoneNumber(whatsappNumber, phoneCountryCode, language);
    if (!phoneVal.isValid) {
      setPhoneTouched(true);
      setErrorMessage(phoneVal.error || t("modal_err_phone"));
      return;
    }

    // 3. Validate Email
    const emailVal = validateEmailAddress(email, language);
    if (!emailVal.isValid) {
      setEmailTouched(true);
      setErrorMessage(emailVal.error || t("modal_err_email"));
      return;
    }

    const verifiedPhone = phoneVal.formattedInternational;
    setIsSubmitting(true);

    try {
      const pDate = new Date(`${pickupDate}T${pickupTime || "00:00"}:00`);
      const rDate = new Date(`${returnDate}T${returnTime || "00:00"}:00`);
      const validPDate = isNaN(pDate.getTime()) ? new Date() : pDate;
      const validRDate = isNaN(rDate.getTime()) ? new Date(Date.now() + 86400000 * 3) : rDate;

      // 1. Post to backend inquiries endpoint (for Admin Portal dashboard)
      const inquiryPayload = {
        name: fullName.trim(),
        email: email.trim(),
        phone: verifiedPhone,
        carModel: `${vehicle.brand ? vehicle.brand + " " : ""}${vehicle.name}`,
        carId: vehicle.id,
        pickupLocation: pickupLocation.trim() || "Sri Lanka",
        returnLocation: returnLocation.trim() || pickupLocation.trim() || "Sri Lanka",
        pickupDate: validPDate.toISOString(),
        returnDate: validRDate.toISOString(),
        date: `${pickupDate} ${pickupTime} - ${returnDate} ${returnTime}`,
        driverOption,
        passengers,
        additionalMessage: additionalMessage.trim(),
        subject: `Inquiry: ${vehicle.name} (${vehicle.category})`,
      };

      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryPayload),
      }).catch((err) => console.warn("Inquiry submission notice:", err));

      // 2. Booking ledger sync
      const bookingPayload = {
        carId: vehicle.id || "manual-inquiry",
        customerName: fullName.trim(),
        customerEmail: email.trim(),
        customerPhone: verifiedPhone,
        pickupDate: validPDate.toISOString(),
        returnDate: validRDate.toISOString(),
        pickupLocation: pickupLocation.trim() || "Sri Lanka",
        returnLocation: returnLocation.trim() || pickupLocation.trim() || "Sri Lanka",
        specialRequests: `Country: ${country} | Passengers: ${passengers} | Driver: ${
          driverOption === "driver" ? "With Driver" : "Without Driver"
        } | ${additionalMessage.trim()}`,
      };

      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      }).catch(() => null);

      // 3. Build WhatsApp URL with verified details (NO ACCOUNT CREATION)
      const waMsg = buildWhatsAppMessage(verifiedPhone);
      const directUrl = `https://wa.me/94703236834?text=${encodeURIComponent(waMsg)}`;
      setGeneratedWhatsAppUrl(directUrl);
      setIsSuccess(true);
    } catch {
      const waMsg = buildWhatsAppMessage(verifiedPhone);
      const directUrl = `https://wa.me/94703236834?text=${encodeURIComponent(waMsg)}`;
      setGeneratedWhatsAppUrl(directUrl);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0f0f13] text-slate-900 dark:text-white rounded-t-[28px] sm:rounded-[32px] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden sm:my-auto max-h-[94vh] sm:max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-slate-50/70 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-2xl bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black tracking-tight text-slate-950 dark:text-white">
                {t("modal_title")}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t("modal_subtitle")}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 flex-1 overscroll-contain">
          {/* Selected Vehicle Banner */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-100/70 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
            {vehicle.imageUrl && (
              <div className="relative h-20 w-28 rounded-xl overflow-hidden bg-white dark:bg-black flex-shrink-0">
                <Image
                  src={vehicle.imageUrl}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-violet-600 dark:text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">
                  {vehicle.category}
                </span>
                {vehicle.transmission && (
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    • {vehicle.transmission}
                  </span>
                )}
                {vehicle.seats && (
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    • {vehicle.seats} {language === "si" ? "ආසන" : "Seats"}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {vehicle.name}
              </h3>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {typeof vehicle.pricePerDay === "number"
                  ? `LKR ${vehicle.pricePerDay.toLocaleString()} / ${language === "si" ? "දිනකට" : "day"}`
                  : vehicle.pricePerDay}
              </p>
            </div>
          </div>

          {/* Success Dialog View */}
          {isSuccess ? (
            <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="h-9 w-9" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-950 dark:text-white">
                  {t("modal_success_title")}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  {t("modal_success_message")}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <a
                  href={generatedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{t("modal_btn_open_whatsapp")}</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all cursor-pointer"
                >
                  {t("modal_btn_done")}
                </button>
              </div>

              <div className="pt-4 text-xs text-slate-400 flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>
                  {language === "si"
                    ? "විනිවිද මිල ගණන් • අත්තිකාරම් අවලංගු කිරීමේ ගාස්තු නැත"
                    : "Transparent rates • No advance cancellation fees"}
                </span>
              </div>
            </div>
          ) : (
            /* Booking Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2">
                  <X className="h-4 w-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Section 1: Customer Information */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {t("modal_sec_customer")}
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {language === "si" ? "සෘජු තහවුරු කිරීම සඳහා" : "For direct confirmation"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Full Name */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        {t("modal_name")}
                      </label>
                      {isNameValid ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          {language === "si" ? "වලංගුයි" : "Valid"}
                        </span>
                      ) : nameTouched && fullName.trim() ? (
                        <span className="text-[10px] font-bold text-rose-500">
                          {language === "si" ? "අකුරු 2ක් හෝ වැඩි විය යුතුය" : "Min 2 characters"}
                        </span>
                      ) : null}
                    </div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (!nameTouched) setNameTouched(true);
                      }}
                      onBlur={() => setNameTouched(true)}
                      placeholder="e.g. Johnathan Silva"
                      className={`w-full px-3.5 py-2.5 text-xs font-semibold rounded-2xl bg-slate-50 dark:bg-white/5 border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        isNameValid
                          ? "border-emerald-500/60 focus:ring-emerald-500 bg-emerald-500/[0.02]"
                          : nameTouched && fullName.trim()
                          ? "border-rose-400 focus:ring-rose-500 bg-rose-500/[0.02]"
                          : "border-slate-200 dark:border-white/10 focus:ring-violet-600"
                      }`}
                    />
                  </div>

                  {/* WhatsApp / Phone Number with Country Code */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        {t("modal_whatsapp")}
                      </label>
                      {phoneValidation.isValid ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          {t("modal_phone_valid")}
                        </span>
                      ) : phoneTouched && whatsappNumber.trim() ? (
                        <span className="text-[10px] font-bold text-rose-500 truncate max-w-[170px]" title={phoneValidation.error}>
                          {phoneValidation.error}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex items-stretch gap-1.5">
                      {/* Country Code Dropdown */}
                      <div className="relative flex-shrink-0">
                        <select
                          value={phoneCountryCode}
                          onChange={(e) => handleCountryCodeChange(e.target.value)}
                          className="h-full pl-2.5 pr-6 py-2.5 text-xs font-bold rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer"
                        >
                          {COUNTRY_DIAL_CODES.map((c) => (
                            <option
                              key={c.code + c.country}
                              value={c.code}
                              className="dark:bg-[#15151a] text-slate-900 dark:text-white"
                            >
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[9px]">
                          ▼
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-emerald-600" />
                        <input
                          type="tel"
                          required
                          value={whatsappNumber}
                          onChange={(e) => {
                            setWhatsappNumber(e.target.value);
                            if (!phoneTouched) setPhoneTouched(true);
                          }}
                          onBlur={() => setPhoneTouched(true)}
                          placeholder={phonePlaceholder}
                          className={`w-full pl-8 pr-3 py-2.5 text-xs font-semibold rounded-2xl bg-slate-50 dark:bg-white/5 border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                            phoneValidation.isValid
                              ? "border-emerald-500/60 focus:ring-emerald-500 bg-emerald-500/[0.02]"
                              : phoneTouched && whatsappNumber.trim()
                              ? "border-rose-400 focus:ring-rose-500 bg-rose-500/[0.02]"
                              : "border-slate-200 dark:border-white/10 focus:ring-emerald-500"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                        {t("modal_email")}
                      </label>
                      {emailValidation.isValid ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          {t("modal_email_valid")}
                        </span>
                      ) : emailTouched && email.trim() ? (
                        <span className="text-[10px] font-bold text-rose-500 truncate max-w-[170px]" title={emailValidation.error}>
                          {emailValidation.error}
                        </span>
                      ) : null}
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (!emailTouched) setEmailTouched(true);
                        }}
                        onBlur={() => setEmailTouched(true)}
                        placeholder="e.g. yourname@gmail.com"
                        className={`w-full pl-9 pr-3.5 py-2.5 text-xs font-semibold rounded-2xl bg-slate-50 dark:bg-white/5 border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          emailValidation.isValid
                            ? "border-emerald-500/60 focus:ring-emerald-500 bg-emerald-500/[0.02]"
                            : emailTouched && email.trim()
                            ? "border-rose-400 focus:ring-rose-500 bg-rose-500/[0.02]"
                            : "border-slate-200 dark:border-white/10 focus:ring-violet-600"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Country & Passengers */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        {t("modal_country")}
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder={t("modal_country")}
                        className="w-full px-3 py-2.5 text-xs font-semibold rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        {t("modal_passengers")}
                      </label>
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        className="w-full px-3 py-2.5 text-xs font-semibold rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                          <option key={num} value={num} className="dark:bg-[#15151a] text-slate-900 dark:text-white">
                            {num} {num === 1 ? t("modal_passenger_single") : t("modal_passenger_plural")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Rental Information */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      {t("modal_sec_rental")}
                    </h4>
                  </div>

                  {/* Driver Option Toggle */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/10 p-1 rounded-full text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setDriverOption("self")}
                      className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        driverOption === "self"
                          ? "bg-white dark:bg-black text-slate-950 dark:text-white shadow-xs"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      {t("search_mode_self")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDriverOption("driver")}
                      className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        driverOption === "driver"
                          ? "bg-white dark:bg-black text-slate-950 dark:text-white shadow-xs"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      {t("search_mode_driver")}
                    </button>
                  </div>
                </div>

                {/* Pickup Location */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    {t("modal_pickup_loc")}
                  </label>
                  <LocationSearchInput
                    value={pickupLocation}
                    onChange={setPickupLocation}
                    placeholder={t("search_pickup_placeholder")}
                    variant="catalog"
                  />
                </div>

                {/* Dates & Times Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Pickup Date & Time */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-violet-600 dark:text-violet-400 block">
                      {t("modal_pickup_schedule")}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">{t("modal_date")}</label>
                        <input
                          type="date"
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">{t("modal_time")}</label>
                        <input
                          type="time"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Return Date & Time */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-violet-600 dark:text-violet-400 block">
                      {t("modal_return_schedule")}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">{t("modal_date")}</label>
                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">{t("modal_time")}</label>
                        <input
                          type="time"
                          value={returnTime}
                          onChange={(e) => setReturnTime(e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Return Location */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    {t("modal_return_loc")}
                  </label>
                  <LocationSearchInput
                    value={returnLocation}
                    onChange={setReturnLocation}
                    placeholder={t("search_pickup_placeholder")}
                    variant="catalog"
                  />
                </div>
              </div>

              {/* Section 3: Additional Requirements */}
              <div className="space-y-2 pt-2">
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  {t("modal_additional_notes")}
                </label>
                <textarea
                  rows={2}
                  value={additionalMessage}
                  onChange={(e) => setAdditionalMessage(e.target.value)}
                  placeholder={t("modal_additional_placeholder")}
                  className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-black text-sm py-4 rounded-full shadow-lg shadow-amber-500/25 transition-all duration-200 transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                      <span>{t("modal_submitting")}</span>
                    </span>
                  ) : (
                    <>
                      <span>{t("modal_btn_submit")}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2">
                  {t("modal_no_payment_notice")}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
