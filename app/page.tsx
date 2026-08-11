import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WorkSection } from "@/components/Work";
import { Numbers } from "@/components/Numbers";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getContributions } from "@/lib/github";

export const revalidate = 3600;

export default async function Page() {
  const contributions = await getContributions();

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <WorkSection />
        <Numbers />
        <About contributions={contributions} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
