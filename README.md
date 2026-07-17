# xrtem.dev

Artem Stelmah / KapaSique's editorial portfolio: commercial products,
technical systems, ML/CV, and motion from Yakutsk.

## Commands

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

## Architecture

The page is a single semantic document made of five scenes:

1. `CollisionHero` introduces Artem, CHASE.JE, Petmek, and the GitHub tape.
2. `ChaseScene` presents the private archive boutique through real imagery.
3. `PetmekScene` maps a customer review into AI analysis and owner action.
4. `ExperimentReel` contains four selected public technical projects.
5. `ContactScene` closes the page and repeats the activity signal.

Project copy, links, proof points, and media metadata live in
`src/data/projects.ts`. GitHub activity is fetched publicly and falls back to
the verified snapshot captured on 2026-07-17.

## Motion boundaries

- GSAP and ScrollTrigger own scene timelines, pinning, masks, and progress.
- Lenis runs with `autoRaf: false` and is synchronized through the GSAP ticker.
- A small local media-query hook owns reduced-motion detection.
- Three.js owns one fixed image-transition canvas. The renderer caps pixel
  ratio, renders on invalidation, and disposes textures, geometry, material,
  observer, frame, renderer, and WebGL context on unmount.
- The Three.js renderer is isolated in a lazy chunk; the initial application
  bundle does not import it.
- Mobile and `prefers-reduced-motion` keep the complete HTML reading order
  without the WebGL layer or pinned horizontal sequences.

## Media provenance

- CHASE.JE imagery is copied from the owner-controlled local CHASE.JE project.
- Petmek screenshots are copied from the owner-controlled OOOpetmek project.
- TrustLens and Second Look banners come from their public GitHub repositories
  and are locally optimized as WebP.

No private repository links, infrastructure endpoints, credentials, customer
records, or fabricated commercial metrics are included.
