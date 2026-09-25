# xrtem.dev «стеклянный x» — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Пересобрать xrtem.dev по макету из Claude Design: тёмная страница, три кейса, стеклянный «x» из Blender/LuxCore в видео-петле.

**Architecture:** Next.js 16 App Router, одна страница из клиентских секций поверх `LanguageProvider` (RU по умолчанию). Все тексты — пары `{ en, ru }` в `content/site.ts`. Стиль — токены Tailwind v4 в `@theme` и CSS-ключевые кадры из макета. 3D — сцена кодом (`blender/x_scene.py`) → PNG-кадры → ffmpeg → `webm`/`mp4`/AVIF в `public/media/glass/`. Страница показывает их компонентом `GlassLoop` с `mix-blend-mode: lighten`.

**Tech Stack:** Next.js 16.3, React 19.2, Tailwind CSS 4.3, TypeScript 5.9, Vitest 5.0.1 + jsdom 30 + Testing Library, Blender 5.0.1 + BlendLuxCore 2.11.1 (pyluxcore 2.11.2), ffmpeg 8.1 (libvpx-vp9, libx264, libsvtav1), Google Chrome (headless — для скриншотов).

**Spec:** `docs/superpowers/specs/2026-09-25-xrtem-glass-redesign-design.md`

## Global Constraints

- Стек не меняется: Next.js 16 (App Router) + Tailwind v4 + TypeScript. Новых runtime-зависимостей нет; `ogl` удаляется. Dev-зависимости только для тестов: `vitest@5.0.1`, `jsdom@30.1.1`, `@testing-library/react@16.3.3`, `@testing-library/dom@10.4.2`, `@testing-library/user-event@14.6.7`, `@testing-library/jest-dom@7.0.1`.
- Токены: `ink #07060B`, `panel #111018`, `fg #FFFFFF`, `muted #A9A7B4`, `soft #D9D7E3`, `line rgb(255 255 255 / 0.12)`, `chip rgb(255 255 255 / 0.10)`, `glow #5B46FF`. Только тёмная тема.
- Шрифты через `next/font/google`, подмножества `latin` + `cyrillic`: Cormorant Garamond (300, 400; normal, italic) — `font-display`; Onest (400, 500) — `font-sans`; JetBrains Mono (400) — `font-mono`.
- Курсор системный. Никаких кастомных курсоров, наклона карточек за курсором и «магнитных» кнопок. Hover — только CSS.
- Русский основной и рендерится сервером; английский — переключатель в меню. Автоопределения по языку браузера нет.
- Копирайт: без конструкций «X, а не Y» (проверяется тестом).
- Работы — только Chase.je (`https://chaseje.com`), SAQAOMUK (`https://saqaomuk.com`), Control Tower (без ссылки, бейдж «Закрытый доступ»). Слов `profcosmetic.dev`, `petmek`, `trustlens` в контенте нет.
- Видимость и старт анимаций — по геометрии (`getBoundingClientRect`), не через IntersectionObserver (см. комментарий в `components/site/Reveal.tsx`).
- 3D: Blender + LuxCore, `world.luxcore.gamma = 2.2`, прозрачная плёнка, кадр 1080×1080, 180 кадров при 30 к/с, поворот на 90° вокруг собственной нормали «x», остановка LuxCore по времени 90 с на кадр. Видео ≤ 3 МБ на файл. На странице — `mix-blend-mode: lighten`; при `prefers-reduced-motion` или `saveData` — только постер.
- Не деплоить. Коммиты — в `feature/paper-rebuild`, стиль репозитория: `feat: …`/`test: …`/`docs: …`/`chore: …`, строчными, без строк атрибуции.

## Review Focus

- **Автовоспроизведение запрещено** (iOS Low Power Mode, строгие политики) → остаётся постер, нет необработанного отказа промиса. Тест: Task 5, «keeps the poster when autoplay is refused».
- **Посетитель в другом часовом поясе, в том числе после полуночи по UTC** → в шапке и подвале всегда время Якутска, не местное. Тест: Task 4, `formatYakutsk` для `20:30Z → 05:30`.
- **Клик по разделу в открытом меню** → меню закрывается, прокрутка разблокирована, фокус возвращается на кнопку без прыжка наверх (`preventScroll`). Тесты: Task 4, MenuOverlay «a section link closes the menu» и Header «returns focus without scrolling».
- **Вернувшийся посетитель выбрал English, или localStorage заблокирован** → после монтирования страница на английском без предупреждений гидратации; заблокированное хранилище не роняет страницу. Тесты: Task 1, `lib/i18n.test.tsx`.
- **Узкий телефон 320 px** → бегущие строки, длинная пилюля с почтой и заголовок hero не дают горизонтальной прокрутки. Проверка в браузере: Task 8 (строки) и Task 14 (вся страница).

---

### Task 1: Тестовый стенд и русский по умолчанию

**Files:**
- Create: `vitest.config.ts`, `test/setup.ts`, `test/media.ts`, `test/render.tsx`, `lib/i18n.test.tsx`
- Modify: `package.json` (scripts, devDependencies), `lib/i18n.tsx`

**Interfaces:**
- Consumes: типы `Lang`, `LS` из `content/site.ts` (есть и в старом, и в новом контенте).
- Produces:
  - `lib/i18n.tsx`: `export const STORAGE_KEY = "xrtem-lang"`, `LanguageProvider({ children })`, `useLang(): { lang: Lang; setLang(l: Lang): void; t(v: LS): string }`.
  - `test/media.ts`: `mediaQueryList(query: string, matches?: boolean): MediaQueryList`, `mockReducedMotion(reduce: boolean): void`, `rectAt(top: number, height?: number): DOMRect`, `mockRects(top: number, height?: number)` (возвращает `vi.spyOn`-шпион на `Element.prototype.getBoundingClientRect`), `mockSaveData(on: boolean): void`.
  - `test/render.tsx`: `renderWithLang(ui: ReactElement, opts?: { lang?: Lang } & Omit<RenderOptions, "wrapper">)`.

- [ ] **Step 1: Поставить тестовые зависимости и скрипты**

```bash
npm install -D vitest@5.0.1 jsdom@30.1.1 @testing-library/react@16.3.3 @testing-library/dom@10.4.2 @testing-library/user-event@14.6.7 @testing-library/jest-dom@7.0.1
npm pkg set scripts.test="vitest run" scripts.test:watch="vitest"
```

- [ ] **Step 2: Конфиг и помощники**

`vitest.config.ts`:

```ts
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
```

`test/media.ts`:

```ts
import { vi } from "vitest";

/** A MediaQueryList that answers a fixed value — jsdom has none of its own. */
export function mediaQueryList(query: string, matches = false): MediaQueryList {
  return {
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList;
}

/** Answer `prefers-reduced-motion` the way a visitor's system would. */
export function mockReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn((query: string) =>
    mediaQueryList(query, reduce && query.includes("prefers-reduced-motion: reduce")),
  );
}

export function rectAt(top: number, height = 600): DOMRect {
  return {
    x: 0,
    y: top,
    top,
    left: 0,
    width: 1000,
    height,
    right: 1000,
    bottom: top + height,
    toJSON: () => ({}),
  } as DOMRect;
}

/** Pretend every element sits `top` px below the top of the viewport. */
export function mockRects(top: number, height = 600) {
  return vi
    .spyOn(Element.prototype, "getBoundingClientRect")
    .mockImplementation(() => rectAt(top, height));
}

/** Data-saver mode, as Chrome on Android reports it. */
export function mockSaveData(on: boolean) {
  Object.defineProperty(navigator, "connection", {
    configurable: true,
    value: on ? { saveData: true } : undefined,
  });
}
```

`test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { mediaQueryList, mockSaveData } from "./media";

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.lang = "";
  document.body.style.overflow = "";
  window.matchMedia = vi.fn((query: string) => mediaQueryList(query));
  mockSaveData(false);
  // jsdom has no media playback; the components only need these to exist.
  Object.defineProperty(HTMLMediaElement.prototype, "play", {
    configurable: true,
    writable: true,
    value: vi.fn(() => Promise.resolve()),
  });
  Object.defineProperty(HTMLMediaElement.prototype, "pause", {
    configurable: true,
    writable: true,
    value: vi.fn(),
  });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});
```

`test/render.tsx`:

```tsx
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
```

- [ ] **Step 3: Написать падающий тест языка**

`lib/i18n.test.tsx`:

```tsx
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
```

- [ ] **Step 4: Убедиться, что тест падает**

Run: `npx vitest run lib/i18n.test.tsx`
Expected: FAIL — `STORAGE_KEY` не экспортируется, а «ignores the browser language» получает `en`: нынешний провайдер стартует с `"en"` и смотрит на `navigator.language`.

- [ ] **Step 5: Переписать провайдер**

`lib/i18n.tsx` целиком:

```tsx
"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang, LS } from "@/content/site";

export const STORAGE_KEY = "xrtem-lang";

type Ctx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (value: LS) => string;
};

const LangContext = createContext<Ctx | null>(null);

function readStored(): Lang | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "ru" ? stored : null;
  } catch {
    return null; // storage blocked: private mode, sandboxed webviews
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // The server renders Russian, so the first client render must as well —
  // English only arrives once a stored choice is read after mount.
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const stored = readStored();
    if (stored) setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The choice holds for this visit, it just won't persist.
    }
  }, []);

  const t = useCallback((value: LS) => value[lang], [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
```

- [ ] **Step 6: Тесты и типы зелёные**

Run: `npm test && npm run lint`
Expected: `lib/i18n.test.tsx` — 5 passed; `tsc --noEmit` без ошибок.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts test lib/i18n.tsx lib/i18n.test.tsx
git commit -m "test: add vitest and make russian the default language"
```

---

### Task 2: Основа — контент, токены, шрифты, снос старого сайта

**Files:**
- Create: `content/site.test.ts`
- Modify (переписать целиком): `content/site.ts`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`
- Delete: `components/site/{Backdrop,Chrome,Close,Proof,ThemeToggle,Hero,Work,Services}.tsx`, `components/reactbits/`, `lib/theme.tsx`, `lib/github.ts`, `content/v2.ts`, `public/media/v2/`, `public/media/petmek/`, `public/media/experiments/`, `app/icon.svg`, `saqa.png`, `.playwright-mcp/`
- Modify: `package.json` (удалить `ogl`), `.gitignore`

**Interfaces:**
- Consumes: `LanguageProvider` из Task 1.
- Produces (`content/site.ts`, используют все следующие задачи):
  - типы `Lang`, `LS`, `LL`, `SectionId`, `WorkId`, `Work`;
  - `identity { wordmark, domain, name: LS, email, telegram: {label, href}, github: {label, href} }`;
  - `sections: { id: SectionId; label: LS }[]`;
  - `ui` — ключи `menu, close, language, sections, projects, writeEmail, open, privateAccess` (все `LS`);
  - `hero { intro: LS; lineOne: LS; lineTwo: LS; words: LL; disciplines: string; scroll: LS; status: LS }`;
  - `glass { loop: {webm, mp4}; poster: {avif, jpg}; macro: {avif, jpg} }` — пути в `public/`;
  - `marquee: LS[]` (6);
  - `works: Work[]` (3), `Work = { id: WorkId; index: string; title: string; kind: LS; year: string; link: {href, label} | null; media: {kind: "image"; src; alt: LS} | {kind: "panel"} }`;
  - `controlTower { label: LS; revenue: LS; sync: string; tiles: {label: LS; value: LS}[] }`;
  - `about { label: LS; parts: LL (4 части); macroAlt: LS; macroCaption: LS; stats: {value: number; label: LS}[] }`;
  - `services { label: LS; headingLead: LS; headingAccent: LS; items: {index: string; title: LS; text: LS}[] }`;
  - `contact { label: LS; lineOne: LS; lineTwo: LS; copyright: string; city: LS; top: LS }`;
  - CSS-классы в `app/globals.css`: `xr-ch, xr-shine, xr-ml, xr-mr, xr-stroke, xr-grain, xr-noise, xr-drop, xpulse, xa1, xa2, xa3, xr-card, xr-row, xr-row-t, xr-plus, xr-spin`; утилиты Tailwind `bg-ink, bg-panel, text-fg, text-muted, text-soft, border-line, bg-chip, bg-glow, font-display, font-sans, font-mono`.

- [ ] **Step 1: Написать падающий тест контента**

`content/site.test.ts`:

```ts
import { describe, expect, test } from "vitest";
import * as site from "@/content/site";

type Pair = { path: string; en: string; ru: string };

/** Walk the content and pull out every { en, ru } pair, lists included. */
function collectPairs(value: unknown, path: string, out: Pair[]) {
  if (Array.isArray(value)) {
    value.forEach((item, i) => collectPairs(item, `${path}[${i}]`, out));
    return;
  }
  if (!value || typeof value !== "object") return;
  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).sort();
  if (keys.length === 2 && keys[0] === "en" && keys[1] === "ru") {
    if (typeof obj.en === "string" && typeof obj.ru === "string") {
      out.push({ path, en: obj.en, ru: obj.ru });
      return;
    }
    if (Array.isArray(obj.en) && Array.isArray(obj.ru)) {
      expect(obj.en.length, `${path}: en/ru lengths`).toBe(obj.ru.length);
      (obj.en as string[]).forEach((en, i) =>
        out.push({ path: `${path}[${i}]`, en, ru: (obj.ru as string[])[i] }),
      );
      return;
    }
  }
  for (const key of keys) collectPairs(obj[key], `${path}.${key}`, out);
}

const pairs: Pair[] = [];
collectPairs(site, "site", pairs);

describe("content", () => {
  test("every bilingual string is filled in both languages", () => {
    expect(pairs.length).toBeGreaterThan(40);
    for (const p of pairs) {
      expect(p.en.trim(), p.path).not.toBe("");
      expect(p.ru.trim(), p.path).not.toBe("");
    }
  });

  test("Russian copy never uses the «X, а не Y» construction", () => {
    for (const p of pairs) expect(p.ru, p.path).not.toMatch(/,\s*а не\s/i);
  });

  test("exactly three works, and only Control Tower goes without a link", () => {
    expect(site.works.map((w) => w.id)).toEqual(["chaseje", "saqaomuk", "control-tower"]);
    expect(site.works.find((w) => w.id === "chaseje")?.link?.href).toBe("https://chaseje.com");
    expect(site.works.find((w) => w.id === "saqaomuk")?.link?.href).toBe("https://saqaomuk.com");
    expect(site.works.find((w) => w.id === "control-tower")?.link).toBeNull();
    expect(JSON.stringify(site)).not.toMatch(/profcosmetic\.dev|petmek|trustlens/i);
  });

  test("the layout gets the counts it is built for", () => {
    expect(site.hero.words.ru).toHaveLength(5);
    expect(site.marquee).toHaveLength(6);
    expect(site.services.items.map((s) => s.index)).toEqual(["01", "02", "03", "04", "05"]);
    expect(site.about.stats.map((s) => s.value)).toEqual([5, 4, 74, 1]);
    expect(site.about.parts.ru).toHaveLength(4);
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run content/site.test.ts`
Expected: FAIL — нет `site.marquee`, `site.services`, в `works` пять работ и есть `profcosmetic.dev`.

