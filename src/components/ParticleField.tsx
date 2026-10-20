import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

/**
 * A quiet "network" background: drifting points that link up when close,
 * nudged away by the pointer. Pauses when off-screen; drawn once (static)
 * when the visitor prefers reduced motion. Purely decorative.
 */
export function ParticleField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number; gold: boolean };
    let pts: P[] = [];

    const colors = () => {
      const s = getComputedStyle(document.documentElement);
      return { gold: s.getPropertyValue('--gold').trim() || '#f4b740', teal: s.getPropertyValue('--teal').trim() || '#5fd6c4' };
    };
    let c = colors();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, (w * h) / 16000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
        gold: Math.random() < 0.35,
      }));
    };

    const draw = (move: boolean) => {
      ctx.clearRect(0, 0, w, h);
      const LINK = 130;
      for (const p of pts) {
        if (move) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120) {
            const f = (1 - Math.sqrt(d2) / 120) * 0.6;
            p.vx += (dx / 120) * f * 0.05;
            p.vy += (dy / 120) * f * 0.05;
          }
          p.vx *= 0.995;
          p.vy *= 0.995;
          p.x += p.vx + (Math.random() - 0.5) * 0.02;
          p.y += p.vy + (Math.random() - 0.5) * 0.02;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }
      }
      ctx.lineWidth = 0.7;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.globalAlpha = (1 - d / LINK) * 0.28;
            ctx.strokeStyle = a.gold && b.gold ? c.gold : c.teal;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = p.gold ? c.gold : c.teal;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (visible) draw(true);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) draw(false);
    else raf = requestAnimationFrame(loop);

    const onResize = () => {
      resize();
      if (reduce) draw(false);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    // Re-read colours when the theme changes.
    const mo = new MutationObserver(() => {
      c = colors();
      if (reduce) draw(false);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [reduce]);

  return <canvas ref={ref} className={`particles ${className}`} aria-hidden="true" />;
}
