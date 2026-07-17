import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ContributionTape } from "./ContributionTape";

vi.stubGlobal("fetch", vi.fn(() => new Promise(() => undefined)));

describe("ContributionTape", () => {
  it("exposes a truthful accessible fallback summary", () => {
    render(<ContributionTape />);
    expect(
      screen.getByRole("region", { name: /github activity/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/snapshot/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /kapasique/i }),
    ).toHaveAttribute("href", "https://github.com/KapaSique");
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(50);
  });
});
