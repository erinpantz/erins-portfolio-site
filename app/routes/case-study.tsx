import { CaseStudyHeader, Container, Prose, VerticalStack } from 'verity-design-system';
import { caseStudies } from '../caseStudies';
import { NotFound } from '../NotFound';
import { pageTitle } from '../site';
import type { Route } from './+types/case-study';

export const meta = ({ params }: Route.MetaArgs) => [
  { title: pageTitle(caseStudies[params.slug]?.frontmatter.heading ?? 'Page not found') },
];

// Components the MDX can use without importing them. Prose comes from
// plugins/remarkProseRuns.ts, which wraps each run of Markdown in one.
const mdxComponents = { Prose };

// One template for every case study: the header from the frontmatter, then
// the body, with Main's gap between them. The case study comes from the
// address: /portfolio/verity is case-studies/verity/index.mdx.
export default function CaseStudy({ params }: Route.ComponentProps) {
  const caseStudy = caseStudies[params.slug];
  if (!caseStudy) return <NotFound />;
  const { default: Body, frontmatter } = caseStudy;
  return (
    <>
      <Container>
        <CaseStudyHeader {...frontmatter} />
      </Container>
      <Container>
        <VerticalStack gap="lg">
          <Body components={mdxComponents} />
        </VerticalStack>
      </Container>
    </>
  );
}
