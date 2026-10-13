import assert from 'node:assert/strict';
import { test } from 'node:test';
import { load } from '../lib/resolve.mjs';

const GROUPS = ['space', 'radius', 'border-width'];
const groups = Object.fromEntries(GROUPS.map((group) => [group, load(`dimension/${group}.json`)[group]]));
const tokens = (group) => Object.entries(groups[group]).filter(([key]) => !key.startsWith('$'));
const px = (value) => {
  const match = /^(\d+)px$/.exec(value);
  assert.ok(match, `${value} is not a whole number of px`);
  return Number(match[1]);
};

test('every dimension token is a whole number of px, in a group typed as dimension', () => {
  for (const group of GROUPS) {
    assert.equal(groups[group].$type, 'dimension', group);
    for (const [, token] of tokens(group)) px(token.$value);
  }
});

test('every name is its value in px (space.16 = 16px), except radius.full', () => {
  for (const group of GROUPS) {
    for (const [key, token] of tokens(group)) {
      if (group === 'radius' && key === 'full') assert.equal(token.$value, '9999px');
      else assert.equal(token.$value, `${key}px`, `${group}.${key}`);
    }
  }
});

test('spacing and radius follow the 4px grid, plus 2 and 6 for small elements', () => {
  for (const group of ['space', 'radius']) {
    for (const [key, token] of tokens(group)) {
      if (key === 'full') continue;
      const value = px(token.$value);
      assert.ok(value % 4 === 0 || value === 2 || value === 6, `${group}.${key} = ${token.$value}`);
    }
  }
});

test('every scale goes from small to large', () => {
  for (const group of GROUPS) {
    const values = tokens(group).map(([, token]) => px(token.$value));
    for (let i = 1; i < values.length; i++) assert.ok(values[i] > values[i - 1], `${group}: ${values[i - 1]} then ${values[i]}`);
  }
});

test('every dimension token has a description', () => {
  for (const group of GROUPS) {
    for (const [key, token] of tokens(group)) assert.ok(token.$description?.trim(), `${group}.${key} has no description`);
  }
});
