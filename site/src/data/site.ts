// Single source of truth for identity, nav, and copy.
// Shared verbatim across all three design directions.

export const site = {
  name: 'Kenil Lakhani',
  role: 'Software Engineer',
  location: 'Surat, Gujarat, India',
  // The honest one-liner — the whole site's thesis.
  tagline: 'Backend engineer. I want to know how things work under the hood.',
  status: 'Software Engineer @ devx AI Labs · exploring deep tech',

  // Real, public-on-site per Kenil's confirmation.
  email: 'kenillakhani1@gmail.com',
  links: {
    github: 'https://github.com/kenillakhani', // TODO(kenil): real GitHub handle still needed
    linkedin: 'https://www.linkedin.com/in/kenil-lakhani-8b19a124a/',
    leetcode: 'https://leetcode.com/u/kennu_codder/',
    codeforces: 'https://codeforces.com/profile/kenil_codder',
    codechef: 'https://www.codechef.com/users/binary_bark',
    x: 'https://x.com/KenilLakhani2',
    instagram: 'https://www.instagram.com/i_m_kenilll',
  },
  leetcodeSolved: '400+',

  // Footer line — honest about being quiet online.
  connect: `I don’t post much, but I love a good conversation with curious, like-minded people.`,
} as const;

// The about / hero narrative — the real tension, told honestly.
// TODO(kenil): we'll refine these words together. Placeholders are best-guess, not final.
export const about = {
  // Signature hero reframe — the 2-second "this person thinks differently" line.
  // TODO(kenil): pick / rewrite. This is the conceptual hook.
  // Two-line hero reframe; *word* is highlighted in the accent. Short setup → bigger payoff.
  reframe: `It’s easy to fix what broke.\nKnowing *why* it could is the part I actually care about.`,
  // ==word== renders as a subtle highlighter-style mark.
  lead: `I’m Kenil — an ==engineer== who develops systems that survive real load and user behaviour, and keeps digging until the way they work makes sense.`,
  body: `Lately, figuring out how to transfer energy to satellites in orbit — half to understand the space physics deeply, half to test whether this path is really for me.`,
};

// One-liner education (B.Tech only — no master's). TODO(kenil): confirm wording.
export const education = {
  degree: 'B.Tech, Computer Science & Engineering',
  school: 'Pandit Deendayal Energy University',
  years: '2021–2025',
  note: 'CGPA 9.26',
};

// Skills as CAPABILITIES backed by proof — not a tool list. Each `proof` is a real
// thing from the work above, so the claim is demonstrated, not asserted.
// TODO(kenil): tighten wording to taste.
export const skills: { skill: string; proof: string }[] = [
  { skill: 'Architecture that holds at scale', proof: 're-built analytics from the root so it stays under the memory limit by design' },
  { skill: 'First-principles problem solving', proof: 'find the true mechanism, fix the cause — never patch the symptom' },
  { skill: 'Owning infra and development both', proof: 'built and run a 14-container self-hosted stack, end to end, alone' },
  { skill: 'Leadership of a small, sharp team', proof: 'lead the platform — and the release gate — behind ₹175Cr+ in commerce' },
  { skill: 'Prioritising under a real deadline', proof: 'ship the highest-leverage thing first when the clock is running' },
  { skill: 'Business judgment for clients', proof: 'build for where the money actually is, and say so before being asked' },
  { skill: 'Data analysis & cleaning', proof: 'dig into messy production data and turn it into something you can decide on' },
];

// One external credential — gets its own highlighted row in Skills.
export const certificate = {
  label: 'Claude Certified Architect',
  href: 'https://verify.skilljar.com/c/gbf8byvanv5b',
};

// A small, curated tools line — only what the work above actually uses. Not a logo wall.
export const tools: { group: string; items: string }[] = [
  { group: 'Languages', items: 'TypeScript, JavaScript, C++, SQL' },
  { group: 'Backend & data', items: 'Node.js, NestJS, PostgreSQL, Redis, Prisma' },
  { group: 'Frontend', items: 'React, Next.js, Tailwind' },
  { group: 'Infra & ops', items: 'AWS, Docker, nginx, Grafana, Loki, Prometheus' },
];

// (The "how I think" section is now driven by src/data/rootcause.ts —
//  a self-playing root-cause descent. The old mind-map data was removed.)

export const now = {
  intro: `What I'm pulling apart right now:`,
  items: [
    'Software engineering — system design at Google / AWS scale.',
    'Real orbital mechanics & power-beaming link budgets — via the OPG work.',
    'Market microstructure & trading.',
    'The usual rabbit-holes : physics, maths, and how elite systems are actually built.',
  ],
};
