import { motion, useReducedMotion } from 'motion/react';
import { useId, type ReactNode } from 'react';

/**
 * Small animated scenes of the same original character used in the hero,
 * each matched to the section it sits beside. All decorative (aria-hidden).
 * Looping motion is CSS (or SVG <animateMotion>) and is switched off under
 * prefers-reduced-motion.
 */

type Look = [number, number];

/** Shared body: blazer, shirt, head, beard — eyes can look in a direction. */
function Body({ gid, look = [0, 0] }: { gid: string; look?: Look }) {
  const [dx, dy] = look;
  return (
    <g>
      <path d="M104 440 C104 380 124 338 166 324 L210 312 L254 324 C296 338 316 380 316 440 Z" fill={`url(#${gid}-blazer)`} />
      <path d="M182 318 L210 312 L238 318 L210 372 Z" className="ch-shirt" />
      <path d="M190 314 L210 336 L230 314 L222 309 L210 322 L198 309 Z" className="ch-collar" />
      <path d="M178 320 L210 372 L196 392 L166 330 Z" className="ch-lapel" />
      <path d="M242 320 L210 372 L224 392 L254 330 Z" className="ch-lapel" />
      <path d="M262 356 L284 356 L282 362 L264 362 Z" className="ch-accent" />
      <path d="M192 270 L228 270 L230 314 L210 322 L190 314 Z" className="ch-skin-shade" />
      <ellipse cx="154" cy="226" rx="10" ry="15" className="ch-skin" />
      <ellipse cx="266" cy="226" rx="10" ry="15" className="ch-skin" />
      <ellipse cx="210" cy="218" rx="56" ry="64" className="ch-skin" />
      <path d="M152 214 C146 150 196 136 222 142 C258 146 276 176 268 214 C262 192 250 178 232 176 C214 186 186 186 168 178 C158 188 154 200 152 214 Z" className="ch-hair" />
      <path d="M168 178 C176 160 204 150 230 160 C214 160 196 168 188 180 Z" className="ch-hair-shine" />
      <path d="M154 224 C154 286 186 300 210 300 C234 300 266 286 266 224 C260 254 244 266 230 266 C222 258 198 258 190 266 C176 266 160 254 154 224 Z" className="ch-hair" />
      <path d="M186 254 C194 244 206 246 210 252 C214 246 226 244 234 254 C224 252 216 256 210 258 C204 256 196 252 186 254 Z" className="ch-hair" />
      <path d="M196 266 C204 274 216 274 224 266" className="ch-smile" />
      <path d="M210 222 C206 236 204 240 212 242" className="ch-nose" />
      <rect x="174" y="196" width="26" height="6" rx="3" className="ch-hair" transform="rotate(-6 187 199)" />
      <rect x="220" y="196" width="26" height="6" rx="3" className="ch-hair" transform="rotate(6 233 199)" />
      <ellipse cx="187" cy="218" rx="10" ry="8" className="ch-eye-white" />
      <ellipse cx="233" cy="218" rx="10" ry="8" className="ch-eye-white" />
      <circle cx={187 + dx} cy={219 + dy} r="5" className="ch-pupil" />
      <circle cx={233 + dx} cy={219 + dy} r="5" className="ch-pupil" />
      <circle cx={189 + dx} cy={217 + dy} r="1.6" className="ch-glint" />
      <circle cx={235 + dx} cy={217 + dy} r="1.6" className="ch-glint" />
      <g className="ch-lids">
        <ellipse cx="187" cy="218" rx="11" ry="9" className="ch-skin" />
        <ellipse cx="233" cy="218" rx="11" ry="9" className="ch-skin" />
      </g>
    </g>
  );
}

