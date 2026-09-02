"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: (string | DropdownOption)[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: "light" | "purple";
  className?: string;
}

export function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Select option",
  variant = "light",
  className = "",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: DropdownOption[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPurple = variant === "purple";

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between text-left text-xs sm:text-sm font-medium rounded-[20px] px-4 py-3 transition-all duration-200 border ${
          isPurple
            ? "bg-violet-700/80 hover:bg-violet-700 border-violet-500/60 text-white focus:ring-2 focus:ring-white/40"
            : "bg-slate-100/90 hover:bg-slate-100 border-slate-200 text-slate-700 focus:ring-2 focus:ring-violet-500"
        } ${isOpen ? (isPurple ? "ring-2 ring-white/40" : "ring-2 ring-violet-500") : ""}`}
      >
        <span className="truncate pr-2">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${
            isPurple ? "text-violet-200" : "text-slate-400"
          } ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-[20px] shadow-2xl border border-slate-100 overflow-hidden py-1.5 max-h-60 overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-150">
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-xs sm:text-sm transition-colors ${
                  isSelected
                    ? "bg-violet-50 text-violet-700 font-bold"
                    : "text-slate-700 hover:bg-slate-50 font-medium"
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && (
                  <Check className="h-4 w-4 text-violet-600 flex-shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
