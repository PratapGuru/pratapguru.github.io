import { Juggler } from '../components/Mascots';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState, type CSSProperties, type MouseEvent } from 'react';
import { FilterTabs } from '../components/FilterTabs';
import { skillGroups, toolbelt, type SkillGroup, type SkillLevel } from '../data/skills';
import { SectionHead } from './SectionHead';

const LEVELS: { level: SkillLevel; text: string }[] = [
  { level: 'Applied', text: 'Applied — used in an internship or project' },
  { level: 'Studied', text: 'Studied — learned through coursework or a course' },
  { level: 'Exploring', text: 'Exploring — currently learning' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Skills() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState('all');
  const options = [{ value: 'all', label: 'All' }, ...skillGroups.map((g) => ({ value: g.id, label: g.title, count: g.skills.length }))];
  const groups = filter === 'all' ? skillGroups : skillGroups.filter((g) => g.id === filter);

  return (
    <section id="skills" className="section section--skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" title="Skills and tools" index="04" kicker="What I bring" art={<Juggler />}>
          No percentage bars. Each skill says where I used or learned it, so you can ask me about it.
        </SectionHead>

        {/* Toolbelt: tools pop in, then drift gently */}
        <motion.ul
          className="toolbelt"
          aria-label="Tools I use"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.05 }}
        >
          {toolbelt.map((t, i) => (
            <motion.li
              key={t}
              className={`tool tool--${i % 3}`}
              style={{ '--d': `${(i % 5) * 0.6}s` } as CSSProperties}
              variants={{ hidden: { opacity: 0, scale: 0.5, y: 20 }, show: { opacity: 1, scale: 1, y: 0 } }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              whileHover={reduce ? undefined : { scale: 1.12, rotate: i % 2 ? 3 : -3 }}
            >
              <span className="tool__inner">{t}</span>
            </motion.li>
          ))}
        </motion.ul>

        <FilterTabs id="skills" label="Filter skills by area" options={options} value={filter} onChange={setFilter} />
        <div className="skill-legend">
          {LEVELS.map((l) => (
            <span key={l.level} className={`level level--${l.level.toLowerCase()}`}>
              {l.text}
            </span>
          ))}
        </div>

        <motion.div className="skill-groups" layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {groups.map((g, gi) => (
              <GroupCard key={g.id} group={g} index={gi} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function GroupCard({ group: g, index }: { group: SkillGroup; index: number }) {
  const reduce = useReducedMotion();
  const counts = (['Applied', 'Studied', 'Exploring'] as SkillLevel[]).map((lvl) => ({
    lvl,
    n: g.skills.filter((s) => s.level === lvl).length,
  }));
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--sx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--sy', `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      layout
      className="skill-group"
      onMouseMove={onMove}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
      variants={{ hidden: { opacity: 0, y: 40, rotateX: 8 }, show: { opacity: 1, y: 0, rotateX: 0 } }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease, staggerChildren: 0.05, delayChildren: 0.25 }}
      aria-labelledby={`skills-${g.id}`}
    >
      <div className="skill-group__head">
        <h3 className="skill-group__title" id={`skills-${g.id}`}>
          {g.title}
        </h3>
        <span className="skill-group__count tabular">{g.skills.length}</span>
      </div>
      <p className="skill-group__blurb">{g.blurb}</p>

      {/* Mix of applied / studied / exploring — counts, not proficiency */}
      <div className="mix" role="img" aria-label={counts.map((c) => `${c.n} ${c.lvl.toLowerCase()}`).join(', ')}>
        {counts
          .filter((c) => c.n > 0)
          .map((c) => (
            <motion.span
              key={c.lvl}
              className={`mix__seg mix__seg--${c.lvl.toLowerCase()}`}
              style={{ flexGrow: c.n }}
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
              transition={{ duration: 0.8, ease }}
              title={`${c.n} ${c.lvl.toLowerCase()}`}
            >
              <span className="mix__n">{c.n}</span>
            </motion.span>
          ))}
      </div>

      <ul className="skill-list">
        {g.skills.map((s) => (
          <motion.li
            key={s.name}
            className="skill"
            variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.45, ease }}
          >
            <span className="skill__name">{s.name}</span>
            <span className="skill__where">{s.where}</span>
            <span className={`skill__level level level--${s.level.toLowerCase()}`}>{s.level}</span>
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}
