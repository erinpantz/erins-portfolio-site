import { CaseStudyHeader, Container, Prose, VerticalStack } from 'verity-design-system';
import { caseStudies } from '../caseStudies';
import { pageTitle } from '../site';
import type { Route } from './+types/case-study';

export function loader({ params }: Route.LoaderArgs) {
  if (!caseStudies[params.slug]) throw new Response('Not found', { status: 404 });
  return { slug: params.slug };
}

export const meta = ({ loaderData }: Route.MetaArgs) => [
  { title: pageTitle(loaderData && caseStudies[loaderData.slug].frontmatter.heading) },
];

// Components the MDX can use without importing them. Prose comes from
// plugins/remarkProseRuns.ts, which wraps each run of Markdown in one.
const mdxComponents = { Prose };

// One template for every case study: the header from the frontmatter, then
// the body, with Main's gap between them
export default function CaseStudy({ loaderData }: Route.ComponentProps) {
  const { default: Body, frontmatter } = caseStudies[loaderData.slug];
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
