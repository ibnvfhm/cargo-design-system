// The content of the Kode tab, per component page slug. Each file imports its demos itself, so the interactive ones
// can hydrate (Astro only hydrates components that are imported directly in the .astro file that renders them).
import BadgeKode from './BadgeKode.astro';
import ButtonKode from './ButtonKode.astro';
import TextAreaKode from './TextAreaKode.astro';
import TextFieldKode from './TextFieldKode.astro';

export const KODE = {
  badge: BadgeKode,
  button: ButtonKode,
  'text-fields': TextFieldKode,
  'text-area': TextAreaKode,
};
