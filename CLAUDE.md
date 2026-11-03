# Erin’s portfolio site

The code for erintozour.com, the portfolio of Erin Tozour, a product designer. It’s built entirely from **Verity**, her design system, which lives in its own repo (`~/Documents/verity-design-system`, on GitHub as `erinpantz/verity-design-system`, private). Both repos are portfolio pieces, so clean structure and clear reasoning matter as much as working code.

## Working with Erin

- Erin is a senior product designer and new to code: she has never written JavaScript or TypeScript. She’s learning the end-to-end workflow so she can direct and review AI-built code.
- Before running a command or adding a new kind of file, explain in a sentence or two what it does and why. Define jargon the first time it comes up.
- Ask before installing extra libraries, changing the folder structure, or doing anything hard to undo. Ask about design and content decisions; don’t invent facts or copy. Mark placeholder text clearly (“Placeholder: …”).
- Commit in small steps with `git commit -m "…"`. Messages are short and start with a verb (“Add Profile page”, “Fix nav link”). Don’t push until Erin has reviewed the work.
- After a change, tell her how to see it (which page to open, and with which command).

## Stack

- React and TypeScript, built with **Vite**
- **React Router** in framework mode. Every page is **pre-rendered**: the build turns each route into a finished HTML file, so the content and the first paint come from HTML and CSS before any JavaScript runs. There’s no server (`ssr: false`).
- **MDX** for case studies: Markdown with components, plus frontmatter for the header
- No hosting is set up yet

## The site uses only Verity

- Every component, token, font, and style comes from `verity-design-system`. No Tailwind, no CSS-in-JS, no hand-written values, and no new components here.
- **If something is missing** (a component, a prop, a token, a variant), stop and tell Erin. It gets added to Verity and released as a new tag, not built or worked around here.
- `verity-design-system/styles.css` is imported once, in `app/root.tsx`. Verity’s `themeScript` is inline in `<head>` there, before anything that paints. Keep it inline and imported, never copied.
- **Media queries** appear only in page-level layout, and only with Verity’s generated breakpoints: `@value medium from 'verity-design-system/breakpoints.module.css';`, then `@media medium { … }`. Never type a breakpoint width by hand.
- **Links go somewhere, buttons do something.** Something that goes to a page or URL is a link (`<a href>`); `Button` with `href` renders one styled as a button.

## Verity’s guidelines

Follow them; don’t copy them here. Read the matching page before you name, space, or write anything:

- [Writing style](https://github.com/erinpantz/verity-design-system/blob/main/src/guidelines/WritingStyle.mdx): all site copy, page titles, and placeholder text
- [Spacing and rhythm](https://github.com/erinpantz/verity-design-system/blob/main/src/guidelines/SpacingAndRhythm.mdx): who owns each space
- [Naming](https://github.com/erinpantz/verity-design-system/blob/main/src/guidelines/Naming.mdx)
- [Verity’s CLAUDE.md](https://github.com/erinpantz/verity-design-system/blob/main/CLAUDE.md) and the README section “Using Verity in a project”

Locally they’re in `../verity-design-system/src/guidelines/`. Each component’s props and docs are in Verity’s Storybook (`npm run storybook` in Verity).

## Commands

- `npm run dev`: start the site at http://localhost:5173, reloading on every save
- `npm run build`: pre-render every page into `build/client/`
- `npm run preview`: serve `build/client/` at http://localhost:4173 the way a static host does (run `npm run build` first). Don’t use `vite preview`: it sends the Home page for addresses like `/profile`, which breaks pre-rendered pages.
- `npm run typecheck`: check the code with TypeScript
- `npm run verity:local`, `npm run verity:tag`, `npm run verity:which`: switch between the linked Verity folder and the tagged version (see README.md)

## How it fits together

```
app/
  root.tsx               the HTML around every page: <head> with themeScript, Verity's
                         styles, and Shell (nav and footer)
  routes.ts              which address shows which page
  routes/                one file per page; case-study.tsx is the template for every
                         case study, and not-found.tsx is Page not found (built to /404)
  site.tsx               site-wide content: nav addresses, the footer, page titles
  caseStudies.ts         finds every case-studies/<slug>/index.mdx
  NotFound.tsx           the Page not found content
case-studies/<slug>/     index.mdx, plus the images/ and animations/ it uses
assets/                  images and illustrations shared across pages
plugins/                 build steps, such as remarkProseRuns.ts for case studies
scripts/                 verity.js (switching Verity copies) and preview.js
public/                  (add when needed) files that need a fixed address, like the
                         resume PDF and the favicon; copied into the build as-is
```

- **Page titles** use `pageTitle()` from `app/site.tsx`: “Laguna Companion · Erin Tozour”, and “Erin Tozour” for Home.
- **The nav** comes from Verity’s `Shell`. `app/site.tsx` sets where each link goes. The current page is worked out in `app/root.tsx`; case studies count as Portfolio.

## Case studies

- One folder per case study: `case-studies/<slug>/index.mdx`. The folder name is the address (`/portfolio/<slug>`). A new folder with an `index.mdx` is picked up and pre-rendered automatically.
- **Frontmatter** at the top is `CaseStudyHeader`’s props: `badge`, `heading` (the page’s only `<h1>`), and `facts`.
- **The body** is Markdown plus Verity components, imported at the top of the file. Headings start at `##`.
- **Prose holds only text.** The `remarkProseRuns` build step wraps each run of Markdown in a `Prose`. Components such as `MediaText`, `Gallery`, `ProblemOpportunityBlock`, and `StatCard` sit between those runs, in a `VerticalStack` with the `lg` gap (the same gap Section uses between blocks). Write them on their own lines, with blank lines around them.
- **Images** are imported in the MDX (`import hero from './images/hero.webp'`) and passed to Verity’s `Image`, never written as Markdown `![]()`. The build copies only imported files, with a fingerprint in the name so browsers can cache them for good. Export images already optimized (WebP or AVIF, at the size they’re shown); nothing resizes them here yet.
- **Animations:** Verity has no animation player yet, so use the PNG still from `animations/`.
