"use client";

import { contact, identity } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";

export function Contact() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const channels = [
    { label: "Telegram", ...identity.telegram },
    { label: "GitHub", ...identity.github },
    { label: "Kaggle", ...identity.kaggle },
  ];

  return (
    /* The page closes on ink rather than paper: the light version had no
       weight at the bottom and read as unfinished. */
    <section id="contact" className="mt-24 scroll-mt-16 bg-ink pt-20 pb-10 text-paper md:mt-32 md:pt-28">
      <div className="shell">
        <div className="border-b border-paper/20 pb-5">
          <h2 className="label !text-paper/55">{t({ en: "Contact", ru: "Контакты" })}</h2>
        </div>

        <Reveal className="pt-14 md:pt-20">
          <p className="display text-[clamp(2.75rem,9.5vw,7.5rem)]">{t(contact.heading)}</p>
          <p className="mt-8 max-w-[46ch] text-[1.0625rem] leading-[1.62] text-paper/70">
            {t(contact.line)}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 md:mt-20">
          <a
            href={`mailto:${identity.email}`}
            className="link-draw inline-block text-[clamp(1.25rem,3.4vw,2.5rem)] tracking-[-0.035em]"
          >
            {identity.email}
          </a>
        </Reveal>

        <ul className="mt-16 grid gap-px border-t border-paper/20 bg-paper/20 sm:grid-cols-3 md:mt-24">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 0.06} className="bg-ink">
              <li>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-baseline justify-between gap-6 py-7 pr-2 transition-opacity duration-500 hover:opacity-60 sm:flex-col sm:items-start sm:gap-4 sm:pr-8"
                >
                  <span className="label !text-paper/45">{channel.label}</span>
                  <span className="flex items-center gap-2 text-[1.0625rem] tracking-[-0.02em]">
                    {channel.handle}
                    <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>

        <div className="mt-20 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-paper/20 pt-6 md:mt-28">
          <span className="label !text-paper/45">
            © {year} {t(identity.name)}
          </span>
          <span className="label !text-paper/45">{t(contact.place)}</span>
          <a
            href="#top"
            className="label link-draw !text-paper/45 transition-colors duration-300 hover:!text-paper"
          >
            {identity.domain} ↑
          </a>
        </div>
      </div>
    </section>
  );
}
