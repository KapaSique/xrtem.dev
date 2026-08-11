"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Splits "49.68%" into 49.68 · 2 decimals · "%". Returns null for non-numeric values. */
function parse(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, digits, suffix] = match;
  return {
    target: Number(digits),
    decimals: digits.includes(".") ? digits.split(".")[1].length : 0,
    suffix,
  };
}

/**
 * Metrics count up once, when they first cross into view.
 *
 * The animation is deliberately short and always ends by rendering the
 * original string verbatim. An easing tail that leaves 0.9066 on screen
 * for a second would be a page that misreports its own numbers.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const reduced = useReducedMotion();

  const [shown, setShown] = useState(0);
  const [settled, setSettled] = useState(false);
  // Server output and the first client render both carry the real number,
  // so crawlers and no-JS readers never see a zero.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!parsed || !inView || reduced) return;
    const controls = animate(0, parsed.target, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setShown,
      onComplete: () => setSettled(true),
    });
    return () => controls.stop();
    // parsed is derived from `value`; depending on it directly would
    // restart the animation on every render.
  }, [inView, reduced, value]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!parsed || reduced || settled || !mounted) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {`${shown.toFixed(parsed.decimals)}${parsed.suffix}`}
    </span>
  );
}
