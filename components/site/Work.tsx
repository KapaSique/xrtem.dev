"use client";

import { works } from "@/content/site";
import { CaseCard } from "./CaseCard";
import { Reveal } from "./Reveal";

export function Work() {
  return (
    <section id="work" className="flex scroll-mt-4 flex-col gap-14 bg-ink px-4 pt-6 text-fg md:gap-[110px] md:px-6 md:pt-10">
      {works.map((work) => (
        <Reveal key={work.id}>
          <CaseCard work={work} />
        </Reveal>
      ))}
    </section>
  );
}
