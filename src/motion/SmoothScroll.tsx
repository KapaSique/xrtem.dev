import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { gsap, ScrollTrigger } from "./gsap";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    const onScroll = () => ScrollTrigger.update();
    const lenis = lenisRef.current?.lenis;

    lenis?.on("scroll", onScroll);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      lenis?.off("scroll", onScroll);
      gsap.ticker.remove(update);
    };
  }, [reduceMotion]);

  if (reduceMotion) return children;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.075,
        smoothWheel: true,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
