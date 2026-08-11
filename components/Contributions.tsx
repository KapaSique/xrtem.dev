"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Contributions as Data } from "@/lib/github";
import { identity, ui } from "@/content/site";
import { useLang } from "@/lib/i18n";

const LEVEL_ALPHA = [0.07, 0.26, 0.45, 0.68, 0.92];
const WEEKS = 52;

/** A quiet live detail: the real contribution calendar, or nothing at all. */
export function Contributions({ data }: { data: Data | null }) {
  const { t } = useLang();
  const reduced = useReducedMotion();
  if (!data) return null;

  const days = data.days.slice(-WEEKS * 7);
  const offset = new Date(`${days[0]?.date}T00:00:00Z`).getUTCDay();

  return (
    <div>
      <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
        <a
          href={identity.github.href}
          target="_blank"
          rel="noreferrer"
          className="label link-draw hover:!text-ink transition-colors duration-300"
        >
          github {identity.github.handle}
        </a>
        {data.total > 0 && (
          <span className="label">
            <span className="!text-ink">{data.total.toLocaleString("en-US")}</span> {t(ui.contributions)}
          </span>
        )}
      </div>

      <div className="mt-5 overflow-x-auto pb-1">
        <div className="grid w-max grid-flow-col grid-rows-7 gap-[3px]">
          {Array.from({ length: offset }).map((_, i) => (
            <span key={`pad-${i}`} className="h-[9px] w-[9px]" />
          ))}
          {days.map((day, i) => (
            <motion.span
              key={day.date}
              title={day.date}
              className="h-[9px] w-[9px] rounded-[1px]"
              style={{ backgroundColor: `rgba(26,26,24,${LEVEL_ALPHA[day.level] ?? 0.07})` }}
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.0009, 0.5) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
