"use client";

import { marquee } from "@/content/site";
import { useLang } from "@/lib/i18n";

function Row({ words }: { words: string[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {words.map((word) => (
        <span key={word} className="flex items-center whitespace-nowrap pl-8 md:pl-12">
          {word}
          <span className="pl-8 text-[0.45em] md:pl-12">✦</span>
        </span>
      ))}
    </div>
  );
}

/** Two bands crossing at ±3°; each holds the list twice, so -50% loops cleanly. */
export function Marquee() {
  const { t } = useLang();
  const words = marquee.map((item) => t(item));

  return (
    <section aria-label={words.join(", ")} className="relative h-[170px] overflow-hidden bg-ink text-fg md:h-[330px]">
      <div
        aria-hidden="true"
        className="absolute left-[-3%] top-[110px] hidden h-[100px] w-[106%] rotate-3 items-center overflow-hidden border-y border-white/25 md:flex"
      >
        <div className="xr-mr xr-stroke flex w-max font-display text-[64px] font-light">
          <Row words={words} />
          <Row words={words} />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute left-[-3%] top-[48px] flex h-[72px] w-[106%] -rotate-3 items-center overflow-hidden bg-glow md:top-[120px] md:h-[100px]"
      >
        <div className="xr-ml flex w-max font-display text-[40px] font-light md:text-[64px]">
          <Row words={words} />
          <Row words={words} />
        </div>
      </div>
    </section>
  );
}
