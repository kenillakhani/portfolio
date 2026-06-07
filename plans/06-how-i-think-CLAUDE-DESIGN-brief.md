# Design Brief — "How I Think" animation (full creative freedom)

> For Claude Design (claude.ai/design). **Design this independently, from first principles.**
> You are NOT refining anyone's prior work — earlier attempts failed and are discarded.
> Invent the metaphor, the motion, the medium, the layout. The only things you may not
> change are the FACTS (§2) and the HARD CONSTRAINTS (§4). Everything visual is yours.
>
> Deliver real, runnable HTML/CSS/JS I can drop into an Astro site. Iterate visually in your
> own preview until it actually looks good — that is the whole point.

---

## 1. The one job

Build ONE section of a personal portfolio, titled "How I think", that makes a sharp viewer
(senior engineer / deep-tech founder / big-tech bar) *feel how this person reasons* — through
**genuine, attractive, motion-driven animation**, not fading text. Think of the polished
"animated tech workflow / dataflow / system" motion-graphics people search for on YouTube:
things that draw, flow, connect, pulse, resolve. It should be the bold centerpiece of an
otherwise calm, editorial site — and it should look *intentional and crafted*, like the person
it describes made it.

It must present TWO real engineering stories (a toggle/switch between them is fine, or any
structure you invent), each tracing the SAME thinking path:
**problem → cause → understand → solve → at scale.**

---

## 2. THE FACTS — real content (do NOT invent; do NOT add fictional examples)

The person: **Kenil** — a 2025 CS grad, working backend / scalable-systems engineer, with a
real pull toward deep tech (space, physics). His defining trait: he refuses to accept that
something "works" until he understands *why*; he fixes root causes, never patches; he reasons
about consequences before acting; he builds and runs whole systems himself. His own phrase:
"think like an elite SpaceX engineer who digs deeper and finds the root cause of anything."

### Story 1 — "The cache stampede"  (real)
- **Problem:** the storefront is ISR (Next.js on Vercel). When Vercel's cache **expires/empties**,
  every request for that page hits the backend *at the same time*. At 200–250 live users, the
  backend is overwhelmed and crashes. *(The cache is not "broken" — it became empty; emptiness
  is the trigger.)*
- **Cause / verify:** he questioned his own assumption — does Next.js *coalesce* identical
  in-flight requests into one? It does **not**. He confirmed the backend was taking many
  duplicate, identical hits at once.
- **Understand:** a plain response cache alone won't save it — on a **cold miss**, all those
  requests *still* stampede the backend together before anything is cached.
- **Solve:** **request locking** — the first request computes the result and caches it; the
  others **wait** (up to a timeout), then **re-check the cache** and only compute if it's still
  missing. So the flood collapses into ONE computation; everyone else is served from cache and
  **never touches the backend**.
- **At scale:** the backend has never spiked for this reason since. On auto-scaling infra, cost
  dropped sharply — most of all on peak sale days.

### Story 2 — "The analytics choke"  (real)
- **Problem:** the server and DB would spike on random days and take 25–30 minutes to cool
  down. While the DB was choked, the **whole backend was dead** (not just analytics).
- **Cause:** watching it during a spike, heavy analytics queries were overwhelming the DB.
  Each query took **20–25 seconds**, so admins (not knowing why) **kept refreshing**, piling
  more parallel load onto a DB already on its knees.
- **Understand:** Postgres handles ~1M rows comfortably, so *why* choke? He read the DB
  **wait-events** (e.g. an RDS Performance-Insights-style breakdown). The tell: **CPU was low**
  — it was **memory**. The query working-set spilled past what the DB could hold, so it thrashed.
  *(Truth: depict it as MEMORY / working-set / "level overflowing a limit" — NOT heat or CPU.
  The wait-event breakdown showing memory-bound waits high and CPU low is the credibility moment.)*
