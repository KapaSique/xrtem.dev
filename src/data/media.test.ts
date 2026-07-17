// @vitest-environment node
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { commercialProjects, experiments } from "./projects";

const publicPath = (src: string) =>
  resolve(process.cwd(), "public", src.slice(1));

describe("portfolio media", () => {
  const paths = [
    ...commercialProjects.flatMap((project) =>
      project.media.map((item) => item.src),
    ),
    ...experiments.flatMap((project) =>
      "media" in project ? [project.media.src] : [],
    ),
  ];

  it("stores every declared image locally", () => {
    for (const path of paths) {
      expect(existsSync(publicPath(path)), path).toBe(true);
    }
  });

  it("keeps each image below 250 KB", () => {
    for (const path of paths) {
      expect(statSync(publicPath(path)).size, path).toBeLessThan(250_000);
    }
  });
});
