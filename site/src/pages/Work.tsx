import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Markdown } from '../components/Markdown';
import { projects } from '../data/projects';

export function Work() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  if (!p) {
    return (
      <Layout>
        <section className="pt-12">
          <p>Not found. <Link to="/#work">← Work</Link></p>
        </section>
      </Layout>
    );
  }
  return (
    <Layout>
      <article className="pt-8 pb-2">
        <Link
          to="/#work"
          className="back-link sans group inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-wide text-[var(--color-muted)] hover:text-[var(--color-accent)]"
        >
          <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
          <span>Back to work</span>
        </Link>
        <header className="mt-8">
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium italic text-[var(--color-faint)]">
            <span>{p.role}</span>
            <span aria-hidden="true">·</span>
            <span>{p.year}</span>
            {(() => {
              const label = p.status ?? (p.inDevelopment ? 'In development' : p.kind);
              const live = (p.status ?? '').toLowerCase() === 'live';
              return (
                <span className="ml-auto inline-flex items-center gap-1.5 not-italic text-[var(--color-muted)]">
                  <span className={`status-dot ${live ? 'is-live' : ''}`} aria-hidden="true" />
                  {label}
                </span>
              );
            })()}
          </div>
          <h1 className="text-3xl font-medium tracking-tight">{p.title}</h1>
          <p className="lead mt-4">{p.oneLine}</p>
        </header>

        <div className="prose-body mt-10 max-w-[var(--measure)]">
          <Markdown source={p.body} />
        </div>

        <div className="mt-12 border-t border-[var(--color-rule)] pt-6">
          <span className="sans text-[0.95rem] font-semibold tracking-wide text-[var(--color-accent)]">Stack</span>
          <ul className="sans mt-3 flex flex-wrap gap-2">
            {p.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-[var(--color-rule)] px-2.5 py-1 text-[0.8rem] text-[var(--color-muted)]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Layout>
  );
}
