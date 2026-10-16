// @vitest-environment node
// Next.js App Router: a module that uses hooks must start with 'use client'; one that doesn't stays a server component.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { expect, test } from 'vitest';

const SRC = new URL('../src/', import.meta.url).pathname;
const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => (entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]));
// useId, useMemo and useCallback also work in server components, so they alone don't make a client module.
const HOOKS = /\buse(State|Effect|LayoutEffect|InsertionEffect|Ref|Context|Reducer|SyncExternalStore|Transition|DeferredValue|ImperativeHandle|Floating|Controllable[A-Za-z]*)\(|\bcreateContext\(/;
const modules = walk(SRC)
  .filter((file) => /\.tsx?$/.test(file) && !/\.test\.tsx?$/.test(file) && !/\.meta\.ts$|meta(-types)?\.ts$/.test(file))
  .map((file) => ({ name: relative(SRC, file), source: readFileSync(file, 'utf8') }));

test.each(modules)("$name has 'use client' exactly when it uses hooks", ({ source }) => {
  const client = /^['"]use client['"];?/.test(source);
  expect(client).toBe(HOOKS.test(source));
});

test("the entry point never has 'use client'", () => {
  expect(readFileSync(join(SRC, 'index.ts'), 'utf8')).not.toMatch(/['"]use client['"]/);
});
