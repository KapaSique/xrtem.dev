"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { identity, nav } from "@/content/site";
import { useLang } from "@/lib/i18n";

export function Header() {
  const { lang, setLang, t } = useLang();
  const [lifted, setLifted] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => setLifted(value > 48));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        lifted ? "border-b border-line bg-paper/78 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a href="#top" className="label !text-ink hover:opacity-60 transition-opacity duration-300">
          {identity.domain}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="label link-draw hover:!text-ink transition-colors duration-300">
              {t(item.label)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1" role="group" aria-label="Language">
          {(["en", "ru"] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className={`label px-1.5 py-1 transition-colors duration-300 ${
                lang === code ? "!text-ink" : "hover:!text-ink-soft"
              }`}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
