"use client";

import { about, glass, works } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { ControlTowerPanel } from "./ControlTowerPanel";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";

const saqa = works.find((work) => work.id === "saqaomuk");
const saqaSrc = saqa?.media.src ?? "";

/** A picture set into the line of type, sized in em so it scales with it. */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden="true" className="mx-1 inline-block h-[0.95em] w-[2.05em] overflow-hidden rounded-full align-middle">
      {children}
    </span>
  );
}

export function About() {
  const { t, lang } = useLang();
  const [lead, afterShop, afterPlatform, shine] = about.parts[lang];

  return (
    <section id="about" className="flex scroll-mt-4 flex-col gap-16 bg-ink px-4 pb-24 pt-28 text-fg md:gap-[90px] md:px-6 md:py-[200px]">
      <div className="grid gap-10 md:grid-cols-[minmax(0,820fr)_minmax(0,548fr)] md:items-center md:gap-6">
        <Reveal>
          <div className="flex flex-col gap-8 md:gap-10 md:pl-24">
            <span className="text-[14px] text-muted">{t(about.label)}</span>
            <p className="font-display text-[40px] font-light leading-[1.1] tracking-[-0.02em] md:text-[clamp(44px,4.2vw,60px)] md:tracking-[-0.03em]">
              {lead}{" "}
              <Pill>
                <img src={saqaSrc} alt="" className="h-full w-full object-cover" />
              </Pill>{" "}
              {afterShop}{" "}
              <Pill>
                {/* The panel is laid out at 10.34 × 4.84 em and scaled into the pill. */}
                <span className="block h-[4.84em] w-[10.34em] origin-top-left scale-[0.2]">
                  <ControlTowerPanel bare />
                </span>
              </Pill>{" "}
              {afterPlatform} <span className="xr-shine">{shine}</span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="relative aspect-[548/620] w-full overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_50%_50%,#15122a_0%,#07060b_70%)] md:ml-auto md:max-w-[548px]">
            <picture>
              <source srcSet={glass.macro.avif} type="image/avif" />
              <img
                src={glass.macro.jpg}
                alt={t(about.macroAlt)}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover mix-blend-lighten"
              />
            </picture>
            <figcaption className="absolute bottom-[18px] left-5 text-[13px] text-muted">{t(about.macroCaption)}</figcaption>
          </figure>
        </Reveal>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:px-24">
        {about.stats.map((stat) => (
          <div key={stat.label.en} className="flex flex-col gap-2.5 border-t border-line pt-[18px]">
            <dt className="order-2 text-[15px] text-muted">{t(stat.label)}</dt>
            <dd className="order-1 font-display text-[56px] font-light leading-none md:text-[80px]">
              <Counter to={stat.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
