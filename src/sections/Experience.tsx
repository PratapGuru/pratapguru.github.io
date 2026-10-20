import { Advisor } from '../components/Mascots';
import { CalendarDays, MapPin } from 'lucide-react';
import { Counter } from '../components/Counter';
import { Reveal } from '../components/Reveal';
import { earlierRoles, featuredExperience as xp } from '../data/experience';
import { SectionHead } from './SectionHead';

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead id="experience-title" title="Experience" index="02" kicker="Where I’ve worked" art={<Advisor />}>
          Portfolio analytics and client work in wealth management, after a run of technology internships.
        </SectionHead>

        <Reveal as="article" className="xp-card">
          <header className="xp-card__head">
            <div>
              <h3 className="xp-card__company">{xp.company}</h3>
              <p className="xp-card__role">{xp.role}</p>
            </div>
            <div className="xp-card__when">
              <span>
                <CalendarDays aria-hidden="true" />
                {xp.period}
              </span>
              <span>
                <MapPin aria-hidden="true" />
                {xp.location}
              </span>
            </div>
          </header>

          <p className="xp-card__summary">{xp.summary}</p>

          <dl className="metrics">
            {xp.metrics.map((m) => (
              <div key={m.label} className="metric">
                <dt className="sr-only">{m.label}</dt>
                <dd className="metric__value">
                  <Counter value={m.value} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} />
                </dd>
                <dd className="metric__label" aria-hidden="true">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>

          <div className="xp-groups">
            {xp.groups.map((g) => (
              <div key={g.title} className="xp-group">
                <h4 className="xp-group__title">{g.title}</h4>
                <ul className="ticks">
                  {g.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <ul className="xp-card__tools" aria-label="Tools and methods">
            {xp.tools.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="earlier">
          <Reveal className="earlier__head">
            <h3 className="subhead">Earlier internships</h3>
            <p className="inline-note">Finance research, and the software work that came before the MBA.</p>
          </Reveal>
          <ol className="earlier__list">
            {earlierRoles.map((r, i) => (
              <Reveal as="li" key={r.company} className="earlier__item" delay={Math.min(i * 0.05, 0.2)}>
                <p className="earlier__period tabular">{r.period}</p>
                <div>
                  <p className="earlier__company">{r.company}</p>
                  <p className="earlier__role">{r.role}</p>
                  <ul className="earlier__points">
                    {r.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <span className={`kind kind--${r.kind.toLowerCase()}`}>{r.kind}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
