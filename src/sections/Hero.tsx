import { ArrowDown, Mail } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Character } from '../components/Character';
import { GitHubIcon, LinkedInIcon } from '../components/Icons';
import { useIntroDone } from '../components/Intro';
import { Magnetic } from '../components/Magnetic';
import { Orbit } from '../components/Orbit';
import { ParticleField } from '../components/ParticleField';
import { ResumeButton } from '../components/ResumeButton';
import { links, profile } from '../data/profile';

const ease = [0.22, 1, 0.36, 1] as const;

/** Letters rise out of a mask one after another. */
function Letters({ text, delay, play, className }: { text: string; delay: number; play: boolean; className: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={className} aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} className="mask">
          <motion.span
            className="mask__inner"
            initial={reduce ? false : { y: '115%' }}
            animate={play ? { y: '0%' } : undefined}
            transition={{ duration: 0.9, delay: delay + i * 0.045, ease }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * The opening scene: a full-screen stage with the animated avatar, orbiting
 * skills, a live network background and a rotating headline. It stays pinned
 * while the About section slides up over it.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ready = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (reduce || !ready) return;
    const t = window.setInterval(() => setLine((l) => (l + 1) % profile.headline.length), 2600);
    return () => window.clearInterval(t);
  }, [reduce, ready]);

  // As the page scrolls, the stage recedes behind the incoming About sheet.
  // (The hero is pinned, so progress comes from page scroll over one screen height.)
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(900);
  useEffect(() => {
    const on = () => setVh(window.innerHeight);
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  const scrollYProgress = useTransform(scrollY, (v) => Math.min(1, Math.max(0, v / vh)));
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const nameSpread = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const nameSpreadNeg = useTransform(nameSpread, (v) => -v);

  const show = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, delay: 0.5 + i * 0.1, ease },
  });

  return (
    <section id="home" className="hero" aria-labelledby="hero-title" ref={ref}>
      <ParticleField className="hero__particles" />
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__orb hero__orb--a" aria-hidden="true" />
      <div className="hero__orb hero__orb--b" aria-hidden="true" />

      <motion.div className="hero__stage" style={reduce ? undefined : { scale, opacity, y }}>
        <motion.p className="hero__badge" {...show(0)}>
          <span className="pulse-dot" aria-hidden="true" />
          {profile.shortRole}
        </motion.p>

        <h1 id="hero-title" className="sr-only">
          {profile.name} — {profile.headline.join(' ')}
        </h1>

        <div className="hero__center">
          <motion.div className="hero__name hero__name--first" style={reduce ? undefined : { x: nameSpreadNeg }}>
            <Letters text="Pratap" delay={0.15} play={ready} className="hero__word" />
          </motion.div>

          <div className="hero__avatar">
            <Orbit />
            <Character play={ready} />
          </div>

          <motion.div className="hero__name hero__name--last" style={reduce ? undefined : { x: nameSpread }}>
            <Letters text="Sikdar" delay={0.35} play={ready} className="hero__word" />
          </motion.div>
        </div>

        <motion.div className="hero__rotator" aria-hidden="true" {...show(1)}>
          <motion.span
            className="hero__rotator-track"
            initial={false}
            animate={{ y: `${-line * 1.3}em` }}
            transition={{ duration: reduce ? 0 : 0.6, ease }}
          >
            {profile.headline.map((h, i) => (
              <span key={h} className={`hero__rotator-text hero__rotator-text--${i + 1}`}>
                {h}
              </span>
            ))}
          </motion.span>
        </motion.div>

        <motion.p className="hero__intro" {...show(2)}>
          {profile.intro}
        </motion.p>

        <motion.div className="hero__actions" {...show(3)}>
          <Magnetic>
            <a className="btn btn--primary" href="#about">
              <ArrowDown aria-hidden="true" />
              Start the tour
            </a>
          </Magnetic>
          <a className="btn hero__act-extra" href="#projects">
            View my work
          </a>
          <ResumeButton label="Resume" />
          <Magnetic strength={0.2}>
            <a className="btn btn--quiet hero__act-extra" href="#contact">
              <Mail aria-hidden="true" />
              Contact
            </a>
          </Magnetic>
          {links.github && (
            <a className="icon-btn" href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)" title="GitHub">
              <GitHubIcon />
            </a>
          )}
          {links.linkedin && (
            <a className="icon-btn" href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)" title="LinkedIn">
              <LinkedInIcon />
            </a>
          )}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-cue"
        aria-label="Scroll to About"
        initial={reduce ? false : { opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.6 }}
      >
        <span className="scroll-cue__mouse" aria-hidden="true">
          <span />
        </span>
        <span className="scroll-cue__label">Scroll to meet me</span>
      </motion.a>
    </section>
  );
}
