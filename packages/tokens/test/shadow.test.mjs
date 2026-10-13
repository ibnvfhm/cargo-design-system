import assert from 'node:assert/strict';
import { test } from 'node:test';
import { flatten, load } from '../lib/resolve.mjs';
import { MODES } from '../lib/themes.mjs';

const shadows = load('shadow/shadow.json').shadow;
const rings = load('semantic/focus-ring.json')['focus-ring'];
const entries = (group) => Object.entries(group).filter(([key]) => !key.startsWith('$'));
const PX = /^-?\d+px$/;

test('elevation shadows: sm, md, lg, top and inner, each a black shadow in px', () => {
  assert.equal(shadows.$type, 'shadow');
  assert.deepEqual(entries(shadows).map(([key]) => key), ['sm', 'md', 'lg', 'top', 'inner']);
  for (const [key, token] of entries(shadows)) {
    const { color, offsetX, offsetY, blur, spread, inset } = token.$value;
    assert.match(color, /^#000000[0-9A-F]{2}$/, `shadow.${key} color ${color}`);
    for (const value of [offsetX, offsetY, blur, spread]) assert.match(value, PX, `shadow.${key}: ${value}`);
    assert.equal(Boolean(inset), key === 'inner', `shadow.${key} inset`);
    assert.ok(token.$description?.trim(), `shadow.${key} has no description`);
  }
});

test('sm, md and lg get softer and further away in that order', () => {
  const blur = (key) => parseInt(shadows[key].$value.blur, 10);
  assert.ok(blur('sm') < blur('md') && blur('md') < blur('lg'), 'blur must grow from sm to lg');
});

test('focus rings: 2px of the background, then the ring colour out to 4px', () => {
  assert.equal(rings.$type, 'shadow');
  const semantic = Object.fromEntries(MODES.map((mode) => [mode.id, flatten(load(`semantic/${mode.id}.json`), 'semantic')]));
  for (const [key, token] of entries(rings)) {
    assert.ok(token.$description?.trim(), `focus-ring.${key} has no description`);
    const [inner, outer] = token.$value;
    assert.equal(inner.color, '{color.bg.default}', `focus-ring.${key} inner ring`);
    assert.equal(inner.spread, '2px', `focus-ring.${key} inner spread`);
    assert.equal(outer.spread, '4px', `focus-ring.${key} outer spread`);
    for (const ring of [inner, outer]) {
      const target = ring.color.replace(/^\{(.*)\}$/, '$1');
      for (const mode of MODES) assert.ok(semantic[mode.id][target], `focus-ring.${key} points at ${target}, missing in ${mode.id}`);
    }
  }
});
