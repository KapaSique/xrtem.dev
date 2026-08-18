"use client";

import { Counter } from "@/components/site/Counter";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/lib/i18n";
import { numbers, ui } from "@/content/site";
import { v2process } from "@/content/v2";
import type { Contributions } from "@/lib/github";

/** "49.68%" → { value: 49.68, suffix: "%" } so the digits can animate. */
function splitMetric(raw: string) {
  const match = /^([\d.]+)(.*)$/.exec(raw);
  if (!match) return { value: 0, suffix: raw, decimals: 0 };
  const [, digits, suffix] = match;
  return { value: Number(digits), suffix, decimals: (digits.split(".")[1] ?? "").length };
}

export function Numbers({ contributions }: { contributions: Contributions | null }) {
  const { t } = useLang();

  return (
    <section id="proof" className="shell scroll-mt-24 py-24 md:py-32">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="label text-graphite-400">{t(numbers.caption)}</span>
          <h2 className="display max-w-[16ch] text-[clamp(1.6rem,3.4vw,2.6rem)]">
            {t(numbers.heading)}
          </h2>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {numbers.items.map((item, i) => {
          const { value, suffix, decimals } = splitMetric(item.value);
          return (
            <Reveal key={item.href} delay={i * 0.07} className="h-full">
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="glass r-tile lift group flex h-full flex-col justify-between gap-8 p-6 md:p-7"
              >
                <div className="flex items-baseline gap-1">
                  <span className="grotesk text-[clamp(2rem,4.4vw,3rem)] font-medium tabular-nums">
                    <Counter to={value} decimals={decimals} />
                    {suffix}
                  </span>
                </div>

                <div>
                  <div className="label text-graphite-900">{item.unit}</div>
                  <div className="mt-3 text-[0.8125rem] leading-snug text-graphite-600">
                    {t(item.label)}
                  </div>
                  <div className="label mt-2 text-graphite-400">{t(item.rank)}</div>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>

      {/* Live contribution strip. Hidden entirely when GitHub is
          unreachable rather than rendered as an empty grid. */}
      {contributions && contributions.days.length > 0 && (
        <Reveal delay={0.1}>
          <div className="glass r-tile mt-3 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-baseline gap-2.5">
              {/* Thin no-break space, so "1 118" never wraps mid-number. */}
              <span className="grotesk whitespace-nowrap text-2xl font-medium tabular-nums">
                <Counter to={contributions.total} separator=" " duration={1800} />
              </span>
              <span className="label text-graphite-400">{t(ui.contributions)}</span>
            </div>

            <div className="flex gap-[3px] overflow-hidden" aria-hidden>
              {contributions.days.slice(-182).map((day) => (
                <span
                  key={day.date}
                  className="h-5 w-[3px] shrink-0 rounded-full"
                  style={{
                    background:
                      day.level === 0
                        ? "color-mix(in srgb, var(--color-graphite-900) 10%, transparent)"
                        : `color-mix(in srgb, var(--color-graphite-900) ${18 + day.level * 21}%, transparent)`,
                  }}
                />
              ))}
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}

export function Process() {
  const { t } = useLang();

  return (
    <section id="process" className="shell scroll-mt-24 py-24 md:py-32">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="label text-graphite-400">{t(v2process.label)}</span>
          <h2 className="display max-w-[18ch] text-[clamp(1.6rem,3.4vw,2.6rem)]">
            {t(v2process.heading)}
          </h2>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {v2process.steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.07}>
            <div className="glass r-tile lift flex h-full flex-col p-6">
              <span className="grotesk text-graphite-300">{step.n}</span>
              <h3 className="display mt-4 text-xl">{t(step.title)}</h3>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-graphite-600">
                {t(step.body)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
