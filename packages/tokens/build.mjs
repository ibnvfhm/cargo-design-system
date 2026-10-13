import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import StyleDictionary from 'style-dictionary';
import { fileHeader, formattedVariables } from 'style-dictionary/utils';
import { AA_TEXT, contrast } from './lib/contrast.mjs';
import { PAIRS } from './lib/pairs.mjs';
import { BRANDS, MODES } from './lib/themes.mjs';

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
const isSemantic = fromFolder('semantic');
const collapseBlankLines = (lines) => lines.filter((line, i, all) => !(line === '' && all[i - 1] === '')).join('\n') + '\n';

// The dark-mode tokens of each brand, collected before that brand's CSS file is written.
const darkCss = new Map();

const cssVariables = (dictionary, tokens, indentation, comments = true) =>
  formattedVariables({
    format: 'css',
    dictionary: { ...dictionary, allTokens: tokens },
    outputReferences: true,
    usesDtcg: true,
    formatting: comments ? { indentation } : { indentation, commentStyle: 'none' },
  });

// One CSS file per brand. Light is the default; Dark applies under data-theme="dark", or when the system is dark
// and the page has not asked for data-theme="light". Only semantic tokens change between the two.
StyleDictionary.registerFormat({
  name: 'cargo/css-themes',
  format: async ({ dictionary, options, file }) => {
    const dark = darkCss.get(options.brand.id);
    const darkVariables = (indentation) => cssVariables(dark, dark.allTokens.filter(isSemantic), indentation, false);
    return (
      (await fileHeader({ file })) +
      [
        `/* Brand ${options.brand.name}. Mode Light berlaku secara default. Mode Dark berlaku dengan data-theme="dark",\n   atau otomatis kalau sistem memakai mode gelap dan halaman tidak memakai data-theme="light". */`,
        `:root {\n${cssVariables(dictionary, dictionary.allTokens.filter((t) => !isSemantic(t)), '  ')}\n}`,
        `:root,\n[data-theme="light"] {\n  color-scheme: light;\n${cssVariables(dictionary, dictionary.allTokens.filter(isSemantic), '  ')}\n}`,
        `[data-theme="dark"] {\n  color-scheme: dark;\n${darkVariables('  ')}\n}`,
        `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n    color-scheme: dark;\n${darkVariables('    ')}\n  }\n}`,
      ].join('\n\n') +
      '\n'
    );
  },
});

const header = { fileHeader: 'cargo/header' };
// The mobile formats sort tokens by name (10, 100, 20 …) unless outputReferences is on; with it they keep the
// source order, and semantic tokens point at other tokens by name instead of repeating hex values.
const mobile = { ...header, outputReferences: true };
// Sizes are written in px, as in Figma. The mobile size transforms treat numbers as rem and multiply them by
// basePxFontSize (16 by default); 1 keeps 16px as 16dp on Android and 16pt on iOS.
const mobileSizes = { basePxFontSize: 1 };
// Same as the built-in "ios-swift" group, but colours become SwiftUI `Color` instead of UIKit `UIColor`.
const iosTransforms = ['attribute/cti', 'name/camel', 'color/ColorSwiftUI', 'content/swift/literal', 'asset/swift/literal', 'size/swift/remToCGFloat'];
const log = { warnings: 'error', errors: { brokenReferences: 'throw' } };
// Listed one by one to keep this order in every output: space, radius, border width.
const DIMENSION = ['src/dimension/space.json', 'src/dimension/radius.json', 'src/dimension/border-width.json'];

