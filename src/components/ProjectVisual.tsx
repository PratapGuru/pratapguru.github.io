import { Check } from 'lucide-react';
import type { Project } from '../data/projects';

/**
 * Illustrative previews drawn in SVG/CSS. They show the *kind* of work,
 * not real data or real screenshots — the card labels them as such.
 */

// Deterministic candle series so the picture is stable between renders.
const CANDLES = [
  [62, 70, 55, 74], [70, 66, 60, 75], [66, 74, 63, 78], [74, 82, 71, 86], [82, 78, 74, 85],
  [78, 88, 76, 92], [88, 85, 80, 91], [85, 95, 83, 99], [95, 102, 91, 106], [102, 97, 93, 105],
  [97, 108, 95, 112], [108, 116, 104, 120], [116, 112, 108, 121], [112, 124, 110, 128],
];

function Candles() {
  const w = 320;
  const h = 200;
  const step = 20;
  const y = (v: number) => h - 30 - (v - 50) * 1.85;
  const trend = CANDLES.map(([o, c], i) => `${i === 0 ? 'M' : 'L'}${22 + i * step} ${y((o + c) / 2)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      {[40, 80, 120, 160].map((gy) => (
        <line key={gy} x1="8" x2={w - 8} y1={gy} y2={gy} className="s-line" strokeDasharray="2 5" />
      ))}
      {CANDLES.map(([o, c, l, hi], i) => {
        const x = 22 + i * step;
        const up = c >= o;
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={y(hi)} y2={y(l)} className="s-line" strokeWidth="1.3" />
            <rect
              x={x - 5}
              width="10"
              y={y(Math.max(o, c))}
              height={Math.max(3, Math.abs(y(o) - y(c)))}
              rx="1.5"
              className={up ? 's-blue' : 's-down'}
            />
          </g>
        );
      })}
      <path d={trend} className="s-stroke-violet" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="226" y="14" width="84" height="26" rx="6" className="s-panel" />
      <circle cx="238" cy="27" r="3.5" className="s-blue" />
      <rect x="247" y="24" width="52" height="6" rx="3" className="s-muted" opacity="0.6" />
    </svg>
  );
}

function Valuation() {
  // Waterfall: revenue → costs → EBITDA → … → FCFF, then EV. Shapes only, no figures.
  const bars: { x: number; top: number; bottom: number; kind: 'blue' | 'down' | 'violet'; label: string }[] = [
    { x: 24, top: 40, bottom: 160, kind: 'blue', label: 'Revenue' },
    { x: 74, top: 40, bottom: 82, kind: 'down', label: 'Costs' },
    { x: 124, top: 82, bottom: 160, kind: 'blue', label: 'EBITDA' },
    { x: 174, top: 82, bottom: 104, kind: 'down', label: 'Tax, capex' },
    { x: 224, top: 104, bottom: 160, kind: 'blue', label: 'FCFF' },
  ];
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true">
      <line x1="12" x2="308" y1="160" y2="160" className="s-line" />
      {bars.map((b, i) => (
        <g key={b.label}>
          <rect x={b.x} y={b.top} width="34" height={b.bottom - b.top} rx="3" className={`s-${b.kind}`} />
          {i < bars.length - 1 && (
            <line
              x1={b.x + 34}
              x2={bars[i + 1].x}
              y1={i % 2 === 0 ? b.top : b.bottom}
              y2={i % 2 === 0 ? b.top : b.bottom}
              className="s-line"
              strokeDasharray="2 3"
            />
          )}
          <text x={b.x + 17} y="178" textAnchor="middle" className="s-text" fontSize="9">
            {b.label}
          </text>
        </g>
      ))}
      <rect x="270" y="56" width="34" height="104" rx="3" className="s-violet" opacity="0.9" />
      <text x="287" y="178" textAnchor="middle" className="s-text" fontSize="9">
        EV
      </text>
      <rect x="18" y="14" width="98" height="16" rx="4" className="s-panel" />
      <rect x="25" y="20" width="40" height="4" rx="2" className="s-muted" opacity="0.7" />
      <rect x="70" y="20" width="38" height="4" rx="2" className="s-blue" opacity="0.8" />
    </svg>
  );
}

function Allocation() {
  // Donut with four segments + a benchmark comparison strip.
  const r = 46;
  const c = 2 * Math.PI * r;
  const segs = [
    { share: 0.42, cls: 's-stroke-blue' },
    { share: 0.24, cls: 's-stroke-violet' },
    { share: 0.2, cls: 'seg-muted' },
    { share: 0.14, cls: 'seg-down' },
  ];
  let offset = 0;
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true">
      <g transform="translate(86 100) rotate(-90)">
        {segs.map((s, i) => {
          const len = s.share * c - 3;
          const el = (
            <circle
              key={i}
              r={r}
              fill="none"
              strokeWidth="16"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
              className={s.cls}
              style={s.cls === 'seg-muted' ? { stroke: 'var(--text-3)' } : s.cls === 'seg-down' ? { stroke: 'var(--line-strong)' } : undefined}
            />
          );
          offset += s.share * c;
          return el;
        })}
      </g>
      {/* Portfolio vs benchmark lines */}
      <rect x="164" y="34" width="140" height="132" rx="10" className="s-panel" />
      <polyline points="176,140 196,128 216,132 236,112 256,116 276,96 292,92" className="s-stroke-blue" strokeWidth="2" strokeLinejoin="round" />
      <polyline points="176,142 196,134 216,128 236,120 256,108 276,102 292,84" className="s-stroke-violet" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="176" y="46" width="10" height="4" rx="2" className="s-blue" />
      <rect x="190" y="46" width="34" height="4" rx="2" className="s-muted" opacity="0.6" />
      <rect x="176" y="56" width="10" height="4" rx="2" className="s-violet" />
      <rect x="190" y="56" width="44" height="4" rx="2" className="s-muted" opacity="0.6" />
    </svg>
  );
}

function Database() {
  const rows = 6;
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true">
      <rect x="20" y="22" width="280" height="160" rx="10" className="s-panel" />
      <rect x="20" y="22" width="280" height="26" rx="10" className="s-faint" />
      {[34, 120, 196, 256].map((x, i) => (
        <rect key={x} x={x} y="32" width={[60, 54, 40, 30][i]} height="6" rx="3" className="s-muted" opacity="0.8" />
      ))}
      {Array.from({ length: rows }).map((_, r) => {
        const y = 60 + r * 20;
        return (
          <g key={r}>
            <line x1="20" x2="300" y1={y + 14} y2={y + 14} className="s-line" opacity="0.6" />
            <rect x="34" y={y + 2} width={70 - (r % 3) * 12} height="6" rx="3" className="s-text" opacity="0.55" />
            <rect x="120" y={y + 2} width={46 + (r % 2) * 14} height="6" rx="3" className="s-muted" opacity="0.45" />
            <rect x="196" y={y} width="44" height="10" rx="5" className={r % 3 === 0 ? 's-violet' : 's-blue'} opacity="0.35" />
            <rect x="256" y={y + 2} width="28" height="6" rx="3" className="s-muted" opacity="0.45" />
          </g>
        );
      })}
    </svg>
  );
}

function Clinic() {
  const booked = new Set([2, 5, 9, 10, 15, 18, 23, 26, 29]);
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true">
      <rect x="18" y="22" width="166" height="158" rx="10" className="s-panel" />
      <rect x="30" y="34" width="70" height="7" rx="3.5" className="s-muted" opacity="0.8" />
      {Array.from({ length: 30 }).map((_, i) => {
        const col = i % 6;
        const row = Math.floor(i / 6);
        return (
          <rect
            key={i}
            x={30 + col * 24}
            y={54 + row * 24}
            width="20"
            height="18"
            rx="4"
            className={booked.has(i) ? 's-blue' : 's-faint'}
            opacity={booked.has(i) ? 0.85 : 1}
          />
        );
      })}
      <rect x="196" y="22" width="106" height="158" rx="10" className="s-panel" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx="214" cy={48 + i * 28} r="8" className={i === 1 ? 's-violet' : 's-faint'} />
          <rect x="228" y={42 + i * 28} width={56 - (i % 2) * 14} height="5" rx="2.5" className="s-text" opacity="0.6" />
          <rect x="228" y={51 + i * 28} width="34" height="4" rx="2" className="s-muted" opacity="0.45" />
        </g>
      ))}
    </svg>
  );
}

function Crud() {
  const actions = ['Create', 'Read', 'Update', 'Delete'];
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true">
      <rect x="20" y="20" width="280" height="160" rx="10" className="s-panel" />
      {actions.map((a, i) => (
        <g key={a}>
          <rect x={32 + i * 64} y="32" width="56" height="20" rx="10" className={i === 0 ? 's-blue' : 's-faint'} opacity={i === 0 ? 0.9 : 1} />
          <text x={60 + i * 64} y="46" textAnchor="middle" fontSize="9" className={i === 0 ? '' : 's-text'} style={i === 0 ? { fill: 'var(--gold-ink)' } : undefined}>
            {a}
          </text>
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((r) => {
        const y = 68 + r * 22;
        return (
          <g key={r}>
            <circle cx="42" cy={y + 6} r="7" className="s-faint" />
            <rect x="56" y={y + 2} width={64 + (r % 3) * 10} height="6" rx="3" className="s-text" opacity="0.55" />
            <rect x="160" y={y + 2} width="48" height="6" rx="3" className="s-muted" opacity="0.45" />
            <rect x="236" y={y} width="22" height="11" rx="3" className="s-blue" opacity="0.3" />
            <rect x="262" y={y} width="22" height="11" rx="3" className="s-violet" opacity="0.3" />
          </g>
        );
      })}
    </svg>
  );
}

function Phone() {
  const on = new Set([1, 3, 4, 8, 10, 11, 15, 17, 18, 22, 24, 25]);
  const pr = new Set([11, 24]);
  return (
    <>
      <div className="phone" aria-hidden="true">
        <div className="phone__notch" />
        <div className="phone__title" />
        <div className="phone__cal">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} className={`phone__day${pr.has(i) ? ' is-pr' : on.has(i) ? ' is-on' : ''}`} />
          ))}
        </div>
        <div className="phone__bars">
          {[40, 55, 48, 66, 60, 78, 84].map((hgt, i) => (
            <span key={i} className="phone__bar" style={{ height: `${hgt}%` }} />
          ))}
        </div>
      </div>
      <div className="phone-side" aria-hidden="true">
        <span>
          <Check /> Works offline
        </span>
        <span>
          <Check /> Data stays on device
        </span>
        <span>
          <Check /> No account
        </span>
      </div>
    </>
  );
}

export function ProjectVisual({ project, eager = false }: { project: Project; eager?: boolean }) {
  if (project.image) {
    return (
      <div className="pv pv--image">
        <img
          src={project.image.src}
          alt={project.image.alt}
          width={1200}
          height={675}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    );
  }
  const map = {
    candles: <Candles />,
    valuation: <Valuation />,
    allocation: <Allocation />,
    database: <Database />,
    clinic: <Clinic />,
    crud: <Crud />,
    phone: <Phone />,
  } as const;
  return <div className="pv">{map[project.visual ?? 'crud']}</div>;
}

export function visualLabel(project: Project) {
  if (project.image) return 'Screenshot';
  return project.visual === 'phone' ? 'Illustrative mockup' : 'Illustrative preview';
}
