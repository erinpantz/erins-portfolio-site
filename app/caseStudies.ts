import type { MDXProps } from 'mdx/types';
import type { ComponentType } from 'react';
import type { CaseStudyHeaderProps } from 'verity-design-system';

// Every case study is case-studies/<slug>/index.mdx. Its folder name is its
// address: case-studies/verity/index.mdx is /portfolio/verity.

/**
 * The frontmatter at the top of each case study: the page's title for the
 * browser tab (the project's name), and what CaseStudyHeader shows
 */
export type CaseStudyFrontmatter = CaseStudyHeaderProps & {
  /** The project's name, for the browser tab: “Laguna Companion · Erin Tozour” */
  title: string;
};

interface CaseStudyFile {
  default: ComponentType<MDXProps>;
  frontmatter: CaseStudyFrontmatter;
}

const files = import.meta.glob<CaseStudyFile>('../case-studies/*/index.mdx', { eager: true });

export const caseStudies = Object.fromEntries(
  Object.entries(files).map(([path, file]) => [path.split('/').at(-2)!, file]),
);

/**
 * The case studies on the Portfolio page, in the order they show there. Only
 * these are listed: add a slug here when a case study is ready, and move it
 * to change the order.
 */
const PORTFOLIO_ORDER = ['laguna-companion', 'navio-med-checklist'];

// Each case study's thumbnail for its PortfolioCard. The name is fixed:
// case-studies/<slug>/images/case-study-thumbnail.avif.
const thumbnails = import.meta.glob<string>('../case-studies/*/images/case-study-thumbnail.avif', {
  eager: true,
  import: 'default',
});

/**
 * What each PortfolioCard on the Portfolio page shows, from its case study's
 * frontmatter. A missing case study, thumbnail, or Year fact stops the build,
 * with a message saying which and where.
 */
export function portfolioCaseStudies() {
  return PORTFOLIO_ORDER.map((slug) => {
    const caseStudy = caseStudies[slug];
    if (!caseStudy) {
      throw new Error(`Portfolio lists “${slug}”, but there's no case-studies/${slug}/index.mdx.`);
    }
    const { title, heading, facts } = caseStudy.frontmatter;
    const year = facts?.find((fact) => fact.title === 'Year')?.value;
    if (!year) {
      throw new Error(
        `case-studies/${slug}/index.mdx has no fact titled “Year” in its frontmatter, and the Portfolio page needs one for its card.`,
      );
    }
    const thumbnail = thumbnails[`../case-studies/${slug}/images/case-study-thumbnail.avif`];
    if (!thumbnail) {
      throw new Error(`Portfolio lists “${slug}”, but there's no case-studies/${slug}/images/case-study-thumbnail.avif.`);
    }
    return { slug, href: `/portfolio/${slug}`, heading, project: title, year: String(year), thumbnail };
  });
}
