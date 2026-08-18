"use client";

import { useTheme, type ThemeMode } from "@/lib/theme";
import { useLang } from "@/lib/i18n";

const ICONS: Record<ThemeMode, React.ReactNode> = {
  system: (
    // Half-filled disc — the device decides.
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5">
      <circle cx="8" cy="8" r="5.25" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 2.75a5.25 5.25 0 0 1 0 10.5z" fill="currentColor" />
    </svg>
  ),
  light: (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 1.4v1.5M8 13.1v1.5M14.6 8h-1.5M2.9 8H1.4M12.67 3.33l-1.06 1.06M4.39 11.61l-1.06 1.06M12.67 12.67l-1.06-1.06M4.39 4.39L3.33 3.33"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5">
      <path
        d="M13.2 9.6A5.6 5.6 0 0 1 6.4 2.8a5.6 5.6 0 1 0 6.8 6.8z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const MODES: ThemeMode[] = ["system", "light", "dark"];

/**
 * Three-state control rather than a toggle: "follow the device" is a
 * real choice, and a two-way switch silently discards it the first time
 * it is touched.
 */
export function ThemeToggle() {
  const { mode, setMode } = useTheme();
  const { t } = useLang();

  const labels: Record<ThemeMode, string> = {
    system: t({ en: "System theme", ru: "Как в системе" }),
    light: t({ en: "Light theme", ru: "Светлая тема" }),
    dark: t({ en: "Dark theme", ru: "Тёмная тема" }),
  };

  return (
    <div className="fixed bottom-5 right-4 z-40 md:bottom-6 md:right-6">
      <div className="glass r-pill flex items-center gap-0.5 p-1">
        {MODES.map((value) => {
          const active = mode === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              aria-pressed={active}
              aria-label={labels[value]}
              title={labels[value]}
              className={`press grid h-8 w-8 place-items-center rounded-full transition-colors duration-400 ${
                active
                  ? "bg-silver-50 text-graphite-900"
                  : "text-graphite-400 hover:text-graphite-600"
              }`}
            >
              {ICONS[value]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
