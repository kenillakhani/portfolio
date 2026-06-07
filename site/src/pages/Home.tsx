import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { HowIThink } from '../components/HowIThink';
import { site, about, education, skills, certificate, tools, now } from '../data/site';
import { projects } from '../data/projects';

// renders *italic* and ==highlight== inline marks
const em = (s: string) =>
  s.split(/(\*[^*]+\*|==[^=]+==)/g).map((part, i) => {
    if (part.startsWith('==') && part.endsWith('==')) {
      return <mark key={i} className="hl">{part.slice(2, -2)}</mark>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });

const kindLabel: Record<string, string> = { shipped: 'Shipped', exploration: 'Exploration', early: 'Earlier' };

export function Home() {
  const ordered = [...projects].sort((a, b) => a.order - b.order);
  return (
    <Layout>
      {/* lead */}
      <section className="pt-10 pb-2 sm:pt-16">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">{site.name}</h1>
        <p className="sans mt-2 text-sm text-[var(--color-faint)]">{site.status}</p>
        <p className="mt-8 max-w-[32rem] text-2xl font-medium leading-snug text-[var(--color-ink)] sm:text-[1.7rem]">
          {about.reframe.split('\n').map((line, i) => (
            <span key={i} className="block">
              {line.split(/(\*[^*]+\*)/g).map((seg, j) =>
                seg.startsWith('*') && seg.endsWith('*') ? (
                  <em key={j} className="font-medium not-italic text-[var(--color-accent)]">
                    {seg.slice(1, -1)}
                  </em>
                ) : (
                  seg
                ),
              )}
            </span>
          ))}
        </p>
        <div className="mt-7 max-w-[34rem]">
          <p className="lead">{em(about.lead)}</p>
          <p className="mt-4 text-[var(--color-muted)]">{em(about.body)}</p>
        </div>
      </section>

      {/* work */}
      <section id="work" className="mt-20">
        <header className="mb-9">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Work</h2>
          <p className="mt-2 text-[var(--color-muted)]">
            Systems I’ve designed, delivered, and still developing.
          </p>
          <div className="mt-5 h-px w-full bg-[var(--color-rule)]" />
        </header>
        <ul>
          {ordered.map((p, i) => (
            <li
              key={p.slug}
              className={i > 0 ? 'border-t border-[var(--color-rule)] pt-8 mt-8' : ''}
            >
              <Link to={`/work/${p.slug}`} className="work-card group block">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
                    {p.title}
                  </h3>
                  <span className="shrink-0 text-sm font-medium text-[var(--color-faint)]">
                    {p.status ?? (p.inDevelopment ? 'In development' : kindLabel[p.kind])}
                  </span>
                </div>
                <p className="mt-1.5 text-[var(--color-muted)]">{p.oneLine}</p>
                <p className="mt-2 text-sm text-[var(--color-faint)]">{p.stack.slice(0, 5).join(' · ')}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <HowIThink />

      {/* interests (was the separate /now page) */}
      <section id="interests" className="mt-24">
        <header className="mb-8">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Interests</h2>
          <p className="mt-2 max-w-[52ch] text-[var(--color-muted)]">{now.intro}</p>
          <div className="mt-5 h-px w-full bg-[var(--color-rule)]" />
        </header>
        <ul>
          {now.items.map((item, i) => (
            <li
              key={item}
              className={`py-4 text-[var(--color-ink)] ${i > 0 ? 'border-t border-[var(--color-rule)]' : ''}`}
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* skills — capabilities, each backed by proof */}
      <section id="skills" className="mt-24">
        <header className="mb-8">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Skills</h2>
          <p className="mt-2 max-w-[52ch] text-[var(--color-muted)]">
            Not a list of tools — what I can actually do, and where I’ve done it.
          </p>
          <div className="mt-5 h-px w-full bg-[var(--color-rule)]" />
        </header>
        <ul>
          {skills.map((s, i) => (
            <li
              key={s.skill}
              className={`grid grid-cols-1 gap-x-8 gap-y-1 py-4 sm:grid-cols-[15rem_1fr] ${
                i > 0 ? 'border-t border-[var(--color-rule)]' : ''
              }`}
            >
              <span className="text-[1.05rem] text-[var(--color-ink)]">{s.skill}</span>
              <span className="text-[var(--color-muted)]">{s.proof}</span>
            </li>
          ))}
        </ul>

        {/* the one external credential — comes right after the capabilities */}
        <a
          href={certificate.href}
          target="_blank"
          rel="noopener noreferrer"
          className="cert-link group mt-8 flex items-center justify-between gap-4 border-t border-[var(--color-rule)] py-4"
        >
          <span className="flex items-center gap-3">
            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
            <span className="text-[1.05rem] text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
              {certificate.label}
            </span>
          </span>
          <span className="sans text-sm text-[var(--color-faint)] group-hover:text-[var(--color-accent)]">
            Verify ↗
          </span>
        </a>

        {/* divider, then the curated tools line */}
        <div className="mt-2 h-px w-full bg-[var(--color-rule)]" />
        <div className="mt-8">
          <span className="text-lg font-medium text-[var(--color-accent)]">Tools I reach for</span>
          <dl className="mt-4 space-y-2.5">
            {tools.map((t) => (
              <div key={t.group} className="flex flex-col gap-0.5 sm:flex-row sm:gap-6">
                <dt className="sans w-32 shrink-0 text-sm text-[var(--color-faint)]">{t.group}</dt>
                <dd className="m-0 text-[var(--color-muted)]">{t.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* education */}
      <section id="education" className="mt-24">
        <header className="mb-8">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Education</h2>
          <div className="mt-5 h-px w-full bg-[var(--color-rule)]" />
        </header>
        <p className="text-[1.05rem] text-[var(--color-ink)]">{education.degree}</p>
        <p className="mt-1 text-[var(--color-muted)]">
          {education.school} · {education.years} · {education.note}
        </p>
      </section>
    </Layout>
  );
}
