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
    expect(within(nav).getByRole("link", { name: "SAQAOMUK" })).toHaveAttribute("href", "#saqaomuk");
    expect(within(nav).getByRole("link", { name: "PROFCOSMETIC" })).toHaveAttribute("href", "#profcosmetic");
    expect(within(nav).getByRole("link", { name: "Chase.je" })).toHaveAttribute("href", "#chaseje");
  });

  test("introduces itself in its own words", () => {
    renderWithLang(<Hero />);
    expect(screen.getByText(/С 2022 года собираю сайты и сервисы под ключ/)).toBeInTheDocument();
  });

  test("speaks English when asked", () => {
    renderWithLang(<Hero />, { lang: "en" });
    expect(screen.getByRole("heading", { level: 1, name: "I build sites people open" })).toBeInTheDocument();
  });

  test("uses the supplied desktop and mobile background videos", () => {
    const { container } = renderWithLang(<Hero />);
    const section = container.querySelector("section#top")!;
    const sources = Array.from(section.querySelectorAll("video source"));
    expect(sources.map((source) => source.getAttribute("src"))).toEqual([
      "/media/metalab/mobile.mp4",
      "/media/metalab/desktop.mp4",
    ]);
  });

  test("gives the changing word its own line on phones", () => {
    const { container } = renderWithLang(<Hero />);
    const br = container.querySelector("h1 br");
    expect(br).toHaveClass("md:hidden");
    expect(br?.nextElementSibling).toHaveClass("italic");
  });

  test("carries the background video and the header", () => {
    const { container } = renderWithLang(<Hero />);
    expect(container.querySelector("section#top video")).not.toBeNull();
    expect(screen.getByRole("button", { name: "Меню" })).toBeInTheDocument();
  });
});
