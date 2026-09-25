import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Marquee } from "@/components/site/Marquee";
import { renderWithLang } from "@/test/render";

const label = "Сайты, Интернет-магазины, Платформы, Telegram-боты, Админки, Интеграции";

describe("Marquee", () => {
  test("names the services once for screen readers", () => {
    renderWithLang(<Marquee />);
    expect(screen.getByRole("region", { name: label })).toBeInTheDocument();
  });

  test("hides the moving bands from assistive tech", () => {
    renderWithLang(<Marquee />);
    const bands = screen.getByRole("region", { name: label }).querySelectorAll(":scope > div");
    expect(bands).toHaveLength(2);
    bands.forEach((band) => expect(band).toHaveAttribute("aria-hidden", "true"));
  });

  test("each band holds the list twice so -50% loops without a seam", () => {
    const { container } = renderWithLang(<Marquee />);
    expect(container.textContent!.split("Платформы").length - 1).toBe(4);
  });
});
