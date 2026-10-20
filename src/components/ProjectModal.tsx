import { AlertTriangle, ArrowUpRight, CheckCircle2, CircleDashed, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../data/projects';
import { GitHubIcon } from './Icons';
import { ProjectVisual, visualLabel } from './ProjectVisual';
import { StatusBadge } from './StatusBadge';

interface Props {
  project: Project | null;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: Props) {
  return createPortal(
    <AnimatePresence>{project && <Dialog key={project.id} project={project} onClose={onClose} />}</AnimatePresence>,
    document.body,
  );
}

function Dialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  // Lock page scroll, move focus into the dialog, trap Tab, close on Escape.
  useEffect(() => {
    const body = document.body;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.classList.add('is-locked');
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    ref.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const activeEl = document.activeElement;
      if (e.shiftKey && (activeEl === first || activeEl === ref.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      body.classList.remove('is-locked');
      body.style.paddingRight = '';
    };
  }, [onClose]);

  const label = visualLabel(project);
  const titleId = `modal-title-${project.id}`;
  const descId = `modal-desc-${project.id}`;

  return (
    <motion.div className="modal-root" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={ref}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="modal__bar">
          <div className="modal__bar-meta">
            <StatusBadge status={project.status} />
            <span>
              {project.when}, {project.context.charAt(0).toLowerCase() + project.context.slice(1)}
            </span>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close project details">
            <X aria-hidden="true" />
          </button>
        </div>

        <div className="modal__visual">
          <ProjectVisual project={project} eager />
          <span className="pv-label">{label}</span>
        </div>

        <div className="modal__body">
          <h2 className="modal__title" id={titleId}>
            {project.title}
          </h2>
          <p className="modal__tagline">{project.tagline}</p>
          <p className="modal__summary" id={descId}>
            {project.summary}
          </p>

          {project.note && (
            <p className="note">
              <AlertTriangle aria-hidden="true" />
              <span>{project.note}</span>
            </p>
          )}

          <div className="modal__grid">
            <section>
              <h3 className="modal__h">The problem</h3>
              <p className="modal__text">{project.problem}</p>
            </section>
            <section>
              <h3 className="modal__h">My role</h3>
              <p className="modal__text">{project.role}</p>
            </section>

            {project.approach.length > 0 && (
              <section className="modal__section--wide">
                <h3 className="modal__h">Approach</h3>
                <ol className="steps">
                  {project.approach.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ol>
              </section>
            )}

            <section>
              <h3 className="modal__h">{project.implementedLabel ?? 'What works today'}</h3>
              <ul className="check-list">
                {project.implemented.map((f) => (
                  <li key={f}>
                    <CheckCircle2 aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            {project.planned && project.planned.length > 0 && (
              <section>
                <h3 className="modal__h">{project.plannedLabel ?? 'Planned'}</h3>
                <ul className="plan-list">
                  {project.planned.map((f) => (
                    <li key={f}>
                      <CircleDashed aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.decisions && project.decisions.length > 0 && (
              <section>
                <h3 className="modal__h">Design decisions</h3>
                <ul className="ticks">
                  {project.decisions.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </section>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <section>
                <h3 className="modal__h">Challenges</h3>
                <ul className="ticks">
                  {project.challenges.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </section>
            )}

            {project.learnings && project.learnings.length > 0 && (
              <section>
                <h3 className="modal__h">What I learned</h3>
                <ul className="ticks">
                  {project.learnings.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="modal__section--wide">
              <h3 className="modal__h">Technology</h3>
              {project.stack.length > 0 ? (
                <ul className="project-card__stack">
                  {project.stack.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="modal__text">Not decided yet.</p>
              )}
            </section>
          </div>

          <div className="modal__links">
            {project.links?.github && (
              <a className="btn btn--primary" href={project.links.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
                View source on GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {project.links?.demo && (
              <a className="btn" href={project.links.demo} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight aria-hidden="true" />
                Open live demo
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {!project.links?.github && !project.links?.demo && (
              <p className="inline-note">There’s no public repository or demo for this project.</p>
            )}
            <button type="button" className="btn btn--quiet" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
