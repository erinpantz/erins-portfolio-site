import { type RouteConfig, index, route } from '@react-router/dev/routes';
import { PLAYGROUND_PROJECTS } from './playground/projects';

// Which page each address shows. Each file is in app/routes/, except the
// Playground projects and Music, which live with their code in app/playground/
// and app/profile/.
export default [
  // The Portfolio is the front page
  index('routes/portfolio.tsx'),
  // The Portfolio's old address, which now sends people to the front page
  route('portfolio', 'routes/portfolio-redirect.tsx'),
  // Every case study, from case-studies/<slug>/index.mdx
  route('portfolio/:slug', 'routes/case-study.tsx'),
  route('playground', 'routes/playground.tsx'),
  // Every Playground project, each from app/playground/<slug>/route.tsx
  ...PLAYGROUND_PROJECTS.map((slug) => route(`playground/${slug}`, `playground/${slug}/route.tsx`)),
  route('profile', 'routes/profile.tsx'),
  // Music, below Profile, from app/profile/music/
  route('profile/music', 'profile/music/route.tsx'),
  // Everything else: Page not found
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
