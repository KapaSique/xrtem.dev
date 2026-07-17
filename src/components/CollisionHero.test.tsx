import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CollisionHero } from "./CollisionHero";

vi.stubGlobal("fetch", vi.fn(() => new Promise(() => undefined)));

describe("CollisionHero", () => {
  it("introduces the author and both commercial products", () => {
    render(<CollisionHero />);
    expect(
      screen.getByRole("heading", { name: /artem stelmah/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /chase\.je/i }),
    ).toHaveAttribute("href", "https://chaseje.com");
    expect(screen.getByRole("link", { name: /petmek/i })).toHaveAttribute(
      "href",
      "https://petmek.app",
    );
    expect(
      screen.getByRole("region", { name: /github activity/i }),
    ).toBeInTheDocument();
  });
});
