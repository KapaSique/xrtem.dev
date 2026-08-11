import type { Metadata } from "next";
import { V2Nav } from "@/components/v2/V2Nav";
import { V2Hero } from "@/components/v2/V2Hero";
import { V2Services } from "@/components/v2/V2Services";
import { V2Work } from "@/components/v2/V2Work";
import { V2Proof, V2Process } from "@/components/v2/V2Proof";
import { V2Faq, V2Cta } from "@/components/v2/V2Close";

export const metadata: Metadata = {
  title: "Artem Svinoboev — product, ML and agentic engineering",
  description:
    "Commercial storefronts, multi-tenant platforms and ML systems that report their own limits. Five projects in production.",
};

export default function V2Page() {
  return (
    <div className="v2-root min-h-screen bg-graphite-900 text-mist-100 antialiased">
      <V2Nav />
      <main>
        <V2Hero />
        <V2Services />
        <V2Work />
        <V2Proof />
        <V2Process />
        <V2Faq />
        <V2Cta />
      </main>
    </div>
  );
}
