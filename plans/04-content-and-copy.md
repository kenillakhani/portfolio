# Shared Content & Copy (written once, themed three ways)

> All facts trace to `context/01-kenil-deep-context.md`. No invented metrics.
> Voice: terse, first-principles, honest. "Developer friendly, not PM friendly."
> This becomes `src/content/projects/*.mdx` + the about/now/home copy.

---

## Hero / about (the honest arc — adapt tone per direction)

> I'm Kenil — a backend engineer. I build systems that hold up under real load, and I
> care more about *why* something works than that it works. I keep wandering toward harder
> physical problems — orbital power, microwaves vs. drones, real orbital mechanics — because
> I want to understand how things actually work under the hood. I haven't decided yet whether
> my path is software or deep tech. This is the work pulling me each way.

Short status line: `Software Engineer @ devx · Surat, India · open to deep tech`

---

## Projects (content collection schema)
Each MDX: `title, slug, kind (shipped|exploration|early), role, year, stack[], oneLine,
links{} , metrics[]`, body = Problem / Root cause / What I did / Result.

### devx — Payment-integrity at 350K customers  [shipped · professional]
- One-line: Idempotent duplicate-payment protection + non-destructive payment-session sync
  for a Razorpay Magic Checkout serving 350K+ customers.
- Body: the duplicate-modal race → auto-refund + stale-order cancel + return-existing-order;
  the `refreshPaymentCollectionForCartWorkflow` destructive-delete discovery → targeted
  amount bump. Platform migration (Medusa 2.10→2.14, zod 1500+ sites, CVE 34→0). Dry-run
  data backfill. Monitoring/alerting signal-to-noise tuning (60–70% faster triage).
- Stack: Medusa.js, Node, TS, Postgres, Redis, AWS. Metrics: 350K+ users, CVE 34→0.
- SCRUB: no pk/keys/PII/hosts/ULIDs.

### Restaurant POS — production, shipped solo  [shipped · personal]
- One-line: Multi-tenant restaurant POS with hardware thermal-printer integration, shipped
  to a real client.
- Body: ESC/POS firmware-level font bug (`GS !` resets font on TM-m30II) debugged on the
  wire; Prisma txn critical-section reduction (~83→24 in-txn round-trips, fail-fast stock
  validation); dry-run-verified 4,483-line seed pipeline (212 products).
- Stack: NestJS, Prisma, Postgres, Redis/Bull, Next.js 16, React 19, Tailwind 4, ESC/POS, Docker.
- SCRUB: client identity, IPs, SSH, hosts.

### CRM Backend — B2B sales CRM  [shipped · personal · in development]
- One-line: B2B sales CRM with a role-based discount-approval state machine.
- Body: discount approval caps + requested-vs-applied state machine + deny-by-default;
  Lead→Profile→Customer funnel with phone-dedup via a Postgres *partial unique index*;
  non-combinatorial variant model (price at the join level, zero sync).
- Stack: NestJS, Prisma, Postgres, S3, JWT/RBAC, PM2. Label clearly: single-client, in dev.

### Counter-drone HPM simulator  [exploration]
- One-line: An end-to-end electromagnetic-weapon-vs-drone simulation I built to understand
  the physics — Gazebo → MEEP FDTD → damage model → 3D.
- Body: 2.45 GHz Gaussian beam FDTD, sigmoid kill-probability (E_threshold ~5 kV/m),
  cited literature. Honest: working smoke test, mocked drone, ~250 lines.
- Stack: Python, MEEP (FDTD), Three.js. Label: exploration.

### Orbital Power Generator sim  [exploration]
- One-line: A simulator for a constellation that beams laser power between satellites —
  built to learn real orbital mechanics and power-beaming link budgets.
- Body: Orekit J2 propagation, Walker-δ constellation reasoning (60° stagger), link-budget
  efficiency chain + Sobol sensitivity. Honest: research-grade, in progress. (Submitted to
  South Park Commons "Curiosity.") Label: exploration.
- Stack: Python, Orekit, Cesium/CZML.

### Earlier / college  [early — compact row]
- IdeaScape (real-time collaborative design, LiveBlocks/fabric.js) · MysticTalk (anon
  messaging, Gemini). One line each. Don't oversell.

---

## Now / what I'm learning
> Currently pulling apart: real orbital mechanics & power-beaming (the OPG sim),
> computational EM (the drone sim), market microstructure & trading, and the usual
> rabbit-holes — physics, maths, puzzles, and how elite systems are actually built.

(Keep honest, curiosity-framed. Tie to the live explorations so it's not a hobby list.)

---

## Writing
Empty-but-real index. Placeholder: *"Essays coming. I'd rather publish something true than
something fast."* Wire routing + one draft schema so adding a post later is trivial.

---

## Contact / footer
Email kenillakhani1@gmail.com · GitHub · LeetCode (400+ solved) · LinkedIn · Surat, India.
Colophon (Direction C esp.): "Built with Astro. No tracking. Source on GitHub."

---

## Copy rules
- Every claim maps to context §4. If it's not there, it doesn't go on the site.
- "Exploration" never reads as "product."
- Numbers only where evidenced (350K+, CVE 34→0, ~83→24 round-trips, 212 products, 400+ LeetCode).
- Match his cadence: short, declarative, root-cause framed. No "passionate," no "leveraged synergies."
