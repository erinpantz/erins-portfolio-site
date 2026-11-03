import { type RouteConfig, index, route } from '@react-router/dev/routes';

// Which page each address shows. Each file is in app/routes/.
export default [
  index('routes/home.tsx'),
  route('portfolio', 'routes/portfolio.tsx'),
  // Every case study, from case-studies/<slug>/index.mdx
  route('portfolio/:slug', 'routes/case-study.tsx'),
  route('playground', 'routes/playground.tsx'),
  route('profile', 'routes/profile.tsx'),
  // Everything else: Page not found
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
