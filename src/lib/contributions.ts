import type { Contribution } from "../data/github";

export type ContributionWeek = {
  key: string;
  total: number;
  days: Contribution[];
};

export type ContributionSummary = {
  total: number;
  activeDays: number;
};

const mondayKey = (isoDate: string) => {
  const date = new Date(`${isoDate}T00:00:00Z`);
  const offset = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - offset);
  return date.toISOString().slice(0, 10);
};

export function buildContributionWeeks(
  days: Contribution[],
): ContributionWeek[] {
  const weeks = new Map<string, Contribution[]>();

  [...days]
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((day) => {
      const key = mondayKey(day.date);
      weeks.set(key, [...(weeks.get(key) ?? []), day]);
    });

  return [...weeks].map(([key, weekDays]) => ({
    key,
    days: weekDays,
    total: weekDays.reduce((sum, day) => sum + day.count, 0),
  }));
}

export function summarizeContributions(
  days: Contribution[],
): ContributionSummary {
  return {
    total: days.reduce((sum, day) => sum + day.count, 0),
    activeDays: days.filter((day) => day.count > 0).length,
  };
}
