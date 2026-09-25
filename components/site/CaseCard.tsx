"use client";

import { ui, type Work } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { ControlTowerPanel } from "./ControlTowerPanel";
import { ArrowIcon } from "./icons";

const frame = "xr-card block aspect-[4/5] overflow-hidden rounded-[24px] bg-panel md:aspect-[16/10]";

export function CaseCard({ work }: { work: Work }) {
  const { t } = useLang();

  const media =
    work.media.kind === "image" ? (
      <img
        src={work.media.src}
        alt={t(work.media.alt)}
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    ) : (
      <ControlTowerPanel />
    );

  return (
    <article id={work.id} className="scroll-mt-6">
      {work.link ? (
        <a
          href={work.link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${work.title} — ${work.link.label}`}
          className={frame}
        >
          {media}
        </a>
      ) : (
        <div className={frame}>{media}</div>
      )}

      <div className="flex flex-col gap-3 px-1 pt-5 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="flex items-baseline gap-4">
          <span className="text-[14px] text-muted">{work.index}</span>
          <h3 className="font-display text-[clamp(32px,3.4vw,48px)] font-light leading-none tracking-[-0.02em]">{work.title}</h3>
        </div>
        <div className="flex items-center gap-[18px] text-[14px] text-muted">
          <span>{t(work.kind)}</span>
          <span>{work.year}</span>
          {work.link ? (
            <a
              href={work.link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t(ui.open)} ${work.link.label}`}
              className="flex size-9 items-center justify-center rounded-full bg-chip text-fg transition-colors hover:bg-white/20"
            >
              <ArrowIcon />
            </a>
          ) : (
            <span className="rounded-full border border-line px-3 py-1.5 text-soft">{t(ui.privateAccess)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
