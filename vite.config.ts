import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter()],
  resolve: {
    // One copy of React. A linked Verity folder has its own React (for
    // Storybook), and two copies break components.
    dedupe: ['react', 'react-dom'],
  },
});
