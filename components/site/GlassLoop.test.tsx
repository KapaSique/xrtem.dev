import { act, render } from "@testing-library/react";
import { describe, expect, test, type Mock } from "vitest";
import { GlassLoop } from "@/components/site/GlassLoop";
import { glass } from "@/content/site";
import { mockReducedMotion, mockRects, mockSaveData, rectAt } from "@/test/media";

/** The `play` stub installed by test/setup.ts. */
const play = () => HTMLMediaElement.prototype.play as unknown as Mock;

describe("GlassLoop", () => {
  test("plays a muted, looping, decorative video with both sources", () => {
    const { container } = render(<GlassLoop />);
    const video = container.querySelector("video")!;
    expect(video).toHaveAttribute("aria-hidden", "true");
    expect(video.muted).toBe(true);
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("poster", glass.poster.jpg);
    expect(Array.from(video.querySelectorAll("source")).map((s) => s.getAttribute("type"))).toEqual([
      "video/webm",
      "video/mp4",
    ]);
    expect(play()).toHaveBeenCalled();
  });

  test("shows the still frame when the visitor asks for less motion", () => {
    mockReducedMotion(true);
    const { container } = render(<GlassLoop />);
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("img")).toHaveAttribute("src", glass.poster.jpg);
    expect(container.querySelector("source")).toHaveAttribute("srcset", glass.poster.avif);
  });

  test("shows the still frame on a data-saver connection", () => {
    mockSaveData(true);
    const { container } = render(<GlassLoop />);
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("img")).not.toBeNull();
  });

  test("keeps the poster when autoplay is refused", async () => {
    Object.defineProperty(HTMLMediaElement.prototype, "play", {
      configurable: true,
      writable: true,
      value: () => Promise.reject(new DOMException("autoplay refused", "NotAllowedError")),
    });
    const { container } = render(<GlassLoop />);
    await act(async () => {
      await Promise.resolve();
    });
    expect(container.querySelector("video")).toHaveAttribute("poster", glass.poster.jpg);
  });

  test("a lazy copy downloads nothing until it is near the viewport", async () => {
    const rects = mockRects(5000);
    const { container } = render(<GlassLoop lazy />);
    const video = container.querySelector("video")!;
    expect(video).toHaveAttribute("preload", "none");
    expect(video).not.toHaveAttribute("autoplay");
    expect(play()).not.toHaveBeenCalled();

    rects.mockImplementation(() => rectAt(900));
    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
    });
    expect(play()).toHaveBeenCalled();
  });
});
