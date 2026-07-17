import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { canUseEditorialCanvas } from "../webgl/editorialPolicy";
import type { EditorialController } from "../webgl/editorialRenderer";

type ControllerRef = {
  current: EditorialController | null;
};

type EditorialCanvasProps = {
  controllerRef: ControllerRef;
};

function hasWebGL() {
  const probe = document.createElement("canvas");
  return Boolean(
    probe.getContext("webgl2") ?? probe.getContext("webgl"),
  );
}

export function EditorialCanvas({
  controllerRef,
}: EditorialCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    const memory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;
    return canUseEditorialCanvas({
      reducedMotion: false,
      viewportWidth: window.innerWidth,
      deviceMemory: memory,
      webgl: hasWebGL(),
    });
  });

  useEffect(() => {
    const memory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;
    setEnabled(
      canUseEditorialCanvas({
        reducedMotion: Boolean(reduceMotion),
        viewportWidth: window.innerWidth,
        deviceMemory: memory,
        webgl: hasWebGL(),
      }),
    );
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;

    let active = true;
    let controller: EditorialController | null = null;

    import("../webgl/editorialRenderer")
      .then(({ createEditorialRenderer }) =>
        createEditorialRenderer(canvasRef.current!, [
          "/media/chase/archive-room.jpg",
          "/media/petmek/overview.png",
        ]),
      )
      .then((created) => {
        if (!active) {
          created.destroy();
          return;
        }
        controller = created;
        controllerRef.current = created;
      })
      .catch(() => {
        setEnabled(false);
      });

    return () => {
      active = false;
      controller?.destroy();
      if (controllerRef.current === controller) {
        controllerRef.current = null;
      }
    };
  }, [controllerRef, enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="editorial-canvas"
      aria-hidden="true"
    />
  );
}
