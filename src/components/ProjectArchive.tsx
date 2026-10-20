import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useState, type MouseEvent } from 'react';
import type { Project } from '../data/projects';
import { GitHubIcon } from './Icons';
import { StatusBadge } from './StatusBadge';

interface Props {
  items: Project[];
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

/**
 * Smaller projects as an index list. On desktop a preview card follows the
 * mouse while you hover a row.
 */
export function ProjectArchive({ items, onOpen }: Props) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<Project | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 300, damping: 30 });
  const y = useSpring(my, { stiffness: 300, damping: 30 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left + 24);
    my.set(e.clientY - r.top - 70);
  };

  return (
    <div className="archive" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      <ol className="archive__list">
        {items.map((p) => (
          <li
            key={p.id}
            className="archive__row"
            onMouseEnter={() => setHover(p)}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('a, button')) return;
              const btn = e.currentTarget.querySelector<HTMLButtonElement>('[data-open-project]');
              if (btn) onOpen(p, btn);
            }}
          >
            <span className="archive__when tabular">{p.when}</span>
            <span className="archive__main">
              <button type="button" className="archive__title" data-open-project onClick={(e) => onOpen(p, e.currentTarget)} aria-haspopup="dialog">
                {p.title}
              </button>
              <span className="archive__tagline">{p.tagline}</span>
            </span>
            <span className="archive__stack">{p.stack.slice(0, 3).join(', ')}</span>
            <span className="archive__end">
              {p.status !== 'Completed' && <StatusBadge status={p.status} />}
              {p.links?.github && (
                <a className="icon-btn icon-btn--sm" href={p.links.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source code on GitHub (opens in a new tab)`} title="Source on GitHub">
                  <GitHubIcon />
                </a>
              )}
              <ArrowUpRight className="archive__arrow" aria-hidden="true" />
            </span>
          </li>
        ))}
      </ol>

      {!reduce && (
        <AnimatePresence>
          {hover && (
            <motion.div
              key="preview"
              className="archive__preview"
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              <AnimatePresence mode="wait">
                <motion.div key={hover.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
                  <span className="archive__preview-year tabular">{hover.when}</span>
                  <span className="archive__preview-title">{hover.title}</span>
                  <span className="archive__preview-text">{hover.summary}</span>
                  <span className="archive__preview-stack">
                    {hover.stack.slice(0, 4).map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
