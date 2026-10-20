import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import { Counter } from './Counter';

const projectCount = projects.length;

/**
 * An original, hand-drawn SVG character: a young professional at a desk.
 * - eyes follow the pointer, blinks every few seconds
 * - waves once the intro finishes, then every so often
 * - types on the laptop while a chart on the side screen keeps growing
 * Decorative: the figure itself is aria-hidden; the floating stat cards are real text.
 */
export function Character({ play }: { play: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Pointer → eye and head offset, smoothed.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const eyeX = useTransform(sx, (v) => v * 3.2);
  const eyeY = useTransform(sy, (v) => v * 2.4);
  const headX = useTransform(sx, (v) => v * 4);
  const headY = useTransform(sy, (v) => v * 2);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.42;
      px.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2))));
      py.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2))));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, px, py]);

  return (
    <div className="character" ref={ref}>
      <motion.div
        className="character__stage"
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.92 }}
        animate={play ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      >
        <svg viewBox="0 0 420 440" className="character__svg" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="ch-blazer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#24505a" />
              <stop offset="1" stopColor="#173840" />
            </linearGradient>
            <linearGradient id="ch-screen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1b3239" />
              <stop offset="1" stopColor="#10252b" />
            </linearGradient>
          </defs>

          {/* backdrop */}
          <circle cx="210" cy="215" r="176" className="ch-backdrop" />
          <circle cx="210" cy="215" r="176" className="ch-ring" />

          {/* side screen with a live chart */}
          <g className="ch-monitor">
            <rect x="282" y="86" width="118" height="92" rx="10" fill="url(#ch-screen)" stroke="var(--line-strong)" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={296 + i * 20}
                y={160 - (22 + i * 11)}
                width="12"
                height={22 + i * 11}
                rx="2"
                className={i === 4 ? 'ch-bar ch-bar--hot' : 'ch-bar'}
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
            <rect x="296" y="98" width="38" height="5" rx="2.5" className="ch-muted" />
            <rect x="338" y="98" width="20" height="5" rx="2.5" className="ch-accent" />
            <rect x="334" y="178" width="14" height="22" className="ch-stand" />
            <rect x="316" y="198" width="50" height="6" rx="3" className="ch-stand" />
          </g>

          {/* body */}
          <motion.g style={{ x: headX, y: headY }}>
            {/* torso */}
            <path d="M104 440 C104 380 124 338 166 324 L210 312 L254 324 C296 338 316 380 316 440 Z" fill="url(#ch-blazer)" />
            {/* shirt + collar */}
            <path d="M182 318 L210 312 L238 318 L210 372 Z" className="ch-shirt" />
            <path d="M190 314 L210 336 L230 314 L222 309 L210 322 L198 309 Z" className="ch-collar" />
            {/* lapels */}
            <path d="M178 320 L210 372 L196 392 L166 330 Z" className="ch-lapel" />
            <path d="M242 320 L210 372 L224 392 L254 330 Z" className="ch-lapel" />
            {/* pocket square */}
            <path d="M262 356 L284 356 L282 362 L264 362 Z" className="ch-accent" />

            {/* neck */}
            <path d="M192 270 L228 270 L230 314 L210 322 L190 314 Z" className="ch-skin-shade" />

            {/* head */}
            <g>
              <ellipse cx="154" cy="226" rx="10" ry="15" className="ch-skin" />
              <ellipse cx="266" cy="226" rx="10" ry="15" className="ch-skin" />
              <ellipse cx="210" cy="218" rx="56" ry="64" className="ch-skin" />
              {/* hair */}
              <path d="M152 214 C146 150 196 136 222 142 C258 146 276 176 268 214 C262 192 250 178 232 176 C214 186 186 186 168 178 C158 188 154 200 152 214 Z" className="ch-hair" />
              <path d="M168 178 C176 160 204 150 230 160 C214 160 196 168 188 180 Z" className="ch-hair-shine" />
              {/* beard */}
              <path d="M154 224 C154 286 186 300 210 300 C234 300 266 286 266 224 C260 254 244 266 230 266 C222 258 198 258 190 266 C176 266 160 254 154 224 Z" className="ch-hair" />
              {/* moustache */}
              <path d="M186 254 C194 244 206 246 210 252 C214 246 226 244 234 254 C224 252 216 256 210 258 C204 256 196 252 186 254 Z" className="ch-hair" />
              {/* smile */}
              <path d="M196 266 C204 274 216 274 224 266" className="ch-smile" />
              {/* nose */}
              <path d="M210 222 C206 236 204 240 212 242" className="ch-nose" />
              {/* brows */}
              <rect x="174" y="196" width="26" height="6" rx="3" className="ch-hair" transform="rotate(-6 187 199)" />
              <rect x="220" y="196" width="26" height="6" rx="3" className="ch-hair" transform="rotate(6 233 199)" />
              {/* eyes */}
              <g>
                <ellipse cx="187" cy="218" rx="10" ry="8" className="ch-eye-white" />
                <ellipse cx="233" cy="218" rx="10" ry="8" className="ch-eye-white" />
                <motion.g style={{ x: eyeX, y: eyeY }}>
                  <circle cx="187" cy="219" r="5" className="ch-pupil" />
                  <circle cx="233" cy="219" r="5" className="ch-pupil" />
                  <circle cx="189" cy="217" r="1.6" className="ch-glint" />
                  <circle cx="235" cy="217" r="1.6" className="ch-glint" />
                </motion.g>
                {/* eyelids for blinking */}
                <g className="ch-lids">
                  <ellipse cx="187" cy="218" rx="11" ry="9" className="ch-skin" />
                  <ellipse cx="233" cy="218" rx="11" ry="9" className="ch-skin" />
                </g>
              </g>
            </g>
          </motion.g>

          {/* waving arm (behind the desk, in front of the body) */}
          <g className="ch-arm">
            <path d="M284 350 C300 330 318 300 326 262" className="ch-sleeve" />
            <circle cx="328" cy="250" r="15" className="ch-skin" />
            <rect x="318" y="226" width="7" height="18" rx="3.5" className="ch-skin" transform="rotate(-12 321 235)" />
            <rect x="327" y="224" width="7" height="18" rx="3.5" className="ch-skin" />
            <rect x="336" y="227" width="7" height="17" rx="3.5" className="ch-skin" transform="rotate(10 339 235)" />
            <path d="M318 268 L338 268" className="ch-cuff" />
          </g>

          {/* desk */}
          <rect x="40" y="388" width="340" height="14" rx="7" className="ch-desk" />
          {/* laptop (back of the lid faces us) */}
          <path d="M140 386 L280 386 L292 392 L128 392 Z" className="ch-laptop-base" />
          <rect x="148" y="318" width="124" height="70" rx="8" className="ch-laptop" />
          <circle cx="210" cy="352" r="7" className="ch-accent" />
          {/* typing hand */}
          <g className="ch-type">
            <path d="M132 360 C126 372 128 380 136 386" className="ch-sleeve ch-sleeve--thin" />
            <ellipse cx="140" cy="384" rx="14" ry="8" className="ch-skin" />
          </g>
          {/* coffee */}
          <rect x="78" y="358" width="26" height="30" rx="5" className="ch-mug" />
          <path d="M104 366 C114 366 114 380 104 380" className="ch-mug-handle" />
          <path d="M86 350 C82 342 92 338 88 330 M96 350 C92 342 102 338 98 330" className="ch-steam" />
        </svg>
      </motion.div>

      {/* Floating stat cards — real content, not decoration */}
      <motion.div
        className="float-card float-card--a"
        initial={reduce ? false : { opacity: 0, x: -20 }}
        animate={play ? { opacity: 1, x: 0 } : undefined}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span className="float-card__value tabular">{play ? <Counter value={projectCount} /> : '0'}</span>
        <span className="float-card__label">projects since 2021</span>
      </motion.div>
    </div>
  );
}
