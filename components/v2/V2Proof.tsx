"use client";

import { motion, useReducedMotion } from "motion/react";
import { identity, numbers, ui } from "@/content/site";
import { v2process } from "@/content/v2";
import type { Contributions } from "@/lib/github";
import { useLang } from "@/lib/i18n";
import { CountUp } from "@/components/motion/CountUp";
import { Rise, SectionHead, SpotlightCard } from "@/components/v2/bits";

export function V2Proof({ contributions }: { contributions: Contributions | null }) {
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

        <ContributionStrip data={contributions} />
      </div>
    </section>
  );
}

/** Live proof of activity, pulled from the public GitHub calendar. */
function ContributionStrip({ data }: { data: Contributions | null }) {
  const { t } = useLang();
  const reduced = useReducedMotion();
  if (!data) return null;

  const days = data.days.slice(-52 * 7);
  const offset = days.length ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;
  const alpha = [0.07, 0.2, 0.36, 0.56, 0.78];

  return (
    <Rise delay={0.1} className="mt-4 border border-white/8 bg-graphite-850 p-6 md:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <a
          href={identity.github.href}
          target="_blank"
          rel="noreferrer"
          className="v2-label text-mist-500 transition-colors duration-300 hover:text-mist-100"
        >
          github {identity.github.handle}
        </a>
        {data.total > 0 && (
          <span className="v2-label text-mist-700">
            <span className="text-champagne tabular-nums">
              {data.total.toLocaleString("en-US")}
            </span>{" "}
            {t(ui.contributions)}
          </span>
        )}
      </div>

      <div className="mt-6 overflow-x-auto pb-1">
        <div className="grid w-max grid-flow-col grid-rows-7 gap-[3px]">
          {Array.from({ length: offset }).map((_, i) => (
            <span key={`pad-${i}`} className="h-[7px] w-[7px]" />
          ))}
          {days.map((day, i) => (
            <motion.span
              key={day.date}
              title={day.date}
              className="h-[7px] w-[7px]"
              style={{ backgroundColor: `rgba(243,244,246,${alpha[day.level] ?? 0.07})` }}
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.0007, 0.4) }}
            />
          ))}
        </div>
      </div>
    </Rise>
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
