/**
 * SKILLS — grouped by area, each with honest evidence.
 *
 *  level:
 *    'Applied'   — used in an internship, job or project
 *    'Studied'   — learned through coursework or a certification course
 *    'Exploring' — currently learning or experimenting with
 *
 *  `where` is a short note on where the skill was used or learned.
 *  No percentages or scores on purpose.
 */

export type SkillLevel = 'Applied' | 'Studied' | 'Exploring';

export interface Skill {
  name: string;
  level: SkillLevel;
  where: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'finance',
    title: 'Finance',
    blurb: 'Portfolio work from my internship, plus valuation from the MBA and CFA preparation.',
    skills: [
      { name: 'Portfolio analysis', level: 'Applied', where: 'Nuvama portfolio reviews' },
      { name: 'Asset allocation and diversification', level: 'Applied', where: 'Nuvama portfolio reviews' },
      { name: 'CAGR, XIRR and benchmarking', level: 'Applied', where: 'Nuvama dashboards' },
      { name: 'Investment-product research', level: 'Applied', where: 'MFs, PMS, AIFs, MLDs, NCDs, ZCBs, InvITs' },
      { name: 'Financial statement analysis', level: 'Studied', where: 'MBA coursework and CFA course' },
      { name: 'Valuation (DCF, comparables)', level: 'Studied', where: 'Business Analysis & Valuation course' },
      { name: 'Excel financial modelling', level: 'Studied', where: 'CFA course, 2026' },
      { name: 'CFA Level I curriculum', level: 'Exploring', where: 'Feb 2027 attempt' },
    ],
  },
  {
    id: 'analytics',
    title: 'Data and analytics',
    blurb: 'Getting from raw data to a dashboard or a decision.',
    skills: [
      { name: 'Microsoft Excel', level: 'Applied', where: 'Dashboards and databases at Nuvama and Sunsystechsol' },
      { name: 'Data visualisation and dashboards', level: 'Applied', where: 'Portfolio health reviews' },
      { name: 'Market and data research', level: 'Applied', where: '450+ institution database' },
      { name: 'Python', level: 'Applied', where: 'Quantara' },
      { name: 'NumPy and Pandas', level: 'Studied', where: 'CFA Python course, 2026' },
      { name: 'SQL (PostgreSQL)', level: 'Studied', where: 'Udemy SQL bootcamp' },
      { name: 'Forecasting models (GARCH)', level: 'Exploring', where: 'Quantara research' },
    ],
  },
  {
    id: 'business',
    title: 'Business analysis',
    blurb: 'Framing the problem before solving it, and keeping people aligned along the way.',
    skills: [
      { name: 'Problem definition and structuring', level: 'Applied', where: 'CaseQuest, top 30 of 1,411 teams' },
      { name: 'Requirements mapping', level: 'Applied', where: 'IT needs of 450+ institutions' },
      { name: 'Stakeholder and client communication', level: 'Applied', where: '300+ HNI/UHNI prospect calls' },
      { name: 'Agile and Scrum', level: 'Studied', where: 'Agile & DevOps course project' },
      { name: 'Product management', level: 'Studied', where: 'Google course on Coursera' },
    ],
  },
  {
    id: 'technology',
    title: 'Technology',
    blurb: 'An IT degree and internships in Java and MERN, now applied to my own projects.',
    skills: [
      { name: 'JavaScript', level: 'Applied', where: 'Setra, MERN internships' },
      { name: 'React and the MERN stack', level: 'Applied', where: 'Techplement, ZenithMatrix, Business Web Solution' },
      { name: 'Java', level: 'Applied', where: 'DXC training, Employee Management System' },
      { name: 'MySQL and MongoDB', level: 'Applied', where: 'Internship projects' },
      { name: 'Git and GitHub', level: 'Applied', where: 'Personal projects and CI workflows' },
      { name: 'API integration', level: 'Applied', where: 'Zerodha Kite API in Quantara' },
      { name: 'Offline-first mobile apps', level: 'Applied', where: 'Setra (Capacitor, IndexedDB)' },
      { name: 'AI and ML experimentation', level: 'Exploring', where: 'Prediction models in Quantara' },
    ],
  },
];

/** Tools shown as floating chips at the top of the Skills section. Only tools actually used. */
export const toolbelt: string[] = [
  'Microsoft Excel',
  'Python',
  'SQL',
  'PostgreSQL',
  'NumPy',
  'Pandas',
  'React',
  'JavaScript',
  'Java',
  'Spring Boot',
  'Node.js',
  'MongoDB',
  'MySQL',
  'Git & GitHub',
  'Zerodha Kite API',
  'Capacitor',
];
