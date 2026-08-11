"use client";

import { about } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/motion/Reveal";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";

export function About() {
  const { t } = useLang();

  return (
    <section id="about" className="scroll-mt-24 pt-24 md:pt-32">
      <div className="shell">
        <div className="border-b border-line pb-5">
          <h2 className="label !text-ink">{t(about.heading)}</h2>
        </div>

        <div className="grid gap-x-14 gap-y-12 pt-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <Reveal className="space-y-7">
            {about.body.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "max-w-[44ch] text-[clamp(1.3rem,2.3vw,1.7rem)] leading-[1.38] tracking-[-0.02em]"
                    : "max-w-[52ch] text-[1.0625rem] leading-[1.62] text-ink-soft"
                }
              >
                {t(paragraph)}
              </p>
            ))}
            <p className="max-w-[46ch] border-l border-line-2 pl-5 text-[0.9375rem] leading-[1.65] text-ink-soft">
              {t(about.place)}
            </p>
          </Reveal>

          {/* The secondary work list lives here rather than in its own sparse
              section — it fills the column and shortens the page. */}
          <Reveal delay={0.1}>
            <h3 className="label !text-ink border-b border-line pb-4">{t(about.alsoHeading)}</h3>
            <ul>
              {about.also.map((item) => (
                <li key={item.title} className="border-b border-line">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-col gap-1.5 py-5 transition-opacity duration-500 hover:opacity-60"
                  >
                    <span className="flex items-center gap-2 text-[1.0625rem] tracking-[-0.02em]">
                      {item.title}
                      <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </span>
                    <span className="text-[0.875rem] leading-snug text-ink-mute">{t(item.note)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Toolchain: speed and direction ride on scroll velocity. */}
      <div className="mt-20 border-y border-line bg-paper-2 py-6 md:mt-24 md:py-7">
        <VelocityMarquee
          items={about.toolchain}
          className="text-[clamp(1.5rem,3.4vw,2.5rem)] tracking-[-0.03em] text-ink-soft"
        />
      </div>
    </section>
  );
}
