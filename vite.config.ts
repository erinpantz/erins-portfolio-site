import mdx from '@mdx-js/rollup';
import { reactRouter } from '@react-router/dev/vite';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { defineConfig } from 'vite';
import { remarkProseRuns } from './plugins/remarkProseRuns.ts';

export default defineConfig({
  plugins: [
    // Case studies: MDX files become React components. Their frontmatter
    // (the data between --- lines at the top) is exported as `frontmatter`.
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm, remarkProseRuns],
      }),
    },
    reactRouter(),
  ],
  resolve: {
    // One copy of React. A linked Verity folder has its own React (for
    // Storybook), and two copies break components.
    dedupe: ['react', 'react-dom'],
  },
});
