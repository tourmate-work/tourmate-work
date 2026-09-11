"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "header" | "mobile";
}

export function LanguageSwitcher({ variant = "header" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  if (variant === "mobile") {
    return (
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 flex items-center justify-center">
            <Globe className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">
              භාෂාව / Language
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              {language === "en" ? "English" : "සිංහල (Sinhala)"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#15151a] rounded-xl border border-slate-200 dark:border-white/10 shadow-xs">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              language === "en"
                ? "bg-violet-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage("si")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              language === "si"
                ? "bg-violet-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            සිං
          </button>
        </div>
      </div>
    );
  }

  // Desktop Header Pill Switcher
  return (
    <div
      className="inline-flex items-center p-0.5 rounded-full bg-slate-100/90 dark:bg-[#16161a] border border-slate-200/80 dark:border-white/10 shadow-xs flex-shrink-0"
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        title="Switch to English"
        className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
          language === "en"
            ? "bg-white dark:bg-white/15 text-slate-950 dark:text-white shadow-xs"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => setLanguage("si")}
        title="සිංහල භාෂාවට මාරු වන්න"
        className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
          language === "si"
            ? "bg-violet-600 text-white shadow-xs"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        සිං
      </button>
    </div>
  );
}
