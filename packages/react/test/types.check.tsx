// Type-level checks, run by `npm run typecheck`: each line below must be a type error.
import { Badge, Button, TextArea, TextField } from '../src/index.js';

// @ts-expect-error Figma's Style is `appearance` in code; `style` stays React's style object.
export const styleIsNotAppearance = <Badge style="solid" />;
// @ts-expect-error Only the Figma values are allowed.
export const unknownType = <Badge type="big" />;

// @ts-expect-error Figma's Type is `variant` in code; `type` stays the HTML button type.
export const typeIsNotVariant = <Button type="primary">Simpan</Button>;
// @ts-expect-error An icon-only button needs aria-label or aria-labelledby.
export const unnamedIconButton = <Button leftIcon={<svg />} />;
// An icon-only button with a name is fine.
export const namedIconButton = <Button aria-label="Hapus" leftIcon={<svg />} />;

// @ts-expect-error A field needs a label, aria-label or aria-labelledby.
export const unnamedField = <TextField placeholder="Email" />;
// @ts-expect-error Only the Figma Required Object types are allowed.
export const unknownIndicator = <TextField label="Email" requiredIndicator="star" />;
// @ts-expect-error A text area needs a name too.
export const unnamedTextArea = <TextArea placeholder="Catatan" />;
export const searchField = <TextField aria-label="Cari" type="search" />;
