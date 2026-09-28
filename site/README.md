# rajpatil.dev

Personal site. Astro, static, no client framework.

## Why it looks like this

The previous version was a terminal-metaphor SPA: ~6,700 LOC, three.js + GSAP +
framer-motion + mermaid, a fake boot sequence, and a 4.6MB `dist` whose main
bundle was 948KB. It had no routing, so no project had a URL — which meant the
best thing on it could not be linked to or forwarded.

This version inverts that. The content is the evidence; the design gets out of
its way. The one piece of interactivity is on `/klrb`, because that page has
something worth interacting with: you can run the ablation yourself and watch
the model's conclusion survive the removal of the evidence that justified it.

## Budget

Enforced in CI by `npm run budget` — the build fails if it regresses.

| | budget | actual |
|---|---|---|
| JS (external files) | 50KB | **7.4KB** |
| CSS (external files) | 30KB | **0KB** (inlined) |
| any page, gzipped | 60KB | ~9KB max |
| whole site | 900KB | ~270KB |

That 7.4KB is the whole homepage cluster simulation — service graph, traffic,
failure propagation, the investigation sweep and the incident state machine.
It is deferred, paused off-screen and on hidden tabs, and replaced by a static
description under `prefers-reduced-motion`, so it never touches LCP. The
`/atlas` and `/klrb` demos are inline and page-scoped. Styles are inlined.

Link-preview cards under `/og` are budgeted separately because crawlers fetch
them and browsers never do.

## Content

`src/data/site.ts` is the single source of truth. Rule: **if a number appears on
a page it must be checkable by the reader.** Star counts were verified against
the GitHub API and are dated in that file — re-verify them before you quote them
again, because they move.

## Develop

```bash
npm install
npm run dev      # localhost:4321
npm run build
npm run budget   # fails on regression
```

## Deploy

Static output in `dist/`. Cloudflare Pages: build `npm run build`, output
`site/dist`. `public/_headers` is Pages/Netlify syntax.

## Type

Two self-hosted variable faces: Space Grotesk for display, Instrument Sans for
text, with the local mono stack for labels. Subset to the ranges this site
actually sets — ASCII, Latin-1 for the é in "résumé", the punctuation and a few
symbols — which brings them to 18KB and 27KB. Both are preloaded.

The fallback faces carry metric overrides solved empirically against the real
headings and paragraphs rather than an a-z average: that average put the
display face 8.4% out on the actual headline, which is worse than no adjustment
at all. At the shipped values body text matches its fallback within 0.45% and
wrapping headings within 4.5%, so the swap does not reflow the page.

Regenerate with `pyftsubset` if the copy ever needs a glyph outside those
ranges — a missing glyph fails silently as a fallback substitution.

## The renderer

`src/components/Cluster.astro` renders the hero with hand-written WebGL — two
shader programs and ~70 lines of matrix maths in `src/lib/gl.ts`, rather than
150KB of engine to draw ten nodes and sixty particles.

It carries a Canvas 2D rasteriser of the *same* 3D scene, used when WebGL is
unavailable, when a live context is lost (`webglcontextlost` — a GPU reset or a
backgrounded mobile tab really does take it away), and when a self-check finds
that GL is alive but drawing nothing. That last case is the one worth having:
a context that survives but renders an empty box is invisible to every other
kind of error handling, so after a few frames the renderer reads back a block
of its own framebuffer and falls back if it is blank.

Tier labels are real HTML tracking projected 3D positions, so they stay crisp
at any DPI.

## The simulation

`src/components/Cluster.astro` is the homepage hero. It is a real simulation,
not a looping video: particles are routed hop by hop through the tiers, a
killed pod stays in the service's endpoints and keeps taking its share of
traffic, and the error rate on the HUD is `failed / (failed + completed)` over
a decaying window rather than a number chosen to look alarming. Kill a replica
out of three and it settles around 25-30%, because that is what actually
happens.

The fault types and the evidence they produce come from KLRB's scenarios.

## Known gaps

- The root-cause text in the hero simulation and in `/klrb`'s demo is
  representative of each scenario, not a verbatim published run. Swap in real
  harness output and delete the caveats in `src/components/Cluster.astro` and
  `src/components/ConfidentLiar.astro`.
- `tf.why` is not on PyPI yet. `/tf-why` says so explicitly. Publish it, then
  update `scope` in `src/data/site.ts` and remove the status note.
