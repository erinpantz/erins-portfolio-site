import { useEffect, useRef, type ReactNode } from 'react';
import { Links, Meta, Outlet, Link as RouterLink, Scripts, ScrollRestoration, useLocation, useNavigation } from 'react-router';
import { LinkProvider, Section, Shell, themeScript, type LinkComponent, type ShellProps } from 'verity-design-system';
import 'verity-design-system/styles.css';
import type { Route } from './+types/root';
import { caseStudies } from './caseStudies';
import { isPlaygroundProject } from './playground/projects';
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

// The pages inside a section, one level down: a case study at
// /portfolio/<slug> (for a slug with a case-studies/<slug>/index.mdx), or a
// Playground project at /playground/<slug> (for a slug in
// app/playground/projects.ts). This is the one place that decides it, so a
// new case study or project is covered as soon as it exists. Each opens in
// Shell's focused mode, with a link back to its section's page.
const SUBPAGES = {
  portfolio: { isPage: (slug: string) => !!caseStudies[slug], backLink: { href: NAV_HREFS.portfolio, label: 'Portfolio' } },
  playground: { isPage: isPlaygroundProject, backLink: { href: NAV_HREFS.playground, label: 'Playground' } },
} satisfies Record<string, { isPage: (slug: string) => boolean; backLink: ShellProps['backLink'] }>;

// The section of a subpage (above), or undefined for any other address
function subpageSection(pathname: string) {
  const [first, slug, ...rest] = pathname.split('/').filter(Boolean);
  if (!slug || rest.length > 0 || !(first in SUBPAGES)) return undefined;
  const section = first as keyof typeof SUBPAGES;
  return SUBPAGES[section].isPage(slug) ? section : undefined;
}

// Which section an address is in. The front page is the Portfolio, and a
// subpage (a case study or a Playground project) counts as its section; an
// address without a page (Page not found) is in none. The nav marks it as the
// current page (except on a subpage, which has no nav), and the page loader
// uses its words.
function sectionOf(pathname: string): ShellProps['current'] {
  if (pathname === '/') return 'portfolio';
  const subpage = subpageSection(pathname);
  if (subpage) return subpage;
  const [first, ...rest] = pathname.split('/').filter(Boolean);
  if (rest.length > 0) return undefined;
  if (first === 'playground' || first === 'profile') return first;
  return undefined;
}

// Verity's links to the site's own pages go through React Router's Link, so
// following one changes the page in the app instead of reloading it. A page
// starts loading when someone hovers over or focuses its link. Verity keeps
// other sites, mailto:, new tabs, and files like the résumé PDF as plain links.
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

// Whether a page change in progress came from the browser's Back or Forward
// button. Those move the browser's history first, and React Router then loads
// the page; a link's page change only adds to the history once its page has
// loaded. So while a page change loads, history already at the page it's
// going to (the same key) means Back or Forward. It holds after a reload too,
// since the browser keeps each entry's key.
function isBackOrForward(going: { key: string }) {
  const entry: unknown = window.history.state;
  return typeof entry === 'object' && entry !== null && 'key' in entry && entry.key === going.key;
}

// The section a page change is going to, while React Router loads it. None
// for the browser's Back and Forward buttons, where people expect the page
// they left right away, and none for a link to the page someone is already on.
function usePendingSection(): ShellProps['pending'] {
  const navigation = useNavigation();
  const { pathname } = useLocation();
  const going = navigation.location;
  if (navigation.state !== 'loading' || !going) return undefined;
  if (going.pathname === pathname || isBackOrForward(going)) return undefined;
  return sectionOf(going.pathname);
}

// Subpages (case studies and Playground projects) are for one piece of work,
// so they use Shell's focused mode: no nav, and a link back to their section
// in the corner (Portfolio, the front page, or Playground). Every other page
// has the nav. Its links change pages in the app
// (SiteLink). Moving to another section shows Verity's PageLoader, with the
// words in app/pageLoaderWords.ts: Shell decides when, from the section the
// page change is going to.
function SiteShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const subpage = subpageSection(pathname);
  const pending = usePendingSection();
  useFocusMainOnPageChange();
  return (
    <LinkProvider component={SiteLink}>
      <Shell
        mode={subpage ? 'focused' : 'default'}
        backLink={subpage ? SUBPAGES[subpage].backLink : undefined}
        current={sectionOf(pathname)}
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
