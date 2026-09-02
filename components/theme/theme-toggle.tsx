"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`h-10 w-10 rounded-full border border-slate-200 dark:border-white/10 ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
        isDark
          ? "bg-[#16161a] hover:bg-[#202026] text-amber-400 border-white/15 shadow-inner"
          : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 shadow-sm"
      } ${className} active:scale-95`}
    >
      <div className="relative h-5 w-5">
        <Sun
          className={`h-5 w-5 absolute inset-0 transition-all duration-500 transform ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 text-amber-500"
          }`}
        />
        <Moon
          className={`h-5 w-5 absolute inset-0 transition-all duration-500 transform ${
            isDark
              ? "rotate-0 scale-100 opacity-100 text-amber-400"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
