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
| JS (external files) | 50KB | **0KB** |
| CSS (external files) | 30KB | **0KB** (inlined) |
| any page, gzipped | 60KB | 8.3KB max (`/klrb`) |
| whole site | 900KB | ~180KB |

Homepage is ~7KB gzipped. Styles are inlined by Astro; the only script is the
`/klrb` demo, inline and page-scoped.

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

## Known gaps

- `/klrb`'s demo uses representative response text for the OOMKill scenario, not
  a verbatim published run. Swap in real harness output and delete the caveat in
  `src/components/ConfidentLiar.astro`.
- `tf.why` is not on PyPI yet. `/tf-why` says so explicitly. Publish it, then
  update `scope` in `src/data/site.ts` and remove the status note.
