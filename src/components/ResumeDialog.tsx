import { AlertTriangle, ArrowUpRight, CheckCircle2, Download, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { createContext, useContext, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { links, resumes, type ResumeVersion } from '../data/profile';
import { useResume } from '../hooks/useResume';

/** Opens the resume window; pass the element that opened it so focus can return there. */
export const ResumeContext = createContext<(trigger: HTMLElement | null) => void>(() => {});
export const useOpenResume = () => useContext(ResumeContext);

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const ease = [0.22, 1, 0.36, 1] as const;

export function ResumeDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return createPortal(<AnimatePresence>{open && <Dialog onClose={onClose} />}</AnimatePresence>, document.body);
}

function Dialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // The first version (college format) is always the default tab.
  const [active, setActive] = useState(0);
  const current = resumes[active];

  // Lock page scroll, move focus into the dialog, trap Tab, close on Escape.
  useEffect(() => {
    const body = document.body;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.classList.add('is-locked');
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    tabRefs.current[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.tabIndex !== -1);
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

  // Arrow keys move between tabs (WAI-ARIA tabs pattern, automatic activation).
  const onTabKey = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    const n = resumes.length;
    let next = -1;
    if (e.key === 'ArrowRight') next = (active + 1) % n;
    else if (e.key === 'ArrowLeft') next = (active - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <motion.div className="modal-root" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={ref}
        className="modal resume-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        tabIndex={-1}
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.32, ease }}
      >
        <div className="modal__bar resume-modal__bar">
          <h2 className="resume-modal__title" id="resume-title">
            Resume
          </h2>
          <div className="rtabs" role="tablist" aria-label="Resume version">
            {resumes.map((r, i) => {
              const selected = i === active;
              return (
                <button
                  key={r.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`resume-tab-${r.id}`}
                  aria-selected={selected}
                  aria-controls={`resume-panel-${r.id}`}
                  tabIndex={selected ? 0 : -1}
                  className="rtab"
                  onClick={() => setActive(i)}
                  onKeyDown={onTabKey}
                >
                  {selected && <motion.span layoutId="rtab-bg" className="rtab__bg" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                  <span className="rtab__label">
                    {r.label}
                    {i === 0 && <span className="rtab__badge">Default</span>}
                  </span>
                </button>
              );
            })}
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close resume">
            <X aria-hidden="true" />
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <Panel key={current.id} version={current} onClose={onClose} />
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function Panel({ version, onClose }: { version: ResumeVersion; onClose: () => void }) {
  const state = useResume(version.path);
  const reduce = useReducedMotion();
  const [imgOk, setImgOk] = useState(true);

  return (
    <motion.div
      className="rpanel"
      role="tabpanel"
      id={`resume-panel-${version.id}`}
      aria-labelledby={`resume-tab-${version.id}`}
      initial={reduce ? false : { opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduce ? undefined : { opacity: 0, x: -18 }}
      transition={{ duration: 0.25, ease }}
    >
      <div className="rpreview">
        {imgOk ? (
          state === 'available' ? (
            <a href={version.path} target="_blank" rel="noopener noreferrer" className="rpreview__link">
              <img src={version.preview} alt={`Page 1 of the ${version.label.toLowerCase()} resume`} width={860} height={1216} />
              <span className="rpreview__hint">
                <ArrowUpRight aria-hidden="true" />
                Open full PDF<span className="sr-only"> (opens in a new tab)</span>
              </span>
            </a>
          ) : (
            <img src={version.preview} alt={`Page 1 of the ${version.label.toLowerCase()} resume`} width={860} height={1216} onError={() => setImgOk(false)} />
          )
        ) : (
          <p className="rpreview__empty">Preview not available.</p>
        )}
      </div>

      <div className="rinfo">
        <p className="rinfo__summary">{version.summary}</p>
        <h3 className="modal__h">Best for</h3>
        <ul className="check-list">
          {version.bestFor.map((b) => (
            <li key={b}>
              <CheckCircle2 aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {state === 'missing' && (
          <p className="note" role="status">
            <AlertTriangle aria-hidden="true" />
            <span>
              This version isn’t uploaded yet.{' '}
              {links.email && (
                <a className="text-link" href={`mailto:${links.email}?subject=Resume%20request`}>
                  Email me for a copy.
                </a>
              )}
            </span>
          </p>
        )}

        <div className="rinfo__actions">
          {state === 'available' ? (
            <>
              <a className="btn btn--primary" href={version.path} download={version.downloadName} type="application/pdf">
                <Download aria-hidden="true" />
                Download PDF
              </a>
              <a className="btn" href={version.path} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight aria-hidden="true" />
                Open in new tab
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </>
          ) : (
            <button type="button" className="btn btn--primary" aria-disabled="true">
              <Download aria-hidden="true" />
              {state === 'checking' ? 'Checking…' : 'Download PDF'}
            </button>
          )}
          <button type="button" className="btn btn--quiet" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
}
