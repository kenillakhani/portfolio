/* ============================================================
   HOW I THINK — my method, drawn as a workflow, proven with real examples.
   The METHOD is constant (the right-side diagram):
     problem → why → learn → solution → implement → monitor
   Each STORY (left) is a real run of that method. Every step maps to a
   method stage so the diagram lights the stage you're reading.
   Wording is DRAFT. TODO(kenil): refine together.
   ============================================================ */

export type Stage = 'problem' | 'why' | 'learn' | 'solution' | 'implement' | 'monitor';

export const STAGES: { id: Stage; label: string; hint: string }[] = [
  { id: 'problem', label: 'Problem', hint: 'what actually broke' },
  { id: 'why', label: 'Why', hint: 'find the real mechanism' },
  { id: 'learn', label: 'Learn', hint: 'understand it deeply' },
  { id: 'solution', label: 'Solution', hint: 'design the right fix' },
  { id: 'implement', label: 'Implement', hint: 'build it at scale' },
  { id: 'monitor', label: 'Monitor', hint: 'verify it holds' },
];

export interface Step {
  stage: Stage;
  line: string;
}

export interface Story {
  id: string;
  label: string;
  context: string;
  summary: string; // one-line shown on the example card
  steps: Step[];
  takeaway: string;
}

export const PHILOSOPHY = [
  `I don’t trust a fix until I understand why it broke.`,
  `Every hard problem I’ve solved followed the same path — find the true mechanism, learn it from the ground up, then fix the root, never the symptom. Here it is, run twice on real systems.`,
];

export const STORIES: Story[] = [
  {
    id: 'cache',
    label: 'The cache stampede',
    context: 'Product & Offer APIs · ISR storefront · 200–250 live users',
    summary: 'The backend kept falling over under load — until I stopped fixing requests and fixed the timing.',
    steps: [
      { stage: 'problem', line: 'When the edge cache empties, every request misses at the same instant and hits the backend together. At 200–250 live users, it falls over.' },
      { stage: 'why', line: 'I checked my own assumption — does Next coalesce identical in-flight requests into one? It does not. The backend was taking hundreds of duplicate hits.' },
      { stage: 'learn', line: 'A plain response cache wouldn’t save it: on a cold miss the whole flood arrives before anything is cached. The problem is timing, not absence.' },
      { stage: 'solution', line: 'A request lock. The first request computes once and fills the cache; the rest wait, re-check, and are served from it. The flood collapses to one computation.' },
      { stage: 'implement', line: 'Rolled out across the product and offer APIs behind the ISR storefront, with the lock and timeout tuned for peak traffic.' },
      { stage: 'monitor', line: 'The backend hasn’t spiked for this since. On auto-scaling infra the cost dropped sharply — most of all on peak sale days.' },
    ],
    takeaway: 'Verify the real mechanism, then fix the class of problem — not the one request.',
  },
  {
    id: 'analytics',
    label: 'The analytics choke',
    context: 'Analytics v2 · Postgres',
    summary: 'The DB choked for half an hour at a time — and the real cause wasn’t what everyone assumed.',
    steps: [
      { stage: 'problem', line: 'On random days the DB spiked and took 25–30 minutes to cool down. While it was choked, the whole backend was dead — not just analytics.' },
      { stage: 'why', line: 'Heavy analytics queries, 20–25s each. Admins didn’t know why, so they kept refreshing — piling more parallel load onto a DB already on its knees.' },
      { stage: 'learn', line: 'Postgres handles ~1M rows easily, so why? I read the wait-events. CPU was low — it was memory. The working set spilled past the limit and the DB thrashed.' },
      { stage: 'solution', line: 'Re-architect analytics from the root — rich filtering and distinctions so only a small working set loads at a time, by design.' },
      { stage: 'implement', line: 'Rebuilt the analytics layer around bounded working sets instead of tuning one route, so the whole feature stays under the memory limit.' },
      { stage: 'monitor', line: 'No more spikes; the working set stays well under the limit. The feature came out richer and easier to use than before.' },
    ],
    takeaway: 'When a fix would only move the symptom, change the architecture at the root.',
  },
];
