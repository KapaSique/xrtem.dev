import { About } from "@/components/site/About";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Services } from "@/components/site/Services";
import { Work } from "@/components/site/Work";

export default function Page() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Services />
    </main>
  );
}
