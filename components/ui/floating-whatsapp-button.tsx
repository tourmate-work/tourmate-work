"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { SITE_CONTACT } from "@/lib/constants";

interface FloatingWhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export function FloatingWhatsAppButton({
  phoneNumber = SITE_CONTACT.whatsappNumber,
  defaultMessage = "Hello Tourmate! I would like to inquire about vehicle rentals in Sri Lanka.",
}: FloatingWhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="hidden md:flex fixed bottom-7 right-7 z-50 items-center gap-3">
      {/* Tooltip / Prompt bubble */}
      <div
        className={`hidden sm:flex items-center gap-2 bg-white dark:bg-[#121217] text-slate-900 dark:text-white px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200/90 dark:border-white/10 text-xs font-bold transition-all duration-300 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-90 -translate-x-1"
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span>Chat on WhatsApp</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="ml-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-full"
          title="Dismiss tooltip"
        >
          <X className="h-3 w-3" />
        </button>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contact TourMate on WhatsApp"
        className="relative group flex items-center justify-center h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/35 hover:shadow-xl hover:shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        {/* Pulsing ring animation */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400/40 animate-ping pointer-events-none group-hover:opacity-0" />

        {/* WhatsApp Icon */}
        <MessageCircle className="h-7 w-7 text-white fill-white stroke-none group-hover:scale-105 transition-transform" />
      </a>
    </div>
  );
}
