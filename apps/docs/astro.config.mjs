import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

// Static docs site. From the repo root: `npm run docs`, then open http://localhost:4321.
export default defineConfig({
  devToolbar: { enabled: false },
  // Compression drops the space at a line break before an inline element ("lihat\n<a>" → "lihat<a>").
  compressHTML: false,
  vite: {
    resolve: {
      // Token sources (JSON) and helpers are read straight from the tokens package; CHANGELOG.md from the repo root.
      alias: {
        '@tokens': fileURLToPath(new URL('../../packages/tokens', import.meta.url)),
        '@repo': fileURLToPath(new URL('../..', import.meta.url)),
      },
    },
  },
});
