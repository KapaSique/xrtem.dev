# xrtem.dev

Portfolio of **Artem Svinoboev** — full-stack work for brands and businesses:
sites, stores, platforms and Telegram bots, taken all the way to real users.

An immersive video homepage, three selected cases, services and contacts.
The menu opens into a light project index. Russian by default, English one
click away in the menu.

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 — tokens in `@theme`, motion as CSS keyframes (`app/globals.css`) |
| Type | Cormorant Garamond · Onest · JetBrains Mono |
| Tests | Vitest + Testing Library — `npm test` |
| Media | Separate desktop and mobile MP4 backgrounds, with still fallbacks |

## Content

Every string lives in [`content/site.ts`](content/site.ts) as an `{ en, ru }` pair.
`content/site.test.ts` refuses an empty translation and the «X, а не Y» construction.

## Background video

The first screen and contact section use the supplied desktop and mobile
background films in `public/media/metalab/`. `BackgroundVideo` chooses the
mobile crop below 768px, reselects on resize, and uses still frames when the
visitor requests reduced motion or data saving. The footer waits until it is
near the viewport before playing.

## Earlier glass stills

The scene is code: [`blender/x_scene.py`](blender/x_scene.py) builds the geometry,
the studio (a generated HDR), the glass and the camera. LuxCore gives real spectral
dispersion; Cycles is there for fast drafts.

```bash
blender/render.sh still luxcore 0            # one frame for look-dev
blender/render.sh loop luxcore 0 180         # the loop, ~4.8 h on an M4 Pro
blender/render.sh macro luxcore --budget 600 # the About close-up
blender/encode.sh blender/out/loop-luxcore blender/out/macro-luxcore.png
```

The retained macro image is used in About; the poster still supplies the Open
Graph image. The original loop is no longer loaded by the site.

LuxCore note: pyluxcore 2.11.2 sRGB-encodes float environment maps on load, which
`x_scene.py` undoes with `world.luxcore.gamma = 2.2`.

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server on :3000 |
| `npm test` | Unit tests |
| `npm run lint` | Type check |
| `npm run build` | Production build |
