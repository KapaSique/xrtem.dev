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
