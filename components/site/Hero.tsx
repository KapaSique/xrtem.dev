"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/lib/i18n";
import { identity, hero } from "@/content/site";
import { v2hero, v2trust } from "@/content/v2";

/**
 * Local time in Yakutsk, ticking.
 *
 * "Yakutsk, UTC+9" is a fact the reader has to decode; a running clock
 * is the same fact, already decoded — and it quietly answers the real
 * question behind it, which is whether the timezone gap matters.
 * Rendered only after mount, since server and client clocks differ and
 * a mismatch would trip hydration.
 */
function YakutskClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const read = () =>
      setTime(
        new Intl.DateTimeFormat("ru-RU", {
          timeZone: "Asia/Yakutsk",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );

    read();
    const id = window.setInterval(read, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="grotesk tabular-nums" suppressHydrationWarning>
      {time ?? "—:—"}
    </span>
  );
}

export function Hero() {
  const { lang, t } = useLang();
  const headline = v2hero.headline[lang];

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="shell flex min-h-[100svh] flex-col justify-center pt-28 pb-44 md:pb-40">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-14">
          {/* ------------------------------------------------ statement */}
          <div>
            <Reveal distance={14} delay={0.05}>
              <div className="glass r-pill inline-flex items-center gap-2.5 py-2 pl-3 pr-4">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-live [animation:live-pulse_2.4s_ease-in-out_infinite]" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
                </span>
                <span className="label text-graphite-600">{t(hero.status)}</span>
              </div>
            </Reveal>

            <Reveal distance={26} delay={0.12}>
              <h1 className="display mt-7 max-w-[15ch] text-[clamp(2.4rem,6vw,5rem)] text-graphite-900">
                <span className="block">{headline[0]}</span>
                <span className="block text-graphite-400">{headline[1]}</span>
                <span className="block">{headline[2]}</span>
              </h1>
            </Reveal>

            <Reveal distance={20} delay={0.24}>
              <p className="mt-7 max-w-[44ch] leading-relaxed text-graphite-600">
                {t(v2hero.sub)}
              </p>
            </Reveal>

            <Reveal distance={16} delay={0.34}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${identity.email}`}
                  className="glass-dark r-pill press lift group inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium text-silver-50"
                >
                  {t(v2hero.primary)}
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href="#work"
                  className="glass r-pill press lift inline-flex items-center px-6 py-3.5 text-sm text-graphite-900"
                >
                  {t(v2hero.secondary)}
                </a>
              </div>
            </Reveal>
          </div>

          {/* ------------------------------------------------- the card */}
          <Reveal distance={30} delay={0.3}>
            <div className="glass r-panel lift p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="grotesk text-lg tracking-tight text-graphite-900">
                    {t(identity.name)}
                  </div>
                  <div className="label mt-2 text-graphite-400">
                    {t(hero.disciplines).split(" · ").slice(0, 2).join(" · ")}
                  </div>
                </div>
                <span className="label rounded-full bg-graphite-900/6 px-2.5 py-1.5 text-graphite-600">
                  {identity.github.handle}
                </span>
              </div>

              {/* Clock row — the timezone, answered rather than stated. */}
              <div className="mt-7 border-t border-graphite-900/10 pt-5">
                <div className="flex items-end justify-between gap-4">
                  <div className="label text-graphite-400">
                    {t({ en: "Yakutsk · UTC+9", ru: "Якутск · UTC+9" })}
                  </div>
                  <div className="text-[2rem] leading-none text-graphite-900">
                    <YakutskClock />
                  </div>
                </div>
                <div className="label mt-3 text-graphite-400">{t(v2hero.reply)}</div>
              </div>

              {/* Three figures, as a widget row. */}
              <div className="mt-6 grid grid-cols-3 gap-2">
                {hero.stats.map((stat) => (
                  <div
                    key={stat.value}
                    className="rounded-2xl bg-white/45 px-3 py-3.5 text-center"
                  >
                    <div className="grotesk text-lg text-graphite-900">{stat.value}</div>
                    <div className="label mt-1.5 leading-[1.5] text-graphite-400">
                      {t(stat.label)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ------------------------------------------------------- dock */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center px-4">
        <Reveal distance={20} delay={0.5}>
          <div className="glass r-pill pointer-events-auto flex items-center gap-1 p-2">
            <span className="label hidden px-3 text-graphite-400 sm:block">
              {t(v2trust.label)}
            </span>
            {v2trust.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                title={item.name}
                className="group relative rounded-full px-3 py-2.5 text-[0.8125rem] text-graphite-600 transition-all duration-300 hover:bg-white/70 hover:text-graphite-900 sm:px-4"
              >
                {item.name.replace(/\.(com|app|dev)$/, "")}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
