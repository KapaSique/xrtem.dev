# Editorial Collision Portfolio — Design Specification

**Status:** Approved concept, pending specification review  
**Date:** 2026-07-17  
**Site:** `xrtem.dev`  
**Owner:** Artem Stelmah / KapaSique

## 1. Purpose

Rebuild the existing portfolio into an authored, cinematic landing page that presents Artem first as a creative technical builder and immediately proves that identity through two real commercial products:

- CHASE.JE — a private archive fashion boutique with a bilingual PWA and a serverless content-management flow.
- Petmek — a multi-tenant loyalty product with an owner cabinet, AI-assisted review analysis, campaigns, and reports.

The portfolio must feel like a directed piece of work rather than a collection of interchangeable developer cards. Animation must communicate the contrast between fashion/editorial work and product/data engineering, not decorate otherwise generic layouts.

## 2. Goals

1. Establish Artem/KapaSique as the author within the first viewport.
2. Make CHASE.JE and Petmek visible within that same first viewport.
3. Turn GitHub activity into a signature visual element rather than a stock calendar widget.
4. Give commercial work priority over skills, tools, and agent-skill repositories.
5. Use expressive motion while preserving legibility, control, accessibility, and mobile performance.
6. Make the site credible to both potential clients and technically experienced collaborators.

## 3. Non-goals

- Reproducing Framer AI's visual language.
- Building a conventional case-study grid.
- Listing every technology or repository.
- Exposing private repository URLs, code, credentials, client data, or internal operational details.
- Adding a content-management system to the portfolio.
- Making every interaction WebGL-driven.

## 4. Audience and desired impression

Primary audiences:

- founders and product owners looking for someone who can ship a complete product;
- creative teams looking for strong implementation and motion craft;
- technical collaborators assessing engineering depth.

Desired first impression:

> Artem can move between visual culture and serious product systems without producing generic work in either world.

The page should feel controlled, physical, slightly abrasive, and confident. It should not feel polished into anonymity.

## 5. Core design principles

### 5.1 One continuous composition

Sections should behave like scenes in one edited sequence. Avoid repeated containers, equal-radius panels, uniform project cards, and reusable "feature section" patterns.

### 5.2 Real material over invented decoration

Use real CHASE.JE photography and real Petmek interface/report imagery. Generated gradients, abstract glass objects, glowing spheres, and fake dashboard statistics are prohibited.

### 5.3 Motion with a narrative job

Every major animation must do at least one of the following:

- introduce a project world;
- reveal a relationship between product inputs and outputs;
- transition between fashion and engineering visual systems;
- preserve spatial continuity during scroll.

### 5.4 Deliberate contrast

CHASE.JE should feel slow, tactile, editorial, and image-led. Petmek should feel responsive, structured, data-led, and operational. The portfolio identity unifies both through typography, layout rhythm, and motion timing.

## 6. Information architecture

The page is a single continuous route with five scenes:

1. Collision hero
2. CHASE.JE case study
3. Petmek case study
4. Selected experiments
5. Author/contact finale

Persistent navigation is intentionally minimal:

- `INDEX`
- `WORK`
- `GITHUB`
- a small scene counter/progress indicator

The navigation must not become a floating pill.

## 7. Scene design

### 7.1 Scene 01 — Collision hero

The hero fills at least one viewport and establishes all primary signals without a card layout.

Content:

- primary title: `ARTEM STELMAH`;
- secondary identifier: `KAPASIQUE / YAKUTSK`;
- compact role statement: `PRODUCTS, SYSTEMS, MOTION`;
- two commercial project labels: `CHASE.JE` and `PETMEK`;
- live/fallback GitHub activity ribbon;
- direct scroll cue.

Composition:

- the primary title is split into horizontal typographic strips;
- CHASE.JE imagery appears inside or behind the left-side letter masks;
- Petmek UI fragments and data marks appear inside or behind the right-side masks;
- the two image systems never sit in rounded browser mockups;
- title, imagery, and project labels shift at different, restrained depths with pointer movement;
- the title remains readable at all times.

GitHub activity:

- represent 52 weeks as a horizontally flowing data tape rather than embedding the stock calendar component;
- retain individual-day activity cells so the information is truthful;
- show current contribution total and profile handle;
- provide an accessible text summary and a direct link to `github.com/KapaSique`;
- use the existing verified fallback snapshot when the public endpoint is unavailable.

Hero exit:

- scrolling compresses the title strips into a narrow contact-sheet band;
- that band becomes the opening frame of the CHASE.JE scene;
- no hard section fade or generic parallax dissolve.

### 7.2 Scene 02 — CHASE.JE

Purpose:

Present CHASE.JE as a designed commercial system, not only as an attractive storefront.

Narrative order:

1. private archive positioning;
2. bilingual customer experience;
3. curated catalog and access model;
4. lightweight serverless content-management workflow;
5. live-site link.

Visual behavior:

