/**
 * ─────────────────────────────────────────────────────────────
 *  PERSONAL INFORMATION — edit this file to update the site.
 * ─────────────────────────────────────────────────────────────
 *  Everything here is bundled into public JavaScript.
 *  Never put passwords, API keys, tokens or anything private here.
 */

export const profile = {
  name: 'Pratap Sikdar',
  initials: 'PS',
  role: 'MBA candidate in Finance and IT & Analytics at IIM Bodh Gaya',
  shortRole: 'MBA ’27, IIM Bodh Gaya — open to full-time roles',
  graduation: 'March 2027',

  /** Hero headline — one line per entry. */
  headline: ['Business thinking.', 'Financial insight.', 'Technology in action.'],

  intro:
    'Finance, analytics and software in one person — I review portfolios, structure business problems ' +
    'and build the tools that make the numbers easier to act on.',

  /** Short line shown in the footer and contact section. */
  availability: 'Open to full-time roles starting 2027 in finance, consulting and strategy, business analysis and product.',
};

/**
 * Contact & social links.
 * Set any value to an empty string ('') to hide that link everywhere on the site.
 */
export const links = {
  github: 'https://github.com/PratapGuru',
  linkedin: 'https://www.linkedin.com/in/pratap-sikdar-171215189/',
  /**
   * EDIT: professional email. Currently taken from your resume (institute email).
   * Swap for a personal address before you graduate if you prefer.
   */
  email: 'pratap.s2027@iimbg.ac.in',
};

/**
 * Resume versions, shown as tabs in the resume window. The first one is the
 * default tab. Put each PDF (and its page-1 preview image) in /public/resume/
 * and keep these paths in sync. If a PDF is missing, its tab says so instead
 * of linking to a broken file.
 */
export interface ResumeVersion {
  id: string;
  /** Tab label. */
  label: string;
  /** One-line description shown under the tab. */
  summary: string;
  /** When to send this version. */
  bestFor: string[];
  path: string;
  downloadName: string;
  /** Image of page 1, shown as a preview. */
  preview: string;
}

export const resumes: ResumeVersion[] = [
  {
    id: 'college',
    label: 'College format',
    summary: 'The IIM Bodh Gaya placement format: one page, roles and responsibilities in a table, with academic scores.',
    bestFor: ['Campus placements', 'Recruiters who ask for the institute format'],
    path: '/resume/Pratap-Sikdar-Resume-College.pdf',
    downloadName: 'Pratap-Sikdar-Resume-College.pdf',
    preview: '/resume/preview-college.webp',
  },
  {
    id: 'ats',
    label: 'ATS-friendly',
    summary: 'A single-column version with plain headings and a standard section order, so applicant tracking systems can read it.',
    bestFor: ['Job portals and online applications', 'Off-campus roles'],
    path: '/resume/Pratap-Sikdar-Resume-ATS.pdf',
    downloadName: 'Pratap-Sikdar-Resume-ATS.pdf',
    preview: '/resume/preview-ats.webp',
  },
];

/** Public URL of the deployed site (used in docs and metadata). */
export const siteUrl = 'https://pratapguru.github.io/';
