import { screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Hero } from "@/components/site/Hero";
import { renderWithLang } from "@/test/render";

describe("Hero", () => {
  test("reads as one sentence to screen readers", () => {
    renderWithLang(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: "Делаю сайты, которые открывают" })).toBeInTheDocument();
  });

  test("links each project pill to its case", () => {
    renderWithLang(<Hero />);
    const nav = screen.getByRole("navigation", { name: "Проекты" });
    expect(within(nav).getByRole("link", { name: "Chase.je" })).toHaveAttribute("href", "#chaseje");
    expect(within(nav).getByRole("link", { name: "SAQAOMUK" })).toHaveAttribute("href", "#saqaomuk");
    expect(within(nav).getByRole("link", { name: "Control Tower" })).toHaveAttribute("href", "#control-tower");
  });

  test("introduces itself in its own words", () => {
    renderWithLang(<Hero />);
    expect(screen.getByText(/С 2022 года собираю сайты и сервисы под ключ/)).toBeInTheDocument();
  });

  test("speaks English when asked", () => {
    renderWithLang(<Hero />, { lang: "en" });
    expect(screen.getByRole("heading", { level: 1, name: "I build sites people open" })).toBeInTheDocument();
  });

  test("the glass blends straight against the hero background", () => {
    const { container } = renderWithLang(<Hero />);
    const section = container.querySelector("section#top")!;
    // Any wrapper in between would isolate the blend and show the video's black square.
    expect(section.querySelector(".mix-blend-lighten")?.parentElement).toBe(section);
  });

  test("gives the changing word its own line on phones", () => {
    const { container } = renderWithLang(<Hero />);
    const br = container.querySelector("h1 br");
    expect(br).toHaveClass("md:hidden");
    expect(br?.nextElementSibling).toHaveClass("italic");
  });

  test("carries the glass loop and the header", () => {
    const { container } = renderWithLang(<Hero />);
    expect(container.querySelector("section#top video")).not.toBeNull();
    expect(screen.getByRole("button", { name: "Меню" })).toBeInTheDocument();
  });
});
