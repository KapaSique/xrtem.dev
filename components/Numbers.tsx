"use client";

import { numbers } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";

/** The one inverted band on the page — it exists to give the scroll a beat. */
export function Numbers() {
  const { t } = useLang();

  return (
    <section id="numbers" className="mt-28 scroll-mt-16 bg-ink py-20 text-paper md:mt-40 md:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-paper/15 pb-5">
          <h2 className="label !text-paper">{t(numbers.heading)}</h2>
          <span className="label !text-paper/45">{t(numbers.caption)}</span>
        </div>

        {/* gap-px over a light background draws the hairlines, so the grid
            stays correct at every wrap point without nth-child gymnastics. */}
        <div className="grid grid-cols-1 gap-px bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
          {numbers.items.map((item, i) => (
            <Reveal key={item.value} delay={i * 0.07} className="bg-ink">
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between gap-10 py-9 pr-8 transition-colors duration-500 hover:bg-paper/[0.05] sm:pl-6"
              >
                <div>
                  <p className="display text-[clamp(2.5rem,5vw,3.5rem)] tabular-nums">{item.value}</p>
                  <p className="label mt-2 !text-paper/45">{item.unit}</p>
                </div>
                <div>
                  <p className="text-[0.9375rem] leading-snug text-paper/85">{t(item.label)}</p>
                  <p className="label mt-2 !text-paper/45">{t(item.rank)}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
