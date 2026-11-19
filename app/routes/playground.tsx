import { Section } from 'verity-design-system';
import { PlaygroundGrid } from '../PlaygroundGrid';
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

// Playground: the page's heading (its h1), then each Playground project as a
// square thumbnail with its title under it, linking to its page
// (PlaygroundGrid.tsx). The projects and their order are in
// app/playground/projects.ts.
export default function Playground() {
  return (
    <Section headingLevel={1} heading="Playground" width="wide">
      <PlaygroundGrid items={playgroundCards()} />
    </Section>
  );
}
