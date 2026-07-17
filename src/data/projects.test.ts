import { describe, expect, it } from "vitest";
import { commercialProjects, experiments } from "./projects";

describe("portfolio catalog", () => {
  it("puts both commercial products before experiments", () => {
    expect(commercialProjects.map((project) => project.slug)).toEqual([
      "chase",
      "petmek",
    ]);
    expect(experiments.map((project) => project.slug)).toEqual([
      "trustlens",
      "second-look",
      "checkers",
      "maze",
    ]);
  });

  it("publishes only public destinations", () => {
    const serialized = JSON.stringify({ commercialProjects, experiments });
    expect(serialized).not.toContain("github.com/OOOpetmek");
    expect(serialized).not.toContain("github.com/KapaSique/chaseje");
    expect(serialized).not.toContain("onrender.com");
  });

  it("excludes skill repositories from selected work", () => {
    const titles = experiments.map((project) => project.title);
    expect(titles).not.toContain("Kaggle Dominator");
    expect(titles).not.toContain("Paper Maestro");
  });
});
