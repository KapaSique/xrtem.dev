"use client";

import { ui, works } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { CaseCard } from "./CaseCard";
import { Reveal } from "./Reveal";

export function Work() {
  const { t } = useLang();

  return (
    <section id="work" className="scroll-mt-4 bg-ink px-4 pb-28 pt-24 text-fg md:px-6 md:pb-44 md:pt-36">
      <div className="mb-12 grid gap-6 border-t border-line pt-5 md:mb-20 md:grid-cols-[1fr_2fr]">
        <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted">01 / {t(ui.selectedWork)}</span>
        <h2 className="max-w-[880px] font-display text-[clamp(48px,7.8vw,118px)] font-light leading-[0.9] tracking-[-0.045em]">
          {t(ui.projects)}<span className="text-muted">.</span>
        </h2>
      </div>
      <div className="grid gap-x-6 gap-y-20 md:grid-cols-2 md:gap-y-28">
        {works.map((work, i) => (
          <Reveal key={work.id} className={i === 0 ? "md:col-span-2" : ""}>
            <CaseCard work={work} featured={i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
