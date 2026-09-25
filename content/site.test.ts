import { describe, expect, test } from "vitest";
import * as site from "@/content/site";

type Pair = { path: string; en: string; ru: string };

/** Walk the content and pull out every { en, ru } pair, lists included. */
function collectPairs(value: unknown, path: string, out: Pair[]) {
  if (Array.isArray(value)) {
    value.forEach((item, i) => collectPairs(item, `${path}[${i}]`, out));
    return;
  }
  if (!value || typeof value !== "object") return;
  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).sort();
  if (keys.length === 2 && keys[0] === "en" && keys[1] === "ru") {
    if (typeof obj.en === "string" && typeof obj.ru === "string") {
      out.push({ path, en: obj.en, ru: obj.ru });
      return;
    }
    if (Array.isArray(obj.en) && Array.isArray(obj.ru)) {
      expect(obj.en.length, `${path}: en/ru lengths`).toBe(obj.ru.length);
      (obj.en as string[]).forEach((en, i) =>
        out.push({ path: `${path}[${i}]`, en, ru: (obj.ru as string[])[i] }),
      );
      return;
    }
  }
  for (const key of keys) collectPairs(obj[key], `${path}.${key}`, out);
}

const pairs: Pair[] = [];
collectPairs(site, "site", pairs);

describe("content", () => {
  test("every bilingual string is filled in both languages", () => {
    expect(pairs.length).toBeGreaterThan(40);
    for (const p of pairs) {
      expect(p.en.trim(), p.path).not.toBe("");
      expect(p.ru.trim(), p.path).not.toBe("");
    }
  });

  test("Russian copy never uses the «X, а не Y» construction", () => {
    for (const p of pairs) expect(p.ru, p.path).not.toMatch(/,\s*а не\s/i);
  });

  test("the three linked projects are in the requested order", () => {
    expect(site.works.map((w) => w.id)).toEqual(["saqaomuk", "profcosmetic", "chaseje"]);
    expect(site.works.find((w) => w.id === "chaseje")?.link?.href).toBe("https://chaseje.com");
    expect(site.works.find((w) => w.id === "saqaomuk")?.link?.href).toBe("https://saqaomuk.com");
    expect(site.works.find((w) => w.id === "profcosmetic")?.link?.href).toBe("https://profcosmetic.dev");
    expect(site.works.every((w) => w.link)).toBe(true);
  });

  test("the layout gets the counts it is built for", () => {
    expect(site.hero.words.ru).toHaveLength(5);
    expect(site.marquee).toHaveLength(6);
    expect(site.services.items.map((s) => s.index)).toEqual(["01", "02", "03", "04", "05"]);
    expect(site.about.stats.map((s) => s.value)).toEqual([5, 4, 74, 1]);
    expect(site.about.parts.ru).toHaveLength(4);
  });
});
