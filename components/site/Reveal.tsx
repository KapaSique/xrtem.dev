"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Seconds to hold before the entrance starts. */
  delay?: number;
  /** Travel distance in pixels. */
  distance?: number;
  className?: string;
};

/**
 * Entrance animation driven by a direct geometry check.
 *
 * Both obvious alternatives fail in the same way: GSAP ScrollTrigger and
 * IntersectionObserver only deliver callbacks when the browser considers
 * the page visible, and each hides its children until that callback
 * arrives. In a headless renderer, a background tab or an embedded
 * webview the callback never comes and the content is simply gone.
 *
 * Measuring `getBoundingClientRect` on mount and on scroll asks the
 * browser nothing, so the worst case here is an entrance that plays
 * without its scroll timing — never a blank section.
 */
export function Reveal({ children, delay = 0, distance = 18, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    let frame = 0;
    let done = false;

    const check = () => {
      frame = 0;
      if (done || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      // Enter slightly before the element reaches the fold.
      if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
        done = true;
        setShown(true);
        detach();
      }
    };

    const schedule = () => {
      if (frame || done) return;
      frame = requestAnimationFrame(check);
    };

    const detach = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    check();

    return detach;
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={shown ? "in" : "out"}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translate3d(0, ${distance}px, 0)`,
        transition:
          "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}s`,
        willChange: shown ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
