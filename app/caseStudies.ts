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
const PORTFOLIO_ORDER = ['laguna-companion', 'navio-med-checklist', 'vim-brand-system'];

/**
 * The case studies Home features, in order, up to three. Each must also be in
 * PORTFOLIO_ORDER, so Home never shows something the Portfolio page doesn't.
 */
const HOME_FEATURED = ['laguna-companion', 'navio-med-checklist'];
const HOME_FEATURED_MAX = 3;

// Each case study's thumbnail for its PortfolioCard. The name is fixed:
// case-studies/<slug>/images/case-study-thumbnail.avif.
const thumbnails = import.meta.glob<string>('../case-studies/*/images/case-study-thumbnail.avif', {
  eager: true,
  import: 'default',
});

/**
 * What one case study's PortfolioCard shows, from its frontmatter. A missing
 * case study, thumbnail, or Year fact stops the build, with a message saying
 * which and where. `listedIn` names the list that asked, for the message.
 */
function caseStudyCard(slug: string, listedIn: string) {
  const caseStudy = caseStudies[slug];
  if (!caseStudy) {
    throw new Error(`${listedIn} lists “${slug}”, but there's no case-studies/${slug}/index.mdx.`);
  }
  const { title, heading, facts } = caseStudy.frontmatter;
  const year = facts?.find((fact) => fact.title === 'Year')?.value;
  if (!year) {
    throw new Error(
      `case-studies/${slug}/index.mdx has no fact titled “Year” in its frontmatter, and its card on ${listedIn} needs one.`,
    );
  }
  const thumbnail = thumbnails[`../case-studies/${slug}/images/case-study-thumbnail.avif`];
  if (!thumbnail) {
    throw new Error(`${listedIn} lists “${slug}”, but there's no case-studies/${slug}/images/case-study-thumbnail.avif.`);
  }
  return { slug, href: `/portfolio/${slug}`, heading, project: title, year: String(year), thumbnail };
}

/** The cards on the Portfolio page, in PORTFOLIO_ORDER */
export function portfolioCaseStudies() {
  return PORTFOLIO_ORDER.map((slug) => caseStudyCard(slug, 'PORTFOLIO_ORDER (the Portfolio page)'));
}

/**
 * The cards Home features, in HOME_FEATURED order. The build stops if the
 * list is longer than three, or names a case study the Portfolio page
 * doesn't show.
 */
export function homeFeaturedCaseStudies() {
  if (HOME_FEATURED.length > HOME_FEATURED_MAX) {
    throw new Error(
      `HOME_FEATURED in app/caseStudies.ts lists ${HOME_FEATURED.length} case studies, but Home shows at most ${HOME_FEATURED_MAX}.`,
    );
  }
  for (const slug of HOME_FEATURED) {
    if (!PORTFOLIO_ORDER.includes(slug)) {
      throw new Error(
        `HOME_FEATURED in app/caseStudies.ts lists “${slug}”, but it isn't in PORTFOLIO_ORDER. Home only features case studies the Portfolio page shows, so add it there first.`,
      );
    }
  }
  return HOME_FEATURED.map((slug) => caseStudyCard(slug, 'HOME_FEATURED (Home)'));
}
