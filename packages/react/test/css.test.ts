// @vitest-environment node
// The component styles use only token variables, live under .cargo- classes, and are all part of styles.css.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, test } from 'vitest';

const SRC = new URL('../src/', import.meta.url).pathname;
const TOKENS_CSS = new URL('../../tokens/dist/css/uic.css', import.meta.url).pathname;

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]));
const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const files = walk(SRC)
  .filter((file) => file.endsWith('.css'))
  .map((file) => ({ name: relative(SRC, file), css: stripComments(readFileSync(file, 'utf8')) }));

const tokenNames = new Set(readFileSync(TOKENS_CSS, 'utf8').match(/--cargo-[a-z0-9-]+(?=\s*:)/g));
const declared = new Set(files.flatMap((file) => file.css.match(/--[a-z0-9_-]+(?=\s*:)/g) ?? []));

// Splits "a, b:is(c, d)" at top-level commas only.
function splitSelectors(list: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of list) {
    if (char === '(' || char === '[') depth++;
    if (char === ')' || char === ']') depth--;
    if (char === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else current += char;
  }
  return [...parts, current.trim()].filter(Boolean);
}

describe('component CSS', () => {
  test.each(files)('$name has no colour literals', ({ css }) => {
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(css).not.toMatch(/\b(rgba?|hsla?|oklch|oklab|lab|lch|hwb|color-mix)\(/);
  });

  test.each(files)('$name only uses tokens and variables declared in src', ({ css }) => {
    const unknown = [...css.matchAll(/var\((--[a-z0-9_-]+)/g)]
      .map((match) => match[1]!)
      .filter((name) => !tokenNames.has(name) && !declared.has(name));
    expect(unknown).toEqual([]);
  });

  test.each(files)('$name only styles .cargo- classes', ({ css }) => {
    const preludes = [...css.matchAll(/([^{}]+)\{/g)].map((match) => match[1]!.trim()).filter((prelude) => !prelude.startsWith('@'));
    const strays = preludes
      .flatMap(splitSelectors)
      .filter((selector) => !/^(\.cargo-|:root|\[data-device=)/.test(selector));
    expect(strays).toEqual([]);
  });

  test('styles.css imports every component file', () => {
    const entry = readFileSync(join(SRC, 'styles.css'), 'utf8');
    const imported = [...entry.matchAll(/@import '\.\/([^']+)'/g)].map((match) => match[1]);
    const expected = files.map((file) => file.name).filter((name) => name !== 'styles.css');
    expect(imported.sort()).toEqual(expected.sort());
  });
});
