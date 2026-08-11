"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";

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

/** Metrics count up once, when they first cross into view. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const reduced = useReducedMotion();

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 34, stiffness: 70, restDelta: 0.0001 });
  const [shown, setShown] = useState(parsed ? 0 : null);

  useEffect(() => {
    if (parsed && inView) motionValue.set(parsed.target);
  }, [inView, motionValue, parsed]);

  useEffect(() => spring.on("change", (v) => setShown(v)), [spring]);

  if (!parsed || reduced) return <span className={className}>{value}</span>;

  const display = inView
    ? `${(shown ?? 0).toFixed(parsed.decimals)}${parsed.suffix}`
    : `${(0).toFixed(parsed.decimals)}${parsed.suffix}`;

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
