import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WorkSection } from "@/components/Work";
import { Numbers } from "@/components/Numbers";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { getContributions } from "@/lib/github";

export const revalidate = 3600;

export default async function Page() {
  const contributions = await getContributions();

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero contributions={contributions} />
        <WorkSection />
        <Numbers />
        <About />
        <Contact />
      </main>
    </>
  );
}
