import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { Links, Meta, Outlet, Link as RouterLink, Scripts, ScrollRestoration, useLocation, useNavigate, useNavigation } from 'react-router';
import { Button, focusPageStart, LinkProvider, Section, Shell, themeScript, type LinkComponent, type ShellProps } from 'verity-design-system';
import 'verity-design-system/styles.css';
import type { Route } from './+types/root';
import { caseStudies } from './caseStudies';
import { isPlaygroundProject } from './playground/projects';
import { PAGE_LOADER_WORDS } from './pageLoaderWords';
import { GA_HOSTNAMES, GA_MEASUREMENT_ID, MUSIC_HREF, NAV_HREFS, RESUME_HREF, RESUME_PAGE_HREF, siteFooter } from './site';

// The EEA (the EU, Iceland, Liechtenstein, and Norway), the UK, and
// Switzerland, by ISO country code, for Google Analytics' consent defaults
const CONSENT_REGIONS = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  'IS', 'LI', 'NO', 'GB', 'CH',
];

// Google Analytics (GA4's gtag.js), as an inline script in <head>.
// - Only on the live site: on any other hostname (localhost, Vercel's
//   addresses) it stops at once, so nothing loads and nothing is sent.
// - Consent defaults, set before config: analytics_storage is denied for
//   visitors in the EEA, the UK, and Switzerland, so GA measures those visits
//   without cookies (no banner needed), and granted everywhere else. The ad
//   settings are denied everywhere, since the site has no ads.
// - gtag.js loads with async, so it never holds up the first paint or the
//   page loader.
// - Page views: GA's enhanced measurement counts the first load and each page
//   change in the app (from the browser's history), so none are sent here.
const gaScript = `(function () {
  if (${JSON.stringify(GA_HOSTNAMES)}.indexOf(location.hostname) === -1) return;
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'granted'
  });
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'denied',
    region: ${JSON.stringify(CONSENT_REGIONS)}
  });
  gtag('js', new Date());
  gtag('config', '${GA_MEASUREMENT_ID}');
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
  document.head.appendChild(s);
})();`;

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
        {/* Google Analytics, on the live site only (see gaScript above) */}
        <script dangerouslySetInnerHTML={{ __html: gaScript }} />
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
// /portfolio/<slug> (for a slug with a case-studies/<slug>/index.mdx), a
// Playground project at /playground/<slug> (for a slug in
// app/playground/projects.ts), or the Music page at /profile/music. This is
// the one place that decides it, so a new case study or project is covered as
// soon as it exists. Each opens in Shell's focused mode, with a back link
// (see useBackLink). `parent` is its section's page: where the back link goes
// when there's no page on the site to go back to.
const SUBPAGES = {
  portfolio: { isPage: (slug: string) => !!caseStudies[slug], parent: NAV_HREFS.portfolio },
  playground: { isPage: isPlaygroundProject, parent: NAV_HREFS.playground },
  profile: { isPage: (slug: string) => `/profile/${slug}` === MUSIC_HREF, parent: NAV_HREFS.profile },
} satisfies Record<string, { isPage: (slug: string) => boolean; parent: string }>;

// The section of a subpage (above), or undefined for any other address
function subpageSection(pathname: string) {
  const [first, slug, ...rest] = pathname.split('/').filter(Boolean);
  if (!slug || rest.length > 0 || !(first in SUBPAGES)) return undefined;
  const section = first as keyof typeof SUBPAGES;
  return SUBPAGES[section].isPage(slug) ? section : undefined;
}

// A page opened in Shell's focused mode: its section (for the page loader),
// its parent (where the back link goes when there's no page on the site to go
// back to), and an optional action for the top-right corner.
interface FocusedPage {
  section: keyof typeof SUBPAGES;
  parent: string;
  action?: ReactNode;
}

// The résumé (/resume), which counts as the Portfolio, where its button is,
// and falls back to it, like a case study. Its action downloads the PDF
// (RESUME_HREF): the browser saves the file instead of opening it, so a
// visitor in a Home Screen web app isn't stuck in an opened PDF.
const RESUME_PAGE: FocusedPage = {
  section: 'portfolio',
  parent: NAV_HREFS.portfolio,
  action: (
    <Button variant="secondary" background="scrim" startIcon="download" href={RESUME_HREF} download="erin-tozour-resume.pdf">
      Download
    </Button>
  ),
};

