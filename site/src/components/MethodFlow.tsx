/* The thinking METHOD as a horizontal flow: problem → why → learn → solution →
   implement → monitor. On scroll-in, a shooting-star (glowing head + trailing tail)
   streaks from circle to circle; ONLY the circle it's currently at is highlighted
   (a moving spotlight, not a cumulative fill). Accent = the site oxblood.
   Reduced-motion: the flow rests with the first stage lit, no motion. */
import { useRef, useState, useEffect } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { STAGES } from '../data/rootcause';
import {
  LuTriangleAlert, LuScanSearch, LuBrain, LuLightbulb, LuHammer, LuActivity,
} from 'react-icons/lu';
import type { IconType } from 'react-icons';
import type { Stage } from '../data/rootcause';

const ICON: Record<Stage, IconType> = {
  problem: LuTriangleAlert, why: LuScanSearch, learn: LuBrain,
  solution: LuLightbulb, implement: LuHammer, monitor: LuActivity,
};

const N = STAGES.length;
const HOLD = 620;   // ms a circle stays lit
const TRAVEL = 460; // ms the star takes between circles

const CIRCLE_R = 18; // px — half of the h-9 (36px) node

export function MethodFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });

  // measure the row width so the comet can travel circle-edge → circle-edge in px
  const [rowW, setRowW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setRowW(e.contentRect.width));
    ro.observe(ref.current);
    setRowW(ref.current.clientWidth);
    return () => ro.disconnect();
  }, []);

  // active = index of the currently-lit circle (only one at a time, -1 = none)
  const [active, setActive] = useState(-1);
  // star: { from, to, t } where t∈[0,1]; null when resting on a circle
  const [star, setStar] = useState<{ from: number; to: number; t: number } | null>(null);

  useEffect(() => {
    if (reduce) { setActive(0); return; }
    if (!inView) return;

    let raf = 0;
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((r) => (raf = window.setTimeout(r, ms) as unknown as number));

    async function run() {
      await sleep(300);
      while (!cancelled) {
        for (let i = 0; i < N; i++) {
          if (cancelled) return;
          setActive(i);            // light circle i (and only i) — instant
          await sleep(HOLD);
          if (i < N - 1) {
            setActive(-1);         // circle goes dark while the star travels
            await travel(i, i + 1);
          }
        }
        if (cancelled) return;
        setActive(N - 1);          // briefly rest lit on the last stage
        await sleep(900);
        setActive(-1);
        await sleep(700);          // pause, then loop again
      }
    }

    function travel(from: number, to: number) {
      return new Promise<void>((resolve) => {
        const start = performance.now();
        const frame = (now: number) => {
          if (cancelled) return resolve();
          const t = Math.min(1, (now - start) / TRAVEL);
          setStar({ from, to, t });
          if (t < 1) raf = requestAnimationFrame(frame);
          else { setStar(null); resolve(); }
        };
        raf = requestAnimationFrame(frame);
      });
    }

    run();
    return () => { cancelled = true; clearTimeout(raf); cancelAnimationFrame(raf); };
  }, [inView, reduce]);

  // Stage i is centred at (i+0.5)/N of the row, in PX. The comet travels from the
  // right EDGE of the departing circle to the left EDGE of the arriving circle —
  // so it leaves one circle and visibly touches the next, never sitting inside one.
  const centerPx = (i: number) => ((i + 0.5) / N) * rowW;
  let starLeftPx: number | null = null;
  if (star && rowW) {
    const a = centerPx(star.from) + CIRCLE_R; // right edge of `from`
    const b = centerPx(star.to) - CIRCLE_R;   // left edge of `to`
    starLeftPx = a + (b - a) * star.t;
  }

  return (
    <div ref={ref} className="method-flow relative mt-10">
      {/* the shooting star travelling along the row (desktop) */}
      {starLeftPx !== null && (
        <span
          className="pointer-events-none absolute z-20 hidden sm:block"
          style={{ left: `${starLeftPx}px`, top: '18px', transform: 'translate(-50%, -50%)' }}
          aria-hidden="true"
        >
          <span className="star-comet" />
        </span>
      )}

      <ol className="grid grid-cols-2 gap-y-8 sm:grid-cols-6 sm:gap-y-0">
        {STAGES.map((s, i) => {
          const Icon = ICON[s.id];
          const lit = i === active; // only the current one
          return (
            <li key={s.id} className="relative flex flex-col items-center px-2 text-center">
              {i < N - 1 && (
                <span
                  className="absolute left-1/2 top-[18px] hidden h-px w-full sm:block"
                  style={{ background: 'var(--color-rule)' }}
                  aria-hidden="true"
                />
              )}
              <span
                className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-paper)]"
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  // instant on (snap to accent when the star arrives), gentle fade out
                  transition: lit ? 'none' : 'border-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease',
                  borderColor: lit ? 'var(--color-accent)' : 'var(--color-rule)',
                  color: lit ? 'var(--color-accent)' : 'var(--color-faint)',
                  boxShadow: lit ? '0 0 0 4px color-mix(in srgb, var(--color-accent) 14%, transparent)' : 'none',
                }}
              >
                <Icon size={16} strokeWidth={2.4} aria-hidden="true" />
              </span>
              <span
                className="method-label mt-3 text-[0.82rem] font-medium tracking-tight"
                style={{
                  color: lit ? 'var(--color-accent)' : 'var(--color-muted)',
                  transition: lit ? 'none' : 'color 0.4s ease',
                }}
              >
                {s.label}
              </span>
              <span className="method-hint mt-1 text-[0.72rem] leading-snug text-[var(--color-faint)]">{s.hint}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
