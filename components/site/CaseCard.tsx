"use client";

import { ui, type Work } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { ArrowIcon } from "./icons";

const frame = "xr-card relative block aspect-[4/5] overflow-hidden rounded-[22px] bg-panel";

export function CaseCard({ work, featured = false }: { work: Work; featured?: boolean }) {
  const { t } = useLang();

  return (
    <article id={work.id} className="group scroll-mt-6">
      <a
        href={work.link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${work.title} — ${work.link.label}`}
        className={`${frame} ${featured ? "md:aspect-[16/9]" : "md:aspect-[4/5]"}`}
      >
        <img
          src={work.media.src}
          alt={t(work.media.alt)}
          width={1600}
          height={1000}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </a>

      <div className="flex flex-col gap-3 px-1 pt-5 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[12px] text-muted">{work.index}</span>
          <h3 className="font-display text-[clamp(36px,4vw,58px)] font-light leading-none tracking-[-0.025em]">{work.title}</h3>
        </div>
        <div className="flex items-center gap-[18px] text-[14px] text-muted">
          <span>{t(work.kind)}</span>
          <span>{work.year}</span>
          <a
            href={work.link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t(ui.open)} ${work.link.label}`}
            className="flex size-9 items-center justify-center rounded-full bg-chip text-fg transition-colors hover:bg-white/20"
          >
            <ArrowIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
