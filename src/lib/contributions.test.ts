import { describe, expect, it } from "vitest";
import type { Contribution } from "../data/github";
import {
  buildContributionWeeks,
  summarizeContributions,
} from "./contributions";

const days: Contribution[] = [
  { date: "2026-07-13", count: 2, level: 1 },
  { date: "2026-07-14", count: 0, level: 0 },
  { date: "2026-07-15", count: 7, level: 3 },
  { date: "2026-07-20", count: 1, level: 1 },
];

describe("contribution tape data", () => {
  it("groups ISO dates into Monday-based weeks", () => {
    expect(buildContributionWeeks(days).map((week) => week.total)).toEqual([
      9, 1,
    ]);
  });

  it("summarizes total and active days", () => {
    expect(summarizeContributions(days)).toEqual({
      total: 10,
      activeDays: 3,
    });
  });
});
