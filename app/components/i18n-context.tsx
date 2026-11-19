"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Locale = "zh" | "en";

interface I18nContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "zh",
  setLocale: () => {},
  toggleLocale: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh");

  useEffect(() => {
    const saved = localStorage.getItem("tea-locale");
    if (saved === "en" || saved === "zh") {
      setLocaleState(saved);
      document.documentElement.lang = saved === "zh" ? "zh-CN" : "en";
    } else if (navigator.language && !navigator.language.toLowerCase().startsWith("zh")) {
      setLocaleState("en");
      document.documentElement.lang = "en";
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem("tea-locale", next);
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
  };

  const toggleLocale = () => setLocale(locale === "zh" ? "en" : "zh");

  return (
    <I18nContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
