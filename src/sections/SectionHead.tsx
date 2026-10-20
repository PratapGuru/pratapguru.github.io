import { motion, useReducedMotion } from 'motion/react';
import { Fragment, type ReactNode } from 'react';

interface Props {
  id: string;
  title: string;
  /** Small label shown above the title, e.g. "02". */
  index?: string;
  kicker?: string;
  children?: ReactNode;
  /** Optional illustration shown to the right of the heading. */
  art?: ReactNode;
}

/** Section title whose words rise out of a mask as it scrolls into view. */
export function SectionHead({ id, title, index, kicker, children, art }: Props) {
  const reduce = useReducedMotion();
  const words = title.split(' ');
  return (
    <div className={`section-head${art ? ' section-head--art' : ''}`}>
      <div className="section-head__text">
      {(index || kicker) && (
        <motion.p
          className="section-head__kicker"
          initial={reduce ? false : { opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          {index && <span className="section-head__index">{index}</span>}
          {kicker}
        </motion.p>
      )}
      <motion.h2
        className="section-head__title"
        id={id}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.07 }}
      >
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="mask">
              <motion.span
                className="mask__inner"
                variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </motion.h2>
      {children && (
        <motion.p
          className="section-head__lede"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.p>
      )}
      </div>
      {art && <div className="section-head__art">{art}</div>}
    </div>
  );
}
