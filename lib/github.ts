import { identity } from "@/content/site";

export type ContributionDay = { date: string; level: number };
export type Contributions = { total: number; days: ContributionDay[] };

const USER = identity.github.handle.replace("@", "");

/**
 * Scrapes the public contribution calendar. There is no unauthenticated REST
 * endpoint for it, so the HTML fragment GitHub serves to its own profile page
 * is the source. Every failure mode returns null and the strip simply hides —
 * a portfolio must never break on someone else's uptime.
 */
export async function getContributions(): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github.com/users/${USER}/contributions`, {
      headers: { "User-Agent": "xrtem.dev", Accept: "text/html" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const html = await res.text();
    const days: ContributionDay[] = [];

    const cell = /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
    for (const match of html.matchAll(cell)) {
      days.push({ date: match[1], level: Number(match[2]) });
    }
    if (days.length === 0) return null;

    const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i);
    const total = totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : 0;

    days.sort((a, b) => a.date.localeCompare(b.date));
    return { total, days };
  } catch {
    return null;
  }
}
