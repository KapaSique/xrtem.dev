import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Services } from "@/components/site/Services";
import { renderWithLang } from "@/test/render";

describe("Services", () => {
  test("has its heading", () => {
    renderWithLang(<Services />);
    expect(screen.getByRole("heading", { level: 2, name: "Что я делаю" })).toBeInTheDocument();
  });

  test("every row leads to the contacts", () => {
    renderWithLang(<Services />);
    const rows = screen.getAllByRole("link");
    expect(rows).toHaveLength(5);
    rows.forEach((row) => expect(row).toHaveAttribute("href", "#contact"));
    expect(screen.getByRole("link", { name: /Интернет-магазины/ })).toHaveTextContent(
      "Каталог, корзина, оплата и админка, которой владелец правда пользуется.",
    );
  });
});
