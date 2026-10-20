/**
 * ─────────────────────────────────────────────────────────────
 *  PROJECTS — the single place to add, edit or remove projects.
 * ─────────────────────────────────────────────────────────────
 *  Projects are shown NEWEST FIRST, sorted by `date` ('YYYY-MM').
 *  `when` is the label shown on the card.
 *
 *  size:
 *    'feature' — a big card in the scrolling gallery
 *    'compact' — a row in the archive list below it (still opens details)
 *
 *  status — pick the one that is actually true today:
 *    'Completed' | 'Prototype' | 'In development' | 'Planned'
 *
 *  Pictures: real screenshots live in /public/images/projects/.
 *  Set `image: { src, alt }` to use one. Otherwise `visual` picks one of the
 *  illustrative drawings in src/components/ProjectVisual.tsx (labelled as such).
 *
 *  Optional sections (planned, decisions, challenges, learnings, note…)
 *  are hidden automatically when left out — don't write filler.
 */

export type ProjectStatus = 'Completed' | 'Prototype' | 'In development' | 'Planned';
export type ProjectCategory = 'Finance' | 'Analytics' | 'Software' | 'Personal';
export type ProjectVisualKind = 'candles' | 'phone' | 'valuation' | 'allocation' | 'database' | 'clinic' | 'crud';

export interface Project {
  id: string;
  title: string;
  /** 'YYYY-MM' — used for ordering only. */
  date: string;
  /** Shown on the card, e.g. 'May 2022' or '2026'. */
  when: string;
  size: 'feature' | 'compact';
  tagline: string;
  summary: string;
  categories: ProjectCategory[];
  status: ProjectStatus;
  context: string;
  /** Only list technologies you have confirmed. */
  stack: string[];
  visual?: ProjectVisualKind;
  image?: { src: string; alt: string };
  links?: { github?: string; demo?: string };
  problem: string;
  role: string;
  approach: string[];
  implemented: string[];
  implementedLabel?: string;
  planned?: string[];
  plannedLabel?: string;
  decisions?: string[];
  challenges?: string[];
  learnings?: string[];
  note?: string;
}

const gh = (repo: string) => `https://github.com/PratapGuru/${repo}`;

