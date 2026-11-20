import type { ReactNode } from 'react';
import { ActionCard, Button, Footer, IconButton, Link, type ShellProps } from 'verity-design-system';

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
