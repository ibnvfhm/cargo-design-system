// One small example per component, shared by the server rendering and hydration tests.
import type { FunctionComponent } from 'react';
import { Badge } from '../src/index.js';

export const examples: Record<string, FunctionComponent> = {
  Badge: () => (
    <p>
      <Badge>Label</Badge>
      <Badge type="counter">9</Badge>
      <Badge type="dot">Baru</Badge>
    </p>
  ),
};
