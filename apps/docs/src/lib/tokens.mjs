// Reads the token sources in packages/tokens/src, the same files the token build uses,
// so every Foundations page matches Figma and the generated code.
import { flatten, resolve } from '@tokens/lib/resolve.mjs';
import { BRANDS, MODES } from '@tokens/lib/themes.mjs';
import { AA_TEXT, contrast } from '@tokens/lib/contrast.mjs';
import { NON_TEXT, PAIRS } from '@tokens/lib/pairs.mjs';
import exceptions from '@tokens/contrast-exceptions.json';
import primitive from '@tokens/src/primitive/color.json';
import light from '@tokens/src/semantic/light.json';
import dark from '@tokens/src/semantic/dark.json';
import focusRing from '@tokens/src/semantic/focus-ring.json';
import space from '@tokens/src/dimension/space.json';
import radius from '@tokens/src/dimension/radius.json';
import borderWidth from '@tokens/src/dimension/border-width.json';
import desktop from '@tokens/src/typography/desktop.json';
import mobile from '@tokens/src/typography/mobile.json';
import shadow from '@tokens/src/shadow/shadow.json';

export { AA_TEXT, BRANDS, MODES, NON_TEXT, contrast };

const brandFiles = import.meta.glob('@tokens/src/brand/*.json', { eager: true, import: 'default' });
const brandJson = (id) => {
  const entry = Object.entries(brandFiles).find(([path]) => path.endsWith(`/${id}.json`));
  if (!entry) throw new Error(`Brand ${id} tidak punya file di packages/tokens/src/brand`);
  return entry[1];
};

const entries = (node) => Object.entries(node).filter(([key]) => !key.startsWith('$'));

// "{color.neutral.100}" → "neutral.100", "{color.brand.light.fill}" → "brand.light.fill".
export const refOf = (value) => String(value).match(/^\{color\.([^}]+)\}$/)?.[1];
export const cssVarOf = (path) => `--cargo-${path.replace(/\./g, '-')}`;

// Every token one brand and mode sees, like one build of the token package.
export const theme = (brand, mode) => ({
  ...flatten(primitive, 'primitive'),
  ...flatten(brandJson(brand), 'brand'),
  ...flatten(mode === 'dark' ? dark : light, 'semantic'),
});

export const hexOf = (tokens, name) => String(resolve(tokens, name)).toUpperCase();

// Text colour that reads best on a swatch: white or the main text colour (neutral.100).
const TEXT_DARK = '#212121';
export const readableOn = (hex) => {
  const onWhite = contrast('#FFFFFF', hex);
  const onDark = contrast(TEXT_DARK, hex);
  return onWhite >= onDark ? { color: '#FFFFFF', ratio: onWhite } : { color: TEXT_DARK, ratio: onDark };
};

export const ratioLabel = (ratio) => `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`;

/* Primitive */

export const palettes = () =>
  entries(primitive.color).map(([name, node]) => {
    if ('$value' in node) {
      return { name, description: node.$description, steps: [{ step: '', path: `color.${name}`, hex: node.$value.toUpperCase() }] };
    }
    return {
      name,
      description: node.$description,
      steps: entries(node).map(([step, token]) => ({ step, path: `color.${name}.${step}`, hex: token.$value.toUpperCase() })),
    };
  });

export const PRIMITIVE_NOTE = primitive.color.$description;

// Hex of a primitive reference such as "neutral.100" (primitives are the same for every brand and mode).
const primitiveTokens = flatten(primitive, 'primitive');
export const primitiveHex = (ref) => hexOf(primitiveTokens, `color.${ref}`);

/* Brand Theme */

export const brandThemes = () =>
  BRANDS.map(({ id, name }) => {
    const node = brandJson(id).color.brand;
    const tokens = theme(id, 'light');
    return {
      id,
      name,
      modes: ['light', 'dark'].map((mode) => ({
        mode,
        tokens: entries(node[mode]).map(([key, token]) => ({
          key,
          path: `color.brand.${mode}.${key}`,
          ref: refOf(token.$value),
          hex: hexOf(tokens, `color.brand.${mode}.${key}`),
          description: token.$description,
        })),
      })),
    };
  });

// Brand files differ only in their 16 Brand Theme tokens, so <html data-brand="…"> switches brand with one small rule each.
export const brandCss = () =>
  BRANDS.map(({ id }) => {
    const node = brandJson(id).color.brand;
    const declarations = ['light', 'dark'].flatMap((mode) =>
      entries(node[mode]).map(([key, token]) => `--cargo-color-brand-${mode}-${key}:var(${cssVarOf(`color.${refOf(token.$value)}`)})`),
    );
    return `:root[data-brand="${id}"]{${declarations.join(';')}}`;
  }).join('\n');

