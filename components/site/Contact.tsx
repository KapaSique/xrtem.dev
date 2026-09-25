"use client";

import { contact, identity } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { useYakutskTime } from "@/lib/useYakutskTime";
import { BackgroundVideo } from "./BackgroundVideo";
import { ArrowIcon } from "./icons";
import { Reveal } from "./Reveal";

export function Contact() {
  const { t } = useLang();
  const time = useYakutskTime();

  return (
    <footer id="contact" className="relative isolate flex min-h-[700px] flex-col overflow-hidden bg-ink text-fg md:min-h-[1100px]">
      <BackgroundVideo lazy className="pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink/30" />

      <div className="relative flex grow flex-col px-4 pt-28 md:px-6 md:pt-[180px]">
        <Reveal>
          <span className="block text-[14px] text-soft md:pl-[31%]">{t(contact.label)}</span>
          <h2 className="mt-8 font-display text-[64px] font-light leading-[0.98] tracking-[-0.035em] md:mt-10 md:pl-[31%] md:text-[clamp(88px,10vw,144px)] md:tracking-[-0.04em]">
            {t(contact.lineOne)}
            <br />
            <span className="xr-shine">{t(contact.lineTwo)}</span>
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center gap-3 md:mt-[70px] md:pl-[31%]">
          <a
            href={`mailto:${identity.email}`}
            className="xr-spin inline-flex h-[60px] items-center gap-3.5 rounded-full pl-6 pr-2.5 text-[17px] md:h-[72px] md:pl-8 md:pr-3 md:text-[20px]"
          >
            {identity.email}
            <span className="flex size-10 items-center justify-center rounded-full bg-fg text-ink md:size-[50px]">
              <ArrowIcon size={18} />
            </span>
          </a>
          <a href={identity.telegram.href} className="inline-flex h-12 items-center rounded-full bg-chip px-4 text-[16px] transition-colors hover:bg-white/20 md:h-14 md:text-[17px]">
            {identity.telegram.label}
          </a>
          <a href={identity.github.href} className="inline-flex h-12 items-center rounded-full bg-chip px-4 text-[16px] transition-colors hover:bg-white/20 md:h-14 md:text-[17px]">
            {identity.github.label}
          </a>
        </div>

        <div className="mt-auto flex justify-between gap-4 py-[26px] text-[13px] text-soft md:text-[14px]">
          <span>{contact.copyright}</span>
          <span className="tabular-nums">
            {t(contact.city)}, YKS {time ?? "--:--"}
          </span>
          <a href="#top" className="hover:text-fg">
            {t(contact.top)}
          </a>
        </div>
      </div>
    </footer>
  );
}
