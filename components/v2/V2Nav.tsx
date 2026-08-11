"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { identity } from "@/content/site";
import { v2hero, v2nav } from "@/content/v2";
import { useLang } from "@/lib/i18n";
import { ScrollProgress } from "@/components/v2/bits";

export function V2Nav() {
  const { lang, setLang, t } = useLang();
  const [lifted, setLifted] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setLifted(v > 40));

  return (
    /* A translucent floating layer with content scrolling under it —
       not an opaque bar that eats a fixed strip of the viewport. */
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        lifted ? "bg-graphite-900/70 backdrop-blur-xl backdrop-saturate-150" : "bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          className="v2-label text-mist-100 transition-opacity duration-300 hover:opacity-65"
        >
          {identity.domain}
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Sections">
          {v2nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="v2-label text-mist-500 transition-colors duration-300 hover:text-mist-100"
            >
              {t(item.label)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1" role="group" aria-label="Language">
            {(["en", "ru"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`v2-label px-1.5 py-1 transition-colors duration-300 ${
                  lang === code ? "text-mist-100" : "text-mist-500 hover:text-mist-100"
                }`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          {/* The ask is always one click away, at every scroll depth. */}
          <a
            href={`mailto:${identity.email}`}
            className="press v2-label hidden bg-champagne px-4 py-2.5 text-graphite-950 transition-colors duration-300 hover:bg-mist-100 sm:inline-block"
          >
            {t(v2hero.primary)}
          </a>
        </div>
      </div>

      {lifted && <ScrollProgress progress={scrollYProgress} />}
    </header>
  );
}
