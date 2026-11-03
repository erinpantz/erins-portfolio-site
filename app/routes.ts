import { type RouteConfig, index, route } from '@react-router/dev/routes';

// Which page each address shows. Each file is in app/routes/.
export default [
  index('routes/home.tsx'),
  route('portfolio', 'routes/portfolio.tsx'),
  route('playground', 'routes/playground.tsx'),
  route('profile', 'routes/profile.tsx'),
] satisfies RouteConfig;
