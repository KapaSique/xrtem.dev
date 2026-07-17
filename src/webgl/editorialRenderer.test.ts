import { describe, expect, it } from "vitest";
import { canUseEditorialCanvas } from "./editorialPolicy";

describe("editorial canvas policy", () => {
  it("disables WebGL for reduced motion and narrow low-memory devices", () => {
    expect(
      canUseEditorialCanvas({
        reducedMotion: true,
        viewportWidth: 1440,
        deviceMemory: 8,
        webgl: true,
      }),
    ).toBe(false);
    expect(
      canUseEditorialCanvas({
        reducedMotion: false,
        viewportWidth: 390,
        deviceMemory: 8,
        webgl: true,
      }),
    ).toBe(false);
  });

  it("allows the desktop experience when WebGL is available", () => {
    expect(
      canUseEditorialCanvas({
        reducedMotion: false,
        viewportWidth: 1440,
        deviceMemory: 8,
        webgl: true,
      }),
    ).toBe(true);
  });
});
