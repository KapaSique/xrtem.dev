# Editorial Collision Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `xrtem.dev` as a cinematic, non-card-based portfolio that introduces Artem/KapaSique, CHASE.JE, Petmek, and a truthful GitHub activity tape in the first viewport.

**Architecture:** Keep React 19 + TypeScript + Vite as the document/application layer. Use typed project data and semantic scene components, GSAP ScrollTrigger synchronized with Lenis for scroll direction, Motion only for isolated pointer/entrance responses, and one disposable Three.js shader canvas for the hero image collision. The HTML document must remain complete when WebGL, smooth scrolling, or motion is unavailable.

**Tech Stack:** React 19.2.7, TypeScript 7, Vite 8.1.5, GSAP 3.15.0, `@gsap/react` 2.1.2, Lenis 1.3.25, Motion 12.42.2, Three.js 0.185.1, Vitest 4.1.10, Testing Library 16.3.2, locally bundled Archivo/Bodoni Moda/IBM Plex Mono.

## Global Constraints

- Palette: Paper `#EEEAE1`, Carbon `#111111`, Cobalt `#1646FF`, Signal orange `#FF4D19`, Muted graphite `#68645D`.
- Artem, CHASE.JE, and Petmek must all be legible in the first viewport.
- Do not expose private repository URLs, internal infrastructure URLs, credentials, customer information, or private administrative details.
- Do not fabricate commercial metrics.
- Do not retain the current generic skill ticker, uniform project-card grid, acid-green palette, glow cursor, or Bricolage Grotesque identity.
- Use one persistent WebGL canvas at most; the page must remain complete when it is disabled.
- GSAP and Motion must never animate the same property on the same element.
- Disable Lenis, pinning, and WebGL distortion for `prefers-reduced-motion: reduce`.
- Mobile body copy must be at least 16 px and tap targets at least 44 px.
- Verify at 1440 × 1000 and 390 × 844, including keyboard and reduced-motion modes.
- Keep the current verified GitHub snapshot as the offline fallback and disclose its capture date.

---

## File Structure

### Create

- `.gitignore` — local build/dependency exclusions before the first repository checkpoint.
- `src/test/setup.ts` — Testing Library and browser API shims.
- `src/data/projects.ts` — the only source of portfolio project copy, links, proof points, and media.
- `src/data/projects.test.ts` — catalog order, privacy, and excluded-project tests.
- `src/data/media.test.ts` — required local-media and media-budget tests.
- `src/lib/contributions.ts` — contribution grouping and summary functions.
- `src/lib/contributions.test.ts` — deterministic contribution-tape tests.
- `src/hooks/useGitHubContributions.ts` — live fetch with verified fallback.
- `src/components/ContributionTape.tsx` — semantic 52-week activity tape.
- `src/components/ContributionTape.test.tsx` — source disclosure, accessible summary, and link tests.
- `src/motion/gsap.ts` — one-time GSAP/ScrollTrigger/`useGSAP` registration.
- `src/motion/SmoothScroll.tsx` — Lenis/GSAP ticker synchronization and reduced-motion branch.
- `src/motion/usePortfolioMotion.ts` — scoped scene timelines and canvas progress.
- `src/components/PortfolioHeader.tsx` — minimal index/work/GitHub navigation.
- `src/components/SceneProgress.tsx` — active scene/progress output.
- `src/components/CollisionHero.tsx` — author/project collision hero.
- `src/components/CollisionHero.test.tsx` — first-viewport content contract.
- `src/components/ChaseScene.tsx` — CHASE.JE narrative scene.
- `src/components/PetmekScene.tsx` — Petmek pipeline narrative scene.
- `src/components/CommercialScenes.test.tsx` — public-link/content/privacy contracts.
- `src/components/ExperimentReel.tsx` — asymmetric four-project reel.
- `src/components/ContactScene.tsx` — author statement and verified destinations.
- `src/components/ExperimentReel.test.tsx` — order and exclusion tests.
- `src/components/EditorialCanvas.tsx` — React lifecycle wrapper for the shader renderer.
- `src/webgl/editorialRenderer.ts` — Three.js renderer/controller with full disposal.
- `src/webgl/editorialRenderer.test.ts` — capability/fallback policy tests.
- `src/styles/tokens.css` — color, type, spacing, and easing tokens.
- `src/styles/base.css` — reset, typography, focus, grain, and document behavior.
- `src/styles/scenes.css` — desktop scene composition.
- `src/styles/motion.css` — masks, strips, state selectors, and hover transitions.
- `src/styles/responsive.css` — tablet/mobile/reduced-motion overrides.
- `public/media/chase/*` — selected real CHASE.JE imagery.
- `public/media/petmek/*` — selected real Petmek screenshots.
- `public/media/experiments/*` — verified public banners for TrustLens and Second Look.

### Modify

- `package.json` — dependencies and test scripts.
- `package-lock.json` — locked dependency graph.
- `vite.config.ts` — Vitest `jsdom` configuration.
- `tsconfig.app.json` — Vitest/DOM test types.
- `src/main.tsx` — new local fonts and split stylesheets.
- `src/App.tsx` — semantic scene composition only.
- `src/data/github.ts` — retain snapshot, export API URL and types cleanly.
- `index.html` — paper theme color and accurate metadata.
- `README.md` — new architecture, commands, media provenance, and verification notes.

### Remove after replacement tests pass

- `src/components/ContributionTracker.tsx`
- `src/components/ProjectVisuals.tsx`
- `src/styles.css`

---

### Task 1: Establish the typed catalog and test harness

**Files:**
- Create: `.gitignore`
- Create: `src/test/setup.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/projects.test.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.ts`
- Modify: `tsconfig.app.json`

**Interfaces:**
- Produces: `commercialProjects: readonly CommercialProject[]`
- Produces: `experiments: readonly ExperimentProject[]`
- Produces: `CommercialProject`, `ExperimentProject`, and `ProjectMedia` types.
- Consumes: no earlier task interfaces.

- [ ] **Step 1: Add exclusions and initialize a local repository checkpoint**

Create `.gitignore`:

```gitignore
node_modules/
dist/
.DS_Store
*.log
.vite/
coverage/
```

Run:

```bash
git init -b feature/editorial-collision
```

Expected: `Initialized empty Git repository`.

- [ ] **Step 2: Install the exact runtime and test dependencies**

Run:

