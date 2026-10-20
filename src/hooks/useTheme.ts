import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';
const STORAGE_KEY = 'theme';

function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function store(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage can be blocked (private mode); the toggle still works for this visit */
  }
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (typeof document === 'undefined' ? 'dark' : readTheme()));

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute('content', theme === 'light' ? '#fbf5e8' : '#0e1b20');
  }, [theme]);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    const apply = () => {
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    store(next);

    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (prefersReducedMotion()) {
      apply();
    } else if (typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(apply);
    } else {
      const root = document.documentElement;
      root.classList.add('theme-fade');
      apply();
      window.setTimeout(() => root.classList.remove('theme-fade'), 400);
    }
  }, []);

  return { theme, toggle };
}
