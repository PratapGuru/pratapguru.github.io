import { ChevronRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { profile } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrolled } from '../hooks/useScrolled';
import { ThemeToggle } from './ThemeToggle';

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
const IDS = NAV_ITEMS.map((n) => n.id);

/** The hero is pinned, so the browser can't "scroll to" it — go to the top instead. */
function goHome(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  history.replaceState(null, '', '#home');
}

export function Nav() {
  const active = useActiveSection(IDS);
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  // Close the mobile menu on Escape, and when the viewport grows past mobile size.
  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 861px)');
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  return (
    <>
      <header className={`nav${scrolled || open ? ' is-scrolled' : ''}`}>
        <div className="container nav__inner">
          <a href="#home" className="brand" aria-label={`${profile.name} — back to top`} onClick={goHome}>
            <span className="brand__mark" aria-hidden="true">
              {profile.initials}
            </span>
            <span>{profile.name}</span>
          </a>

          <nav aria-label="Primary">
            <ul className="nav__links">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`nav__link${isActive ? ' is-active' : ''}`}
                      aria-current={isActive ? 'location' : undefined}
                      onClick={item.id === 'home' ? goHome : undefined}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="nav__pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="nav__link-label">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="nav__actions">
            <ThemeToggle />
            <button
              ref={menuBtn}
              type="button"
              className="icon-btn nav__menu-btn"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="mobile-menu__list">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.2 }}
                >
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={`#${item.id}`}
                    className={`mobile-menu__link${active === item.id ? ' is-active' : ''}`}
                    aria-current={active === item.id ? 'location' : undefined}
                    onClick={(e) => {
                      if (item.id === 'home') goHome(e);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                    <ChevronRight aria-hidden="true" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
