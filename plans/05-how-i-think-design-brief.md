# Design Brief — the "How I Think" moment

> A prompt for Claude (design). Read everything, then **design independently from first
> principles**. Do NOT inherit any prior implementation. The only hard constraints are the
> ones explicitly marked **CONSTRAINT**. Everything else — the metaphor, the layout, the
> interaction, the medium — is yours to invent. Propose the idea you believe is genuinely
> the best, even if it's nothing like what's described as "current state" below.

---

## The ask, in one sentence

Design a single section of a personal portfolio that makes a sharp viewer (a senior
engineer, a deep-tech founder, a big-tech hiring bar) feel — in a few seconds and then more
deeply if they engage — **how this person thinks**, not merely what he knows.

This is the centerpiece "wow" of an otherwise quiet, editorial site. It should feel
**conceived, not decorated** — like it was made by the person it describes.

---

## Who it's about (design FOR this person, not a generic dev)

Kenil — a 2025 CS grad, working as a backend / scalable-systems engineer, with a real and
unresolved pull toward deep tech (space, physics, power systems). The defining trait, drawn
from thousands of his own words and his shipped work:

- **He refuses to accept that something "works" until he understands WHY it works.** Root
  cause over symptom. "Don't apply a patch." This is the single strongest signal of who he is.
- **He reasons about consequences before acting** — he saw that one data-modeling choice
  would explode into ~84 rows per item *before* writing a line, and chose differently.
- **He builds and runs whole systems alone** — not just code, but the infrastructure and
  observability under it (he stood up his own monitoring stack as a fresher).
- **He reverse-engineers how real systems work** — payment race conditions, how bus-ticket
  systems hold seats without a TTL, orbital mechanics, market microstructure.
- **He is openly undecided** between a software career and chasing deep tech. That honesty
  is part of him — the design can hold tension, not just confidence.
- **His self-image / aspiration:** "think like an elite SpaceX engineer who dives deeper and
  finds the root cause of anything." Simplicity and reliability. First principles.

His interests genuinely connect (this is the substance, however you choose to express it):
first principles → backend → systems (caching, concurrency, data integrity, observability)
→ physics → orbital mechanics (he's building an orbital-power-beaming simulator) → market
trading → and the throughline of "understand it under the hood."

He is **NOT** a 3D artist, not a UI showoff, not a logo-wall person. The craft must read as
*engineering taste*, not visual flash. Restraint is part of his identity — but he explicitly
wants this ONE section to be more ambitious than the rest of the (deliberately minimal) site.

## What it must make the viewer FEEL / understand

Pick the one or two of these you can land most powerfully — don't try to do all of them:

1. **A connected mind** — that these aren't scattered hobbies; they're one way of seeing.
2. **Depth-on-demand** — calm on the surface, but rewards the curious with real reasoning
   (the way *he* rewards anyone who asks "why did you do it that way?").
3. **The "why under the why"** — the act of peeling back a layer to the mechanism beneath.
4. **Productive tension** — software vs deep tech; the pull he hasn't resolved.

## What it is explicitly NOT

- Not a generic "tech constellation" / floating-particles cliché (unless you can subvert it
  into something genuinely meaningful — the bar is high).
- Not a skills bar chart, radar chart, or percentage-proficiency anything.
- Not motion for motion's sake. Every moving thing must carry meaning he could defend.
- Not a gimmick that's impressive once and dead on the second visit.

---

## CONSTRAINTS (the only hard rules)

- **CONSTRAINT — Tech:** must be implementable in **Astro + Tailwind v4**, deployed static on
  Vercel. Plain HTML/CSS/SVG and a *small* amount of vanilla JS (or one tiny lib like OGL
  ~10KB if WebGL genuinely earns it) are all available. No React/heavy framework for this
  section. Favor the lightest medium that achieves the idea.
- **CONSTRAINT — Performance & restraint:** the rest of the site ships ~0 JS and is fast. This
  section may add interactivity, but keep it lean and lazy; it must not wreck Lighthouse or
  feel heavy.
- **CONSTRAINT — Accessibility:** keyboard-operable, screen-reader-sensible, and it MUST honor
  `prefers-reduced-motion` with a graceful, still-meaningful static fallback. It should also
  degrade to something coherent with JS disabled.
- **CONSTRAINT — Aesthetic fit:** the host site is editorial/typographic — warm paper or deep
  ink, a serif voice (Newsreader), one restrained accent, generous space, calm. Your section
  can be the boldest thing on the site but must still feel like it belongs to that world, not
  bolted on from a different design language.
- **CONSTRAINT — Honesty:** no invented credentials or fake data. It expresses how he thinks;
  it doesn't claim achievements he doesn't have.
- **CONSTRAINT — Mobile:** must work and feel good on a phone (touch), not just desktop hover.

---

## Current state (context only — you are free to discard it entirely)

The current version is a small clickable SVG node-graph of his interests with a side panel
that shows "why each connects." **He doesn't like it** — it reads as a generic mind-map and
doesn't capture the *depth* of how he thinks. Treat this as a signal of what to BEAT, not a
template to refine. If your best idea is radically different, that's the point.

---

## What to deliver

1. **The concept** — a short, sharp description of the central idea and *why* it expresses
   how this specific person thinks. Lead with the insight, not the visuals.
2. **2–3 distinct directions** if you genuinely have them, each with the core metaphor,
   the interaction, and what the viewer feels at 2 seconds vs 30 seconds. Recommend one.
3. **The interaction & motion** — what happens on load, on hover, on tap, on scroll; what
   the reduced-motion and no-JS fallbacks look like.
4. **A concrete, buildable spec / mockup** — enough that it can be implemented in Astro +
   Tailwind + light vanilla JS: structure, the key CSS/SVG/animation approach, copy
   placeholders (real words will be written separately — mark them clearly as placeholders).
5. **Why it beats a plain mind-map** — one paragraph defending the choice on taste and meaning.

Think like the person you're designing for: find the root idea, keep it simple, make it
reliable, and make a sharp engineer stop and think "huh — this person is different."
