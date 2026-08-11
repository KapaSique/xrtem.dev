"use client";

import { numbers } from "@/content/site";
import { v2process } from "@/content/v2";
import { useLang } from "@/lib/i18n";
import { CountUp } from "@/components/motion/CountUp";
import { Rise, SectionHead, SpotlightCard } from "@/components/v2/bits";

export function V2Proof() {
  const { t } = useLang();

  return (
    <section id="proof" className="scroll-mt-20 py-24 md:py-32">
      <div className="shell">
        <SectionHead label={t(numbers.caption)} heading={t(numbers.heading)} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {numbers.items.map((item, i) => (
            <Rise key={item.value} delay={i * 0.07} className="h-full">
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between gap-10 border border-white/8 bg-graphite-850 p-6 transition-colors duration-500 hover:border-champagne/40 md:p-7"
              >
                <div>
                  <CountUp
                    value={item.value}
                    className="v2-display block text-[clamp(2.25rem,4.2vw,3rem)] tabular-nums text-mist-100"
                  />
                  <p className="v2-label mt-2.5 text-champagne">{item.unit}</p>
                </div>
                <div>
                  <p className="text-[0.9375rem] leading-snug text-mist-300">{t(item.label)}</p>
                  <p className="v2-label mt-2 text-mist-700">{t(item.rank)}</p>
                </div>
              </a>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

export function V2Process() {
  const { t } = useLang();

  return (
    <section id="process" className="scroll-mt-20 py-24 md:py-32">
      <div className="shell">
        <SectionHead label={t(v2process.label)} heading={t(v2process.heading)} />

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {v2process.steps.map((step, i) => (
            <Rise key={step.n} delay={i * 0.07} className="h-full">
              <SpotlightCard className="h-full p-6 md:p-7">
                <li>
                  <span className="v2-label text-champagne">{step.n}</span>
                  <h3 className="v2-display mt-7 text-[1.375rem]">{t(step.title)}</h3>
                  <p className="mt-3.5 text-[0.9375rem] leading-[1.6] text-mist-300">{t(step.body)}</p>
                </li>
              </SpotlightCard>
            </Rise>
          ))}
        </ol>
      </div>
    </section>
  );
}