- [ ] **Step 3: Новый контент**

`content/site.ts` целиком:

```ts
export type Lang = "en" | "ru";

/** A string that exists in both languages. */
export type LS = { en: string; ru: string };

/** A list that exists in both languages, item for item. */
export type LL = { en: string[]; ru: string[] };

export const identity = {
  wordmark: "xrtem",
  domain: "xrtem.dev",
  name: { en: "Artem Svinoboev", ru: "Артём Свинобоев" } satisfies LS,
  email: "batteryofsprunk@gmail.com",
  telegram: { label: "Telegram", href: "https://t.me/stelmahhh" },
  github: { label: "GitHub", href: "https://github.com/KapaSique" },
};

export type SectionId = "work" | "about" | "services" | "contact";

export const sections: { id: SectionId; label: LS }[] = [
  { id: "work", label: { en: "Work", ru: "Работы" } },
  { id: "about", label: { en: "About", ru: "О себе" } },
  { id: "services", label: { en: "Services", ru: "Услуги" } },
  { id: "contact", label: { en: "Contact", ru: "Контакты" } },
];

export const ui = {
  menu: { en: "Menu", ru: "Меню" },
  close: { en: "Close", ru: "Закрыть" },
  language: { en: "Language", ru: "Язык" },
  sections: { en: "Sections", ru: "Разделы" },
  projects: { en: "Projects", ru: "Проекты" },
  writeEmail: { en: "Write an email", ru: "Написать на почту" },
  open: { en: "Open", ru: "Открыть" },
  privateAccess: { en: "Private access", ru: "Закрытый доступ" },
} satisfies Record<string, LS>;

export const hero = {
  intro: {
    en: "Since 2022 I've been building sites and services end to end — from the first layout to an admin panel the owner actually uses.",
    ru: "С 2022 года собираю сайты и сервисы под ключ — от макета до админки, которой владелец пользуется сам.",
  } satisfies LS,
  lineOne: { en: "I build sites", ru: "Делаю сайты," } satisfies LS,
  lineTwo: { en: "people", ru: "которые" } satisfies LS,
  words: {
    en: ["open", "scroll", "buy from", "show off", "recommend"],
    ru: ["открывают", "листают", "покупают", "показывают", "советуют"],
  } satisfies LL,
  disciplines: "Fullstack · Web · Product",
  scroll: { en: "Scroll", ru: "Листайте" } satisfies LS,
  status: { en: "Taking projects this autumn", ru: "Принимаю проекты на осень" } satisfies LS,
};

/** Rendered in Blender, see blender/. */
export const glass = {
  loop: { webm: "/media/glass/x-loop.webm", mp4: "/media/glass/x-loop.mp4" },
  poster: { avif: "/media/glass/x-poster.avif", jpg: "/media/glass/x-poster.jpg" },
  macro: { avif: "/media/glass/x-macro.avif", jpg: "/media/glass/x-macro.jpg" },
};

export const marquee: LS[] = [
  { en: "Websites", ru: "Сайты" },
  { en: "Online stores", ru: "Интернет-магазины" },
  { en: "Platforms", ru: "Платформы" },
  { en: "Telegram bots", ru: "Telegram-боты" },
  { en: "Admin panels", ru: "Админки" },
  { en: "Integrations", ru: "Интеграции" },
];

export type WorkId = "chaseje" | "saqaomuk" | "control-tower";

export type Work = {
  id: WorkId;
  index: string;
  title: string;
  kind: LS;
  year: string;
  link: { href: string; label: string } | null;
  media: { kind: "image"; src: string; alt: LS } | { kind: "panel" };
};

export const works: Work[] = [
  {
    id: "chaseje",
    index: "01",
    title: "Chase.je",
    kind: { en: "Archive boutique · e-commerce", ru: "Бутик-архив · e-commerce" },
    year: "2026",
    link: { href: "https://chaseje.com", label: "chaseje.com" },
    media: {
      kind: "image",
      src: "/media/chase/boutique.jpg",
      alt: { en: "Chase.je home page", ru: "Главная Chase.je" },
    },
  },
  {
    id: "saqaomuk",
    index: "02",
    title: "SAQAOMUK",
    kind: { en: "Fashion · storefront", ru: "Fashion · витрина" },
    year: "2026",
    link: { href: "https://saqaomuk.com", label: "saqaomuk.com" },
    media: {
      kind: "image",
      src: "/media/saqa/storefront.jpg",
      alt: { en: "SAQAOMUK storefront", ru: "Витрина SAQAOMUK" },
    },
  },
  {
    id: "control-tower",
    index: "03",
    title: "Control Tower",
    kind: { en: "Dashboard · 1C → Next.js", ru: "Дашборд · 1С → Next.js" },
    year: "2026",
    link: null,
    media: { kind: "panel" },
  },
];

export const controlTower = {
  label: { en: "Control Tower dashboard preview", ru: "Control Tower: превью дашборда" } satisfies LS,
  revenue: { en: "Revenue · 30 days", ru: "Выручка · 30 дней" } satisfies LS,
  sync: "sync ok",
  tiles: [
    { label: { en: "Datasets", ru: "Датасеты" }, value: { en: "18", ru: "18" } },
    { label: { en: "Source", ru: "Источник" }, value: { en: "1C", ru: "1С" } },
    { label: { en: "Status", ru: "Статус" }, value: { en: "ready", ru: "ready" } },
  ] satisfies { label: LS; value: LS }[],
};

export const about = {
  label: { en: "(About)", ru: "(О себе)" } satisfies LS,
  /** The sentence around its two inline pictures; the last part shimmers. */
  parts: {
    en: [
      "I'm Artem, a full-stack developer from Yakutsk. I build storefronts",
      "for brands and platforms",
      "for businesses, and take them all the way to a domain, an admin panel and",
      "real users.",
    ],
    ru: [
      "Я Артём — fullstack-разработчик из Якутска. Делаю витрины",
      "для брендов, платформы",
      "для бизнеса и довожу их до домена, админки и",
      "реальных пользователей.",
    ],
  } satisfies LL,
  macroAlt: { en: "The glass x, close up", ru: "Стеклянный x крупным планом" } satisfies LS,
  macroCaption: { en: "(x · glass · LuxCore)", ru: "(x · стекло · LuxCore)" } satisfies LS,
  stats: [
    { value: 5, label: { en: "projects in production", ru: "проектов в продакшене" } },
    { value: 4, label: { en: "years of shipping", ru: "года в разработке" } },
    { value: 74, label: { en: "products in one storefront", ru: "товара в одной витрине" } },
    { value: 1, label: { en: "person for the whole cycle", ru: "человек на весь цикл" } },
  ] satisfies { value: number; label: LS }[],
};

export const services = {
  label: { en: "(Services)", ru: "(Услуги)" } satisfies LS,
  headingLead: { en: "What I", ru: "Что я" } satisfies LS,
  headingAccent: { en: "do", ru: "делаю" } satisfies LS,
  items: [
    {
      index: "01",
      title: { en: "Websites & landing pages", ru: "Сайты и лендинги" },
      text: {
        en: "For companies, brands and launches. Animation, a CMS, SEO and speed out of the box.",
        ru: "Для компаний, брендов и запусков. Анимации, CMS, SEO и скорость из коробки.",
      },
    },
    {
      index: "02",
      title: { en: "Online stores", ru: "Интернет-магазины" },
      text: {
        en: "Catalogue, cart, payments and an admin panel the owner really uses.",
        ru: "Каталог, корзина, оплата и админка, которой владелец правда пользуется.",
      },
    },
    {
      index: "03",
      title: { en: "Platforms & dashboards", ru: "Платформы и кабинеты" },
      text: {
        en: "Roles, multi-tenancy, reports. FastAPI, PostgreSQL, Next.js.",
        ru: "Роли, мультитенантность, отчёты. FastAPI, PostgreSQL, Next.js.",
      },
    },
    {
      index: "04",
      title: { en: "Telegram bots & Mini Apps", ru: "Telegram-боты и Mini Apps" },
      text: {
        en: "Loyalty, bookings, broadcasts — wired to your site and CRM.",
        ru: "Лояльность, запись, рассылки — связанные с вашим сайтом и CRM.",
      },
    },
    {
      index: "05",
      title: { en: "Integrations", ru: "Интеграции" },
      text: {
        en: "1C, CRM, acquiring, analytics. Data moves on its own, with no manual exports.",
        ru: "1С, CRM, эквайринг, аналитика. Данные ходят сами, без ручной выгрузки.",
      },
    },
  ] satisfies { index: string; title: LS; text: LS }[],
};

export const contact = {
  label: { en: "(Contact)", ru: "(Контакты)" } satisfies LS,
  lineOne: { en: "Got a project?", ru: "Есть проект?" } satisfies LS,
  lineTwo: { en: "Let's talk.", ru: "Поговорим." } satisfies LS,
  copyright: "© 2026 xrtem",
  city: { en: "Yakutsk", ru: "Якутск" } satisfies LS,
  top: { en: "Back to top", ru: "Наверх" } satisfies LS,
};
```

- [ ] **Step 4: Снести старый сайт**

```bash
git rm -q components/site/Backdrop.tsx components/site/Chrome.tsx components/site/Close.tsx components/site/Proof.tsx components/site/ThemeToggle.tsx components/site/Hero.tsx components/site/Work.tsx components/site/Services.tsx
git rm -rq components/reactbits lib/theme.tsx lib/github.ts content/v2.ts public/media/v2 public/media/petmek public/media/experiments app/icon.svg saqa.png .playwright-mcp
npm uninstall ogl
printf '\n# 3D renders and tooling artefacts\nblender/out/\n.playwright-mcp/\n' >> .gitignore
```

- [ ] **Step 5: Токены и ключевые кадры**

`app/globals.css` целиком:

```css
@import "tailwindcss";

/* ------------------------------------------------------------------ *
 * xrtem.dev — ink, one violet glow and a glass x rendered in Blender.
 * All motion is CSS keyframes, and every one stops under reduced motion.
 * ------------------------------------------------------------------ */
@theme {
  --font-display: var(--font-cormorant), Georgia, serif;
  --font-sans: var(--font-onest), ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: var(--font-jetbrains), ui-monospace, "SF Mono", monospace;

  --color-ink: #07060b;
  --color-panel: #111018;
  --color-fg: #ffffff;
  --color-muted: #a9a7b4;
  --color-soft: #d9d7e3;
  --color-line: rgb(255 255 255 / 0.12);
  --color-chip: rgb(255 255 255 / 0.1);
  --color-glow: #5b46ff;
}

html {
  background: var(--color-ink);
  color-scheme: dark;
  scroll-behavior: smooth;
}

a {
  color: inherit;
  text-decoration: none;
}

:focus-visible {
  outline: 2px solid var(--color-glow);
  outline-offset: 3px;
  border-radius: 8px;
}

::selection {
  background: var(--color-glow);
  color: #fff;
}

/* Hero letters rise out of a blur, one after another. */
@keyframes xr-rise {
  from {
    transform: translateY(70%) rotate(7deg);
    filter: blur(14px);
    opacity: 0;
  }
  to {
    transform: none;
    filter: blur(0);
    opacity: 1;
  }
}
.xr-ch {
  display: inline-block;
  animation: xr-rise 1.2s cubic-bezier(0.2, 0.85, 0.15, 1) both;
}

@keyframes xr-shine {
  from {
    background-position: 160% 0;
  }
  to {
    background-position: -60% 0;
  }
}
.xr-shine {
  background: linear-gradient(105deg, #7f7c8c 25%, #ffffff 45%, #d9d6ff 52%, #7f7c8c 70%);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: xr-shine 4.5s linear infinite;
}

@keyframes xr-ml {
  to {
    transform: translateX(-50%);
  }
}
@keyframes xr-mr {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
.xr-ml {
  animation: xr-ml 28s linear infinite;
}
.xr-mr {
  animation: xr-mr 34s linear infinite;
}
.xr-stroke {
  color: transparent;
  -webkit-text-stroke: 1.2px rgb(255 255 255 / 0.7);
}

/* Film grain: one static noise tile, jittered in five steps. */
.xr-grain,
.xr-noise {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
@keyframes xr-grain {
  0%,
  100% {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(-3%, 2%);
  }
  40% {
    transform: translate(2%, -3%);
  }
  60% {
    transform: translate(-2%, -1%);
  }
  80% {
    transform: translate(3%, 3%);
  }
}
.xr-grain {
  animation: xr-grain 0.9s steps(5) infinite;
}

@keyframes xr-drop {
  0% {
    transform: scaleY(0);
    transform-origin: top;
  }
  45% {
    transform: scaleY(1);
    transform-origin: top;
  }
  55% {
    transform: scaleY(1);
    transform-origin: bottom;
  }
  100% {
    transform: scaleY(0);
    transform-origin: bottom;
  }
}
.xr-drop {
  animation: xr-drop 2.2s cubic-bezier(0.7, 0, 0.3, 1) infinite;
}

@keyframes xpulse {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 1;
  }
}
.xpulse {
  animation: xpulse 2s ease-in-out infinite;
}

/* The Control Tower panel's drifting glows. */
@keyframes xa1 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(260px, -120px) scale(1.25);
  }
  66% {
    transform: translate(-180px, 90px) scale(0.9);
  }
}
@keyframes xa2 {
  0%,
  100% {
    transform: translate(0, 0) scale(1.1);
  }
  40% {
    transform: translate(-300px, 140px) scale(0.85);
  }
  75% {
    transform: translate(160px, -60px) scale(1.3);
  }
}
@keyframes xa3 {
  0%,
  100% {
    transform: translate(0, 0) scale(0.9);
  }
  50% {
    transform: translate(220px, 160px) scale(1.2);
  }
}
.xa1 {
  animation: xa1 18s ease-in-out infinite;
}
.xa2 {
  animation: xa2 22s ease-in-out infinite;
}
.xa3 {
  animation: xa3 15s ease-in-out infinite;
}

/* Plain CSS hover states — nothing follows the cursor. */
.xr-card img {
  transition: transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.xr-card:hover img {
  transform: scale(1.07);
}
.xr-row .xr-row-t {
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.xr-row:hover .xr-row-t {
  transform: translateX(28px);
}
.xr-row .xr-plus {
  transition:
    transform 0.5s,
    background-color 0.3s,
    color 0.3s;
}
.xr-row:hover .xr-plus {
  transform: rotate(45deg);
  background-color: #fff;
  color: var(--color-ink);
}

/* The e-mail pill's running border. */
@keyframes xr-rot {
  to {
    transform: rotate(360deg);
  }
}
.xr-spin {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}
.xr-spin::before {
  content: "";
  position: absolute;
  left: -50%;
  top: -300%;
  width: 200%;
  height: 700%;
  background: conic-gradient(from 0deg, transparent 0 62%, var(--color-glow) 78%, #ffffff 88%, transparent 100%);
  animation: xr-rot 3.2s linear infinite;
  z-index: -2;
}
.xr-spin::after {
  content: "";
  position: absolute;
  inset: 2px;
  border-radius: 999px;
  background: var(--color-ink);
  z-index: -1;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .xr-ch,
  .xr-shine,
  .xr-ml,
  .xr-mr,
  .xr-grain,
  .xr-drop,
  .xpulse,
  .xa1,
  .xa2,
  .xa3,
  .xr-spin::before {
    animation: none;
  }
  .xr-card img,
  .xr-row .xr-row-t,
  .xr-row .xr-plus {
    transition: none;
  }
}
```

