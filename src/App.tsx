import { MotionConfig } from 'motion/react';
import { useCallback, useRef, useState } from 'react';
import { IntroContext } from './components/Intro';
import { Loader } from './components/Loader';
import { Marquee } from './components/Marquee';
import { Nav } from './components/Nav';
import { ProjectModal } from './components/ProjectModal';
import { ResumeContext, ResumeDialog } from './components/ResumeDialog';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollTop } from './components/ScrollTop';
import type { Project } from './data/projects';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Experience } from './sections/Experience';
import { Footer } from './sections/Footer';
import { Hero } from './sections/Hero';
import { Numbers } from './sections/Numbers';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';

const TICKER = ['Portfolio analysis', 'XIRR & CAGR', 'Benchmarking', 'Excel dashboards', 'Valuation', 'Business analysis', 'Python', 'SQL', 'React', 'Java & Spring Boot', 'Market research', 'Client conversations'];
const TICKER_2 = ['Finance', 'Analytics', 'Strategy', 'Product', 'Technology', 'Execution'];

export default function App() {
  const [project, setProject] = useState<Project | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);

  const open = useCallback((p: Project, el: HTMLElement) => {
    trigger.current = el;
    setProject(p);
  }, []);

  const close = useCallback(() => {
    setProject(null);
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
  }, []);

  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeTrigger = useRef<HTMLElement | null>(null);
  const openResume = useCallback((el: HTMLElement | null) => {
    resumeTrigger.current = el;
    setResumeOpen(true);
  }, []);
  const closeResume = useCallback(() => {
    setResumeOpen(false);
    requestAnimationFrame(() => resumeTrigger.current?.focus({ preventScroll: true }));
  }, []);

  const finishIntro = useCallback(() => setIntroDone(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={introDone}>
        <ResumeContext.Provider value={openResume}>
        <Loader onDone={finishIntro} />
        <div inert={project !== null || resumeOpen}>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <span id="top-anchor" tabIndex={-1} />
          <ScrollProgress />
          <Nav />
          <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
            {/* The hero stays pinned while About slides up over it like a sheet. */}
            <div className="intro-stack">
              <Hero />
              <div className="sheet">
                <About />
                <div className="tapes" aria-label="Skills at a glance" role="region">
                  <Marquee className="marquee--gold" items={TICKER} speed={2} />
                  <Marquee className="marquee--dark" items={TICKER_2} speed={-2.5} />
                </div>
                <Numbers />
              </div>
            </div>
            <Experience />
            <Projects onOpen={open} />
            <Skills />
            <Contact />
          </main>
          <Footer />
          <ScrollTop />
        </div>
        <ProjectModal project={project} onClose={close} />
        <ResumeDialog open={resumeOpen} onClose={closeResume} />
        </ResumeContext.Provider>
      </IntroContext.Provider>
    </MotionConfig>
  );
}
