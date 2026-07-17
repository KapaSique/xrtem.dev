import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ExperimentReel } from "./ExperimentReel";

describe("ExperimentReel", () => {
  it("shows the selected experiments in the approved order", () => {
    render(<ExperimentReel />);
    const headings = screen
      .getAllByRole("heading", { level: 3 })
      .map((node) => node.textContent);

    expect(headings).toEqual([
      "TrustLens",
      "Second Look",
      "Checkers Solver",
      "Maze Crawler",
    ]);
    expect(document.body).not.toHaveTextContent("Kaggle Dominator");
    expect(document.body).not.toHaveTextContent("Paper Maestro");
  });
});
