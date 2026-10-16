import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { test } from 'node:test';
import { flatten, load, targetOf } from '../lib/resolve.mjs';
import { BRANDS, FIGMA_MAX_MODES, MODES } from '../lib/themes.mjs';

const ROLES = ['fill', 'fill-hover', 'fill-pressed', 'fill-subtle', 'on-fill', 'text', 'text-hover', 'border'];
const EXPECTED = MODES.flatMap((mode) => ROLES.map((role) => `color.brand.${mode.id}.${role}`));
const primitives = flatten(load('primitive/color.json'), 'primitive');
const brands = BRANDS.map((brand) => ({ ...brand, tokens: flatten(load(`brand/${brand.id}.json`), 'brand') }));

test('there is one Brand Theme file per brand in lib/themes.mjs, and nothing else', () => {
  const files = readdirSync(new URL('../src/brand/', import.meta.url)).sort();
  assert.deepEqual(files, BRANDS.map((brand) => `${brand.id}.json`).sort());
});

test('every Figma collection fits in its mode limit: Brand Theme for the brands, one collection per parent for its products', () => {
  const top = BRANDS.filter((brand) => !brand.parent);
  assert.ok(top.length <= FIGMA_MAX_MODES, `Brand Theme would need ${top.length} modes`);
  for (const brand of BRANDS.filter((b) => b.parent)) {
    assert.ok(top.some((parent) => parent.id === brand.parent), `${brand.name}: parent ${brand.parent} is not a Brand Theme mode`);
  }
  for (const parent of top) {
    // The parent's own colours are the first mode of its product collection.
    const modes = 1 + BRANDS.filter((brand) => brand.parent === parent.id).length;
    if (modes > 1) assert.ok(modes <= FIGMA_MAX_MODES, `${parent.name} Product would need ${modes} modes`);
  }
});

test('every brand defines the same 16 tokens: light and dark for each of the 8 roles', () => {
  for (const brand of brands) assert.deepEqual(Object.keys(brand.tokens), EXPECTED, brand.name);
});

test('Brand Theme tokens point at primitives, never raw hex', () => {
  for (const brand of brands) {
    for (const [name, token] of Object.entries(brand.tokens)) {
      assert.ok(primitives[targetOf(token)], `${brand.name}: ${name} = ${token.value}`);
    }
  }
});

test('every Brand Theme token has a description, the same for every brand', () => {
  const [first, ...rest] = brands;
  for (const [name, token] of Object.entries(first.tokens)) {
    assert.ok(token.description?.trim(), `${name} has no description`);
    for (const brand of rest) assert.equal(brand.tokens[name].description, token.description, `${brand.name}: ${name}`);
  }
});
