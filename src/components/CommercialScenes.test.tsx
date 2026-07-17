import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChaseScene } from "./ChaseScene";

describe("commercial scenes", () => {
  it("presents CHASE.JE as a public commercial system", () => {
    render(<ChaseScene />);
    expect(
      screen.getByRole("heading", { name: "CHASE.JE" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/bilingual private-boutique pwa/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /enter chase\.je/i }),
    ).toHaveAttribute("href", "https://chaseje.com");
    expect(document.body.textContent).not.toMatch(
      /github\.com\/KapaSique\/chaseje/i,
    );
  });
});
