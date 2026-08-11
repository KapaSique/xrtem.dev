"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { contact, identity } from "@/content/site";
import { v2cta, v2faq } from "@/content/v2";
import { useLang } from "@/lib/i18n";
import { Aurora, Magnetic, Rise, SectionHead } from "@/components/v2/bits";

export function V2Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section id="faq" className="scroll-mt-20 py-24 md:py-32">
      <div className="shell">
        <SectionHead label={t(v2faq.label)} heading={t(v2faq.heading)} />

        <ul className="mt-4">
          {v2faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className="border-b border-white/8">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-8 py-7 text-left transition-colors duration-300 hover:text-champagne"
                >
                  <span className="text-[1.0625rem] tracking-[-0.015em] md:text-[1.25rem]">
                    {t(item.q)}
                  </span>
                  <span
                    className={`relative h-3 w-3 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-current" />
                    <span className="absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-current" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.45 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[68ch] pb-8 text-[0.9375rem] leading-[1.68] text-mist-300 md:text-base">
                        {t(item.a)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function V2Cta() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <section className="relative overflow-hidden border-t border-white/8 bg-graphite-950 pt-24 pb-10 md:pt-32">
      <Aurora className="opacity-70" />

      <div className="shell relative">
        <Rise>
          <h2 className="v2-display max-w-[16ch] text-[clamp(2.25rem,6.4vw,5rem)]">
            {t(v2cta.heading)}
          </h2>
          <p className="mt-7 max-w-[54ch] text-[1.0625rem] leading-[1.62] text-mist-300">
            {t(v2cta.sub)}
          </p>
        </Rise>

        <Rise delay={0.1} className="mt-11 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href={`mailto:${identity.email}`}
              className="press inline-flex items-center gap-2.5 bg-champagne px-7 py-4 text-[0.9375rem] font-medium tracking-[-0.01em] text-graphite-950 transition-colors duration-300 hover:bg-mist-100"
            >
              {t(v2cta.primary)}
              <span aria-hidden>→</span>
            </a>
          </Magnetic>

          <a
            href={identity.telegram.href}
            target="_blank"
            rel="noreferrer"
            className="press inline-flex items-center gap-2.5 border border-white/16 px-7 py-4 text-[0.9375rem] tracking-[-0.01em] text-mist-100 transition-colors duration-300 hover:border-white/32 hover:bg-white/[0.04]"
          >
            {t(v2cta.secondary)}
            <span aria-hidden>↗</span>
          </a>
        </Rise>

        <Rise delay={0.18} className="mt-14">
          <a
            href={`mailto:${identity.email}`}
            className="link-draw inline-block text-[clamp(1.125rem,2.8vw,2rem)] tracking-[-0.035em] text-mist-100"
          >
            {identity.email}
          </a>
        </Rise>

        <div className="mt-20 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-white/8 pt-6 md:mt-28">
          <span className="v2-label text-mist-700">
            © {year} {t(identity.name)}
          </span>
          <span className="v2-label text-mist-700">{t(contact.place)}</span>
          <div className="flex items-center gap-6">
            {[identity.github, identity.kaggle, identity.telegram].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="v2-label text-mist-700 transition-colors duration-300 hover:text-mist-100"
              >
                {link.handle}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