```bash
npm uninstall @fontsource-variable/bricolage-grotesque react-activity-calendar
npm install gsap@3.15.0 @gsap/react@2.1.2 three@0.185.1 @fontsource-variable/archivo@5.2.8 @fontsource-variable/bodoni-moda@5.2.7
npm install -D @types/three@0.185.1 vitest@4.1.10 @testing-library/react@16.3.2 @testing-library/jest-dom@6.9.1 jsdom@29.1.1
```

Add scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "tsc -b --pretty false",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Set Vitest in `vite.config.ts`:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
});
```

Add `"types": ["vitest/globals", "@testing-library/jest-dom"]` to `compilerOptions` in `tsconfig.app.json`.

- [ ] **Step 3: Add the browser test setup**

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }),
});

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: ResizeObserverStub,
});
```

- [ ] **Step 4: Write the failing catalog test**

Create `src/data/projects.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { commercialProjects, experiments } from "./projects";

describe("portfolio catalog", () => {
  it("puts both commercial products before experiments", () => {
    expect(commercialProjects.map((project) => project.slug)).toEqual([
      "chase",
      "petmek",
    ]);
    expect(experiments.map((project) => project.slug)).toEqual([
      "trustlens",
      "second-look",
      "checkers",
      "maze",
    ]);
  });

  it("publishes only public destinations", () => {
    const serialized = JSON.stringify({ commercialProjects, experiments });
    expect(serialized).not.toContain("github.com/OOOpetmek");
    expect(serialized).not.toContain("github.com/KapaSique/chaseje");
    expect(serialized).not.toContain("onrender.com");
  });

  it("excludes skill repositories from selected work", () => {
    const titles = experiments.map((project) => project.title);
    expect(titles).not.toContain("Kaggle Dominator");
    expect(titles).not.toContain("Paper Maestro");
  });
});
```

- [ ] **Step 5: Run the test and verify the red state**

Run:

```bash
npm test -- src/data/projects.test.ts
```

Expected: FAIL because `src/data/projects.ts` does not exist.

- [ ] **Step 6: Implement the typed project catalog**

Create `src/data/projects.ts` with these public fields and values:

```ts
export type ProjectMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CommercialProject = {
  slug: "chase" | "petmek";
  title: string;
  label: string;
  statement: string;
  description: string;
  publicUrl: string;
  cta: string;
  facts: readonly string[];
  media: readonly ProjectMedia[];
};

export type ExperimentProject = {
  slug: "trustlens" | "second-look" | "checkers" | "maze";
  title: string;
  category: string;
  statement: string;
  proof: string;
  sourceUrl: string;
  liveUrl?: string;
  media?: ProjectMedia;
};

export const commercialProjects = [
  {
    slug: "chase",
    title: "CHASE.JE",
    label: "PRIVATE ARCHIVE / MOSCOW",
    statement: "A closed archive of what the market does not have.",
    description:
      "A bilingual private-boutique PWA with a curated catalog and a protected serverless content workflow.",
    publicUrl: "https://chaseje.com",
    cta: "ENTER CHASE.JE",
    facts: ["BILINGUAL PWA", "PRIVATE CATALOG", "SERVERLESS CMS"],
    media: [
      { src: "/media/chase/archive-room.jpg", alt: "Dark CHASE.JE archive boutique interior", width: 1200, height: 630 },
      { src: "/media/chase/boutique.webp", alt: "Curated CHASE.JE boutique selection", width: 760, height: 930 },
      { src: "/media/chase/jewelry.webp", alt: "CHASE.JE archive jewelry editorial", width: 760, height: 941 },
      { src: "/media/chase/women.webp", alt: "CHASE.JE womenswear editorial", width: 760, height: 1008 },
    ],
  },
  {
    slug: "petmek",
    title: "PETMEK",
    label: "LOYALTY OPERATING SYSTEM",
    statement: "Customer feedback becomes an owner action.",
    description:
      "A multi-tenant loyalty product with an owner cabinet, AI-assisted review analysis, campaigns, and weekly reports.",
    publicUrl: "https://petmek.app",
    cta: "OPEN PETMEK",
    facts: ["MULTI-TENANT", "AI REVIEW ANALYSIS", "OWNER REPORTS"],
    media: [
      { src: "/media/petmek/overview.png", alt: "Petmek owner overview with business health metrics", width: 1200, height: 804 },
      { src: "/media/petmek/reviews.png", alt: "Petmek review analysis and owner recommendations", width: 1200, height: 804 },
      { src: "/media/petmek/report.png", alt: "Petmek generated weekly business report", width: 1200, height: 804 },
      { src: "/media/petmek/wizard.png", alt: "Petmek business onboarding wizard", width: 1200, height: 804 },
    ],
  },
] as const satisfies readonly CommercialProject[];

export const experiments = [
  {
    slug: "trustlens",
    title: "TrustLens",
    category: "VERIFIABLE ANALYTICS AGENT",
    statement: "Re-runs the actual query before a number reaches the report.",
    proof: "24/24 EVALS",
    sourceUrl: "https://github.com/KapaSique/trustlens",
    media: { src: "/media/experiments/trustlens.png", alt: "TrustLens multi-agent verification system", width: 1280, height: 640 },
  },
  {
    slug: "second-look",
    title: "Second Look",
    category: "CLINICAL ML SAFETY NET",
    statement: "Built around the failure modes that accuracy hides.",
    proof: "90% RED-FLAG RECALL",
    sourceUrl: "https://github.com/KapaSique/second-look-triage",
    liveUrl: "https://huggingface.co/spaces/KapaSique/second-look-triage",
    media: { src: "/media/experiments/second-look.png", alt: "Second Look clinical triage safety system", width: 1280, height: 640 },
  },
  {
    slug: "checkers",
    title: "Checkers Solver",
    category: "GO SEARCH ENGINE",
    statement: "Russian draughts as a full-stack search problem.",
    proof: "ALPHA-BETA / BITBOARDS",
    sourceUrl: "https://github.com/KapaSique/checkers-solver",
  },
  {
    slug: "maze",
    title: "Maze Crawler",
    category: "SIMULATION AGENT",
    statement: "A survival-first agent improved by deleting cleverness.",
    proof: "ELO 1057.5 / TOP 12%",
    sourceUrl: "https://github.com/KapaSique/maze-crawler",
  },
] as const satisfies readonly ExperimentProject[];
```

- [ ] **Step 7: Run tests and commit the foundation**

Run:

