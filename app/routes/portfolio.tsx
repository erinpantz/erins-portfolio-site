import { Container, Heading, PortfolioCard, VerticalStack } from 'verity-design-system';
import { portfolioCaseStudies } from '../caseStudies';
import { pageTitle } from '../site';

export const meta = () => [{ title: pageTitle('Portfolio') }];

// The page's title, then a card for each case study, in the order set in
// app/caseStudies.ts. The stack is wide and sits in a Container, which caps
// it at the wide width. When brand galleries come, the cards move under two
// Sections and their headings to level 3.
export default function Portfolio() {
  // Worked out while the page is pre-rendered, so a case study missing its
  // Year fact or thumbnail stops the build, with the message in the output,
  // instead of showing a broken card
  const cards = portfolioCaseStudies();
  return (
    <>
      <Container>
        <Heading level={1}>Portfolio</Heading>
      </Container>
      <Container>
        <VerticalStack width="wide" gap="md">
          {cards.map((card) => (
            <PortfolioCard
              key={card.slug}
              type="case-study"
              headingLevel={2}
              href={card.href}
              heading={card.heading}
              project={card.project}
              year={card.year}
              thumbnail={card.thumbnail}
            />
          ))}
        </VerticalStack>
      </Container>
    </>
  );
}
