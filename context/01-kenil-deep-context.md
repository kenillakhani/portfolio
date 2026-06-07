# Kenil Lakhani — Deep Context for Portfolio (v2, corrected)

> Source of truth for every word, project, and design decision on the site.
> Built from: resume + ~9,000 Claude Code prompts + deep CHRONOLOGICAL mining (start→now)
> of 5 project clusters under the senior-reviewer ownership rubric.
> v2 correction (2026-05-30): re-mined to lead with ownership/architecture/self-taught
> infra/high-ROI judgment — NOT dramatic bugs. Bugs are demoted to rigor footnotes.

---

## 0. The one-line truth

> A 2025 CS grad and working backend engineer who **owns and runs whole systems** — not
> a ticket-closer. As a fresher he designed, shipped, AND operates production systems
> end-to-end (a self-hosted, fully-observable POS stack; a 350K-customer commerce
> platform's hardest surfaces). He refuses to accept "it works" until he understands
> *why* — first-principles, root-cause, no patches — and he's openly torn between staying
> in software and chasing deep tech (space, physics). The honesty of that tension is the story.

He is NOT: a 3D dev, a UI showoff, a bug-of-the-week reel, an exaggerator.
He IS: a system OWNER with self-taught infra/SRE instincts and real deep-tech curiosity.

---

## 1. Identity & contact (real, public-on-site per his confirmation)

- **Name:** Kenil Lakhani · **Location:** Surat, Gujarat, India
- **Email:** kenillakhani1@gmail.com (resume) / kenil.lakhani@devxlabs.ai (work)
- **Phone:** +91-9909291598 · **Links:** LinkedIn, GitHub, LeetCode (all public)
- **Education:** B.Tech CSE, Pandit Deendayal Energy University, 2021–2025, **CGPA 9.26**
- **Current role:** Software Development Engineer @ devx commerce (Aug 2025 – present)
- **Domain handle:** TBD — user supplies later. Build deployable, domain-agnostic.
- ⚠️ **Verify real GitHub/LinkedIn/LeetCode handles before launch** (placeholders in site.ts).

---

## 2. The persona (his own words — the voice the site must echo)

Quieter, polished version of THIS voice — engineer-facing, not marketing.

**Signature framing (138×):** "think like elite spacex engineer who dives much deeper into
things and finds the root cause of anything."

**Ownership / decisions / why (the corrected emphasis):**
- "keep the old db as it is and create new DB and connect it and then run this there." (the cutover instinct)
- "document we will store in S3 so make central service for that bcz ongoing we will store all assets in S3 only." (building for the next ten features)
- "i think just we should have one route... that way will be so simple and perfect from all side, what do you think??" (reversing his own design for a simpler shape)
- "Look look now i deep think on this topic and reach on conclusion that we will not listen order.placed now for cod order." (defends an architectural call with traced reasoning)
- "do not make changes in schema.prisma just make new migration file i will run it in Db and then pull the schema." (a standing discipline held for weeks — DB is source of truth)
- "you would need to understand the DB structure and pricing structure of our system first so do not assume things, you have to read the code." (understand the system before mutating it)
- "why you not understand that there should be no two option like size and color for one product... now you got it??" (defending his variant model against the AI's default)

**Root cause / no patches:** "think of the root cause and fix it properly. do not just apply patch."
**Honesty:** "be 100% sure about this and then tell me. not just make assumption." · "do not tell me false positive."
**Simplicity:** "that simple thing is made too complex please keep it simple and usable."
**Operator's caution:** "please clean it properly with there is no any data loss in my running server."
**Standards (he reviews PRs):** "make the package.json perfect and clean." · "developer friendly not the PM friendly!!!"
**Deep-tech soul:** "if we apply real maths then the shape should not be a circle it should be elliptical... simulate the real physics."

### Distilled traits
1. **System owner** — holds the whole system in his head; designs the shape, then defends it.
2. **Self-taught platform/SRE instinct** — builds observability/alerting/infra nobody handed him.
3. **Consequence-first** — reasons about data-volume / rollback / failure modes before acting.
4. **Root cause over symptom**; **understands under the hood**; **distrusts the easy answer**.
5. **Simplicity as a hard constraint**; **surgical**; **wants to be questioned**; **economics-aware**.

---

## 3. The honest narrative arc (through-line of the site)

> "I build backends that hold up — and I run them. I keep wandering toward harder physical
>  problems — orbital power, microwaves vs. drones, real orbital mechanics — because I want
>  to know how things actually work under the hood. I haven't decided which path is mine yet.
>  This is the work pulling me each way."

Ambivalence (software vs deep-tech) is REAL — show honestly. Professional/personal systems =
**shipped & owned & operated**; deep-tech = **explorations**; college = **early/small**.

---

## 4. The work — three tiers, equal weight across A-tier ("nothing is hero")

> **NARRATIVE RUBRIC (Kenil's explicit correction).** Each A-tier project leads, in order:
> (1) **ownership & architecture decisions** (what & *why*); (2) **self-taught infra as a
> fresher** (the platform he built); (3) **high-ROI feature/impact judgment**; (4) **depth/
> first-principles as a RIGOR FOOTNOTE — never the headline.** Mined start→now. The story is
> "he owns and runs the whole system," not "he fixed a dramatic bug."

### TIER A — Shipped, Owned & Operated

**A1. devx commerce / TheWholeTruthFoods (professional — OK to showcase; confirm naming)**
- D2C brand, **350K+ customers**, Medusa.js/Node/TS/Postgres/Redis/AWS. **Backend lead +
  PR reviewer / release gatekeeper**; owns the platform's hardest surfaces. (Grounded in source.)
- **OWNS — price-cache with stampede protection:** Redis cache keyed by `product_id+region_id`
  with **distributed locks + request-coalescing** (first req hits DB, concurrent reqs share
  the result), an admin invalidation API, and a `CACHE_INVALIDATION_FAILURE` Slack alert.
  A cache treated as a system with a failure mode.
- **OWNS — streaming S3 export pipeline:** hand-written `S3MultipartUploader` (AWS SDK v3,
  8MB parts, abort/cleanup), **flat memory regardless of row count**, powers order/customer/
  review bulk exports (1M+ rows).
- **OWNS — observability/alerting:** custom Slack module, typed `AlertType` enum across **20+
  categories**, one `errorHandlerWorkflow` with severity. **Built proactive cron sanity-checks
  before being asked** (missing-extended-order, Razorpay-order reconciliation, product-config
  validation) — catches corruption before customers do. Real backing for "60–70% faster triage."
- **DROVE — migration + security with judgment:** rejected the Bun "fix CVEs" shortcut (pkg
  manager ≠ pinned versions), used npm `overrides`, **83 → 2 vulns (3 crit/34 high → 0
  actionable)**, *consciously accepted* the last 2 with documented non-exploitability.
- **HIGH-ROI:** bulk order-units/pricing admin tool (saves admin hrs/wk); PDP/PLP discount
  MOV correctness (conversion+trust); author/owner of the in-house **discounts** Medusa plugin.
- **RIGOR FOOTNOTE (one line, not headline):** idempotent duplicate-payment-modal protection
  (detect stale RZP order → refund + cancel + return existing). Proof he earns payments ownership.
- SCRUB: `pk_`/publishable keys, admin JWTs, Sentry DSN, `Admin@123`, UAT/prod hosts, customer
  PII/IDs, ULIDs. Architecture-and-decisions framing only. CONFIRM naming of brand/devx.

**A2. Restaurant POS (personal — production, shipped solo) — FLAGSHIP OWNERSHIP STORY**
- A solo fresher built AND RUNS a production restaurant POS end-to-end: tables, KOT to physical
  printers, cash-drawer sessions, inventory, discounts, reporting. Backend + from-scratch
  frontend + infra + hardware, no handoffs.
- Stack: **NestJS + Prisma + Postgres + Redis/Bull**, JWT/RBAC; **Next.js 16, React 19, TS
  strict, Tailwind 4 — fully custom UI, no component library** — module→submodule→action
  permissions; deliberate route split (tablet-first `(pos)` vs PC-only `(dashboard)`).
- **HEADLINE — self-taught infra he built & operates (verified via live `docker ps`):** a
  **14-container self-hosted stack on a bare VPS** he administers over SSH — Grafana +
  Prometheus + **Loki** + Promtail + node/postgres/redis/blackbox **exporters** (observability
  + uptime probing), **dual backups** (scheduled local + off-site S3), Slack **critical-error
  alerting**, nginx as the only public proxy, **datastores bound to loopback** on a Docker
  bridge network. Nobody handed him a platform — he built one.
  ⚠️ **HONESTY:** say "self-hosted, network-isolated, fully-observable multi-container stack on
  a bare VPS." Do **NOT** say "private VPC" — no literal VPC/WireGuard/Tailscale in logs; the
  isolation is Docker-network + loopback-binding + nginx. Substance real; the word "VPC" is not.
- **OWNERSHIP — dual-DB production cutover:** stood up `pos_db_prod_v2` beside the untouched
  prod DB, seeded it, flipped one `.env` var + `docker compose restart` → **~5s rollback, old
  data never touched.** Senior-grade migration safety.
- **ARCHITECTURE (the modeling call a senior would circle):** modeled syrups/milk as **modifier
  groups, not variant groups** — reasoned that variant groups force ~84 pre-created variant rows
  per coffee (Size×Syrup×Milk) when a customer picks one. Saw the data-volume consequence before
  writing a row; benchmarked vs Square/Toast/Lightspeed.
- **HIGH-ROI:** automated PDF-menu → 212-product seed pipeline (the last mile to opening);
  category-aware search; per-printer font scaling (kitchen vs bar legibility).
- **RIGOR FOOTNOTES (brief):** (a) restructured a confirmItems flow blowing Prisma's 10s txn
  limit into reads-outside / tight-writer-txn / reads-outside, self-caught a second-order
  error-boundary leak; (b) ESC/POS font bug debugged on the wire with a virtual printer. One-line proof.
- SCRUB: prod password, server IP, SSH config, printer IPs, client identity, duckdns/vercel hosts.

**A3. CRM Backend (personal — live, single-client B2B, in active development)**
- B2B sales CRM for a steel/industrial-goods client. He owned the **shape of the whole
  lead-to-cash system**, directing the build module by module over ~3 weeks.
- Stack: **NestJS + Prisma + Postgres**, S3 (central `StorageService`), JWT + RolesGuard,
  soft-delete + audit columns throughout.
- **OWNERSHIP/INFRA — self-taught full deploy stack:** self-managed **Ubuntu server**
  (`/opt/CRM-BE`), **PM2** (debugged a real crash-loop to root cause — a tsconfig `dist/` path
  issue), **AWS S3 + IAM** created & debugged hands-on (region/bucket/auth-header failures
  driven to root cause), **DuckDNS + TLS** wired himself, hand-applied Postgres migrations
  (worked through Prisma `P3005` baseline). Owns the full deploy loop.
  ⚠️ **HONESTY:** CRM has **NO observability/alerting/metrics** in the logs (that's the POS).
  Do NOT claim monitoring here. Infra story = deploy/PM2/S3/TLS/Postgres ownership.
- **ARCHITECTURE he designed & defended:** lead→profile→customer funnel as a deliberate 3-stage
  state model (auto-create profile on first quotation, first-write-wins, phone dedup key,
  human-confirmed "convert to customer"); **non-combinatorial variant model** defended against
  the AI's default (price at the (product,group) join → zero sync); deliberate denormalization;
  standing rule "DB is source of truth — I write the migration, Prisma schema is generated."
- **HIGH-ROI feature judgment:** role-based discount approval (caps 10/20/45%, over-cap →
  approval gate, *within-cap fast path bypasses approval* — he verified the fast path because
  that's where ROI is); data-driven `uom_dimension_rules` (add unit types without code change).
- **RIGOR FOOTNOTES (brief):** phone-dedup via a Postgres **partial unique index**; the discount
  state machine's requested-vs-applied states, self-audited against intent.
- Honest framing: single-client, in active development, pragmatic-solo ops.
- SCRUB: he pasted live AWS keys while debugging (fresher hygiene gap — recommend rotation, do
  NOT reproduce); server IP, client identity.

### TIER B — Deep-Tech Explorations (experiments, NOT products — "things I built to understand X")

**B1. Counter-drone HPM simulator (`drone-sim`)** — from-scratch pipeline: Gazebo → MEEP (FDTD
electromagnetics) → damage model → Three.js. 2.45 GHz Gaussian-beam FDTD (precomputed steady
state — re-solving per frame is "the rookie trap"); sigmoid kill-prob (E_threshold ~5 kV/m);
cited an arXiv HPM-swarm paper. **Working smoke test, mocked drone, ~250 lines. Exploration.**

**B2. Orbital Power Generator sim (`OPG`)** — satellites that beam laser power to other sats.
**Orekit** J2 propagation, Keplerian/sun-sync orbits, Cesium/CZML. Walker-δ reasoning (spotted
that 6 sats hitting the poles at once is inefficient → 60° true-anomaly stagger); link-budget
efficiency chain + **Sobol sensitivity**; GaAs triple-junction PV at 1070 nm. Submitted to
**South Park Commons "Curiosity."** Research-grade, in progress. Exploration.

**B3. RAG + perceptual-hash document pipeline (`problem-solver`)** — lecture PDFs → RAG; pHash
dedup on question images; n8n + Docker. Applied AI, working.

**B4. Smaller:** invoice-OCR POC (Document AI), self-selecting YouTube downloader. Mention lightly/omit.

### TIER C — College projects (less weight)
- **IdeaScape** — collaborative design platform, real-time sync, multiplayer cursors/chat (React/Next/TS, LiveBlocks, fabric.js).
- **MysticTalk** — anonymous messaging, email verification, Gemini suggestions (Next/TS, MongoDB).
- Present compactly. Don't oversell. "These taught me the front of the stack."

---

## 5. "Now / what I'm learning" — physics, maths, market trading, space tech, puzzles,
understanding internals. Tie to live explorations (OPG, drone-sim) so it reads real, not a hobby list.

## 6. Writing/blog — scaffold + routing, honest empty state, no fake posts.

---

## 7. Hard rules (do not violate)
- **Lead with ownership/architecture/infra/judgment. Demote bugs to footnotes.** (The v1 mistake.)
- **No invented metrics, no exaggeration.** Every claim traces to §4.
- **Honesty corrections are binding:** POS = "self-hosted network-isolated observable stack,"
  NOT "private VPC." CRM has NO monitoring/alerting — don't cross-contaminate from the POS.
- **Explorations are explorations.** Never call B-tier work a product.
- **Scrub all secrets/PII** in §4. Recommend rotating the leaked TWT `pk_` and CRM AWS keys.
- **Match his voice:** terse, ownership-framed, first-principles. "Developer friendly, not PM friendly."
- **Equal weight** across A-tier; B as curiosity; C small. The site's craft = proof he's an engineer.
