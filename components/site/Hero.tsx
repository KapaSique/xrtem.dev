"use client";

import { hero, ui, works } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { GlassLoop } from "./GlassLoop";
import { Header } from "./Header";
import { ScrambleWord } from "./ScrambleWord";

/** Letters rise one after another; each one is its own inline-block. */
function Rise({ text, start, step = 0.035 }: { text: string; start: number; step?: number }) {
  return (
    <>
      {Array.from(text).map((char, i) => (
        <span key={i} className="xr-ch" style={{ animationDelay: `${(start + i * step).toFixed(3)}s` }}>
          {char === " " ? " " : char}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const { t, lang } = useLang();
  const words = hero.words[lang];
  const one = t(hero.lineOne);
  const two = t(hero.lineTwo);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[max(780px,100svh)] flex-col overflow-hidden bg-ink text-fg md:min-h-[max(760px,100svh)]"
    >
      <GlassLoop className="pointer-events-none absolute left-1/2 top-[110px] aspect-square w-[104vw] -translate-x-1/2 md:left-auto md:right-[-4%] md:top-[6%] md:w-[min(88svh,62vw)] md:translate-x-0" />
      <div aria-hidden="true" className="xr-grain pointer-events-none absolute -inset-10 opacity-[0.16] mix-blend-overlay" />

      <Header />

      <p
        className="xr-ch relative ml-auto mt-3 w-[220px] px-4 text-[14px] leading-[1.4] md:absolute md:left-[62.6%] md:top-[200px] md:m-0 md:w-[236px] md:px-0 md:text-[16px]"
        style={{ animationDelay: "1.1s" }}
      >
        {t(hero.intro)}
      </p>

      <h1 className="relative mt-auto px-4 font-display text-[60px] font-light leading-[56px] tracking-[-0.035em] md:absolute md:left-[29.9%] md:top-[52%] md:mt-0 md:px-0 md:text-[clamp(72px,8.9vw,128px)] md:leading-[0.97]">
        <span className="sr-only">{`${one} ${two} ${words[0]}`}</span>
        <span aria-hidden="true" className="block whitespace-nowrap">
          <Rise text={one} start={0.35} />
        </span>
        <span aria-hidden="true" className="block whitespace-nowrap pl-[29px] md:pl-0">
          <Rise text={`${two} `} start={0.35 + one.length * 0.035} />
          {/* On a phone the longest word would run off the edge, so it takes
              its own line, stepped in like the 390 mockup. */}
          <br className="md:hidden" />
          <span className="xr-ch ml-8 italic md:ml-0" style={{ animationDelay: "0.9s" }}>
            <ScrambleWord words={words} />
          </span>
        </span>
      </h1>

      <nav
        aria-label={t(ui.projects)}
        className="relative mt-6 flex flex-wrap gap-2 px-4 pb-8 md:absolute md:left-6 md:top-[240px] md:mt-0 md:flex-col md:items-start md:px-0 md:pb-0"
      >
        {works.map((work, i) => (
          <a
            key={work.id}
            href={`#${work.id}`}
            className="xr-ch inline-flex h-[30px] items-center whitespace-nowrap rounded-full bg-chip px-3.5 text-[14px] backdrop-blur-[10px] transition-colors hover:bg-white/20"
            style={{ animationDelay: `${(0.9 + i * 0.07).toFixed(2)}s` }}
          >
            {work.title}
          </a>
        ))}
      </nav>

      <div className="absolute inset-x-6 bottom-[26px] hidden items-end justify-between text-[14px] text-muted md:flex">
        <span>{hero.disciplines}</span>
        <a href="#work" className="flex flex-col items-center gap-2.5 text-fg">
          <span>{t(hero.scroll)}</span>
          <span className="relative block h-12 w-px overflow-hidden bg-white/20">
            <span className="xr-drop absolute inset-0 block bg-fg" />
          </span>
        </a>
        <span className="flex items-center gap-2.5">
          <span className="xpulse size-1.5 rounded-full bg-fg" />
          {t(hero.status)}
        </span>
      </div>
    </section>
  );
}
