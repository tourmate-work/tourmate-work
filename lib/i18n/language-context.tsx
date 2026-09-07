"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Language, translations, TranslationKey } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tourmate_lang") as Language | null;
      if (stored === "en" || stored === "si") {
        setLanguageState(stored);
        document.documentElement.lang = stored;
      }
    } catch {
      // Fallback silently
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("tourmate_lang", lang);
      document.documentElement.lang = lang;
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "si" : "en");
  }, [language, setLanguage]);

  const t = useCallback(
    (key: TranslationKey, fallback?: string): string => {
      const entry = translations[key];
      if (!entry) return fallback || String(key);
      return entry[language] || entry.en || fallback || String(key);
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Provide a safe fallback if accessed outside provider
    return {
      language: "en" as Language,
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (key: TranslationKey, fallback?: string) => {
        const entry = translations[key];
        return (entry ? entry.en : fallback) || String(key);
      },
    };
  }
  return context;
}
