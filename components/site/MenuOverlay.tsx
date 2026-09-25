"use client";

import { useEffect, useRef } from "react";
import { identity, sections, ui, works, type Lang } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { useYakutskTime } from "@/lib/useYakutskTime";
import { BackgroundVideo } from "./BackgroundVideo";

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
  const time = useYakutskTime();
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
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-[#f7f7f5] px-4 pb-5 pt-4 text-[#111015] md:px-6 md:pb-6"
    >
      <div className="relative flex h-10 shrink-0 items-center justify-between">
        <button type="button" onClick={onClose} className="h-[32px] rounded-full border border-[#111015]/30 px-4 text-[14px] transition-colors hover:bg-[#111015] hover:text-white">
          {t(ui.close)}
        </button>
        <a href="#top" onClick={onClose} className="absolute left-1/2 -translate-x-1/2 text-[25px] font-medium tracking-[-0.045em]">
          {identity.wordmark}
        </a>
        <div className="flex items-center gap-3">
          <span className="hidden text-[12px] tabular-nums sm:block">YKS {time ?? "--:--"}</span>
          <div role="group" aria-label={t(ui.language)} className="flex rounded-full bg-black/5 p-1 text-[12px]">
          {LANGS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={lang === item.id}
              onClick={() => setLang(item.id)}
              className={`h-6 rounded-full px-2.5 transition-colors ${lang === item.id ? "bg-[#111015] text-white" : "text-[#66656a] hover:text-[#111015]"}`}
            >
              {item.label}
            </button>
          ))}
          </div>
        </div>
      </div>

      <div className="grid flex-1 gap-7 pt-10 md:min-h-0 md:grid-cols-[1fr_38%] md:gap-8 lg:grid-cols-[1fr_31%_1fr] lg:gap-12">
        <div className="flex flex-col justify-center pb-6 md:pb-0">
          <nav aria-label={t(ui.sections)} className="flex flex-col items-start">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={onClose}
                className="font-display text-[clamp(34px,3.2vw,54px)] font-light leading-[1.06] tracking-[-0.035em] transition-transform hover:translate-x-2"
              >
                {t(section.label)}
              </a>
            ))}
          </nav>

          <nav aria-label={t(ui.menuWork)} className="mt-12 flex flex-col items-start gap-1.5">
            <span className="mb-1 text-[12px] text-[#727078]">{t(ui.selectedWork)}</span>
            {works.map((work) => (
              <a key={work.id} href={`#${work.id}`} onClick={onClose} className="rounded-full bg-[#e9e9e8] px-4 py-1.5 text-[14px] transition-colors hover:bg-[#111015] hover:text-white">
                {work.link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="relative hidden min-h-0 overflow-hidden rounded-[12px] bg-[#0a0713] md:block">
          <BackgroundVideo portrait className="absolute inset-0" />
        </div>

        <div className="flex flex-col justify-center gap-2 pb-8 lg:pb-0">
          <span className="mb-3 text-[12px] text-[#727078]">{t(ui.projects)}</span>
          {works.map((work) => (
            <a key={work.id} href={`#${work.id}`} onClick={onClose} className="group flex items-center gap-3 rounded-[12px] bg-[#ebeeef] p-2.5 transition-colors hover:bg-[#dde1e3]">
              <img src={work.media.src} alt="" className="h-[78px] w-[100px] shrink-0 rounded-[6px] object-cover" />
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-medium">{work.title}</span>
                <span className="block truncate text-[12px] text-[#68666d]">{work.link.label}</span>
              </span>
              <span aria-hidden="true" className="ml-auto pr-1 text-[20px] transition-transform group-hover:translate-x-1">↗</span>
            </a>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap gap-x-6 gap-y-2 border-t border-black/15 pt-4 text-[13px] text-[#64636a]">
        <a href={`mailto:${identity.email}`} className="hover:text-[#111015]">
          {identity.email}
        </a>
        <a href={identity.telegram.href} className="hover:text-[#111015]">
          {identity.telegram.label}
        </a>
        <a href={identity.github.href} className="hover:text-[#111015]">
          {identity.github.label}
        </a>
        <span className="ml-auto">© 2026 xrtem</span>
      </div>
    </div>
  );
}
