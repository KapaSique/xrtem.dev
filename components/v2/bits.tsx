"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ *
 * Aurora — the only large moving thing on the page. Kept translucent
 * and slow (24s+) so it never reads as a strobing background.
 * ------------------------------------------------------------------ */
export function Aurora({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div
        className="absolute -top-1/3 left-[8%] h-[46rem] w-[46rem] rounded-full opacity-[0.22] blur-[110px]"
        style={{
          background: "radial-gradient(circle, var(--color-champagne) 0%, transparent 68%)",
          animation: reduced ? undefined : "v2drift 30s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute -top-1/4 right-[4%] h-[38rem] w-[38rem] rounded-full opacity-[0.16] blur-[120px]"
        style={{
          background: "radial-gradient(circle, #6d7cff 0%, transparent 70%)",
          animation: reduced ? undefined : "v2drift 38s ease-in-out infinite alternate-reverse",
        }}
      />
      {/* Structural grid — gives the dark field a scale reference. */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          maskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, #000 30%, transparent 78%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * SpotlightCard — a light source that follows the pointer across the
 * surface. Position is written straight to CSS custom properties, so
 * the pointer path never triggers a React render.
 * ------------------------------------------------------------------ */
export function SpotlightCard({
  children,
  className = "",
  contentClassName = "",
}: {
  children: React.ReactNode;
  className?: string;
  /** Applied to the inner wrapper — that is the element the children lay
      out inside, so flex/grid for the card body belongs here. */
  contentClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={track}
      className={`group relative overflow-hidden border border-white/8 bg-graphite-850 transition-colors duration-500 hover:border-white/16 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(198,168,125,0.13), transparent 72%)",
        }}
        aria-hidden
      />
      {/* h-full so cards in a stretched grid row can anchor content to
          their own bottom edge rather than to the content's height. */}
      <div className={`relative h-full ${contentClassName}`}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * SectionHead — label above the heading, so a wrapping heading never
 * leaves the label stranded on its own baseline.
 * ------------------------------------------------------------------ */
export function SectionHead({ label, heading }: { label: string; heading: string }) {
  return (
    <Rise className="border-b border-white/8 pb-6">
      <span className="v2-label text-champagne">{label}</span>
      <h2 className="v2-display mt-5 max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.75rem)]">{heading}</h2>
    </Rise>
  );
}

/* ------------------------------------------------------------------ *
 * Magnetic — the element leans toward the pointer on a critically
 * damped spring and returns without overshoot when the pointer leaves.
 * ------------------------------------------------------------------ */
export function Magnetic({
  children,
  strength = 0.32,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Independent springs per axis — a single 2D spring desyncs when the
  // axes carry different velocities.
  const sx = useSpring(x, { damping: 22, stiffness: 240, mass: 0.6 });
  const sy = useSpring(y, { damping: 22, stiffness: 240, mass: 0.6 });

  if (reduced) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ *
 * GradientText — a champagne sweep across a phrase.
 * ------------------------------------------------------------------ */
export function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(100deg, var(--color-champagne) 0%, #f0e0c6 32%, var(--color-champagne) 58%, var(--color-champagne-dim) 100%)",
        backgroundSize: reduced ? "100% 100%" : "220% 100%",
        animation: reduced ? undefined : "v2sweep 9s linear infinite",
      }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Rise — the section-level reveal used across variant 2.
 * ------------------------------------------------------------------ */
export function Rise({
  children,
  className = "",
  delay = 0,
  y = 22,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * ScrollProgress — a champagne hairline that fills as the page scrolls.
 * ------------------------------------------------------------------ */
export function ScrollProgress({ progress }: { progress: ReturnType<typeof useMotionValue<number>> }) {
  const width = useTransform(progress, (v) => `${v * 100}%`);
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-champagne/70"
      style={{ width }}
      aria-hidden
    />
  );
}
