import { motion, useReducedMotion } from 'motion/react';
import { Counter } from '../components/Counter';
import { earlierRoles } from '../data/experience';
import { projects } from '../data/projects';

/** "By the numbers" — traction-style stats, each backed by the content below. */
export function Numbers() {
  const reduce = useReducedMotion();
  const since = projects.reduce((min, p) => (p.date < min ? p.date : min), '9999').slice(0, 4);
  const stats = [
    { value: projects.length, suffix: '', label: `projects since ${since}, from first web page to finance tools`, href: '#projects' },
    { value: earlierRoles.length + 1, suffix: '', label: 'internships and training roles', href: '#experience' },
    { value: 300, suffix: '+', label: 'HNI/UHNI prospect calls at Nuvama', href: '#experience' },
    { value: 30, prefix: 'Top ', suffix: '', label: 'of 1,411 teams at the CaseQuest case challenge', href: '#about' },
  ];
  return (
    <section id="numbers" className="numbers" aria-label="By the numbers">
      <div className="container">
        <ul className="numbers__grid">
          {stats.map((s, i) => (
            <motion.li
              key={s.label}
              className="numbers__item"
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href={s.href} className="numbers__link">
                <span className="numbers__value tabular">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </span>
                <span className="numbers__label">{s.label}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
