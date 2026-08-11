"use client";

import { motion, useReducedMotion } from "motion/react";

export type Segment = { text: string; serif?: boolean };

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Display-type reveal: every word sits in its own mask and rises out of it.
 * Deliberately no blur here — a filter inside `overflow: hidden` gets clipped
 * against the mask edge and the letters smear.
 */
export function TextRise({
  segments,
  className = "",
  delay = 0,
  stagger = 0.05,
  duration = 1.05,
}: {
  segments: Segment[];
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  let word = 0;

  return (
    <span className={className}>
      {segments.map((segment, s) => (
        <span key={s} className={segment.serif ? "serif-accent" : undefined}>
          {segment.text.split(" ").map((text) => {
            const index = word++;
            return (
              <span
                key={`${s}-${index}`}
                /* Padding on both edges keeps descenders and the diaeresis of
                   Ё outside the mask; the word still enters from below. */
                className="inline-block overflow-hidden pt-[0.18em] -mt-[0.18em] pb-[0.14em] -mb-[0.14em] align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={reduced ? { y: 0, opacity: 0 } : { y: "115%" }}
                  animate={reduced ? { y: 0, opacity: 1 } : { y: 0 }}
                  transition={{ duration, ease: EASE, delay: delay + index * stagger }}
                >
                  {text}
                </motion.span>
                {" "}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
