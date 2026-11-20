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
const PORTFOLIO_ORDER = ['laguna-companion', 'navio-med-checklist', 'verity', 'vim-brand-system'];

// Each case study's thumbnail for its PortfolioCard. The name is fixed:
// case-studies/<slug>/images/case-study-thumbnail.avif.
const thumbnails = import.meta.glob<string>('../case-studies/*/images/case-study-thumbnail.avif', {
  eager: true,
  import: 'default',
});

/**
 * What one case study's PortfolioCard shows, from its frontmatter: its
 * heading, the company the work was for (the fact titled “Company”), and the
 * fact titled “Year”. A missing case study, thumbnail, Company fact, or Year
 * fact stops the build, with a message saying which and where. `listedIn`
 * names the list that asked, for the message.
 */
function caseStudyCard(slug: string, listedIn: string) {
  const caseStudy = caseStudies[slug];
  if (!caseStudy) {
    throw new Error(`${listedIn} lists “${slug}”, but there's no case-studies/${slug}/index.mdx.`);
  }
  const { heading, facts } = caseStudy.frontmatter;
  const fact = (title: string) => {
    const value = facts?.find((f) => f.title === title)?.value;
    if (!value) {
      throw new Error(
        `case-studies/${slug}/index.mdx has no fact titled “${title}” in its frontmatter, and its card on ${listedIn} needs one.`,
      );
    }
    return String(value);
  };
  const company = fact('Company');
  const year = fact('Year');
  const thumbnail = thumbnails[`../case-studies/${slug}/images/case-study-thumbnail.avif`];
  if (!thumbnail) {
    throw new Error(`${listedIn} lists “${slug}”, but there's no case-studies/${slug}/images/case-study-thumbnail.avif.`);
  }
  return { slug, href: `/portfolio/${slug}`, heading, company, year, thumbnail };
}

/** The cards on the Portfolio page, in PORTFOLIO_ORDER */
export function portfolioCaseStudies() {
  return PORTFOLIO_ORDER.map((slug) => caseStudyCard(slug, 'PORTFOLIO_ORDER (the Portfolio page)'));
}