```bash
npm test -- src/data/projects.test.ts
npm run lint
```

Expected: both commands PASS.

Run:

```bash
git add .
git commit -m "chore: establish editorial portfolio foundation"
```

---

### Task 2: Import and guard real project media

**Files:**
- Create: `public/media/chase/archive-room.jpg`
- Create: `public/media/chase/boutique.webp`
- Create: `public/media/chase/jewelry.webp`
- Create: `public/media/chase/women.webp`
- Create: `public/media/petmek/overview.png`
- Create: `public/media/petmek/reviews.png`
- Create: `public/media/petmek/report.png`
- Create: `public/media/petmek/wizard.png`
- Create: `public/media/experiments/trustlens.png`
- Create: `public/media/experiments/second-look.png`
- Create: `src/data/media.test.ts`

**Interfaces:**
- Consumes: media paths declared by `commercialProjects` and `experiments`.
- Produces: all local assets required by later scene components.

- [ ] **Step 1: Write the failing media contract**

Create `src/data/media.test.ts`:

```ts
// @vitest-environment node
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { commercialProjects, experiments } from "./projects";

const publicPath = (src: string) => resolve(process.cwd(), "public", src.slice(1));

describe("portfolio media", () => {
  const paths = [
    ...commercialProjects.flatMap((project) => project.media.map((item) => item.src)),
    ...experiments.flatMap((project) => (project.media ? [project.media.src] : [])),
  ];

  it("stores every declared image locally", () => {
    for (const path of paths) expect(existsSync(publicPath(path)), path).toBe(true);
  });

  it("keeps each image below 250 KB", () => {
    for (const path of paths) {
      expect(statSync(publicPath(path)).size, path).toBeLessThan(250_000);
    }
  });
});
```

- [ ] **Step 2: Run the media test and verify the red state**

Run:

```bash
npm test -- src/data/media.test.ts
```

Expected: FAIL listing missing files.

- [ ] **Step 3: Copy and download the verified media**

Run:

```bash
mkdir -p public/media/chase public/media/petmek public/media/experiments
cp /Users/artemcike/Documents/WebApps/chase.je/images/og-20260603.jpg public/media/chase/archive-room.jpg
cp /Users/artemcike/Documents/WebApps/chase.je/images/boutique-gpt-20260603-0-760.webp public/media/chase/boutique.webp
cp /Users/artemcike/Documents/WebApps/chase.je/images/jewelry-gpt-20260603-set-2-760.webp public/media/chase/jewelry.webp
cp /Users/artemcike/Documents/WebApps/chase.je/images/women-gpt-20260603-set-3-760.webp public/media/chase/women.webp
cp /Users/artemcike/Documents/Projects/OOOpetmek/telegram-bot/overview-new.png public/media/petmek/overview.png
cp /Users/artemcike/Documents/Projects/OOOpetmek/telegram-bot/cabinet-reviews.png public/media/petmek/reviews.png
cp /Users/artemcike/Documents/Projects/OOOpetmek/telegram-bot/report-pretty.png public/media/petmek/report.png
cp /Users/artemcike/Documents/Projects/OOOpetmek/telegram-bot/wizard.png public/media/petmek/wizard.png
curl -L https://raw.githubusercontent.com/KapaSique/trustlens/main/assets/banner.png -o public/media/experiments/trustlens.png
curl -L https://raw.githubusercontent.com/KapaSique/second-look-triage/main/assets/banner.png -o public/media/experiments/second-look.png
```

- [ ] **Step 4: Run the media gate and commit**

Run:

```bash
npm test -- src/data/media.test.ts
```

Expected: PASS with 10 local images and every image below 250 KB.

Run:

```bash
git add public/media src/data/media.test.ts
git commit -m "feat: add verified commercial project media"
```

---

### Task 3: Replace the stock calendar with a truthful contribution tape

**Files:**
- Create: `src/lib/contributions.ts`
- Create: `src/lib/contributions.test.ts`
- Create: `src/hooks/useGitHubContributions.ts`
- Create: `src/components/ContributionTape.tsx`
- Create: `src/components/ContributionTape.test.tsx`
- Modify: `src/data/github.ts`

**Interfaces:**
- Produces: `buildContributionWeeks(days: Contribution[]): ContributionWeek[]`
- Produces: `summarizeContributions(days: Contribution[]): ContributionSummary`
- Produces: `useGitHubContributions(): GitHubContributionState`
- Produces: `<ContributionTape compact?: boolean />`
- Consumes: `fallbackContributions`, `githubSnapshot`, and the public GitHub activity URL.

- [ ] **Step 1: Write failing contribution grouping tests**

Create `src/lib/contributions.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import type { Contribution } from "../data/github";
import { buildContributionWeeks, summarizeContributions } from "./contributions";

const days: Contribution[] = [
  { date: "2026-07-13", count: 2, level: 1 },
  { date: "2026-07-14", count: 0, level: 0 },
  { date: "2026-07-15", count: 7, level: 3 },
  { date: "2026-07-20", count: 1, level: 1 },
];

describe("contribution tape data", () => {
  it("groups ISO dates into Monday-based weeks", () => {
    expect(buildContributionWeeks(days).map((week) => week.total)).toEqual([9, 1]);
  });

  it("summarizes total and active days", () => {
    expect(summarizeContributions(days)).toEqual({ total: 10, activeDays: 3 });
  });
});
```

- [ ] **Step 2: Verify the tests fail**

Run:

```bash
npm test -- src/lib/contributions.test.ts
```

Expected: FAIL because `src/lib/contributions.ts` does not exist.

- [ ] **Step 3: Implement grouping and summary functions**

Create `src/lib/contributions.ts`:

```ts
import type { Contribution } from "../data/github";

export type ContributionWeek = {
  key: string;
  total: number;
  days: Contribution[];
};

export type ContributionSummary = {
  total: number;
  activeDays: number;
};

const mondayKey = (isoDate: string) => {
  const date = new Date(`${isoDate}T00:00:00Z`);
  const offset = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - offset);
  return date.toISOString().slice(0, 10);
};

export function buildContributionWeeks(days: Contribution[]): ContributionWeek[] {
  const weeks = new Map<string, Contribution[]>();
  [...days]
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((day) => {
      const key = mondayKey(day.date);
      weeks.set(key, [...(weeks.get(key) ?? []), day]);
    });

  return [...weeks].map(([key, weekDays]) => ({
    key,
    days: weekDays,
    total: weekDays.reduce((sum, day) => sum + day.count, 0),
  }));
}

export function summarizeContributions(days: Contribution[]): ContributionSummary {
  return {
    total: days.reduce((sum, day) => sum + day.count, 0),
    activeDays: days.filter((day) => day.count > 0).length,
  };
}
```

