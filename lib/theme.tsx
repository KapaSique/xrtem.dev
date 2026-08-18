"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type ThemeMode = "system" | "light" | "dark";
export type Resolved = "light" | "dark";

const STORAGE_KEY = "xrtem-theme";

type Ctx = {
  /** What the visitor picked. */
  mode: ThemeMode;
  /** What that resolves to right now — never "system". */
  resolved: Resolved;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<Ctx | null>(null);

/**
 * Applied to <html> as data-theme. The CSS never sees "system": the
 * media query is resolved here and written out as a concrete value, so
 * a single attribute drives every token.
 */
function apply(resolved: Resolved) {
  document.documentElement.dataset.theme = resolved;
}

function systemPrefers(): Resolved {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Matches what the pre-hydration script in <head> already painted.
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [resolved, setResolved] = useState<Resolved>("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial: ThemeMode =
      stored === "light" || stored === "dark" || stored === "system" ? stored : "system";

    setModeState(initial);
    const next = initial === "system" ? systemPrefers() : initial;
    setResolved(next);
    apply(next);
  }, []);

  // Follow the OS while the visitor has not overridden it.
  useEffect(() => {
    if (mode !== "system") return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      const next = systemPrefers();
      setResolved(next);
      apply(next);
    };
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [mode]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    const value = next === "system" ? systemPrefers() : next;
    setResolved(value);
    apply(value);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, resolved, setMode }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Ctx {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

/**
 * Runs before the first paint, straight from <head>. Without it the
 * page renders light for a frame and then flips — the flash is far more
 * jarring on a dark-mode device than the theme being briefly wrong.
 */
export const themeBootScript = `(function(){try{
var m=localStorage.getItem('${STORAGE_KEY}')||'system';
var d=m==='dark'||(m==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);
document.documentElement.dataset.theme=d?'dark':'light';
}catch(e){document.documentElement.dataset.theme='light';}})();`;
