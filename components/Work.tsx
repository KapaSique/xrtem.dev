"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { ui, works, type Work } from "@/content/site";
import { useLang } from "@/lib/i18n";

const liveCount = works.filter((w) => w.status === "live").length;

/** Russian needs three forms: 1 проект, 2 проекта, 5 проектов. */
function pluralRu(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

export function WorkSection() {
  const { t } = useLang();
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="shell scroll-mt-24 pt-24 md:pt-32">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-line pb-5">
        <h2 className="label !text-ink">{t({ en: "Selected work", ru: "Избранные работы" })}</h2>
        <span className="label">
          {t({
            en: `${works.length} projects · ${liveCount} in production`,
            ru: `${works.length} ${pluralRu(works.length, "проект", "проекта", "проектов")} · ${liveCount} в проде`,
          })}
        </span>
      </div>

      <div className="grid gap-x-16 lg:grid-cols-[minmax(0,43%)_minmax(0,1fr)]">
        {/* Sticky media column — a visual echo of the list, hidden from AT. */}
        <div className="relative hidden lg:block" aria-hidden="true">
          {/* A fixed ratio rather than a viewport height: 4:3 keeps the
              16:10 captures from being cropped down to a square. */}
          <div className="sticky top-[16vh] mt-14 aspect-[4/3] w-full">
            {works.map((work, index) => (
              <motion.div
                key={work.id}
                className="absolute inset-0 overflow-hidden border border-line"
                initial={false}
                animate={{
                  opacity: index === active ? 1 : 0,
                  scale: index === active ? 1 : 1.03,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Media work={work} />
              </motion.div>
            ))}
          </div>
        </div>

        <ol className="mt-2">
          {works.map((work, index) => (
            <Row key={work.id} work={work} index={index} active={active === index} onActive={setActive} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Row({
  work,
  index,
  active,
  onActive,
}: {
  work: Work;
  index: number;
  active: boolean;
  onActive: (index: number) => void;
}) {
  const { t } = useLang();
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="border-t border-line">
      <a
        href={work.href}
        target="_blank"
        rel="noreferrer"
        className="group block py-9 transition-opacity duration-700 md:py-11 lg:opacity-55 lg:data-[active=true]:opacity-100"
        data-active={active}
      >
        <div className="flex items-baseline justify-between gap-6">
          <span className="label">{String(index + 1).padStart(2, "0")}</span>
          <span className="label flex items-center gap-3">
            <Status work={work} />
            <span aria-hidden>·</span>
            {t(work.kind)}
            <span aria-hidden>·</span>
            {work.year}
          </span>
        </div>

        <h3 className="display mt-5 text-[clamp(2rem,5.6vw,3.75rem)]">{work.title}</h3>

        {/* On narrow screens the media travels with its row instead of sticking. */}
        <div className="relative mt-7 aspect-[4/3] overflow-hidden border border-line sm:aspect-[16/10] lg:hidden">
          <Media work={work} />
        </div>

        <p className="mt-7 max-w-[58ch] text-[1.0625rem] leading-[1.62] text-ink-soft">{t(work.summary)}</p>
        <p className="mt-4 max-w-[58ch] text-[0.9375rem] leading-[1.65] text-ink-mute">{t(work.note)}</p>

        <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
          {work.stack.map((item) => (
            <span key={item} className="label border border-line px-2.5 py-1.5">
              {item}
            </span>
          ))}
        </div>

        <span className="label link-draw mt-7 inline-flex items-center gap-2 !text-ink">
          {work.hrefLabel}
          <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5">
            ↗
          </span>
        </span>
      </a>
    </li>
  );
}

function Status({ work }: { work: Work }) {
  const { t } = useLang();
  if (work.status === "live") {
    return (
      <span className="flex items-center gap-1.5 !text-ink">
        <span className="h-1.5 w-1.5 rounded-full bg-live" />
        {t(ui.live)}
      </span>
    );
  }
  return <span>{t(work.status === "private" ? ui.private : ui.research)}</span>;
}

function Media({ work }: { work: Work }) {
  const media = work.media;

  if (media.kind === "panel") {
    return (
      <div className="flex h-full w-full flex-col justify-center bg-paper-2 p-7 md:p-10">
        {media.lines.map((line, i) => (
          <div key={line}>
            <p className="font-mono text-[0.72rem] leading-snug tracking-tight text-ink-soft md:text-[0.8125rem]">
              {line}
            </p>
            {i < media.lines.length - 1 && (
              <span className="my-2 ml-1 block h-4 w-px bg-line-2 md:my-2.5 md:h-6" />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 92vw, 43vw"
    />
  );
}
