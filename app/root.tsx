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

// Which nav item is the current page. Case studies count as Portfolio; an
// address without a page (Page not found) has none.
function currentPage(pathname: string): ShellProps['current'] {
  const [first, slug, ...rest] = pathname.split('/').filter(Boolean);
  if (rest.length > 0) return undefined;
  if (first === 'portfolio' && (!slug || caseStudies[slug])) return 'portfolio';
  if (!slug && (first === 'playground' || first === 'profile')) return first;
  return undefined;
}

function SiteShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <Shell current={currentPage(pathname)} hrefs={NAV_HREFS} footer={siteFooter}>
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
