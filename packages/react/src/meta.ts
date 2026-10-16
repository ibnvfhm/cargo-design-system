// Figma ↔ code mapping of every component, for the Kode tab on the docs site.
import { badgeMeta } from './badge/badge.meta.js';
import { buttonMeta } from './button/button.meta.js';
import { textAreaMeta } from './text-area/text-area.meta.js';
import { textFieldMeta } from './text-field/text-field.meta.js';
import type { ComponentMeta } from './meta-types.js';

export type { AxisMeta, ComponentMeta, FigmaOnlyMeta, PropMeta } from './meta-types.js';

export const META: Record<string, ComponentMeta> = {
  Badge: badgeMeta,
  Button: buttonMeta,
  TextField: textFieldMeta,
  TextArea: textAreaMeta,
};
