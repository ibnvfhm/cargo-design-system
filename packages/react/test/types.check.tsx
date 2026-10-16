// Type-level checks, run by `npm run typecheck`: each line below must be a type error.
import { Badge } from '../src/index.js';

// @ts-expect-error Figma's Style is `appearance` in code; `style` stays React's style object.
export const styleIsNotAppearance = <Badge style="solid" />;
// @ts-expect-error Only the Figma values are allowed.
export const unknownType = <Badge type="big" />;
