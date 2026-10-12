import assert from 'node:assert/strict';
import { test } from 'node:test';
import { flatten, load, REF, targetOf } from '../lib/resolve.mjs';
import { BRANDS, MODES } from '../lib/themes.mjs';

const primitives = flatten(load('primitive/color.json'), 'primitive');
// Every brand file has the same token names (checked in brand-theme.test.mjs), so one is enough here.
const brand = flatten(load(`brand/${BRANDS[0].id}.json`), 'brand');
const semantic = Object.fromEntries(MODES.map((mode) => [mode.id, flatten(load(`semantic/${mode.id}.json`), 'semantic')]));

test('Light and Dark define the same tokens, in the same order', () => {
  assert.deepEqual(Object.keys(semantic.dark), Object.keys(semantic.light));
});

test('Semantic tokens are aliases, never raw hex', () => {
  for (const mode of MODES) {
    for (const [name, token] of Object.entries(semantic[mode.id])) {
      assert.match(String(token.value), REF, `${mode.name}: ${name} = ${token.value}`);
    }
  }
});

test('Light points at primitives or brand.light; Dark at primitives or brand.dark', () => {
  for (const mode of MODES) {
    for (const [name, token] of Object.entries(semantic[mode.id])) {
      const target = targetOf(token);
      const ok = primitives[target] || (brand[target] && target.startsWith(`color.brand.${mode.id}.`));
      assert.ok(ok, `${mode.name}: ${name} → ${token.value}`);
    }
  }
});

test('every Semantic token has a description, the same in Light and Dark', () => {
  for (const [name, token] of Object.entries(semantic.light)) {
    assert.ok(token.description?.trim(), `${name} has no description`);
    assert.equal(semantic.dark[name].description, token.description, name);
  }
});
