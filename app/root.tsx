import type { ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from 'react-router';
import { Section, Shell, themeScript, type ShellProps } from 'verity-design-system';
import 'verity-design-system/styles.css';
import type { Route } from './+types/root';
import { caseStudies } from './caseStudies';
import { NAV_HREFS, siteFooter } from './site';

// The HTML around every page
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {/* Verity's themeScript applies the saved theme before anything paints,
            so a Red visitor never sees a flash of Blue. It has to stay inline
            and first. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Icons, exported from Figma into public/. Browsers that read SVG use
            it; the PNGs are fallbacks for those that don't. */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// Whether an address is a case study: /portfolio/<slug>, for a slug with a
// case-studies/<slug>/index.mdx. This is the one place that decides it, so a
// new case study is covered as soon as its folder exists.
function isCaseStudy(pathname: string) {
  const [first, slug, ...rest] = pathname.split('/').filter(Boolean);
  return first === 'portfolio' && !!slug && rest.length === 0 && !!caseStudies[slug];
}

// Which nav item is the current page. Case studies count as Portfolio; an
// address without a page (Page not found) has none.
function currentPage(pathname: string): ShellProps['current'] {
  if (isCaseStudy(pathname)) return 'portfolio';
  const [first, ...rest] = pathname.split('/').filter(Boolean);
  if (rest.length > 0) return undefined;
  if (first === 'portfolio' || first === 'playground' || first === 'profile') return first;
  return undefined;
}

// Case studies are for reading one piece of work, so they use Shell's focused
// mode: no nav, and a link back to the Portfolio in the corner. Every other
// page, /portfolio included, has the nav.
function SiteShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const focused = isCaseStudy(pathname);
  return (
    <Shell
      mode={focused ? 'focused' : 'default'}
      backLink={focused ? { href: NAV_HREFS.portfolio, label: 'Portfolio' } : undefined}
      current={currentPage(pathname)}
      hrefs={NAV_HREFS}
      footer={siteFooter}
    >
      {children}
    </Shell>
  );
}

export default function App() {
  return (
    <SiteShell>
      <Outlet />
    </SiteShell>
  );
}

// Shown instead of the page if something breaks while it's showing
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  console.error(error);
  return (
    <SiteShell>
      <Section headingLevel={1} heading="Something went wrong" />
    </SiteShell>
  );
}
