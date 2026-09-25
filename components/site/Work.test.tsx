import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Work } from "@/components/site/Work";
import { renderWithLang } from "@/test/render";

describe("Work", () => {
  test("shows exactly the three cases, anchored for the hero pills", () => {
    const { container } = renderWithLang(<Work />);
    const ids = Array.from(container.querySelectorAll("article")).map((a) => a.id);
    expect(ids).toEqual(["saqaomuk", "profcosmetic", "chaseje"]);
    expect(screen.getByRole("heading", { level: 3, name: "SAQAOMUK" })).toBeInTheDocument();
  });

  test("live cases open their sites in a new tab", () => {
    renderWithLang(<Work />);
    const chase = screen.getByRole("link", { name: "Chase.je — chaseje.com" });
    expect(chase).toHaveAttribute("href", "https://chaseje.com");
    expect(chase).toHaveAttribute("target", "_blank");
    expect(chase).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "Открыть chaseje.com" })).toHaveAttribute("href", "https://chaseje.com");
    expect(screen.getByRole("link", { name: "SAQAOMUK — saqaomuk.com" })).toHaveAttribute("href", "https://saqaomuk.com");
    expect(screen.getByRole("link", { name: "PROFCOSMETIC — profcosmetic.dev" })).toHaveAttribute("href", "https://profcosmetic.dev");
    expect(screen.getByAltText("Съёмка коллекции SAQAOMUK")).toBeInTheDocument();
    expect(screen.getByAltText("Фрагмент интернет-магазина SAQAOMUK")).toBeInTheDocument();
  });

  test("Profcosmetic uses an image from the project", () => {
    const { container } = renderWithLang(<Work />);
    expect(container.querySelector("article#profcosmetic img")).toHaveAttribute("src", "/media/profcosmetic/editorial-portrait.png");
  });
});
