import { AnimatePresence, animate, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const STEPS = ['Reading the numbers', 'Building the model', 'Shipping the product'];
const DURATION = 2.1; // seconds for the count to reach 100

// A small rising sparkline the loader draws as it counts.
const LINE = 'M0 60 L18 52 L34 56 L52 40 L70 44 L88 28 L108 32 L128 14 L150 18 L172 4';

interface Props {
  onDone: () => void;
}

/**
 * Opening screen: a counter runs to 100 while a sparkline draws, then two
 * panels slide away to reveal the page. Click or press any key to skip.
 * Skipped entirely when the visitor prefers reduced motion.
 */
export function Loader({ onDone }: Props) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(!reduce);

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    document.body.classList.add('is-locked');
    const controls = animate(0, 100, {
      duration: DURATION,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => window.setTimeout(() => setVisible(false), 250),
    });
    const skip = () => {
      controls.stop();
      setVisible(false);
    };
    window.addEventListener('keydown', skip);
    return () => {
      controls.stop();
      window.removeEventListener('keydown', skip);
    };
  }, [reduce, onDone]);

  const step = STEPS[Math.min(STEPS.length - 1, Math.floor((count / 100) * STEPS.length))];

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.classList.remove('is-locked');
        onDone();
      }}
    >
      {visible && (
        <motion.div
          className="loader"
          role="status"
          aria-live="polite"
          aria-label={`Loading portfolio, ${count}%`}
          onClick={() => setVisible(false)}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          <motion.div className="loader__panel loader__panel--top" exit={{ y: '-100%' }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} />
          <motion.div className="loader__panel loader__panel--bottom" exit={{ y: '100%' }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} />

          <motion.div className="loader__inner" exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
            <div className="loader__brand">
              <span className="brand__mark" aria-hidden="true">
                PS
              </span>
              <span>Pratap Sikdar</span>
            </div>

            <div className="loader__count tabular" aria-hidden="true">
              {String(count).padStart(3, '0')}
              <span className="loader__pct">%</span>
            </div>

            <svg className="loader__chart" viewBox="0 0 172 64" aria-hidden="true">
              <path className="loader__chart-base" d={LINE} />
              <path className="loader__chart-line" d={LINE} pathLength={100} style={{ strokeDashoffset: 100 - count }} />
              <circle className="loader__chart-dot" r="3.5" cx={(count / 100) * 172} cy={64 - 4 - (count / 100) * 56} />
            </svg>

            <div className="loader__step" aria-hidden="true">
              <AnimatePresence mode="wait">
                <motion.span key={step} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.25 }}>
                  {step}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="loader__bar" aria-hidden="true">
              <span style={{ transform: `scaleX(${count / 100})` }} />
            </div>
            <p className="loader__skip">Click or press any key to skip</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