/** Wrapper: svg, gradient defs, soft backdrop and an entrance animation. */
function Scene({ viewBox, children, className, label }: { viewBox: string; children: (gid: string) => ReactNode; className: string; label: string }) {
  const reduce = useReducedMotion();
  const gid = `m${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <motion.div
      className={`mascot ${className}`}
      data-scene={label}
      initial={reduce ? false : { opacity: 0, y: 30, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <svg viewBox={viewBox} focusable="false">
        <defs>
          <linearGradient id={`${gid}-blazer`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#24505a" />
            <stop offset="1" stopColor="#173840" />
          </linearGradient>
        </defs>
        {children(gid)}
      </svg>
    </motion.div>
  );
}

/* ── About: thinking it through ─────────────────────────── */
export function Thinker() {
  return (
    <Scene viewBox="96 30 330 414" className="mascot--thinker" label="thinker">
      {(gid) => (
        <>
          <circle cx="215" cy="270" r="150" className="ch-backdrop" />
          <Body gid={gid} look={[3, -3]} />
          {/* hand on chin */}
          <path d="M266 420 C262 372 252 336 240 312" className="ch-sleeve" />
          <ellipse cx="238" cy="302" rx="16" ry="13" className="ch-skin" />
          <path d="M228 294 C232 288 244 288 248 294" className="mx-finger" />
          {/* thought bubble */}
          <circle cx="282" cy="182" r="6" className="mx-bubble mx-bubble--1" />
          <circle cx="304" cy="152" r="10" className="mx-bubble mx-bubble--2" />
          <path
            className="mx-cloud"
            d="M318 112 C296 112 296 82 320 80 C320 54 354 48 366 64 C382 46 414 58 408 82 C428 88 422 120 400 118 C394 136 364 138 354 126 C340 138 316 130 318 112 Z"
          />
          <text x="362" y="108" textAnchor="middle" className="mx-q">
            ?
          </text>
          <g className="mx-idea">
            <circle cx="362" cy="88" r="20" className="mx-idea-glow" />
            <circle cx="362" cy="88" r="12" className="mx-idea-bulb" />
            <rect x="356" y="99" width="12" height="9" rx="2" className="mx-idea-base" />
            <path d="M362 58 L362 50 M386 66 L392 60 M338 66 L332 60" className="mx-idea-rays" />
          </g>
        </>
      )}
    </Scene>
  );
}

/* ── Experience: on a client call, portfolio on screen ──── */
export function Advisor() {
  const r = 34;
  const c = 2 * Math.PI * r;
  const segs = [
    { share: 0.45, cls: 'mx-seg-gold' },
    { share: 0.3, cls: 'mx-seg-teal' },
    { share: 0.25, cls: 'mx-seg-muted' },
  ];
  let off = 0;
  return (
    <Scene viewBox="56 60 380 384" className="mascot--advisor" label="advisor">
      {(gid) => (
        <>
          <circle cx="225" cy="260" r="160" className="ch-backdrop" />
          <Body gid={gid} look={[2, 0]} />
          {/* phone to ear */}
          <path d="M150 360 C118 334 116 290 138 258" className="ch-sleeve" />
          <rect x="146" y="200" width="16" height="44" rx="5" className="mx-phone" transform="rotate(-14 154 222)" />
          <circle cx="142" cy="250" r="15" className="ch-skin" />
          {/* call waves */}
          <path d="M122 200 A22 22 0 0 0 118 236" className="mx-callwave mx-callwave--1" />
          <path d="M108 190 A36 36 0 0 0 102 246" className="mx-callwave mx-callwave--2" />
          {/* portfolio donut */}
          <g transform="translate(352 250)">
            <circle r={r + 14} className="mx-panel" />
            <g className="mx-donut">
              {segs.map((s) => {
                const len = s.share * c - 3;
                const el = <circle key={s.cls} r={r} className={s.cls} strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-off} />;
                off += s.share * c;
                return el;
              })}
            </g>
            <text y="5" textAnchor="middle" className="mx-donut-label">
              ₹
            </text>
          </g>
          {/* live line chart */}
          <g transform="translate(298 92)">
            <rect width="112" height="70" rx="10" className="mx-panel" />
            <rect x="12" y="12" width="34" height="5" rx="2.5" className="ch-muted" />
            <polyline points="12,56 30,48 46,52 62,36 78,40 98,20" className="mx-spark" pathLength={100} />
            <circle cx="98" cy="20" r="3.5" className="mx-spark-dot" />
          </g>
          {/* coin */}
          <g className="mx-coin">
            <circle cx="404" cy="350" r="17" className="mx-coin-face" />
            <text x="404" y="356" textAnchor="middle" className="mx-coin-sign">
              ₹
            </text>
          </g>
        </>
      )}
    </Scene>
  );
}

/* ── Projects: building at the laptop ───────────────────── */
export function Builder() {
  return (
    <Scene viewBox="60 50 380 394" className="mascot--builder" label="builder">
      {(gid) => (
        <>
          <circle cx="225" cy="260" r="160" className="ch-backdrop" />
          {/* rocket launching from behind */}
          <g className="mx-rocket">
            <path d="M100 250 C100 226 112 212 118 206 C124 212 136 226 136 250 Z" className="mx-rocket-body" />
            <circle cx="118" cy="232" r="6" className="mx-rocket-window" />
            <path d="M100 250 L92 262 L104 256 Z M136 250 L144 262 L132 256 Z" className="mx-rocket-fin" />
            <path d="M108 256 C110 270 118 278 118 286 C118 278 126 270 128 256 Z" className="mx-flame" />
          </g>
          <Body gid={gid} look={[0, 4]} />
          {/* desk + laptop */}
          <rect x="60" y="398" width="340" height="12" rx="6" className="ch-desk" />
          <path d="M140 396 L280 396 L292 402 L128 402 Z" className="ch-laptop-base" />
          <rect x="148" y="326" width="124" height="72" rx="8" className="ch-laptop" />
          <text x="210" y="370" textAnchor="middle" className="mx-laptop-code">
            {'</>'}
          </text>
          {/* typing hands */}
          <g className="mx-type-l">
            <path d="M152 360 C136 374 134 386 142 394" className="ch-sleeve ch-sleeve--thin" />
            <ellipse cx="146" cy="394" rx="14" ry="8" className="ch-skin" />
          </g>
          <g className="mx-type-r">
            <path d="M268 360 C284 374 286 386 278 394" className="ch-sleeve ch-sleeve--thin" />
            <ellipse cx="274" cy="394" rx="14" ry="8" className="ch-skin" />
          </g>
          {/* code window typing itself */}
          <g transform="translate(300 84)">
            <rect width="130" height="100" rx="12" className="mx-panel" />
            <circle cx="14" cy="14" r="3.5" className="mx-dot-r" />
            <circle cx="26" cy="14" r="3.5" className="mx-dot-y" />
            <circle cx="38" cy="14" r="3.5" className="mx-dot-g" />
            {[
              [14, 32, 70, 'mx-code--gold'],
              [24, 46, 86, 'mx-code--teal'],
              [24, 60, 58, 'mx-code--muted'],
              [14, 74, 92, 'mx-code--gold'],
              [24, 88, 48, 'mx-code--teal'],
            ].map(([x, y, w, cls], i) => (
              <rect key={i} x={x as number} y={y as number} width={w as number} height="6" rx="3" className={`mx-code ${cls}`} style={{ animationDelay: `${i * 0.35}s` }} />
            ))}
          </g>
          {/* gear */}
          <g transform="translate(398 214)">
            <g className="mx-gear">
              <path
                d="M-4 -24 H4 L6 -17 L12 -14 L18 -19 L24 -13 L19 -7 L22 -1 L29 1 V9 L22 10 L19 16 L24 22 L18 28 L12 23 L6 26 L4 33 H-4 L-6 26 L-12 23 L-18 28 L-24 22 L-19 16 L-22 10 L-29 9 V1 L-22 -1 L-19 -7 L-24 -13 L-18 -19 L-12 -14 L-6 -17 Z"
                className="mx-gear-body"
                transform="translate(0 -4)"
              />
              <circle r="8" className="mx-gear-hole" />
            </g>
          </g>
        </>
      )}
    </Scene>
  );
}

/* ── Skills: juggling the toolkit ───────────────────────── */
const JUGGLE = 'M122 290 C116 -60 304 -60 298 290 C302 40 118 40 122 290 Z';

function Tile({ kind }: { kind: 'sheet' | 'chart' | 'code' }) {
  return (
    <g transform="translate(-20 -20)">
      <rect width="40" height="40" rx="10" className={`mx-tile mx-tile--${kind}`} />
      {kind === 'sheet' && (
        <g className="mx-tile-ink">
          <path d="M9 14 H31 M9 21 H31 M9 28 H31 M17 9 V33 M25 9 V33" />
        </g>
      )}
      {kind === 'chart' && (
        <g className="mx-tile-fill">
          <rect x="9" y="22" width="5" height="10" rx="1" />
          <rect x="17" y="16" width="5" height="16" rx="1" />
          <rect x="25" y="10" width="5" height="22" rx="1" />
        </g>
      )}
      {kind === 'code' && (
        <text x="20" y="26" textAnchor="middle" className="mx-tile-text">
          {'</>'}
        </text>
      )}
    </g>
  );
}

export function Juggler() {
  const reduce = useReducedMotion();
  const kinds: ('sheet' | 'chart' | 'code')[] = ['sheet', 'chart', 'code'];
  const still: [number, number][] = [
    [140, 80],
    [210, 30],
    [280, 80],
  ];
  return (
    <Scene viewBox="70 0 280 444" className="mascot--juggler" label="juggler">
      {(gid) => (
        <>
          <circle cx="210" cy="280" r="140" className="ch-backdrop" />
          <path d={JUGGLE} className="mx-juggle-trail" />
          <Body gid={gid} look={[0, -3]} />
          {/* arms up, palms open */}
          <path d="M152 356 C124 344 114 320 122 302" className="ch-sleeve" />
          <ellipse cx="122" cy="294" rx="15" ry="12" className="ch-skin" />
          <path d="M268 356 C296 344 306 320 298 302" className="ch-sleeve" />
          <ellipse cx="298" cy="294" rx="15" ry="12" className="ch-skin" />
          {kinds.map((k, i) =>
            reduce ? (
              <g key={k} transform={`translate(${still[i][0]} ${still[i][1]})`}>
                <Tile kind={k} />
              </g>
            ) : (
              <g key={k}>
                <Tile kind={k} />
                <animateMotion dur="3.6s" repeatCount="indefinite" begin={`${-i * 1.2}s`} path={JUGGLE} />
              </g>
            ),
          )}
        </>
      )}
    </Scene>
  );
}

/* ── Contact: waving, letter in hand, plane in flight ───── */
const FLIGHT = 'M40 170 C90 70 190 70 230 120 C270 170 330 160 360 100 C380 60 420 70 430 40';

export function Messenger() {
  const reduce = useReducedMotion();
  return (
    <Scene viewBox="30 20 410 424" className="mascot--messenger" label="messenger">
      {(gid) => (
        <>
          <circle cx="220" cy="270" r="160" className="ch-backdrop" />
          <path d={FLIGHT} className="mx-flight" />
          {reduce ? (
            <g transform="translate(360 100) rotate(-35)">
              <path d="M-14 -8 L16 0 L-14 8 L-8 0 Z" className="mx-plane" />
            </g>
          ) : (
            <g>
              <path d="M-14 -8 L16 0 L-14 8 L-8 0 Z" className="mx-plane" />
              <animateMotion dur="5s" repeatCount="indefinite" rotate="auto" path={FLIGHT} />
            </g>
          )}
          <Body gid={gid} look={[3, -2]} />
          {/* waving arm */}
          <g className="ch-arm">
            <path d="M284 350 C300 330 318 300 326 262" className="ch-sleeve" />
            <circle cx="328" cy="250" r="15" className="ch-skin" />
            <rect x="318" y="226" width="7" height="18" rx="3.5" className="ch-skin" transform="rotate(-12 321 235)" />
            <rect x="327" y="224" width="7" height="18" rx="3.5" className="ch-skin" />
            <rect x="336" y="227" width="7" height="17" rx="3.5" className="ch-skin" transform="rotate(10 339 235)" />
            <path d="M318 268 L338 268" className="ch-cuff" />
          </g>
          {/* letter held at chest */}
          <path d="M150 360 C132 378 132 396 150 404" className="ch-sleeve" />
          <g className="mx-letter">
            <rect x="120" y="372" width="76" height="52" rx="6" className="mx-envelope" />
            <path d="M120 378 L158 404 L196 378" className="mx-envelope-flap" />
            <circle cx="182" cy="386" r="6" className="mx-seal" />
          </g>
          <ellipse cx="128" cy="398" rx="13" ry="11" className="ch-skin" />
          {/* @ badge */}
          <g className="mx-at">
            <circle cx="96" cy="270" r="22" className="mx-at-bg" />
            <text x="96" y="278" textAnchor="middle" className="mx-at-text">
              @
            </text>
          </g>
        </>
      )}
    </Scene>
  );
}