Export `GITHUB_ACTIVITY_URL` from `src/data/github.ts`:

```ts
export const GITHUB_ACTIVITY_URL =
  "https://github-contributions-api.jogruber.de/v4/KapaSique?y=last";
```

- [ ] **Step 4: Write the failing component contract**

Create `src/components/ContributionTape.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ContributionTape } from "./ContributionTape";

vi.stubGlobal("fetch", vi.fn(() => new Promise(() => undefined)));

describe("ContributionTape", () => {
  it("exposes a truthful accessible fallback summary", () => {
    render(<ContributionTape />);
    expect(screen.getByRole("region", { name: /github activity/i })).toBeInTheDocument();
    expect(screen.getByText(/snapshot/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /kapasique/i })).toHaveAttribute(
      "href",
      "https://github.com/KapaSique",
    );
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(50);
  });
});
```

- [ ] **Step 5: Implement the live hook and semantic tape**

`src/hooks/useGitHubContributions.ts` must initialize from the fallback, fetch once with `AbortController`, accept only a non-empty `contributions` array, and return:

```ts
export type GitHubContributionState = {
  contributions: Contribution[];
  source: "live" | "snapshot";
};
```

`src/components/ContributionTape.tsx` must:

```tsx
export function ContributionTape({ compact = false }: { compact?: boolean }) {
  const { contributions, source } = useGitHubContributions();
  const weeks = useMemo(() => buildContributionWeeks(contributions).slice(-52), [contributions]);
  const summary = useMemo(() => summarizeContributions(contributions), [contributions]);

  return (
    <section className={`contribution-tape${compact ? " is-compact" : ""}`} aria-label="KapaSique GitHub activity">
      <header className="contribution-tape__meta">
        <a href="https://github.com/KapaSique" target="_blank" rel="noreferrer">@KapaSique ↗</a>
        <span>{summary.total.toLocaleString("en-US")} contributions</span>
        <span>{summary.activeDays} active days</span>
        <span>{source === "live" ? "live" : `snapshot · ${githubSnapshot.capturedAt}`}</span>
      </header>
      <ol className="contribution-tape__weeks" aria-label="Last 52 weeks">
        {weeks.map((week) => (
          <li key={week.key} className="contribution-tape__week" aria-label={`${week.total} contributions during week of ${week.key}`}>
            {week.days.map((day) => (
              <i key={day.date} data-level={day.level} title={`${day.count} contributions · ${day.date}`} />
            ))}
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 6: Run the contribution tests and commit**

Run:

```bash
npm test -- src/lib/contributions.test.ts src/components/ContributionTape.test.tsx
npm run lint
```

Expected: PASS.

Run:

```bash
git add src/data/github.ts src/lib src/hooks src/components/ContributionTape.tsx src/components/ContributionTape.test.tsx
git commit -m "feat: turn GitHub activity into a contribution tape"
```

---

### Task 4: Establish the visual shell and synchronized motion runtime

**Files:**
- Create: `src/motion/gsap.ts`
- Create: `src/motion/SmoothScroll.tsx`
- Create: `src/components/PortfolioHeader.tsx`
- Create: `src/components/SceneProgress.tsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`
- Modify: `src/main.tsx`

**Interfaces:**
- Produces: registered `gsap`, `ScrollTrigger`, and `useGSAP`.
- Produces: `<SmoothScroll>{children}</SmoothScroll>`.
- Produces: `<PortfolioHeader />` and `<SceneProgress />`.
- Consumes: no scene implementations.

- [ ] **Step 1: Create the registered GSAP module**

Create `src/motion/gsap.ts`:

```ts
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
```

- [ ] **Step 2: Implement Lenis/GSAP synchronization**

Create `src/motion/SmoothScroll.tsx`:

```tsx
import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger } from "./gsap";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    const onScroll = () => ScrollTrigger.update();
    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", onScroll);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    return () => {
      lenis?.off("scroll", onScroll);
      gsap.ticker.remove(update);
    };
  }, [reduceMotion]);

  if (reduceMotion) return children;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.075, smoothWheel: true, anchors: true }}
    >
      {children}
    </ReactLenis>
  );
}
```

- [ ] **Step 3: Create shell components**

`PortfolioHeader.tsx` must render a normal `<header>` with the `KAPASIQUE` home link, `INDEX`, `WORK`, and an external `GITHUB ↗` link. `SceneProgress.tsx` must render a fixed `<output aria-live="off">` with `01—05` and a CSS custom property `--scene-progress`.

Use this public structure:

```tsx
export function PortfolioHeader() {
  return (
    <header className="portfolio-header">
      <a className="portfolio-header__brand" href="#top">KAPASIQUE</a>
      <nav aria-label="Primary navigation">
        <a href="#top">INDEX</a>
        <a href="#work">WORK</a>
        <a href="https://github.com/KapaSique" target="_blank" rel="noreferrer">GITHUB ↗</a>
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Add tokens and document foundations**

Create `src/styles/tokens.css` with:

```css
:root {
  --paper: #eeeae1;
  --carbon: #111111;
  --cobalt: #1646ff;
  --orange: #ff4d19;
  --graphite: #68645d;
  --line: color-mix(in srgb, var(--carbon) 22%, transparent);
  --font-display: "Archivo Variable", "Arial Narrow", sans-serif;
  --font-editorial: "Bodoni Moda Variable", "Times New Roman", serif;
  --font-mono: "IBM Plex Mono", monospace;
  --ease-cut: cubic-bezier(.16, 1, .3, 1);
  --page-pad: clamp(16px, 2.1vw, 36px);
}
```

Create `src/styles/base.css` with the reset, `color-scheme: light`, paper/carbon body colors, 16 px minimum body copy, visible `:focus-visible`, `.sr-only`, fixed low-opacity grain using a CSS radial/noise pattern, and `overflow-x: clip`. Do not create a glow cursor.

Update `src/main.tsx` imports to:

```ts
import "@fontsource-variable/archivo/index.css";
import "@fontsource-variable/bodoni-moda/index.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "lenis/dist/lenis.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/scenes.css";
import "./styles/motion.css";
import "./styles/responsive.css";
```

- [ ] **Step 5: Verify and commit the shell**

Run:

```bash
npm run lint
npm test
```

Expected: PASS.

Run:

```bash
git add src/motion src/components/PortfolioHeader.tsx src/components/SceneProgress.tsx src/styles src/main.tsx
git commit -m "feat: establish editorial shell and motion runtime"
```

---

### Task 5: Build the author/product collision hero

**Files:**
- Create: `src/components/CollisionHero.tsx`
- Create: `src/components/CollisionHero.test.tsx`
- Modify: `src/styles/scenes.css`
- Modify: `src/styles/motion.css`

**Interfaces:**
- Produces: `<CollisionHero />`.
- Consumes: `commercialProjects` and `<ContributionTape />`.
- Provides DOM hooks: `[data-hero-strip]`, `[data-hero-chase]`, `[data-hero-petmek]`, `[data-hero-exit]`.

- [ ] **Step 1: Write the failing first-viewport content test**

Create `src/components/CollisionHero.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CollisionHero } from "./CollisionHero";

vi.stubGlobal("fetch", vi.fn(() => new Promise(() => undefined)));

describe("CollisionHero", () => {
  it("introduces the author and both commercial products", () => {
    render(<CollisionHero />);
    expect(screen.getByRole("heading", { name: /artem stelmah/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /chase\.je/i })).toHaveAttribute("href", "https://chaseje.com");
    expect(screen.getByRole("link", { name: /petmek/i })).toHaveAttribute("href", "https://petmek.app");
    expect(screen.getByRole("region", { name: /github activity/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Verify the test fails**

Run:

```bash
npm test -- src/components/CollisionHero.test.tsx
```

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the semantic hero**

Create `CollisionHero.tsx` with:

```tsx
import { commercialProjects } from "../data/projects";
import { ContributionTape } from "./ContributionTape";

export function CollisionHero() {
  const [chase, petmek] = commercialProjects;
  return (
    <section className="collision-hero" id="top" data-scene="hero" aria-labelledby="hero-title">
      <div className="collision-hero__meta">
        <span>KAPASIQUE / YAKUTSK</span>
        <span>PRODUCTS, SYSTEMS, MOTION</span>
      </div>
      <h1 id="hero-title" className="collision-title" aria-label="Artem Stelmah">
        {["ARTEM", "STELMAH"].map((line) => (
          <span className="collision-title__line" key={line}>
            {[0, 1, 2].map((strip) => (
              <span key={strip} data-hero-strip aria-hidden={strip > 0}>{line}</span>
            ))}
          </span>
        ))}
      </h1>
      <a className="collision-window collision-window--chase" data-hero-chase href={chase.publicUrl}>
        <img src={chase.media[0].src} alt={chase.media[0].alt} width={chase.media[0].width} height={chase.media[0].height} />
        <span>01 / {chase.title}</span>
      </a>
      <a className="collision-window collision-window--petmek" data-hero-petmek href={petmek.publicUrl}>
        <img src={petmek.media[0].src} alt={petmek.media[0].alt} width={petmek.media[0].width} height={petmek.media[0].height} />
        <span>02 / {petmek.title}</span>
      </a>
      <div className="collision-hero__tape"><ContributionTape /></div>
      <a className="collision-hero__exit" data-hero-exit href="#work">ENTER WORK ↓</a>
    </section>
  );
}
```

- [ ] **Step 4: Implement the hero composition**

In `scenes.css`, define a `min-height: max(760px, 100svh)` scene, a 12-column grid, title size `clamp(5.4rem, 15vw, 14rem)`, absolute hard-cropped image windows, and the contribution tape along the bottom. In `motion.css`, define strip clip paths and CSS-variable transforms only. The DOM title must stay readable at `320px` width.

- [ ] **Step 5: Run the hero tests and commit**

Run:

```bash
npm test -- src/components/CollisionHero.test.tsx
npm run lint
```

Expected: PASS.

Run:

```bash
git add src/components/CollisionHero.tsx src/components/CollisionHero.test.tsx src/styles
git commit -m "feat: build the author and product collision hero"
```

---

### Task 6: Build the CHASE.JE commercial scene

**Files:**
- Create: `src/components/ChaseScene.tsx`
- Create: `src/components/CommercialScenes.test.tsx`
- Modify: `src/styles/scenes.css`
- Modify: `src/styles/motion.css`

**Interfaces:**
- Produces: `<ChaseScene />`.
- Consumes: `commercialProjects[0]`.
- Provides DOM hooks: `[data-chase-frame]` and `[data-chase-mask]`.

- [ ] **Step 1: Write the failing CHASE.JE contract**

Create the CHASE.JE test in `CommercialScenes.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChaseScene } from "./ChaseScene";

describe("commercial scenes", () => {
  it("presents CHASE.JE as a public commercial system", () => {
    render(<ChaseScene />);
    expect(screen.getByRole("heading", { name: "CHASE.JE" })).toBeInTheDocument();
    expect(screen.getByText(/bilingual private-boutique pwa/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /enter chase\.je/i })).toHaveAttribute("href", "https://chaseje.com");
    expect(document.body.textContent).not.toMatch(/github\.com\/KapaSique\/chaseje/i);
  });
});
```

- [ ] **Step 2: Verify the CHASE.JE test fails**

Run:

```bash
npm test -- src/components/CommercialScenes.test.tsx
```

Expected: FAIL because `ChaseScene` does not exist.

- [ ] **Step 3: Implement the contact-sheet narrative**

`ChaseScene.tsx` must render:

- scene number and project label;
- the exact statement and description from the catalog;
- all three factual labels;
- four real images with declared dimensions and alt text;
- a normal external link labeled `ENTER CHASE.JE ↗`;
- a contact-sheet ordered list, not browser/device frames.

Use:

```tsx
export function ChaseScene() {
  const project = commercialProjects[0];
  return (
    <section className="project-scene chase-scene" id="work" data-scene="chase" aria-labelledby="chase-title">
      <header className="project-scene__header">
        <span>02 / COMMERCIAL SYSTEM</span>
        <h2 id="chase-title">{project.title}</h2>
        <p className="project-scene__statement">{project.statement}</p>
        <p>{project.description}</p>
      </header>
      <ol className="chase-contact-sheet">
        {project.media.map((media, index) => (
          <li key={media.src} data-chase-frame>
            <span>FRAME {String(index + 1).padStart(2, "0")}</span>
            <div data-chase-mask>
              <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading={index ? "lazy" : "eager"} />
            </div>
          </li>
        ))}
      </ol>
      <ul className="project-facts">{project.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
      <a className="project-scene__cta" href={project.publicUrl} target="_blank" rel="noreferrer">{project.cta} ↗</a>
    </section>
  );
}
```

- [ ] **Step 4: Style the CHASE.JE scene and commit**

Use an asymmetric horizontal contact sheet on desktop, paper/black imagery, editorial serif emphasis, square crops, thin rules, and no generic panel background. Add a mobile vertical contact sheet.

Run:

```bash
npm test -- src/components/CommercialScenes.test.tsx
npm run lint
git add src/components/ChaseScene.tsx src/components/CommercialScenes.test.tsx src/styles
git commit -m "feat: tell the CHASE.JE commercial story"
```

Expected: tests and lint PASS.

---

### Task 7: Build the Petmek input-to-action scene

**Files:**
- Create: `src/components/PetmekScene.tsx`
- Modify: `src/components/CommercialScenes.test.tsx`
- Modify: `src/styles/scenes.css`
- Modify: `src/styles/motion.css`

**Interfaces:**
- Produces: `<PetmekScene />`.
- Consumes: `commercialProjects[1]`.
- Provides DOM hooks: `[data-petmek-step]` and `[data-petmek-marker]`.

- [ ] **Step 1: Extend the commercial scene test with Petmek**

Add:

```tsx
import { PetmekScene } from "./PetmekScene";

it("presents Petmek as a public review-to-action product", () => {
  render(<PetmekScene />);
  expect(screen.getByRole("heading", { name: "PETMEK" })).toBeInTheDocument();
  expect(screen.getByText(/customer review/i)).toBeInTheDocument();
  expect(screen.getByText(/weekly report/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /open petmek/i })).toHaveAttribute("href", "https://petmek.app");
  expect(document.body.textContent).not.toMatch(/onrender\.com|github\.com\/OOOpetmek/i);
});
```

- [ ] **Step 2: Verify the Petmek test fails**

Run:

```bash
npm test -- src/components/CommercialScenes.test.tsx
```

Expected: FAIL because `PetmekScene` does not exist.

- [ ] **Step 3: Implement the review-to-action pipeline**

Create `PetmekScene.tsx`:

```tsx
import { commercialProjects } from "../data/projects";