// Sizes are the same for every brand and mode, so JavaScript and mobile get one separate file for them.
// CSS gets them inside every brand file instead, so a web app still loads a single file.
const dimensionConfig = {
  source: DIMENSION,
  usesDtcg: true,
  log,
  platforms: {
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [
        { destination: 'dimension.js', format: 'javascript/es6', options: header },
        { destination: 'dimension.d.ts', format: 'typescript/es6-declarations', options: header },
      ],
    },
    flutter: {
      transformGroup: 'flutter',
      ...mobileSizes,
      buildPath: 'dist/flutter/',
      files: [{ destination: 'cargo_dimension.dart', format: 'flutter/class.dart', options: { ...mobile, className: 'CargoDimension' } }],
    },
    android: {
      transformGroup: 'compose',
      ...mobileSizes,
      buildPath: 'dist/android/',
      files: [
        { destination: 'CargoDimension.kt', format: 'compose/object', options: { ...mobile, className: 'CargoDimension', packageName: 'com.cargo.tokens' } },
      ],
    },
    ios: {
      transforms: iosTransforms,
      ...mobileSizes,
      buildPath: 'dist/ios/',
      files: [{ destination: 'CargoDimension.swift', format: 'ios-swift/enum.swift', options: { ...mobile, className: 'CargoDimension', import: ['SwiftUI'] } }],
    },
    docs: { transforms: ['attribute/cti', 'name/kebab'] },
  },
};

function config(brand, mode) {
  // Brand files only hold colours (sizes have their own files above). A Light file only needs
  // color.brand.light.*, a Dark file only color.brand.dark.*.
  const filter = (token) => token.path[0] === 'color' && (token.path[1] !== 'brand' || token.path[2] === mode.id);
  const className = `CargoTokens${mode.name}`;
  return {
    source: ['src/primitive/**/*.json', ...DIMENSION, `src/brand/${brand.id}.json`, `src/semantic/${mode.id}.json`],
    usesDtcg: true,
    log,
    platforms: {
      css: {
        transformGroup: 'css',
        prefix: 'cargo',
        buildPath: 'dist/css/',
        files: [{ destination: `${brand.id}.css`, format: 'cargo/css-themes', options: { ...header, brand } }],
      },
      js: {
        transformGroup: 'js',
        buildPath: `dist/js/${brand.id}/`,
        files: [
          { destination: `${mode.id}.js`, format: 'javascript/es6', filter, options: header },
          { destination: `${mode.id}.d.ts`, format: 'typescript/es6-declarations', filter, options: header },
        ],
      },
      flutter: {
        transformGroup: 'flutter',
        buildPath: `dist/flutter/${brand.id}/`,
        files: [{ destination: `cargo_tokens_${mode.id}.dart`, format: 'flutter/class.dart', filter, options: { ...mobile, className } }],
      },
      android: {
        transformGroup: 'compose',
        buildPath: `dist/android/${brand.id}/`,
        files: [
          { destination: `${className}.kt`, format: 'compose/object', filter, options: { ...mobile, className, packageName: 'com.cargo.tokens' } },
        ],
      },
      ios: {
        transforms: iosTransforms,
        buildPath: `dist/ios/${brand.id}/`,
        files: [{ destination: `${className}.swift`, format: 'ios-swift/enum.swift', filter, options: { ...mobile, className, import: ['SwiftUI'] } }],
      },
      // No files: the documentation below is written from these tokens for all brands and modes at once.
      docs: { transforms: ['attribute/cti', 'name/kebab'] },
    },
  };
}

await rm('dist', { recursive: true, force: true });

const dimension = new StyleDictionary(dimensionConfig);
for (const platform of ['js', 'flutter', 'android', 'ios']) await dimension.buildPlatform(platform);
const dimensionDocs = await dimension.getPlatformTokens('docs');

const docs = new Map(); // "uic/light" → resolved tokens
// Group descriptions (e.g. "Latar. Scoping di Figma: …") only survive in the untransformed tokens.
let groupNotes;
for (const brand of BRANDS) {
  // Dark first, so the brand's CSS file (written by the Light build) can include the dark values.
  for (const mode of [...MODES].reverse()) {
    const sd = new StyleDictionary(config(brand, mode));
    if (mode.id === 'dark') darkCss.set(brand.id, await sd.getPlatformTokens('css'));
    for (const platform of ['css', 'js', 'flutter', 'android', 'ios']) {
      if (platform === 'css' && mode.id === 'dark') continue;
      await sd.buildPlatform(platform);
    }
    docs.set(`${brand.id}/${mode.id}`, await sd.getPlatformTokens('docs'));
    groupNotes ??= sd.tokens.color;
  }
}

