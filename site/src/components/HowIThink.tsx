/* THINKING — a dedicated section. Heading like Work, the method shown as a
   horizontal flow (problem → … → monitor), then two real examples as cards that
   open their own detail pages at /thinking/:id. */
import { Link } from 'react-router-dom';
import { STORIES, PHILOSOPHY } from '../data/rootcause';
import { MethodFlow } from './MethodFlow';

export function HowIThink() {
  return (
    <section id="thinking" className="mt-24">
      <header className="mb-4">
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Thinking</h2>
        <p className="mt-2 max-w-[52ch] text-[var(--color-muted)]">
          {PHILOSOPHY[0]} The same path every time — from the problem down to the cause,
          then back up to a fix that holds.
        </p>
      </header>

      {/* the method, horizontal */}
      <MethodFlow />

      {/* divider after the animation */}
      <div className="mt-12 h-px w-full bg-[var(--color-rule)]" />

      {/* two real runs of it — Work-style cards → own detail pages */}
      <ul className="mt-16">
        {STORIES.map((s, i) => (
          <li key={s.id} className={i > 0 ? 'mt-8 border-t border-[var(--color-rule)] pt-8' : ''}>
            <Link to={`/thinking/${s.id}`} className="work-card group block">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
                  {s.label}
                </h3>
                <span className="shrink-0 text-sm text-[var(--color-faint)] group-hover:text-[var(--color-accent)]">
                  Walk-through →
                </span>
              </div>
              <p className="mt-1.5 text-[var(--color-muted)]">{s.summary}</p>
              <p className="mt-2 text-sm text-[var(--color-faint)]">{s.context}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
