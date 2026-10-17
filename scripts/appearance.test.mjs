import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function environment({ query = '', stored = null, dark = false, blocked = false } = {}) {
  const root = { dataset: {} };
  const media = { matches: dark };
  const meta = { setAttribute(name, value) { this[name] = value; } };
  const anchors = ['/#projects', '/paths/software', '/projects/reactis?other=keep#scope', '#main', 'https://github.com/example', 'mailto:test@example.com'].map(href => ({
    href, getAttribute() { return this.href; },
  }));
  const globals = {
    URL, URLSearchParams,
    location: { href: `https://portfolio.example/${query}`, origin: 'https://portfolio.example', search: query },
    localStorage: { getItem() { if (blocked) throw new Error('Storage blocked'); return stored; } },
    matchMedia: () => media,
    document: { documentElement: root, querySelector: () => meta, querySelectorAll: () => anchors },
  };
  const exports = {};
  const source = readFileSync(new URL('../src/components/appearance.ts', import.meta.url), 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  vm.runInNewContext(output, { ...globals, exports });
  return { ...globals, root, meta, media, anchors, api: exports };
}

function boot(env) {
  const source = readFileSync(new URL('../src/components/appearance-boot.ts', import.meta.url), 'utf8');
  const exports = {};
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports });
  vm.runInNewContext(exports.appearanceBoot, env);
}

for (const scenario of [
  { label: 'first visit follows the OS', dark: true, expected: 'dark' },
  { label: 'manual storage overrides the OS', stored: 'light', dark: true, expected: 'light' },
  { label: 'query overrides storage', query: '?appearance=dark', stored: 'light', expected: 'dark' },
  { label: 'invalid query falls back to storage', query: '?appearance=invalid', stored: 'dark', expected: 'dark' },
  { label: 'invalid stored choice follows the OS', stored: 'invalid', dark: true, expected: 'dark' },
  { label: 'blocked storage preserves query fallback', blocked: true, query: '?appearance=dark', expected: 'dark' },
  { label: 'blocked storage without query follows the OS', blocked: true, dark: true, expected: 'dark' },
]) {
  test(`production theme boot: ${scenario.label}`, () => {
    const env = environment(scenario);
    boot(env);
    assert.equal(env.root.dataset.theme, scenario.expected);
    assert.equal(env.meta.content, scenario.expected === 'dark' ? '#141519' : '#F6F6F5');
    const preference = env.api.readPreference();
    env.api.apply(preference);
    assert.equal(env.root.dataset.theme, scenario.expected, 'post-hydration selection agrees with the pre-paint script');
  });
}

test('production appearance propagates through internal links without changing external links or skip anchors', () => {
  const env = environment({ blocked: true, query: '?appearance=dark' });
  env.api.apply('dark');
  assert.deepEqual(env.anchors.map(anchor => anchor.href), [
    '/?appearance=dark#projects', '/paths/software?appearance=dark',
    '/projects/reactis?other=keep&appearance=dark#scope', '#main',
    'https://github.com/example', 'mailto:test@example.com',
  ]);
  env.api.apply('system');
  assert.equal(env.root.dataset.theme, 'light');
  assert.equal(env.anchors[1].href, '/paths/software?appearance=system');
});

test('System follows a changed OS preference while a manual choice stays fixed', () => {
  const env = environment();
  env.api.apply('system');
  assert.equal(env.root.dataset.theme, 'light');
  env.media.matches = true;
  env.api.apply('system');
  assert.equal(env.root.dataset.theme, 'dark');
  env.api.apply('light');
  assert.equal(env.root.dataset.theme, 'light');
});
