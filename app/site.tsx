import { Footer, Link, LinkGroup, type ShellProps } from 'verity-design-system';

// Site-wide content: where the nav links go and what the footer says.
// Anything marked PLACEHOLDER isn't real yet.

/** Where each nav link goes. Resume points to a PDF that doesn't exist yet. */
export const NAV_HREFS: ShellProps['hrefs'] = {
  home: '/',
  portfolio: '/portfolio',
  playground: '/playground',
  profile: '/profile',
  resume: '/erin-tozour-resume.pdf',
};

/** The browser tab text for a page: “Laguna Companion · Erin Tozour” */
export function pageTitle(name?: string) {
  return name ? `${name} · Erin Tozour` : 'Erin Tozour';
}

// PLACEHOLDER: replace with Erin's Calendly URL
const CALENDLY_URL = '#placeholder-calendly-url';

// Link groups, starting from the example in Verity's Footer story
const linkGroups = (
  <>
    <LinkGroup label="Pages">
      <Link href="/portfolio">Portfolio</Link>
      <Link href="/playground">Playground</Link>
      <Link href="/profile">Profile</Link>
    </LinkGroup>
    <LinkGroup label="Fun stuff">
      {/* PLACEHOLDER: the albums page doesn't exist yet */}
      <Link href="#placeholder-albums">My 20 favorite albums</Link>
      {/* PLACEHOLDER: from the story, where it's coming soon. Decide where it goes. */}
      <Link disabled tooltip="Coming soon">
        Verity Design System
      </Link>
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
      // PLACEHOLDER: heading and text
      heading: 'Placeholder: call to action heading',
      text: 'Placeholder: one sentence that invites people to schedule a meeting.',
      buttonLabel: 'Schedule a meeting',
      href: CALENDLY_URL,
    }}
    linkGroups={linkGroups}
    copyrightName="Erin Tozour"
  />
);
