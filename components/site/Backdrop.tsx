"use client";

import LiquidChrome from "@/components/reactbits/LiquidChrome";

/**
 * The metal the whole document floats on.
 *
 * It is fixed rather than per-section: glass only reads as glass when
 * what it refracts keeps moving as the page scrolls past. A milky wash
 * sits on top so that black type anywhere on the page keeps its
 * contrast without every panel needing its own backing.
 */
export function Backdrop() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0">
        <LiquidChrome
          baseColor={[0.36, 0.38, 0.43]}
          speed={0.09}
          amplitude={0.5}
          frequencyX={2.9}
          frequencyY={2.2}
          interactive
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 80% at 14% 6%, rgba(243,244,248,0.95) 0%, rgba(243,244,248,0.86) 34%, rgba(243,244,248,0.72) 62%, rgba(243,244,248,0.8) 100%)",
        }}
      />
    </div>
  );
}
