import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { CiViewBoard, CiRoute, CiCompass1, CiBoxList } from 'react-icons/ci';
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram, FaRegEnvelope } from 'react-icons/fa6';
import { SiLeetcode, SiCodeforces, SiCodechef } from 'react-icons/si';
import type { IconType } from 'react-icons';

// Priority order: Work (proof) · Thinking (differentiator) · Interests (trajectory) · Skills (table-stakes).
const nav: { label: string; id: string; Icon: IconType }[] = [
  { label: 'Work', id: 'work', Icon: CiViewBoard },
  { label: 'Thinking', id: 'thinking', Icon: CiRoute },
  { label: 'Interests', id: 'interests', Icon: CiCompass1 },
  { label: 'Skills', id: 'skills', Icon: CiBoxList },
];

const footerLinks: { label: string; href: string; Icon: IconType }[] = [
  { label: 'Email', href: `mailto:${site.email}`, Icon: FaRegEnvelope },
  { label: 'GitHub', href: site.links.github, Icon: FaGithub },
  { label: 'LinkedIn', href: site.links.linkedin, Icon: FaLinkedinIn },
  { label: 'LeetCode', href: site.links.leetcode, Icon: SiLeetcode },
  { label: 'Codeforces', href: site.links.codeforces, Icon: SiCodeforces },
  { label: 'CodeChef', href: site.links.codechef, Icon: SiCodechef },
  { label: 'X', href: site.links.x, Icon: FaXTwitter },
  { label: 'Instagram', href: site.links.instagram, Icon: FaInstagram },
];

function SiteHeader() {
  const [condensed, setCondensed] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  // (3) condense on scroll
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // (1) scroll-spy: which section is currently in view
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    // Track each section's intersecting state; the active one is the topmost
    // section currently crossing the detection band. When NONE are (e.g. scrolled
    // up into the hero), clear the active id so nothing stays stuck highlighted.
    const visibility = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visibility.set(e.target.id, e.isIntersecting));
        const current = nav.find((n) => visibility.get(n.id));
        setActiveId(current ? current.id : '');
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 -mx-6 flex items-center justify-between border-b px-6 py-7 transition-colors duration-300 sm:-mx-8 sm:px-8 ${
        condensed ? 'border-[var(--color-rule)] backdrop-blur-md' : 'border-transparent'
      }`}
      style={condensed ? { background: 'color-mix(in srgb, var(--color-paper) 82%, transparent)' } : undefined}
    >
      <Link to="/" className="wordmark text-2xl font-medium tracking-tight">
        {site.name}
      </Link>
      <nav className="flex items-center gap-3 sm:gap-6">
        {nav.map(({ label, id, Icon }) => {
          const active = activeId === id;
          return (
            <a
              key={id}
              href={`/#${id}`}
              className={`nav-link sans group flex items-center gap-1.5 text-[0.72rem] font-semibold tracking-wide no-underline transition-colors ${
                active ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)] hover:text-[var(--color-accent)]'
              } ${active ? 'is-active' : ''}`}
            >
              <Icon
                size={16}
                className={`transition-colors ${active ? 'text-[var(--color-accent)]' : 'text-[var(--color-faint)] group-hover:text-[var(--color-accent)]'}`}
                aria-hidden="true"
              />
              <span className="nav-label hidden sm:inline">{label}</span>
            </a>
          );
        })}
      </nav>
    </header>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-8">
      <SiteHeader />

      <main>{children}</main>

      <footer className="mt-28 border-t border-[var(--color-rule)] py-12">
        <p className="max-w-[40ch] text-lg leading-relaxed text-[var(--color-ink)]">
          {site.connect}
        </p>
        <nav className="mt-7 flex flex-wrap items-center gap-5">
          {footerLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              aria-label={label}
              title={label}
              className="footer-link text-[var(--color-faint)] transition-colors hover:text-[var(--color-accent)]"
            >
              <Icon size={19} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <p className="sans mt-8 text-xs text-[var(--color-faint)]">{site.location}</p>
      </footer>
    </div>
  );
}
