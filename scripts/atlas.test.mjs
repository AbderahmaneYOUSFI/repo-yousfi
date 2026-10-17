import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const root = resolve(import.meta.dirname, '..');
const cache = new Map();

// Run the actual React components and source data with the existing compiler.
// This exercises SSR and native control contracts; it does not simulate a browser layout.
function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const entry = { exports: {} };
  cache.set(file, entry);
  const source = readFileSync(file, 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
    jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
  } }).outputText;
  const localRequire = name => {
    if (!name.startsWith('.') && !name.startsWith('@/')) return require(name);
    const base = name.startsWith('@/') ? resolve(root, 'src', name.slice(2)) : resolve(dirname(file), name);
    const target = ['.ts', '.tsx'].map(extension => base + extension).find(existsSync);
    assert.ok(target, `Resolvable source module: ${name}`);
    return load(target);
  };
  vm.runInNewContext(output, { module: entry, exports: entry.exports, require: localRequire }, { filename: file });
  return entry.exports;
}

const { SystemsAtlas } = load(resolve(root, 'src/components/systems-atlas.tsx'));
const { projects } = load(resolve(root, 'src/data/projects.ts'));
const { pathIdentity } = load(resolve(root, 'src/components/atlas-presentation.ts'));
const modes = [undefined, 'ai-data', 'software', 'digital'];
const attributes = text => Object.fromEntries([...text.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, name, value]) => [name, value]));

for (const slug of modes) {
  test(`production React atlas: ${slug ?? 'Home global'} filters both layouts without changing the network`, () => {
    const html = renderToStaticMarkup(React.createElement(SystemsAtlas, { slug }));
    const cards = [...html.matchAll(/<(a|span)\b([^>]*\bdata-project-id="[^"]+"[^>]*)>/g)]
      .map(([, tag, attrs]) => ({ tag, ...attributes(attrs) }));
    const desktop = cards.filter(card => card.class.includes('atlas-node'));
    const mobile = cards.filter(card => card.class.includes('mobile-project'));
    assert.equal(desktop.length, 9);
    assert.equal(new Set(desktop.map(card => card['data-project-id'])).size, 9);
    assert.equal(mobile.length, 12);
    assert.equal([...html.matchAll(/data-path="/g)].length, 12);
    assert.ok(html.includes(`data-selection="${slug ?? 'all'}"`));
    assert.ok(html.includes(`data-active="${slug ? pathIdentity[slug] : ''}"`));

    for (const card of cards) {
      const project = projects.find(project => project.id === card['data-project-id']);
      const active = !slug || project.careerPaths.includes(slug);
      assert.equal(card['data-project-active'], String(active), project.id);
      if (active) {
        assert.equal(card.tag, 'a');
        assert.equal(card.href, `/projects/${project.id}`);
        assert.equal(card['aria-disabled'], undefined);
      } else {
        assert.equal(card.tag, 'span');
        assert.equal(card.href, undefined, 'disabled cards expose no URL, including via context menus');
        assert.equal(card.tabindex, undefined, 'disabled cards are not keyboard stops');
        assert.equal(card['aria-disabled'], 'true');
        assert.equal(card.role, 'link');
        assert.match(card['aria-label'], /Outside selected perspective/);
      }
    }
    const expectedActive = projects.filter(project => !slug || project.careerPaths.includes(slug)).length;
    assert.equal(desktop.filter(card => card.tag === 'a').length, expectedActive);
    assert.equal([...html.matchAll(/class="atlas-card-arrow"/g)].length, cards.filter(card => card.tag === 'a').length, 'only active cards have an arrow');

    const controls = [...html.matchAll(/<button\b([^>]*data-filter="[^"]+"[^>]*)>/g)].map(([, attrs]) => attributes(attrs));
    assert.equal(controls.length, 7, 'one global control, three desktop controls, three mobile controls');
    for (const control of controls) {
      assert.equal(control.type, 'button', 'native buttons support Enter and Space');
      assert.equal(control['aria-pressed'], String(control['data-filter'] === (slug ?? 'all')));
    }
  });
}

test('shared projects remain active in each of their real perspectives', () => {
  for (const project of projects.filter(project => project.careerPaths.length > 1)) {
    for (const slug of project.careerPaths) {
      const html = renderToStaticMarkup(React.createElement(SystemsAtlas, { slug }));
      const entries = [...html.matchAll(/<a\b([^>]*data-project-id="[^"]+"[^>]*)>/g)]
        .map(([, attrs]) => attributes(attrs)).filter(card => card['data-project-id'] === project.id);
      assert.equal(entries.length, 1 + project.careerPaths.length, `${project.id} in ${slug}: desktop and both mobile associations`);
      assert.ok(entries.every(card => card['data-project-active'] === 'true'));
    }
  }
});
