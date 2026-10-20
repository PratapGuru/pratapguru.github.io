/**
 * ABOUT — bio paragraphs, education timeline, achievements and courses.
 * Source: your resume. Marks/grades are intentionally not shown on the site;
 * add them here if you want them displayed.
 */

/** Big statement in the About section — its words light up as you scroll. */
export const manifesto =
  'I start with the business question — what is the client actually trying to decide, and what does this number really say — and then build the spreadsheet, dashboard or app that answers it.';

export const bio: string[] = [
  'I’m an MBA student at IIM Bodh Gaya, specialising in Finance and IT & Analytics, and I expect to graduate in March 2027. Before my MBA, I studied Information Technology at Sikkim Manipal Institute of Technology and completed several internships developing Java and MERN applications,',
  'That combination shapes how I work. I like to start with the business question — what is the client actually trying to decide, and what does this number really say — and then build the spreadsheet, dashboard or small application that answers it. At Nuvama Wealth that meant portfolio reviews and benchmark analysis for high-net-worth clients. On my own time it means projects like Quantara, an algorithmic-trading prototype, and Setra, an offline-first workout tracker.',
  'I’m most interested in roles where both halves of that background are useful: financial analysis and valuation, business analysis, consulting and strategy, and technology-led product work. I’m also preparing for the CFA Level I exam in February 2027.',
];

export const focusAreas: { title: string; text: string }[] = [
  { title: 'Financial analysis', text: 'Portfolio reviews, investment-product research and valuation coursework.' },
  { title: 'Business analysis', text: 'Defining the problem, mapping requirements and structuring the answer.' },
  { title: 'Data-driven decisions', text: 'Excel dashboards, SQL and Python to turn raw data into a recommendation.' },
  { title: 'Building software', text: 'Practical apps and prototypes, from MERN web apps to an Android tracker.' },
];

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  place: string;
  note?: string;
}

export const education: EducationItem[] = [
  {
    school: 'Indian Institute of Management Bodh Gaya',
    degree: 'MBA — Finance and IT & Analytics',
    period: '2025 – 2027',
    place: 'Bodh Gaya, Bihar',
  },
  {
    school: 'Sikkim Manipal Institute of Technology',
    degree: 'B.Tech — Information Technology',
    period: '2018 – 2022',
    place: 'Majhitar, Sikkim',
  },
];

export const achievements: { title: string; detail: string; year: string }[] = [
  {
    title: 'CaseQuest International Business Case Challenge',
    detail: 'Represented IIM Bodh Gaya and finished in the top 30 of 1,411 participating teams.',
    year: '2025',
  },
  {
    title: 'CFA Level I candidate',
    detail: 'Preparing for the February 2027 exam window.',
    year: 'In progress',
  },
];

export const courses: { title: string; provider: string; year: string }[] = [
  { title: 'Financial statement analysis, valuation and Excel modelling (13 hours)', provider: 'CFA', year: '2026' },
  { title: 'Python programming with NumPy and Pandas (12 hours)', provider: 'CFA', year: '2026' },
  { title: 'Product management: core concepts and strategic execution', provider: 'Google, via Coursera', year: '2025' },
  { title: 'The Complete SQL Bootcamp (PostgreSQL)', provider: 'Udemy', year: '2025' },
  { title: 'Microsoft Excel — Beginner to Advanced', provider: 'Udemy', year: '2025' },
  { title: 'Python for Everybody', provider: 'University of Michigan, via Coursera', year: '2020' },
];

export const leadership: { title: string; detail: string }[] = [
  { title: 'TEDx SMIT — event management team', detail: 'Handled guest relations and speaker outreach for the institute’s TEDx leadership talk.' },
  { title: 'Kaalrav SMIT — sponsorship team', detail: 'Helped secure Red Bull and Gaana as sponsors and ran a 20+ player badminton tournament.' },
];

