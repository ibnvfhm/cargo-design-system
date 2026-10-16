// @vitest-environment node
// Every component renders on the server (Next.js, Astro) without touching window or document.
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { expect, test } from 'vitest';
import { examples } from './examples.js';

test.each(Object.entries(examples))('%s renders on the server', (_name, example) => {
  expect(renderToString(createElement(example))).toContain('cargo-');
});
