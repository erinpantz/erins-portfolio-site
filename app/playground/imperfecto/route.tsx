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

// Imperfecto, a Playground project: Erin's typeface, to try out. A Hero with
// its name (the page's h1) and what it is, then two wide Sections: “Try it,”
// a type tester (TypeTester.tsx), and “Character set,” every character in the
// font, in groups (CharacterSet.tsx). Both are this project's own components,
// built from Verity's tokens and components. Each sits in a wide
// VerticalStack, which is what lets a Section's block span the full width.
export default function Imperfecto({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Container>
        <Hero
          heading="Imperfecto"
          intro="An imperfect typeface to keep me noodling in the weeds of design craft. I drew every letter by hand, then spaced and kerned it in Glyphs. I’m not a type designer, and the name says so. Imperfecto is a forever work in progress."
        />
      </Container>
      <Section heading="Try it" width="wide">
        <VerticalStack width="wide">
          <TypeTester />
        </VerticalStack>
      </Section>
      <Section heading="Character set" width="wide">
        <CharacterSet groups={loaderData.characterGroups} />
      </Section>
    </>
  );
}
