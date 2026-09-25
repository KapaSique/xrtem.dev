import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, test, vi } from "vitest";
import { SCRAMBLE_STEPS, ScrambleWord, scrambleFrame } from "@/components/site/ScrambleWord";
import { mockReducedMotion } from "@/test/media";

const zero = () => 0;

describe("scrambleFrame", () => {
  test("reveals the word left to right", () => {
    expect(scrambleFrame("открывают", 0, zero)).toBe("ааааааааа");
    expect(scrambleFrame("открывают", 8, zero)).toBe("открааааа");
    expect(scrambleFrame("открывают", SCRAMBLE_STEPS, zero)).toBe("открывают");
  });

  test("scrambles English with Latin glyphs and keeps spaces", () => {
    expect(scrambleFrame("buy from", 0, zero)).toBe("aaa aaaa");
  });
});

describe("ScrambleWord", () => {
  test("server-renders the first word", () => {
    expect(renderToString(<ScrambleWord words={["открывают", "листают"]} />)).toContain("открывают");
  });

  test("decodes the next word after the interval", () => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
    render(<ScrambleWord words={["открывают", "листают"]} />);
    expect(screen.getByText("открывают")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2800 + 42 * SCRAMBLE_STEPS + 10);
    });
    expect(screen.getByText("листают")).toBeInTheDocument();
  });

  test("holds still under reduced motion", () => {
    mockReducedMotion(true);
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
    render(<ScrambleWord words={["открывают", "листают"]} />);
    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(screen.getByText("открывают")).toBeInTheDocument();
  });
});
