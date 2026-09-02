"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface CustomDatePickerProps {
  value: string; // "YYYY-MM-DD"
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: "light" | "purple";
  position?: "top" | "bottom" | "auto";
  className?: string;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function CustomDatePicker({
  value,
  onChange,
  placeholder = "Select date",
  variant = "light",
  position = "bottom",
  className = "",
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [effectivePosition, setEffectivePosition] = useState<"top" | "bottom">(
    position === "top" ? "top" : "bottom"
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial date or fallback to current
  const parsedDate = value ? new Date(value + "T00:00:00") : new Date();
  const [viewYear, setViewYear] = useState(
    isNaN(parsedDate.getTime()) ? 2026 : parsedDate.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    isNaN(parsedDate.getTime()) ? 8 : parsedDate.getMonth()
  );

  useEffect(() => {
    if (isOpen) {
      if (position === "auto" && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < 320 && rect.top > 320) {
          setEffectivePosition("top");
        } else {
          setEffectivePosition("bottom");
        }
      } else {
        setEffectivePosition(position === "top" ? "top" : "bottom");
      }
    }
  }, [isOpen, position]);

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

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleSelectDay = (day: number, monthOffset = 0) => {
    let targetMonth = viewMonth + monthOffset;
    let targetYear = viewYear;

    if (targetMonth < 0) {
      targetMonth = 11;
      targetYear -= 1;
    } else if (targetMonth > 11) {
      targetMonth = 0;
      targetYear += 1;
    }

    const formattedMonth = String(targetMonth + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
    const formattedDate = `${targetYear}-${formattedMonth}-${formattedDay}`;

    onChange(formattedDate);
    setIsOpen(false);
  };

  const handleSelectToday = () => {
    const today = new Date();
    const formattedMonth = String(today.getMonth() + 1).padStart(2, "0");
    const formattedDay = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${today.getFullYear()}-${formattedMonth}-${formattedDay}`;

    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    onChange(formattedDate);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setIsOpen(false);
  };

  // Calendar calculations
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const prevMonthDays = [];
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    prevMonthDays.push(daysInPrevMonth - i);
  }

  const currentMonthDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push(i);
  }

  const totalDisplayed = prevMonthDays.length + currentMonthDays.length;
  const nextMonthDaysCount = (7 - (totalDisplayed % 7)) % 7;
  const nextMonthDays = [];
  for (let i = 1; i <= nextMonthDaysCount; i++) {
    nextMonthDays.push(i);
  }

  const formatDisplayValue = (val: string) => {
    if (!val) return placeholder;
    const d = new Date(val + "T00:00:00");
    if (isNaN(d.getTime())) return val;
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    const d = new Date(value + "T00:00:00");
    return (
      d.getFullYear() === viewYear &&
      d.getMonth() === viewMonth &&
      d.getDate() === day
    );
  };

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
        <span className="truncate pr-2">{formatDisplayValue(value)}</span>
        <CalendarIcon
          className={`h-4 w-4 flex-shrink-0 ${
            isPurple ? "text-violet-200" : "text-slate-400"
          }`}
        />
      </button>

      {/* Calendar Dropdown Popover */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 z-50 bg-white rounded-[24px] shadow-2xl border border-slate-100 p-4 w-full sm:min-w-[280px] max-w-[320px] animate-in fade-in-0 zoom-in-95 duration-150 ${
            effectivePosition === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {/* Calendar Header: Month/Year + Navigation */}
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-sm font-bold text-slate-900">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous month"
                className="h-7 w-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next month"
                className="h-7 w-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Weekday Row */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {WEEKDAY_NAMES.map((weekday) => (
              <span
                key={weekday}
                className="text-[11px] font-semibold text-slate-400 block py-1"
              >
                {weekday}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Previous Month Days */}
            {prevMonthDays.map((day) => (
              <button
                key={`prev-${day}`}
                type="button"
                onClick={() => handleSelectDay(day, -1)}
                className="h-8 w-8 mx-auto text-xs text-slate-300 hover:bg-slate-100 rounded-xl flex items-center justify-center transition-colors"
              >
                {day}
              </button>
            ))}

            {/* Current Month Days */}
            {currentMonthDays.map((day) => {
              const active = isSelected(day);
              return (
                <button
                  key={`curr-${day}`}
                  type="button"
                  onClick={() => handleSelectDay(day, 0)}
                  className={`h-8 w-8 mx-auto text-xs font-semibold rounded-xl flex items-center justify-center transition-all ${
                    active
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/30 scale-105"
                      : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {day}
                </button>
              );
            })}

            {/* Next Month Days */}
            {nextMonthDays.map((day) => (
              <button
                key={`next-${day}`}
                type="button"
                onClick={() => handleSelectDay(day, 1)}
                className="h-8 w-8 mx-auto text-xs text-slate-300 hover:bg-slate-100 rounded-xl flex items-center justify-center transition-colors"
              >
                {day}
              </button>
            ))}
          </div>

          {/* Bottom Actions: Clear & Today */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
            <button
              type="button"
              onClick={handleClear}
              className="text-slate-400 hover:text-slate-700 transition-colors px-1 py-0.5"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleSelectToday}
              className="text-violet-600 hover:text-violet-700 transition-colors px-1 py-0.5"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
