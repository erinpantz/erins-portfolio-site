import { Container, Grid, Heading, ProjectCard, VerticalStack } from 'verity-design-system';
import { portfolioCaseStudies } from '../caseStudies';
import { pageTitle } from '../site';

// The front page, so the tab says just “Erin Tozour”
export const meta = () => [{ title: pageTitle() }];

// The front page (/): the page's title, then a ProjectCard for each case
// study, in the order set in app/caseStudies.ts. One wide stack holds both, so
// the title lines up with the cards' left edge, with spacing/xl between them;
// the Container caps it at the wide width. The cards are a list, sharing each
// row, and one alone on the last row takes the full width. When brand
// galleries come, the cards move under two Sections and their headings to
// level 3.
export default function Portfolio() {
  // Worked out while the page is pre-rendered, so a case study missing its
  // thumbnail (or a fact the build checks) stops the build, with the message
  // in the output, instead of showing a broken card
  const cards = portfolioCaseStudies();
  return (
    <Container>
      <VerticalStack width="wide" gap="xl">
        <Heading level={1}>Portfolio</Heading>
        <Grid as="ul" itemWidth="xl" gap="lg" width="wide" fillRows>
          {cards.map((card) => (
            <li key={card.slug}>
              <ProjectCard href={card.href} heading={card.heading} headingLevel={2} thumbnail={card.thumbnail} />
            </li>
          ))}
        </Grid>
      </VerticalStack>
    </Container>
  );
}
