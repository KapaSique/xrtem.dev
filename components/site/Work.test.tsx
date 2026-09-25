import { screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Work } from "@/components/site/Work";
import { renderWithLang } from "@/test/render";

describe("Work", () => {
  test("shows exactly the three cases, anchored for the hero pills", () => {
    const { container } = renderWithLang(<Work />);
    const ids = Array.from(container.querySelectorAll("article")).map((a) => a.id);
    expect(ids).toEqual(["chaseje", "saqaomuk", "control-tower"]);
    expect(screen.getByRole("heading", { level: 3, name: "Chase.je" })).toBeInTheDocument();
  });

  test("live cases open their sites in a new tab", () => {
    renderWithLang(<Work />);
    const chase = screen.getByRole("link", { name: "Chase.je — chaseje.com" });
    expect(chase).toHaveAttribute("href", "https://chaseje.com");
    expect(chase).toHaveAttribute("target", "_blank");
    expect(chase).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "Открыть chaseje.com" })).toHaveAttribute("href", "https://chaseje.com");
    expect(screen.getByRole("link", { name: "SAQAOMUK — saqaomuk.com" })).toHaveAttribute("href", "https://saqaomuk.com");
    expect(screen.getByAltText("Витрина SAQAOMUK")).toBeInTheDocument();
  });

  test("Control Tower has no link, only the private-access badge", () => {
    const { container } = renderWithLang(<Work />);
    const tower = container.querySelector("article#control-tower") as HTMLElement;
    expect(within(tower).queryByRole("link")).toBeNull();
    expect(within(tower).getByText("Закрытый доступ")).toBeInTheDocument();
    expect(within(tower).getByRole("img", { name: "Control Tower: превью дашборда" })).toBeInTheDocument();
    expect(container.innerHTML).not.toMatch(/profcosmetic/i);
  });
});
