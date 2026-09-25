import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BackgroundVideo } from "./BackgroundVideo";
import { mockReducedMotion, mockSaveData } from "@/test/media";

describe("BackgroundVideo", () => {
  test("serves a mobile film below 768px", () => {
    const { container } = render(<BackgroundVideo />);
    const mobile = container.querySelector("video source:first-child");
    expect(mobile).toHaveAttribute("media", "(max-width: 767px)");
    expect(mobile).toHaveAttribute("src", "/media/metalab/mobile.mp4");
  });

  test("uses a still for reduced motion or data saving", () => {
    mockReducedMotion(true);
    const reduced = render(<BackgroundVideo />);
    expect(reduced.container.querySelector("video")).toBeNull();
    expect(reduced.container.querySelector("picture img")).toHaveAttribute("src", "/media/metalab/desktop-poster.jpg");
    reduced.unmount();

    mockReducedMotion(false);
    mockSaveData(true);
    const saved = render(<BackgroundVideo />);
    expect(saved.container.querySelector("video")).toBeNull();
  });
});
