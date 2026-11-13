import { Container, Grid, Hero, ProjectCard, Reel, Section } from 'verity-design-system';
import reelMemberProfile from '../../assets/images/home-reel/reel-01-member-profile.avif';
import reelCareCalendar from '../../assets/images/home-reel/reel-02-care-calendar.avif';
import reelMammogramCampaign from '../../assets/images/home-reel/reel-03-mammogram-campaign.avif';
import reelProductivityDashboard from '../../assets/images/home-reel/reel-04-productivity-dashboard.avif';
import reelCallStoryboard from '../../assets/images/home-reel/reel-05-call-storyboard.avif';
import { homeFeaturedCaseStudies } from '../caseStudies';
import { pageTitle } from '../site';

export const meta = () => [{ title: pageTitle() }];

// Home: a wide Hero on the default background, whose headline is the page's
// h1, with a Reel beside it: five screens from Erin's work turning on a disc,
// showing the “creative toolkit” the headline names. With no band, there's no
// side padding, so the Reel has more room. Then a wide “Featured work”
// Section with the featured case studies (HOME_FEATURED in
// app/caseStudies.ts) as ProjectCards: each one's title, an arrow, and its
// thumbnail. The Section is wide so its heading lines up with the cards' left
// edge; the cards' headings are level 3, under it.
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
          intro="20+ years in product, brand, illustration, motion, and print"
          media={
            <Reel
              images={[
                { src: reelMemberProfile },
                { src: reelCareCalendar },
                { src: reelMammogramCampaign },
                { src: reelProductivityDashboard },
                { src: reelCallStoryboard },
              ]}
            />
          }
        />
      </Container>
      {featured.length > 0 && (
        <Section width="wide" heading="Featured work">
          {/* A list, so screen readers hear how many cards there are. Fill
              rows: cards share each row, and one alone on the last row takes
              the full width. Each card picks a row or a stack by its own
              width. */}
          <Grid as="ul" itemWidth="xl" gap="lg" width="wide" fillRows>
            {featured.map((card) => (
              <li key={card.slug}>
                <ProjectCard href={card.href} heading={card.heading} headingLevel={3} thumbnail={card.thumbnail} />
              </li>
            ))}
          </Grid>
        </Section>
      )}
    </>
  );
}
