import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { flatten, load } from '../lib/resolve.mjs';

const MODES = ['desktop', 'mobile'];
const NON_ROLE = ['font-family', 'font-weight'];
const PROPS = ['font-size', 'line-height', 'letter-spacing'];
const files = Object.fromEntries(MODES.map((mode) => [mode, load(`typography/${mode}.json`)]));
const tokens = Object.fromEntries(MODES.map((mode) => [mode, flatten(files[mode], mode)]));
const roles = Object.keys(files.desktop).filter((group) => !group.startsWith('$') && !NON_ROLE.includes(group));
const px = (value, name) => {
  const match = /^(-?\d+(\.\d+)?)px$/.exec(value);
  assert.ok(match, `${name} = ${value} is not in px`);
  return Number(match[1]);
};

test('Desktop and Mobile define the same tokens, in the same order, with the same descriptions', () => {
  assert.deepEqual(Object.keys(tokens.mobile), Object.keys(tokens.desktop));
  for (const [name, token] of Object.entries(tokens.desktop)) {
    assert.ok(token.description?.trim(), `${name} has no description`);
    assert.equal(tokens.mobile[name].description, token.description, name);
  }
});

test('font families and weights are the same in both modes', () => {
  for (const [name, token] of Object.entries(tokens.desktop)) {
    if (NON_ROLE.includes(name.split('.')[0])) assert.equal(tokens.mobile[name].value, token.value, name);
  }
});

test('font weights are 100–900 in steps of 100', () => {
  for (const [key, token] of Object.entries(files.desktop['font-weight']).filter(([k]) => !k.startsWith('$'))) {
    assert.ok(Number.isInteger(token.$value / 100) && token.$value >= 100 && token.$value <= 900, `font-weight.${key} = ${token.$value}`);
  }
});

test('every role has font-size, line-height and letter-spacing in px, typed fontSize so Android gets sp', () => {
  for (const mode of MODES) {
    for (const role of roles) {
      assert.equal(files[mode][role].$type, 'fontSize', `${mode}: ${role}`);
      assert.deepEqual(Object.keys(files[mode][role]).filter((key) => !key.startsWith('$')), PROPS, `${mode}: ${role}`);
      for (const prop of PROPS) px(files[mode][role][prop].$value, `${mode}: ${role}.${prop}`);
    }
  }
});

test('line height is at least the font size, and letter spacing stays within 5% of it', () => {
  for (const mode of MODES) {
    for (const role of roles) {
      const [size, lineHeight, letterSpacing] = PROPS.map((prop) => px(files[mode][role][prop].$value, `${role}.${prop}`));
      assert.ok(lineHeight >= size, `${mode}: ${role} line-height ${lineHeight} < font-size ${size}`);
      assert.ok(Math.abs(letterSpacing) <= size * 0.05, `${mode}: ${role} letter-spacing ${letterSpacing}px`);
    }
  }
});

test('no role is smaller on desktop than on mobile', () => {
  for (const role of roles) {
    const [desktop, mobile] = MODES.map((mode) => px(files[mode][role]['font-size'].$value, role));
    assert.ok(desktop >= mobile, `${role}: desktop ${desktop}px < mobile ${mobile}px`);
  }
});

// The built CSS switches to Desktop sizes from 768px, and data-device="desktop" or "mobile" forces one of the two for
// an element and everything inside it (dist/ is committed with src/, so it is checked here too).
test('every brand CSS file has the Desktop media block and both data-device scopes, with every role', () => {
  const css = readFileSync(new URL('../dist/css/uic.css', import.meta.url), 'utf8');
  const block = (selector) => {
    const start = css.indexOf(`${selector} {`);
    assert.ok(start >= 0, `${selector} is missing`);
    return css.slice(start, css.indexOf('}', start));
  };
  const scopes = {
    desktop: [block(':root:not([data-device="mobile"])'), block('[data-device="desktop"]')],
    mobile: [block('[data-device="mobile"]')],
  };
  assert.ok(css.includes('@media (min-width: 768px) {\n  :root:not([data-device="mobile"]) {'), 'Desktop sizes start at 768px');
  for (const [mode, blocks] of Object.entries(scopes)) {
    for (const text of blocks) {
      for (const role of roles) {
        for (const prop of PROPS) {
          assert.ok(text.includes(`--cargo-${role}-${prop}: ${files[mode][role][prop].$value};`), `${mode}: ${role}.${prop}`);
        }
      }
    }
  }
});
