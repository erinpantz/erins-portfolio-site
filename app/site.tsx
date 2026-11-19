import type { ReactNode } from 'react';
import { Footer, Link, LinkGroup, type ShellProps } from 'verity-design-system';

// Site-wide content: where the nav links go and what the footer says.
// Anything marked PLACEHOLDER isn't real yet.

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

/**
 * Where the résumé goes: the footer's Résumé link and the Portfolio intro's
 * button. It isn't in the nav. It points to a PDF that doesn't exist yet.
 */
export const RESUME_HREF = '/erin-tozour-resume.pdf';

/**
 * Verity's Storybook, where the footer's Verity link and the Profile intro's
 * link go. PLACEHOLDER: Storybook isn't public yet, so it's empty, and both
 * links show as “Coming soon” (VerityLink). Put the address here when it goes
 * live, and both become links that open in a new tab.
 */
export const VERITY_STORYBOOK_URL: string | undefined = undefined;

/**
 * A link to Verity's Storybook: while VERITY_STORYBOOK_URL is empty, a
 * disabled link with the tooltip “Coming soon” (keyboard users can still
 * reach it and hear why); once it's set, a link that opens in a new tab. The
 * footer and the Profile intro both use it, so they change together.
 */
export function VerityLink({ children }: { children: ReactNode }) {
  return VERITY_STORYBOOK_URL ? (
    <Link href={VERITY_STORYBOOK_URL} opensInNewTab>
      {children}
    </Link>
  ) : (
    <Link disabled tooltip="Coming soon">
      {children}
    </Link>
  );
}

/** The browser tab text for a page: “Laguna Companion · Erin Tozour” */
export function pageTitle(name?: string) {
  return name ? `${name} · Erin Tozour` : 'Erin Tozour';
}

// Where “Book a meeting” goes
const CALENDLY_URL = 'https://calendly.com/meet-erin-tozour';

// Link groups, starting from the example in Verity's Footer story
const linkGroups = (
  <>
    <LinkGroup label="Pages">
      <Link href={NAV_HREFS.portfolio}>Portfolio</Link>
      <Link href={NAV_HREFS.playground}>Playground</Link>
      <Link href={NAV_HREFS.profile}>Profile</Link>
      {/* The PDF, in the same tab */}
      <Link href={RESUME_HREF}>Résumé</Link>
    </LinkGroup>
    <LinkGroup label="Fun stuff">
      <Link href={MUSIC_HREF}>Music</Link>
      {/* Verity's Storybook: “Coming soon” until VERITY_STORYBOOK_URL is set */}
      <VerityLink>Verity Design System</VerityLink>
    </LinkGroup>
    <LinkGroup label="Connect">
      {/* PLACEHOLDER: replace with Erin's LinkedIn URL */}
      <Link href="#placeholder-linkedin">LinkedIn</Link>
    </LinkGroup>
  </>
);

export const siteFooter = (
  <Footer
    callToAction={{
      heading: 'Let’s chat',
      text: 'I’m seeking a full time design role and would love to chat if you think I could bring value to your team.',
      buttonLabel: 'Book a meeting',
      href: CALENDLY_URL,
      opensInNewTab: true,
    }}
    linkGroups={linkGroups}
    copyrightName="Erin Tozour"
  />
);
