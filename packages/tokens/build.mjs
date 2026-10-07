import StyleDictionary from 'style-dictionary';
import { AA_TEXT, contrast } from './lib/contrast.mjs';

const WHITE = '#FFFFFF';
const DARK_TEXT = '#212121';

StyleDictionary.registerFileHeader({
  name: 'cargo/header',
  fileHeader: () => [
    'Jangan edit file ini langsung.',
    'Dibuat otomatis dari packages/tokens/src dengan `npm run build`.',
  ],
});

// Colour reference generated from the tokens, so the documentation can never drift from the values.
StyleDictionary.registerFormat({
  name: 'cargo/markdown-colors',
  format: ({ dictionary }) => {
    const root = dictionary.tokens.color;
    const singles = dictionary.allTokens.filter((t) => t.path.length === 2);
    const palettes = Object.keys(root).filter((key) => !key.startsWith('$') && !('$value' in root[key]));
    const ratio = (n) => n.toFixed(1);
    const readable = (hex) => {
      const onWhite = contrast(hex, WHITE) >= AA_TEXT;
      const onDark = contrast(hex, DARK_TEXT) >= AA_TEXT;
      if (onWhite && onDark) return 'putih / gelap';
      if (onWhite) return 'putih';
      if (onDark) return 'gelap';
      return '– (ikon, garis, teks besar)';
    };

    const lines = [
      '# Primitive colors Cargo',
      '',
      '> Dibuat otomatis dari `packages/tokens/src/primitive/color.json`. Jangan edit file ini langsung.',
      '',
      `Kolom "Teks kecil" menunjukkan warna teks yang mencapai kontras ${AA_TEXT}:1 (WCAG AA) di atas warna itu: teks putih (${WHITE}) atau teks gelap (${DARK_TEXT}).`,
      '',
      '| Token | Hex |',
      '|---|---|',
      ...singles.map((t) => `| \`color.${t.path[1]}\` | \`${t.$value}\` |`),
    ];
    for (const name of palettes) {
      const tokens = dictionary.allTokens.filter((t) => t.path[1] === name && t.path.length === 3);
      lines.push(
        '',
        `## ${name}`,
        '',
        root[name].$description ? `${root[name].$description}` : '',
        '',
        '| Token | Hex | Kontras dengan putih | Kontras dengan gelap | Teks kecil |',
        '|---|---|---|---|---|',
        ...tokens.map((t) => {
          const hex = t.$value;
          return `| \`color.${name}.${t.path[2]}\` | \`${hex}\` | ${ratio(contrast(hex, WHITE))} | ${ratio(contrast(hex, DARK_TEXT))} | ${readable(hex)} |`;
        }),
      );
    }
    return lines.filter((line, i, all) => !(line === '' && all[i - 1] === '')).join('\n') + '\n';
  },
});

const header = { fileHeader: 'cargo/header' };
// The mobile formats sort tokens by name (10, 100, 20 …) unless outputReferences is on; with it they keep the
// source order, and semantic tokens will later point at primitives by name instead of repeating hex values.
const mobile = { ...header, outputReferences: true };

const sd = new StyleDictionary({
  source: ['src/**/*.json'],
  usesDtcg: true,
  log: { warnings: 'error', errors: { brokenReferences: 'throw' } },
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'cargo',
      buildPath: 'dist/css/',
      files: [{ destination: 'tokens.css', format: 'css/variables', options: header }],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [
        { destination: 'tokens.js', format: 'javascript/es6', options: header },
        { destination: 'tokens.d.ts', format: 'typescript/es6-declarations', options: header },
      ],
    },
    flutter: {
      transformGroup: 'flutter',
      buildPath: 'dist/flutter/',
      files: [{ destination: 'cargo_tokens.dart', format: 'flutter/class.dart', options: { ...mobile, className: 'CargoTokens' } }],
    },
    android: {
      transformGroup: 'compose',
      buildPath: 'dist/android/',
      files: [
        {
          destination: 'CargoTokens.kt',
          format: 'compose/object',
          options: { ...mobile, className: 'CargoTokens', packageName: 'com.cargo.tokens' },
        },
      ],
    },
    ios: {
      // Same as the built-in "ios-swift" group, but colours become SwiftUI `Color` instead of UIKit `UIColor`.
      transforms: ['attribute/cti', 'name/camel', 'color/ColorSwiftUI', 'content/swift/literal', 'asset/swift/literal', 'size/swift/remToCGFloat'],
      buildPath: 'dist/ios/',
      files: [
        { destination: 'CargoTokens.swift', format: 'ios-swift/enum.swift', options: { ...mobile, className: 'CargoTokens', import: ['SwiftUI'] } },
      ],
    },
    docs: {
      transforms: ['attribute/cti', 'name/kebab'],
      buildPath: 'dist/docs/',
      files: [{ destination: 'colors.md', format: 'cargo/markdown-colors' }],
    },
  },
});

await sd.buildAllPlatforms();
