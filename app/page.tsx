import { V2Nav } from "@/components/v2/V2Nav";
import { V2Hero } from "@/components/v2/V2Hero";
import { V2Services } from "@/components/v2/V2Services";
import { V2Work } from "@/components/v2/V2Work";
import { V2Proof, V2Process } from "@/components/v2/V2Proof";
import { V2Faq, V2Cta } from "@/components/v2/V2Close";
import { getContributions } from "@/lib/github";

export const revalidate = 3600;

export default async function Page() {
  const contributions = await getContributions();

  return (
    <div className="v2-root min-h-screen bg-graphite-900 text-mist-100 antialiased">
      <V2Nav />
      <main>
        <V2Hero />
        <V2Services />
        <V2Work />
        <V2Proof contributions={contributions} />
        <V2Process />
        <V2Faq />
        <V2Cta />
      </main>
    </div>
  );
}
