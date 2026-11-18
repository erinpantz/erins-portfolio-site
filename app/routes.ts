import { type RouteConfig, index, route } from '@react-router/dev/routes';

// Which page each address shows. Each file is in app/routes/.
export default [
  // The Portfolio is the front page
  index('routes/portfolio.tsx'),
  // The Portfolio's old address, which now sends people to the front page
  route('portfolio', 'routes/portfolio-redirect.tsx'),
  // Every case study, from case-studies/<slug>/index.mdx
  route('portfolio/:slug', 'routes/case-study.tsx'),
  route('playground', 'routes/playground.tsx'),
  route('profile', 'routes/profile.tsx'),
  // Everything else: Page not found
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
