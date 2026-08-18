import { Backdrop } from "@/components/site/Backdrop";
import { Nav, Footer } from "@/components/site/Chrome";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Work } from "@/components/site/Work";
import { Numbers, Process } from "@/components/site/Proof";
import { Faq, Cta } from "@/components/site/Close";
import { getContributions } from "@/lib/github";

export const revalidate = 3600;

export default async function Page() {
  const contributions = await getContributions();

  return (
    <div className="min-h-screen text-graphite-900 antialiased">
      <Backdrop />
      <Nav />
      {/* Everything sits in its own layer above the shader, which keeps
          the metal reachable by the pointer through the page gaps. */}
      <main className="relative z-10">
        <Hero />
        <Services />
        <Work />
        <Numbers contributions={contributions} />
        <Process />
        <Faq />
        <Cta />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
