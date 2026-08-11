"use client";

import { v2services } from "@/content/v2";
import { useLang } from "@/lib/i18n";
import { Rise, SectionHead, SpotlightCard } from "@/components/v2/bits";

export function V2Services() {
  const { lang, t } = useLang();

  return (
    <section id="services" className="scroll-mt-20 py-24 md:py-32">
      <div className="shell">
        <SectionHead label={t(v2services.label)} heading={t(v2services.heading)} />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {v2services.items.map((item, i) => (
            <Rise key={item.id} delay={i * 0.08} className="h-full">
              <SpotlightCard className="h-full p-7 md:p-8" contentClassName="flex flex-col">
                <div className="flex items-baseline justify-between gap-4 border-b border-white/8 pb-5">
                  <span className="v2-label text-champagne">{item.index}</span>
                  <span className="v2-label text-mist-700">/ {v2services.items.length}</span>
                </div>

                <h3 className="v2-display mt-7 text-[1.5rem] md:text-[1.75rem]">{t(item.title)}</h3>

                <p className="mt-4 text-[0.9375rem] leading-[1.62] text-mist-300">{t(item.body)}</p>

                <ul className="mt-7 space-y-2.5">
                  {item.points[lang].map((point) => (
                    <li key={point} className="flex gap-3 text-[0.875rem] leading-snug text-mist-500">
                      <span className="mt-[0.45em] h-px w-3 shrink-0 bg-champagne/60" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>

                <a
                  href={item.proof.href}
                  target="_blank"
                  rel="noreferrer"
                  className="v2-label mt-auto inline-flex items-center gap-2 pt-9 text-mist-100 transition-colors duration-300 hover:text-champagne"
                >
                  {item.proof.label}
                  <span aria-hidden>↗</span>
                </a>
              </SpotlightCard>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