- **Solve:** instead of tuning one query/route, he **re-architected analytics from the root** —
  rich filtering + distinctions so only a **small working set** loads at a time, by design.
- **At scale:** no more spikes; the feature came out richer and easier to use.

**The takeaway about him (let the viewer feel it, don't caption it heavily):** the two stories
are the *same method* twice — verify the real mechanism, then fix the root/architecture, not the
symptom. If your design makes that "one mind, applied twice" feeling land, that's the win.

**Wording is yours to keep terse.** Real topics only; never invent metrics or claims beyond §2.

---

## 3. What it must achieve (and avoid)

Achieve: real motion that *expresses the engineering* (a sharp engineer should read the systems
literacy in it); legible in ~8–12 seconds even to someone who doesn't know the backstory; a
genuine "I'd screenshot that" moment.

Avoid: fading-in text (explicitly rejected); generic floating-particle/constellation clichés
unless you truly subvert them; motion with no meaning; anything that reads as broken or as a
loading state; skills bars / radar charts; neon "gamer" aesthetics.

---

## 4. HARD CONSTRAINTS (only these are fixed)

- **Output:** real HTML/CSS/JS I can implement in **Astro + Tailwind**, deployed static on
  Vercel. Plain HTML/CSS/SVG/Canvas + vanilla JS, or one small animation lib (anime.js, GSAP,
  Motion One, etc. — your pick; ~tens of KB is fine). **No heavy framework** for the section
  itself. **Performance is NOT a concern** — the user explicitly does not care about Lighthouse;
  prioritize looking great over byte count.
- **Aesthetic world (so it belongs to the host site):** editorial/typographic, warm **paper /
  deep ink**, serif **Newsreader** for prose, a mono (JetBrains Mono / IBM Plex Mono) for
  labels, and a restrained **brass/amber** accent (~`hsl(38 70% 56%)`) reserved for "the fix /
  the engineer's hand." Distress = a desaturated ink-red (not pure red). Calm/resolved = optional
  faint green. No second loud hue. It can be the boldest thing on the site but must feel like the
  same designer made the rest. (You may use a dark stage panel framed within the light page.)
- **Accessibility:** keyboard-operable; honor `prefers-reduced-motion` with a graceful, still-
  meaningful **static** frame; degrade to something coherent with **no JS** (a static diagram or
  the text steps). The diagram itself can be `aria-hidden` with the real content in accessible DOM.
- **Mobile:** must look good and work on a phone (touch), not only desktop.
- **It plays on scroll-into-view and offers a replay.** Avoid an endless distracting loop.

---

## 5. IMPORTANT — discard the prior attempt (don't repeat its failures)

A previous in-code attempt **failed and is being thrown away** — do not treat it as a starting
point. For your awareness only, so you don't repeat the same mistakes: it tried a Canvas particle
layer stacked over an inline-SVG node layer, and the two **drew in mismatched coordinate spaces**
(particles and fills floated far from the nodes), the nodes rendered as solid black blobs instead
of thin outlines, and the connecting pipes never drew. The result looked broken. **You are free to
choose a completely different approach** (all-SVG, all-canvas, DOM+CSS transforms, WebGL, a single
coordinate system end-to-end, whatever you judge best). Just make it align, render cleanly, and
look genuinely good in your own visual preview before handing off.

---

## 6. What to deliver

1. **The concept** in 2–3 sentences — the core visual idea and why it expresses *how he thinks*.
2. **2–3 distinct directions** if you have them; recommend one. (Different metaphors/mediums welcome.)
3. **The built, runnable file(s)** for the recommended direction — verified in your preview to look
   good (screenshot it, fix it, iterate). Show the load / each beat / the resolved state.
4. **Notes for the implementing engineer:** the layer/coordinate approach, the animation lib (if any),
   how reduced-motion and no-JS degrade, and where the two stories' data lives so I can swap copy.

Make a sharp engineer stop scrolling and think: *"this person is different."*