const steps = [
  ["01", "CUSTOMER REVIEW", "A real customer leaves feedback."],
  ["02", "AI ANALYSIS", "The product extracts topic, sentiment, and risk."],
  ["03", "OWNER ACTION", "The cabinet turns the signal into a response."],
  ["04", "WEEKLY REPORT", "Recurring patterns become a readable operating brief."],
] as const;

export function PetmekScene() {
  const project = commercialProjects[1];
  return (
    <section className="project-scene petmek-scene" data-scene="petmek" aria-labelledby="petmek-title">
      <header className="project-scene__header">
        <span>03 / COMMERCIAL SYSTEM</span>
        <h2 id="petmek-title">{project.title}</h2>
        <p className="project-scene__statement">{project.statement}</p>
        <p>{project.description}</p>
      </header>
      <ol className="petmek-pipeline">
        {steps.map(([number, title, copy], index) => (
          <li key={title} data-petmek-step>
            <div className="petmek-pipeline__copy">
              <span>{number}</span><h3>{title}</h3><p>{copy}</p>
            </div>
            <img
              src={project.media[index].src}
              alt={project.media[index].alt}
              width={project.media[index].width}
              height={project.media[index].height}
              loading="lazy"
            />
          </li>
        ))}
        <i className="petmek-pipeline__marker" data-petmek-marker aria-hidden="true" />
      </ol>
      <ul className="project-facts">{project.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
      <a className="project-scene__cta" href={project.publicUrl} target="_blank" rel="noreferrer">{project.cta} ↗</a>
    </section>
  );
}
```

- [ ] **Step 4: Style the Petmek scene and commit**

Use carbon/orange as the section field, cobalt state marks, clipped screenshot fragments, an explicit connecting line, and progressively larger report imagery. Do not use a device frame or dashboard-card wrapper.

Run:

```bash
npm test -- src/components/CommercialScenes.test.tsx
npm run lint
git add src/components/PetmekScene.tsx src/components/CommercialScenes.test.tsx src/styles
git commit -m "feat: map Petmek feedback into owner action"
```

Expected: tests and lint PASS.

---

### Task 8: Build the experimental reel and contact finale

**Files:**
- Create: `src/components/ExperimentReel.tsx`
- Create: `src/components/ContactScene.tsx`
- Create: `src/components/ExperimentReel.test.tsx`
- Modify: `src/styles/scenes.css`
- Modify: `src/styles/motion.css`

**Interfaces:**
- Produces: `<ExperimentReel />` and `<ContactScene />`.
- Consumes: `experiments`.
- Provides DOM hook: `[data-experiment-track]`.

- [ ] **Step 1: Write the failing reel contract**

Create `src/components/ExperimentReel.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ExperimentReel } from "./ExperimentReel";

