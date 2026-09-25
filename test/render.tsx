import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import type { Lang } from "@/content/site";
import { LanguageProvider, STORAGE_KEY } from "@/lib/i18n";

/** Render inside the language provider, the way the page does. */
export function renderWithLang(
  ui: ReactElement,
  { lang = "ru", ...options }: { lang?: Lang } & Omit<RenderOptions, "wrapper"> = {},
) {
  window.localStorage.setItem(STORAGE_KEY, lang);
  return render(ui, { wrapper: LanguageProvider, ...options });
}
