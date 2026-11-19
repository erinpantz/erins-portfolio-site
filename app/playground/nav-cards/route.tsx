import { Container, Hero, NavCard, NavCardGroup } from 'verity-design-system';
import { NAV_HREFS, pageTitle } from '../../site';

export const meta = () => [{ title: pageTitle('Nav cards') }];

// Nav cards, a Playground project: the two tilted cards from Erin's old home
// page, live. A Hero with its name (the page's h1), why she made them, and
// Verity's NavCardGroup beside it: a card for Portfolio and one for Profile,
// going to the site's real addresses. The group sets each card's tilt and
// shuffles a hovered or focused card to the front.
export default function NavCards() {
  return (
    <Container>
      <Hero
        heading="Nav cards"
        intro="Two tilted cards that led to my Portfolio and Profile from my old home page. Hover one and it slides out, comes to the front, and slides back, so the cards never look like they pass through each other."
        media={
          <NavCardGroup>
            <NavCard page="portfolio" label="Portfolio" href={NAV_HREFS.portfolio} />
            <NavCard page="profile" label="Profile" href={NAV_HREFS.profile} />
          </NavCardGroup>
        }
      />
    </Container>
  );
}
