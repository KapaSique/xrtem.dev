# xrtem.dev

Portfolio of **Artem Svinoboev** — ML, computer vision and full-stack engineering.

A single page on warm paper: seven projects, four measured results, two languages,
and three deliberate pieces of motion. Everything else is hairlines and space.

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16 (App Router, RSC) |
| Styling | Tailwind CSS v4 with `@theme` tokens |
| Motion | `motion` (Framer) — mask reveals, scroll-velocity marquee, sticky crossfade |
| Type | Inter · Playfair Display (italic accent) · JetBrains Mono |
| Hosting | Vercel |

## Design system

Three tokens carry the whole page: warm paper `#faf9f7`, graphite ink `#1a1a18`,
and an 11% hairline. Colour appears exactly once — the live-status dot. Display
type is never bold; weight comes from size. Mono is reserved for labels, indices
and metrics.

## Motion

Three moments, and nothing else:

1. **Hero** — per-word mask reveal; each word rises out of its own overflow box.
2. **Work** — a sticky media column crossfades to whichever row sits at the
   viewport's midline, while inactive rows drop to 45% opacity.
3. **Toolchain** — an infinite marquee whose speed and direction are coupled to
   scroll velocity.

All three collapse under `prefers-reduced-motion`.

## Content

Every project fact, metric and link lives in [`content/site.ts`](content/site.ts)
as an `{ en, ru }` pair. There is no CMS and no translation runtime — the language
toggle swaps a key.

The contribution strip in *About* is scraped server-side from the public GitHub
calendar with a one-hour ISR window. Any failure returns `null` and the strip
simply does not render.

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

## Deploy

```bash
vercel deploy --prod --yes --scope batteryofsprunk-6379s-projects
```
