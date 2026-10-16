// Builds dist/: one JavaScript file and one .d.ts per source module (tsc), and every style in dist/styles.css.
import { execFileSync } from 'node:child_process';
import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join, relative } from 'node:path';
import { bundle } from 'lightningcss';

const require = createRequire(import.meta.url);
const root = new URL('..', import.meta.url).pathname;
const at = (...parts) => join(root, ...parts);

await rm(at('dist'), { recursive: true, force: true });

// tsc keeps each module separate, so a 'use client' directive stays the first statement of its own file.
// The typescript package does not export its bin path, so it is found next to its package.json.
const tsc = join(dirname(require.resolve('typescript/package.json')), 'bin', 'tsc');
execFileSync(process.execPath, [tsc, '-p', at('tsconfig.build.json')], { stdio: 'inherit' });

const header = [
  '/*',
  ' * Jangan edit file ini langsung.',
  ' * Dibuat otomatis dari packages/react/src dengan `npm run build`.',
  ' */',
  '',
].join('\n');
const { code } = bundle({ filename: at('src/styles.css'), minify: false });
await writeFile(at('dist/styles.css'), header + code.toString());

// Every source module that starts with 'use client' must still start with it in dist.
async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else yield path;
  }
}
const lost = [];
for await (const file of files(at('src'))) {
  if (!/\.tsx?$/.test(file) || /\.test\.tsx?$/.test(file)) continue;
  const source = await readFile(file, 'utf8');
  if (!/^['"]use client['"]/.test(source)) continue;
  const out = at('dist', relative(at('src'), file).replace(/\.tsx?$/, '.js'));
  if (!/^['"]use client['"]/.test(await readFile(out, 'utf8'))) lost.push(relative(root, out));
}
if (lost.length) throw new Error(`'use client' hilang di: ${lost.join(', ')}`);
console.log('✔︎ dist/ (JavaScript, .d.ts) dan dist/styles.css');
