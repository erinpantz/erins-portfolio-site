import type { Config } from '@react-router/dev/config';
import { readdirSync } from 'node:fs';
import { PLAYGROUND_PROJECTS } from './app/playground/projects';

// One address per case study folder that has an index.mdx
const caseStudyPaths = readdirSync('case-studies', { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && readdirSync(`case-studies/${entry.name}`).includes('index.mdx'))
  .map((entry) => `/portfolio/${entry.name}`);

// One address per Playground project
const playgroundPaths = PLAYGROUND_PROJECTS.map((slug) => `/playground/${slug}`);

export default {
  // No server: every page is built into a finished HTML file ahead of time
  ssr: false,
  // /404 is the Page not found page, for addresses without a page. /portfolio
  // is built as a redirect to / (app/routes/portfolio-redirect.tsx).
  prerender: ['/', '/portfolio', '/playground', '/profile', ...caseStudyPaths, ...playgroundPaths, '/404'],
} satisfies Config;
