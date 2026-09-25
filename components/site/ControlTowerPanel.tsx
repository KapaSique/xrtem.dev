"use client";

import { controlTower } from "@/content/site";
import { useLang } from "@/lib/i18n";

/**
 * The dashboard sits behind Basic Auth, so the card shows its shape: drifting
 * glow, the revenue line and three status tiles. `bare` keeps only the glow
 * and the line — the version small enough to sit inside a line of text. A
 * paragraph may not hold a <div>, so that version is built from spans.
 */
export function ControlTowerPanel({ bare = false }: { bare?: boolean }) {
  const { t } = useLang();
  const Box = bare ? "span" : "div";

  return (
    <Box
      role={bare ? undefined : "img"}
      aria-label={bare ? undefined : t(controlTower.label)}
      className="relative block h-full w-full overflow-hidden bg-panel text-fg"
    >
      <Box aria-hidden="true" className="absolute inset-0">
        <Box className="xa1 absolute left-[33%] top-[4%] h-[43%] w-[27%] rounded-full bg-glow opacity-55 blur-[66px]" />
        <Box className="xa2 absolute left-[7%] top-[41%] h-[32%] w-[24%] rounded-full bg-[#9a97a8] opacity-35 blur-[60px]" />
        <Box className="xa3 absolute left-[18%] top-[15%] h-[39%] w-[18%] rounded-full bg-[#2a1f7a] opacity-60 blur-[72px]" />
        <Box className="xr-noise absolute inset-0 opacity-[0.18] mix-blend-overlay" />
      </Box>
      <Box aria-hidden="true" className="absolute inset-6 flex flex-col gap-3.5 md:inset-9">
        {!bare && (
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-soft md:text-[12px]">
            <span>{t(controlTower.revenue)}</span>
            <span className="xpulse">● {controlTower.sync}</span>
          </div>
        )}
        <svg viewBox="0 0 520 190" preserveAspectRatio="none" fill="none" className="h-[38%] w-full">
          <path
            d="M0 150 C60 140 80 90 130 100 S210 150 260 110 S350 40 400 60 S480 30 520 20"
            stroke="#ffffff"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 150 C60 140 80 90 130 100 S210 150 260 110 S350 40 400 60 S480 30 520 20 V190 H0Z"
            fill="#ffffff"
            fillOpacity="0.07"
          />
        </svg>
        {!bare && (
          <div className="mt-auto grid grid-cols-3 gap-2.5">
            {controlTower.tiles.map((tile) => (
              <div key={tile.label.en} className="rounded-[14px] border border-line bg-white/[0.04] p-3 md:p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted md:text-[11px]">{t(tile.label)}</div>
                <div className="mt-1.5 font-display text-[clamp(20px,2.6vw,36px)] font-light leading-none">{t(tile.value)}</div>
              </div>
            ))}
          </div>
        )}
      </Box>
    </Box>
  );
}
