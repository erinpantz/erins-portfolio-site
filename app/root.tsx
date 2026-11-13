import { useEffect, useRef, type ReactNode } from 'react';
import { Links, Meta, Outlet, Link as RouterLink, Scripts, ScrollRestoration, useLocation, useNavigation } from 'react-router';
import { LinkProvider, Section, Shell, themeScript, type LinkComponent, type ShellProps } from 'verity-design-system';
import 'verity-design-system/styles.css';
import type { Route } from './+types/root';
import { caseStudies } from './caseStudies';
import { PAGE_LOADER_WORDS } from './pageLoaderWords';
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

// Verity's links to the site's own pages go through React Router's Link, so
// following one changes the page in the app instead of reloading it. A page
// starts loading when someone hovers over or focuses its link. Verity keeps
// other sites, mailto:, new tabs, and files like the resume PDF as plain links.
const SiteLink: LinkComponent = ({ href = '', ...props }) => <RouterLink to={href} prefetch="intent" {...props} />;

// A page change in the app doesn't reset focus the way a reload does, so after
// one (not the first load), focus moves to Main, where the skip link sends it:
// keyboard and screen reader users start at the new page. It doesn't scroll:
// ScrollRestoration decides that (the top for a new page, where you were for
// Back and Forward).
function useFocusMainOnPageChange() {
  const { key } = useLocation();
  const firstKey = useRef(key);
  useEffect(() => {
    if (key === firstKey.current) return;
    document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true });
  }, [key]);
}

// Which section an address is in, for the page loader: Home, then the same
// sections as currentPage. Anything else (Page not found) has no loader.
function sectionOf(pathname: string): ShellProps['pending'] {
  if (pathname === '/') return 'home';
  return currentPage(pathname);
}

// The section a page change is going to, while React Router loads it. None
// for the browser's Back and Forward buttons, where people expect the page
// they left right away: those fire a popstate event and links don't, so a
// popstate marks the page change that follows. None for a link to the page
// someone is already on.
function usePendingSection(): ShellProps['pending'] {
  const navigation = useNavigation();
  const location = useLocation();
  const fromHistory = useRef(false);
  useEffect(() => {
    const onPopState = () => {
      fromHistory.current = true;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  // A page change that's done clears the mark, whether or not it loaded
  useEffect(() => {
    if (navigation.state === 'idle') fromHistory.current = false;
  }, [navigation.state, location.key]);

  const going = navigation.location;
  if (navigation.state !== 'loading' || !going || fromHistory.current) return undefined;
  if (going.pathname === location.pathname) return undefined;
  return sectionOf(going.pathname);
}

// Case studies are for reading one piece of work, so they use Shell's focused
// mode: no nav, and a link back to the Portfolio in the corner. Every other
// page, /portfolio included, has the nav. Its links change pages in the app
// (SiteLink). Moving to another section shows Verity's PageLoader, with the
// words in app/pageLoaderWords.ts: Shell decides when, from the section the
// page change is going to.
function SiteShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const focused = isCaseStudy(pathname);
  const pending = usePendingSection();
  useFocusMainOnPageChange();
  return (
    <LinkProvider component={SiteLink}>
      <Shell
        mode={focused ? 'focused' : 'default'}
        backLink={focused ? { href: NAV_HREFS.portfolio, label: 'Portfolio' } : undefined}
        current={currentPage(pathname)}
        hrefs={NAV_HREFS}
        footer={siteFooter}
        pending={pending}
        loaderWords={PAGE_LOADER_WORDS}
      >
        {children}
      </Shell>
    </LinkProvider>
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
