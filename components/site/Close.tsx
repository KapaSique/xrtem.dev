"use client";

import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/lib/i18n";
import { identity } from "@/content/site";
import { v2faq, v2cta } from "@/content/v2";

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="shell scroll-mt-24 py-24 md:py-32">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="label text-graphite-400">{t(v2faq.label)}</span>
          <h2 className="display max-w-[16ch] text-[clamp(1.6rem,3.4vw,2.6rem)]">
            {t(v2faq.heading)}
          </h2>
        </div>
      </Reveal>

      <div className="glass r-panel mt-12 p-3 md:p-4">
        {v2faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div className="rounded-3xl transition-colors duration-500 hover:bg-raise/40">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-5 px-4 py-5 text-left md:px-6"
                >
                  <span className="label mt-1.5 w-6 shrink-0 text-graphite-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[1.0625rem] text-graphite-900">{t(item.q)}</span>
                  <span
                    className={`mt-1 shrink-0 text-graphite-400 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] px-4 pb-6 pl-15 leading-relaxed text-graphite-600 md:px-6 md:pl-17">
                      {t(item.a)}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function Cta() {
  const { t } = useLang();

  return (
    <section id="contact" className="shell scroll-mt-24 pb-8 pt-8">
      <Reveal distance={24}>
        {/* The only dark object on a silver page — it lands like a
            stamped plate rather than like another section. */}
        <div className="glass-dark r-panel relative overflow-hidden px-6 py-16 text-silver-50 md:px-14 md:py-24">
          <div
            className="pointer-events-none absolute -right-1/4 -top-1/2 h-[130%] w-[70%] opacity-25"
            style={{
              background:
                "radial-gradient(closest-side, #ffffff 0%, #9aa1b2 42%, transparent 78%)",
            }}
            aria-hidden
          />

          <div className="relative max-w-[22ch]">
            <h2 className="display text-[clamp(2rem,5vw,3.75rem)]">{t(v2cta.heading)}</h2>
          </div>
          <p className="relative mt-6 max-w-[52ch] leading-relaxed text-silver-300/80">
            {t(v2cta.sub)}
          </p>

          <div className="relative mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${identity.email}`}
              className="r-pill press lift group inline-flex items-center gap-2.5 bg-silver-50 px-6 py-3.5 text-sm font-medium text-graphite-900"
            >
              {t(v2cta.primary)}
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
            <a
              href={identity.telegram.href}
              target="_blank"
              rel="noreferrer"
              className="r-pill press inline-flex items-center border border-silver-50/25 bg-silver-50/10 px-6 py-3.5 text-sm text-silver-100 backdrop-blur-md transition-colors duration-300 hover:bg-silver-50/20"
            >
              {t(v2cta.secondary)}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
