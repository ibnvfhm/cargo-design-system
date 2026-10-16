// Server markup hydrates without a mismatch: no warning reaches console.error (test/setup.ts fails on any).
import { act, createElement } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { expect, test } from 'vitest';
import { examples } from './examples.js';

test.each(Object.entries(examples))('%s hydrates without warnings', async (_name, example) => {
  const container = document.createElement('div');
  container.innerHTML = renderToString(createElement(example));
  document.body.append(container);
  const root = await act(async () => hydrateRoot(container, createElement(example)));
  expect(container.innerHTML).toContain('cargo-');
  await act(async () => root.unmount());
  container.remove();
});
