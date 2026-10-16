import { render, type RenderResult } from '@testing-library/react';
import axe from 'axe-core';
import { StrictMode, type ReactElement } from 'react';
import { expect } from 'vitest';

/** Renders in StrictMode, so effects run twice like in development. */
export const renderStrict = (ui: ReactElement): RenderResult => render(ui, { wrapper: StrictMode });

/** No axe-core violations. Colour contrast is off: jsdom has no layout, and the token tests cover contrast. */
export async function expectNoAxeViolations(container: Element): Promise<void> {
  const result = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
  expect(result.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.html).join(', ')})`)).toEqual([]);
}
