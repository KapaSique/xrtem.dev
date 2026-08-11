"use client";

import { motion, useReducedMotion } from "motion/react";
import { hero, identity } from "@/content/site";
import type { Contributions } from "@/lib/github";
import { useLang } from "@/lib/i18n";
import { TextRise } from "@/components/motion/TextRise";
import { SignalCard } from "@/components/SignalCard";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({ contributions }: { contributions: Contributions | null }) {
  const { lang, t } = useLang();
  const reduced = useReducedMotion();
  const name = t(identity.name).split(" ");
  const statement = hero.statement[lang];

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: EASE, delay },
        };

  return (
    <section id="top" className="shell flex min-h-[92svh] flex-col justify-between pt-24 pb-10 md:pt-28">
      <motion.div
        {...fade(0.1)}
        className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-line pb-5"
      >
        <span className="label !text-ink flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
          </span>
          {t(hero.status)}
        </span>
        <span className="label">{t(hero.disciplines)}</span>
      </motion.div>

      <div className="py-6 md:py-7">
        <h1 className="display text-[clamp(2.5rem,10vw,8.5rem)] uppercase">
          <span className="block">
            <TextRise segments={[{ text: name[0] ?? "" }]} delay={0.15} />
          </span>
          <span className="block">
            <TextRise segments={[{ text: name.slice(1).join(" ") }]} delay={0.24} />
          </span>
        </h1>
      </div>

      <div className="grid gap-x-14 gap-y-9 border-t border-line pt-8 lg:grid-cols-[minmax(0,1fr)_26rem]">
        <div className="flex flex-col justify-between gap-8">
          {/* Each word already carries its trailing space, so the segments must not. */}
          <p className="display max-w-[22ch] text-[clamp(1.3rem,3.1vw,2.25rem)] leading-[1.1]">
            <TextRise
              segments={[
                { text: statement[0] },
                { text: statement[1], serif: true },
                { text: statement[2] },
              ]}
              delay={0.5}
              stagger={0.035}
              duration={0.95}
            />
          </p>

          <motion.div {...fade(0.95)} className="flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-soft">{t(hero.intro)}</p>
            <a
              href="#work"
              className="label link-draw whitespace-nowrap transition-colors duration-300 hover:!text-ink"
            >
              {t(hero.scroll)} ↓
            </a>
          </motion.div>
        </div>

        <motion.div {...fade(0.8)}>
          <SignalCard data={contributions} />
        </motion.div>
      </div>
    </section>
  );
}
