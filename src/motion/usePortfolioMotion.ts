import type { RefObject } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import type { EditorialController } from "../webgl/editorialRenderer";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";

type ControllerRef = {
  current: EditorialController | null;
};

const sceneNumbers = ["01", "02", "03", "04", "05"] as const;

export function usePortfolioMotion(
  rootRef: RefObject<HTMLDivElement | null>,
  canvasController: ControllerRef,
) {
  const reduceMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !rootRef.current) return;

      const titleStrips = gsap.utils.toArray<HTMLElement>(
        "[data-hero-strip]",
      );
      const chaseWindow = rootRef.current.querySelector<HTMLElement>(
        "[data-hero-chase]",
      );
      const petmekWindow = rootRef.current.querySelector<HTMLElement>(
        "[data-hero-petmek]",
      );
      const tape = rootRef.current.querySelector<HTMLElement>(
        ".collision-hero__tape",
      );
      const canvas =
        rootRef.current.querySelector<HTMLCanvasElement>(
          ".editorial-canvas",
        );

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          titleStrips,
          {
            xPercent: (index) => [-18, 14, -10][index % 3],
          },
          {
            xPercent: 0,
            duration: 1.35,
            stagger: 0.035,
          },
        )
        .from(
          [chaseWindow, petmekWindow],
          {
            yPercent: 35,
            rotate: 0,
            autoAlpha: 0,
            duration: 1.1,
            stagger: 0.12,
          },
          0.18,
        )
        .from(
          tape,
          {
            y: 24,
            autoAlpha: 0,
            duration: 0.8,
          },
          0.55,
        );

      const heroExit = gsap.timeline({
        scrollTrigger: {
          trigger: ".collision-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
          onUpdate: (self) => {
            canvasController.current?.setMix(self.progress);
            canvasController.current?.setIntensity(
              0.75 + self.progress * 1.35,
            );
          },
        },
      });

      heroExit
        .to(
          titleStrips,
          {
            xPercent: (index) => [-34, 28, -17][index % 3],
            ease: "none",
          },
          0,
        )
        .to(
          chaseWindow,
          { xPercent: -28, yPercent: -20, ease: "none" },
          0,
        )
        .to(
          petmekWindow,
          { xPercent: 22, yPercent: 16, ease: "none" },
          0,
        );

      if (canvas) {
        heroExit.to(canvas, { autoAlpha: 0, ease: "none" }, 0.56);
      }

      gsap.utils
        .toArray<HTMLElement>("[data-chase-frame]")
        .forEach((frame, index) => {
          gsap.from(frame, {
            yPercent: index % 2 ? 18 : 28,
            rotate: index % 2 ? 1.5 : -1.2,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom 38%",
              scrub: 0.7,
            },
          });
        });

      const petmekSteps = gsap.utils.toArray<HTMLElement>(
        "[data-petmek-step]",
      );
      petmekSteps.forEach((step) => {
        gsap.fromTo(
          step,
          { autoAlpha: 0.28, xPercent: 7 },
          {
            autoAlpha: 1,
            xPercent: 0,
            scrollTrigger: {
              trigger: step,
              start: "top 78%",
              end: "center center",
              scrub: 0.55,
            },
          },
        );
      });

      const pipeline =
        rootRef.current.querySelector<HTMLElement>(".petmek-pipeline");
      const marker = rootRef.current.querySelector<HTMLElement>(
        "[data-petmek-marker]",
      );
      if (pipeline && marker) {
        gsap.to(marker, {
          y: () => Math.max(0, pipeline.scrollHeight - marker.offsetHeight),
          ease: "none",
          scrollTrigger: {
            trigger: pipeline,
            start: "top center",
            end: "bottom center",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      }

      const progress =
        rootRef.current.querySelector<HTMLOutputElement>(
          "[data-scene-progress]",
        );
      const current =
        progress?.querySelector<HTMLElement>("[data-scene-current]");
      const scenes = gsap.utils.toArray<HTMLElement>("[data-scene]");

      scenes.forEach((scene, index) => {
        const setActive = () => {
          current && (current.textContent = sceneNumbers[index] ?? "05");
          progress?.style.setProperty(
            "--scene-progress",
            String(index / Math.max(1, scenes.length - 1)),
          );
        };
        ScrollTrigger.create({
          trigger: scene,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: setActive,
          onEnterBack: setActive,
        });
      });

      const media = gsap.matchMedia();
      media.add("(min-width: 768px)", () => {
        const section =
          rootRef.current?.querySelector<HTMLElement>(".experiment-reel");
        const track = rootRef.current?.querySelector<HTMLElement>(
          "[data-experiment-track]",
        );
        if (!section || !track) return;

        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth + 48);

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      const imageReady = [...rootRef.current.querySelectorAll("img")].map(
        (image) =>
          typeof image.decode === "function"
            ? image.decode().catch(() => undefined)
            : Promise.resolve(),
      );
      Promise.allSettled([document.fonts.ready, ...imageReady]).then(
        refresh,
      );

      return () => media.revert();
    },
    {
      scope: rootRef,
      dependencies: [reduceMotion],
      revertOnUpdate: true,
    },
  );
}
