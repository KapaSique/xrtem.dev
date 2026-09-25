"use client";

import { hero, ui, works } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { BackgroundVideo } from "./BackgroundVideo";
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
      <BackgroundVideo className="pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,12,.52),rgba(5,4,12,.06)_38%,rgba(5,4,12,.42)_100%)]" />

      <Header />

      <p
        className="xr-ch relative ml-auto mt-12 w-[240px] px-4 text-[14px] leading-[1.4] md:absolute md:left-[59%] md:top-[24%] md:m-0 md:w-[290px] md:px-0 md:text-[16px]"
        style={{ animationDelay: "1.1s" }}
      >
        {t(hero.intro)}
      </p>

      <h1 className="relative mt-auto px-4 font-display text-[clamp(56px,15vw,82px)] font-light leading-[0.9] tracking-[-0.04em] md:absolute md:left-[30%] md:top-[57%] md:mt-0 md:px-0 md:text-[clamp(72px,8.9vw,136px)] md:leading-[0.86]">
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
        className="relative mt-9 flex flex-wrap gap-2 px-4 pb-9 md:absolute md:left-6 md:top-[30%] md:mt-0 md:flex-col md:items-start md:px-0 md:pb-0"
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
