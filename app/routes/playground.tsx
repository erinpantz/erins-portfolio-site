import { Grid, ProjectCard, Section } from 'verity-design-system';
import { PLAYGROUND_PROJECTS } from '../playground/projects';
import { pageTitle } from '../site';

export const meta = () => [{ title: pageTitle('Playground') }];

interface PlaygroundCard {
  card: { heading: string; thumbnail: string };
}

// Every project's card.ts, by its folder
const cardFiles = import.meta.glob<PlaygroundCard>('../playground/*/card.ts', { eager: true });

// Each project's card, in the order of PLAYGROUND_PROJECTS. A listed project
// without a card.ts stops the build, with its name in the message, instead of
// leaving a gap on the page.
function playgroundCards() {
  return PLAYGROUND_PROJECTS.map((slug) => {
    const file = cardFiles[`../playground/${slug}/card.ts`];
    if (!file) throw new Error(`Playground project “${slug}” has no app/playground/${slug}/card.ts`);
    return { slug, href: `/playground/${slug}`, ...file.card };
  });
}

// Playground: the page's heading (its h1), then a card for each Playground
// project, laid out like the Portfolio's cards: a wide Grid with items at
// least xl wide that share each row (fill rows). It's a list of projects
// (ul), and each card's title is a level 2 heading. The projects and their
// order are in app/playground/projects.ts.
export default function Playground() {
  const cards = playgroundCards();
  return (
    <Section headingLevel={1} heading="Playground" width="wide">
      <Grid as="ul" width="wide" itemWidth="xl" gap="md" fillRows>
        {cards.map((card) => (
          <li key={card.slug}>
            <ProjectCard href={card.href} heading={card.heading} headingLevel={2} thumbnail={card.thumbnail} />
          </li>
        ))}
      </Grid>
    </Section>
  );
}
