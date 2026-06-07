# Direction B — Quietly Cinematic

> Mostly restrained, with a few earned high-craft moments. The deep-tech pull made visible —
> but tastefully. Never a tech demo; the spectacle serves the story.

## Feeling
You land and there's a slow, dim starfield — space, but barely there. As you scroll, an
architecture diagram *draws itself*. It feels like a quiet observatory at night, not a
gaming site. Every animated moment is tied to meaning (the systems he builds, the orbits
he simulates), never motion for motion's sake.

## Design system
- **Type:** A precise sans for UI (`Geist` / `Inter`), mono for technical labels and the
  diagram. Optional: a tight grotesk for big headings (`Space Grotesk` — thematically apt).
- **Color:** Deep space-navy/near-black base `#070a12`, cool off-white text, ONE cool
  accent (electric cyan `#38bdf8` or a faint plasma violet) for the field + active states.
  Light mode is a muted "daytime" inversion.
- **Layout:** Centered, generous. Hero full-viewport with the canvas behind text. Content
  below in a calm column with the occasional full-bleed diagram.
- **Motion (the earned moments — max 3):**
  1. **Starfield** — `OGL` (~10KB), a few hundred points, very slow parallax drift,
     subtle on mouse. Lazy-loaded island. **Hard-off on `prefers-reduced-motion`** (falls
     back to a static gradient). Pauses when offscreen.
  2. **Self-drawing architecture diagram** — inline SVG, `stroke-dashoffset` animation on
     scroll-into-view (IntersectionObserver, ~30 lines). Shows e.g. the POS order flow or
     the OPG constellation. This is the showpiece and it's nearly free.
  3. **Number count-ups / link micro-interactions** — tasteful, fast (<300ms), reduced-motion aware.
- **Texture:** Soft radial glow behind hero; thin cyan rules.

## Home composition
1. **Hero** — name + the honest narrative line over the starfield: "I build backends that
   hold up — and I keep wandering toward harder physical problems." Quiet scroll cue.
2. **Selected work** — cards with a subtle border-glow on hover; equal weight. Each links
   to a detail page. A-tier first, then B-tier "explorations," then small C-tier row.
3. **The diagram moment** — one full-bleed animated systems diagram (pick the most visual:
   OPG constellation OR POS realtime order→KOT→printer flow).
4. **Now** — "what I'm learning," tied to the live explorations (OPG, drone-sim, trading, physics).
5. **Footer** — contact, calm.

## Project detail page
Same post-mortem rigor as Direction A, but with one optional small diagram per project and
a touch more vertical rhythm/imagery space. Substance stays first.

## Why this fits Kenil
Shows the deep-tech soul (space, simulation) without claiming to be a 3D dev — the WebGL is
*ambient*, the real craft is the self-drawing systems diagram, which is pure engineering
communication. Honors "express myself as engineer interested in deep tech."

## Risk control
- If the starfield ever feels like AI-slop spectacle, cut it to the static gradient. The
  diagram is the non-negotiable showpiece; the field is garnish.
- Text pages stay ~0 JS; only the home hero ships the island.
- Folder: `site-b/` (or branch `dir/b`). Shares `src/content/`.