- [ ] **Step 6: Шрифты, метаданные, временная страница**

`app/layout.tsx` целиком:

```tsx
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Onest } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-onest",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = "xrtem — сайты и продукты под ключ";
const description =
  "Артём Свинобоев — fullstack-разработчик из Якутска. Сайты, интернет-магазины, платформы и Telegram-боты под ключ: от макета до админки и реальных пользователей.";

export const metadata: Metadata = {
  metadataBase: new URL("https://xrtem.dev"),
  title: { default: title, template: "%s — xrtem.dev" },
  description,
  keywords: ["Артём Свинобоев", "Artem Svinoboev", "разработка сайтов", "Якутск", "Next.js", "интернет-магазин", "Telegram-бот"],
  authors: [{ name: "Artem Svinoboev", url: "https://github.com/KapaSique" }],
  creator: "Artem Svinoboev",
  openGraph: {
    type: "website",
    url: "https://xrtem.dev",
    siteName: "xrtem.dev",
    title,
    description,
    locale: "ru_RU",
    alternateLocale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07060B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/* Entrances are applied from the client; without scripting they would
            leave sections blank, so the hidden state is cancelled outright. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-ink font-sans text-fg antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
```

`app/page.tsx` целиком (секции придут следующими задачами):

```tsx
import { hero } from "@/content/site";

export default function Page() {
  return <main className="min-h-screen p-6 font-display text-6xl font-light">{hero.lineOne.ru}</main>;
}
```

- [ ] **Step 7: Всё зелёное**

Run: `npm test && npm run lint && npm run build`
Expected: тесты `content` (4) и `LanguageProvider` (5) проходят; `tsc` чистый; `next build` собирает `/` и `/opengraph-image` без ошибок.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: lay the ink foundation for the glass redesign"
```

---

### Task 3: 3D-сцена в Blender и черновая петля

**Files:**
- Create: `blender/x_scene.py`, `blender/check_frame.py`, `blender/render.sh`, `blender/encode.sh`
- Create (результат рендера): `public/media/glass/{x-loop.webm,x-loop.mp4,x-poster.jpg,x-poster.avif,x-macro.jpg,x-macro.avif}`, `app/icon.png`

**Interfaces:**
- Consumes: Blender `/Applications/Blender.app` 5.0.1 с включённым BlendLuxCore (уже установлен), ffmpeg в `PATH`.
- Produces:
  - `blender/render.sh loop <luxcore|cycles> [start] [end] [--budget N]` → `blender/out/loop-<engine>/0000.png…`; `still <engine> <frame>` → `blender/out/still-<engine>-<frame>.png`; `macro <engine>` → `blender/out/macro-<engine>.png`.
  - `blender/encode.sh <frames-dir> <macro.png>` → файлы в `public/media/glass/` + `app/icon.png`.
  - Пути ассетов совпадают с `glass` из `content/site.ts`.

- [ ] **Step 1: Написать проверку кадра**

`blender/check_frame.py`:

```python
"""Fail loudly if a render came out empty or blown: Blender -b -P blender/check_frame.py -- <png>"""
import sys

import bpy
import numpy as np

path = sys.argv[sys.argv.index("--") + 1]
im = bpy.data.images.load(path)
px = np.array(im.pixels[:], dtype=np.float32).reshape(-1, 4)
cover = float((px[:, 3] > 0.02).mean())
peak = float(px[:, :3].max())
print(f"COVER {cover:.3f} PEAK {peak:.3f}")
if not (0.05 < cover < 0.8 and peak > 0.5):
    raise SystemExit(f"CHECK FAIL {path}: cover {cover:.3f}, peak {peak:.3f}")
print("CHECK OK")
```

- [ ] **Step 2: Убедиться, что проверка валит пустой кадр**

```bash
mkdir -p blender/out
ffmpeg -loglevel error -y -f lavfi -i "color=c=black@0.0:s=64x64,format=rgba" -frames:v 1 blender/out/empty.png
/Applications/Blender.app/Contents/MacOS/Blender -b --python-exit-code 1 -P blender/check_frame.py -- "$PWD/blender/out/empty.png"; echo "exit=$?"
```

Expected: `CHECK FAIL …: cover 0.000, peak 0.000` и `exit=1`.

- [ ] **Step 3: Сцена кодом**

`blender/x_scene.py`:

```python
"""The glass x for xrtem.dev, as code.

Run from the repo root (Blender 5.0+; BlendLuxCore 2.11+ for --engine luxcore):

    /Applications/Blender.app/Contents/MacOS/Blender -b -P blender/x_scene.py -- \
        --engine luxcore --mode loop --out blender/out/loop-luxcore

Modes
    loop   frames [start, end) of a seamless quarter-turn spin -> <out>/0000.png ...
    still  a single loop frame (--frame) -> <out> (a .png path), for look-dev
    macro  the close-up for the About card -> <out> (a .png path)

Everything renders over a transparent film on purpose: encode.sh lays the frames
on pure black and the page blends the video with `lighten`, so whatever black the
codec produces loses to the page background and no rectangle shows.
"""
import argparse
import math
import os
import sys
import time

import bpy
import numpy as np
from mathutils import Euler, Quaternion

# ---------------------------------------------------------------- the look
FRAMES = 180                 # 6 s at 30 fps
SPIN_DEG = 90.0              # the x maps onto itself after a quarter turn
TILT_DEG = (-18.0, 0.0, -26.0)
IOR = 1.5
CAUCHY_B = 0.025             # LuxCore dispersion; real glass is 0.0035-0.013, this is stylised
FILM_NM, FILM_IOR = 420.0, 1.38
COLORS = {"violet": "#5B46FF", "pink": "#FF4FA3", "cyan": "#35E0FF", "warm": "#FFB36B"}
STUDIO = {
    "key": 7.0,
    "violet": 3.2,
    "cyan": 3.0,
    "pink": 3.0,
    "warm": 0.7,
    # (horizontal offset, width, strength) of the thin strips behind the object
    "strips": ((-0.42, 0.018, 9.0), (-0.12, 0.008, 12.0), (0.2, 0.012, 10.0), (0.47, 0.02, 7.0)),
}
MACRO_RES = (1096, 1240)     # the About card is 548 x 620 CSS px, at 2x
# Cycles: samples per pixel. LuxCore: seconds per frame (90 s at 1080 px measured clean
# on an M4 Pro; a noise-threshold halt never converged on dispersive glass).
DEFAULT_BUDGET = {"cycles": 256, "luxcore": 90}

HERE = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(HERE, "out", "studio.exr")


def parse():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    p = argparse.ArgumentParser(prog="x_scene.py")
    p.add_argument("--engine", choices=("luxcore", "cycles"), default="luxcore")
    p.add_argument("--mode", choices=("loop", "still", "macro"), default="still")
    p.add_argument("--out", required=True)
    p.add_argument("--res", type=int, default=1080, help="side of the square frame")
    p.add_argument("--frame", type=int, default=0, help="loop frame for --mode still")
    p.add_argument("--start", type=int, default=0)
    p.add_argument("--end", type=int, default=FRAMES)
    p.add_argument("--budget", type=int, default=0, help="Cycles samples / LuxCore seconds (0 = default)")
    return p.parse_args(argv)


def hex_lin(h):
    h = h.lstrip("#")
    c = np.array([int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)])
    return np.where(c > 0.04045, ((c + 0.055) / 1.055) ** 2.4, c / 12.92)


