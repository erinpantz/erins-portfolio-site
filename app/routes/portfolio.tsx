import { Grid, ProjectCard, Section, TextBlock } from 'verity-design-system';
import { portfolioCaseStudies } from '../caseStudies';
import { pageTitle } from '../site';

// The front page, so the tab says just “Erin Tozour”
export const meta = () => [{ title: pageTitle() }];

// The front page (/), as in Figma: a wide Section titled “Portfolio” (the
// page's h1), holding one wide Grid. Its first item is a short intro, then a
// ProjectCard for each case study, in the order set in app/caseStudies.ts.
// Items are at least md wide, share each row (fill rows), and match heights
// within it, so the intro sits beside the first cards on wide screens and
// above them on a phone. The Grid is a div, not a list: the intro isn't a case
// study, and in a list a screen reader would count it as one. The cards'
// level 2 headings still let screen readers move between them.
//
// Figma sets the intro's text in body/lg; Verity's TextBlock only has
// body/default for now, so it uses that until TextBlock gets a size option.
export default function Portfolio() {
  // Worked out while the page is pre-rendered, so a case study missing its
  // thumbnail (or a fact the build checks) stops the build, with the message
  // in the output, instead of showing a broken card
  const cards = portfolioCaseStudies();
  return (
    <Section width="wide" heading="Portfolio" headingLevel={1}>
      <Grid width="wide" itemWidth="md" gap="md" fillRows>
        <TextBlock heading="Why hello there!" headingLevel={2}>
          I’m a product and visual designer with 20+ years of experience. For the past 11 years, I’ve led design at
          four healthcare startups, most recently bringing AI into the tools care teams use every day. Now I’m designing
          in code too, building my own design system with AI as a collaborator.
        </TextBlock>
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
    </Section>
  );
}
