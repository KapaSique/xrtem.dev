"use client";

import { services } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="flex scroll-mt-4 flex-col gap-10 bg-ink px-4 pb-24 text-fg md:gap-[70px] md:px-6 md:pb-[200px]">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-[56px] font-light leading-none tracking-[-0.03em] md:pl-36 md:text-[clamp(72px,7.8vw,112px)] md:tracking-[-0.035em]">
            {t(services.headingLead)} <em className="italic">{t(services.headingAccent)}</em>
          </h2>
          <span className="shrink-0 text-[14px] text-muted">{t(services.label)}</span>
        </div>
      </Reveal>

      <div className="flex flex-col border-b border-line">
        {services.items.map((item) => (
          <a
            key={item.index}
            href="#contact"
            className="xr-row grid grid-cols-[40px_minmax(0,1fr)_28px] items-center gap-x-4 gap-y-3 border-t border-line py-6 md:grid-cols-[120px_minmax(0,1fr)_420px_56px] md:gap-6 md:py-9"
          >
            <span className="text-[14px] text-muted">{item.index}</span>
            <span className="xr-row-t font-display text-[30px] font-light leading-none tracking-[-0.025em] md:text-[clamp(40px,4.4vw,64px)]">
              {t(item.title)}
            </span>
            <span className="col-start-2 col-end-4 row-start-2 text-[15px] leading-[1.5] text-muted md:col-auto md:row-auto md:text-[16px]">
              {t(item.text)}
            </span>
            <span
              aria-hidden="true"
              className="xr-plus col-start-3 row-start-1 flex size-7 items-center justify-center rounded-full border border-line text-[18px] md:col-auto md:row-auto md:size-14 md:text-[24px]"
            >
              +
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