describe("ExperimentReel", () => {
  it("shows the selected experiments in the approved order", () => {
    render(<ExperimentReel />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((node) => node.textContent);
    expect(headings).toEqual(["TrustLens", "Second Look", "Checkers Solver", "Maze Crawler"]);
    expect(document.body).not.toHaveTextContent("Kaggle Dominator");
    expect(document.body).not.toHaveTextContent("Paper Maestro");
  });
});
```

- [ ] **Step 2: Verify the test fails**

Run:

```bash
npm test -- src/components/ExperimentReel.test.tsx
```

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the reel and finale**

`ExperimentReel` must render one `<article>` per project, preserve the data order, show one statement and one proof point, use real banners where provided, use a board/search schematic for Checkers Solver, and use a maze route schematic for Maze Crawler. Links remain normal anchors.

`ContactScene` must render:

```tsx
export function ContactScene() {
  return (
    <section className="contact-scene" data-scene="contact" aria-labelledby="contact-title">
      <span>05 / YAKUTSK — 62.03°N</span>
      <h2 id="contact-title">LET&apos;S BUILD SOMETHING THAT WORKS</h2>
      <p>Products, systems, ML/CV, and motion — designed as one working thing.</p>
      <div className="contact-scene__links">
        <a href="https://github.com/KapaSique" target="_blank" rel="noreferrer">GITHUB ↗</a>
        <a href="#top">BACK TO INDEX ↑</a>
      </div>
      <ContributionTape compact />
    </section>
  );
}
```

- [ ] **Step 4: Style, test, and commit**

Desktop: pin only the experiment track, vary frame widths, overlap edges by no more than 5vw, and expose all text without hover. Mobile: remove pinning and stack the articles.

Run:

```bash
npm test -- src/components/ExperimentReel.test.tsx
npm run lint
git add src/components/ExperimentReel.tsx src/components/ContactScene.tsx src/components/ExperimentReel.test.tsx src/styles
git commit -m "feat: add the selected experiment reel and finale"
```

Expected: PASS.

---

### Task 9: Add the disposable editorial WebGL layer and scoped scene timelines

**Files:**
- Create: `src/webgl/editorialRenderer.ts`
- Create: `src/webgl/editorialRenderer.test.ts`
- Create: `src/components/EditorialCanvas.tsx`
- Create: `src/motion/usePortfolioMotion.ts`
- Modify: `src/styles/motion.css`
- Modify: `src/styles/responsive.css`

**Interfaces:**
- Produces: `canUseEditorialCanvas(capabilities): boolean`.
- Produces: `createEditorialRenderer(canvas, sources): Promise<EditorialController>`.
- Produces: `EditorialController` with `setMix`, `setIntensity`, `resize`, and `destroy`.
- Produces: `<EditorialCanvas controllerRef />`.
- Consumes: hero/scene DOM hooks and real CHASE.JE/Petmek media.

- [ ] **Step 1: Write the failing capability policy test**

Create `src/webgl/editorialRenderer.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { canUseEditorialCanvas } from "./editorialRenderer";

describe("editorial canvas policy", () => {
  it("disables WebGL for reduced motion and narrow low-memory devices", () => {
    expect(canUseEditorialCanvas({ reducedMotion: true, viewportWidth: 1440, deviceMemory: 8, webgl: true })).toBe(false);
    expect(canUseEditorialCanvas({ reducedMotion: false, viewportWidth: 390, deviceMemory: 2, webgl: true })).toBe(false);
  });

  it("allows the desktop experience when WebGL is available", () => {
    expect(canUseEditorialCanvas({ reducedMotion: false, viewportWidth: 1440, deviceMemory: 8, webgl: true })).toBe(true);
  });
});
```

- [ ] **Step 2: Verify the capability test fails**

Run:

```bash
npm test -- src/webgl/editorialRenderer.test.ts
```

Expected: FAIL because the renderer module does not exist.

- [ ] **Step 3: Implement the renderer policy and controller**

`editorialRenderer.ts` must export:

```ts
export type CanvasCapabilities = {
  reducedMotion: boolean;
  viewportWidth: number;
  deviceMemory?: number;
  webgl: boolean;
};

export type EditorialController = {
  setMix(value: number): void;
  setIntensity(value: number): void;
  resize(): void;
  destroy(): void;
};

export function canUseEditorialCanvas(value: CanvasCapabilities) {
  if (!value.webgl || value.reducedMotion) return false;
  if (value.viewportWidth < 640 && (value.deviceMemory ?? 4) <= 2) return false;
  return true;
}
```

`createEditorialRenderer` must use:

- `new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" })`;
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))`;
- an orthographic camera and one `PlaneGeometry(2, 2)`;
- two `TextureLoader.loadAsync` textures with `texture.colorSpace = SRGBColorSpace`;
- a `ShaderMaterial` with `uTextureA`, `uTextureB`, `uMix`, `uIntensity`, and `uResolution`;
- a fragment shader that creates a 4×4 ordered dither threshold and a small horizontal UV displacement before `mix(textureA, textureB, thresholdedMix)`;
- rendering only when a uniform changes, resize occurs, or the canvas is visible;
- `ResizeObserver` for the canvas;
- `destroy()` that disconnects the observer, cancels the frame, disposes both textures, material, geometry, and renderer.

- [ ] **Step 4: Wrap the renderer in React**

`EditorialCanvas.tsx` must:

- use `useReducedMotion`;
- test WebGL support with a temporary canvas;
- apply the capability policy;
- lazy-import `createEditorialRenderer`;
- load `/media/chase/archive-room.jpg` and `/media/petmek/overview.png`;
- place the controller into the supplied mutable ref;
- destroy and clear the controller on unmount;
- return `null` when disabled;
- render `<canvas className="editorial-canvas" aria-hidden="true" />` when enabled.

- [ ] **Step 5: Implement scoped scroll timelines**

Create `usePortfolioMotion.ts` with one `useGSAP` call scoped to the app root:

- hero entrance timeline: title strips, image windows, contribution tape;
- hero exit timeline: strips compress and the canvas mix moves from CHASE.JE to Petmek;
- CHASE.JE timeline: contact-sheet frames translate at differing rates and masks reveal;
- Petmek timeline: steps activate sequentially and the marker follows the pipeline;
- experiment timeline: desktop-only horizontal track translation;
- scene progress callbacks update the `SceneProgress` output;
- `ScrollTrigger.matchMedia()` or `gsap.matchMedia()` must isolate desktop/mobile/reduced-motion branches;
- return cleanup through `useGSAP`/GSAP context;
- call `ScrollTrigger.refresh()` after `document.fonts.ready` and image decoding.

- [ ] **Step 6: Run unit gates and commit**

Run:

```bash
npm test -- src/webgl/editorialRenderer.test.ts
npm run lint
npm test
```

Expected: PASS.

Run:

```bash
git add src/webgl src/components/EditorialCanvas.tsx src/motion/usePortfolioMotion.ts src/styles
git commit -m "feat: direct editorial motion with GSAP and WebGL"
```

---

### Task 10: Compose the page, remove the old template, and verify production

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles/scenes.css`
- Modify: `src/styles/motion.css`
- Modify: `src/styles/responsive.css`
- Modify: `index.html`
- Modify: `README.md`
- Delete: `src/components/ContributionTracker.tsx`
- Delete: `src/components/ProjectVisuals.tsx`
- Delete: `src/styles.css`

