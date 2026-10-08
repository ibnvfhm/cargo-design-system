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

const fromFolder = (folder) => (token) => token.filePath.replaceAll('\\', '/').includes(`/${folder}/`);
const collapseBlankLines = (lines) => lines.filter((line, i, all) => !(line === '' && all[i - 1] === '')).join('\n') + '\n';

// Colour reference generated from the tokens, so the documentation can never drift from the values.
StyleDictionary.registerFormat({
  name: 'cargo/markdown-colors',
  format: ({ dictionary }) => {
    const root = dictionary.tokens.color;
    const primitives = dictionary.allTokens.filter(fromFolder('primitive'));
    const singles = primitives.filter((t) => t.path.length === 2);
    const palettes = [...new Set(primitives.filter((t) => t.path.length === 3).map((t) => t.path[1]))];
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
      const tokens = primitives.filter((t) => t.path[1] === name && t.path.length === 3);
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
    return collapseBlankLines(lines);
  },
});

// Semantic and Brand Theme reference: what each token points at, its final colour and when to use it.
StyleDictionary.registerFormat({
  name: 'cargo/markdown-semantic',
  format: ({ dictionary }) => {
    const root = dictionary.tokens.color;
    const target = (t) => String(t.original.$value).replace(/^\{(.*)\}$/, '$1');
    const table = (tokens) => [
      '| Token | Menunjuk ke | Hex (UIC, Light) | Dipakai untuk |',
      '|---|---|---|---|',
      ...tokens.map((t) => `| \`${t.path.join('.')}\` | \`${target(t)}\` | \`${t.$value}\` | ${t.$description ?? ''} |`),
    ];
    const brand = dictionary.allTokens.filter(fromFolder('brand'));
    const semantic = dictionary.allTokens.filter(fromFolder('semantic'));
    const lines = [
      '# Semantic colors Cargo',
      '',
      '> Dibuat otomatis dari `packages/tokens/src/brand` dan `packages/tokens/src/semantic`. Jangan edit file ini langsung.',
      '',
      'Desain dan kode memakai token semantic, bukan primitive. Setiap token menunjuk ke token lain; kolom Hex menunjukkan warna akhirnya untuk brand UIC dalam mode Light.',
      '',
      '## Brand Theme (mode UIC)',
      '',
      root.brand.$description ?? '',
      '',
      ...table(brand),
    ];
    for (const group of [...new Set(semantic.map((t) => t.path[1]))]) {
      lines.push('', `## ${group}`, '', root[group].$description ?? '', '', ...table(semantic.filter((t) => t.path[1] === group)));
    }
    return collapseBlankLines(lines);
  },
});

const header = { fileHeader: 'cargo/header' };
// The mobile formats sort tokens by name (10, 100, 20 …) unless outputReferences is on; with it they keep the
// source order, and semantic tokens will later point at primitives by name instead of repeating hex values.
const mobile = { ...header, outputReferences: true };

const sd = new StyleDictionary({
  // One brand for now. Step 3 adds a build per brand (src/brand/<brand>.json) and per light/dark mode.
  source: ['src/primitive/**/*.json', 'src/brand/uic.json', 'src/semantic/**/*.json'],
  usesDtcg: true,
  log: { warnings: 'error', errors: { brokenReferences: 'throw' } },
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'cargo',
      buildPath: 'dist/css/',
      // Semantic variables point at other variables, e.g. --cargo-color-bg-brand: var(--cargo-color-brand-fill).
      files: [{ destination: 'tokens.css', format: 'css/variables', options: { ...header, outputReferences: true } }],
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
      files: [
        { destination: 'colors.md', format: 'cargo/markdown-colors' },
        { destination: 'semantic.md', format: 'cargo/markdown-semantic' },
      ],
    },
  },
});

await sd.buildAllPlatforms();
