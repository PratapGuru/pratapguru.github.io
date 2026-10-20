import { ArrowRight, Maximize2 } from 'lucide-react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type FocusEvent } from 'react';
import type { Project } from '../data/projects';
import { GitHubIcon } from './Icons';
import { ProjectVisual, visualLabel } from './ProjectVisual';
import { StatusBadge } from './StatusBadge';

interface Props {
  items: Project[];
  onOpen: (project: Project, trigger: HTMLElement) => void;
  archiveCount: number;
}

function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

/**
 * Feature projects in a horizontal gallery. On larger screens the section pins
 * and vertical scrolling moves the cards sideways; on phones (or with reduced
 * motion) it is a normal swipeable row.
 */
export function ProjectGallery({ items, onOpen, archiveCount }: Props) {
  const reduce = useReducedMotion();
  const wide = useMedia('(min-width: 900px)');
  const pinned = wide && !reduce;

  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  const measure = useCallback(() => {
    if (!track.current) return;
    setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, items, pinned]);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (p) => -p * distance);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (!pinned) return;
    setActive(Math.min(items.length - 1, Math.round(p * (items.length - 1 + 0.6))));
  });

  // Keyboard users: tabbing to an off-screen card scrolls the page so it slides into view.
  const onFocusCard = (e: FocusEvent<HTMLElement>) => {
    if (!pinned || !section.current) return;
    const card = (e.target as HTMLElement).closest<HTMLElement>('.g-card');
    if (!card || distance === 0) return;
    const top = section.current.getBoundingClientRect().top + window.scrollY;
    const target = Math.min(distance, Math.max(0, card.offsetLeft - window.innerWidth * 0.08));
    window.scrollTo({ top: top + target, behavior: 'auto' });
  };

  return (
    <div
      ref={section}
      className={`gallery${pinned ? ' is-pinned' : ''}`}
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="gallery__sticky">
        <motion.div ref={track} className="gallery__track" style={pinned ? { x } : undefined} onFocus={onFocusCard}>
          {items.map((p, i) => (
            <GalleryCard key={p.id} project={p} index={i} total={items.length} onOpen={onOpen} />
          ))}
          {archiveCount > 0 && (
            <a className="g-end" href="#archive">
              <span className="g-end__count tabular">+{archiveCount}</span>
              <span className="g-end__text">more in the archive</span>
              <ArrowRight aria-hidden="true" />
            </a>
          )}
        </motion.div>

        {pinned && (
          <div className="gallery__hud" aria-hidden="true">
            <span className="tabular">
              {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <span className="gallery__bar">
              <motion.span style={{ scaleX: bar }} />
            </span>
            <span>Scroll to explore</span>
          </div>
        )}
      </div>
    </div>
  );
}

function GalleryCard({ project, index, total, onOpen }: { project: Project; index: number; total: number; onOpen: Props['onOpen'] }) {
  return (
    <article
      className="g-card"
      aria-labelledby={`g-${project.id}`}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('a, button')) return;
        const btn = e.currentTarget.querySelector<HTMLButtonElement>('[data-open-project]');
        if (btn) onOpen(project, btn);
      }}
    >
      <div className="g-card__visual">
        <ProjectVisual project={project} />
        <span className="pv-label">{visualLabel(project)}</span>
        <span className="g-card__num tabular" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
          <small>/{String(total).padStart(2, '0')}</small>
        </span>
      </div>
      <div className="g-card__body">
        <div className="g-card__meta">
          <StatusBadge status={project.status} />
          <span>{project.when}</span>
          <span className="g-card__context">{project.context}</span>
        </div>
        <h4 className="g-card__title" id={`g-${project.id}`}>
          {project.title}
        </h4>
        <p className="g-card__tagline">{project.tagline}</p>
        <p className="g-card__summary">{project.summary}</p>
        <div className="g-card__foot">
          {project.stack.length > 0 && (
            <ul className="chips" aria-label="Technology">
              {project.stack.slice(0, 4).map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
              {project.stack.length > 4 && <li className="chip chip--more">+{project.stack.length - 4}</li>}
            </ul>
          )}
          <div className="g-card__actions">
            <button type="button" className="btn btn--small btn--primary" data-open-project onClick={(e) => onOpen(project, e.currentTarget)} aria-haspopup="dialog">
              <Maximize2 aria-hidden="true" />
              Case study<span className="sr-only">: {project.title}</span>
            </button>
            {project.links?.github && (
              <a className="btn btn--small" href={project.links.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
                Code<span className="sr-only"> for {project.title} on GitHub (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