**Interfaces:**
- Consumes: every component and motion interface from Tasks 3–9.
- Produces: the final single-route portfolio and production documentation.

- [ ] **Step 1: Replace `App.tsx` with semantic composition**

Use:

```tsx
import { useRef } from "react";
import type { EditorialController } from "./webgl/editorialRenderer";
import { SmoothScroll } from "./motion/SmoothScroll";
import { usePortfolioMotion } from "./motion/usePortfolioMotion";
import { PortfolioHeader } from "./components/PortfolioHeader";
import { SceneProgress } from "./components/SceneProgress";
import { EditorialCanvas } from "./components/EditorialCanvas";
import { CollisionHero } from "./components/CollisionHero";
import { ChaseScene } from "./components/ChaseScene";
import { PetmekScene } from "./components/PetmekScene";
import { ExperimentReel } from "./components/ExperimentReel";
import { ContactScene } from "./components/ContactScene";

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasController = useRef<EditorialController | null>(null);
  usePortfolioMotion(rootRef, canvasController);

  return (
    <SmoothScroll>
      <div className="portfolio" ref={rootRef}>
        <a className="skip-link" href="#work">Skip to selected work</a>
        <PortfolioHeader />
        <SceneProgress />
        <EditorialCanvas controllerRef={canvasController} />
        <main>
          <CollisionHero />
          <ChaseScene />
          <PetmekScene />
          <ExperimentReel />
          <ContactScene />
        </main>
      </div>
    </SmoothScroll>
  );
}
```