// Each brand's main fill in Light and Dark, for brand pickers.
export const brandSwatches = () =>
  BRANDS.map(({ id, name }) => {
    const lightTokens = theme(id, 'light');
    const darkTokens = theme(id, 'dark');
    return { id, name, light: hexOf(lightTokens, 'color.bg.brand'), dark: hexOf(darkTokens, 'color.bg.brand') };
  });

// "brand.light.fill" → "imperial.70" for every brand, so pages can show the last alias step for the chosen brand.
export const brandRefs = () =>
  Object.fromEntries(
    BRANDS.map(({ id }) => {
      const node = brandJson(id).color.brand;
      return [id, Object.fromEntries(['light', 'dark'].flatMap((mode) => entries(node[mode]).map(([key, token]) => [`brand.${mode}.${key}`, refOf(token.$value)])))];
    }),
  );

/* Semantic */

export const semanticGroups = () =>
  entries(light.color).map(([group, node]) => ({
    id: group,
    description: node.$description,
    tokens: entries(node).map(([name, token]) => ({
      name,
      group,
      path: `color.${group}.${name}`,
      figma: `color/${group}/${name}`,
      css: `--cargo-color-${group}-${name}`,
      description: token.$description,
      light: refOf(token.$value),
      dark: refOf(dark.color[group][name].$value),
    })),
  }));

/* Contrast */

export const contrastResults = () =>
  BRANDS.flatMap(({ id, name }) =>
    MODES.map((mode) => {
      const tokens = theme(id, mode.id);
      const allowed = exceptions[id]?.[mode.id] ?? [];
      const rows = PAIRS.map(([fg, bg, min]) => {
        const fgHex = hexOf(tokens, `color.${fg}`);
        const bgHex = hexOf(tokens, `color.${bg}`);
        const ratio = contrast(fgHex, bgHex);
        return { fg, bg, min, fgHex, bgHex, ratio, pass: ratio >= min, excepted: allowed.some(([a, b]) => a === fg && b === bg) };
      });
      return { brand: id, brandName: name, mode: mode.id, modeName: mode.name, rows };
    }),
  );

export const EXCEPTIONS_NOTE = exceptions.$description;

/* Typography */

const roleEntries = (json) => entries(json).filter(([key]) => !key.startsWith('font-'));
const metrics = (node) => ({
  size: node['font-size'].$value,
  lineHeight: node['line-height'].$value,
  letterSpacing: node['letter-spacing'].$value,
});

export const ROLES = roleEntries(desktop).map(([role, node]) => ({
  role,
  description: node.$description,
  family: role.startsWith('display') ? 'display' : 'ui',
  desktop: metrics(node),
  mobile: metrics(mobile[role]),
}));

export const FONT_FAMILIES = entries(desktop['font-family']).map(([id, token]) => ({ id, value: token.$value, description: token.$description }));
export const FONT_WEIGHTS = entries(desktop['font-weight']).map(([id, token]) => ({ id, value: token.$value, description: token.$description }));

/* Dimension */

const dimension = (json, group) => ({
  description: json[group].$description,
  tokens: entries(json[group]).map(([key, token]) => ({
    key,
    figma: `${group}/${key}`,
    css: `--cargo-${group}-${key}`,
    value: token.$value,
    description: token.$description,
  })),
});

export const SPACE = dimension(space, 'space');
export const RADIUS = dimension(radius, 'radius');
export const BORDER_WIDTH = dimension(borderWidth, 'border-width');

/* Shadow */

export const SHADOWS = {
  description: shadow.shadow.$description,
  tokens: entries(shadow.shadow).map(([key, token]) => ({
    key,
    figma: `shadow/${key}`,
    css: `--cargo-shadow-${key}`,
    value: token.$value,
    description: token.$description,
  })),
};

export const FOCUS_RINGS = {
  description: focusRing['focus-ring'].$description,
  tokens: entries(focusRing['focus-ring']).map(([key, token]) => ({
    key,
    figma: `focus-ring/${key}`,
    css: `--cargo-focus-ring-${key}`,
    value: token.$value,
    description: token.$description,
  })),
};

/* Counts for the home page */

export const COUNTS = {
  brands: BRANDS.length,
  modes: MODES.length,
  primitive: palettes().reduce((total, palette) => total + palette.steps.length, 0),
  semantic: semanticGroups().reduce((total, group) => total + group.tokens.length, 0),
  textStyles: ROLES.length * FONT_WEIGHTS.length,
  pairs: PAIRS.length,
};
