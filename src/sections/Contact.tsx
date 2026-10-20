import { Messenger } from '../components/Mascots';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { GitHubIcon, LinkedInIcon } from '../components/Icons';
import { Magnetic } from '../components/Magnetic';
import { Marquee } from '../components/Marquee';
import { Reveal } from '../components/Reveal';
import { ResumeButton } from '../components/ResumeButton';
import { links, profile } from '../data/profile';
import { SectionHead } from './SectionHead';

function prettyUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  };

  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title">
      <Marquee className="marquee--contact" speed={-1.5} items={["Let’s talk", 'Open to full-time roles', 'Finance', 'Consulting', 'Business analysis', 'Product']} />

      <div className="container">
        <SectionHead id="contact-title" title="Let’s build what’s next." index="05" kicker="Contact" art={<Messenger />}>
          {profile.availability} Email is the quickest way to reach me.
        </SectionHead>

        <div className="contact">
          <Reveal className="contact__cta">
            {links.email && (
              <a className="contact__email" href={`mailto:${links.email}`}>
                <span>
                  {links.email.split('@')[0]}
                  <wbr />@{links.email.split('@')[1]}
                </span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            )}
            <div className="contact__actions">
              {links.email && (
                <Magnetic>
                  <a className="btn btn--primary" href={`mailto:${links.email}`}>
                    <Mail aria-hidden="true" />
                    Email me
                  </a>
                </Magnetic>
              )}
              {links.email && (
                <button type="button" className="btn" onClick={copyEmail}>
                  {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                  {copied ? 'Copied' : 'Copy email'}
                </button>
              )}
              <ResumeButton />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="contact-list">
              {links.linkedin && (
                <li>
                  <a className="contact-row" href={links.linkedin} target="_blank" rel="noopener noreferrer">
                    <span className="contact-row__icon" aria-hidden="true">
                      <LinkedInIcon />
                    </span>
                    <span>
                      <span className="contact-row__label">LinkedIn</span>
                      <span className="contact-row__value">{prettyUrl(links.linkedin)}</span>
                    </span>
                    <ArrowUpRight className="contact-row__arrow" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
              {links.github && (
                <li>
                  <a className="contact-row" href={links.github} target="_blank" rel="noopener noreferrer">
                    <span className="contact-row__icon" aria-hidden="true">
                      <GitHubIcon />
                    </span>
                    <span>
                      <span className="contact-row__label">GitHub</span>
                      <span className="contact-row__value">{prettyUrl(links.github)}</span>
                    </span>
                    <ArrowUpRight className="contact-row__arrow" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
            </ul>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.p className="toast" role="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
            Email address copied
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