def smooth(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def build_env(path, w=2048, h=1024):
    """The studio as an equirect HDR, shared by both engines."""
    u = (np.arange(w) + 0.5) / w
    v = (np.arange(h) + 0.5) / h
    U, V = np.meshgrid(u, v)
    phi = (U - 0.5) * 2 * np.pi
    el = (V - 0.5) * np.pi
    dx = -np.cos(el) * np.cos(phi)
    dy = np.cos(el) * np.sin(phi)
    dz = np.sin(el)
    s = STUDIO
    img = np.zeros((h, w, 3))
    img += s["key"] * smooth(0.62, 0.8, dz)[..., None]
    img += s["violet"] * np.exp(-((dz - 0.02) / 0.07) ** 2)[..., None] * hex_lin(COLORS["violet"])
    walls = (1 - np.abs(dz))[..., None]
    img += s["cyan"] * smooth(0.45, 0.95, -dx)[..., None] * hex_lin(COLORS["cyan"]) * walls
    img += s["pink"] * smooth(0.45, 0.95, dx)[..., None] * hex_lin(COLORS["pink"]) * walls
    img += s["warm"] * smooth(-0.35, -0.85, dz)[..., None] * hex_lin(COLORS["warm"])
    behind = smooth(0.2, 0.6, dy) * (np.abs(dz) < 0.75)
    for off, width, k in s["strips"]:
        img += (k * np.exp(-((dx - off) / width) ** 2) * behind)[..., None]
    rgba = np.concatenate([img, np.ones((h, w, 1))], axis=2).astype(np.float32)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im = bpy.data.images.new("studio", w, h, alpha=True, float_buffer=True)
    im.pixels.foreach_set(np.flipud(rgba).ravel())  # Blender stores the bottom row first
    im.filepath_raw = path
    im.file_format = "OPEN_EXR"
    im.save()
    return bpy.data.images.load(path, check_existing=False)


def clear_scene():
    # Keep the user's add-ons (LuxCore lives there), drop whatever the startup file holds.
    for o in list(bpy.data.objects):
        bpy.data.objects.remove(o)


def build_x(scene):
    """Two capsules fused by metaballs; returns the object to spin."""
    mb = bpy.data.metaballs.new("x")
    mb.resolution = 0.03
    mb.render_resolution = 0.012
    mb.threshold = 0.6
    for ang in (45, -45):
        e = mb.elements.new(type="CAPSULE")
        e.radius = 0.5
        e.size_x = 1.25
        e.stiffness = 2.2
        e.rotation = Quaternion((0, 1, 0), math.radians(ang))
    obj = bpy.data.objects.new("x", mb)
    scene.collection.objects.link(obj)
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.convert(target="MESH")
    obj = bpy.context.active_object
    bpy.ops.object.shade_smooth()

    tilt = bpy.data.objects.new("tilt", None)
    scene.collection.objects.link(tilt)
    tilt.rotation_euler = Euler(tuple(math.radians(a) for a in TILT_DEG))
    obj.parent = tilt  # spin happens in the x's own plane, the tilt stays put
    return obj


def set_spin(obj, frame):
    obj.rotation_euler = Euler((0.0, math.radians(SPIN_DEG * frame / FRAMES), 0.0))


def build_camera(scene, mode, res):
    data = bpy.data.cameras.new("cam")
    cam = bpy.data.objects.new("cam", data)
    scene.collection.objects.link(cam)
    scene.camera = cam
    if mode == "macro":
        data.lens = 110
        cam.location = (0.35, -7.2, 0.45)
        cam.rotation_euler = Euler((math.radians(86.5), 0, math.radians(2.8)))
        data.dof.use_dof = True
        data.dof.focus_distance = 7.2
        data.dof.aperture_fstop = 2.2
        scene.render.resolution_x, scene.render.resolution_y = MACRO_RES
    else:
        data.lens = 70
        cam.location = (0, -10.0, 0)
        cam.rotation_euler = Euler((math.radians(90), 0, 0))
        scene.render.resolution_x = scene.render.resolution_y = res
    return cam


def build_world(scene, engine, env):
    w = bpy.data.worlds.new("studio")
    scene.world = w
    if engine == "cycles":
        try:
            w.use_nodes = True  # deprecated in 5.0, still harmless
        except Exception:
            pass
        nt = w.node_tree
        nt.nodes.clear()
        out = nt.nodes.new("ShaderNodeOutputWorld")
        tex = nt.nodes.new("ShaderNodeTexEnvironment")
        tex.image = env
        bg = nt.nodes.new("ShaderNodeBackground")
        nt.links.new(tex.outputs["Color"], bg.inputs["Color"])
        nt.links.new(bg.outputs[0], out.inputs["Surface"])
    else:
        w.luxcore.light = "infinite"
        w.luxcore.image = env
        w.luxcore.gain = 1.0
        # pyluxcore 2.11.2 sRGB-encodes float image maps on load (measured: linear 0.8
        # comes back as 244/255 instead of 231). Gamma 2.2 undoes it and keeps HDR > 1.
        w.luxcore.gamma = 2.2


def build_glass(engine):
    mat = bpy.data.materials.new("glass")
    if engine == "cycles":
        # Cycles has no dispersion input: three glass lobes, one per RGB channel.
        try:
            mat.use_nodes = True
        except Exception:
            pass
        nt = mat.node_tree
        nt.nodes.clear()
        out = nt.nodes.new("ShaderNodeOutputMaterial")
        a1, a2 = nt.nodes.new("ShaderNodeAddShader"), nt.nodes.new("ShaderNodeAddShader")
        lobes = []
        for col, k in (((1, 0, 0, 1), -1), ((0, 1, 0, 1), 0), ((0, 0, 1, 1), 1)):
            g = nt.nodes.new("ShaderNodeBsdfGlass")
            g.inputs["Color"].default_value = col
            g.inputs["IOR"].default_value = IOR + k * 0.04
            g.inputs["Roughness"].default_value = 0.0
            g.inputs["Thin Film Thickness"].default_value = FILM_NM
            g.inputs["Thin Film IOR"].default_value = FILM_IOR
            lobes.append(g)
        nt.links.new(lobes[0].outputs[0], a1.inputs[0])
        nt.links.new(lobes[1].outputs[0], a1.inputs[1])
        nt.links.new(a1.outputs[0], a2.inputs[0])
        nt.links.new(lobes[2].outputs[0], a2.inputs[1])
        nt.links.new(a2.outputs[0], out.inputs["Surface"])
    else:
        tree = bpy.data.node_groups.new("glass", "luxcore_material_nodes")
        out = tree.nodes.new("LuxCoreNodeMatOutput")
        g = tree.nodes.new("LuxCoreNodeMatGlass")
        g.inputs["IOR"].default_value = IOR
        g.inputs["Dispersion"].default_value = CAUCHY_B
        g.use_thinfilmcoating = True  # the film sockets only exist once this is on
        g.inputs["Film Thickness (nm)"].default_value = FILM_NM
        g.inputs["Film IOR"].default_value = FILM_IOR
        tree.links.new(g.outputs["Material"], out.inputs["Material"])
        mat.luxcore.node_tree = tree
    return mat


def configure(scene, engine, budget, cam):
    r = scene.render
    r.resolution_percentage = 100
    r.film_transparent = True
    r.image_settings.file_format = "PNG"
    r.image_settings.color_mode = "RGBA"
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "None"
    budget = budget or DEFAULT_BUDGET[engine]
    if engine == "cycles":
        r.engine = "CYCLES"
        prefs = bpy.context.preferences.addons["cycles"].preferences
        prefs.compute_device_type = "METAL"
        prefs.get_devices()
        for d in prefs.devices:
            d.use = d.type == "METAL"
        c = scene.cycles
        c.device = "GPU"
        c.samples = budget
        c.seed = 0
        c.use_animated_seed = False
        c.use_denoising = True
        c.max_bounces = 24
        c.transmission_bounces = 24
        c.glossy_bounces = 12
        c.transparent_max_bounces = 16
        c.blur_glossy = 0.6
        c.sample_clamp_indirect = 12
    else:
        r.engine = "LUXCORE"
        cfg = scene.luxcore.config
        cfg.engine = "PATH"
        cfg.device = "OCL"
        cfg.path.depth_total = 24
        cfg.path.depth_specular = 24
        cfg.path.depth_glossy = 8
        cfg.path.depth_diffuse = 2
        # Halt on time: every frame of the loop costs the same, so equal time gives
        # equal noise and the video does not shimmer between frames.
        halt = scene.luxcore.halt
        halt.enable = True
        halt.use_samples = False
        halt.use_noise_thresh = False
        halt.use_time = True
        halt.time = budget
        scene.luxcore.denoiser.enabled = True
        scene.luxcore.denoiser.type = "OIDN"
        cam.data.luxcore.imagepipeline.transparent_film = True


def render_to(scene, path):
    scene.render.filepath = path
    t0 = time.time()
    bpy.ops.render.render(write_still=True)
    print(f"RENDERED {path} {time.time() - t0:.1f}s", flush=True)


def main():
    args = parse()
    scene = bpy.context.scene
    clear_scene()
    env = build_env(ENV_PATH)
    x = build_x(scene)
    x.data.materials.clear()
    x.data.materials.append(build_glass(args.engine))
    cam = build_camera(scene, args.mode, args.res)
    build_world(scene, args.engine, env)
    configure(scene, args.engine, args.budget, cam)

    if args.mode == "loop":
        os.makedirs(args.out, exist_ok=True)
        for f in range(args.start, args.end):
            path = os.path.join(args.out, f"{f:04d}.png")
            if os.path.exists(path):  # resume an interrupted night
                continue
            set_spin(x, f)
            render_to(scene, path)
    elif args.mode == "still":
        set_spin(x, args.frame)
        render_to(scene, args.out)
    else:
        set_spin(x, 20)
        render_to(scene, args.out)


main()
```

`blender/render.sh`:

```bash
#!/usr/bin/env bash
# Render the glass x (Blender 5.0+, BlendLuxCore 2.11+ for luxcore).
#   blender/render.sh loop  <luxcore|cycles> [start] [end] [flags]
#   blender/render.sh still <luxcore|cycles> <frame> [flags]
#   blender/render.sh macro <luxcore|cycles> [flags]
# Flags go straight to x_scene.py: --res, --budget.
set -euo pipefail
cd "$(dirname "$0")/.."

BLENDER="${BLENDER:-/Applications/Blender.app/Contents/MacOS/Blender}"
MODE="${1:?usage: render.sh loop|still|macro <luxcore|cycles> ...}"
ENGINE="${2:?engine: luxcore or cycles}"
shift 2

run() { "$BLENDER" -b -P blender/x_scene.py -- --engine "$ENGINE" "$@"; }

case "$MODE" in
  loop)
    START="${1:-0}"
    END="${2:-180}"
    shift $(( $# < 2 ? $# : 2 ))
    run --mode loop --start "$START" --end "$END" --out "blender/out/loop-$ENGINE" "$@"
    ;;
  still)
    FRAME="${1:?usage: render.sh still <engine> <frame>}"
    shift
    run --mode still --frame "$FRAME" --out "blender/out/still-$ENGINE-$FRAME.png" "$@"
    ;;
  macro)
    run --mode macro --out "blender/out/macro-$ENGINE.png" "$@"
    ;;
  *)
    echo "unknown mode: $MODE" >&2
    exit 2
    ;;
esac
```

```bash
chmod +x blender/render.sh
```

- [ ] **Step 4: Кадр рендерится, шов петли невидим**

```bash
BL=/Applications/Blender.app/Contents/MacOS/Blender
blender/render.sh still cycles 0 --res 400 --budget 64
blender/render.sh still cycles 180 --res 400 --budget 64
$BL -b --python-exit-code 1 -P blender/check_frame.py -- "$PWD/blender/out/still-cycles-0.png"
ffmpeg -hide_banner -i blender/out/still-cycles-0.png -i blender/out/still-cycles-180.png -lavfi psnr -f null - 2>&1 | grep -o "average:[^ ]*"
```

Expected: `CHECK OK` (cover ≈ 0.12); PSNR ≥ 35 (замерено 42.5) — крест при повороте на 90° переходит сам в себя, кадр 180 = кадр 0.

- [ ] **Step 5: Кодирование**

`blender/encode.sh`:

```bash
#!/usr/bin/env bash
# Rendered frames -> the web assets the page uses.
#   blender/encode.sh <loop-frames-dir> <macro.png>
# Frames are RGBA over a transparent film. Everything is laid on pure black
# here; the page blends the video with `lighten`, so codec blacks never show.
set -euo pipefail
cd "$(dirname "$0")/.."

FRAMES="${1:?usage: encode.sh <loop-frames-dir> <macro.png>}"
MACRO="${2:?usage: encode.sh <loop-frames-dir> <macro.png>}"
OUT=public/media/glass
FPS=30
SIZE=$(ffprobe -v error -select_streams v -show_entries stream=width -of csv=p=0 "$FRAMES/0000.png")
MACRO_SIZE=$(ffprobe -v error -select_streams v -show_entries stream=width,height -of csv=s=x:p=0 "$MACRO")
mkdir -p "$OUT"

LOOP_IN=(-framerate "$FPS" -i "$FRAMES/%04d.png" -f lavfi -i "color=c=black:s=${SIZE}x${SIZE}:r=${FPS}")
ON_BLACK="[1][0]overlay=format=auto:shortest=1,format=yuv420p"

ffmpeg -loglevel error -y "${LOOP_IN[@]}" -filter_complex "$ON_BLACK" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -an "$OUT/x-loop.webm"
ffmpeg -loglevel error -y "${LOOP_IN[@]}" -filter_complex "$ON_BLACK" \
  -c:v libx264 -preset slow -crf 23 -profile:v high -movflags +faststart -an "$OUT/x-loop.mp4"

# still <png> <WxH> <name>: a JPEG for every browser and an AVIF for the ones that can.
still() {
  ffmpeg -loglevel error -y -i "$1" -f lavfi -i "color=c=black:s=$2" \
    -filter_complex "[1][0]overlay=format=auto" -frames:v 1 -q:v 3 "$OUT/$3.jpg"
  ffmpeg -loglevel error -y -i "$1" -f lavfi -i "color=c=black:s=$2" \
    -filter_complex "[1][0]overlay=format=auto,format=yuv420p" -frames:v 1 \
    -c:v libsvtav1 -crf 30 "$OUT/$3.avif" 2>/dev/null \
    || { echo "AVIF encode failed: $3" >&2; exit 1; }
}
still "$FRAMES/0000.png" "${SIZE}x${SIZE}" x-poster
still "$MACRO" "$MACRO_SIZE" x-macro

# Favicon: the middle of the poster, where the x sits.
ffmpeg -loglevel error -y -i "$OUT/x-poster.jpg" -vf "crop=iw*0.72:ih*0.72,scale=512:512" app/icon.png

ls -la "$OUT" app/icon.png
```

```bash
chmod +x blender/encode.sh
```

- [ ] **Step 6: Черновая петля в Cycles и её проверка**

Около 10 минут:

```bash
blender/render.sh loop cycles 0 180 --budget 128
blender/render.sh macro cycles --budget 512
blender/encode.sh blender/out/loop-cycles blender/out/macro-cycles.png
for f in public/media/glass/x-loop.webm public/media/glass/x-loop.mp4; do
  s=$(stat -f%z "$f"); echo "$f $s bytes"; [ "$s" -le 3145728 ] || { echo "TOO BIG: $f"; exit 1; }
done
s=$(stat -f%z public/media/glass/x-poster.jpg); echo "poster $s bytes"; [ "$s" -le 122880 ] || { echo "POSTER TOO BIG"; exit 1; }
ffprobe -v error -count_frames -select_streams v -show_entries stream=width,height,nb_read_frames,r_frame_rate -of csv=p=0 public/media/glass/x-loop.mp4
ffprobe -v error -count_frames -select_streams v -show_entries stream=width,height,nb_read_frames -of csv=p=0 public/media/glass/x-loop.webm
```

Expected: оба видео ≤ 3 МБ, постер ≤ 120 КБ; `1080,1080,30/1,180` для mp4 и `1080,1080,180` для webm; `x-poster.*`, `x-macro.*` и `app/icon.png` на месте. Открыть `public/media/glass/x-poster.jpg` и `x-macro.jpg` (Read) и убедиться, что «x» целиком в кадре и не обрезан.

- [ ] **Step 7: Commit**

```bash
git add blender public/media/glass app/icon.png .gitignore
git commit -m "feat: render the glass x in blender"
```

---

### Task 4: Шапка, меню и часы Якутска

**Files:**
- Create: `lib/useYakutskTime.ts`, `lib/useYakutskTime.test.tsx`, `components/site/icons.tsx`, `components/site/MenuOverlay.tsx`, `components/site/MenuOverlay.test.tsx`, `components/site/Header.tsx`, `components/site/Header.test.tsx`

**Interfaces:**
- Consumes: `useLang`, `renderWithLang`, `identity`, `sections`, `ui`.
- Produces:
  - `formatYakutsk(date: Date): string` — `"hh:mm"` по `Asia/Yakutsk`;
  - `useYakutskTime(intervalMs = 15000): string | null` — `null` до монтирования;
  - `MailIcon({ className? })`, `ArrowIcon({ className?, size? = 15 })`;
  - `MenuOverlay({ open: boolean; onClose: () => void })`;
  - `Header()` — внутри hero, `z-20`.

- [ ] **Step 1: Падающие тесты**

`lib/useYakutskTime.test.tsx`:

```tsx
import { act, renderHook } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, test, vi } from "vitest";
import { formatYakutsk, useYakutskTime } from "@/lib/useYakutskTime";

function Clock() {
  return <span>{useYakutskTime() ?? "--:--"}</span>;
}

describe("Yakutsk time", () => {
  test("is Yakutsk time whatever the visitor's zone", () => {
    expect(formatYakutsk(new Date("2026-09-25T03:04:00Z"))).toBe("12:04");
    // Already the next morning in Yakutsk while it is evening in UTC.
    expect(formatYakutsk(new Date("2026-09-25T20:30:00Z"))).toBe("05:30");
  });

  test("renders nothing on the server, so hydration has nothing to disagree with", () => {
    expect(renderToString(<Clock />)).toContain("--:--");
  });

  test("ticks every 15 seconds once mounted", () => {
    vi.useFakeTimers({ toFake: ["Date", "setInterval", "clearInterval"] });
    vi.setSystemTime(new Date("2026-09-25T03:04:00Z"));
    const { result } = renderHook(() => useYakutskTime());
    expect(result.current).toBe("12:04");
    act(() => {
      vi.setSystemTime(new Date("2026-09-25T03:05:00Z"));
      vi.advanceTimersByTime(15_000);
    });
    expect(result.current).toBe("12:05");
  });
});
```

`components/site/MenuOverlay.test.tsx`:

```tsx
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
```

`components/site/Header.test.tsx`:

```tsx
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
    expect(html).toContain("YKS --:--");
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
```

- [ ] **Step 2: Убедиться, что тесты падают**

Run: `npx vitest run lib/useYakutskTime.test.tsx components/site/MenuOverlay.test.tsx components/site/Header.test.tsx`
Expected: FAIL — модули `@/lib/useYakutskTime`, `@/components/site/MenuOverlay`, `@/components/site/Header` не найдены.

- [ ] **Step 3: Реализация**

`lib/useYakutskTime.ts`:

```ts
import { useEffect, useState } from "react";

