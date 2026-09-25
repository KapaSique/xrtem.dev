"use client";

import { ui, type Work } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { ArrowIcon } from "./icons";

function CaseVisual({ work }: { work: Work }) {
  const { t } = useLang();

  if (work.id === "saqaomuk") {
    return (
      <div className="grid min-h-[580px] grid-cols-1 overflow-hidden bg-[#145b99] md:h-[min(48vw,640px)] md:min-h-0 md:grid-cols-[58%_42%]">
        <div className="relative min-h-[370px] overflow-hidden md:min-h-0">
          <img src={work.media.src} alt={t(work.media.alt)} width={1680} height={945} loading="lazy" decoding="async" className="h-full w-full object-cover object-[53%_47%] transition-transform duration-1000 ease-out group-hover:scale-[1.025]" />
          <span aria-hidden="true" className="absolute bottom-5 left-5 right-5 font-sans text-[clamp(44px,8.6vw,154px)] font-semibold leading-[0.8] tracking-[-0.095em] text-white md:bottom-8 md:left-8">SAQA<br />OMUK<span className="align-top text-[0.21em] tracking-normal">®</span></span>
        </div>
        <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden p-5 text-white md:min-h-0 md:p-8">
          <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.15em] md:text-[12px]">
            <span>01 / SAQAOMUK</span><span>2026 ↗</span>
          </div>
          <div className="relative mx-auto w-[min(88%,440px)] rotate-[3deg] bg-white p-1.5 shadow-[0_22px_55px_rgba(0,15,40,0.34)] transition-transform duration-700 ease-out group-hover:rotate-0 md:w-[90%] md:p-2">
            <div className="mb-1.5 flex gap-1 px-1"><i className="size-1.5 rounded-full bg-[#ff7670]" /><i className="size-1.5 rounded-full bg-[#ffce5d]" /><i className="size-1.5 rounded-full bg-[#6dce83]" /></div>
            <img src="/media/saqa/storefront.jpg" alt={t({ en: "SAQAOMUK online store preview", ru: "Фрагмент интернет-магазина SAQAOMUK" })} width={1600} height={866} loading="lazy" decoding="async" className="block h-auto w-full" />
          </div>
          <div className="flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.15em] md:text-[12px]"><span>Fashion / commerce</span><span>Yakutsk, RU</span></div>
        </div>
      </div>
    );
  }

  if (work.id === "profcosmetic") {
    return (
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f9eff3] text-[#322732]">
        <img src={work.media.src} alt={t(work.media.alt)} width={1055} height={1491} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.025]" />
        <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] md:left-7 md:top-7 md:text-[12px]"><span className="size-2 rounded-full bg-[#b77a97]" /> Beauty / campaigns</div>
        <div aria-hidden="true" className="absolute bottom-6 left-5 max-w-[90%] font-sans text-[clamp(40px,5vw,86px)] font-light leading-[0.84] tracking-[-0.075em] md:bottom-8 md:left-7">PROF<br />COSMETIC<span className="font-display text-[0.54em] italic tracking-[-0.035em]">.</span></div>
        <span className="absolute bottom-6 right-5 font-mono text-[10px] md:bottom-8 md:right-7">02 / 2026</span>
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-[#423c36] p-[8%]">
      <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#d9d0c2] md:left-7 md:top-7 md:text-[12px]">03 / Private archive</span>
      <div className="w-full overflow-hidden border border-[#a79b8a]/50 bg-[#27231f] p-1.5 shadow-[0_28px_70px_rgba(0,0,0,0.45)] transition-transform duration-1000 ease-out group-hover:scale-[1.035]">
        <img src={work.media.src} alt={t(work.media.alt)} width={1600} height={1000} loading="lazy" decoding="async" className="block aspect-[16/10] w-full object-cover" />
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#d9d0c2] md:bottom-7 md:left-7 md:right-7"><span>Chase.je</span><span>2026 ↗</span></div>
    </div>
  );
}

export function CaseCard({ work, featured = false }: { work: Work; featured?: boolean }) {
  const { t } = useLang();

  return (
    <article id={work.id} className="group scroll-mt-6">
      <a href={work.link.href} target="_blank" rel="noopener noreferrer" aria-label={`${work.title} — ${work.link.label}`} className="block overflow-hidden rounded-[5px] focus-visible:outline-offset-4">
        <CaseVisual work={work} />
      </a>
      <div className={`grid gap-6 border-t border-line pt-6 ${featured ? "mt-6 md:grid-cols-[1fr_1fr] md:gap-12" : "mt-5"}`}>
        <div className="flex items-start gap-4">
          <span className="pt-2 font-mono text-[11px] text-muted">{work.index}</span>
          <div>
            <h3 className="font-sans text-[clamp(30px,3.5vw,58px)] font-medium leading-none tracking-[-0.065em]">{work.title}</h3>
            <span className="mt-3 block text-[13px] text-muted">{t(work.kind)} · {work.year}</span>
          </div>
        </div>
        <div className={featured ? "md:pl-4" : ""}>
          <p className={`max-w-[660px] leading-[1.35] text-[#eeedf1] ${featured ? "text-[clamp(21px,2.5vw,36px)]" : "text-[clamp(19px,2vw,27px)]"}`}>{t(work.summary)}</p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {work.scope.map((item) => <span key={item.en} className="rounded-full border border-white/20 px-3 py-1 text-[11px] text-soft md:text-[12px]">{t(item)}</span>)}
            <a href={work.link.href} target="_blank" rel="noopener noreferrer" aria-label={`${t(ui.open)} ${work.link.label}`} className="ml-auto inline-flex size-10 items-center justify-center rounded-full bg-white text-ink transition-transform hover:-translate-y-1"><ArrowIcon /></a>
          </div>
        </div>
      </div>
    </article>
  );
}
