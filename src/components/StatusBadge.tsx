import type { ProjectStatus } from '../data/projects';

export const statusDescriptions: Record<ProjectStatus, string> = {
  Completed: 'finished and delivered',
  Prototype: 'core idea working, still experimental',
  'In development': 'actively being built',
  Planned: 'scoped, not yet built',
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const cls = status.toLowerCase().replace(/\s+/g, '-');
  return <span className={`status status--${cls}`}>{status}</span>;
}
