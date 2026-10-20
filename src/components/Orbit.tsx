import type { CSSProperties } from 'react';

const RINGS: { items: string[]; duration: number; reverse?: boolean; size: number }[] = [
  { items: ['Excel', 'Python', 'SQL', 'Valuation'], duration: 42, size: 0.76 },
  { items: ['React', 'Java', 'XIRR', 'Kite API', 'Dashboards'], duration: 64, reverse: true, size: 1.0 },
];

/**
 * Skills orbiting the avatar on two rings that turn in opposite directions.
 * Labels stay upright. Static under reduced motion.
 */
export function Orbit() {
  return (
    <div className="orbit" aria-hidden="true">
      {RINGS.map((ring, r) => (
        <div
          key={r}
          className={`orbit__ring${ring.reverse ? ' is-reverse' : ''}`}
          style={{ '--dur': `${ring.duration}s`, '--ring': ring.size } as CSSProperties}
        >
          {ring.items.map((label, i) => (
            <span key={label} className="orbit__item" style={{ '--a': `${(360 / ring.items.length) * i + r * 30}deg` } as CSSProperties}>
              <span className={`orbit__chip${(i + r) % 2 ? ' is-teal' : ''}`}>{label}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