const clock = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "Asia/Yakutsk",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function formatYakutsk(date: Date): string {
  return clock.format(date);
}

/** Yakutsk "hh:mm", or null until mounted — the server cannot know the time. */
export function useYakutskTime(intervalMs = 15_000): string | null {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatYakutsk(new Date()));
    tick();
    const id = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return time;
}
```

`components/site/icons.tsx`:

```tsx
type IconProps = { className?: string };

export function MailIcon({ className = "" }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function ArrowIcon({ className = "", size = 15 }: IconProps & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
```

`components/site/MenuOverlay.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { identity, sections, ui, type Lang } from "@/content/site";
import { useLang } from "@/lib/i18n";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const LANGS: { id: Lang; label: string }[] = [
  { id: "ru", label: "RU" },
  { id: "en", label: "EN" },
];

/** Full-screen index: sections, the language switch and the contacts. */
export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const { t, lang, setLang } = useLang();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a,button")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      // Keep Tab inside the dialog.
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>("a,button"));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label={t(ui.menu)}
      className="fixed inset-0 z-50 flex flex-col bg-ink px-4 pb-8 pt-4 text-fg md:px-6"
    >
      <div className="flex h-10 items-center justify-between">
        <button type="button" onClick={onClose} className="h-[30px] rounded-full bg-chip px-4 text-[14px] transition-colors hover:bg-white/20">
          {t(ui.close)}
        </button>
        <div role="group" aria-label={t(ui.language)} className="flex rounded-full bg-chip p-1 text-[13px]">
          {LANGS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={lang === item.id}
              onClick={() => setLang(item.id)}
              className={`h-6 rounded-full px-3 transition-colors ${lang === item.id ? "bg-fg text-ink" : "text-muted hover:text-fg"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <nav aria-label={t(ui.sections)} className="mt-auto flex flex-col">
        {sections.map((section, i) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={onClose}
            className="flex items-baseline gap-6 border-t border-line py-4 font-display text-[clamp(44px,8vw,96px)] font-light leading-none tracking-[-0.03em] transition-opacity hover:opacity-70"
          >
            <span className="font-sans text-[14px] text-muted">{String(i + 1).padStart(2, "0")}</span>
            {t(section.label)}
          </a>
        ))}
      </nav>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-muted">
        <a href={`mailto:${identity.email}`} className="hover:text-fg">
          {identity.email}
        </a>
        <a href={identity.telegram.href} className="hover:text-fg">
          {identity.telegram.label}
        </a>
        <a href={identity.github.href} className="hover:text-fg">
          {identity.github.label}
        </a>
      </div>
    </div>
  );
}
```

`components/site/Header.tsx`:

```tsx
"use client";

import { useCallback, useRef, useState } from "react";
import { identity, ui } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { useYakutskTime } from "@/lib/useYakutskTime";
import { MailIcon } from "./icons";
import { MenuOverlay } from "./MenuOverlay";

export function Header() {
  const { t } = useLang();
  const time = useYakutskTime();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    // Back to the button without scrolling: a section link may be mid-jump.
    trigger.current?.focus({ preventScroll: true });
  }, []);

  return (
    <header className="relative z-20 flex h-[60px] items-center justify-between px-4 md:h-[72px] md:px-6">
      <button
        ref={trigger}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="h-[30px] rounded-full bg-chip px-4 text-[14px] transition-colors hover:bg-white/20"
      >
        {t(ui.menu)}
      </button>
      <a href="#top" className="absolute left-1/2 -translate-x-1/2 text-[25px] font-medium tracking-[-0.045em]">
        {identity.wordmark}
      </a>
      <div className="flex items-center gap-3.5 text-[14px]">
        <span className="tabular-nums">YKS {time ?? "--:--"}</span>
        <a
          href={`mailto:${identity.email}`}
          aria-label={t(ui.writeEmail)}
          className="flex size-[34px] items-center justify-center rounded-full bg-chip transition-colors hover:bg-white/20"
        >
          <MailIcon />
        </a>
      </div>
      <MenuOverlay open={open} onClose={close} />
    </header>
  );
}
```

- [ ] **Step 4: Тесты зелёные**

Run: `npm test && npm run lint`
Expected: все тесты проходят (новые: 3 + 6 + 4), `tsc` чистый.

- [ ] **Step 5: Commit**

```bash
git add lib/useYakutskTime.ts lib/useYakutskTime.test.tsx components/site/icons.tsx components/site/MenuOverlay.tsx components/site/MenuOverlay.test.tsx components/site/Header.tsx components/site/Header.test.tsx
git commit -m "feat: add the header, menu and yakutsk clock"
```

---

### Task 5: GlassLoop — видео-петля стеклянного «x»

**Files:**
- Create: `components/site/GlassLoop.tsx`, `components/site/GlassLoop.test.tsx`

**Interfaces:**
- Consumes: `glass` из `content/site.ts`; помощники `mockReducedMotion`, `mockSaveData`, `mockRects`, `rectAt` из `test/media.ts`.
- Produces: `prefersStill(): boolean`; `GlassLoop({ lazy?: boolean; className?: string })`. `className` задаёт размер (родитель — квадратный бокс).

- [ ] **Step 1: Падающий тест**

`components/site/GlassLoop.test.tsx`:

```tsx
import { act, render } from "@testing-library/react";
import { describe, expect, test, type Mock } from "vitest";
import { GlassLoop } from "@/components/site/GlassLoop";
import { glass } from "@/content/site";
import { mockReducedMotion, mockRects, mockSaveData, rectAt } from "@/test/media";

/** The `play` stub installed by test/setup.ts. */
const play = () => HTMLMediaElement.prototype.play as unknown as Mock;

describe("GlassLoop", () => {
  test("plays a muted, looping, decorative video with both sources", () => {
    const { container } = render(<GlassLoop />);
    const video = container.querySelector("video")!;
    expect(video).toHaveAttribute("aria-hidden", "true");
    expect(video.muted).toBe(true);
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("poster", glass.poster.jpg);
    expect(Array.from(video.querySelectorAll("source")).map((s) => s.getAttribute("type"))).toEqual([
      "video/webm",
      "video/mp4",
    ]);
    expect(play()).toHaveBeenCalled();
  });

  test("shows the still frame when the visitor asks for less motion", () => {
    mockReducedMotion(true);
    const { container } = render(<GlassLoop />);
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("img")).toHaveAttribute("src", glass.poster.jpg);
    expect(container.querySelector("source")).toHaveAttribute("srcset", glass.poster.avif);
  });

  test("shows the still frame on a data-saver connection", () => {
    mockSaveData(true);
    const { container } = render(<GlassLoop />);
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("img")).not.toBeNull();
  });

  test("keeps the poster when autoplay is refused", async () => {
    Object.defineProperty(HTMLMediaElement.prototype, "play", {
      configurable: true,
      writable: true,
      value: () => Promise.reject(new DOMException("autoplay refused", "NotAllowedError")),
    });
    const { container } = render(<GlassLoop />);
    await act(async () => {
      await Promise.resolve();
    });
    expect(container.querySelector("video")).toHaveAttribute("poster", glass.poster.jpg);
  });

  test("a lazy copy downloads nothing until it is near the viewport", async () => {
    const rects = mockRects(5000);
    const { container } = render(<GlassLoop lazy />);
    const video = container.querySelector("video")!;
    expect(video).toHaveAttribute("preload", "none");
    expect(video).not.toHaveAttribute("autoplay");
    expect(play()).not.toHaveBeenCalled();

    rects.mockImplementation(() => rectAt(900));
    await act(async () => {
      window.dispatchEvent(new Event("scroll"));
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
    });
    expect(play()).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run components/site/GlassLoop.test.tsx`
Expected: FAIL — `@/components/site/GlassLoop` не найден.

- [ ] **Step 3: Реализация**

`components/site/GlassLoop.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { glass } from "@/content/site";

/** Reduced motion or a data-saver connection get the still frame. */
export function prefersStill(): boolean {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return reduce || connection?.saveData === true;
}

type GlassLoopProps = {
  /** The footer copy: download nothing until it is about a screen away. */
  lazy?: boolean;
  className?: string;
};

/**
 * The glass x, rendered in Blender over pure black and blended with
 * `lighten`: whatever not-quite-black the codec produces loses to the
 * page background, so the video never shows its rectangle.
 */
export function GlassLoop({ lazy = false, className = "" }: GlassLoopProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);
  const [armed, setArmed] = useState(!lazy);

  useEffect(() => {
    setStill(prefersStill());
  }, []);

  // Lazy copies arm themselves by geometry, like Reveal: an observer can stay
  // silent in a background tab, a rect check cannot.
  useEffect(() => {
    if (armed || still) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 2 && rect.bottom > -window.innerHeight) setArmed(true);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    check();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [armed, still]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed || still) return;
    el.muted = true; // autoplay policies read the property; React may not reflect it
    const attempt = el.play();
    // Autoplay can be refused (Low Power Mode, site policies) — the poster stays up.
    if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
  }, [armed, still]);

  if (still) {
    return (
      <picture aria-hidden="true" className={`block ${className}`}>
        <source srcSet={glass.poster.avif} type="image/avif" />
        <img src={glass.poster.jpg} alt="" className="h-full w-full object-contain mix-blend-lighten" />
      </picture>
    );
  }

  return (
    <video
      ref={ref}
      aria-hidden="true"
      tabIndex={-1}
      className={`object-contain mix-blend-lighten ${className}`}
      poster={glass.poster.jpg}
      muted
      loop
      playsInline
      autoPlay={!lazy}
      preload={lazy ? "none" : "auto"}
      disablePictureInPicture
    >
      <source src={glass.loop.webm} type="video/webm" />
      <source src={glass.loop.mp4} type="video/mp4" />
    </video>
  );
}
```

- [ ] **Step 4: Тесты зелёные**

Run: `npx vitest run components/site/GlassLoop.test.tsx && npm run lint`
Expected: 5 passed; `tsc` чистый.

- [ ] **Step 5: Commit**

```bash
git add components/site/GlassLoop.tsx components/site/GlassLoop.test.tsx
git commit -m "feat: add the glass loop"
```

---

### Task 6: Hero со скрэмблом слова

**Files:**
- Create: `components/site/ScrambleWord.tsx`, `components/site/ScrambleWord.test.tsx`, `components/site/Hero.tsx`, `components/site/Hero.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Header` (Task 4), `GlassLoop` (Task 5), `hero`, `ui`, `works`.
- Produces: `SCRAMBLE_STEPS = 16`; `scrambleFrame(target: string, step: number, rand?: () => number): string`; `ScrambleWord({ words: string[]; interval?: number; tick?: number })`; `Hero()` — `<section id="top">` с шапкой внутри.

- [ ] **Step 1: Падающие тесты**

`components/site/ScrambleWord.test.tsx`:

```tsx
import { act, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, test, vi } from "vitest";
import { SCRAMBLE_STEPS, ScrambleWord, scrambleFrame } from "@/components/site/ScrambleWord";
import { mockReducedMotion } from "@/test/media";

const zero = () => 0;

describe("scrambleFrame", () => {
  test("reveals the word left to right", () => {
    expect(scrambleFrame("открывают", 0, zero)).toBe("ааааааааа");
    expect(scrambleFrame("открывают", 8, zero)).toBe("открааааа");
    expect(scrambleFrame("открывают", SCRAMBLE_STEPS, zero)).toBe("открывают");
  });

  test("scrambles English with Latin glyphs and keeps spaces", () => {
    expect(scrambleFrame("buy from", 0, zero)).toBe("aaa aaaa");
  });
});

describe("ScrambleWord", () => {
  test("server-renders the first word", () => {
    expect(renderToString(<ScrambleWord words={["открывают", "листают"]} />)).toContain("открывают");
  });

  test("decodes the next word after the interval", () => {
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
    render(<ScrambleWord words={["открывают", "листают"]} />);
    expect(screen.getByText("открывают")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2800 + 42 * SCRAMBLE_STEPS + 10);
    });
    expect(screen.getByText("листают")).toBeInTheDocument();
  });

  test("holds still under reduced motion", () => {
    mockReducedMotion(true);
    vi.useFakeTimers({ toFake: ["setInterval", "clearInterval"] });
    render(<ScrambleWord words={["открывают", "листают"]} />);
    act(() => {
      vi.advanceTimersByTime(10_000);
    });
    expect(screen.getByText("открывают")).toBeInTheDocument();
  });
});
```

`components/site/Hero.test.tsx`:

```tsx
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

  test("carries the glass loop and the header", () => {
    const { container } = renderWithLang(<Hero />);
    expect(container.querySelector("section#top video")).not.toBeNull();
    expect(screen.getByRole("button", { name: "Меню" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Убедиться, что тесты падают**

Run: `npx vitest run components/site/ScrambleWord.test.tsx components/site/Hero.test.tsx`
Expected: FAIL — модули не найдены.

- [ ] **Step 3: Реализация**

`components/site/ScrambleWord.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";

export const SCRAMBLE_STEPS = 16;
const CYRILLIC = "абвгдежзиклмнопрстуфхцчшщэюя#%&*+=/<>";
const LATIN = "abcdefghijklmnopqrstuvwxyz#%&*+=/<>";

/** One frame of the scramble: the first letters are real, the rest noise. */
export function scrambleFrame(target: string, step: number, rand: () => number = Math.random): string {
  const pool = /[а-яё]/i.test(target) ? CYRILLIC : LATIN;
  const revealed = Math.floor(target.length * (step / SCRAMBLE_STEPS));
  let out = "";
  for (let k = 0; k < target.length; k++) {
    const char = target[k];
    out += k < revealed || char === " " ? char : pool[Math.floor(rand() * pool.length)];
  }
  return out;
}

type ScrambleWordProps = {
  words: string[];
  interval?: number;
  tick?: number;
};

/** Cycles through `words`, decoding each new one out of glyph noise. */
export function ScrambleWord({ words, interval = 2800, tick = 42 }: ScrambleWordProps) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    setText(words[0]);
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0;
    let decode = 0;
    const cycle = window.setInterval(() => {
      index = (index + 1) % words.length;
      const target = words[index];
      let step = 0;
      window.clearInterval(decode);
      decode = window.setInterval(() => {
        step += 1;
        if (step >= SCRAMBLE_STEPS) {
          window.clearInterval(decode);
          setText(target);
          return;
        }
        setText(scrambleFrame(target, step));
      }, tick);
    }, interval);
    return () => {
      window.clearInterval(cycle);
      window.clearInterval(decode);
    };
  }, [words, interval, tick]);

  return <span className="whitespace-nowrap">{text}</span>;
}
```

`components/site/Hero.tsx`:

```tsx
"use client";

