"use client";

import LiquidChrome from "@/components/reactbits/LiquidChrome";
import { useTheme } from "@/lib/theme";

/**
 * The metal the whole document floats on.
 *
 * It is fixed rather than per-section: glass only reads as glass when
 * what it refracts keeps moving as the page scrolls past. A wash sits
 * on top so that type anywhere on the page keeps its contrast without
 * every panel needing its own backing.
 */
export function Backdrop() {
  const { resolved } = useTheme();
  const dark = resolved === "dark";

  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0">
        {/* Remounted on theme change: baseColor is a uniform set at
            program build time, so the shader has to be rebuilt for the
            metal to actually change colour. */}
        <LiquidChrome
          key={resolved}
          baseColor={dark ? [0.1, 0.11, 0.15] : [0.36, 0.38, 0.43]}
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
          background: dark
            ? "radial-gradient(130% 80% at 14% 6%, rgba(14,16,21,0.92) 0%, rgba(14,16,21,0.84) 34%, rgba(14,16,21,0.72) 62%, rgba(14,16,21,0.8) 100%)"
            : "radial-gradient(130% 80% at 14% 6%, rgba(243,244,248,0.95) 0%, rgba(243,244,248,0.86) 34%, rgba(243,244,248,0.72) 62%, rgba(243,244,248,0.8) 100%)",
        }}
      />
    </div>
  );
}
