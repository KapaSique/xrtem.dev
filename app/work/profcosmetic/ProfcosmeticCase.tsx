"use client";

import { CaseVisual } from "@/components/site/CaseCard";
import { works, type LS } from "@/content/site";
import { useLang } from "@/lib/i18n";

const work = works.find((item) => item.id === "profcosmetic")!;

const copy = {
  back: { en: "Back to projects", ru: "К проектам" },
  eyebrow: { en: "02 / Private product / 2026", ru: "02 / Закрытый продукт / 2026" },
  title: {
    en: "The business, in one clear view.",
    ru: "Бизнес — одним ясным взглядом.",
  },
  intro: {
    en: "I created the design concept and built a private analytics system for Profcosmetic. It brings sales, inventory and data quality into a single workspace for the owner, with a protected data flow from 1C.",
    ru: "Разработал дизайн-концепт и внутреннюю аналитическую систему для Profcosmetic. Продажи, остатки и качество данных собраны в одном пространстве для владельца, с защищённой передачей данных из 1С.",
  },
  privateNote: {
    en: "The live dashboard requires authorization. The interface here is an illustration; it contains no business metrics.",
    ru: "Рабочий дашборд закрыт авторизацией. Здесь показана иллюстрация интерфейса без коммерческих показателей.",
  },
  roleLabel: { en: "What I worked on", ru: "Что я сделал" },
  roles: [
    {
      index: "01",
      title: { en: "Design concept", ru: "Дизайн-концепт" },
      text: { en: "A visual system and owner dashboard that make operational signals readable at a glance.", ru: "Визуальная система и дашборд владельца, в котором рабочие показатели считываются с первого взгляда." },
    },
    {
      index: "02",
      title: { en: "Data architecture", ru: "Архитектура данных" },
      text: { en: "A protected path from 1C through synchronization and complete PostgreSQL snapshots to the owner API.", ru: "Защищённый путь от 1С через синхронизацию и полные снимки PostgreSQL к API владельца." },
    },
    {
      index: "03",
      title: { en: "Truthful states", ru: "Честные состояния" },
      text: { en: "The interface distinguishes missing, stale and limited sources instead of presenting absent data as a zero.", ru: "Интерфейс различает отсутствующие, устаревшие и ограниченные данные и не подменяет их нулём." },
    },
  ],
  flowLabel: { en: "How the system is connected", ru: "Как связана система" },
  flow: [
    { en: "1C source", ru: "Источник 1С" },
    { en: "Protected sync", ru: "Защищённый обмен" },
    { en: "Complete snapshots", ru: "Полные снимки" },
    { en: "Owner dashboard", ru: "Дашборд владельца" },
  ],
  live: { en: "Open private system", ru: "Открыть закрытую систему" },
  access: { en: "Authorization required", ru: "Требуется авторизация" },
} satisfies {
  back: LS; eyebrow: LS; title: LS; intro: LS; privateNote: LS;
  roleLabel: LS; roles: { index: string; title: LS; text: LS }[];
  flowLabel: LS; flow: LS[]; live: LS; access: LS;
};

export function ProfcosmeticCase() {
  const { t, lang, setLang } = useLang();

  return (
    <main className="min-h-screen bg-[#f2eee8] text-[#25201d]">
      <header className="flex items-center justify-between border-b border-[#cfc8bf] px-4 py-5 md:px-8">
        <a href="/#work" className="font-mono text-[11px] uppercase tracking-[0.1em] transition-opacity hover:opacity-60">← {t(copy.back)}</a>
        <a href="/" className="font-sans text-[24px] font-medium tracking-[-0.065em]">xrtem</a>
        <div role="group" aria-label={lang === "ru" ? "Язык" : "Language"} className="flex gap-2 font-mono text-[11px]">
          <button type="button" aria-pressed={lang === "ru"} onClick={() => setLang("ru")} className={lang === "ru" ? "opacity-100" : "opacity-45"}>RU</button>
          <span aria-hidden="true">/</span>
          <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")} className={lang === "en" ? "opacity-100" : "opacity-45"}>EN</button>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1600px] gap-10 px-4 pb-20 pt-16 md:grid-cols-[1.05fr_0.95fr] md:items-end md:gap-12 md:px-8 md:pb-28 md:pt-24">
        <div className="max-w-[850px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8f453c]">{t(copy.eyebrow)}</p>
          <h1 className="mt-8 font-sans text-[clamp(52px,9vw,140px)] font-medium leading-[0.82] tracking-[-0.09em]">PROF<br />COSMETIC<span className="text-[#a84137]">.</span></h1>
          <h2 className="mt-12 max-w-[800px] font-display text-[clamp(37px,4.4vw,72px)] font-light leading-[0.98] tracking-[-0.035em]">{t(copy.title)}</h2>
          <p className="mt-7 max-w-[680px] text-[clamp(18px,1.65vw,25px)] leading-[1.48] text-[#56504b]">{t(copy.intro)}</p>
          <div className="mt-10 flex flex-wrap gap-2">{work.scope.map((item) => <span key={item.en} className="rounded-full border border-[#bdb3aa] px-3.5 py-1.5 text-[12px]">{t(item)}</span>)}</div>
        </div>
        <div className="max-w-[680px] overflow-hidden rounded-[4px] shadow-[0_30px_70px_rgba(55,37,34,0.12)] md:ml-auto md:w-full"><CaseVisual work={work} /></div>
      </section>

      <section className="border-t border-[#cfc8bf] bg-[#e9e3db] px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1500px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8f453c]">{t(copy.roleLabel)}</p>
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">{copy.roles.map((role) => <div key={role.index} className="border-t border-[#a99f95] pt-5"><span className="font-mono text-[11px] text-[#8f453c]">{role.index}</span><h3 className="mt-8 font-display text-[clamp(37px,3.7vw,59px)] leading-[0.95] tracking-[-0.035em]">{t(role.title)}</h3><p className="mt-5 max-w-[390px] text-[17px] leading-[1.5] text-[#56504b]">{t(role.text)}</p></div>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8f453c]">{t(copy.flowLabel)}</p>
        <div className="mt-10 grid gap-2 md:grid-cols-4">{copy.flow.map((step, index) => <div key={step.en} className="flex min-h-[150px] items-end justify-between border border-[#cfc8bf] bg-[#faf8f4] p-5"><span className="max-w-[180px] font-display text-[28px] leading-none md:text-[clamp(25px,2.3vw,36px)]">{t(step)}</span><span className="font-mono text-[11px] text-[#a84137]">{String(index + 1).padStart(2, "0")} ↗</span></div>)}</div>
        <p className="mt-8 max-w-[780px] text-[14px] leading-[1.5] text-[#716a64]">{t(copy.privateNote)}</p>
        <div className="mt-14 flex flex-wrap items-center gap-5 border-t border-[#cfc8bf] pt-7"><a href={work.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#25201d] px-6 py-3 text-[14px] text-white transition-colors hover:bg-[#a84137]">{t(copy.live)} ↗</a><span className="text-[13px] text-[#716a64]">{t(copy.access)}</span><a href="/#work" className="ml-auto font-mono text-[12px] uppercase tracking-[0.08em]">← {t(copy.back)}</a></div>
      </section>
    </main>
  );
}
