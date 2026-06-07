# Direction C — Editorial / Essayistic

> Reads like a thoughtful engineer's personal site. Substance over interaction.
> Typography does all the work. This is the "person who writes and thinks" portfolio.

## Feeling
A beautifully typeset essay. Wide margins, generous line-height, a real type scale.
Feels like reading a personal site by someone whose ideas are worth your time. The
projects read as short written pieces, not gallery entries. Closest to a "future blog"
home — fits his plan to write later.

## Design system
- **Type:** This is the whole design. A serif for headings + long-form (`Newsreader`,
  `Source Serif 4`, or `Fraunces` for a little character) and a clean sans/mono for
  metadata and code (`Inter` / `JetBrains Mono`). Strong modular scale (1.25–1.333).
- **Color:** Paper. Warm white `#fbfaf7`, rich near-black text `#1a1a1a`, muted secondary
  gray for metadata, ONE understated accent for links (deep ink-blue or oxblood). Dark mode optional.
- **Layout:** Single centered reading column (~620–680px). Hanging metadata in the margin
  (dates, tags) where space allows. Drop-cap or small-caps lead-in for the about section.
- **Motion:** Effectively none. Smooth anchor scroll, link hover. The stillness is the style.
- **Texture:** None needed — type + space. Maybe a thin rule between sections.

## Home composition
1. **Lead** — name small, then a short first-person paragraph in serif. The honest
   narrative arc verbatim-in-spirit: builds backends, pulled toward deep tech, undecided.
   This is the emotional center and it's just *writing*.
2. **Work** — a clean list with a sentence of prose each (not bullet specs): "At devx I
   designed idempotent duplicate-payment protection for a 350K-customer checkout…" Each
   links to a fuller piece. Equal weight; explorations clearly labeled as such.
3. **Now** — a short dated note, blog-entry styled.
4. **Writing** — index present, honest empty state ("essays coming").
5. **Footer/Colophon** — contact + a tiny "built with Astro, no tracking" colophon (very on-brand).

## Project detail page
Full essay form: a narrative of the problem and the thinking, with the technical specifics
(stack, metrics) in a tidy sidebar/footer block. The root-cause stories (font bug, payment
race, txn reduction) read genuinely well as short engineering essays — this format flatters
his actual strength: explaining *why*.

## Why this fits Kenil
He repeatedly asks to "explain what this is actually doing" and values teaching/communication.
An editorial site frames him as someone who *thinks clearly and writes*, which is the most
durable signal for a deep-tech-curious engineer. Also the most future-proof for the blog.

## Risk control
- The bar is typographic precision: correct measure, rhythm, hierarchy. If type is sloppy,
  this direction fails — so it gets the most type-tuning attention.
- 0 KB JS. Pure performance.
- Folder: `site-c/` (or branch `dir/c`). Shares `src/content/`.
