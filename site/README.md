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
| whole site | 900KB | ~210KB |

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
