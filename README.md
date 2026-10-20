# Pratap Sikdar — Portfolio

Personal portfolio of **Pratap Sikdar**, second-year MBA student (Finance, IT & Analytics) at IIM Bodh Gaya.

**Live site:** https://pratapguru.github.io/ (after GitHub Pages is enabled — see below)

A single-page site covering my background, my internship at Nuvama Wealth, personal and internship projects, and skills — built as a static React app that runs free on GitHub Pages. No server, no database, no paid services, no analytics or tracking.

---

## Features

- **Sections:** Home, About, Experience, Projects, Skills, Contact — with smooth scrolling and an active-section indicator in the navigation.
- **Opening loader:** a counter runs to 100 while a market-style sparkline draws, then the screen splits open. Click or press any key to skip; skipped automatically for visitors who prefer reduced motion.
- **Animated character:** an original illustrated character at a desk — eyes follow the cursor, blinks, waves and types while a chart grows beside it — with live stat cards around it.
- **Scroll-driven motion:** a progress bar along the top, hero parallax, section titles that rise out of a mask, a statement whose words light up as you scroll, counters, and crossed ticker tapes that speed up and change direction with your scrolling.
- **Projects, newest first:** main projects in a pinned gallery that moves sideways as you scroll (a swipeable row on phones), and smaller projects in an archive list where a preview card follows the cursor. Category filters, status labels (Completed / Prototype / In development / Planned) and an accessible case-study view for every project.
- **Skills:** grouped and filterable, each with an honest level (Applied / Studied / Exploring) and where it was used — no percentage bars.
- **Light/dark theme** with a smooth transition, remembered between visits.
- **Resume download** that checks the PDF exists first and shows a clear message instead of a broken link if it's missing.
- **Accessibility:** keyboard navigation, skip link, visible focus, focus-trapped modals that close on Escape and return focus, inert background while a modal is open, screen-reader labels for icons and external links.
- **Reduced motion:** all animations and smooth scrolling switch off when the visitor's OS asks for reduced motion.
- **SEO and sharing:** title and description, Open Graph/Twitter card image, structured data, favicon, sitemap, robots.txt and a custom 404 page.
- **Self-hosted fonts** (Unbounded and IBM Plex Sans via Fontsource) — no third-party requests.

## Tech stack

| Purpose | Tool |
| --- | --- |
| UI | React 19 + TypeScript |
| Build | Vite 7 |
| Styling | Plain CSS with design tokens (`src/styles/`) |
| Animation | Motion for React (`motion`) |
| Icons | Lucide (+ two inline brand icons) |
| Hosting | GitHub Pages via GitHub Actions |

## Project structure

```
.
├── .github/workflows/deploy.yml   # Build + deploy to GitHub Pages
├── public/                        # Copied as-is into the build
│   ├── resume/Pratap-Sikdar-Resume.pdf
│   ├── images/projects/           # Real project screenshots
│   ├── favicon.svg, favicon-32.png, apple-touch-icon.png
│   ├── og-image.png               # Social-sharing preview (1200×630)
│   ├── 404.html, robots.txt, sitemap.xml
├── src/
│   ├── data/                      # ← EDIT CONTENT HERE
│   │   ├── profile.ts             # Name, intro, links, email, resume path
│   │   ├── about.ts               # Bio, education, achievements, courses, milestones
│   │   ├── experience.ts          # Nuvama + earlier internships
│   │   ├── projects.ts            # All projects (single source of truth)
│   │   └── skills.ts              # Skill groups and levels
│   ├── sections/                  # Hero, About, Experience, Projects, Skills, Contact, Footer
│   ├── components/                # Nav, cards, modal, filters, chart, buttons…
│   ├── hooks/                     # Theme, active section, resume check, scroll state
│   ├── styles/                    # tokens.css (colours, type) + global.css
│   ├── App.tsx
│   └── main.tsx
├── index.html                     # Meta tags, Open Graph, theme pre-paint script
├── vite.config.ts                 # base: '/' for a user site
└── package.json
```

## Run it locally

You need **Node.js 20.19+ or 22.12+** (22 LTS recommended) — https://nodejs.org

```bash
npm install        # install dependencies (first time only)
npm run dev        # start the dev server → http://localhost:5173
npm run build      # type-check and build the production site into dist/
npm run preview    # serve the production build → http://localhost:4173
```

## Editing content

All content lives in `src/data/`. You never need to touch the components to update text.

### Personal info and links — `src/data/profile.ts`

```ts
export const links = {
  github: 'https://github.com/PratapGuru',
  linkedin: 'https://www.linkedin.com/in/pratap-sikdar-171215189/',
  email: 'pratap.s2027@iimbg.ac.in',
};
```

Set any link to `''` to hide it everywhere on the site. Everything in this folder ships to the browser and is public — never put passwords, tokens or API keys here.

### Adding a project — `src/data/projects.ts`

Copy an existing object in the `projects` array and edit it. Projects are shown **newest first**, sorted by `date`. `size: 'feature'` puts a project in the sliding gallery; `'compact'` puts it in the archive list:

