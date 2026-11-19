import { Grid, ProjectCard, Section } from 'verity-design-system';
// PLACEHOLDER: the word “Imperfecto” drawn from the font's outlines, white on
// the Blue theme's brand color (so it stays blue in the Red theme too). Erin
// will design the real thumbnail in Figma; it replaces this file.
import imperfectoThumbnail from '../playground/imperfecto/thumbnail-placeholder.svg';
import { pageTitle } from '../site';

export const meta = () => [{ title: pageTitle('Playground') }];

// Playground: the page's heading (its h1), then a card for each Playground
// project, laid out like the Portfolio's cards: a wide Grid with items at
// least xl wide that share each row (fill rows). While there's only one
// project, its card takes the full width, in ProjectCard's side-by-side
// layout. It's a list of projects (ul), and each card's title is a level 2
// heading.
//
// To add a project, add its card here (its address is
// /playground/<slug>; see app/playground/projects.ts).
export default function Playground() {
  return (
    <Section headingLevel={1} heading="Playground" width="wide">
      <Grid as="ul" width="wide" itemWidth="xl" gap="md" fillRows>
        <li>
          <ProjectCard
            href="/playground/imperfecto"
            heading="Imperfecto: an imperfect typeface"
            headingLevel={2}
            thumbnail={imperfectoThumbnail}
          />
        </li>
      </Grid>
    </Section>
  );
}
