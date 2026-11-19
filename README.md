# Erin Tozour’s portfolio site

The code for [erintozour.com](https://erintozour.com), the portfolio of Erin Tozour, a product designer.

The site is built entirely from **Verity**, my personal design system, which lives in its own repo.

## Status

This is a work in progress. I’m rebuilding my portfolio in code, with AI as a collaborator, and documenting the process as a case study. The current site at erintozour.com still runs on Webflow until the new one is ready.

## How it’s built

- **React and TypeScript**, built with **Vite**
- **React Router**, which pre-renders every page: the build turns each page into a finished HTML file, so the content and styles arrive before any JavaScript runs
- **MDX** for case studies: Markdown text with Verity components placed where the story needs them
- **Verity** for every component, token, and style

## Running it locally

You need [Node.js](https://nodejs.org) 24. Verity's repo is public, so nothing else is needed.

```sh
npm install        # install everything, including Verity from its GitHub tag
npm run dev        # start the site at http://localhost:5173
```

To check the finished site:

```sh
npm run build      # pre-render every page into build/client/
npm run preview    # serve it at http://localhost:4173, like a host would
```

## Working on Verity and the site together

`package.json` always names a tagged version of Verity, like `github:erinpantz/verity-design-system#v0.1.0`. While I’m changing Verity, the site can use my local Verity folder instead, so changes show up right away.

1. **Link it.** In the site, run `npm run verity:local`. It replaces the installed copy with a link (a shortcut) to `../verity-design-system`. `package.json` and `package-lock.json` don’t change, so a link can’t be committed by accident.
2. **Run two terminals.** In Verity: `npm run build:watch`, which rebuilds Verity on every save. In the site: `npm run dev`, which reloads when Verity rebuilds.
3. **Switch back** with `npm run verity:tag`.

**Which one am I using?** Run `npm run verity:which`. It says “Local: linked to …” or “Tag: … (commit …)”.

**Updating to a new Verity release:** after tagging Verity (see its README), change the tag in `package.json` and run `npm run verity:tag`. It installs that tag by name, so the lock file gets the tag's commit, and keeps Verity's address in the lock file on HTTPS (npm writes SSH, which Vercel's build machine can't use).

## Hosting and deploying

The site is hosted on [Vercel](https://vercel.com), on the free Hobby plan, and Vercel builds it from this GitHub repo:

- **Every push to `main` deploys** the site to production.
- **Every pull request gets a preview address,** a copy of the site with that pull request's changes, which Vercel posts on the pull request.

Vercel builds on a clean machine, so everything the build needs is in the repo: `vercel.json` (serve `build/client` as a static site, with long-lived caching for the fingerprinted files in `assets/`), the Node version (`engines` in `package.json`), and Verity's HTTPS address in `package-lock.json`. Addresses with no page get the Page not found page with a 404 status. CLAUDE.md explains each setting.

## Folders

- `app/`: the pages, the page frame, and site-wide content such as the footer
- `case-studies/`: one folder per case study, with its `index.mdx` and the images and animations it uses
- `assets/`: images and illustrations shared across pages
- `plugins/` and `scripts/`: small build and helper scripts

Working files, such as Illustrator sources, are kept outside this repo. Only exported, optimized files are committed.
