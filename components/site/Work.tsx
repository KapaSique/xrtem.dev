"use client";

import Image from "next/image";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/lib/i18n";
import { works, ui, type Work as WorkItem } from "@/content/site";
import { v2work } from "@/content/v2";

const statusLabel = { live: ui.live, private: ui.private, research: ui.research } as const;

function Media({ work }: { work: WorkItem }) {
  if (work.media.kind === "image") {
    return (
      <div className="glass r-panel lift relative aspect-[4/3] overflow-hidden p-2">
        <Image
          src={work.media.src}
          alt={work.media.alt}
          fill
          sizes="(max-width: 768px) 100vw, 46vw"
          className="rounded-[26px] object-cover p-2 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  // The analytics project has no shippable screenshot, so its data path
  // is drawn instead — the same information, without a fake mockup.
  return (
    <div className="glass r-panel lift flex aspect-[4/3] flex-col justify-center gap-1 overflow-hidden p-6 md:p-8">
      {work.media.lines.map((line, i) => (
        <div key={line} className="flex items-center gap-3">
          <span className="label w-5 shrink-0 text-graphite-300">{String(i + 1).padStart(2, "0")}</span>
          <span className="flex-1 truncate font-mono text-[0.6875rem] text-graphite-600">{line}</span>
        </div>
      ))}
    </div>
  );
}

export function Work() {
  const { t } = useLang();

  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <span className="label text-graphite-400">{t(v2work.label)}</span>
            <h2 className="display max-w-[18ch] text-[clamp(1.6rem,3.4vw,2.6rem)]">
              {t(v2work.heading)}
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 md:gap-28">
          {works.map((work, i) => (
            <Reveal key={work.id} distance={24}>
              <article
                className={`group grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <a href={work.href} target="_blank" rel="noreferrer" className="block">
                  <Media work={work} />
                </a>

                <div>
                  <div className="flex items-center gap-3">
                    <span className="label text-graphite-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 bg-graphite-300" />
                    <span className="label text-graphite-400">{t(work.kind)}</span>
                    <span className="label ml-auto flex items-center gap-1.5 text-graphite-400">
                      {work.status === "live" && (
                        <span className="h-1.5 w-1.5 rounded-full bg-live [animation:live-pulse_2.4s_ease-in-out_infinite]" />
                      )}
                      {t(statusLabel[work.status])}
                    </span>
                  </div>

                  <h3 className="grotesk mt-5 text-[clamp(1.75rem,4vw,2.75rem)] font-medium">
                    {work.title}
                  </h3>

                  <p className="mt-5 max-w-[52ch] leading-relaxed text-graphite-600">
                    {t(work.summary)}
                  </p>
                  <p className="mt-4 max-w-[52ch] text-[0.8125rem] leading-relaxed text-graphite-400">
                    {t(work.note)}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                    {work.stack.map((tech) => (
                      <li
                        key={tech}
                        className="label rounded-full bg-raise/55 px-3 py-1.5 text-graphite-600"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={work.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-draw mt-7 inline-flex items-center gap-2 text-sm text-graphite-900"
                  >
                    {work.hrefLabel}
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      ↗
                    </span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