import { hero, ui, works } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { GlassLoop } from "./GlassLoop";
import { Header } from "./Header";
import { ScrambleWord } from "./ScrambleWord";

/** Letters rise one after another; each one is its own inline-block. */
function Rise({ text, start, step = 0.035 }: { text: string; start: number; step?: number }) {
  return (
    <>
      {Array.from(text).map((char, i) => (
        <span key={i} className="xr-ch" style={{ animationDelay: `${(start + i * step).toFixed(3)}s` }}>
          {char === " " ? " " : char}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const { t, lang } = useLang();
  const words = hero.words[lang];
  const one = t(hero.lineOne);
  const two = t(hero.lineTwo);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[max(780px,100svh)] flex-col overflow-hidden bg-ink text-fg md:min-h-[max(760px,100svh)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[110px] aspect-square w-[104vw] -translate-x-1/2 md:left-auto md:right-[-4%] md:top-[6%] md:w-[min(88svh,62vw)] md:translate-x-0"
      >
        <GlassLoop className="h-full w-full" />
      </div>
      <div aria-hidden="true" className="xr-grain pointer-events-none absolute -inset-10 opacity-[0.16] mix-blend-overlay" />

      <Header />

      <p
        className="xr-ch relative ml-auto mt-3 w-[220px] px-4 text-[14px] leading-[1.4] md:absolute md:left-[62.6%] md:top-[200px] md:m-0 md:w-[236px] md:px-0 md:text-[16px]"
        style={{ animationDelay: "1.1s" }}
      >
        {t(hero.intro)}
      </p>

      <h1 className="relative mt-auto px-4 font-display text-[60px] font-light leading-[56px] tracking-[-0.035em] md:absolute md:left-[29.9%] md:top-[52%] md:mt-0 md:px-0 md:text-[clamp(72px,8.9vw,128px)] md:leading-[0.97]">
        <span className="sr-only">{`${one} ${two} ${words[0]}`}</span>
        <span aria-hidden="true" className="block whitespace-nowrap">
          <Rise text={one} start={0.35} />
        </span>
        <span aria-hidden="true" className="block whitespace-nowrap">
          <Rise text={`${two} `} start={0.35 + one.length * 0.035} />
          <span className="xr-ch italic" style={{ animationDelay: "0.9s" }}>
            <ScrambleWord words={words} />
          </span>
        </span>
      </h1>

      <nav
        aria-label={t(ui.projects)}
        className="relative mt-6 flex flex-wrap gap-2 px-4 pb-8 md:absolute md:left-6 md:top-[240px] md:mt-0 md:flex-col md:items-start md:px-0 md:pb-0"
      >
        {works.map((work, i) => (
          <a
            key={work.id}
            href={`#${work.id}`}
            className="xr-ch inline-flex h-[30px] items-center whitespace-nowrap rounded-full bg-chip px-3.5 text-[14px] backdrop-blur-[10px] transition-colors hover:bg-white/20"
            style={{ animationDelay: `${(0.9 + i * 0.07).toFixed(2)}s` }}
          >
            {work.title}
          </a>
        ))}
      </nav>

      <div className="absolute inset-x-6 bottom-[26px] hidden items-end justify-between text-[14px] text-muted md:flex">
        <span>{hero.disciplines}</span>
        <a href="#work" className="flex flex-col items-center gap-2.5 text-fg">
          <span>{t(hero.scroll)}</span>
          <span className="relative block h-12 w-px overflow-hidden bg-white/20">
            <span className="xr-drop absolute inset-0 block bg-fg" />
          </span>
        </a>
        <span className="flex items-center gap-2.5">
          <span className="xpulse size-1.5 rounded-full bg-fg" />
          {t(hero.status)}
        </span>
      </div>
    </section>
  );
}
```

`app/page.tsx` целиком:

```tsx
import { Hero } from "@/components/site/Hero";

export default function Page() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Тесты зелёные**

Run: `npm test && npm run lint`
Expected: новые 5 + 5 проходят, остальные тоже.

- [ ] **Step 5: Проверка в браузере**

Запустить превью: `preview_start` с `{ name: "xrtem-dev" }` (конфиг `.claude/launch.json`, порт 3000). Во встроенном браузере:
1. `resize_window` 1440×900 → `computer` screenshot. Сверить с макетом: «Меню» слева, `xrtem` по центру, `YKS hh:mm` справа, пилюли слева на уровне ~240 px, абзац справа сверху, заголовок в нижней половине, «x» справа за заголовком и целиком в кадре. Нижняя строка видна.
2. `resize_window` 390×844 → screenshot. Абзац и заголовок не пересекаются друг с другом, «x» целиком виден, пилюли под заголовком.
3. `javascript_tool`: `document.documentElement.scrollWidth <= window.innerWidth` → `true` на обоих размерах.
4. `read_console_messages` с `onlyErrors: true` → пусто (в том числе нет hydration-предупреждений).

Если пересечения есть — поправить `top-[…]`, `w-[…]` бокса видео или `md:top-[52%]` у H1 в `Hero.tsx`, повторить шаги 1–4. Вернуть `resize_window` в `desktop`.

- [ ] **Step 6: Commit**

```bash
git add components/site/ScrambleWord.tsx components/site/ScrambleWord.test.tsx components/site/Hero.tsx components/site/Hero.test.tsx app/page.tsx
git commit -m "feat: build the hero"
```

---

### Task 7: Look-dev LuxCore и запуск финального рендера (чекпоинт с Артёмом)

**Files:**
- Modify (только если свет правится): `blender/x_scene.py` (константы `STUDIO`, `CAUCHY_B`, `TILT_DEG`, `data.lens`)
- Временно (не коммитится): `public/media/glass/x-poster.jpg`

Этот таск выполняет основная сессия, а не субагент: в Step 3 нужен ответ Артёма.

**Interfaces:**
- Consumes: `blender/render.sh`, работающий dev-сервер (Task 6), Chrome.
- Produces: одобренные Артёмом константы сцены; фоновый процесс финального рендера → `blender/out/loop-luxcore/0000–0179.png` и `blender/out/macro-luxcore.png`.

- [ ] **Step 1: Пробные кадры LuxCore**

По ~95 с на кадр:

```bash
blender/render.sh still luxcore 0
blender/render.sh still luxcore 30
blender/render.sh still luxcore 60
for f in 0 30 60; do
  /Applications/Blender.app/Contents/MacOS/Blender -b --python-exit-code 1 -P blender/check_frame.py -- "$PWD/blender/out/still-luxcore-$f.png"
done
```

Expected: три `CHECK OK`.

- [ ] **Step 2: Кадр в композиции hero**

Dev-сервер из Task 6 запущен (`preview_start { name: "xrtem-dev" }`). Постер временно подменяется кадром LuxCore; Chrome с `--force-prefers-reduced-motion` показывает постер вместо видео, а буквы заголовка сразу на месте:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT=blender/out/lookdev && mkdir -p "$OUT"
curl -s -o /dev/null http://localhost:3000/   # let the dev server compile the page first
for f in 0 30 60; do
  ffmpeg -loglevel error -y -i blender/out/still-luxcore-$f.png -f lavfi -i color=c=black:s=1080x1080 \
    -filter_complex "[1][0]overlay=format=auto" -frames:v 1 -q:v 3 public/media/glass/x-poster.jpg
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-prefers-reduced-motion \
    --window-size=1440,900 --virtual-time-budget=6000 --screenshot="$PWD/$OUT/hero-$f-desktop.png" http://localhost:3000/
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-prefers-reduced-motion \
    --window-size=390,844 --virtual-time-budget=6000 --screenshot="$PWD/$OUT/hero-$f-mobile.png" http://localhost:3000/
done
git checkout -- public/media/glass/x-poster.jpg
```

Открыть скриншоты (Read) и проверить, что «x» читается и текст не тонет в бликах.

- [ ] **Step 3: Показать Артёму и получить «ок»**

Отправить `blender/out/lookdev/hero-0-desktop.png`, `hero-30-desktop.png`, `hero-0-mobile.png` через SendUserFile. Спросить через AskUserQuestion: «Свет и цвет стекла ок для финального рендера?» с вариантами «Ок, запускай» / «Сочнее цвет» / «Крупнее x» / «Другое».
- «Сочнее цвет» → в `STUDIO` поднять `violet`, `cyan`, `pink` на 30–50 % и/или `CAUCHY_B` до 0.035; повторить Steps 1–3.
- «Крупнее x» → в `build_camera` для не-macro поднять `data.lens` с 70 до 80; повторить Steps 1–3.
- Ждать явного «ок». Без него финальный рендер не запускать.

- [ ] **Step 4: Зафиксировать настройки (если менялись)**

```bash
git diff --quiet blender/x_scene.py || { git add blender/x_scene.py && git commit -m "chore: tune the studio for the final render"; }
```

- [ ] **Step 5: Запустить финальный рендер в фоне**

Около 4,8 ч на петлю плюс ~10 мин на крупный план. `caffeinate` не даёт Mac уснуть. Уже готовые кадры скрипт пропускает, так что прерванный рендер можно просто перезапустить той же командой. Запускать через Bash с `run_in_background: true`:

```bash
caffeinate -i sh -c 'blender/render.sh loop luxcore 0 180 && blender/render.sh macro luxcore --budget 600' > blender/out/final-render.log 2>&1
```

Не дожидаясь, перейти к Task 8. Прогресс: `ls blender/out/loop-luxcore | wc -l` (цель — 180).

---

### Task 8: Бегущие строки

**Files:**
- Create: `components/site/Marquee.tsx`, `components/site/Marquee.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `marquee`, `useLang`.
- Produces: `Marquee()` — `<section>` с `aria-label` из списка услуг.

- [ ] **Step 1: Падающий тест**

`components/site/Marquee.test.tsx`:

```tsx
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
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run components/site/Marquee.test.tsx`
Expected: FAIL — модуль не найден.

- [ ] **Step 3: Реализация**

`components/site/Marquee.tsx`:

```tsx
"use client";

import { marquee } from "@/content/site";
import { useLang } from "@/lib/i18n";

function Row({ words }: { words: string[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {words.map((word) => (
        <span key={word} className="flex items-center whitespace-nowrap pl-8 md:pl-12">
          {word}
          <span className="pl-8 text-[0.45em] md:pl-12">✦</span>
        </span>
      ))}
    </div>
  );
}

/** Two bands crossing at ±3°; each holds the list twice, so -50% loops cleanly. */
export function Marquee() {
  const { t } = useLang();
  const words = marquee.map((item) => t(item));

  return (
    <section aria-label={words.join(", ")} className="relative h-[170px] overflow-hidden bg-ink text-fg md:h-[330px]">
      <div
        aria-hidden="true"
        className="absolute left-[-3%] top-[110px] hidden h-[100px] w-[106%] rotate-3 items-center overflow-hidden border-y border-white/25 md:flex"
      >
        <div className="xr-mr xr-stroke flex w-max font-display text-[64px] font-light">
          <Row words={words} />
          <Row words={words} />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute left-[-3%] top-[48px] flex h-[72px] w-[106%] -rotate-3 items-center overflow-hidden bg-glow md:top-[120px] md:h-[100px]"
      >
        <div className="xr-ml flex w-max font-display text-[40px] font-light md:text-[64px]">
          <Row words={words} />
          <Row words={words} />
        </div>
      </div>
    </section>
  );
}
```

`app/page.tsx` целиком:

```tsx
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";

export default function Page() {
  return (
    <main>
      <Hero />
      <Marquee />
    </main>
  );
}
```

- [ ] **Step 4: Тесты и узкий экран**

Run: `npm test && npm run lint` → всё зелёное.

Во встроенном браузере (dev-сервер запущен): `resize_window` 320×700, `navigate` на `http://localhost:3000/`, `javascript_tool`: `document.documentElement.scrollWidth <= window.innerWidth` → `true`. Затем screenshot: полоса с фоном `glow` видна, текст не вылезает за секцию. Вернуть `resize_window` в `desktop`.

- [ ] **Step 5: Commit**

```bash
git add components/site/Marquee.tsx components/site/Marquee.test.tsx app/page.tsx
git commit -m "feat: add the crossing marquee"
```

---

### Task 9: Работы — три кейса

**Files:**
- Create: `components/site/ControlTowerPanel.tsx`, `components/site/CaseCard.tsx`, `components/site/Work.tsx`, `components/site/Work.test.tsx`
- Modify: `public/media/saqa/storefront.jpg` (новый скриншот), `app/page.tsx`

**Interfaces:**
- Consumes: `works`, `controlTower`, `ui`, `Reveal`, `ArrowIcon`.
- Produces: `ControlTowerPanel({ bare?: boolean })` — `bare` рисует только свечение и линию, без текста (для пилюли в «О себе», Task 10); `CaseCard({ work: Work })`; `Work()` — `<section id="work">`.

- [ ] **Step 1: Свежий скриншот SAQAOMUK**

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP=$(mktemp -d)
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1600,1000 --virtual-time-budget=20000 --screenshot="$TMP/saqa.png" https://saqaomuk.com
sips -s format jpeg -s formatOptions 82 "$TMP/saqa.png" --out public/media/saqa/storefront.jpg
sips -g pixelWidth -g pixelHeight public/media/saqa/storefront.jpg
```

Expected: 1600×1000. Открыть файл (Read): должен быть hero с коллекцией SAQAOMUK × MU:S, а не прелоадер «Загружаем актуальную версию сайта». Если прелоадер — повторить с `--virtual-time-budget=40000`; если снова он — заменить флаг на `--timeout=20000`.

- [ ] **Step 2: Падающий тест**

`components/site/Work.test.tsx`:

```tsx
import { screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Work } from "@/components/site/Work";
import { renderWithLang } from "@/test/render";

describe("Work", () => {
  test("shows exactly the three cases, anchored for the hero pills", () => {
    const { container } = renderWithLang(<Work />);
    const ids = Array.from(container.querySelectorAll("article")).map((a) => a.id);
    expect(ids).toEqual(["chaseje", "saqaomuk", "control-tower"]);
    expect(screen.getByRole("heading", { level: 3, name: "Chase.je" })).toBeInTheDocument();
  });

  test("live cases open their sites in a new tab", () => {
    renderWithLang(<Work />);
    const chase = screen.getByRole("link", { name: "Chase.je — chaseje.com" });
    expect(chase).toHaveAttribute("href", "https://chaseje.com");
    expect(chase).toHaveAttribute("target", "_blank");
    expect(chase).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "Открыть chaseje.com" })).toHaveAttribute("href", "https://chaseje.com");
    expect(screen.getByRole("link", { name: "SAQAOMUK — saqaomuk.com" })).toHaveAttribute("href", "https://saqaomuk.com");
    expect(screen.getByAltText("Витрина SAQAOMUK")).toBeInTheDocument();
  });

  test("Control Tower has no link, only the private-access badge", () => {
    const { container } = renderWithLang(<Work />);
    const tower = container.querySelector("article#control-tower") as HTMLElement;
    expect(within(tower).queryByRole("link")).toBeNull();
    expect(within(tower).getByText("Закрытый доступ")).toBeInTheDocument();
    expect(within(tower).getByRole("img", { name: "Control Tower: превью дашборда" })).toBeInTheDocument();
    expect(container.innerHTML).not.toMatch(/profcosmetic/i);
  });
});
```

- [ ] **Step 3: Убедиться, что тест падает**

Run: `npx vitest run components/site/Work.test.tsx`
Expected: FAIL — модуль не найден.

- [ ] **Step 4: Реализация**

`components/site/ControlTowerPanel.tsx`:

```tsx
"use client";

import { controlTower } from "@/content/site";
import { useLang } from "@/lib/i18n";

/**
 * The dashboard sits behind Basic Auth, so the card shows its shape: drifting
 * glow, the revenue line and three status tiles. `bare` keeps only the glow
 * and the line — the version small enough to sit inside a line of text.
 */
export function ControlTowerPanel({ bare = false }: { bare?: boolean }) {
  const { t } = useLang();

  return (
    <div
      role={bare ? undefined : "img"}
      aria-label={bare ? undefined : t(controlTower.label)}
      className="relative h-full w-full overflow-hidden bg-panel text-fg"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <div className="xa1 absolute left-[33%] top-[4%] h-[43%] w-[27%] rounded-full bg-glow opacity-55 blur-[66px]" />
        <div className="xa2 absolute left-[7%] top-[41%] h-[32%] w-[24%] rounded-full bg-[#9a97a8] opacity-35 blur-[60px]" />
        <div className="xa3 absolute left-[18%] top-[15%] h-[39%] w-[18%] rounded-full bg-[#2a1f7a] opacity-60 blur-[72px]" />
        <div className="xr-noise absolute inset-0 opacity-[0.18] mix-blend-overlay" />
      </div>
      <div aria-hidden="true" className="absolute inset-6 flex flex-col gap-3.5 md:inset-9">
        {!bare && (
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-soft md:text-[12px]">
            <span>{t(controlTower.revenue)}</span>
            <span className="xpulse">● {controlTower.sync}</span>
          </div>
        )}
        <svg viewBox="0 0 520 190" preserveAspectRatio="none" fill="none" className="h-[38%] w-full">
          <path
            d="M0 150 C60 140 80 90 130 100 S210 150 260 110 S350 40 400 60 S480 30 520 20"
            stroke="#ffffff"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 150 C60 140 80 90 130 100 S210 150 260 110 S350 40 400 60 S480 30 520 20 V190 H0Z"
            fill="#ffffff"
            fillOpacity="0.07"
          />
        </svg>
        {!bare && (
          <div className="mt-auto grid grid-cols-3 gap-2.5">
            {controlTower.tiles.map((tile) => (
              <div key={tile.label.en} className="rounded-[14px] border border-line bg-white/[0.04] p-3 md:p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted md:text-[11px]">{t(tile.label)}</div>
                <div className="mt-1.5 font-display text-[clamp(20px,2.6vw,36px)] font-light leading-none">{t(tile.value)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

`components/site/CaseCard.tsx`:

```tsx
"use client";

import { ui, type Work } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { ControlTowerPanel } from "./ControlTowerPanel";
import { ArrowIcon } from "./icons";

const frame = "xr-card block aspect-[4/5] overflow-hidden rounded-[24px] bg-panel md:aspect-[16/10]";

export function CaseCard({ work }: { work: Work }) {
  const { t } = useLang();

  const media =
    work.media.kind === "image" ? (
      <img
        src={work.media.src}
        alt={t(work.media.alt)}
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    ) : (
      <ControlTowerPanel />
    );

  return (
    <article id={work.id} className="scroll-mt-6">
      {work.link ? (
        <a
          href={work.link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${work.title} — ${work.link.label}`}
          className={frame}
        >
          {media}
        </a>
      ) : (
        <div className={frame}>{media}</div>
      )}

      <div className="flex flex-col gap-3 px-1 pt-5 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="flex items-baseline gap-4">
          <span className="text-[14px] text-muted">{work.index}</span>
          <h3 className="font-display text-[clamp(32px,3.4vw,48px)] font-light leading-none tracking-[-0.02em]">{work.title}</h3>
        </div>
        <div className="flex items-center gap-[18px] text-[14px] text-muted">
          <span>{t(work.kind)}</span>
          <span>{work.year}</span>
          {work.link ? (
            <a
              href={work.link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t(ui.open)} ${work.link.label}`}
              className="flex size-9 items-center justify-center rounded-full bg-chip text-fg transition-colors hover:bg-white/20"
            >
              <ArrowIcon />
            </a>
          ) : (
            <span className="rounded-full border border-line px-3 py-1.5 text-soft">{t(ui.privateAccess)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
```

`components/site/Work.tsx`:

```tsx
"use client";

import { works } from "@/content/site";
import { CaseCard } from "./CaseCard";
import { Reveal } from "./Reveal";

export function Work() {
  return (
    <section id="work" className="flex scroll-mt-4 flex-col gap-14 bg-ink px-4 pt-6 text-fg md:gap-[110px] md:px-6 md:pt-10">
      {works.map((work) => (
        <Reveal key={work.id}>
          <CaseCard work={work} />
        </Reveal>
      ))}
    </section>
  );
}
```

`app/page.tsx` целиком:

```tsx
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Work } from "@/components/site/Work";

export default function Page() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Work />
    </main>
  );
}
```

- [ ] **Step 5: Тесты зелёные, быстрый взгляд в браузере**

Run: `npm test && npm run lint` → всё зелёное.
Во встроенном браузере (1440 и 390): кейсы идут друг под другом, картинки заполняют скруглённые рамки, у Control Tower панель и бейдж; клик по пилюле «SAQAOMUK» в hero прокручивает к кейсу.

- [ ] **Step 6: Commit**

```bash
git add components/site/ControlTowerPanel.tsx components/site/CaseCard.tsx components/site/Work.tsx components/site/Work.test.tsx public/media/saqa/storefront.jpg app/page.tsx
git commit -m "feat: show the three cases"
```

---

### Task 10: О себе

**Files:**
- Create: `components/site/About.tsx`, `components/site/About.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `about`, `glass`, `works`, `ControlTowerPanel({ bare: true })`, `Counter`, `Reveal`.
- Produces: `About()` — `<section id="about">`.

- [ ] **Step 1: Падающий тест**

`components/site/About.test.tsx`:

```tsx
import { screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { About } from "@/components/site/About";
import { glass } from "@/content/site";
import { renderWithLang } from "@/test/render";

describe("About", () => {
  test("reads as one sentence with its pictures set into the line", () => {
    const { container } = renderWithLang(<About />);
    expect(screen.getByText(/Я Артём — fullstack-разработчик из Якутска\. Делаю витрины/)).toBeInTheDocument();
    expect(screen.getByText("реальных пользователей.")).toHaveClass("xr-shine");
    const pills = container.querySelectorAll('p > [aria-hidden="true"]');
    expect(pills).toHaveLength(2);
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
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run components/site/About.test.tsx`
Expected: FAIL — модуль не найден.

- [ ] **Step 3: Реализация**

`components/site/About.tsx`:

```tsx
"use client";

import { about, glass, works } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { ControlTowerPanel } from "./ControlTowerPanel";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";

const saqa = works.find((work) => work.id === "saqaomuk");
const saqaSrc = saqa && saqa.media.kind === "image" ? saqa.media.src : "";

/** A picture set into the line of type, sized in em so it scales with it. */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden="true" className="mx-1 inline-block h-[0.95em] w-[2.05em] overflow-hidden rounded-full align-middle">
      {children}
    </span>
  );
}

export function About() {
  const { t, lang } = useLang();
  const [lead, afterShop, afterPlatform, shine] = about.parts[lang];

  return (
    <section id="about" className="flex scroll-mt-4 flex-col gap-16 bg-ink px-4 pb-24 pt-28 text-fg md:gap-[90px] md:px-6 md:py-[200px]">
      <div className="grid gap-10 md:grid-cols-[minmax(0,820fr)_minmax(0,548fr)] md:items-center md:gap-6">
        <Reveal>
          <div className="flex flex-col gap-8 md:gap-10 md:pl-24">
            <span className="text-[14px] text-muted">{t(about.label)}</span>
            <p className="font-display text-[40px] font-light leading-[1.1] tracking-[-0.02em] md:text-[clamp(44px,4.2vw,60px)] md:tracking-[-0.03em]">
              {lead}{" "}
              <Pill>
                <img src={saqaSrc} alt="" className="h-full w-full object-cover" />
              </Pill>{" "}
              {afterShop}{" "}
              <Pill>
                {/* The panel is laid out at 10.34 × 4.84 em and scaled into the pill. */}
                <span className="block h-[4.84em] w-[10.34em] origin-top-left scale-[0.2]">
                  <ControlTowerPanel bare />
                </span>
              </Pill>{" "}
              {afterPlatform} <span className="xr-shine">{shine}</span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="relative aspect-[548/620] w-full overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_50%_50%,#15122a_0%,#07060b_70%)] md:ml-auto md:max-w-[548px]">
            <picture>
              <source srcSet={glass.macro.avif} type="image/avif" />
              <img
                src={glass.macro.jpg}
                alt={t(about.macroAlt)}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover mix-blend-lighten"
              />
            </picture>
            <figcaption className="absolute bottom-[18px] left-5 text-[13px] text-muted">{t(about.macroCaption)}</figcaption>
          </figure>
        </Reveal>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:px-24">
        {about.stats.map((stat) => (
          <div key={stat.label.en} className="flex flex-col gap-2.5 border-t border-line pt-[18px]">
            <dt className="order-2 text-[15px] text-muted">{t(stat.label)}</dt>
            <dd className="order-1 font-display text-[56px] font-light leading-none md:text-[80px]">
              <Counter to={stat.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
```

`app/page.tsx` целиком:

```tsx
import { About } from "@/components/site/About";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Work } from "@/components/site/Work";

export default function Page() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Work />
      <About />
    </main>
  );
}
```

- [ ] **Step 4: Тесты зелёные**

Run: `npm test && npm run lint`
Expected: всё зелёное.

- [ ] **Step 5: Commit**

```bash
git add components/site/About.tsx components/site/About.test.tsx app/page.tsx
git commit -m "feat: add the about section"
```

---

### Task 11: Услуги

**Files:**
- Create: `components/site/Services.tsx`, `components/site/Services.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `services`, `useLang`.
- Produces: `Services()` — `<section id="services">`.

- [ ] **Step 1: Падающий тест**

`components/site/Services.test.tsx`:

```tsx
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
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run components/site/Services.test.tsx`
Expected: FAIL — модуль не найден.

- [ ] **Step 3: Реализация**

`components/site/Services.tsx`:

```tsx
"use client";

import { services } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="flex scroll-mt-4 flex-col gap-10 bg-ink px-4 pb-24 text-fg md:gap-[70px] md:px-6 md:pb-[200px]">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-[56px] font-light leading-none tracking-[-0.03em] md:pl-36 md:text-[clamp(72px,7.8vw,112px)] md:tracking-[-0.035em]">
            {t(services.headingLead)} <em className="italic">{t(services.headingAccent)}</em>
          </h2>
          <span className="shrink-0 text-[14px] text-muted">{t(services.label)}</span>
        </div>
      </Reveal>

      <div className="flex flex-col border-b border-line">
        {services.items.map((item) => (
          <a
            key={item.index}
            href="#contact"
            className="xr-row grid grid-cols-[40px_minmax(0,1fr)_28px] items-center gap-x-4 gap-y-3 border-t border-line py-6 md:grid-cols-[120px_minmax(0,1fr)_420px_56px] md:gap-6 md:py-9"
          >
            <span className="text-[14px] text-muted">{item.index}</span>
            <span className="xr-row-t font-display text-[30px] font-light leading-none tracking-[-0.025em] md:text-[clamp(40px,4.4vw,64px)]">
              {t(item.title)}
            </span>
            <span className="col-start-2 col-end-4 row-start-2 text-[15px] leading-[1.5] text-muted md:col-auto md:row-auto md:text-[16px]">
              {t(item.text)}
            </span>
            <span
              aria-hidden="true"
              className="xr-plus col-start-3 row-start-1 flex size-7 items-center justify-center rounded-full border border-line text-[18px] md:col-auto md:row-auto md:size-14 md:text-[24px]"
            >
              +
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
```

`app/page.tsx` целиком:

```tsx
import { About } from "@/components/site/About";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Services } from "@/components/site/Services";
import { Work } from "@/components/site/Work";

export default function Page() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Services />
    </main>
  );
}
```

- [ ] **Step 4: Тесты зелёные**

Run: `npm test && npm run lint` → всё зелёное.

- [ ] **Step 5: Commit**

```bash
git add components/site/Services.tsx components/site/Services.test.tsx app/page.tsx
git commit -m "feat: list the services"
```

---

### Task 12: Контакты, OG-картинка и README

**Files:**
- Create: `components/site/Contact.tsx`, `components/site/Contact.test.tsx`
- Modify: `app/page.tsx`, `app/opengraph-image.tsx` (целиком), `README.md` (целиком)

**Interfaces:**
- Consumes: `contact`, `identity`, `GlassLoop({ lazy: true })`, `useYakutskTime`, `ArrowIcon`.
- Produces: `Contact()` — `<footer id="contact">`; маршрут `/opengraph-image` (PNG 1200×630).

- [ ] **Step 1: Падающий тест**

`components/site/Contact.test.tsx`:

```tsx
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

  test("its glass loop waits until it is near", () => {
    const { container } = renderWithLang(<Contact />);
    expect(container.querySelector("video")).toHaveAttribute("preload", "none");
  });
});
```

- [ ] **Step 2: Убедиться, что тест падает**

Run: `npx vitest run components/site/Contact.test.tsx`
Expected: FAIL — модуль не найден.

- [ ] **Step 3: Реализация**

`components/site/Contact.tsx`:

```tsx
"use client";

import { contact, identity } from "@/content/site";
import { useLang } from "@/lib/i18n";
import { useYakutskTime } from "@/lib/useYakutskTime";
import { GlassLoop } from "./GlassLoop";
import { ArrowIcon } from "./icons";
import { Reveal } from "./Reveal";

export function Contact() {
  const { t } = useLang();
  const time = useYakutskTime();

  return (
    <footer id="contact" className="relative isolate flex min-h-[700px] flex-col overflow-hidden bg-ink text-fg md:min-h-[1100px]">
      {/* The same loop as the hero, twice the size and cut by the page's edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-38%] left-1/2 aspect-square w-[170vw] -translate-x-1/2 md:bottom-[-48%] md:w-[min(120vw,1700px)]"
      >
        <GlassLoop lazy className="h-full w-full" />
      </div>
      <div aria-hidden="true" className="xr-grain pointer-events-none absolute -inset-10 opacity-[0.16] mix-blend-overlay" />

      <div className="relative flex grow flex-col px-4 pt-28 md:px-6 md:pt-[180px]">
        <Reveal>
          <span className="block text-[14px] text-soft md:pl-[31%]">{t(contact.label)}</span>
          <h2 className="mt-8 font-display text-[64px] font-light leading-[0.98] tracking-[-0.035em] md:mt-10 md:pl-[31%] md:text-[clamp(88px,10vw,144px)] md:tracking-[-0.04em]">
            {t(contact.lineOne)}
            <br />
            <span className="xr-shine">{t(contact.lineTwo)}</span>
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center gap-3 md:mt-[70px] md:pl-[31%]">
          <a
            href={`mailto:${identity.email}`}
            className="xr-spin inline-flex h-[60px] items-center gap-3.5 rounded-full pl-6 pr-2.5 text-[17px] md:h-[72px] md:pl-8 md:pr-3 md:text-[20px]"
          >
            {identity.email}
            <span className="flex size-10 items-center justify-center rounded-full bg-fg text-ink md:size-[50px]">
              <ArrowIcon size={18} />
            </span>
          </a>
          <a href={identity.telegram.href} className="inline-flex h-12 items-center rounded-full bg-chip px-4 text-[16px] transition-colors hover:bg-white/20 md:h-14 md:text-[17px]">
            {identity.telegram.label}
          </a>
          <a href={identity.github.href} className="inline-flex h-12 items-center rounded-full bg-chip px-4 text-[16px] transition-colors hover:bg-white/20 md:h-14 md:text-[17px]">
            {identity.github.label}
          </a>
        </div>

        <div className="mt-auto flex justify-between gap-4 py-[26px] text-[13px] text-soft md:text-[14px]">
          <span>{contact.copyright}</span>
          <span className="tabular-nums">
            {t(contact.city)}, YKS {time ?? "--:--"}
          </span>
          <a href="#top" className="hover:text-fg">
            {t(contact.top)}
          </a>
        </div>
      </div>
    </footer>
  );
}
```

`app/page.tsx` целиком (финальный вид):

```tsx
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Services } from "@/components/site/Services";
import { Work } from "@/components/site/Work";

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Services />
      </main>
      <Contact />
    </>
  );
}
```

`app/opengraph-image.tsx` целиком:

```tsx
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "xrtem.dev — Artem Svinoboev, web and product engineering";

// Latin only: Cyrillic here would mean shipping a font file into the route.
export default async function OpengraphImage() {
  const poster = await readFile(join(process.cwd(), "public/media/glass/x-poster.jpg"));
  const src = `data:image/jpeg;base64,${poster.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#000000", color: "#ffffff", fontFamily: "sans-serif" }}>
        <img src={src} width={630} height={630} style={{ position: "absolute", right: 24, top: 0 }} alt="" />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: "64px 72px" }}>
          <span style={{ fontSize: 32, letterSpacing: "-0.045em" }}>xrtem</span>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02, letterSpacing: "-0.04em" }}>
            <span>Web &amp; product</span>
            <span style={{ color: "#A9A7B4" }}>engineering</span>
          </div>
          <span style={{ fontSize: 22, color: "#A9A7B4" }}>xrtem.dev · Artem Svinoboev · Yakutsk</span>
        </div>
      </div>
    ),
    size,
  );
}
```

`README.md` целиком:

````md
# xrtem.dev

Portfolio of **Artem Svinoboev** — full-stack work for brands and businesses:
sites, stores, platforms and Telegram bots, taken all the way to real users.

One dark page: a glass **x** rendered in Blender, three cases, services and
contacts. Russian by default, English one click away in the menu.

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 — tokens in `@theme`, motion as CSS keyframes (`app/globals.css`) |
| Type | Cormorant Garamond · Onest · JetBrains Mono |
| Tests | Vitest + Testing Library — `npm test` |
| 3D | Blender 5 + LuxCore → looping video |

## Content

Every string lives in [`content/site.ts`](content/site.ts) as an `{ en, ru }` pair.
`content/site.test.ts` refuses an empty translation and the «X, а не Y» construction.

## The glass x

The scene is code: [`blender/x_scene.py`](blender/x_scene.py) builds the geometry,
the studio (a generated HDR), the glass and the camera. LuxCore gives real spectral
dispersion; Cycles is there for fast drafts.

```bash
blender/render.sh still luxcore 0            # one frame for look-dev
blender/render.sh loop luxcore 0 180         # the loop, ~4.8 h on an M4 Pro
blender/render.sh macro luxcore --budget 600 # the About close-up
blender/encode.sh blender/out/loop-luxcore blender/out/macro-luxcore.png
```

`encode.sh` writes `webm` + `mp4` + AVIF/JPEG stills into `public/media/glass/` and
the favicon into `app/icon.png`. Frames render over a transparent film and are laid
on pure black; the page blends the video with `lighten`, so the codec's blacks never
show as a rectangle.

LuxCore note: pyluxcore 2.11.2 sRGB-encodes float environment maps on load, which
`x_scene.py` undoes with `world.luxcore.gamma = 2.2`.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server on :3000 |
| `npm test` | Unit tests |
| `npm run lint` | Type check |
| `npm run build` | Production build |
````

- [ ] **Step 4: Тесты, сборка, OG-картинка**

Run: `npm test && npm run lint && npm run build` → всё зелёное.
Dev-сервер запущен:

```bash
curl -s -o /tmp/xrtem-og.png -w "%{http_code} %{content_type}\n" http://localhost:3000/opengraph-image
sips -g pixelWidth -g pixelHeight /tmp/xrtem-og.png
```

Expected: `200 image/png`, 1200×630. Открыть `/tmp/xrtem-og.png` (Read): «x» справа, текст слева, читается.

- [ ] **Step 5: Commit**

```bash
git add components/site/Contact.tsx components/site/Contact.test.tsx app/page.tsx app/opengraph-image.tsx README.md
git commit -m "feat: close with contacts, og image and readme"
```

---

### Task 13: Замена черновой петли финальной (LuxCore)

**Files:**
- Modify: `public/media/glass/*`, `app/icon.png`

**Interfaces:**
- Consumes: результат фонового рендера из Task 7 (`blender/out/loop-luxcore/`, `blender/out/macro-luxcore.png`), `blender/encode.sh`, `blender/check_frame.py`.
- Produces: финальные ассеты по тем же путям, что и `glass` в `content/site.ts`.

- [ ] **Step 1: Рендер закончен**

```bash
ls blender/out/loop-luxcore/*.png | wc -l
ls -la blender/out/macro-luxcore.png
tail -3 blender/out/final-render.log
```

Expected: `180`, файл крупного плана есть. Если меньше 180 — перезапустить команду из Task 7 Step 5: готовые кадры пропускаются.

- [ ] **Step 2: Кадры целые, шов невидим**

```bash
BL=/Applications/Blender.app/Contents/MacOS/Blender
for f in 0000 0045 0090 0135 0179; do
  $BL -b --python-exit-code 1 -P blender/check_frame.py -- "$PWD/blender/out/loop-luxcore/$f.png" | grep CHECK
done
$BL -b --python-exit-code 1 -P blender/check_frame.py -- "$PWD/blender/out/macro-luxcore.png" | grep CHECK
blender/render.sh still luxcore 180
ffmpeg -hide_banner -i blender/out/loop-luxcore/0000.png -i blender/out/still-luxcore-180.png -lavfi psnr -f null - 2>&1 | grep -o "average:[^ ]*"
```

Expected: шесть `CHECK OK`; PSNR ≥ 30 (у LuxCore шум между двумя рендерами разный, поэтому порог ниже, чем 35 у Cycles с фиксированным seed).

- [ ] **Step 3: Кодирование и бюджеты**

```bash
blender/encode.sh blender/out/loop-luxcore blender/out/macro-luxcore.png
for f in public/media/glass/x-loop.webm public/media/glass/x-loop.mp4; do
  s=$(stat -f%z "$f"); echo "$f $s bytes"; [ "$s" -le 3145728 ] || { echo "TOO BIG: $f"; exit 1; }
done
s=$(stat -f%z public/media/glass/x-poster.jpg); echo "poster $s bytes"; [ "$s" -le 122880 ] || { echo "POSTER TOO BIG"; exit 1; }
ffprobe -v error -count_frames -select_streams v -show_entries stream=width,height,nb_read_frames,r_frame_rate -of csv=p=0 public/media/glass/x-loop.mp4
```

Expected: оба ≤ 3 МБ, постер ≤ 120 КБ; `1080,1080,30/1,180`. Если постер больше 120 КБ — в `still()` внутри `encode.sh` поменять `-q:v 3` на `-q:v 5`. Если webm больше 3 МБ — в `encode.sh` поднять `-crf 34` до `-crf 38` для VP9 (и `-crf 23` до `-crf 26` для H.264, если перебор у mp4), перекодировать.

- [ ] **Step 4: Посмотреть глазами**

Во встроенном браузере (dev-сервер запущен), 1440×900: hero — «x» крутится плавно, на стыке петли (каждые 6 с) нет рывка, вокруг видео не видно прямоугольника. Прокрутить вниз до контактов — вторая петля запускается. 390×844 — то же. Отправить Артёму скриншот hero через SendUserFile.

- [ ] **Step 5: Commit**

```bash
git add public/media/glass app/icon.png
git commit -m "feat: swap in the luxcore render"
```

---

### Task 14: Полная проверка и ревью

**Files:**
- Modify: только то, что найдут проверки.

**Interfaces:**
- Consumes: всё выше.
- Produces: зелёная ветка, готовая к ревью Артёма.

- [ ] **Step 1: Автоматика**

Run: `npm test && npm run lint && npm run build`
Expected: все тесты зелёные, `tsc` чистый, сборка без ошибок и предупреждений о гидратации.

- [ ] **Step 2: Страница целиком в браузере**

Dev-сервер: `preview_start { name: "xrtem-dev" }`. Для каждого размера — 1440×900, 390×844, 320×700 — через встроенный браузер:
1. Screenshot каждой секции: Hero, бегущие строки, три кейса, «О себе», услуги, контакты. Сравнить с макетом (`~/Downloads/xrtem.dev — редизайн.html`, раскладка 1440 и 390).
2. `javascript_tool`: `document.documentElement.scrollWidth <= window.innerWidth` → `true`.
3. `read_console_messages` с `onlyErrors: true` → пусто.
4. `read_network_requests` → нет ответов 4xx/5xx (шрифты, картинки, видео, `/opengraph-image`).

- [ ] **Step 3: Поведение**

1. «Меню» → индекс; `EN` → все тексты страницы на английском, `document.documentElement.lang === "en"`; перезагрузка → английский сохранился; обратно `RU`.
2. В меню клик «Контакты» → меню закрылось, страница у подвала, прокрутка работает.
3. Esc закрывает меню, фокус на кнопке «Меню».
4. Часы в шапке и подвале совпадают с временем Якутска (UTC+9).
5. Кейсы Chase.je и SAQAOMUK открывают сайты в новой вкладке; у Control Tower ссылки нет.
6. Уменьшение движения:
   ```bash
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --force-prefers-reduced-motion --window-size=1440,900 --virtual-time-budget=6000 --screenshot=/tmp/xrtem-reduced.png http://localhost:3000/
   ```
   Открыть `/tmp/xrtem-reduced.png`: вместо видео постер, заголовок виден целиком без анимации.

- [ ] **Step 4: Независимое ревью**

Запустить агента `code-reviewer` (свежий контекст) на дифф `e9bbfd5..HEAD` — всё, что сделано после коммита спеки. Пусть проверит соответствие спеке (`docs/superpowers/specs/2026-09-25-xrtem-glass-redesign-design.md`) и пять пунктов Review Focus. Найденное исправить, прогнать Step 1 ещё раз.

- [ ] **Step 5: Commit исправлений**

```bash
git add -A
git commit -m "fix: address review findings"
```

(Только если были исправления.)
