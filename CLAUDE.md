# Erin’s portfolio site

The code for erintozour.com, the portfolio of Erin Tozour, a product designer. It’s built entirely from **Verity**, her design system, which lives in its own repo (`~/Documents/verity-design-system`, on GitHub as `erinpantz/verity-design-system`, public). Both repos are portfolio pieces, so clean structure and clear reasoning matter as much as working code.

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
- Hosted on **Vercel** (the free Hobby plan), built from GitHub (see “Hosting and deploying” below)

## The site uses only Verity

- Every component, token, font, and style comes from `verity-design-system`. No Tailwind, no CSS-in-JS, no hand-written values, and no new components here.
- **If something is missing** (a component, a prop, a token, a variant), stop and tell Erin. It gets added to Verity and released as a new tag, not built or worked around here.
- **The one exception: site components Erin asks for.** When Erin decides a piece of one page should be the site’s own markup instead of a Verity component (like `IntroCard`, the Portfolio’s intro card), it’s a small component in `app/` with a CSS Module beside it (`IntroCard.tsx` and `IntroCard.module.css`). Its styles use only Verity’s CSS variables (`--verity-…`), with no typed values. Text styles use the `--verity-viewport-typography-…` variables, which change at each breakpoint on their own, so no media queries are needed. It still uses Verity’s components inside it, like `Button`. Only build one when Erin asks; otherwise, anything missing goes to Verity.
- `verity-design-system/styles.css` is imported once, in `app/root.tsx`. Verity’s `themeScript` is inline in `<head>` there, before anything that paints. Keep it inline and imported, never copied.
- **Playground is the other exception.** Playground is for experiments and messy work. Its code lives in `app/playground/`, one folder per project (like `app/playground/imperfecto/`, with its page and its own components, such as `TypeTester`), and doesn’t need to become Verity components. It still uses Verity’s tokens and components wherever they exist, so themes, type, and focus rings stay consistent; a value with no token is fine there, explained in a comment. Something moves into Verity only when another part of the site needs it.
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
- `npm run preview`: serve `build/client/` at http://localhost:4173 the way a static host does (run `npm run build` first). Don’t use `vite preview`: it sends the front page for addresses like `/profile`, which breaks pre-rendered pages.
- `npm run typecheck`: check the code with TypeScript
- `npm run verity:local`, `npm run verity:tag`, `npm run verity:which`: switch between the linked Verity folder and the tagged version (see README.md). To update Verity, change the tag in `package.json`, then run `npm run verity:tag`: it installs that tag by name and keeps the lock file on HTTPS (see below)

## Hosting and deploying

