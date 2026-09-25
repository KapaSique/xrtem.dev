import { screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, test } from "vitest";
import { About } from "@/components/site/About";
import { glass } from "@/content/site";
import { LanguageProvider } from "@/lib/i18n";
import { renderWithLang } from "@/test/render";

describe("About", () => {
  test("reads as one sentence with its pictures set into the line", () => {
    const { container } = renderWithLang(<About />);
    expect(screen.getByText(/Я Артём — fullstack-разработчик из Якутска\. Делаю витрины/)).toBeInTheDocument();
    expect(screen.getByText("реальных пользователей.")).toHaveClass("xr-shine");
    const pills = container.querySelectorAll('p > [aria-hidden="true"]');
    expect(pills).toHaveLength(2);
  });

  test("the sentence survives the HTML parser whole, so hydration matches", () => {
    // A <div> inside the <p> makes the parser close the paragraph early, and
    // React then throws the server markup away and renders it again.
    const html = renderToString(
      <LanguageProvider>
        <About />
      </LanguageProvider>,
    );
    const parsed = new DOMParser().parseFromString(html, "text/html");
    expect(parsed.querySelector("#about p")?.textContent).toMatch(/реальных пользователей\.$/);
  });

  test("shows the glass close-up with a real alt text", () => {
    renderWithLang(<About />);
    const img = screen.getByAltText("Стеклянный x крупным планом");
    expect(img).toHaveAttribute("src", glass.macro.jpg);
    expect(img.parentElement?.querySelector("source")).toHaveAttribute("srcset", glass.macro.avif);
  });

  test("lists the four numbers, final values painted first", () => {
    const { container } = renderWithLang(<About />);
    const values = Array.from(container.querySelectorAll("dl dd")).map((d) => d.textContent);
    expect(values).toEqual(["5", "4", "74", "1"]);
  });
});
