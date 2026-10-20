import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { useRef } from 'react';

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

interface Props {
  items: string[];
  /** Base speed in % of one copy per second; negative runs the other way. */
  speed?: number;
  className?: string;
}

/**
 * A ticker band that drifts on its own and speeds up — and flips direction —
 * with how fast and which way you scroll. Static under reduced motion.
 */
export function Marquee({ items, speed = 2, className = '' }: Props) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * speed * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * Math.abs(speed) * (delta / 1000) * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  const row = (hidden: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="marquee__item">
          <span className="marquee__sep" aria-hidden="true">
            ✦
          </span>
          {t}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee ${className}`}>
      <motion.div className="marquee__track" style={reduce ? undefined : { x }}>
        {row(false)}
        {row(true)}
      </motion.div>
    </div>
  );
}
