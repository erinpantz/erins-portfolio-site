import type { ReactNode } from 'react';
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from 'react-router';
import { Section, Shell, themeScript, type ShellProps } from 'verity-design-system';
import 'verity-design-system/styles.css';
import type { Route } from './+types/root';
import { NAV_HREFS, pageTitle, siteFooter } from './site';

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

// Which nav item is the current page. Case studies count as Portfolio.
function currentPage(pathname: string): ShellProps['current'] {
  if (pathname.startsWith('/portfolio')) return 'portfolio';
  if (pathname.startsWith('/playground')) return 'playground';
  if (pathname.startsWith('/profile')) return 'profile';
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

// Shown instead of a page when it doesn't exist or something breaks
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  if (!notFound) console.error(error);
  return (
    <SiteShell>
      <title>{pageTitle(notFound ? 'Page not found' : 'Something went wrong')}</title>
      <Section headingLevel={1} heading={notFound ? 'Page not found' : 'Something went wrong'} />
    </SiteShell>
  );
}
