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
 * Resume PDF. Put the file in /public/resume/ and keep this path in sync.
 * If the file is missing, the "Download resume" buttons show a clear
 * "not available yet" message instead of linking to a broken file.
 */
export const resume = {
  path: '/resume/Pratap-Sikdar-Resume.pdf',
  downloadName: 'Pratap-Sikdar-Resume.pdf',
};

/** Public URL of the deployed site (used in docs and metadata). */
export const siteUrl = 'https://pratapguru.github.io/';
