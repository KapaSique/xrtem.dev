"use client";

import { useEffect, useRef } from "react";
import { identity, sections, ui, type Lang } from "@/content/site";
import { useLang } from "@/lib/i18n";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const LANGS: { id: Lang; label: string }[] = [
  { id: "ru", label: "RU" },
  { id: "en", label: "EN" },
];

/** Full-screen index: sections, the language switch and the contacts. */
export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const { t, lang, setLang } = useLang();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a,button")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      // Keep Tab inside the dialog.
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>("a,button"));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label={t(ui.menu)}
      className="fixed inset-0 z-50 flex flex-col bg-ink px-4 pb-8 pt-4 text-fg md:px-6"
    >
      <div className="flex h-10 items-center justify-between">
        <button type="button" onClick={onClose} className="h-[30px] rounded-full bg-chip px-4 text-[14px] transition-colors hover:bg-white/20">
          {t(ui.close)}
        </button>
        <div role="group" aria-label={t(ui.language)} className="flex rounded-full bg-chip p-1 text-[13px]">
          {LANGS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={lang === item.id}
              onClick={() => setLang(item.id)}
              className={`h-6 rounded-full px-3 transition-colors ${lang === item.id ? "bg-fg text-ink" : "text-muted hover:text-fg"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <nav aria-label={t(ui.sections)} className="mt-auto flex flex-col">
        {sections.map((section, i) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={onClose}
            className="flex items-baseline gap-6 border-t border-line py-4 font-display text-[clamp(44px,8vw,96px)] font-light leading-none tracking-[-0.03em] transition-opacity hover:opacity-70"
          >
            <span className="font-sans text-[14px] text-muted">{String(i + 1).padStart(2, "0")}</span>
            {t(section.label)}
          </a>
        ))}
      </nav>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-muted">
        <a href={`mailto:${identity.email}`} className="hover:text-fg">
          {identity.email}
        </a>
        <a href={identity.telegram.href} className="hover:text-fg">
          {identity.telegram.label}
        </a>
        <a href={identity.github.href} className="hover:text-fg">
          {identity.github.label}
        </a>
      </div>
    </div>
  );
}
