import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { AA_TEXT, contrast } from '../lib/contrast.mjs';

const load = (file) => JSON.parse(readFileSync(new URL(`../src/${file}`, import.meta.url), 'utf8'));
const sources = {
  primitive: load('primitive/color.json'),
  brand: load('brand/uic.json'),
  semantic: load('semantic/color.json'),
};

// Flatten every token to "color.bg.default" → { value, layer, description }.
function flatten(node, path, layer, out) {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    const next = [...path, key];
    if ('$value' in child) out[next.join('.')] = { value: child.$value, layer, description: child.$description };
    else flatten(child, next, layer, out);
  }
  return out;
}
const tokens = {};
for (const [layer, json] of Object.entries(sources)) flatten(json, [], layer, tokens);

const REF = /^\{([^}]+)\}$/;
const targetOf = (t) => String(t.value).match(REF)?.[1];
const layer = (name) => Object.entries(tokens).filter(([, t]) => t.layer === name);

function resolve(name, seen = []) {
  const t = tokens[name];
  assert.ok(t, `token ${name} does not exist`);
  assert.ok(!seen.includes(name), `circular reference: ${[...seen, name].join(' → ')}`);
  const target = targetOf(t);
  return target ? resolve(target, [...seen, name]) : t.value;
}

test('Brand Theme and Semantic tokens are aliases, never raw hex', () => {
  for (const [name, t] of [...layer('brand'), ...layer('semantic')]) {
    assert.match(String(t.value), REF, `${name} = ${t.value}`);
  }
});

test('Brand Theme points at primitives; Semantic points at primitives or Brand Theme', () => {
  for (const [name, t] of layer('brand')) {
    assert.equal(tokens[targetOf(t)]?.layer, 'primitive', `${name} → ${t.value}`);
  }
  for (const [name, t] of layer('semantic')) {
    assert.ok(['primitive', 'brand'].includes(tokens[targetOf(t)]?.layer), `${name} → ${t.value}`);
  }
});

test('every Brand Theme and Semantic token has a description', () => {
  for (const [name, t] of [...layer('brand'), ...layer('semantic')]) {
    assert.ok(t.description?.trim(), `${name} has no description`);
  }
});

// Text needs 4.5:1 and icons and borders 3:1 against the background they are normally used on.
const NON_TEXT = 3;
const PAIRS = [
  ['text.default', 'bg.default', AA_TEXT],
  ['text.secondary', 'bg.tertiary', AA_TEXT],
  ['text.tertiary', 'bg.tertiary', AA_TEXT],
  ['text.inverse', 'bg.inverse', AA_TEXT],
  ['text.brand', 'bg.brand-subtle', AA_TEXT],
  ['text.link', 'bg.secondary', AA_TEXT],
  ['text.link-hover', 'bg.default', AA_TEXT],
  ['text.on-brand', 'bg.brand', AA_TEXT],
  ['text.on-brand', 'bg.brand-hover', AA_TEXT],
  ['text.on-brand', 'bg.brand-pressed', AA_TEXT],
  ['text.on-error', 'bg.error', AA_TEXT],
  ['text.on-error', 'bg.error-hover', AA_TEXT],
  ['text.on-error', 'bg.error-pressed', AA_TEXT],
  ['text.on-success', 'bg.success', AA_TEXT],
  ['text.on-warning', 'bg.warning', AA_TEXT],
  ['text.on-info', 'bg.info', AA_TEXT],
  ['text.error', 'bg.error-subtle', AA_TEXT],
  ['text.success', 'bg.success-subtle', AA_TEXT],
  ['text.warning', 'bg.warning-subtle', AA_TEXT],
  ['text.info', 'bg.info-subtle', AA_TEXT],
  ['icon.default', 'bg.default', NON_TEXT],
  ['icon.secondary', 'bg.default', NON_TEXT],
  ['icon.inverse', 'bg.inverse', NON_TEXT],
  ['icon.brand', 'bg.default', NON_TEXT],
  ['icon.on-brand', 'bg.brand', NON_TEXT],
  ['icon.error', 'bg.error-subtle', NON_TEXT],
  ['icon.success', 'bg.success-subtle', NON_TEXT],
  ['icon.warning', 'bg.warning-subtle', NON_TEXT],
  ['icon.info', 'bg.info-subtle', NON_TEXT],
  ['border.strong', 'bg.default', NON_TEXT],
  ['border.brand', 'bg.default', NON_TEXT],
  ['border.focus', 'bg.default', NON_TEXT],
  ['border.error', 'bg.default', NON_TEXT],
  ['border.success', 'bg.default', NON_TEXT],
  ['border.warning', 'bg.default', NON_TEXT],
  ['border.info', 'bg.default', NON_TEXT],
];

test('text, icon and border tokens stay readable on their usual background (UIC, Light)', () => {
  for (const [fg, bg, min] of PAIRS) {
    const ratio = contrast(resolve(`color.${fg}`), resolve(`color.${bg}`));
    assert.ok(ratio >= min, `color.${fg} on color.${bg}: ${ratio.toFixed(2)}:1, needs ${min}:1`);
  }
});
