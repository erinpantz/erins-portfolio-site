import type { Root, RootContent } from 'mdast';
import type { VFile } from 'vfile';

// A build step for case study MDX files. Inside every <Section> and
// <TextBlock>, it wraps each run of plain Markdown (headings, paragraphs,
// lists, quotes) in a <Prose>, and leaves components like MediaText and Grid
// between them. Section and TextBlock then space those blocks themselves.
//
// Markdown anywhere else stops the build: at the top of the file it would sit
// straight in Main with no column, and in a Container it would break the
// one-thing-per-Container rule. Other components (UnorderedListItem, Quote,
// MediaBlock…) own whatever is inside them, so they're left alone.

/** The components whose Markdown becomes Prose */
const PROSE_PARENTS = new Set(['Section', 'TextBlock']);

/** Where Markdown isn't allowed: the top of the file, and Containers */
const NO_MARKDOWN = new Set(['Container']);

// Things in an MDX file that aren't Markdown text: imports, exports, the
// frontmatter, link definitions, comments, components, and {expressions}
const NOT_MARKDOWN = new Set(['mdxjsEsm', 'yaml', 'definition', 'mdxJsxFlowElement', 'mdxFlowExpression']);

type Parent = { children: RootContent[] };
type JsxElement = Parent & { type: 'mdxJsxFlowElement'; name: string | null };

const isJsx = (node: RootContent): node is RootContent & JsxElement => node.type === 'mdxJsxFlowElement';

// Wraps each run of Markdown among a parent's children in one <Prose>
function wrapRuns(parent: Parent) {
  const children: RootContent[] = [];
  let run: RootContent[] = [];

  const endRun = () => {
    if (run.length === 0) return;
    children.push({ type: 'mdxJsxFlowElement', name: 'Prose', attributes: [], children: run } as unknown as RootContent);
    run = [];
  };

  for (const node of parent.children) {
    if (NOT_MARKDOWN.has(node.type)) {
      endRun();
      children.push(node);
    } else {
      run.push(node);
    }
  }
  endRun();
  parent.children = children;
}

// Stops the build at the first Markdown block among these children
function forbidMarkdown(parent: Parent, where: string, file: VFile) {
  const markdown = parent.children.find((node) => !NOT_MARKDOWN.has(node.type));
  if (markdown) {
    file.fail(
      `Markdown ${where}. Case study text goes inside a <Section> (or a <TextBlock> in one), so it gets the content column and Prose styles.`,
      markdown,
    );
  }
}

function visit(parent: Parent, file: VFile) {
  for (const node of parent.children) {
    if (!isJsx(node)) continue;
    if (node.name && PROSE_PARENTS.has(node.name)) {
      // Look inside first, so a TextBlock in a Section is handled before the Section's runs
      visit(node, file);
      wrapRuns(node);
    } else {
      if (node.name && NO_MARKDOWN.has(node.name)) forbidMarkdown(node, `inside a <${node.name}>`, file);
      visit(node, file);
    }
  }
}

export function remarkProseRuns() {
  return (tree: Root, file: VFile) => {
    forbidMarkdown(tree, 'at the top level of the file, outside any <Section>', file);
    visit(tree, file);
  };
}
