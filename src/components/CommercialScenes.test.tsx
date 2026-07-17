import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChaseScene } from "./ChaseScene";
import { PetmekScene } from "./PetmekScene";

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

  it("presents Petmek as a public review-to-action product", () => {
    render(<PetmekScene />);
    expect(
      screen.getByRole("heading", { name: "PETMEK" }),
    ).toBeInTheDocument();
    expect(screen.getByText("CUSTOMER REVIEW")).toBeInTheDocument();
    expect(screen.getByText("WEEKLY REPORT")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /open petmek/i }),
    ).toHaveAttribute("href", "https://petmek.app");
    expect(document.body.textContent).not.toMatch(
      /onrender\.com|github\.com\/OOOpetmek/i,
    );
  });
});
