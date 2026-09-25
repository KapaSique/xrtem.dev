import { vi } from "vitest";

/** A MediaQueryList that answers a fixed value — jsdom has none of its own. */
export function mediaQueryList(query: string, matches = false): MediaQueryList {
  return {
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList;
}

/** Answer `prefers-reduced-motion` the way a visitor's system would. */
export function mockReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn((query: string) =>
    mediaQueryList(query, reduce && query.includes("prefers-reduced-motion: reduce")),
  );
}

export function rectAt(top: number, height = 600): DOMRect {
  return {
    x: 0,
    y: top,
    top,
    left: 0,
    width: 1000,
    height,
    right: 1000,
    bottom: top + height,
    toJSON: () => ({}),
  } as DOMRect;
}

/** Pretend every element sits `top` px below the top of the viewport. */
export function mockRects(top: number, height = 600) {
  return vi
    .spyOn(Element.prototype, "getBoundingClientRect")
    .mockImplementation(() => rectAt(top, height));
}

/** Data-saver mode, as Chrome on Android reports it. */
export function mockSaveData(on: boolean) {
  Object.defineProperty(navigator, "connection", {
    configurable: true,
    value: on ? { saveData: true } : undefined,
  });
}
