import { Footer, Link, LinkGroup, type ShellProps } from 'verity-design-system';

// Site-wide content: where the nav links go and what the footer says.
// Anything marked PLACEHOLDER isn't real yet.

/** Where each nav link goes: the logo (home) and the three pages */
export const NAV_HREFS = {
  home: '/',
  portfolio: '/portfolio',
  playground: '/playground',
  profile: '/profile',
} satisfies ShellProps['hrefs'];

/**
 * Where the footer's Resume link goes. It isn't in the nav. It points to a PDF
 * that doesn't exist yet.
 */
const RESUME_HREF = '/erin-tozour-resume.pdf';

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
      <Link href="/portfolio">Portfolio</Link>
      <Link href="/playground">Playground</Link>
      <Link href="/profile">Profile</Link>
      {/* The PDF, in the same tab */}
      <Link href={RESUME_HREF}>Resume</Link>
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
