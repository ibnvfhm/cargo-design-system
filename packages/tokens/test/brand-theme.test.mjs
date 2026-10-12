import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { test } from 'node:test';
import { flatten, load, targetOf } from '../lib/resolve.mjs';
import { BRANDS, MODES } from '../lib/themes.mjs';

const ROLES = ['fill', 'fill-hover', 'fill-pressed', 'fill-subtle', 'on-fill', 'text', 'text-hover', 'border'];
const EXPECTED = MODES.flatMap((mode) => ROLES.map((role) => `color.brand.${mode.id}.${role}`));
const primitives = flatten(load('primitive/color.json'), 'primitive');
const brands = BRANDS.map((brand) => ({ ...brand, tokens: flatten(load(`brand/${brand.id}.json`), 'brand') }));

test('there is one Brand Theme file per brand in lib/themes.mjs, and nothing else', () => {
  const files = readdirSync(new URL('../src/brand/', import.meta.url)).sort();
  assert.deepEqual(files, BRANDS.map((brand) => `${brand.id}.json`).sort());
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
