import type { Config } from '@react-router/dev/config';

export default {
  // No server: every page is built into a finished HTML file ahead of time
  ssr: false,
  prerender: ['/', '/portfolio', '/playground', '/profile'],
} satisfies Config;
