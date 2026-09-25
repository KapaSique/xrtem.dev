"use client";

import { useEffect, useRef, useState } from "react";
import { glass } from "@/content/site";

/** Reduced motion or a data-saver connection get the still frame. */
export function prefersStill(): boolean {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return reduce || connection?.saveData === true;
}

type GlassLoopProps = {
  /** The footer copy: download nothing until it is about a screen away. */
  lazy?: boolean;
  className?: string;
};

/**
 * The glass x, rendered in Blender over pure black and blended with
 * `lighten`: whatever not-quite-black the codec produces loses to the
 * page background, so the video never shows its rectangle.
 */
export function GlassLoop({ lazy = false, className = "" }: GlassLoopProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);
  const [armed, setArmed] = useState(!lazy);

  useEffect(() => {
    setStill(prefersStill());
  }, []);

  // Lazy copies arm themselves by geometry, like Reveal: an observer can stay
  // silent in a background tab, a rect check cannot.
  useEffect(() => {
    if (armed || still) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 2 && rect.bottom > -window.innerHeight) setArmed(true);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    check();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [armed, still]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed || still) return;
    el.muted = true; // autoplay policies read the property; React may not reflect it
    const attempt = el.play();
    // Autoplay can be refused (Low Power Mode, site policies) — the poster stays up.
    if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
  }, [armed, still]);

  if (still) {
    return (
      <picture aria-hidden="true" className={`block ${className}`}>
        <source srcSet={glass.poster.avif} type="image/avif" />
        <img src={glass.poster.jpg} alt="" className="h-full w-full object-contain mix-blend-lighten" />
      </picture>
    );
  }

  return (
    <video
      ref={ref}
      aria-hidden="true"
      tabIndex={-1}
      className={`object-contain mix-blend-lighten ${className}`}
      poster={glass.poster.jpg}
      muted
      loop
      playsInline
      autoPlay={!lazy}
      preload={lazy ? "none" : "auto"}
      disablePictureInPicture
    >
      <source src={glass.loop.webm} type="video/webm" />
      <source src={glass.loop.mp4} type="video/mp4" />
    </video>
  );
}
