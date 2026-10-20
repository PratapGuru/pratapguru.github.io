import { Thinker } from '../components/Mascots';
import { Reveal } from '../components/Reveal';
import { ScrubText } from '../components/ScrubText';
import { achievements, bio, courses, education, focusAreas, leadership, manifesto } from '../data/about';
import { SectionHead } from './SectionHead';

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHead id="about-title" title="About me" index="01" kicker="Who I am" />

        <div className="about__intro">
          <ScrubText text={manifesto} className="about__manifesto" />
          <Thinker />
        </div>

        <div className="about__top">
          <Reveal className="about__bio">
            <p>{bio[0]}</p>
            <p>{bio[2]}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="sr-only">What I focus on</h3>
            <ul className="focus-grid">
              {focusAreas.map((f, i) => (
                <li key={f.title} className="focus-card">
                  <span className="focus-card__n tabular">{String(i + 1).padStart(2, '0')}</span>
                  <span className="focus-card__title">{f.title}</span>
                  <span className="focus-card__text">{f.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="about__lower">
          <Reveal>
            <h3 className="subhead">Education</h3>
            <ol className="timeline">
              {education.map((e, i) => (
                <li key={e.school} className={`timeline__item${i === 0 ? ' is-current' : ''}`}>
                  <p className="timeline__period tabular">{e.period}</p>
                  <p className="timeline__title">{e.school}</p>
                  <p className="timeline__sub">
                    {e.degree}, {e.place}
                  </p>
                </li>
              ))}
            </ol>

            <div className="about__block">
              <h3 className="subhead">Leadership and activities</h3>
              <ul className="plain-list">
                {leadership.map((l) => (
                  <li key={l.title} className="plain-list__item">
                    <span className="plain-list__title">{l.title}</span>
                    <span className="plain-list__detail">{l.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="about__block about__block--first">
              <h3 className="subhead">Recognition</h3>
              <ul className="plain-list">
                {achievements.map((a) => (
                  <li key={a.title} className="plain-list__item">
                    <span className="plain-list__title">{a.title}</span>
                    <span className="plain-list__aside">{a.year}</span>
                    <span className="plain-list__detail">{a.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="about__block">
              <h3 className="subhead">Courses and certificates</h3>
              <ul className="plain-list">
                {courses.map((c) => (
                  <li key={c.title} className="plain-list__item">
                    <span className="plain-list__title">{c.title}</span>
                    <span className="plain-list__aside tabular">{c.year}</span>
                    <span className="plain-list__detail">{c.provider}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
