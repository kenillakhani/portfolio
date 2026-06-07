/* A single Thinking walk-through, styled like a Work detail page: back link,
   header, then the method stages (problem → … → monitor) walked through one by one,
   each with its icon, label, and the real line. Ends on the takeaway. */
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { STORIES, STAGES, type Stage } from '../data/rootcause';
import {
  LuTriangleAlert, LuScanSearch, LuBrain, LuLightbulb, LuHammer, LuActivity,
} from 'react-icons/lu';
import type { IconType } from 'react-icons';

const ICON: Record<Stage, IconType> = {
  problem: LuTriangleAlert, why: LuScanSearch, learn: LuBrain,
  solution: LuLightbulb, implement: LuHammer, monitor: LuActivity,
};
const stageMeta = (id: Stage) => STAGES.find((s) => s.id === id)!;

export function Thinking() {
  const { slug } = useParams();
  const story = STORIES.find((s) => s.id === slug);
  if (!story) {
    return (
      <Layout>
        <section className="pt-12">
          <p>Not found. <Link to="/#thinking">← Thinking</Link></p>
        </section>
      </Layout>
    );
  }
  return (
    <Layout>
      <article className="pt-8 pb-2">
        <Link
          to="/#thinking"
          className="back-link sans group inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-wide text-[var(--color-muted)] hover:text-[var(--color-accent)]"
        >
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
          <span>Back to thinking</span>
        </Link>

        <header className="mt-8">
          <h1 className="text-3xl font-medium tracking-tight">{story.label}</h1>
          <p className="lead mt-4">{story.summary}</p>
        </header>

        {/* the method, walked through stage by stage */}
        <ol className="mt-12 max-w-[var(--measure)]">
          {story.steps.map((step, i) => {
            const meta = stageMeta(step.stage);
            const Icon = ICON[step.stage];
            const last = i === story.steps.length - 1;
            return (
              <li key={i} className="relative flex gap-5 pb-9">
                {/* spine + node */}
                <div className="relative flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-rule)] text-[var(--color-accent)]">
                    <Icon size={17} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  {!last && <span className="mt-1 w-px flex-1 bg-[var(--color-rule)]" aria-hidden="true" />}
                </div>
                <div className="pt-1">
                  <span className="sans block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                    {meta.label}
                  </span>
                  <p className="mt-1.5 text-[1.02rem] leading-relaxed text-[var(--color-ink)]">{step.line}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <aside className="mt-6 max-w-[var(--measure)] border-l-2 border-[var(--color-accent)] pl-5">
          <span className="sans block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-faint)]">
            The principle
          </span>
          <p className="mt-2 text-[1.15rem] leading-relaxed text-[var(--color-ink)]">
            {story.takeaway}
          </p>
        </aside>
      </article>
    </Layout>
  );
}
