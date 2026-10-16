// Figma ↔ code mapping of every component, for the Kode tab on the docs site.
import { badgeMeta } from './badge/badge.meta.js';
import type { ComponentMeta } from './meta-types.js';

export type { AxisMeta, ComponentMeta, FigmaOnlyMeta, PropMeta } from './meta-types.js';

export const META: Record<string, ComponentMeta> = {
  Badge: badgeMeta,
};
