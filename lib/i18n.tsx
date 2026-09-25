"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang, LS } from "@/content/site";

export const STORAGE_KEY = "xrtem-lang";

type Ctx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (value: LS) => string;
};

const LangContext = createContext<Ctx | null>(null);

function readStored(): Lang | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "ru" ? stored : null;
  } catch {
    return null; // storage blocked: private mode, sandboxed webviews
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // The server renders Russian, so the first client render must as well —
  // English only arrives once a stored choice is read after mount.
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const stored = readStored();
    if (stored) setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The choice holds for this visit, it just won't persist.
    }
  }, []);

  const t = useCallback((value: LS) => value[lang], [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