const list: Project[] = [
  {
    id: 'warzone-score-keeper',
    title: 'WarZone Score Keeper',
    date: '2021-05',
    when: 'May 2021',
    size: 'compact',
    tagline: 'My first web project',
    summary: 'A score-tracking page for Warzone matches — the first thing I built with HTML, CSS and JavaScript, styled with the Bulma framework.',
    categories: ['Software', 'Personal'],
    status: 'Completed',
    context: 'Personal project',
    stack: ['HTML', 'CSS', 'JavaScript', 'Bulma'],
    links: { github: gh('WarZone-Score-kepper') },
    problem: 'Keeping score during games with friends, and a first excuse to learn how a web page responds to clicks.',
    role: 'Solo project.',
    approach: ['A single page with buttons that update each player’s score using JavaScript.'],
    implemented: ['Score tracking in the browser.'],
  },
  {
    id: 'air-quality',
    title: 'Air Quality Monitoring System',
    date: '2022-05',
    when: 'May 2022',
    size: 'compact',
    tagline: 'Arduino sensor project',
    summary: 'Arduino code that reads air quality from an MQ135 gas sensor, shows it on a 16×2 LCD and shares it over Wi-Fi through an ESP8266 module.',
    categories: ['Software'],
    status: 'Completed',
    context: 'Engineering project, B.Tech years',
    stack: ['C (Arduino)', 'MQ135 sensor', 'ESP8266 Wi-Fi', 'LCD'],
    links: { github: gh('Air-Monitring-System') },
    problem: 'Make air quality visible on the spot and from a nearby device.',
    role: 'Wrote and set up the Arduino code.',
    approach: [
      'Read the MQ135 sensor through the Arduino’s analogue input.',
      'Display the reading on a 16×2 LCD.',
      'Run the ESP8266 as a Wi-Fi access point to share the readings.',
    ],
    implemented: ['Sensor reading, LCD display and Wi-Fi sharing in one Arduino sketch.'],
  },
  {
    id: 'ems',
    title: 'Employee Management System',
    date: '2022-05',
    when: '2022',
    size: 'feature',
    tagline: 'Spring Boot web app with login and admin CRUD',
    summary:
      'A Java web application where users register and log in, and an administrator can create, view, update and delete employee records — built during onboarding training at DXC Technology.',
    categories: ['Software'],
    status: 'Completed',
    context: 'Training project, DXC Technology',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'Thymeleaf', 'MySQL', 'Maven'],
    visual: 'crud',
    links: { github: gh('Employee-Management-System') },
    problem: 'A training exercise in building a complete, secure, data-backed web application around an everyday back-office task.',
    role: 'Solo project during onboarding training.',
    approach: [
      'Layered structure: controllers, services and repositories.',
      'Spring Security for registration and login, with user roles.',
      'Spring Data JPA over MySQL for storage; Thymeleaf templates for the pages.',
    ],
    implemented: [
      'User registration and login.',
      'Create, read, update and delete employee records.',
    ],
  },
  {
    id: 'amazon-clone',
    title: 'Amazon home page clone',
    date: '2024-02',
    when: 'Feb 2024',
    size: 'compact',
    tagline: 'Layout practice in HTML and CSS',
    summary: 'A static recreation of a large e-commerce home page, built to practise page layout with HTML and CSS.',
    categories: ['Software'],
    status: 'Completed',
    context: 'Learning project',
    stack: ['HTML', 'CSS'],
    links: { github: gh('Amazon-Clone') },
    problem: 'Practise reproducing a dense, real-world layout.',
    role: 'Solo project.',
    approach: ['Hand-written HTML structure and CSS layout.'],
    implemented: ['Static home-page layout.'],
  },
  {
    id: 'registration-form',
    title: 'Registration form',
    date: '2024-02',
    when: 'Feb 2024',
    size: 'compact',
    tagline: 'Form built with HTML, CSS and JavaScript',
    summary: 'A sign-up form built with plain HTML, CSS and JavaScript.',
    categories: ['Software'],
    status: 'Completed',
    context: 'Learning project',
    stack: ['HTML', 'CSS', 'JavaScript'],
    links: { github: gh('Registration-Form') },
    problem: 'Practise building and scripting forms.',
    role: 'Solo project.',
    approach: ['HTML form with CSS styling and JavaScript behaviour.'],
    implemented: ['Registration form.'],
  },
  {
    id: 'movie-tickets',
    title: 'Movie ticket booking',
    date: '2024-02',
    when: 'Feb 2024',
    size: 'compact',
    tagline: 'Pick a movie, choose seats',
    summary: 'A booking page where you pick a movie, select seats on a cinema layout and see the ticket total based on the movie’s price.',
    categories: ['Software'],
    status: 'Completed',
    context: 'Learning project',
    stack: ['HTML', 'CSS', 'JavaScript'],
    links: { github: gh('Movie-Ticket-Booking-Site') },
    problem: 'Practise interactive state in the browser: selections, prices and totals.',
    role: 'Solo project.',
    approach: ['Seat grid with available, selected and occupied states, priced by the chosen movie.'],
    implemented: ['Movie selection and seat selection.'],
  },
  {
    id: 'video-player',
    title: 'Custom video player',
    date: '2024-02',
    when: 'Feb 2024',
    size: 'compact',
    tagline: 'Own controls on top of HTML5 video',
    summary: 'A video player with its own play/pause and stop controls, progress bar and timestamp, written in JavaScript on top of the HTML5 video element.',
    categories: ['Software'],
    status: 'Completed',
    context: 'Learning project',
    stack: ['HTML', 'CSS', 'JavaScript'],
    links: { github: gh('Video-Player') },
    problem: 'Understand how media controls work under the hood.',
    role: 'Solo project.',
    approach: ['JavaScript event handlers drive the video element and update the progress bar and timestamp.'],
    implemented: ['Play/pause, stop, progress bar and timestamp.'],
  },
  {
    id: 'currency-calculator',
    title: 'Currency Exchange Calculator',
    date: '2024-03',
    when: 'Mar 2024',
    size: 'feature',
    tagline: 'Live exchange rates from an API',
    summary: 'Pick two currencies and an amount, and the calculator fetches the exchange rate from an exchange-rate API and converts it — with a one-click swap.',
    categories: ['Finance', 'Software'],
    status: 'Completed',
    context: 'Learning project',
    stack: ['HTML', 'CSS', 'JavaScript', 'Exchange-rate API'],
    image: { src: '/images/projects/currency-calculator.webp', alt: 'Screenshot of the Exchange Rate Calculator converting 1 INR to US dollars' },
    links: { github: gh('Currency-Exchange-Calculator') },
    problem: 'A small, practical finance tool — and a first project calling a real API.',
    role: 'Solo project.',
    approach: ['Fetch the current rate for the selected pair from an API and recalculate whenever the amount or currency changes.'],
    implemented: ['Currency selection, amount conversion and a swap button.'],
  },
  {
    id: 'dom-array-methods',
    title: 'DOM array methods',
    date: '2024-03',
    when: 'Mar 2024',
    size: 'compact',
    tagline: 'forEach, map, filter, sort and reduce in practice',
    summary: 'A practice project that loads random people from an API and uses JavaScript array methods — forEach, map, filter, sort and reduce — to transform the list on screen.',
    categories: ['Software'],
    status: 'Completed',
    context: 'Learning project',
    stack: ['HTML', 'CSS', 'JavaScript', 'Random name API'],
    links: { github: gh('DOM-Array-Methods-') },
    problem: 'Learn JavaScript’s array methods by seeing each one change real data.',
    role: 'Solo project.',
    approach: ['Each button applies one array method to the list and re-renders it.'],
    implemented: ['forEach, map, filter, sort and reduce demonstrations.'],
  },
  {
    id: 'hangman',
    title: 'Hangman',
    date: '2024-03',
    when: 'Mar 2024',
    size: 'compact',
    tagline: 'Browser word game',
    summary: 'The classic word game: guess the hidden word one letter at a time while an SVG figure is drawn for each wrong guess.',
    categories: ['Software'],
    status: 'Completed',
    context: 'Learning project',
    stack: ['HTML', 'CSS', 'JavaScript', 'SVG'],
    links: { github: gh('Hangman-Game') },
    problem: 'Practise keyboard input and game state.',
    role: 'Solo project.',
    approach: ['Track guessed letters and reveal parts of an SVG figure on wrong guesses.'],
    implemented: ['Playable game in the browser.'],
  },
  {
    id: 'anime-finder',
    title: 'Anime Finder',
    date: '2024-03',
    when: 'Mar 2024',
    size: 'feature',
    tagline: 'Search anime and watch trailers',
    summary: 'Search for any anime title through an anime API, open a title for its details, and watch its trailer — or let the random button pick something for you.',
    categories: ['Software', 'Personal'],
    status: 'Completed',
    context: 'Personal project',
    stack: ['HTML', 'CSS', 'JavaScript', 'Anime API'],
    image: { src: '/images/projects/anime-finder.webp', alt: 'Screenshot of Anime Finder: an illustrated header above a search box' },
    links: { github: gh('Anime-Finder') },
    problem: 'A fun way to practise working with a large public API — anime is one of my interests.',
    role: 'Solo project.',
    approach: ['Query the API from the search box, render results as image cards, and load details and the trailer on click.'],
    implemented: ['Title search, random pick, detail view and trailer playback.'],
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker',
    date: '2024-03',
    when: 'Mar 2024',
    size: 'feature',
    tagline: 'Income, expenses and balance in the browser',
    summary: 'Add income and expenses, see total earned, spent and remaining balance, and keep the history — saved in the browser’s local storage.',
    categories: ['Finance', 'Software', 'Personal'],
    status: 'Completed',
    context: 'Personal project',
    stack: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
    image: { src: '/images/projects/expense-tracker.webp', alt: 'Screenshot of the Expense Tracker showing balance, income, expense and an add-transaction form' },
    links: { github: gh('Expense-Tracker') },
    problem: 'A simple personal-finance tool that keeps working after the page is closed.',
    role: 'Solo project.',
    approach: ['Positive amounts are income, negative are expenses; totals recalculate on every change and persist to localStorage.'],
    implemented: ['Add transactions, running balance, income and expense totals, history, local persistence.'],
  },
  {
    id: 'marketing-website',
    title: 'Porsche marketing website',
    date: '2024-03',
    when: 'Mar 2024',
    size: 'compact',
    tagline: 'My first React project',
    summary: 'A multi-page marketing site about Porsche models — 911 GT3, GT3 RS and Turbo — with routing between pages and a contact page.',
    categories: ['Software', 'Personal'],
    status: 'Completed',
    context: 'Learning project',
    stack: ['React', 'React Router', 'CSS'],
    links: { github: gh('Marketing-Website') },
    problem: 'Learn React by building a multi-page site with routing.',
    role: 'Solo project.',
    approach: ['One component per model page, connected with React Router.'],
    implemented: ['Home page, three model pages and a contact page.'],
  },
  {
    id: 'portfolio-2024',
    title: 'Portfolio website, 2024',
    date: '2024-04',
    when: 'Apr 2024',
    size: 'feature',
    tagline: 'Full-stack MERN portfolio with an admin panel',
    summary:
      'My first portfolio: a MERN site whose content — intro, about, experience and projects — is edited through a password-protected admin panel and stored in MongoDB.',
    categories: ['Software', 'Personal'],
    status: 'Completed',
    context: 'Built during the ZenithMatrix internship',
    stack: ['React', 'Redux Toolkit', 'Ant Design', 'Tailwind CSS', 'GSAP', 'Node.js', 'Express', 'MongoDB'],
    image: { src: '/images/projects/portfolio-2024.webp', alt: 'Screenshot of the 2024 portfolio: “I am an Enthusiastic Developer.” on a dark background' },
    links: { github: gh('Pratap-Sikdar-Portfolio') },
    problem: 'A portfolio whose content could be updated without touching code.',
    role: 'Solo project — front end, back end and database.',
    approach: [
      'React front end with Redux Toolkit for state and GSAP for animation.',
      'Node.js server with routes and Mongoose models for portfolio data and users.',
      'Admin pages for editing each section after logging in.',
    ],
    implemented: ['Public portfolio pages, admin login and admin editors for intro, about, experience and projects.'],
  },
  {
    id: 'quote-generator',
    title: 'Random quote generator',
    date: '2024-05',
    when: 'May 2024',
    size: 'compact',
    tagline: 'Built in two days for a team-selection task',
    summary: 'A React app that shows a random quote and lets you search quotes by author — built within two days as the selection task for my Techplement internship.',
    categories: ['Software'],
    status: 'Completed',
    context: 'Internship task, Techplement',
    stack: ['React', 'React Router'],
    links: { github: gh('Techplement') },
    problem: 'Ship a small, working app against a tight deadline.',
    role: 'Solo project.',
    approach: ['Fetch quotes from a public quotes API; refresh for a new one or search by author.'],
    implemented: ['Random quote, refresh and author search.'],
  },
  {
    id: 'clinic',
    title: 'Clinic Management System',
    date: '2024-05',
    when: 'May 2024',
    size: 'feature',
    tagline: 'Patient records and appointment booking',
    summary:
      'A MERN web application, built with a team during my Techplement internship, that lets clinic staff manage patient records and lets patients register for doctor appointments.',
    categories: ['Software'],
    status: 'Completed',
    context: 'Internship, Techplement',
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
    visual: 'clinic',
    problem: 'Small clinics often track patients and appointments on paper or in spreadsheets, which makes scheduling and record-keeping slow.',
    role: 'Team member — co-developed the application.',
    approach: [
      'Separate views for hospital staff and administrators, and for patients.',
      'Patient records stored in MongoDB behind an Express and Node.js API.',
    ],
    implemented: ['Record management for 100+ patients by staff and admins.', 'Online registration for doctor appointments.'],
  },
  {
    id: 'fi-database',
    title: 'Financial-institution intelligence database',
    date: '2025-12',
    when: 'Dec 2025 – Feb 2026',
    size: 'compact',
    tagline: 'Market research on 450+ institutions',
    summary:
      'A central Excel database profiling 450+ financial institutions and their IT requirements, built to give a business-development team one place to plan outreach from.',
    categories: ['Analytics'],
    status: 'Completed',
    context: 'Internship, Sunsystechsol',
    stack: ['Microsoft Excel'],
    visual: 'database',
    problem: 'An IT services firm selling to financial institutions needed to know who to approach and what each prospect was likely to need.',
    role: 'Researched, validated and structured the data, and worked with senior leadership on the insights drawn from it.',
    approach: [
      'Research and validate organisational data on each institution.',
      'Map IT requirements alongside key organisational details in a consistent structure.',
      'Use the combined view to prioritise lead generation with senior leadership.',
    ],
    implementedLabel: 'Outcome',
    implemented: ['A maintained database of 450+ institution profiles used for targeted business development.'],
  },
  {
    id: 'portfolio-review',
    title: 'Portfolio health review dashboards',
    date: '2026-04',
    when: 'Apr – Jun 2026',
    size: 'feature',
    tagline: 'Excel dashboards for HNI/UHNI portfolio reviews',
    summary:
      'Built during my Nuvama Wealth internship: Excel dashboards that turn a client’s holdings into a review of allocation, benchmark performance and missed gains.',
    categories: ['Finance', 'Analytics'],
    status: 'Completed',
    context: 'Internship, Nuvama Wealth',
    stack: ['Microsoft Excel'],
    visual: 'allocation',
    problem:
      'Clients’ holdings arrive as long consolidated statements. A relationship manager needs to see quickly where a portfolio is concentrated, how it compares with a benchmark, and what staying in weaker holdings has cost.',
    role: 'Built the dashboards and the benchmark and missed-gain analysis as an intern on the wealth management team.',
    approach: [
      'Read holdings from consolidated account statements (ECAS) — 20 were analysed in total.',
      'Measure each portfolio on asset allocation, diversification, CAGR, XIRR and P/E.',
      'Compare holdings with relevant benchmarks to estimate missed gains or losses.',
      'Summarise underperformers and tax-efficient options in line with the client’s risk profile and age.',
    ],
    implementedLabel: 'Outcome',
    implemented: [
      'Portfolio-review dashboards covering about ₹1.75 crore of client assets.',
      'A benchmark and missed-gain comparison that my manager later used in client pitch decks.',
    ],
    note: 'Client names and portfolio data are confidential and are not shown here.',
  },
  {
    id: 'quantara',
    title: 'Quantara',
    // EDIT: set the month you started Quantara for accurate ordering.
    date: '2026-07',
    when: '2026',
    size: 'feature',
    tagline: 'Algorithmic-trading research and application',
    summary:
      'A personal project exploring how historical market data, quantitative models and predefined strategies can be combined into a structured research-to-trade workflow. The current prototype pulls market data through the Zerodha Kite API, runs strategies against it and places paper trades.',
    categories: ['Finance', 'Personal'],
    status: 'Prototype',
    context: 'Personal project',
    stack: ['Python', 'Zerodha Kite API'],
    visual: 'candles',
    problem:
      'Retail trading decisions are often made on instinct, one chart at a time. I wanted to see how far a disciplined, rules-based workflow could go: collect the data, test an idea against it, and only then act — with entry, exit and risk rules written down in advance.',
    role: 'Solo project — concept, research and development. Quantara was also the case study for a five-person Agile & DevOps group project and presentation at IIM Bodh Gaya.',
    approach: [
      'Pull historical candle data and market data through the Zerodha Kite API.',
      'Encode predefined strategies as explicit entry and exit rules rather than discretionary calls.',
      'Run strategies in paper-trading mode first, so ideas are tested without real capital.',
      'Layer in forecasting experiments and risk analysis as separate, testable modules.',
    ],
    implementedLabel: 'Working in the prototype',
    implemented: [
      'Market-data retrieval through the Zerodha Kite API.',
      'Running predefined strategies against that data.',
      'Paper trading — simulated orders only, no real money.',
    ],
    plannedLabel: 'Being explored or planned',
    planned: [
      'Candlestick-data processing and historical analysis tooling.',
      'Prediction-model experiments, including GARCH-family volatility models.',
      'Strategy comparison and matching to market conditions.',
      'Separate intraday and long-term strategy workflows.',
      'Risk and performance analysis for each strategy.',
      'Automated order execution — only after paper-trading results are reviewed.',
    ],
    note: 'Quantara is a learning and research project. It does not trade live capital, and no backtest returns or prediction accuracy are claimed here.',
  },
  {
    id: 'setra',
    title: 'Setra',
    date: '2026-09',
    when: 'Sep 2026',
    size: 'feature',
    tagline: 'Privacy-first workout tracker for Android',
    summary:
      'An offline-first training log that keeps every workout on the device. No account, no backend, no sync — the Android build doesn’t even request internet permission.',
    categories: ['Software', 'Personal'],
    status: 'In development',
    context: 'Personal project',
    stack: ['JavaScript', 'IndexedDB', 'Service worker', 'Capacitor (Android)', 'Node build scripts', 'GitHub Actions'],
    visual: 'phone',
    links: { github: gh('setra-mobile') },
    problem:
      'Most gym apps ask you to sign up and send your training history to someone else’s server. Workout logs are personal, and a tracker doesn’t need the cloud to be useful — so Setra keeps the data with the person who owns it.',
    role: 'Solo project — product scope, design and development.',
    approach: [
      'Plain JavaScript with no framework or bundler, so the code you edit is the code that runs.',
      'IndexedDB as the primary store, with a localStorage fallback and versioned schema migrations for older data.',
      'A service worker caches the app so it works fully offline; Capacitor wraps it as an Android app.',
      'Headless-browser tests, and a GitHub Actions workflow that builds the Android release bundle.',
    ],
    implemented: [
      'Workout and routine tracking with exercise, set and weight logging.',
      'Cardio, personal records, goals and body measurements.',
      'Calendar and progress views, plus a progress dashboard.',
      'Local data export, import and deletion.',
      'Installable offline web build and an Android build with app backup disabled.',
      'A demo mode with sample data held in memory only.',
    ],
    planned: ['Google Play release, starting with closed testing.'],
    decisions: [
      'No analytics, crash reporting or server SDKs — adding any would mean revisiting the privacy policy first.',
      'Cloud backup is switched off, so export and import are how people move their data.',
    ],
    note: 'The preview on this page is an illustrative mockup, not a screenshot of the app.',
  },
  {
    id: 'finsight',
    title: 'FinSight',
    date: '2026-12',
    when: 'Up next',
    size: 'feature',
    tagline: 'Financial-analysis and valuation workstation',
    summary:
      'A concept for a workstation that pulls figures out of company reports, organises them, and walks through statement analysis and valuation step by step — with every extracted number traceable to its source.',
    categories: ['Finance', 'Analytics', 'Personal'],
    status: 'Planned',
    context: 'Personal project',
    stack: [],
    visual: 'valuation',
    problem:
      'In financial statement analysis, much of the effort goes into finding and re-keying numbers from long reports before any real analysis starts. FinSight aims to make that groundwork faster, and the resulting valuation easier to understand and review.',
    role: 'Solo project — scoping and design.',
    approach: [
      'Start from the report: upload it, extract the figures, and cite the page each one came from.',
      'Build the analysis in the order an analyst would — income statement, cash flow, then valuation.',
      'Keep every assumption visible and editable, so the output can be checked rather than trusted blindly.',
    ],
    implementedLabel: 'Status',
    implemented: ['Scoping and design. No features are released yet.'],
    plannedLabel: 'Planned capabilities',
    planned: [
      'Upload and analyse company reports.',
      'Revenue, EBITDA, EBIT, PAT and EPS analysis.',
      'Discounted cash flow valuation using free cash flow to the firm (FCFF).',
      'WACC, terminal value and enterprise value calculations.',
      'Comparable-company valuation with P/E, EV/EBITDA and EV/Sales.',
      'Risk and sensitivity analysis.',
      'Source citations for every extracted figure.',
    ],
    note: 'FinSight is an analysis and valuation aid. It is not a stock-picking engine and does not give investment advice.',
  },
];

/** Newest first. */
export const projects: Project[] = [...list].sort((a, b) => b.date.localeCompare(a.date));

export const projectCategories: ProjectCategory[] = ['Finance', 'Analytics', 'Software', 'Personal'];
