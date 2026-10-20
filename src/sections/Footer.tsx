import { GitHubIcon, LinkedInIcon } from '../components/Icons';
import { Mail } from 'lucide-react';
import { links, profile } from '../data/profile';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {year} {profile.name}. Built with React and Vite, hosted on GitHub Pages.
        </p>
        <div className="footer__links">
          {links.email && (
            <a className="icon-btn" href={`mailto:${links.email}`} aria-label="Email" title="Email">
              <Mail aria-hidden="true" />
            </a>
          )}
          {links.linkedin && (
            <a className="icon-btn" href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" title="LinkedIn">
              <LinkedInIcon />
            </a>
          )}
          {links.github && (
            <a className="icon-btn" href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" title="GitHub">
              <GitHubIcon />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