- use full-bleed real photographs and cropped interface details;
- images move like a physical contact sheet with differing frame widths;
- SVG masks and dither transitions reveal new images;
- typography alternates between large editorial statements and small catalog metadata;
- the color field is predominantly paper, black, and desaturated imagery;
- cobalt appears only as portfolio-level annotation.

Copy must be concise and factual. Do not expose private source links or private administrative details beyond the existence of a protected content workflow.

Primary CTA:

- `ENTER CHASE.JE`

### 7.3 Scene 03 — Petmek

Purpose:

Show how the product turns customer feedback into operational action for a business owner.

Narrative flow:

`CUSTOMER REVIEW → AI ANALYSIS → RISK / INSIGHT → OWNER ACTION → WEEKLY REPORT`

Visual behavior:

- Petmek's real cabinet, review, and report screenshots form a scroll-driven data pipeline;
- screenshots are cropped into functional fragments rather than placed in device frames;
- a line or moving marker connects the input and output stages;
- signal orange becomes dominant while cobalt marks system states and navigation;
- numerical and status transitions are mechanical and fast, contrasting with CHASE.JE's slower movement;
- the final report unfolds into a readable full-width result.

Content should mention:

- multi-tenant loyalty product;
- separate business context and owner cabinet;
- AI-assisted review analysis;
- campaigns and reports;
- full product stack across frontend, API, data, and messaging.

Do not publish internal infrastructure URLs, credentials, customer information, or private repository links.

Primary CTA:

- `OPEN PETMEK`

### 7.4 Scene 04 — Selected experiments

This section replaces the current portfolio card grid and the technology ticker.

Included work:

1. TrustLens
2. Second Look
3. Checkers Solver
4. Maze Crawler

Excluded from the main showcase:

- Kaggle Dominator
- Paper Maestro
- standalone skills/tools that do not represent a complete user-facing or technically substantial project

Layout:

- a pinned horizontal reel with four differently sized frames;
- each project has one strong visual, one sentence, one proof point, and one destination;
- frames overlap slightly and respond to scroll velocity;
- no repeated tag clouds or identical metric rows;
- public source and live-demo links are shown only when verified.

On mobile, the reel becomes a vertical sequence with the same asymmetric crop and ordering.

### 7.5 Scene 05 — Author and contact

Content:

- short first-person statement;
- location: Yakutsk;
- GitHub profile;
- verified public contact channel(s);
- optional availability state if it is still accurate at implementation time.

The final CTA is typographic and direct:

`LET'S BUILD SOMETHING THAT WORKS`

The footer closes the motion loop by returning the contribution tape or title-strip motif in a quieter form.

## 8. Visual system

### 8.1 Palette

- Paper: `#EEEAE1`
- Carbon: `#111111`
- Cobalt: `#1646FF`
- Signal orange: `#FF4D19`
- Muted graphite: `#68645D`

The paper color is the default surface. Carbon is the default type color. Cobalt belongs to portfolio annotations and navigation. Orange belongs mainly to Petmek and active states.

No purple neon, acid green, glass gradients, or broad glow effects.

### 8.2 Typography

Use three clearly separated roles:

- condensed/industrial display face for the author title and scene statements;
- high-contrast editorial serif for CHASE.JE accents and selected emphasis;
- mono face for coordinates, GitHub data, scene numbers, and system labels.

All fonts must be locally bundled and licensed for web use. The existing Bricolage Grotesque should not remain the primary display identity.

Typography may crop at the viewport edge intentionally, but meaningful text must remain available to assistive technology and must not cause horizontal document overflow.

### 8.3 Texture and image treatment

- subtle print grain applied as a low-opacity fixed texture;
- threshold/dither treatment only during transitions or selected still states;
- hard rectangular crops, no universal border radius;
- thin rules, crop marks, contact-sheet numbers, and technical annotations;
- shadows used sparingly and only to establish physical layer separation.

## 9. Motion system

### 9.1 Responsibilities

- GSAP + ScrollTrigger: scene timelines, pinning, strip transformations, horizontal reel, SVG mask sequencing.
- Lenis: smooth-scroll input and ScrollTrigger synchronization.
- Three.js: one fixed, shared WebGL canvas for image dither/distortion transitions.
- Motion: isolated React entrance/exit and small pointer-driven responses only.
- CSS: hover states, typography transitions, and noncritical looping details.

GSAP and Motion must never animate the same property on the same element.

### 9.2 Timing language

- macro scene transitions: 700–1400 ms equivalent movement;
- Petmek operational steps: 180–420 ms;
- CHASE.JE image transitions: 800–1600 ms;
- hover feedback: 120–220 ms;
- easing should favor decisive custom cubic curves over elastic or springy presets.

### 9.3 Pointer behavior

- no large glowing cursor;
- optional small cursor label for actionable image regions on precise pointer devices;
- no pointer-following effect on touch devices;
- interactive regions retain normal links, focus states, and expected browser behavior.

### 9.4 Reduced motion

When `prefers-reduced-motion: reduce` is active:

