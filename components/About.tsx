"use client";

import { about } from "@/content/site";
import type { Contributions as Data } from "@/lib/github";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { Contributions } from "@/components/Contributions";

export function About({ contributions }: { contributions: Data | null }) {
  const { t } = useLang();

  return (
    <section id="about" className="scroll-mt-24 pt-28 md:pt-40">
      <div className="shell">
        <div className="border-b border-line pb-5">
          <h2 className="label !text-ink">{t(about.heading)}</h2>
        </div>

        <div className="grid gap-x-16 gap-y-12 pt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:pt-16">
          <Reveal className="space-y-7">
            {about.body.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "max-w-[46ch] text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.42] tracking-[-0.015em]"
                    : "max-w-[52ch] text-[1.0625rem] leading-[1.62] text-ink-soft"
                }
              >
                {t(paragraph)}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="space-y-12">
            <p className="max-w-[46ch] border-l border-line-2 pl-5 text-[0.9375rem] leading-[1.65] text-ink-soft">
              {t(about.place)}
            </p>
            <Contributions data={contributions} />
          </Reveal>
        </div>
      </div>

      {/* Toolchain: speed and direction ride on scroll velocity. */}
      <div className="mt-20 border-y border-line py-6 md:mt-28 md:py-8">
        <VelocityMarquee
          items={about.toolchain}
          className="text-[clamp(1.5rem,3.6vw,2.75rem)] tracking-[-0.03em] text-ink-soft"
        />
      </div>

      <div className="shell pt-20 md:pt-28">
        <div className="border-b border-line pb-5">
          <h3 className="label !text-ink">{t(about.alsoHeading)}</h3>
        </div>
        <ul>
          {about.also.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <li className="border-b border-line">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-2 py-6 transition-opacity duration-500 hover:opacity-60 md:flex-row md:items-baseline md:justify-between md:gap-10"
                >
                  <span className="text-[1.125rem] tracking-[-0.02em]">{item.title}</span>
                  <span className="flex items-center gap-3 text-[0.9375rem] text-ink-mute md:text-right">
                    {t(item.note)}
                    <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
