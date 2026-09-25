import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { mediaQueryList, mockSaveData } from "./media";

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.lang = "";
  document.body.style.overflow = "";
  window.matchMedia = vi.fn((query: string) => mediaQueryList(query));
  mockSaveData(false);
  // jsdom has no media playback; the components only need these to exist.
  Object.defineProperty(HTMLMediaElement.prototype, "play", {
    configurable: true,
    writable: true,
    value: vi.fn(() => Promise.resolve()),
  });
  Object.defineProperty(HTMLMediaElement.prototype, "pause", {
    configurable: true,
    writable: true,
    value: vi.fn(),
  });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});
