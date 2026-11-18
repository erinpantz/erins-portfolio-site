import { redirect } from 'react-router';
import { NAV_HREFS } from '../site';

// /portfolio was the Portfolio's address before it became the front page.
// Old links and bookmarks still work: this sends them to /. The build turns
// the redirect into a tiny /portfolio/index.html that moves to / at once (a
// meta refresh, marked noindex so search engines skip it), so it works on any
// static host with no server settings. Following a link to /portfolio inside
// the site goes straight to / without loading that page.
export const loader = () => redirect(NAV_HREFS.portfolio, 301);

export default function PortfolioRedirect() {
  return null;
}
