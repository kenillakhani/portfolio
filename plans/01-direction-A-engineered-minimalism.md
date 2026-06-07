# Direction A — Engineered Minimalism

> "Restraint is the flex." Looks like it was built by someone who reads source code.
> The craft is precision, not motion.

## Feeling
A senior backend engineer's terminal-meets-spec-sheet. Quiet, exact, confident.
Zero decoration that doesn't carry information. The whitespace is deliberate; the
grid is visible if you look. It should feel like reading a really well-written README.

## Design system
- **Type:** Monospace for structure/labels/code (`Berkeley Mono` lookalike → free:
  `JetBrains Mono` or `Commit Mono`), one humanist sans for body (`Inter` tight, or
  `Geist`). Headings can be the mono at large size — that's the signature.
- **Color:** Ink-on-paper. Near-black `#0d0d0f` on warm off-white `#fafaf8`
  (and inverted dark mode). ONE accent — a restrained terminal-green `#10b981` OR
  a signal-amber. Used only for links, the cursor, active states. Never decoration.
- **Layout:** Single strong column, ~680px reading measure, left-aligned. A thin
  monospace "gutter" of metadata on the left (line numbers, dates, tags) like an IDE.
- **Motion:** Almost none. A blinking cursor in the hero. Links underline on hover with
  a 120ms ease. Maybe a subtle `▓▓▓░░` load bar that fills once. That's it.
- **Texture:** A faint 1px hairline grid or rule lines. `1px solid` borders, not shadows.

## Home composition
1. **Hero** — `> whoami` prompt aesthetic. Name, then one honest line:
   "Backend engineer. I want to know how things work under the hood." Blinking cursor.
   A compact `status:` line (open to deep-tech / currently @ devx).
2. **Selected work** — a dense, scannable list (not cards). Each row: monospace index
   `[01]`, title, one-line, stack tags, a `→`. Equal weight across A-tier projects.
3. **Now** — a short "what I'm learning" block, terminal-comment styled (`// currently:`).
4. **Footer** — contact as a clean key:value table. Email, GitHub, LeetCode (400+), LinkedIn.

## Project detail page
Reads like a precise post-mortem: Problem → Root cause → What I changed → Result.
Inline SVG for any diagram, rendered in the same hairline style. Code-ish callouts for
the gnarly bits (the `GS !` font bug, the txn round-trip reduction). No hero images.

## Why this fits Kenil
This IS his voice rendered as a site — "developer friendly, not PM friendly," simplicity
as a value, root-cause framing. The post-mortem project pages directly showcase how he
thinks. Lowest risk, highest signal-to-noise.

## Build notes
- 0 KB JS on every page (the cursor blink is CSS). Perfect Lighthouse is the point.
- Folder: `site-a/` (or branch `dir/a`). Shares `src/content/`.
