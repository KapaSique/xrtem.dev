import { fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, test, vi } from "vitest";
import { LanguageProvider, STORAGE_KEY, useLang } from "@/lib/i18n";

function Probe() {
  const { lang, setLang, t } = useLang();
  return (
    <>
      <span data-testid="lang">{lang}</span>
      <span>{t({ en: "Work", ru: "Работы" })}</span>
      <button type="button" onClick={() => setLang("en")}>
        to-en
      </button>
    </>
  );
}

describe("LanguageProvider", () => {
  test("renders Russian on the server, so the first paint matches it", () => {
    const html = renderToString(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(html).toContain("Работы");
  });

  test("ignores the browser language", () => {
    vi.spyOn(window.navigator, "language", "get").mockReturnValue("en-US");
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("ru");
    expect(document.documentElement.lang).toBe("ru");
  });

  test("restores a stored English choice after mount", () => {
    window.localStorage.setItem(STORAGE_KEY, "en");
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");
  });

  test("persists a switch", () => {
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "to-en" }));
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("en");
  });

  test("survives blocked storage", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "to-en" }));
    expect(screen.getByText("Work")).toBeInTheDocument();
  });
});
