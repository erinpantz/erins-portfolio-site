import type { Root, RootContent } from 'mdast';

// A build step for case study MDX files. It wraps each run of plain Markdown
// (headings, paragraphs, lists, quotes) in a <Prose>, and leaves components
// like MediaText and Gallery between them. Prose is for text only; the space
// between a Prose and a component comes from the VerticalStack the case study
// page puts around the whole body (see app/routes/case-study.tsx).

// Things in an MDX file that aren't shown on the page: imports, exports, the
// frontmatter, and link definitions. They stay where they are.
const HIDDEN = new Set(['mdxjsEsm', 'yaml', 'definition']);

// Components and {expressions} sit between the Prose runs
const OUTSIDE_PROSE = new Set(['mdxJsxFlowElement', 'mdxFlowExpression']);

export function remarkProseRuns() {
  return (tree: Root) => {
    const children: RootContent[] = [];
    let run: RootContent[] = [];

    const endRun = () => {
      if (run.length === 0) return;
      children.push({
        type: 'mdxJsxFlowElement',
        name: 'Prose',
        attributes: [],
        children: run,
      } as unknown as RootContent);
      run = [];
    };

    for (const node of tree.children) {
      if (HIDDEN.has(node.type)) {
        children.push(node);
      } else if (OUTSIDE_PROSE.has(node.type)) {
        endRun();
        children.push(node);
      } else {
        run.push(node);
      }
    }
    endRun();
    tree.children = children;
  };
}
