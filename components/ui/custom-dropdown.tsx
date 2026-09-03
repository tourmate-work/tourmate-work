"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  badge?: string;
}

export interface CustomDropdownProps {
  options: (string | DropdownOption)[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: "light" | "purple" | "seller" | "default";
  position?: "top" | "bottom" | "auto";
  className?: string;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
}

export function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Select option",
  variant = "seller",
  position = "auto",
  className = "",
  leftIcon,
  disabled = false,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [effectivePosition, setEffectivePosition] = useState<"top" | "bottom">(
    position === "top" ? "top" : "bottom"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: DropdownOption[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find(
    (opt) => String(opt.value) === String(value)
  );

  // Smart upward/downward auto-positioning
  useEffect(() => {
    if (isOpen) {
      if (position === "auto" && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < 280 && rect.top > 280) {
          setEffectivePosition("top");
        } else {
          setEffectivePosition("bottom");
        }
      } else {
        setEffectivePosition(position === "top" ? "top" : "bottom");
      }
    }
  }, [isOpen, position]);

  // Click outside & Escape key listeners
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isPurple = variant === "purple";
  const isLight = variant === "light";

  // Base Trigger Styles
  let triggerStyle =
    "w-full flex items-center justify-between text-left text-xs sm:text-sm font-medium rounded-2xl px-4 py-3 transition-all duration-200 border cursor-pointer select-none";

  if (isPurple) {
    triggerStyle += ` bg-violet-700/80 hover:bg-violet-700 border-violet-500/60 text-white focus:ring-2 focus:ring-white/40 ${
      isOpen ? "ring-2 ring-white/40 shadow-lg" : ""
    }`;
  } else if (isLight) {
    triggerStyle += ` bg-slate-100/90 hover:bg-slate-100 dark:bg-white/10 dark:hover:bg-white/15 border-slate-200 dark:border-white/10 text-slate-800 dark:text-white focus:ring-2 focus:ring-violet-500 ${
      isOpen ? "ring-2 ring-violet-500 border-violet-500 shadow-md" : ""
    }`;
  } else {
    // Seller & Default style
    triggerStyle += ` bg-slate-50 hover:bg-slate-100/80 dark:bg-[#15151a] dark:hover:bg-[#1c1c24] border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 ${
      isOpen ? "ring-2 ring-violet-500/40 border-violet-500 dark:border-violet-400 shadow-md" : ""
    }`;
  }

  if (disabled) {
    triggerStyle += " opacity-50 cursor-not-allowed pointer-events-none";
  }

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={triggerStyle}
      >
        <div className="flex items-center gap-2.5 truncate pr-2">
          {leftIcon && <span className="flex-shrink-0 text-slate-400 dark:text-slate-400">{leftIcon}</span>}
          {selectedOption?.icon && (
            <span className="flex-shrink-0 flex items-center">{selectedOption.icon}</span>
          )}
          <span className="truncate font-semibold">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 transition-transform duration-250 ease-out ${
            isPurple
              ? "text-violet-200"
              : isOpen
              ? "text-violet-600 dark:text-violet-400 rotate-180"
              : "text-slate-400 dark:text-slate-400"
          }`}
        />
      </button>

      {/* Animated Dropdown Menu Popover */}
      {isOpen && (
        <div
          ref={menuRef}
          role="listbox"
          className={`absolute left-0 right-0 z-50 rounded-2xl shadow-2xl border overflow-hidden p-1.5 max-h-64 overflow-y-auto backdrop-blur-xl transition-all duration-200 ${
            effectivePosition === "top"
              ? "bottom-full mb-2 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 duration-200 ease-out"
              : "top-full mt-2 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200 ease-out"
          } ${
            isPurple
              ? "bg-violet-950/95 border-violet-700/70 text-white"
              : "bg-white/95 dark:bg-[#121217]/95 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white"
          }`}
        >
          {normalizedOptions.map((opt) => {
            const isSelected = String(opt.value) === String(value);

            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs sm:text-sm rounded-xl transition-all duration-150 my-0.5 group cursor-pointer ${
                  isSelected
                    ? isPurple
                      ? "bg-violet-800 text-white font-bold"
                      : "bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 font-bold"
                    : isPurple
                    ? "text-violet-200 hover:bg-violet-900/60 hover:text-white font-medium"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-950 dark:hover:text-white font-medium"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {opt.icon && (
                    <span className="flex-shrink-0 flex items-center">{opt.icon}</span>
                  )}
                  <div className="flex flex-col truncate">
                    <span className="truncate">{opt.label}</span>
                    {opt.sublabel && (
                      <span
                        className={`text-[11px] truncate mt-0.5 ${
                          isSelected
                            ? isPurple
                              ? "text-violet-200"
                              : "text-violet-600 dark:text-violet-400"
                            : "text-slate-400 dark:text-slate-500"
                        }`}
                      >
                        {opt.sublabel}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  {opt.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700/40">
                      {opt.badge}
                    </span>
                  )}
                  {isSelected && (
                    <Check
                      className={`h-4 w-4 animate-in zoom-in-75 duration-150 ${
                        isPurple ? "text-white" : "text-violet-600 dark:text-violet-400"
                      }`}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
