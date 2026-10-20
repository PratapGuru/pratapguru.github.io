/**
 * EXPERIENCE — the featured internship plus a compact list of earlier roles.
 * Source: your resume. Keep wording factual; don't add numbers you can't back up.
 */

export interface Metric {
  value: number;
  /** Text shown before / after the animated number, e.g. '₹' and ' cr'. */
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

export interface FeaturedExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  metrics: Metric[];
  groups: { title: string; points: string[] }[];
  tools: string[];
}

export const featuredExperience: FeaturedExperience = {
  company: 'Nuvama Wealth Management',
  role: 'Wealth Management Intern (summer internship)',
  period: 'April – June 2026',
  location: 'Bengaluru',
  summary:
    'A summer internship spanning portfolio analytics, investment product research and client prospecting for ' +
    'HNI and UHNI investors — the analytical side of wealth management and the conversations that come before it.',
  metrics: [
    { value: 300, suffix: '+', label: 'prospect calls to HNI and UHNI investors' },
    { value: 1.49, prefix: '₹', suffix: ' cr', decimals: 2, label: 'across 5 closed investments I contributed to' },
    { value: 20, label: 'ECAS statements analysed for portfolio health reviews' },
  ],
  groups: [
    {
      title: 'Portfolio analytics',
      points: [
        'Built Excel portfolio-review dashboards for HNI/UHNI clients covering about ₹1.75 crore in assets.',
        'Analysed asset allocation, diversification, benchmark performance, CAGR, XIRR, P/E ratios and missed gains or losses to flag optimisation opportunities.',
        'Developed a benchmark and missed-gain comparison approach that my manager went on to use in client pitch decks.',
        'Prepared portfolio health reviews from 20 ECAS statements, highlighting underperforming holdings, opportunity loss and tax-efficient options suited to each client’s risk profile and age.',
      ],
    },
    {
      title: 'Investment product research',
      points: [
        'Researched eight product families Nuvama offers — mutual funds, PMS, AIFs, market-linked debentures, NCDs, zero-coupon bonds, InvITs and insurance — to support client-specific recommendations and suitability analysis.',
      ],
    },
    {
      title: 'Client prospecting',
      points: [
        'Made 300+ cold calls to HNI/UHNI prospects, qualifying opportunities and scheduling meetings with senior wealth managers.',
        'Contributed to five closed investments worth ₹1.49 crore and helped build a ₹60 crore UHNI opportunity pipeline for a senior wealth manager.',
      ],
    },
  ],
  tools: ['Microsoft Excel', 'Portfolio analytics', 'CAGR & XIRR', 'Benchmarking', 'Product research'],
};

export interface Role {
  company: string;
  role: string;
  period: string;
  kind: 'Finance' | 'Technology';
  points: string[];
}

/** Earlier internships, newest first. */
export const earlierRoles: Role[] = [
  {
    company: 'Sunsystechsol Pvt. Ltd.',
    role: 'Financial Analyst Intern (remote)',
    period: 'Dec 2025 – Feb 2026',
    kind: 'Finance',
    points: [
      'Researched and validated data on 450+ financial institutions for market intelligence and business development.',
      'Designed and maintained a central Excel database of institution profiles, mapping IT requirements and key organisational data.',
      'Worked with senior leadership to turn that data into insights for lead generation.',
    ],
  },
  {
    company: 'Techplement',
    role: 'Web Developer Intern (remote)',
    period: 'May 2024',
    kind: 'Technology',
    points: [
      'Built a MERN random-quote generator within two days as a team-selection task.',
      'Co-developed a MERN clinic management system for managing 100+ patient records and doctor appointments.',
    ],
  },
  {
    company: 'ZenithMatrix Solutions',
    role: 'Web Developer Intern (remote)',
    period: 'April 2024',
    kind: 'Technology',
    points: ['Built the company’s portfolio website using the MERN stack.'],
  },
  {
    company: 'Business Web Solution',
    role: 'Web Developer Intern (remote)',
    period: 'Feb – May 2024',
    kind: 'Technology',
    points: ['Learned full-stack MERN development and completed 10+ projects for the internship’s final evaluation.'],
  },
  {
    company: 'DXC Technology',
    role: 'Java Developer (onboarding training)',
    period: 'Feb – May 2022',
    kind: 'Technology',
    points: [
      'Completed four months of advanced Java training for full-stack web development.',
      'Built an employee management system with admin CRUD operations.',
    ],
  },
];
