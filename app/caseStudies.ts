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
