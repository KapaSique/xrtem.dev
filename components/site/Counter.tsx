"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  to: number;
  /** Fixed decimal places, so 0.9545 does not render as 0.95. */
  decimals?: number;
  /** Thousands separator; empty string leaves the number unbroken. */
  separator?: string;
  duration?: number;
  className?: string;
};

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts up once the element reaches the fold.
 *
 * ReactBits' CountUp uses motion's `useInView`, which is an
 * IntersectionObserver underneath — and where that observer stays
 * silent, every figure on the page renders as a zero. These numbers are
 * the page's evidence, so a silent zero is the worst possible failure:
 * the trigger is a direct geometry check, and the final value is what
 * gets painted if anything goes wrong.
 */
export function Counter({
  to,
  decimals = 0,
  separator = "",
  duration = 1500,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let started = false;
    let cancelled = false;

    const run = (startedAt: number) => {
      const tick = (now: number) => {
        if (cancelled) return;
        const progress = Math.min((now - startedAt) / duration, 1);
        setValue(to * easeOutExpo(progress));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const check = () => {
      if (started || cancelled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        started = true;
        setValue(0);
        run(performance.now());
        detach();
      }
    };

    const detach = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();

    return () => {
      cancelled = true;
      detach();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: Boolean(separator),
  });

  return (
    <span ref={ref} className={className}>
      {separator ? formatted.replace(/,/g, separator) : formatted}
    </span>
  );
}
