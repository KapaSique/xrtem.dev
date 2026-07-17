import type { CSSProperties } from "react";

type ProgressStyle = CSSProperties & {
  "--scene-progress": number;
};

export function SceneProgress() {
  return (
    <output
      className="scene-progress"
      data-scene-progress
      aria-label="Portfolio scene progress"
      style={{ "--scene-progress": 0 } as ProgressStyle}
    >
      <span data-scene-current>01</span>
      <i aria-hidden="true" />
      <span>05</span>
    </output>
  );
}