- disable Lenis smoothing;
- remove pinning that is not necessary for reading order;
- remove WebGL distortion;
- show final image states without transitions;
- preserve project order, copy, links, GitHub data, and visual contrast.

## 10. Responsive behavior

### Desktop

- primary target: 1280–1728 px wide;
- full narrative motion and shared WebGL canvas;
- pointer depth and horizontal experiment reel enabled.

### Tablet

- reduce pinned durations;
- simplify the number of simultaneous image layers;
- preserve title strips and the CHASE.JE/Petmek collision.

### Mobile

- no forced desktop split-screen;
- hero retains both commercial project signals using stacked image windows intersecting the title;
- GitHub tape is horizontally scrollable or auto-positioned without hijacking the page;
- case studies become vertical but retain distinct motion languages;
- WebGL is replaced by CSS/SVG treatment on low-power or unsupported devices;
- body copy remains at least 16 px;
- tap targets remain at least 44 px.

## 11. Content and data model

Project content should move into typed data objects rather than remain embedded across JSX.

Each project record should support:

- title;
- category;
- short statement;
- factual proof points;
- verified public URL;
- optional verified public repository URL;
- image assets and accessible descriptions;
- accent behavior;
- scene-specific narrative steps.

GitHub contribution data keeps:

- public live refresh;
- the existing locally stored verified snapshot as fallback;
- capture date disclosure when fallback data is shown.

No fabricated commercial metrics should be introduced.

## 12. Technical architecture

Retain:

- React 19;
- TypeScript;
- Vite;
- Lenis;
- existing contribution data/fallback logic.

Add:

- GSAP with ScrollTrigger;
- Three.js for the single shared shader canvas;
- image preprocessing suitable for responsive WebP/AVIF delivery.

Refactor:

- remove the current card-centric project components;
- replace the stack ticker with project-specific narrative content;
- separate page data, scene components, motion hooks, and WebGL renderer;
- keep WebGL isolated so the core document remains functional if the canvas fails.

Suggested component boundaries:

- `PortfolioShell`
- `CollisionHero`
- `ContributionTape`
- `ChaseScene`
- `PetmekScene`
- `ExperimentReel`
- `ContactScene`
- `SceneProgress`
- `EditorialCanvas`

## 13. Performance budget

Targets for a production build:

- JavaScript initial transfer kept below approximately 300 KB gzip where practical;
- WebGL assets loaded only when the hero is ready or during idle time;
- responsive images with explicit dimensions;
- no unbounded high-resolution textures;
- no more than one persistent WebGL canvas;
- stable layout with no intentional cumulative layout shift;
- mobile fallback must remain visually complete without WebGL.

If the Three.js implementation pushes the experience beyond the budget or causes mobile instability, the required fallback is an SVG/CSS dither sequence, not a degraded blank canvas.

## 14. Accessibility

- semantic landmarks and heading order;
- visible keyboard focus;
- all project destinations available as normal links;
- decorative canvas hidden from the accessibility tree;
- meaningful image alt text;
- contribution data includes a textual summary;
- contrast checked for paper/carbon, orange/carbon, and cobalt/paper combinations;
- motion and pinning must never trap keyboard or touch scrolling;
- no information communicated by color alone.

## 15. Verification

Before handoff:

1. TypeScript and production build succeed.
2. Desktop visual review at 1440 × 1000.
3. Mobile visual review at 390 × 844.
4. Keyboard-only navigation review.
5. Reduced-motion review.
6. Live GitHub data and fallback behavior review.
7. Link verification for CHASE.JE, Petmek, GitHub, public repositories, and demos.
8. Console review with no runtime errors.
9. Check for unintended horizontal overflow.
10. Confirm that no private repository or infrastructure details appear in the output.

## 16. Acceptance criteria

The redesign is complete when:

- Artem, CHASE.JE, and Petmek are all legible in the first viewport;
- the standard contribution-calendar component is no longer visually recognizable as a stock widget;
- CHASE.JE and Petmek each receive a distinct full narrative scene;
- commercial projects precede experimental work;
- no skills section, generic technology ticker, or uniform project-card grid remains;
- motion transitions establish continuity between scenes;
- mobile and reduced-motion versions preserve the same content and hierarchy;
- all verified links work;
- the production build passes;
- desktop and mobile browser checks show no blocking visual or runtime defects.

## 17. Self-review notes

The concept was checked against the failure mode identified in the existing portfolio:

- It removes the acid-green-on-dark palette, giant generic grotesk statement, glass/card grid, glow cursor, and technology badge/ticker conventions.
- It bases the visual identity on the tension between two real commercial products.
- It limits WebGL to one meaningful image-transition layer instead of making 3D decoration the concept.
- It defines an explicit mobile and reduced-motion reading order before implementation.
- It separates GSAP, Motion, Lenis, and Three.js responsibilities to avoid animation ownership conflicts.
- It avoids fabricated outcomes and protects private repository and infrastructure details.

