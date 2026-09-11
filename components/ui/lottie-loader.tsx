"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Car } from "lucide-react";

interface LottieLoaderProps {
  title?: string;
  subtitle?: string;
  variant?: "inline" | "card" | "fullscreen";
  className?: string;
}

export const LOTTIE_ANIMATION_URL =
  "https://lottie.host/embed/42ceafb8-c7f2-4422-b55b-26a69012cd65/ABJKa08iHr.lottie";

export function LottieLoader({
  title = "Finding Available Vehicles...",
  subtitle = "Fetching live fleet availability, specs, and best daily rates across Sri Lanka",
  variant = "card",
  className = "",
}: LottieLoaderProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Safeguard: make iframe visible after 800ms regardless of iframe onLoad event
  useEffect(() => {
    const t = setTimeout(() => setIframeLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  const renderAnimation = (sizeClass: string) => (
    <div className={`relative ${sizeClass} overflow-hidden pointer-events-none flex items-center justify-center`}>
      {/* Background Pulse Animation while iframe loads */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
          iframeLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-violet-600/10 dark:bg-violet-400/10 border border-violet-500/20 flex items-center justify-center animate-bounce shadow-inner">
          <Car className="w-7 h-7 text-violet-600 dark:text-violet-400" />
        </div>
      </div>

      {/* Lottie Embed Iframe */}
      <iframe
        src={LOTTIE_ANIMATION_URL}
        className={`w-full h-full border-0 pointer-events-none bg-transparent transition-opacity duration-300 ${
          iframeLoaded ? "opacity-100" : "opacity-90"
        }`}
        title="Tourmate Loading Animation"
        loading="eager"
        allow="autoplay"
        onLoad={() => setIframeLoaded(true)}
      />
    </div>
  );

  if (variant === "fullscreen") {
    return (
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 dark:bg-[#0b0b0e]/95 backdrop-blur-md px-4 transition-all duration-300 ${className}`}
      >
        <div className="relative flex flex-col items-center max-w-sm text-center">
          {/* Animated Glow Backdrop */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 blur-2xl animate-pulse pointer-events-none" />

          {/* Lottie Animation Frame */}
          {renderAnimation("w-52 h-52 sm:w-64 sm:h-64 min-h-[200px]")}

          {/* Engaging Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-violet-500/10 dark:bg-violet-400/10 border border-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-bold mb-3 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 animate-spin text-violet-600 dark:text-violet-400" />
            <span>TourMate Sri Lanka</span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            {subtitle}
          </p>

          {/* Subtle Progress Bar */}
          <div className="w-44 h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden mt-5">
            <div className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`flex flex-col items-center justify-center py-6 text-center ${className}`}>
        {renderAnimation("w-36 h-36 sm:w-44 sm:h-44 min-h-[140px]")}
        <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
          {title}
        </p>
      </div>
    );
  }

  // Default "card" variant for car listings and search results
  return (
    <div
      className={`w-full py-12 sm:py-16 px-4 rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-slate-50/90 via-white to-slate-50/70 dark:from-[#111116] dark:via-[#0e0e12] dark:to-[#111116] border border-slate-200/90 dark:border-white/10 shadow-sm text-center flex flex-col items-center justify-center relative overflow-hidden ${className}`}
    >
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Lottie Animation */}
      {renderAnimation("w-48 h-48 sm:w-60 sm:h-60 min-h-[190px]")}

      {/* Badge & Text */}
      <div className="relative z-10 max-w-md mx-auto mt-2 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20 text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-400 animate-ping" />
          <span>Live Fleet Search</span>
        </div>

        <h3 className="text-base sm:text-xl font-black text-slate-950 dark:text-white tracking-tight">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
          {subtitle}
        </p>

        {/* Shimmer line */}
        <div className="w-36 h-1 bg-slate-200/70 dark:bg-white/10 rounded-full overflow-hidden mx-auto mt-4">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-violet-600 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}
