"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Contributions } from "@/lib/github";
import { hero, identity, ui } from "@/content/site";
import { useLang } from "@/lib/i18n";

const LEVEL_ALPHA = [0.1, 0.3, 0.5, 0.72, 0.95];
const WEEKS = 52;

/**
 * The dark anchor of the first screen — real contribution data plus three
 * numbers. It exists because the hero was otherwise a large empty right side.
 */
export function SignalCard({ data }: { data: Contributions | null }) {
  const { t } = useLang();
  const reduced = useReducedMotion();

  const days = data ? data.days.slice(-WEEKS * 7) : [];
  const offset = days.length ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;

  return (
    <div className="bg-ink p-6 text-paper md:p-7">
      {data && (
        <>
          <div className="flex items-baseline justify-between gap-4 border-b border-paper/20 pb-4">
            <a
              href={identity.github.href}
              target="_blank"
              rel="noreferrer"
              className="label link-draw !text-paper/55 transition-colors duration-300 hover:!text-paper"
            >
              github {identity.github.handle}
            </a>
            {data.total > 0 && (
              <span className="label !text-paper tabular-nums">
                {data.total.toLocaleString("en-US")}
              </span>
            )}
          </div>

          <div className="mt-5">
            <div className="grid grid-flow-col grid-rows-7 gap-[2px]">
              {Array.from({ length: offset }).map((_, i) => (
                <span key={`pad-${i}`} className="h-[5px] w-[5px]" />
              ))}
              {days.map((day, i) => (
                <motion.span
                  key={day.date}
                  className="h-[5px] w-[5px]"
                  style={{ backgroundColor: `rgba(244,242,237,${LEVEL_ALPHA[day.level] ?? 0.1})` }}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + Math.min(i * 0.0007, 0.45) }}
                />
              ))}
            </div>
            <p className="label mt-3 !text-paper/45">{t(ui.contributions)}</p>
          </div>
        </>
      )}

      <div className={`grid grid-cols-3 gap-px bg-paper/20 ${data ? "mt-7" : ""}`}>
        {hero.stats.map((stat) => (
          <div key={stat.value} className="bg-ink pt-5 pr-3 pb-1">
            <p className="display text-[1.75rem] leading-none">{stat.value}</p>
            <p className="label mt-2 !text-paper/45">{t(stat.label)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