// The focused page at an address (a subpage, or the résumé), or undefined
// for a page with the nav. With SUBPAGES, this is the one place that decides
// which pages are focused and where their back links fall back to.
function focusedPage(pathname: string): FocusedPage | undefined {
  if (pathname.replace(/\/+$/, '') === RESUME_PAGE_HREF) return RESUME_PAGE;
  const section = subpageSection(pathname);
  return section && { section, parent: SUBPAGES[section].parent };
}

// Which section an address is in. The front page is the Portfolio, and a
// focused page (a case study, the résumé, a Playground project, or Music)
// counts as its section; an address without a page (Page not found) is in
// none. The nav marks it as the
// current page (except on a subpage, which has no nav), and the page loader
// uses its words.
function sectionOf(pathname: string): ShellProps['current'] {
  if (pathname === '/') return 'portfolio';
  const focused = focusedPage(pathname);
  if (focused) return focused.section;
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
// one (not the first load), focus moves to the new page's heading with
// Verity's focusPageStart(): the first h1 in Main, given tabindex="-1" and no
// focus ring, since it isn't a control (or Main itself, on a page with no h1).
// Keyboard users start at the new page, and screen readers announce it by
// name (“Profile, heading level 1”). Verity's NavOverlay, the phone menu,
// calls the same function as it closes after one of its links, so whichever
// runs last, focus ends on the heading, not back on the menu button. It
// doesn't scroll: ScrollRestoration decides that (the top for a new page,
// where you were for Back and Forward).
function useFocusPageStartOnPageChange() {
  const { key } = useLocation();
  const firstKey = useRef(key);
  useEffect(() => {
    if (key === firstKey.current) return;
    focusPageStart();
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

// A focused page's back link, “Back,” with its arrow. It's a real link to the
// page's parent (Portfolio, the front page, Playground, or Profile), and a
// click goes back in the history instead when the previous page is on this
// site, so visitors return exactly where they were, scrolled where they left
// it (ScrollRestoration). React Router numbers each entry in the tab's
// history (historyIndex), starting at 0 on the first page of a visit, so an
// index above 0 means the previous entry is a page on the site. A visitor who
// arrived from outside (a shared link, a search, a Home Screen icon) is on
// entry 0, so the click follows the href as a normal link. A reload keeps the
// entry's number, so Back still returns to the page before it. Cmd-, Ctrl-,
// Shift-, and Alt-clicks and the middle button are left to the browser, so
// they still open the parent page in a new tab or window, and a long press
// shows the browser's menu for it.
//
// (React Router's location key isn't the signal here: it's "default" on the
// first page only without ScrollRestoration, whose script gives every entry a
// key before the app starts.)
function useBackLink(parent: string): ShellProps['backLink'] {
  const navigate = useNavigate();
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
    if (modified || historyIndex() === 0) return;
    event.preventDefault();
    navigate(-1);
  };
  return { href: parent, label: 'Back', onClick };
}

// React Router's number for the current entry in the tab's history (idx),
// which it keeps in history.state: 0 for the first page of a visit, and one
// more for each page change in the app
function historyIndex() {
  const entry: unknown = window.history.state;
  return typeof entry === 'object' && entry !== null && 'idx' in entry && typeof entry.idx === 'number' ? entry.idx : 0;
}

// Focused pages (case studies, the résumé, Playground projects, and Music)
// are for one piece of work, so they use Shell's focused mode: no nav, a back
// link in the top-left corner (useBackLink), and the page's action, if it has
// one, in the top-right. Every other page has the nav. Its links change pages in the app
// (SiteLink). Moving to another section shows Verity's PageLoader, with the
// words in app/pageLoaderWords.ts: Shell decides when, from the section the
// page change is going to.
function SiteShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const focused = focusedPage(pathname);
  const pending = usePendingSection();
  const backLink = useBackLink(focused ? focused.parent : NAV_HREFS.portfolio);
  useFocusPageStartOnPageChange();
  return (
    <LinkProvider component={SiteLink}>
      <Shell
        mode={focused ? 'focused' : 'default'}
        backLink={focused ? backLink : undefined}
        action={focused?.action}
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
