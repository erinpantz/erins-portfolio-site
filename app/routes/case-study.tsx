import { CaseStudyHeader, Container, Prose } from 'verity-design-system';
import { caseStudies } from '../caseStudies';
import { NotFound } from '../NotFound';
import { pageTitle } from '../site';
import type { Route } from './+types/case-study';

export const meta = ({ params }: Route.MetaArgs) => [
  { title: pageTitle(caseStudies[params.slug]?.frontmatter.title ?? 'Page not found') },
];

// Components the MDX can use without importing them. Prose comes from
// plugins/remarkProseRuns.ts, which wraps each run of Markdown inside a
// Section or TextBlock in one.
const mdxComponents = { Prose };

// One template for every case study: the header from the frontmatter, then
// the MDX body straight into Main. The body is the case study's Containers
// (the hero first) and Sections, with Divider Containers where the story
// wants them, and Main's gap spaces them all. The case study comes from the
// address: /portfolio/verity is case-studies/verity/index.mdx.
export default function CaseStudy({ params }: Route.ComponentProps) {
  const caseStudy = caseStudies[params.slug];
  if (!caseStudy) return <NotFound />;
  const { default: Body, frontmatter } = caseStudy;
  const { heading, facts } = frontmatter;
  return (
    <>
      <Container>
        <CaseStudyHeader heading={heading} facts={facts} />
      </Container>
      <Body components={mdxComponents} />
    </>
  );
}
