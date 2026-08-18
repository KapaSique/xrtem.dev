"use client";

import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/lib/i18n";
import { v2services } from "@/content/v2";

/**
 * Three lanes as an index rather than as cards. Each row opens on hover
 * or focus and stays a single hairline-separated line when closed, so
 * the section reads as a table of contents until it is asked for more.
 */
export function Services() {
  const { lang, t } = useLang();
  const [active, setActive] = useState<string | null>(v2services.items[0]?.id ?? null);

  return (
    <section id="services" className="shell scroll-mt-24 py-24 md:py-32">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="label text-graphite-400">{t(v2services.label)}</span>
          <h2 className="display max-w-[20ch] text-[clamp(1.6rem,3.4vw,2.6rem)]">
            {t(v2services.heading)}
          </h2>
        </div>
      </Reveal>

      <div className="glass r-panel mt-12 p-3 md:p-4">
        {v2services.items.map((item, i) => {
          const open = active === item.id;
          return (
            <Reveal key={item.id} delay={i * 0.06}>
              <div
                onMouseEnter={() => setActive(item.id)}
                onFocusCapture={() => setActive(item.id)}
                className="group rounded-3xl transition-colors duration-500 hover:bg-raise/45"
              >
                <div className="flex cursor-default items-baseline gap-4 px-4 py-5 md:gap-8 md:px-6">
                  <span
                    className={`label w-6 shrink-0 transition-colors duration-500 ${
                      open ? "text-graphite-900" : "text-graphite-300"
                    }`}
                  >
                    {item.index}
                  </span>
                  <h3
                    className={`display flex-1 text-[clamp(1.5rem,3.6vw,2.5rem)] transition-colors duration-500 ${
                      open ? "text-graphite-900" : "text-graphite-400"
                    }`}
                  >
                    {t(item.title)}
                  </h3>
                  <a
                    href={item.proof.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`label hidden shrink-0 self-center transition-all duration-500 md:block ${
                      open
                        ? "translate-x-0 text-graphite-600 opacity-100"
                        : "translate-x-2 opacity-0"
                    } hover:text-graphite-900`}
                  >
                    {item.proof.label} ↗
                  </a>
                </div>

                {/* Grid-rows trick: animates to the content's real height
                    without measuring it in JavaScript. */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 px-4 pb-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-12 md:px-6 md:pl-16">
                      <p className="max-w-[52ch] leading-relaxed text-graphite-600">
                        {t(item.body)}
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {item.points[lang].map((point) => (
                          <li
                            key={point}
                            className="flex items-baseline gap-3 text-[0.8125rem] text-graphite-600"
                          >
                            <span className="mt-[0.4em] h-px w-4 shrink-0 bg-graphite-400" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
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
