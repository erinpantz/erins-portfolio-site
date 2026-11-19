import { Container, Hero, Section, VerticalStack } from 'verity-design-system';
import { pageTitle } from '../../site';
import type { Route } from './+types/route';
import { CharacterSet } from './CharacterSet';
import { imperfectoCharacterGroups } from './characters.server';
import { TypeTester } from './TypeTester';

export const meta = () => [{ title: pageTitle('Imperfecto') }];

// Read the font's characters while the site builds. The page is pre-rendered,
// so this runs once, at build time, and its result is saved with the page.
export const loader = () => ({ characterGroups: imperfectoCharacterGroups() });

// Imperfecto, a Playground project: Erin's typeface, to try out. A wide Hero
// with its name (the page's h1) and what it is, so its text starts at the same
// left edge as the wide blocks below it (it stays the column's width), then a
// type tester with its own
// “Try it” heading inside its box (TypeTester.tsx), and a wide Section,
// “Character set,” with every character in the font, in groups
// (CharacterSet.tsx). Both are this project's own components, built from
// Verity's tokens and components. Each sits in a wide VerticalStack, which is
// what lets a block in a Container or Section span the full width.
export default function Imperfecto({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Container>
        <Hero
          width="wide"
          heading="Imperfecto"
          intro="An imperfect typeface to keep me noodling in the weeds of design craft. I created every letter from scratch, then spaced and kerned it in Glyphs. I’m not a type designer, and the name says so. Imperfecto is a forever work in progress."
        />
      </Container>
      {/* The tester has its heading, “Try it,” inside its box, so it's in a
          Container rather than a Section (which puts its heading above) */}
      <Container>
        <VerticalStack width="wide">
          <TypeTester />
        </VerticalStack>
      </Container>
      <Section heading="Character set" width="wide">
        <CharacterSet groups={loaderData.characterGroups} />
      </Section>
    </>
  );
}
