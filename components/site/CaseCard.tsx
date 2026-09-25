"use client";

import { ui, type Work } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { ArrowIcon } from "./icons";

export function CaseVisual({ work }: { work: Work }) {
  const { t } = useLang();

  if (work.id === "saqaomuk") {
    return (
      <div className="grid min-h-[580px] grid-cols-1 overflow-hidden bg-[#145b99] md:h-[min(48vw,640px)] md:min-h-0 md:grid-cols-[58%_42%]">
        <div className="relative min-h-[400px] overflow-hidden bg-white text-[#17191b] md:min-h-0">
          <img src={work.media.src} alt={t(work.media.alt)} width={960} height={1440} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.035]" />
          <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.16em] md:left-8 md:top-8 md:text-[12px]">SAQAOMUK® / ITEM 01</span>
          <span className="absolute bottom-5 left-5 max-w-[65%] bg-white/90 px-2 py-1 font-mono text-[10px] uppercase leading-[1.45] tracking-[0.08em] md:bottom-8 md:left-8 md:text-[11px]">{t({ en: "Boiled cotton shirt", ru: "Рубашка из варёного хлопка" })}</span>
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
      <div className="relative aspect-[4/5] overflow-hidden bg-[#eee6df] text-[#322732]">
        <img src={work.media.src} alt={t(work.media.alt)} width={1055} height={1491} loading="lazy" decoding="async" className="absolute right-0 top-0 h-[68%] w-[72%] object-cover object-[72%_24%] transition-transform duration-1000 ease-out group-hover:scale-[1.025]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#eee6df]" />
        <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.14em] md:left-7 md:top-7 md:text-[12px]">02 / Profcosmetic</div>
        <div className="absolute left-5 top-[23%] font-sans text-[clamp(30px,4vw,68px)] font-light leading-[0.86] tracking-[-0.07em] md:left-7">BUSINESS<br /><span className="font-display italic tracking-[-0.02em]">inside.</span></div>
        <div role="img" aria-label={t({ en: "Illustrative preview of the private Profcosmetic owner dashboard", ru: "Схематичное превью закрытого дашборда владельца Profcosmetic" })} className="absolute inset-x-4 bottom-4 top-[47%] overflow-hidden border border-[#d0c8bd] bg-[#faf8f3] p-3 shadow-[0_20px_55px_rgba(55,37,34,0.2)] md:inset-x-7 md:bottom-7 md:p-5">
          <div aria-hidden="true" className="flex h-full flex-col">
            <div className="flex items-center gap-2 border-b border-[#ded6cb] pb-2.5 md:gap-3 md:pb-4"><span className="grid size-7 place-items-center bg-[#a53f34] text-[10px] font-semibold text-white md:size-9 md:text-[12px]">PC</span><span className="text-[11px] font-medium md:text-[14px]">Profcosmetic</span><span className="ml-auto font-mono text-[8px] uppercase tracking-[0.08em] text-[#a53f34] md:text-[10px]">Owner / 1C</span></div>
            <div className="pt-3 md:pt-5"><span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#a53f34] md:text-[10px]">Owner control tower</span><p className="mt-1 font-display text-[clamp(24px,2.7vw,42px)] leading-none tracking-[-0.035em]">{t({ en: "Business pulse", ru: "Пульс бизнеса" })}</p></div>
            <div className="mt-4 grid grid-cols-3 gap-1.5 md:mt-6 md:gap-2.5">{[{ en: "Sales", ru: "Продажи" }, { en: "Stock", ru: "Запасы" }, { en: "Sources", ru: "Данные" }].map((label) => <div key={label.en} className="min-h-[52px] border border-[#ded6cb] bg-white/65 p-2 md:min-h-[70px] md:p-3"><span className="text-[9px] text-[#776e67] md:text-[11px]">{t(label)}</span><span className="mt-3 block h-1.5 w-[65%] rounded-full bg-[#dec9bc]" /><span className="mt-1.5 block h-1 w-[40%] rounded-full bg-[#eee5dc]" /></div>)}</div>
            <div className="mt-2 flex-1 border border-[#ded6cb] bg-white/70 p-2 md:mt-2.5 md:p-3"><span className="font-mono text-[8px] uppercase tracking-[0.08em] text-[#776e67] md:text-[10px]">{t({ en: "Sales trend / source health", ru: "Динамика / качество источников" })}</span><svg viewBox="0 0 400 90" preserveAspectRatio="none" className="mt-2 h-[65%] w-full" aria-hidden="true"><path d="M0 74 L55 64 L110 68 L165 43 L220 52 L275 30 L330 36 L400 12" fill="none" stroke="#a53f34" strokeWidth="2.5" /><path d="M0 74 L55 64 L110 68 L165 43 L220 52 L275 30 L330 36 L400 12 V90 H0Z" fill="#a53f34" fillOpacity="0.08" /></svg></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden bg-[#302b28] p-[5%]">
      <img src={work.media.src} alt="" aria-hidden="true" width={1280} height={720} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-25 blur-[28px]" />
      <span className="relative font-mono text-[10px] uppercase tracking-[0.14em] text-[#eee6d8] md:text-[12px]">03 / Private archive</span>
      <div className="relative w-full overflow-hidden border border-[#a79b8a]/60 bg-[#171513] p-1.5 shadow-[0_28px_70px_rgba(0,0,0,0.6)] transition-transform duration-1000 ease-out group-hover:scale-[1.04]">
        <div aria-hidden="true" className="mb-1.5 flex items-center gap-1 px-1"><i className="size-1.5 rounded-full bg-[#8f8276]" /><i className="size-1.5 rounded-full bg-[#8f8276]" /><i className="size-1.5 rounded-full bg-[#8f8276]" /><span className="mx-auto font-mono text-[7px] tracking-[0.05em] text-[#c9bdae] md:text-[9px]">chaseje.com</span></div>
        <img src={work.media.src} alt={t(work.media.alt)} width={1280} height={720} loading="lazy" decoding="async" className="block aspect-[16/9] w-full object-cover" />
      </div>
      <div className="relative flex items-end justify-between gap-2 text-[#eee6d8]"><span className="font-display text-[clamp(44px,6vw,98px)] font-light italic leading-[0.75] tracking-[-0.055em]">private<br />archive.</span><span className="font-mono text-[10px] uppercase tracking-[0.1em] md:text-[12px]">Moscow<br />2026 ↗</span></div>
    </div>
  );
}

export function CaseCard({ work, featured = false }: { work: Work; featured?: boolean }) {
  const { t } = useLang();
  const visualHref = work.caseHref ?? work.link.href;
  const external = !work.caseHref;

  return (
    <article id={work.id} className="group scroll-mt-6">
      <a href={visualHref} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={`${work.title} — ${work.caseHref ? t(ui.viewCase) : work.link.label}`} className="block overflow-hidden rounded-[5px] focus-visible:outline-offset-4">
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
            <a href={visualHref} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={work.caseHref ? `${t(ui.viewCase)} ${work.title}` : `${t(ui.open)} ${work.link.label}`} className="ml-auto inline-flex size-10 items-center justify-center rounded-full bg-white text-ink transition-transform hover:-translate-y-1"><ArrowIcon /></a>
          </div>
        </div>
      </div>
    </article>
  );
}
