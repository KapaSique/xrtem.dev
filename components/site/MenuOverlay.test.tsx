import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MenuOverlay } from "@/components/site/MenuOverlay";
import { renderWithLang } from "@/test/render";

describe("MenuOverlay", () => {
  test("renders nothing while closed", () => {
    renderWithLang(<MenuOverlay open={false} onClose={() => {}} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  test("locks the page and focuses the first control", () => {
    renderWithLang(<MenuOverlay open onClose={() => {}} />);
    expect(screen.getByRole("dialog", { name: "Меню" })).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
    expect(screen.getByRole("button", { name: "Закрыть" })).toHaveFocus();
  });

  test("closes on Escape and releases the page", () => {
    const onClose = vi.fn();
    const { rerender } = renderWithLang(<MenuOverlay open onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
    rerender(<MenuOverlay open={false} onClose={onClose} />);
    expect(document.body.style.overflow).toBe("");
  });

  test("a section link closes the menu and keeps its anchor", () => {
    const onClose = vi.fn();
    renderWithLang(<MenuOverlay open onClose={onClose} />);
    const link = screen.getByRole("link", { name: /Работы/ });
    expect(link).toHaveAttribute("href", "#work");
    fireEvent.click(link);
    expect(onClose).toHaveBeenCalledOnce();
  });

  test("switches the whole page to English", () => {
    renderWithLang(<MenuOverlay open onClose={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "EN" }));
    expect(document.documentElement.lang).toBe("en");
    expect(screen.getByRole("link", { name: /Work/ })).toBeInTheDocument();
    expect(window.localStorage.getItem("xrtem-lang")).toBe("en");
  });

  test("Tab from the last control wraps to the first", () => {
    renderWithLang(<MenuOverlay open onClose={() => {}} />);
    const items = screen.getByRole("dialog").querySelectorAll<HTMLElement>("a,button");
    items[items.length - 1].focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(items[0]).toHaveFocus();
  });
});
