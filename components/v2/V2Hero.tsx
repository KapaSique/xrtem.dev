"use client";

import { motion, useReducedMotion } from "motion/react";
import { identity } from "@/content/site";
import { v2hero, v2trust } from "@/content/v2";
import { useLang } from "@/lib/i18n";
import { Aurora, GradientText, Magnetic } from "@/components/v2/bits";

const EASE = [0.16, 1, 0.3, 1] as const;

export function V2Hero() {
  const { lang, t } = useLang();
  const reduced = useReducedMotion();
  const lines = v2hero.headline[lang];

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20, filter: "blur(10px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 1, ease: EASE, delay },
        };

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      <Aurora src="/media/v2/hero-field.jpg" priority />

      <div className="shell relative">
        <motion.p {...rise(0.05)} className="v2-label text-mist-500">
          {t(v2hero.eyebrow)}
        </motion.p>

        <h1 className="v2-display mt-8 max-w-[17ch] text-[clamp(2.5rem,7.2vw,5.75rem)] md:mt-10">
          {lines.map((line, i) => (
            <motion.span key={i} {...rise(0.12 + i * 0.09)} className="block">
              {i === 1 ? <GradientText>{line}</GradientText> : line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          {...rise(0.42)}
          className="mt-9 max-w-[56ch] text-[1.0625rem] leading-[1.62] text-mist-300 md:text-[1.125rem]"
        >
          {t(v2hero.sub)}
        </motion.p>

        <motion.div {...rise(0.52)} className="mt-11 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href={`mailto:${identity.email}`}
              className="press inline-flex items-center gap-2.5 bg-champagne px-7 py-4 text-[0.9375rem] font-medium tracking-[-0.01em] text-graphite-950 transition-colors duration-300 hover:bg-mist-100"
            >
              {t(v2hero.primary)}
              <span aria-hidden>→</span>
            </a>
          </Magnetic>

          <a
            href="#work"
            className="press inline-flex items-center gap-2.5 border border-white/16 px-7 py-4 text-[0.9375rem] tracking-[-0.01em] text-mist-100 transition-colors duration-300 hover:border-white/32 hover:bg-white/[0.04]"
          >
            {t(v2hero.secondary)}
            <span aria-hidden>↓</span>
          </a>

          <span className="v2-label flex items-center gap-2 text-mist-700">
            <span className="h-1.5 w-1.5 rounded-full bg-live" />
            {t(v2hero.reply)}
          </span>
        </motion.div>

        {/* Proof sits directly under the ask, where the doubt appears. */}
        <motion.div
          {...rise(0.66)}
          className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-white/8 pt-7 md:mt-28"
        >
          <span className="v2-label text-mist-700">{t(v2trust.label)}</span>
          {v2trust.items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="text-[0.9375rem] tracking-[-0.01em] text-mist-500 transition-colors duration-300 hover:text-mist-100"
            >
              {item.name}
            </a>
          ))}
          <span className="v2-label ml-auto text-champagne">{t(v2trust.badge)}</span>
        </motion.div>
      </div>
    </section>
  );
}
