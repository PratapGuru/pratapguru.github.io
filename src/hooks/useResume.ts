import { useEffect, useState } from 'react';
import { resume } from '../data/profile';

export type ResumeState = 'checking' | 'available' | 'missing';

let cached: Promise<ResumeState> | null = null;

/**
 * Checks once whether the resume PDF actually exists, so the buttons never
 * link to a broken file. (A dev server or SPA host may answer a missing file
 * with index.html, so the content type is checked too.)
 */
function check(): Promise<ResumeState> {
  if (!resume.path) return Promise.resolve('missing');
  if (!cached) {
    cached = fetch(resume.path, { method: 'HEAD', cache: 'no-cache' })
      .then((res) => {
        const type = res.headers.get('content-type') ?? '';
        return res.ok && type.includes('pdf') ? 'available' : 'missing';
      })
      .catch(() => 'missing' as const);
  }
  return cached;
}

export function useResume() {
  const [state, setState] = useState<ResumeState>('checking');
  useEffect(() => {
    let alive = true;
    check().then((s) => alive && setState(s));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}
