import { useRef } from "react";
import { ChaseScene } from "./components/ChaseScene";
import { CollisionHero } from "./components/CollisionHero";
import { ContactScene } from "./components/ContactScene";
import { EditorialCanvas } from "./components/EditorialCanvas";
import { ExperimentReel } from "./components/ExperimentReel";
import { PetmekScene } from "./components/PetmekScene";
import { PortfolioHeader } from "./components/PortfolioHeader";
import { SceneProgress } from "./components/SceneProgress";
import { SmoothScroll } from "./motion/SmoothScroll";
import { usePortfolioMotion } from "./motion/usePortfolioMotion";
import type { EditorialController } from "./webgl/editorialRenderer";

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasController = useRef<EditorialController | null>(null);

  usePortfolioMotion(rootRef, canvasController);

  return (
    <SmoothScroll>
      <div className="portfolio" ref={rootRef}>
        <a className="skip-link" href="#work">
          Skip to selected work
        </a>
        <PortfolioHeader />
        <SceneProgress />
        <EditorialCanvas controllerRef={canvasController} />
        <main>
          <CollisionHero />
          <ChaseScene />
          <PetmekScene />
          <ExperimentReel />
          <ContactScene />
        </main>
      </div>
    </SmoothScroll>
  );
}
