/* Projects — ported from the Astro content collection into plain TS data.
   `body` is light markdown (## headings, **bold**, *italic*) rendered by a tiny helper.
   Ordered by `order`; A-tier (shipped) first, then explorations, then early. */

export type Kind = 'shipped' | 'exploration' | 'early';

export interface Project {
  slug: string;
  title: string;
  kind: Kind;
  context?: 'professional' | 'personal';
  role: string;
  year: string;
  order: number;
  stack: string[];
  oneLine: string;
  metrics: string[];
  inDevelopment?: boolean;
  // Status shown as an indicator on the detail page. Overrides the kind-derived label.
  // e.g. 'Live' (in production, ongoing), 'In development', 'Exploration', 'Archived'.
  status?: string;
  body: string;
}

export const projects: Project[] = [
  {
    slug: 'devx-commerce-platform',
    title: 'Leading the platform behind ₹175Cr+ in commerce',
    kind: 'shipped',
    context: 'professional',
    role: 'Project lead · devx AI Labs',
    year: '2025–present',
    status: 'Live',
    order: 1,
    stack: ['Medusa.js', 'Node', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS', 'Slack'],
    oneLine:
      'I own the platform end-to-end — architecture (caching, exports, crons), CI/CD, observability, analytics, and infra — for an e-commerce business serving 500K+ customers and ₹175Cr+ in sales.',
    metrics: ['500K+ customers', '₹175Cr+ in sales', 'vulnerabilities 83 → 2'],
    body: `I lead the engineering behind [TheWholeTruthFoods](https://thewholetruthfoods.com/) — the platform a D2C brand runs its business on. I gatekeep what ships and treat it as a set of systems with failure modes, not a list of features. The rest of this page is how that plays out in practice.

## Analytics — rebuilt the root, didn't patch the queries
The analytics dashboard was query-heavy, choked the DB, and was too slow to actually use. The easy path was to keep optimising one query at a time — but that's a patch, and patches come back. So I went and studied how Mixpanel and AWS architect their pipelines, and made one call: rebuild the whole thing from the ground up. It's now filter-rich, fully real-time, and about 100× faster — with no caching layer to prop it up. The DB-overload risk didn't shrink, it's just gone. That's the difference between fixing the query and fixing the cause.

## A cache that survives its own cold start
The storefront is cached at the edge. When that cache empties, every request misses at the exact same instant and hits the backend together — and at peak traffic that took it down. A plain response cache doesn't save you here, bcz on a cold miss the whole flood still arrives before anything is cached. So I locked it: the first request computes and fills the cache, the rest wait and read from it, and the flood collapses into one computation. The backend stopped spiking — and on auto-scaling infra the cost dropped, most on the days traffic peaks.

## Payments that fix themselves
Payment bugs are the worst kind — real money, real angry customers. I worked through the whole spectrum: double charges, payment captured but no order, order created with a refund firing at the same time, two collections on one cart. But fixing each one isn't enough, bcz the next edge case is always waiting. So I built a cron that watches for any captured payment with no order behind it, and a script that either repairs the order or auto-refunds the customer — no human in the loop. A sale-day that used to be a full day of firefighting is now a 5-minute check. It heals itself.

## A Razorpay flow I checked before I trusted it
On the Razorpay Magic Checkout integration, I didn't just build what was scoped. I walked the entire order flow end-to-end in my head first and pulled out the edge cases nobody had hit yet — coupon stacking, address integrity, loyalty in the new flow — and raised them before writing a line. Then I built the middleware that guards it, including the duplicate-modal race: two checkout modals open on one cart with different order IDs. It catches the stale one, refunds it, cancels the dead order, and returns the order that's already final. Money stays correct even when the user does something I didn't expect.

## A deploy pipeline everyone said was already optimal
The backend deploy took 25–30 minutes, and DevOps had already signed it off as fast as it gets. I didn't take that on faith — I profiled the pipeline end-to-end, found the real bottlenecks, and got it under 7 minutes in half a day. A 3–4× cut on something I was told couldn't move. Every release since saves ~20 minutes, and that compounds across the whole team.`,
  },
  {
    slug: 'pos',
    title: 'Restaurant POS',
    kind: 'shipped',
    context: 'personal',
    role: 'Solo — architecture, backend, frontend, infra, ops',
    year: '2025–2026',
    status: 'Live',
    order: 2,
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'Redis / Bull', 'Next.js', 'React', 'Tailwind', 'Docker', 'Grafana / Loki / Prometheus', 'nginx'],
    oneLine:
      "I built a real restaurant's POS solo — app, hardware, and the self-hosted infra it runs on — and I keep it running.",
    metrics: ['14-container self-hosted stack', '~5-second production rollback', '212 products, dry-run verified'],
    body: `I built this alone and I run it — a real, paying client's restaurant runs on it every day. Tables, kitchen tickets to physical printers, cash-drawer sessions, inventory, discounts, reporting; the backend, a from-scratch UI, the infrastructure, and the hardware. No team, no handoffs. This is the project where I had to own every layer, including the ones a cloud platform usually hides from you.

## I chose a bare VPS to cut cost — then had to build the platform myself
The easy path was a managed cloud — AWS, RDS, the works — and a bill to match. I didn't want that for one restaurant, so I put it on a single bare VPS instead. But cheap infra means nothing comes for free: no managed logging, no automatic backups, no monitoring, no network setup. So I built all of it myself, learning each piece as I went. It runs as a self-hosted, network-isolated, fully-observable multi-container stack — Grafana, Prometheus and Loki for metrics and logs, exporters watching the host, database, cache and uptime, scheduled local backups *plus* off-site copies, Slack alerts the moment anything critical breaks, and the datastores locked to the internal network with nginx as the only door in. It's been running smoothly since — and it costs a fraction of the managed version.

## One person, every layer
Most production systems are split across a team — frontend, backend, infra, DevOps. Here that's all me. I designed the data model, wrote the backend, built the UI from scratch with no component library, set up the server, and wired in the thermal printers on the floor. Owning the whole thing means there's no seam where a problem can hide between people — and it taught me how every layer actually fits the one below it.

## I saw the cost of a data model before writing a row
Syrups and milk looked like product variants, and modelling them that way would've been the obvious move. But I worked it out first: a single coffee with size × syrup × milk would force ~84 pre-created variant rows, when a customer only ever picks one of each. That's a table that explodes for no reason. So I modelled them as modifier groups instead — one row per option, chosen at order time. I caught the data-volume cost in my head before it became a migration I'd regret.

## Depth, where it counts
One line of proof that I fix things at the root, not the surface: when receipts printed in the wrong font, I didn't keep guessing at settings — I traced it down to the actual bytes the printer was receiving and found the firmware was resetting the font on a specific command. The headline, though, is simpler: I built the whole thing, and I keep it running.`,
  },
  {
    slug: 'crm',
    title: 'B2B Sales CRM',
    kind: 'shipped',
    context: 'personal',
    role: 'Solo — architecture, backend, deployment',
    year: '2025–2026',
    status: 'In development',
    order: 3,
    stack: ['NestJS', 'Prisma', 'PostgreSQL'],
    oneLine:
      'A lead-to-cash CRM for an industrial-goods client where the real work was getting the shape of the system right before building it.',
    metrics: [],
    inDevelopment: true,
    body: `A sales CRM for a steel-and-hardware business, built and deployed solo, still in active development. The interesting part of this one isn't any single feature — it's that I held the whole lead-to-cash flow in my head and designed each piece to fit that shape, instead of bolting features on one at a time. Get the model wrong early and you pay for it on every feature after; get it right and the rest falls into place.

## A funnel modelled as deliberate states
The core is a three-stage flow — **lead → profile → customer** — and I treated each stage as a real state, not a flag. A profile is created the moment someone makes their first quotation, deduplicated on phone so the same buyer never splits into two records. "Customer" then stays a separate, human-confirmed step you reach on the first real order. That separation matters bcz a lead who asked for a quote isn't a customer yet, and the system shouldn't pretend otherwise.

## A variant model I argued for
The obvious move was the standard variant model — every size × colour combination as its own row. But that's wrong for this domain: here a variant is one value from one group, never the cartesian product, and the combinatorial version explodes into rows nobody asked for. So I pushed back and modelled it the right way, with pricing held at the (product, group) join. Change one price and every variant under it updates — zero sync logic, bcz there's nothing to keep in sync in the first place.

## Discount approval built for the common case
Reps, managers and admins each get a discount cap; anything over the cap routes to someone who can approve it. Easy enough. But the value isn't in the approval gate — it's in the fast path. Most discounts are within cap, so I made those skip approval entirely and went back specifically to verify that path, bcz that's what lets the sales team actually move. A gate that slows the 90% case to police the 10% is a bad trade.

## I deploy and run it myself
It runs on a self-managed Ubuntu server under PM2 that I set up — S3 and IAM configured by hand, DNS and TLS wired myself, Postgres migrations applied directly. When something broke in deploy, I chased it to the actual cause — a build-path issue, an auth-header mismatch on S3 — instead of routing around it. I'd rather understand the failure than work past it.`,
  },
  {
    slug: 'orbital-power-grid',
    title: 'Orbital Power Grid',
    kind: 'exploration',
    role: 'Self-directed · systems architecture',
    year: '2026',
    status: 'Exploration',
    order: 5,
    stack: ['Systems design', 'Orbital mechanics', 'First principles'],
    oneLine:
      'The system I keep coming back to — an energy layer for low Earth orbit, reasoned out from physics and proven flight heritage, not invented.',
    metrics: [],
    body: `This isn't something I've shipped — it's the problem I'm pulled toward, and the one I've thought hardest about. It's also the clearest example of how I reason about a system that doesn't exist yet: start from the binding constraint, reframe it, then build the architecture only out of pieces that already work. This is where I want my engineering to go next.

## The constraint I started from
Every satellite in low Earth orbit lives inside an energy cage. Its daily budget is fixed by physics — solar array area × cell efficiency × sunlit fraction — and after keeping itself alive, a typical smallsat has maybe 5–10 kWh a day left for the work it actually earns money on. You can't grow that without launching a bigger spacecraft. And onboard power tracks revenue almost directly: the low-power imaging satellites earn a fraction of what the high-power ones do. So the real problem isn't "build a better satellite" — it's that energy itself is the cage.

## The reframe — energy should move like data
If power is the constraint, then power should be deliverable. Networks don't make every computer bigger; they move packets to where they're needed. So instead of a generator that beams energy across distance, I landed on a fleet of **smart batteries that share the customer's own orbital shell** — charge at a hub, move to a satellite that needs energy, dock, deliver kilowatt-hours, and return to recharge. Same shell, no expensive plane changes, a light dock adapter on the customer's side. Energy delivered the way a network delivers packets.

## A system that invents nothing
The discipline I held myself to: bet zero on new physics. The delivery cycle is five steps — charge, phase, rendezvous, dock, return — and every one already has flight heritage. On-orbit docking with a passive customer: Northrop's MEV captured Intelsat satellites in GEO. Rendezvous-and-dock in LEO: Astroscale's ELSA-d. Propellant-free phasing by changing a satellite's drag profile: Planet's Flock 2p did it with differential drag alone. Holding a tight co-orbit for years: TanDEM-X. Autonomous collision avoidance at fleet scale: Starlink, ~300k maneuvers a year. My contribution isn't a breakthrough — it's the architecture that assembles proven parts into one system, and the judgment to know which constraints are real.

## Why this one is different
I built the orbital simulation to *check myself* — real propagation, sun-synchronous geometry, the constellation phasing — because I won't trust a system I can't watch behave. But the simulator isn't the point. The point is that I took a problem with no answer yet and reasoned it down to something buildable, the same way I'd debug a system that's already running: find the true constraint, then work from there. This is the kind of problem I want to spend my career on.`,
  },
  {
    slug: 'college',
    title: 'Earlier — college projects',
    kind: 'early',
    role: 'Self / coursework',
    year: '2024',
    order: 6,
    stack: ['React', 'Next.js', 'TypeScript', 'LiveBlocks', 'MongoDB'],
    oneLine:
      'Where I started — two full builds from college, before I knew what owning a system really meant.',
    metrics: [],
    body: `Two things I built in college, while I was still figuring out the craft. I'm not going to oversell them — but I did ship both end to end, and that's where the habit started.

- **IdeaScape** — a collaborative design tool: real-time sync, multiplayer cursors, live chat, contextual comments. React, Next.js, TypeScript, LiveBlocks, fabric.js.
- **MysticTalk** — an anonymous messaging app with email verification and AI-suggested replies. Next.js, TypeScript, MongoDB, Gemini API.

These taught me the front of the stack and how to take an idea all the way to something people can use. The work I actually care about now lives in the projects above this one.`,
  },
];
