import type { Config } from '@react-router/dev/config';
import { readdirSync } from 'node:fs';

// One address per case study folder that has an index.mdx
const caseStudyPaths = readdirSync('case-studies', { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && readdirSync(`case-studies/${entry.name}`).includes('index.mdx'))
  .map((entry) => `/portfolio/${entry.name}`);

export default {
  // No server: every page is built into a finished HTML file ahead of time
  ssr: false,
  // /404 is the Page not found page, for addresses without a page
  prerender: ['/', '/portfolio', '/playground', '/profile', ...caseStudyPaths, '/404'],
} satisfies Config;
