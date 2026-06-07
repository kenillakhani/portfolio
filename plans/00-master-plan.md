# Portfolio — Master Build Plan

> Read `context/01-kenil-deep-context.md` first. That is the content source of truth.
> This file is the *how*: stack, tooling split, and the step-by-step order of operations.

---

## Decision 1 — The stack (chosen from first principles)

**Verdict: Astro 5 + Tailwind 4 + minimal islands, deployed on Vercel.**

Reasoning (the persona drove this, not fashion):
- The site is **content-first** (writing, project narratives, an "about"). 90% of it is
  static text. Shipping a full React/Next runtime to render mostly-static pages is exactly
  the kind of "made too complex" thing Kenil rejects in his own work.
- **Astro ships zero JS by default** and lets us add interactivity as *islands* only where
  it earns its place (e.g. one WebGL canvas, one animated diagram). A backend engineer's
  site that scores 100/100 Lighthouse with ~0 KB JS on the text pages *is itself the flex* —
  restraint as proof of taste. This matches "the craft is the proof he's an engineer."
- He already knows the React/Tailwind/Vercel ecosystem (resume: Next, Vercel, Tailwind),
  so Astro's `.astro` + occasional React island is a 1-hour ramp, not a new world.
- **Why not Next.js:** Next is the right tool when you have app-like state, auth, server
  actions. A portfolio has none of that. Next here = overkill = the anti-persona choice.
- **Why not plain HTML:** we want a component model, MD/MDX for the (future) blog, and
  type-safe content collections. Astro gives that without a runtime tax.

Locked libraries (keep the list short — every dep must justify itself):
- **Astro 5** — framework / static output
- **Tailwind 4** — styling (via `@tailwindcss/vite`)
- **@fontsource** or self-hosted fonts — no FOUT, no Google-Fonts network hop
- **astro:content** (MDX) — type-safe content collections for projects + blog
- Per-direction only:
  - Cinematic: **OGL** (tiny WebGL, ~10KB) for a starfield — NOT three.js (heavy).
    A single React/vanilla island, lazy-loaded, `prefers-reduced-motion` respected.
  - Diagrams: **hand-authored inline SVG** + a few lines of CSS/JS for the animated
    architecture diagram. No mermaid runtime, no d3. Draw it ourselves — it's nicer and lighter.
- **No** UI component library. Like his POS frontend — custom components. It reads as craft.

Hosting: **Vercel** (he knows it; Astro adapter is trivial). Domain wired later by him.

---

## Decision 2 — Where Claude *design* vs Claude *code* (his explicit question)

The honest answer: for THIS site, the highest-leverage "design tool" is **taste applied in
code**, not a Figma round-trip. But here's the principled split:

| Phase | Tool | Why |
|---|---|---|
| **Design exploration** (the 3 directions) | Build them **directly in Astro/HTML/CSS** as real, viewable pages | A static site IS the design tool. Real type, real spacing, real motion — no mockup-to-code translation loss. This is faster and truer than Figma for a code-native site. He picks from *running* pages, which is exactly what he asked for ("can't decide without output"). |
| **Type & color preview** | A small generated `/styleguide` page per direction | Lets him compare fonts/colors side by side in the browser. |
| **Visual QA after build** | `gstack`/`browse` skill (headless screenshots) + `design-review` skill | Catch spacing/hierarchy/AI-slop issues and fix in source with before/after screenshots. |
| **Optional: AI imagery** | Only if a direction needs a hero texture — generate, don't hand-draw | Most directions need *no* imagery; restraint. |
| **Implementation, content wiring, deploy** | Claude **Code** (this environment) | All of it. |

> Bottom line: we are NOT doing a Figma→code handoff. For a content-first, code-native
> engineer's site, designing *in code* is the first-principles choice. The "design tools"
> we use are: live preview pages, the browser, and the design-review/QA skills for polish.

---

## Decision 3 — Architecture (shared across all 3 directions)

```
portfolio/site/
  src/
    content/
      projects/        # one .mdx per project (devx, pos, crm, drone-sim, opg, ...)
      config.ts        # content collection schemas (zod)
    components/        # custom, per-section
    layouts/
    pages/
      index.astro      # home (hero + work + now + footer)
      work/[slug].astro# project detail (renders MDX)
      now.astro        # "what I'm learning"
      writing/index.astro  # blog index (empty-but-real)
      styleguide.astro # type/color preview
    styles/
  astro.config.mjs
```

Content lives in MDX so projects are data, not hardcoded markup — change once, render
everywhere. The three design directions share this content layer; they differ only in
`layouts/`, `components/`, `styles/`, and the home page composition. That means we build
the content ONCE and theme it three ways.

---

## Decision 4 — The three directions (built in full, per his request)

Each gets its own branch/folder so he can run all three and pick. See:
- `plans/01-direction-A-engineered-minimalism.md`
- `plans/02-direction-B-quietly-cinematic.md`
- `plans/03-direction-C-editorial.md`

Shared content (the MDX project files + about/now copy) is written once in
`plans/04-content-and-copy.md` and consumed by all three.

---

## Decision 5 — Step-by-step order of operations

1. **Scaffold** Astro + Tailwind + content collections + the shared content layer.
   → verify: `npm run build` clean, `/` renders placeholder, Lighthouse-able.
2. **Write content** (all project MDX + about/now copy) from the deep-context file.
   → verify: every A/B/C-tier project from context §4 has an MDX file, no invented facts.
3. **Build Direction A** (engineered minimalism) end-to-end.
   → verify: home + one project detail + now + writing + styleguide all render; 0 JS on text pages.
4. **Build Direction B** (quietly cinematic) — reuse content, new theme + the WebGL/diagram island.
   → verify: starfield respects reduced-motion; islands lazy-load; text pages still ~0 JS.
5. **Build Direction C** (editorial) — reuse content, typographic theme.
   → verify: reads beautifully at long-form; type scale correct.
6. **Screenshot all three** (gstack/browse), present to Kenil to choose.
   → verify: side-by-side screenshots of home + a project page for each.
7. **Polish the chosen one** (design-review skill), accessibility pass (a11y skill),
   performance pass (benchmark/Lighthouse).
   → verify: WCAG AA, Lighthouse ≥95 all categories, reduced-motion honored.
8. **Deploy to Vercel**, hand off domain wiring instructions.
   → verify: live preview URL loads, no console errors (canary).

---

## Guardrails carried from his CLAUDE.md
- Simplicity first — if a direction needs a heavy dep to look good, the design is wrong.
- Surgical — the 3 directions share one content layer; don't fork content.
- No false positives — every "done" is verified by a real build + screenshot, never "should work."
- Match his voice in all copy — terse, first-principles, no marketing fluff.
- Scrub every secret/PII from context §4 before anything ships.