// Documentation, generated from the tokens so it can never drift from the values.
const exceptions = JSON.parse(await readFile('contrast-exceptions.json', 'utf8'));
const byPath = (dictionary) => new Map(dictionary.allTokens.map((t) => [t.path.join('.'), t]));
const target = (t) => String(t.original.$value).replace(/^\{color\.(.*)\}$/, '$1');
const ratio = (n) => n.toFixed(2);

function colorsMarkdown(dictionary) {
  const primitives = dictionary.allTokens.filter(fromFolder('primitive'));
  const singles = primitives.filter((t) => t.path.length === 2);
  const palettes = [...new Set(primitives.filter((t) => t.path.length === 3).map((t) => t.path[1]))];
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
      groupNotes[name].$description ?? '',
      '',
      '| Token | Hex | Kontras dengan putih | Kontras dengan gelap | Teks kecil |',
      '|---|---|---|---|---|',
      ...tokens.map((t) => {
        const hex = t.$value;
        return `| \`color.${name}.${t.path[2]}\` | \`${hex}\` | ${contrast(hex, WHITE).toFixed(1)} | ${contrast(hex, DARK_TEXT).toFixed(1)} | ${readable(hex)} |`;
      }),
    );
  }
  return collapseBlankLines(lines);
}

function semanticMarkdown() {
  const light = docs.get(`${BRANDS[0].id}/light`);
  const dark = docs.get(`${BRANDS[0].id}/dark`);
  const darkByPath = byPath(dark);
  // A semantic cell shows the token it points at, plus the final colour when that does not depend on the brand.
  const cell = (t) => (target(t).startsWith('brand.') ? `\`${target(t)}\`` : `\`${target(t)}\` \`${t.$value}\``);
  const lines = [
    '# Semantic colors Cargo',
    '',
    '> Dibuat otomatis dari `packages/tokens/src/brand` dan `packages/tokens/src/semantic`. Jangan edit file ini langsung.',
    '',
    'Desain dan kode memakai token semantic, bukan primitive. Di mode Light, token semantic menunjuk ke primitive atau `brand.light.*`; di mode Dark, ke primitive atau `brand.dark.*`. Warna `brand.*` bergantung pada brand yang dipakai, jadi lihat tabel Brand Theme.',
    '',
    'Setiap sel berisi token yang dituju (tanpa awalan `color.`) dan warna akhirnya.',
    '',
    '## Brand Theme',
    '',
    'Warna khas setiap brand, satu file per brand di `src/brand/`. Tidak dipakai langsung di desain; desain memakai token semantic.',
  ];
  for (const mode of MODES) {
    const perBrand = BRANDS.map((brand) => byPath(docs.get(`${brand.id}/${mode.id}`)));
    const tokens = light.allTokens.filter((t) => t.path[1] === 'brand' && t.path[2] === mode.id);
    lines.push(
      '',
      `### color.brand.${mode.id}`,
      '',
      `Dipakai oleh Semantic mode ${mode.name}.`,
      '',
      `| Token | ${BRANDS.map((b) => b.name).join(' | ')} | Dipakai untuk |`,
      `|---|${BRANDS.map(() => '---|').join('')}---|`,
      ...tokens.map((t) => {
        const key = t.path.join('.');
        const cells = perBrand.map((m) => `\`${target(m.get(key))}\` \`${m.get(key).$value}\``);
        return `| \`${key}\` | ${cells.join(' | ')} | ${t.$description ?? ''} |`;
      }),
    );
  }
  const semantic = light.allTokens.filter(isSemantic);
  for (const group of [...new Set(semantic.map((t) => t.path[1]))]) {
    lines.push(
      '',
      `## ${group}`,
      '',
      groupNotes[group].$description ?? '',
      '',
      '| Token | Light | Dark | Dipakai untuk |',
      '|---|---|---|---|',
      ...semantic
        .filter((t) => t.path[1] === group)
        .map((t) => `| \`${t.path.join('.')}\` | ${cell(t)} | ${cell(darkByPath.get(t.path.join('.')))} | ${t.$description ?? ''} |`),
    );
  }
  return collapseBlankLines(lines);
}

