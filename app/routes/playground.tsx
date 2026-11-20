import { Container } from 'verity-design-system';
import { PlaygroundGrid } from '../PlaygroundGrid';
import { PLAYGROUND_PROJECTS } from '../playground/projects';
import { pageMeta } from '../site';
import type { Route } from './+types/playground';
import utilities from '../utilities.module.css';

export const meta = ({ location }: Route.MetaArgs) => pageMeta('Playground', location.pathname);

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

// Playground: each Playground project as a square thumbnail with its title
// under it, linking to its page (PlaygroundGrid.tsx), in a Container. The
// page's heading, “Playground” (its h1), is hidden on screen but still read
// by screen readers and search engines, as on the Portfolio page: the nav
// already shows where you are. The projects and their order are in
// app/playground/projects.ts.
export default function Playground() {
  return (
    <Container>
      <h1 className={utilities.visuallyHidden}>Playground</h1>
      <PlaygroundGrid items={playgroundCards()} />
    </Container>
  );
}
