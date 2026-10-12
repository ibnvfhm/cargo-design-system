import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { contrast } from '../lib/contrast.mjs';
import { PAIRS } from '../lib/pairs.mjs';
import { loadTheme, resolve } from '../lib/resolve.mjs';
import { BRANDS, MODES } from '../lib/themes.mjs';

// Pairs the designer chose to keep below the minimum. Any other pair below its minimum fails.
const exceptions = JSON.parse(readFileSync(new URL('../contrast-exceptions.json', import.meta.url), 'utf8'));
const label = (fg, bg) => `color.${fg} on color.${bg}`;

for (const brand of BRANDS) {
  for (const mode of MODES) {
    test(`${brand.name}, ${mode.name}: text, icons and borders reach their minimum contrast, apart from recorded exceptions`, () => {
      const tokens = loadTheme(brand.id, mode.id);
      const recorded = exceptions[brand.id]?.[mode.id] ?? [];
      for (const [fg, bg] of recorded) {
        assert.ok(PAIRS.some((p) => p[0] === fg && p[1] === bg), `${label(fg, bg)} is recorded but is not in lib/pairs.mjs`);
      }
      for (const [fg, bg, min] of PAIRS) {
        const ratio = contrast(resolve(tokens, `color.${fg}`), resolve(tokens, `color.${bg}`));
        if (recorded.some((p) => p[0] === fg && p[1] === bg)) {
          assert.ok(ratio < min, `${label(fg, bg)} now reaches ${ratio.toFixed(2)}:1; remove it from contrast-exceptions.json`);
        } else {
          assert.ok(ratio >= min, `${label(fg, bg)}: ${ratio.toFixed(2)}:1, needs ${min}:1`);
        }
      }
    });
  }
}

test('contrast-exceptions.json only names known brands and modes', () => {
  for (const [brandId, modes] of Object.entries(exceptions)) {
    if (brandId.startsWith('$')) continue;
    assert.ok(BRANDS.some((brand) => brand.id === brandId), `unknown brand ${brandId}`);
    for (const modeId of Object.keys(modes)) assert.ok(MODES.some((mode) => mode.id === modeId), `unknown mode ${brandId}.${modeId}`);
  }
});
