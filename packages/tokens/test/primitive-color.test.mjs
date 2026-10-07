import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { luminance } from '../lib/contrast.mjs';

const tokens = JSON.parse(readFileSync(new URL('../src/primitive/color.json', import.meta.url), 'utf8'));
const color = tokens.color;
const STEPS = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'];
const HEX = /^#[0-9A-F]{6}$/;
const palettes = Object.keys(color).filter((key) => !key.startsWith('$') && !('$value' in color[key]));

test('every colour token is a 6-digit uppercase hex', () => {
  for (const key of Object.keys(color).filter((k) => !k.startsWith('$'))) {
    const node = color[key];
    const leaves = '$value' in node ? [[key, node]] : STEPS.map((s) => [`${key}.${s}`, node[s]]);
    for (const [name, leaf] of leaves) {
      assert.ok(leaf, `color.${name} is missing`);
      assert.match(leaf.$value, HEX, `color.${name} = ${leaf.$value}`);
    }
  }
});

test('every palette has exactly the steps 10–100', () => {
  for (const name of palettes) {
    const steps = Object.keys(color[name]).filter((k) => !k.startsWith('$'));
    assert.deepEqual(steps, STEPS, `palette ${name}`);
  }
});

test('every palette goes from light (10) to dark (100)', () => {
  for (const name of palettes) {
    const values = STEPS.map((s) => color[name][s].$value);
    for (let i = 1; i < values.length; i++) {
      assert.ok(
        luminance(values[i]) < luminance(values[i - 1]),
        `color.${name}.${STEPS[i]} (${values[i]}) is not darker than color.${name}.${STEPS[i - 1]} (${values[i - 1]})`,
      );
    }
  }
});
