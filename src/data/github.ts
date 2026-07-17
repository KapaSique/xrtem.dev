export type Contribution = {
  date: string;
  count: number;
  level: number;
};

export const GITHUB_ACTIVITY_URL =
  "https://github-contributions-api.jogruber.de/v4/KapaSique?y=last";

const START_DATE = "2025-07-17";
const COUNTS_BASE36 =
  "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000100000001000000010000000000000000000200000304000002000204070000020304000600040100000700000001000000030004050x1j15020g00000000000000000000000000000000000a080601030000000000000000000000000200030000000000000400000000000000000000000000000000020000000006000100000005000000000001000100000000000005020600000000000100020000090b08070e09050303010200000000000000000000000000000200010b050503";

const toDate = (date: Date) => date.toISOString().slice(0, 10);

const levelFor = (count: number) => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
};

export const fallbackContributions: Contribution[] = Array.from(
  { length: COUNTS_BASE36.length / 2 },
  (_, index) => {
    const count = Number.parseInt(COUNTS_BASE36.slice(index * 2, index * 2 + 2), 36);
    const date = new Date(`${START_DATE}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + index);
    return { date: toDate(date), count, level: levelFor(count) };
  },
);

export const githubSnapshot = {
  login: "KapaSique",
  name: "Stelmah",
  publicRepos: 29,
  contributions: 383,
  capturedAt: "2026-07-17",
};
