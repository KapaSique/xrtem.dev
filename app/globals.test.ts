import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

/** The prelude of every top-level rule or statement, comments dropped. */
function topLevel(css: string): string[] {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const preludes: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === "{") {
      if (depth === 0) preludes.push(text.slice(start, i).trim());
      depth++;
    } else if (c === "}") {
      depth--;
      if (depth === 0) start = i + 1;
    } else if (c === ";" && depth === 0) {
      preludes.push(text.slice(start, i).trim());
      start = i + 1;
    }
  }
  return preludes;
}

describe("globals.css", () => {
  test("keeps every rule in a cascade layer, so utilities win", () => {
    // Unlayered CSS beats every Tailwind utility whatever its specificity:
    // a bare `a { color: inherit }` silently cancels `text-fg` on a link.
    const css = readFileSync("app/globals.css", "utf8");
    const unlayered = topLevel(css).filter((prelude) => !/^@(import|theme|layer)\b/.test(prelude));
    expect(unlayered).toEqual([]);
  });
});
