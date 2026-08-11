"use client";

import Image from "next/image";
import { ui, works, type Work } from "@/content/site";
import { v2work } from "@/content/v2";
import { useLang } from "@/lib/i18n";
import { Rise, SectionHead, SpotlightCard } from "@/components/v2/bits";

/** Bento spans — the commercial flagship gets the big tile. */
const SPAN: Record<string, string> = {
  chaseje: "lg:col-span-2 lg:row-span-2",
  saqa: "lg:col-span-1",
  petmek: "lg:col-span-1",
  profcosmetic: "lg:col-span-1",
  trustlens: "lg:col-span-2",
};

export function V2Work() {
  const { t } = useLang();

  return (
    <section id="work" className="scroll-mt-20 py-24 md:py-32">
      <div className="shell">
        <SectionHead label={t(v2work.label)} heading={t(v2work.heading)} />

        <div className="mt-10 grid auto-rows-[15rem] gap-4 lg:grid-cols-3 lg:auto-rows-[16rem]">
          {works.map((work, i) => (
            <Rise key={work.id} delay={i * 0.06} className={`h-full ${SPAN[work.id] ?? ""}`}>
              <Tile work={work} large={work.id === "chaseje"} />
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tile({ work, large }: { work: Work; large: boolean }) {
  const { t } = useLang();
  const media = work.media;

  return (
    <SpotlightCard className="h-full">
      <a
        href={work.href}
        target="_blank"
        rel="noreferrer"
        className="group/tile relative flex h-full flex-col justify-end overflow-hidden"
      >
        {media.kind === "image" ? (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            className="object-cover opacity-55 transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-[1.04] group-hover/tile:opacity-75"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-center gap-2 p-7 opacity-45 transition-opacity duration-700 group-hover/tile:opacity-70">
            {media.lines.map((line) => (
              <p key={line} className="font-mono text-[0.7rem] leading-snug text-mist-300">
                {line}
              </p>
            ))}
          </div>
        )}

        {/* Scrim keeps the label legible over any image. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(16,17,20,0.94) 0%, rgba(16,17,20,0.62) 38%, rgba(16,17,20,0.12) 100%)",
          }}
          aria-hidden
        />

        <div className="relative p-6 md:p-7">
          <div className="flex items-center gap-3">
            {work.status === "live" ? (
              <span className="v2-label flex items-center gap-1.5 text-live">
                <span className="h-1.5 w-1.5 rounded-full bg-live" />
                {t(ui.live)}
              </span>
            ) : (
              <span className="v2-label text-mist-700">
                {t(work.status === "private" ? ui.private : ui.research)}
              </span>
            )}
            <span className="v2-label text-mist-700">{t(work.kind)}</span>
          </div>

          <h3
            className={`v2-display mt-3 ${large ? "text-[clamp(1.75rem,3.4vw,2.75rem)]" : "text-[1.375rem]"}`}
          >
            {work.title}
          </h3>

          {large && (
            <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-[1.6] text-mist-300">
              {t(work.summary)}
            </p>
          )}

          <span className="v2-label mt-4 inline-flex items-center gap-2 text-mist-500 transition-colors duration-300 group-hover/tile:text-champagne">
            {work.hrefLabel}
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 group-hover/tile:translate-x-1 group-hover/tile:-translate-y-0.5"
            >
              ↗
            </span>
          </span>
        </div>
      </a>
    </SpotlightCard>
  );
}