- [ ] **Step 2: Complete responsive and reduced-motion rules**

`responsive.css` must include:

```css
@media (max-width: 767px) {
  .collision-hero { min-height: 100svh; }
  .collision-title { font-size: clamp(4.5rem, 24vw, 8rem); }
  .collision-window { position: absolute; width: 42vw; }
  .chase-contact-sheet,
  .petmek-pipeline,
  .experiment-reel__track { display: grid; transform: none !important; }
  .experiment-reel { overflow: visible; }
  .editorial-canvas { display: none; }
  a, button { min-height: 44px; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
  [data-hero-strip],
  [data-chase-frame],
  [data-petmek-step],
  [data-experiment-track] { transform: none !important; opacity: 1 !important; }
  .editorial-canvas { display: none; }
}
```

Finish desktop CSS so no section uses a reusable rounded card shell, no meaningful text depends on hover, and the contribution tape retains truthful day cells.

- [ ] **Step 3: Update metadata and documentation**

Set `index.html`:

```html
<meta name="theme-color" content="#EEEAE1" />
<meta name="description" content="Artem Stelmah / KapaSique — commercial products, technical systems, ML/CV, and motion from Yakutsk." />
<meta property="og:title" content="Artem Stelmah / KapaSique — Products, Systems, Motion" />
<meta property="og:description" content="CHASE.JE, Petmek, and selected systems work." />
<title>Artem Stelmah / KapaSique — Products, Systems, Motion</title>
```

Update `README.md` with:

- `npm install`, `npm run dev`, `npm test`, `npm run lint`, and `npm run build`;
- scene/component architecture;
- GSAP/Lenis synchronization boundary;
- Three.js fallback/disposal behavior;
- media provenance from the two owner-controlled local repositories and two public GitHub banners;
- the GitHub activity fallback capture date.

- [ ] **Step 4: Remove replaced template files**

Run:

```bash
rm src/components/ContributionTracker.tsx src/components/ProjectVisuals.tsx src/styles.css
```

Then confirm no imports remain:

```bash
rg "ContributionTracker|ProjectVisual|styles\\.css|Bricolage|react-activity-calendar" src package.json
```

Expected: no matches.

- [ ] **Step 5: Run automated production gates**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected:

- all Vitest suites PASS;
- TypeScript exits 0;
- Vite production build exits 0;
- no asset exceeds the Task 2 media budget.

- [ ] **Step 6: Run browser verification**

Start:

```bash
npm run dev -- --host 127.0.0.1
```

Use the in-app browser to verify:

1. 1440 × 1000 desktop:
   - Artem, CHASE.JE, Petmek, and the GitHub tape appear in the first viewport;
   - scroll reaches all five scenes;
   - CHASE.JE and Petmek links open the correct public sites;
   - no runtime warnings or errors;
   - no horizontal document overflow.
2. 390 × 844 mobile:
   - both commercial project signals remain visible in the hero;
   - no pinned horizontal scroll traps;
   - body copy is at least 16 px;
   - links and navigation remain tappable.
3. Reduced motion:
   - canvas absent;
   - content order complete;
   - no pinned scene traps.
4. Keyboard:
   - skip link works;
   - focus is visible;
   - all destinations are reachable.

- [ ] **Step 7: Inspect the production bundle**

Run:

```bash
find dist/assets -type f -maxdepth 1 -print0 | xargs -0 ls -lh
```

If the initial JavaScript bundle exceeds approximately 300 KB gzip, lazy-load `EditorialCanvas` and Three.js using `React.lazy` and confirm the initial application chunk drops below the budget while the canvas still loads after the hero becomes interactive.

- [ ] **Step 8: Commit the complete redesign**

Run:

```bash
git add src index.html README.md package.json package-lock.json public docs
git commit -m "feat: rebuild portfolio as editorial collision"
git status --short
```

Expected: clean worktree.

---

## Self-Review

### Spec coverage

- First viewport identity and both commercial products: Task 5.
- Truthful GitHub tape and fallback disclosure: Task 3.
- CHASE.JE commercial narrative and real media: Tasks 2 and 6.
- Petmek review-to-action narrative and real media: Tasks 2 and 7.
- Approved experiment list and removal of skill repositories: Tasks 1 and 8.
- Editorial palette/type and removal of AI-template conventions: Tasks 4, 5–8, and 10.
- GSAP/Lenis/Motion ownership and one disposable Three.js canvas: Tasks 4 and 9.
- Mobile, accessibility, reduced motion, privacy, performance, and production verification: Tasks 1, 2, 9, and 10.

### Placeholder scan

The plan contains no `TBD`, deferred implementation markers, unspecified error-handling steps, or unnamed tests. Every created interface is assigned to a task and consumed by named later tasks.

### Type consistency

- `CommercialProject`, `ExperimentProject`, and `ProjectMedia` originate in `src/data/projects.ts`.
- `Contribution`, `ContributionWeek`, `ContributionSummary`, and `GitHubContributionState` have one declared source each.
- `EditorialController` is declared in `src/webgl/editorialRenderer.ts` and consumed by `EditorialCanvas`, `usePortfolioMotion`, and `App`.
- GSAP registration is centralized in `src/motion/gsap.ts`; no later task registers the plugins again.
