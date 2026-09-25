import { fireEvent, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, test, vi } from "vitest";
import { Header } from "@/components/site/Header";
import { LanguageProvider } from "@/lib/i18n";
import { renderWithLang } from "@/test/render";

describe("Header", () => {
  test("server markup reserves the clock instead of guessing the time", () => {
    const html = renderToString(
      <LanguageProvider>
        <Header />
      </LanguageProvider>,
    );
    // React separates adjacent text nodes with <!-- --> in server markup.
    expect(html.replaceAll("<!-- -->", "")).toContain("YKS --:--");
  });

  test("shows Yakutsk time once mounted", () => {
    vi.useFakeTimers({ toFake: ["Date", "setInterval", "clearInterval"] });
    vi.setSystemTime(new Date("2026-09-25T03:04:00Z"));
    renderWithLang(<Header />);
    expect(screen.getByText("YKS 12:04")).toBeInTheDocument();
  });

  test("offers the wordmark and a mail link", () => {
    renderWithLang(<Header />);
    expect(screen.getByRole("link", { name: "xrtem" })).toHaveAttribute("href", "#top");
    expect(screen.getByRole("link", { name: "Написать на почту" })).toHaveAttribute(
      "href",
      "mailto:batteryofsprunk@gmail.com",
    );
  });

  test("returns focus to the menu button without scrolling", () => {
    const focus = vi.spyOn(HTMLElement.prototype, "focus");
    renderWithLang(<Header />);
    const button = screen.getByRole("button", { name: "Меню" });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(focus).toHaveBeenLastCalledWith({ preventScroll: true });
    expect(button).toHaveFocus();
  });
});
