import { useEffect, useState } from 'react';

export type ResumeState = 'checking' | 'available' | 'missing';

const cache = new Map<string, Promise<ResumeState>>();

/**
 * Checks once whether a resume PDF actually exists, so the buttons never
 * link to a broken file. (A dev server or SPA host may answer a missing file
 * with index.html, so the content type is checked too.)
 */
function check(path: string): Promise<ResumeState> {
  if (!path) return Promise.resolve('missing');
  let p = cache.get(path);
  if (!p) {
    p = fetch(path, { method: 'HEAD', cache: 'no-cache' })
      .then((res) => {
        const type = res.headers.get('content-type') ?? '';
        return res.ok && type.includes('pdf') ? ('available' as const) : ('missing' as const);
      })
      .catch(() => 'missing' as const);
    cache.set(path, p);
  }
  return p;
}

export function useResume(path: string) {
  const [state, setState] = useState<ResumeState>('checking');
  useEffect(() => {
    let alive = true;
    setState('checking');
    check(path).then((s) => alive && setState(s));
    return () => {
      alive = false;
    };
  }, [path]);
  return state;
}
