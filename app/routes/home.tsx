import { Container, Grid, Hero, NavCard, NavCardGroup, PortfolioCard } from 'verity-design-system';
import { homeFeaturedCaseStudies } from '../caseStudies';
import { NAV_HREFS, pageTitle } from '../site';

export const meta = () => [{ title: pageTitle() }];

// Home: a wide Hero, whose headline is the page's h1, with a pair of NavCards
// beside it, then the featured case studies (HOME_FEATURED in
// app/caseStudies.ts) as small PortfolioCards. There's no heading above the
// cards: the Hero's Portfolio card and the nav lead to the full list.
export default function Home() {
  // Worked out while the page is pre-rendered, so a bad featured list stops
  // the build, with the message in the output
  const featured = homeFeaturedCaseStudies();
  return (
    <>
      <Container>
        <Hero
          width="wide"
          heading="Product designer with a creative toolkit."
          intro="20+ years of experience spanning product, brand, illustration, motion, and print design."
          media={
            <NavCardGroup>
              <NavCard page="portfolio" label="Portfolio" href={NAV_HREFS.portfolio} />
              <NavCard page="profile" label="Profile" href={NAV_HREFS.profile} />
            </NavCardGroup>
          }
        />
      </Container>
      {featured.length > 0 && (
        // A list, so screen readers hear how many cards there are. Fill rows:
        // three across, then two plus one, then one per row.
        <Grid as="ul" itemWidth="md" gap="md" width="wide" fillRows>
          {featured.map((card) => (
            <li key={card.slug}>
              <PortfolioCard
                type="case-study"
                size="sm"
                headingLevel={2}
                href={card.href}
                heading={card.heading}
                project={card.project}
                year={card.year}
                thumbnail={card.thumbnail}
              />
            </li>
          ))}
        </Grid>
      )}
    </>
  );
}
