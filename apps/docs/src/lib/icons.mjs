// Icons exported from the Figma Iconography page (src/data/icons.json): 24px, Regular and Fill,
// drawn with currentColor so they take the colour of the text around them.
const files = import.meta.glob('../data/icons.json', { eager: true, import: 'default' });
const data = Object.values(files)[0] ?? { icons: [] };

export const ICONS = data.icons;
export const ICON_SIZES = data.sizes ?? [];
export const ICONS_EXPORTED = data.exported;

const byName = new Map(ICONS.map((icon) => [icon.name, icon]));

// Site-only glyphs that the Cargo library does not have yet.
const EXTRA = {
  Sun: '<circle cx="12" cy="12" r="4.25" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M12 2.75v1.5M12 19.75v1.5M2.75 12h1.5M19.75 12h1.5M5.46 5.46l1.06 1.06M17.48 17.48l1.06 1.06M5.46 18.54l1.06-1.06M17.48 6.52l1.06-1.06"/>',
  Moon: '<path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M20.25 14.04A8.25 8.25 0 0 1 9.96 3.75a8.25 8.25 0 1 0 10.29 10.29Z"/>',
};

export const iconMarkup = (name, variant = 'regular') => {
  if (EXTRA[name]) return EXTRA[name];
  const icon = byName.get(name);
  if (!icon) return '';
  return (variant === 'fill' && icon.fill) || icon.regular;
};
