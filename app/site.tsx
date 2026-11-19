import type { ReactNode } from 'react';
import { Footer, Link, VerityMark, type ShellProps } from 'verity-design-system';

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
 * Where the résumé goes: the Portfolio intro's button. It isn't in the nav. It points to a PDF that doesn't exist yet.
 */
export const RESUME_HREF = '/erin-tozour-resume.pdf';

/**
 * Verity's Storybook, where the footer's aside and the Profile intro link. PLACEHOLDER: Storybook isn't public yet, so it's empty, and both
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

export const siteFooter = (
  <Footer
    callToAction={{
      heading: 'Let’s chat',
      text: 'I’m seeking a full time design role and would love to chat if you think I could bring value to your team.',
      buttonLabel: 'Book a meeting',
      href: CALENDLY_URL,
      opensInNewTab: true,
      // A second way to get in touch, as an icon button after Book a meeting
      secondaryAction: {
        icon: 'linkedin',
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/erintozour/',
        opensInNewTab: true,
      },
    }}
    // On the right: a line about how the site is built. “Verity” is
    // VerityLink, so it's “Coming soon” until Storybook is public.
    aside={
      <>
        <VerityMark />
        <p>
          This site is built with <VerityLink>Verity</VerityLink>, my design system. Every color, size, and space comes
          from a token.
        </p>
      </>
    }
    copyrightName="Erin Tozour"
  />
);
