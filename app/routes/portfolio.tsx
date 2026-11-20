import { Container, Grid, ProjectCard } from 'verity-design-system';
import { IntroCard } from '../IntroCard';
import { portfolioCaseStudies } from '../caseStudies';
import { pageMeta } from '../site';
import type { Route } from './+types/portfolio';
import utilities from '../utilities.module.css';

// The front page, so the tab says just “Erin Tozour”
export const meta = ({ location }: Route.MetaArgs) => pageMeta(undefined, location.pathname);

// The front page (/), as in Figma: one wide Grid, with the intro card first,
// then a ProjectCard for each case study, in the order set in
// app/caseStudies.ts. Items are at least xl wide, share each row (fill rows),
// and match heights within it, so the intro sits beside the first card on wide
// screens and above the cards on smaller ones. The Grid is a div, not a list:
// the intro isn't a case study, and in a list a screen reader would count it
// as one. The cards' level 2 headings let screen readers move between them.
//
// There's no visible page heading: the nav already shows Portfolio as the
// current page. The page still has its h1, “Portfolio,” for screen readers and
// search engines, visually hidden. It's taken out of the layout, so the
// Container still holds one visible block, the Grid, which starts where the
// first block of every other page does.
export default function Portfolio() {
  // Worked out while the page is pre-rendered, so a case study missing its
  // thumbnail (or a fact the build checks) stops the build, with the message
  // in the output, instead of showing a broken card
  const cards = portfolioCaseStudies();
  return (
    <Container>
      <h1 className={utilities.visuallyHidden}>Portfolio</h1>
      <Grid width="wide" itemWidth="xl" gap="md" fillRows>
        <IntroCard />
        {cards.map((card) => (
          <ProjectCard
            key={card.slug}
            href={card.href}
            heading={card.heading}
            headingLevel={2}
            thumbnail={card.thumbnail}
          />
        ))}
      </Grid>
    </Container>
  );
}
