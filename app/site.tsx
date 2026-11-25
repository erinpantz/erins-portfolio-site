import type { ReactNode } from 'react';
import type { MetaDescriptor } from 'react-router';
import { ActionCard, Button, Footer, IconButton, Link, type ShellProps } from 'verity-design-system';

// Site-wide content: where the nav links go and what the footer says.
// Anything marked PLACEHOLDER isn't real yet.

/**
 * The site's own address, for anything that needs a full one: link previews
 * (og:url, og:image) and the canonical link. Every full address is built from
 * it.
 */
export const SITE_URL = 'https://erintozour.com';

/**
 * Google Analytics: the GA4 property the old Webflow site reports to, so the
 * history carries over. The tag is in app/root.tsx.
 */
export const GA_MEASUREMENT_ID = 'G-X9Q27K2L9P';

/**
 * The live site's addresses. Google Analytics reports only from them, and
 * only they show the blue favicon (anywhere else gets the red one; see
 * app/root.tsx).
 */
export const LIVE_HOSTNAMES = ['erintozour.com', 'www.erintozour.com'];

/**
 * Where each nav link goes: the logo (home) and the three pages. The
 * Portfolio is the front page, so the logo and Portfolio both go to /.
 * Case studies stay at /portfolio/<slug>.
 */
export const NAV_HREFS = {
  home: '/',
  portfolio: '/',
  playground: '/playground',
  profile: '/profile',
} satisfies ShellProps['hrefs'];

/** The Music page, below Profile: Erin's favorite albums */
export const MUSIC_HREF = '/profile/music';

/** The résumé page (app/resume/), which the Portfolio intro's button opens */
export const RESUME_PAGE_HREF = '/resume';

/**
 * The résumé PDF (public/erin-tozour-resume.pdf), which the résumé page's
 * Download button shares on a touch screen (or saves, elsewhere and where
 * sharing isn't possible). It isn't in the nav.
 */
export const RESUME_HREF = '/erin-tozour-resume.pdf';

/**
 * Verity's Storybook, where the footer's Verity card and the Profile intro
 * link, both in a new tab.
 */
export const VERITY_STORYBOOK_URL = 'https://verity.erintozour.com';

/** A link to Verity's Storybook, in a new tab. The Profile intro uses it. */
export function VerityLink({ children }: { children: ReactNode }) {
  return (
    <Link href={VERITY_STORYBOOK_URL} opensInNewTab>
      {children}
    </Link>
  );
}

/** The browser tab text for a page: “Laguna Companion · Erin Tozour” */
export function pageTitle(name?: string) {
  return name ? `${name} · Erin Tozour` : 'Erin Tozour';
}

/** The site's description, for search results and link previews */
const SITE_DESCRIPTION =
  'Erin Tozour is a product and visual designer with 20+ years of experience, leading design at healthcare startups and bringing AI into the tools care teams use every day.';

/**
 * Every page's <head> tags, for its route's meta: the title (from pageTitle),
 * the description, and the link previews that LinkedIn, Slack, and messages
 * show (Open Graph, plus the Twitter card, which falls back to the Open Graph
 * tags). React Router uses only the deepest route's meta, so each route calls
 * this, and the tags live only here.
 *
 * `pathname` is the page's address (the meta function's location.pathname).
 * Its full address, with no query string and no trailing slash (except the
 * front page, /), is og:url and the canonical link. Page not found passes no
 * pathname, so it has neither.
 */
export function pageMeta(name?: string, pathname?: string): MetaDescriptor[] {
  const title = pageTitle(name);
  const url = pathname === undefined ? undefined : SITE_URL + (pathname.replace(/\/+$/, '') || '/');
  return [
    { title },
    { name: 'description', content: SITE_DESCRIPTION },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Erin Tozour' },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: SITE_DESCRIPTION },
    ...(url ? [{ property: 'og:url', content: url }, { tagName: 'link', rel: 'canonical', href: url }] : []),
    { property: 'og:image', content: `${SITE_URL}/og-image.png` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Erin Tozour, product and visual designer' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
}

// Where “Book a call” goes
const CALENDLY_URL = 'https://calendly.com/meet-erin-tozour';

const LINKEDIN_URL = 'https://www.linkedin.com/in/erintozour/';

// The footer on every page: three ActionCards, in Verity's Footer grid, then
// the copyright line. Each card's heading is level 3, as in the old footer.
// - Let’s chat: Book a call (Calendly) and LinkedIn, both in a new tab.
// - Verity: Check it out, to Verity's Storybook in a new tab.
// - Music: Take a listen, to the Music page, through the router link
//   (LinkProvider in root.tsx), so the page changes without reloading.
export const siteFooter = (
  <Footer
    cards={
      <>
        <ActionCard
          heading="Let’s chat"
          headingLevel={3}
          icon="hand"
          iconColor="accent-one"
          body="I’m looking for my next design role and would love to chat if you think I could bring value to your team."
          actions={
            <>
              <Button href={CALENDLY_URL} opensInNewTab>
                Book a call
              </Button>
              <IconButton icon="linkedin" label="LinkedIn" href={LINKEDIN_URL} opensInNewTab />
            </>
          }
        />
        <ActionCard
          heading="Verity"
          headingLevel={3}
          icon="verity"
          iconColor="accent-two"
          body="This site is built with Verity, my design system. Every color, size, and space comes from a token."
          actions={
            <Button href={VERITY_STORYBOOK_URL} opensInNewTab>
              Check it out
            </Button>
          }
        />
        <ActionCard
          heading="Music"
          headingLevel={3}
          icon="music"
          iconColor="accent-three"
          body="Music keeps me going. I love to keep up with new artists and share my favorites with others."
          actions={<Button href={MUSIC_HREF}>Take a listen</Button>}
        />
      </>
    }
    copyrightName="Erin Tozour"
  />
);
