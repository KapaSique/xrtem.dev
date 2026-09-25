import { act, renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, test, vi } from "vitest";
import { formatYakutsk, useYakutskTime } from "@/lib/useYakutskTime";

function Clock() {
  return <span>{useYakutskTime() ?? "--:--"}</span>;
}

describe("Yakutsk time", () => {
  test("is Yakutsk time whatever the visitor's zone", () => {
    expect(formatYakutsk(new Date("2026-09-25T03:04:00Z"))).toBe("12:04");
    // Already the next morning in Yakutsk while it is evening in UTC.
    expect(formatYakutsk(new Date("2026-09-25T20:30:00Z"))).toBe("05:30");
  });

  test("renders nothing on the server, so hydration has nothing to disagree with", () => {
    expect(renderToString(<Clock />)).toContain("--:--");
  });

  test("ticks every 15 seconds once mounted", () => {
    vi.useFakeTimers({ toFake: ["Date", "setInterval", "clearInterval"] });
    vi.setSystemTime(new Date("2026-09-25T03:04:00Z"));
    const { result } = renderHook(() => useYakutskTime());
    expect(result.current).toBe("12:04");
    act(() => {
      vi.setSystemTime(new Date("2026-09-25T03:05:00Z"));
      vi.advanceTimersByTime(15_000);
    });
    expect(result.current).toBe("12:05");
  });
});
