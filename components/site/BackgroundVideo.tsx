"use client";

import { useEffect, useRef, useState } from "react";

type BackgroundVideoProps = {
  className?: string;
  portrait?: boolean;
  lazy?: boolean;
};

/** The supplied desktop/mobile films share a frame, so switching sizes is seamless. */
export function BackgroundVideo({ className = "", portrait = false, lazy = false }: BackgroundVideoProps) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);
  const [armed, setArmed] = useState(!lazy);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
    const update = () => setStill(motion.matches || connection.connection?.saveData === true);
    update();
    motion.addEventListener?.("change", update);
    return () => motion.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (armed || !lazy) return;
    const check = () => {
      const rect = root.current?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight * 1.5 && rect.bottom > -window.innerHeight) setArmed(true);
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [armed, lazy]);

  useEffect(() => {
    if (still || !armed || !video.current) return;
    video.current.muted = true;
    const attempt = video.current.play();
    if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
  }, [armed, still]);

  useEffect(() => {
    if (portrait) return;
    const size = window.matchMedia("(max-width: 767px)");
    const update = () => {
      if (!video.current || !armed) return;
      // Browsers choose <source media> on load, but do not reselect on resize.
      video.current.load();
      const attempt = video.current.play();
      if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
    };
    size.addEventListener?.("change", update);
    return () => size.removeEventListener?.("change", update);
  }, [armed, portrait, still]);

  return (
    <div ref={root} aria-hidden="true" className={`overflow-hidden bg-ink ${className}`}>
      <picture className="absolute inset-0 block">
        {!portrait && <source media="(max-width: 767px)" srcSet="/media/metalab/mobile-poster.jpg" />}
        <img
          src={portrait ? "/media/metalab/mobile-poster.jpg" : "/media/metalab/desktop-poster.jpg"}
          alt=""
          className="h-full w-full object-cover"
        />
      </picture>
      {!still && (
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay={armed}
          muted
          loop
          playsInline
          preload={lazy ? "none" : "auto"}
          poster={portrait ? "/media/metalab/mobile-poster.jpg" : "/media/metalab/desktop-poster.jpg"}
          disablePictureInPicture
          tabIndex={-1}
        >
          {!portrait && <source src="/media/metalab/mobile.mp4" type="video/mp4" media="(max-width: 767px)" />}
          <source src={portrait ? "/media/metalab/mobile.mp4" : "/media/metalab/desktop.mp4"} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
