import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

const path = (relative) => fileURLToPath(new URL(relative, import.meta.url));

// Static docs site. From the repo root: `npm run docs`, then open http://localhost:4321.
export default defineConfig({
  devToolbar: { enabled: false },
  // Compression drops the space at a line break before an inline element ("lihat\n<a>" → "lihat<a>").
  compressHTML: false,
  // React renders the demos on the Kode tabs.
  integrations: [react()],
  vite: {
    resolve: {
      alias: [
        // Token sources (JSON) and helpers are read straight from the tokens package; CHANGELOG.md from the repo root.
        { find: '@tokens', replacement: path('../../packages/tokens') },
        { find: '@repo', replacement: path('../..') },
        // The components come from their source, so the site always shows the current code without a separate build.
        { find: /^@cargo\/react$/, replacement: path('../../packages/react/src/index.ts') },
        { find: /^@cargo\/react\/styles\.css$/, replacement: path('../../packages/react/src/styles.css') },
        { find: /^@cargo\/react\/meta$/, replacement: path('../../packages/react/src/meta.ts') },
      ],
      dedupe: ['react', 'react-dom'],
    },
  },
});
