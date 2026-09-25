import { About } from "@/components/site/About";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Work } from "@/components/site/Work";

export default function Page() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Work />
      <About />
    </main>
  );
}
