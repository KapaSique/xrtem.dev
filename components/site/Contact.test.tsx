import { screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Contact } from "@/components/site/Contact";
import { renderWithLang } from "@/test/render";

describe("Contact", () => {
  test("asks the question", () => {
    renderWithLang(<Contact />);
    expect(screen.getByRole("heading", { level: 2, name: /Есть проект\?\s*Поговорим\./ })).toBeInTheDocument();
  });

  test("every way to reach out works", () => {
    renderWithLang(<Contact />);
    expect(screen.getByRole("link", { name: "batteryofsprunk@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:batteryofsprunk@gmail.com",
    );
    expect(screen.getByRole("link", { name: "Telegram" })).toHaveAttribute("href", "https://t.me/stelmahhh");
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/KapaSique");
    expect(screen.getByRole("link", { name: "Наверх" })).toHaveAttribute("href", "#top");
  });

  test("tells Yakutsk time", () => {
    vi.useFakeTimers({ toFake: ["Date", "setInterval", "clearInterval"] });
    vi.setSystemTime(new Date("2026-09-25T03:04:00Z"));
    renderWithLang(<Contact />);
    expect(screen.getByText("Якутск, YKS 12:04")).toBeInTheDocument();
  });

  test("the glass blends straight against the footer background", () => {
    const { container } = renderWithLang(<Contact />);
    const footer = container.querySelector("footer#contact")!;
    expect(footer.querySelector(".mix-blend-lighten")?.parentElement).toBe(footer);
  });

  test("its glass loop waits until it is near", () => {
    const { container } = renderWithLang(<Contact />);
    expect(container.querySelector("video")).toHaveAttribute("preload", "none");
  });
});
