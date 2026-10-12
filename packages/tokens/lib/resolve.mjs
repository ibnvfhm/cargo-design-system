import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

export const load = (file) => JSON.parse(readFileSync(new URL(`../src/${file}`, import.meta.url), 'utf8'));

// Flatten every token to "color.bg.default" → { value, layer, description }.
export function flatten(node, layer, path = [], out = {}) {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    const next = [...path, key];
    if ('$value' in child) out[next.join('.')] = { value: child.$value, layer, description: child.$description };
    else flatten(child, layer, next, out);
  }
  return out;
}

// Everything one build sees: the primitives, one brand and one semantic mode.
export function loadTheme(brand, mode) {
  return {
    ...flatten(load('primitive/color.json'), 'primitive'),
    ...flatten(load(`brand/${brand}.json`), 'brand'),
    ...flatten(load(`semantic/${mode}.json`), 'semantic'),
  };
}

export const REF = /^\{([^}]+)\}$/;
export const targetOf = (token) => String(token.value).match(REF)?.[1];

export function resolve(tokens, name, seen = []) {
  const token = tokens[name];
  assert.ok(token, `token ${name} does not exist`);
  assert.ok(!seen.includes(name), `circular reference: ${[...seen, name].join(' → ')}`);
  const target = targetOf(token);
  return target ? resolve(tokens, target, [...seen, name]) : token.value;
}