- **Vercel builds the site from GitHub, from `main`.** Every push to `main` deploys to production, so pushing is publishing: don't push until Erin has reviewed the work locally. Every pull request (and every other pushed branch) gets its own preview address, which Vercel posts on the pull request.
- **The build runs on a clean machine** with no SSH key and none of Erin's local setup, so everything it needs comes from the repo: `npm ci` (which installs exactly what `package-lock.json` says), then `npm run build`.
- **Verity is fetched over HTTPS.** npm writes GitHub addresses as SSH (`git+ssh://git@github.com/…`), which needs a key. `npm run verity:tag`, and a `postinstall` step after every `npm install`, rewrite Verity's address in `package-lock.json` to `git+https://github.com/…` (the same commit). If a diff ever shows `git+ssh` there again, run `npm run verity:tag`.
- **Node 24**, pinned in `package.json` (`engines`), the same as on Erin's Mac.
- **`vercel.json`** (JSON has no comments, so they're here):
  - `framework: null` (Vercel's “Other”): serve `build/client` as plain files. Vercel's React Router preset, which it would otherwise pick, sends any address with no file to the home page with a 200, so a mistyped address would show the Portfolio instead of Page not found.
  - `buildCommand` and `outputDirectory`: `npm run build`, into `build/client`. The build script also copies the Page not found page (`404/index.html`) to `404.html`, which Vercel serves, with a 404 status, for any address with no page. `npm run preview` does the same.
  - `headers`: the files in `assets/` have a fingerprint in each name, so browsers can keep them for a year (`immutable`). The HTML keeps Vercel's default, so a new deploy shows up at once.
  - `/portfolio` needs no setting: the build makes it a page that moves to `/` (see `portfolio-redirect.tsx`).

## How it fits together

```
app/
  root.tsx               the HTML around every page: <head> with themeScript, Verity's
                         styles, and Shell (nav and footer)
  routes.ts              which address shows which page
  routes/                one file per page; portfolio.tsx is the front page (/),
                         case-study.tsx is the template for every case study,
                         portfolio-redirect.tsx sends the old /portfolio to /, and
                         not-found.tsx is Page not found (built to /404)
  site.tsx               site-wide content: nav addresses, the footer, page titles
  experience.ts          Erin’s roles for the Profile page’s Experience section (EXPERIENCE),
                         most recent first
  caseStudies.ts         finds every case-studies/<slug>/index.mdx, and lists the ones on
                         the Portfolio page, in order (PORTFOLIO_ORDER)
  NotFound.tsx           the Page not found content
  IntroCard.tsx          the Portfolio’s intro card, a site component (see “The one
                         exception” above), with IntroCard.module.css
  PlaygroundGrid.tsx     the Playground page’s projects (square thumbnails with their titles
                         under them), a site component, with PlaygroundGrid.module.css
  playground/            Playground projects: projects.ts lists them, and each has a
                         folder (<slug>/) with its page (route.tsx) and its own code
  profile/music/         the Music page (route.tsx), its albums (albums.ts), their
                         covers, and its own components
  resume/                the résumé page (route.tsx), at /resume, its image, and its
                         Download (ResumeDownload.tsx)
case-studies/<slug>/     index.mdx, plus the images/, animations/, and videos/ it uses
assets/                  images and illustrations shared across pages
plugins/                 build steps, such as remarkProseRuns.ts for case studies
scripts/                 verity.js (switching Verity copies, and keeping it on HTTPS) and
                         preview.js
vercel.json              Vercel's build settings (see “Hosting and deploying”)
public/                  files that need a fixed address, like the favicons, the web
                         manifest, and the résumé PDF; copied into the build as-is
```

- **Page titles** use `pageTitle()` from `app/site.tsx`: “Laguna Companion · Erin Tozour”, and “Erin Tozour” for the front page.
- **The front page is the Portfolio,** at `/`. `/portfolio` is built as a redirect to `/`, so old links still work; case studies stay at `/portfolio/<slug>`.
- **The nav** comes from Verity’s `Shell`. `app/site.tsx` sets where each link goes. The current page is worked out in `app/root.tsx`; the front page and case studies count as Portfolio.
- **Case studies, the résumé, Playground projects, and Music use Shell's focused mode:** no nav, and a back link in the top-left corner, “Back.” A click goes back in the history when the previous page is on the site, so visitors return where they were; otherwise (a shared link, a search, a Home Screen icon) it's a link to their section: Portfolio for a case study (`/portfolio/<slug>`) and the résumé (`/resume`), Playground for a project (`/playground/<slug>`), Profile for Music (`/profile/music`). `useBackLink` in `app/root.tsx` decides which. The résumé also has Download, for its PDF, in the top-right corner (Shell's `action`). `focusedPage` and `SUBPAGES` there are the one place that decides focused pages from the address, so a new case study folder, or a new slug in `app/playground/projects.ts`, gets it automatically. They count as their section for the page loader. Every other page has the nav.

## Building a case study

Every case study tells its own story, so its outline differs: how many Sections, what they're called, and which components are in them. What they share is the building blocks below and the rules for using them. Build each one from its Figma page, top to bottom, with the text copied exactly.

### Files

- One folder per case study: `case-studies/<slug>/`, with `index.mdx` and the `images/`, `animations/`, and `videos/` it uses. The folder name is the address (`/portfolio/<slug>`), and a new folder with an `index.mdx` is picked up and pre-rendered automatically.
- Import every component the file uses from `verity-design-system` at the top, then every media file. `Prose` is the only component the file doesn't import (see below).

### What every case study has

- **Frontmatter:** `title` (the project's name, for the browser tab: “Laguna Companion · Erin Tozour”), then `CaseStudyHeader`'s props: `heading` (the page's only `<h1>`) and `facts`: Company, Role, and Year, in that order. The template (`app/routes/case-study.tsx`) renders the header from it, in a Container, at the top of Main.
- **Its Portfolio card** comes from the same frontmatter: `heading`, and the facts titled “Company” and “Year”, plus `images/case-study-thumbnail.avif` (3:2). A case study shows on Portfolio only once its slug is in `PORTFOLIO_ORDER` in `app/caseStudies.ts`; the build stops if a listed one has no Company or Year fact, or no thumbnail.
- **A hero image first:** the body starts with `<Container><MediaBlock width="wide"><Image … loading="eager" /></MediaBlock></Container>`.

After that, the template puts the MDX body straight into Main: everything in it is a Container or a Section, and Main's gap spaces them.

### The toolkit

- **Sections** are the chapters: `<Section heading="…">`, one per Figma Section, with a level 2 heading. A Section holds its blocks in the content column (`content/column-width`, 880) and spaces them with `spacing/xl`.
- **Markdown inside a Section becomes Prose.** The `remarkProseRuns` build step (`plugins/remarkProseRuns.ts`) wraps each run of Markdown inside a `<Section>` or `<TextBlock>` in one `Prose`, and leaves the components between runs alone. Headings in that Markdown start at `###`, under the Section's `<h2>`. Leave a blank line after an opening `<Section>` tag and before its closing tag, and around every component inside it.
- **Markdown anywhere else stops the build**, with the file and line: at the top level it would sit in Main with no column, and in a Container it would break Verity's one-thing-per-Container rule.
- **A heading that introduces a component goes in a TextBlock**, with the component inside it: `<TextBlock heading="Takeaways">` around an `UnorderedList`, or around a `Grid` of `StatCard`s. A TextBlock can also hold Markdown before its component (it becomes Prose). A heading that introduces paragraphs stays in the Markdown, even when an image follows them. See [Spacing and rhythm › A heading and what it introduces](https://github.com/erinpantz/verity-design-system/blob/main/src/guidelines/SpacingAndRhythm.mdx).
- **Paragraphs and a list stacked closer together:** where Figma puts a Prose and a list in a VerticalStack (`spacing/md` between them instead of the Section's `spacing/xl`), write `<VerticalStack gap="md">` with the Markdown in an explicit `<Prose>` (blank lines inside it), then the `UnorderedList`. The build step only adds Prose straight inside a Section or TextBlock, so a stack needs it written out. Navio's Objective Section is an example.
- **Containers** hold one thing each, between Sections: the hero, an opening Quote, a wide stack of images. For more than one thing, put a `VerticalStack` (or `Grid`) in the Container.
- **Divider Containers** (`<Container><Divider /></Container>`) are written by hand where the story wants a pause, as in Figma; nothing inserts them. Laguna has one after each Section.
- **The column and `wide`:** every block sits in the 880 column. `MediaBlock`, `Grid`, `VerticalStack`, `HorizontalStack`, and `Gallery` can break out to the full width with `width="wide"`; use it exactly where the Figma block is wide. Inside a wide stack, set each MediaBlock to `wide` too.
- **Components to choose from:** `MediaText` (text beside media), `Grid` (with Figma's `itemWidth` and `gap`: `md` for cards, `lg` for quotes), `StatCard` (`variant` as in Figma, such as `brand`), `Quote` (`quote` without quotation marks: it adds them; `name`, and an optional `title`), `UnorderedList` with `UnorderedListItem` (an optional `title` above each item's text), `MediaBlock` (with a `caption` only where Figma shows one), `Image`, `Animation`, `Video`, `Gallery`, `ProblemOpportunityBlock`. Check each one's props in Verity's Storybook.
- If the design needs something Verity doesn't have, stop and tell Erin; it gets added to Verity, not built here.

### Media

- **Images:** WebP or AVIF, exported at the size they're shown, at 2× (a column image is shown at 880, so about 1,760 px wide; a wide one at up to 1,824, so up to about 3,600). Import each one and pass it to `Image`; never use Markdown `![]()`. `Image` crops to its `aspectRatio` (16:9 unless set; also 3:2, 4:3, or 1:1), so match Figma's frame. Figma's Fill is `fit="cover"` (the default) and Fit is `fit="contain"`. Check that no file carries a C2PA metadata block (`grep -c -E 'c2pa|jumb' <file>` prints 0).
- **Animations:** Lottie files in `animations/`, played by Verity's `Animation`, with a poster (a still of the first frame, as WebP or AVIF) at the same shape. Import the `.lottie` file with `?url` on the end (`import summary from './animations/Creating Summary.lottie?url'`), so the build publishes it as a file.
- **Videos:** short, silent clips in `videos/`, played by Verity's `Video`: MP4, H.264, no audio track, 1920 × 1080, under about 5 MB, each with a poster of its first frame at the same size (`<name>-poster.webp`).
- Animations and videos loop while they're on screen; Verity adds the pause button and respects “reduce motion,” so there's nothing to set.
- **Alt text** on every image, animation, and video: say what it shows, and for a video, what happens in it. Draft it from the media itself and give it to Erin for review.
- The build copies only the files the MDX imports, with a fingerprint in each name so browsers can cache them for good.

### Example

`case-studies/laguna-companion/index.mdx` puts these together: a hero and an opening Quote in Containers, then nine Sections with Prose, TextBlocks, MediaText, Grids of StatCards and Quotes, wide images, Animations, and Videos, with a Divider Container after each. Use it to see how the pieces fit, not as an outline to copy.
