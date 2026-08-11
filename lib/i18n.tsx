"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang, LS } from "@/content/site";

const STORAGE_KEY = "xrtem-lang";

type Ctx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (value: LS) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore the stored preference, otherwise take the hint from the browser.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ru") {
      setLangState(stored);
      return;
    }
    if (navigator.language.toLowerCase().startsWith("ru")) setLangState("ru");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const t = useCallback((value: LS) => value[lang], [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
