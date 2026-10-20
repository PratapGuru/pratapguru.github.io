import { Builder } from '../components/Mascots';
import { useMemo, useState } from 'react';
import { FilterTabs } from '../components/FilterTabs';
import { ProjectArchive } from '../components/ProjectArchive';
import { ProjectGallery } from '../components/ProjectGallery';
import { StatusBadge, statusDescriptions } from '../components/StatusBadge';
import { projectCategories, projects, type Project, type ProjectStatus } from '../data/projects';
import { SectionHead } from './SectionHead';

interface Props {
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

const STATUSES: ProjectStatus[] = ['Completed', 'Prototype', 'In development', 'Planned'];

export function Projects({ onOpen }: Props) {
  const [filter, setFilter] = useState('All');

  const options = useMemo(
    () =>
      [
        { value: 'All', label: 'All', count: projects.length },
        ...projectCategories.map((c) => ({ value: c, label: c, count: projects.filter((p) => p.categories.includes(c)).length })),
      ].filter((o) => o.count > 0),
    [],
  );

  const shown = filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter as Project['categories'][number]));
  const features = shown.filter((p) => p.size === 'feature');
  const archive = shown.filter((p) => p.size === 'compact');
  const oldest = projects[projects.length - 1]?.date.slice(0, 4);

  return (
    <section id="projects" className="section section--projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead id="projects-title" title="Things I’ve built" index="03" kicker="Projects, newest first" art={<Builder />}>
          {projects.length} projects since {oldest} — from finance tools I’m building now back to my first web page. Each one says where it actually stands.
        </SectionHead>
        <FilterTabs id="projects" label="Filter projects by category" options={options} value={filter} onChange={setFilter} />
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} {shown.length === 1 ? 'project' : 'projects'}
          {filter === 'All' ? '' : ` in ${filter}`}, newest first.
        </p>
      </div>

      {features.length > 0 && <ProjectGallery key={filter} items={features} onOpen={onOpen} archiveCount={archive.length} />}

      <div className="container">
        {archive.length > 0 && (
          <div id="archive" className="archive-wrap">
            <div className="archive-wrap__head">
              <h3 className="subhead">The archive</h3>
              <p className="inline-note">Smaller builds, learning projects and internship tasks — newest first.</p>
            </div>
            <ProjectArchive items={archive} onOpen={onOpen} />
          </div>
        )}

        {shown.length === 0 && <p className="empty-state">No projects in this category yet. Choose “All” to see everything.</p>}

        <div className="status-legend" aria-label="Status labels">
          {STATUSES.map((s) => (
            <span key={s}>
              <StatusBadge status={s} /> {statusDescriptions[s]}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