function contrastMarkdown() {
  const results = [];
  for (const brand of BRANDS) {
    for (const mode of MODES) {
      const tokens = byPath(docs.get(`${brand.id}/${mode.id}`));
      const hex = (name) => tokens.get(`color.${name}`).$value;
      const recorded = exceptions[brand.id]?.[mode.id] ?? [];
      const below = PAIRS.map(([fg, bg, min]) => ({ fg, bg, min, ratio: contrast(hex(fg), hex(bg)) }))
        .filter((p) => p.ratio < p.min)
        .map((p) => ({ ...p, recorded: recorded.some(([fg, bg]) => fg === p.fg && bg === p.bg) }));
      results.push({ brand, mode, below });
    }
  }
  const lines = [
    '# Kontras warna Cargo',
    '',
    '> Dibuat otomatis dari `packages/tokens/src` dan `packages/tokens/lib/pairs.mjs`. Jangan edit file ini langsung.',
    '',
    `Setiap teks, ikon, dan garis dicek terhadap latar tempat ia biasa dipakai, untuk setiap brand dan mode. Teks butuh kontras minimal ${AA_TEXT}:1, ikon dan garis minimal 3:1 (WCAG 2.2 AA). Daftar ${PAIRS.length} pasangannya ada di \`lib/pairs.mjs\`.`,
    '',
    `| Brand | ${MODES.map((m) => m.name).join(' | ')} |`,
    `|---|${MODES.map(() => '---|').join('')}`,
    ...BRANDS.map((brand) => {
      const cells = MODES.map((mode) => {
        const { below } = results.find((r) => r.brand === brand && r.mode === mode);
        return `${PAIRS.length - below.length} dari ${PAIRS.length} lolos`;
      });
      return `| ${brand.name} | ${cells.join(' | ')} |`;
    }),
    '',
    '## Di bawah standar',
    '',
    'Pasangan berikut sengaja dibiarkan di bawah standar atas keputusan designer, dan dicatat di `contrast-exceptions.json`. `npm test` gagal kalau ada pasangan lain yang turun di bawah standar, atau kalau pasangan yang dicatat ternyata sudah lolos.',
  ];
  for (const { brand, mode, below } of results.filter((r) => r.below.length)) {
    lines.push(
      '',
      `### ${brand.name}, ${mode.name}`,
      '',
      '| Warna | Latar | Kontras | Minimal | Catatan |',
      '|---|---|---|---|---|',
      ...below.map((p) => `| \`color.${p.fg}\` | \`color.${p.bg}\` | ${ratio(p.ratio)}:1 | ${p.min}:1 | ${p.recorded ? 'disengaja' : '**belum dicatat**'} |`),
    );
  }
  return collapseBlankLines(lines);
}

function dimensionMarkdown() {
  const lines = [
    '# Dimension Cargo',
    '',
    '> Dibuat otomatis dari `packages/tokens/src/dimension`. Jangan edit file ini langsung.',
    '',
    'Ukuran yang sama untuk semua brand dan mode: spacing, radius, dan tebal garis. Nilainya dalam px, sama seperti di Figma. Di Android menjadi dp dan di iOS menjadi pt, dengan angka yang sama.',
  ];
  for (const group of [...new Set(dimensionDocs.allTokens.map((t) => t.path[0]))]) {
    lines.push(
      '',
      `## ${group}`,
      '',
      dimension.tokens[group].$description ?? '',
      '',
      '| Token | Nilai | Dipakai untuk |',
      '|---|---|---|',
      ...dimensionDocs.allTokens.filter((t) => t.path[0] === group).map((t) => `| \`${t.path.join('.')}\` | \`${t.$value}\` | ${t.$description ?? ''} |`),
    );
  }
  return collapseBlankLines(lines);
}

await mkdir('dist/docs', { recursive: true });
await writeFile('dist/docs/colors.md', colorsMarkdown(docs.get(`${BRANDS[0].id}/light`)));
await writeFile('dist/docs/semantic.md', semanticMarkdown());
await writeFile('dist/docs/contrast.md', contrastMarkdown());
await writeFile('dist/docs/dimension.md', dimensionMarkdown());
console.log('✔︎ dist/docs/colors.md, semantic.md, contrast.md, dimension.md');