```ts
{
  id: 'my-project',                // unique, lowercase
  title: 'My Project',
  date: '2026-11',                 // YYYY-MM, used for ordering
  when: 'Nov 2026',                // label shown on the card
  size: 'feature',                 // 'feature' = gallery card, 'compact' = archive row
  tagline: 'One-line description',
  summary: 'Two or three sentences.',
  categories: ['Analytics'],       // Finance | Analytics | Software | Personal
  status: 'In development',        // Completed | Prototype | In development | Planned
  context: 'Personal project',
  stack: ['Python', 'SQL'],        // only confirmed technologies
  image: { src: '/images/projects/my-project.webp', alt: 'What the screenshot shows' },
  // …or, with no screenshot: visual: 'database'  (candles | phone | valuation | allocation | database | clinic | crud)
  links: { github: 'https://github.com/PratapGuru/my-project' },
  problem: '…',
  role: '…',
  approach: ['…'],
  implemented: ['…'],
  planned: ['…'],                  // optional
}
```

Optional sections (`planned`, `decisions`, `challenges`, `learnings`, `note`) are hidden automatically when left out. Screenshots are labelled "Screenshot" on the site; drawings are labelled "Illustrative preview".

### Updating the resume

Replace `public/resume/Pratap-Sikdar-Resume.pdf` with your new PDF (keep the same file name, or update `resume.path` in `profile.ts`). If the file is missing, the download buttons show "The resume PDF isn't uploaded yet" instead of a broken link.

> **Privacy note:** the resume PDF is publicly downloadable once the site is live. The current file includes your phone number — remove it from the PDF first if you don't want it public.

### Skills, experience, education

Edit `skills.ts`, `experience.ts` and `about.ts` in the same way. Skill levels are `Applied`, `Studied` or `Exploring`.

### Colours and fonts

Design tokens are in `src/styles/tokens.css` — dark theme first, light theme under `[data-theme='light']`.

## Publishing on GitHub Pages (free)

This site is set up as a **user site**, which GitHub serves from the domain root: `https://pratapguru.github.io/`. That only works if the repository is named exactly **`pratapguru.github.io`**.

### 1. Create the repository

1. Go to https://github.com/new
2. Repository name: **`pratapguru.github.io`**
3. Visibility: **Public** (free GitHub Pages requires a public repository)
4. Do **not** add a README, .gitignore or licence (this project already has them)
5. Click **Create repository**

### 2. Put the deployment workflow in place (one time)

GitHub only runs workflows from `.github/workflows/`. If your copy of this folder has a `setup-github-actions/deploy.yml` file, move it there first. In PowerShell, opened in this folder:

```powershell
New-Item -ItemType Directory -Force .github\workflows | Out-Null
Move-Item setup-github-actions\deploy.yml .github\workflows\deploy.yml
Remove-Item setup-github-actions
```

(Or do it in File Explorer: create a folder named `.github`, inside it a folder named `workflows`, and move `deploy.yml` into it.)

### 3. Push the code

In a terminal opened in this folder:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/PratapGuru/pratapguru.github.io.git
git push -u origin main
```

GitHub will ask you to sign in the first time (use the browser sign-in, or a personal access token as the password).

### 4. Turn on GitHub Pages

1. Open the repository on GitHub → **Settings** → **Pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions**
3. Go to the **Actions** tab. The "Deploy to GitHub Pages" workflow runs on every push to `main`. If the first run happened before you changed the source, click it and choose **Re-run all jobs** (or use **Run workflow**).
4. When it finishes (about a minute), the site is live at **https://pratapguru.github.io/**

From then on, every `git push` to `main` rebuilds and redeploys the site automatically.

### Custom domain (optional)

GitHub Pages hosting and HTTPS are free on the `github.io` address. A custom domain (e.g. `pratapsikdar.com`) is optional and costs money to register (typically a yearly fee from a domain registrar). If you add one later, set it under **Settings → Pages → Custom domain**, update `siteUrl` in `profile.ts`, and replace `pratapguru.github.io` in `index.html`, `public/robots.txt` and `public/sitemap.xml`.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| No workflow runs in the Actions tab | Check `deploy.yml` is at `.github/workflows/deploy.yml` (step 2) and pushed. |
| Site shows the README instead of the portfolio | Settings → Pages → Source must be **GitHub Actions**, not "Deploy from a branch". |
| Blank page, assets 404 | The repo must be named `pratapguru.github.io`. If you use a different repo name (e.g. `portfolio`), set `base: '/portfolio/'` in `vite.config.ts` and update the URLs in `index.html`. |
| Workflow fails at `npm ci` | Commit `package-lock.json` (it's needed for reproducible installs). |
| Workflow fails with a permissions/environment error | Settings → Environments → `github-pages` → make sure `main` is an allowed deployment branch. |
| Old version still showing | Wait a minute and hard-refresh (Ctrl+Shift+R); GitHub's CDN caches briefly. |
| Social preview not updating on LinkedIn | Use LinkedIn's Post Inspector (https://www.linkedin.com/post-inspector/) to refresh the cached preview. |
| Resume button says it isn't uploaded | Check the PDF is at `public/resume/Pratap-Sikdar-Resume.pdf` and the name matches `resume.path`. |

## Licence

Code: feel free to learn from it. Content (text, resume, project descriptions) © Pratap Sikdar.
