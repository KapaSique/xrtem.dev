"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

const COPIES = 4;

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

/**
 * Infinite marquee whose speed and direction are coupled to scroll velocity:
 * scrolling down accelerates it, scrolling up drags it backwards. Idle, it
 * creeps at `baseSpeed`.
 */
export function VelocityMarquee({
  items,
  baseSpeed = 1.6,
  className = "",
}: {
  items: string[];
  baseSpeed?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(1);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 52, stiffness: 380 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], { clamp: false });

  // Track spans COPIES duplicates, so wrapping over 100/COPIES % is seamless.
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let move = direction.current * baseSpeed * (delta / 1000);

    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;

    move += direction.current * move * factor;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div className="marquee-track" style={{ x }}>
        {Array.from({ length: COPIES }).map((_, copy) => (
          <span key={copy} className="flex shrink-0" aria-hidden={copy > 0}>
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span className="px-[0.85em]">{item}</span>
                <span className="text-ink-mute/50">/</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
