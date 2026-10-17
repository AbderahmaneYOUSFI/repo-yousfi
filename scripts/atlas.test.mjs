import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const root = resolve(import.meta.dirname, '..');
const cache = new Map();

// Run the actual React components and source data with the existing compiler.
// This exercises SSR and native control contracts; it does not simulate a browser layout.
function load(file, sourceOverride) {
  if (cache.has(file)) return cache.get(file).exports;
  const entry = { exports: {} };
  cache.set(file, entry);
  const source = sourceOverride ?? readFileSync(file, 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
    jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
  } }).outputText;
  const localRequire = name => {
    if (name.endsWith('.module.css')) {
      const css = readFileSync(resolve(dirname(file), name), 'utf8');
      const styles = Object.fromEntries([...css.matchAll(/\.([a-zA-Z][\w-]*)/g)].map(([, className]) => [className, `scoped-${className}`]));
      return { __esModule: true, default: styles };
    }
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
        assert.equal(card.href, `${slug ? '/' : ''}#${project.id}`);
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
    assert.ok(!html.includes('atlas-card-arrow'), 'compact project entries have no permanent chevrons');

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

test('Home restores the e4efd46 personal composition, biography, CTAs and organic paths', () => {
  const { Hero } = load(resolve(root, 'src/components/hero.tsx'));
  const { profile } = load(resolve(root, 'src/data/profile.ts'));
  const historicalSource = execFileSync('git', ['show', 'e4efd46:src/components/hero.tsx'], { cwd: root, encoding: 'utf8' });
  const { Hero: HistoricalHero } = load(resolve(root, 'src/components/historical-hero.test.tsx'), historicalSource);
  const html = renderToStaticMarkup(React.createElement(Hero));
  const personal = html.match(/<section aria-labelledby="hero-heading"[\s\S]*?<\/section>/)?.[0];
  assert.ok(personal, 'the historical personal section is present');
  const previous = renderToStaticMarkup(React.createElement(HistoricalHero));
  assert.deepEqual([...personal.matchAll(/\sd="([^"]+)"/g)].map(match => match[1]), [...previous.matchAll(/\sd="([^"]+)"/g)].map(match => match[1]), 'all four historical organic paths are preserved');
  for (const text of [profile.name, profile.role, profile.intro]) {
    const escaped = renderToStaticMarkup(React.createElement(React.Fragment, null, text));
    assert.ok(personal.includes(escaped), 'confirmed personal copy remains intact');
  }
  for (const cta of Object.values(profile.ctas)) {
    assert.ok(personal.includes(`href="${cta.href}"`));
    assert.ok(personal.includes(cta.label));
  }
  assert.equal([...personal.matchAll(/<a\b/g)].length, 2, 'the two historical CTAs are restored');
  assert.ok(html.indexOf('</section>') < html.indexOf('<figure class="atlas"'), 'the validated atlas remains a separate component after the personal hero in DOM order');
  const css = readFileSync(resolve(root, 'src/components/hero.module.css'), 'utf8');
  assert.ok(css.includes('font-family: Georgia, "Times New Roman", serif;'));
  assert.ok(!css.includes('--organic-') && !/#[0-9a-f]{3,8}\b/i.test(css), 'the restored hero uses existing V2 theme tokens only');
});

test('the three career Hero introductions and CTAs stay unchanged', () => {
  const { Hero } = load(resolve(root, 'src/components/hero.tsx'));
  const previousSource = execFileSync('git', ['show', 'b098a0b:src/components/hero.tsx'], { cwd: root, encoding: 'utf8' });
  const { Hero: PreviousHero } = load(resolve(root, 'src/components/previous-career-hero.test.tsx'), previousSource);
  for (const slug of modes.filter(Boolean)) {
    const before = renderToStaticMarkup(React.createElement(PreviousHero, { slug })).split('<figure class="atlas"')[0];
    const after = renderToStaticMarkup(React.createElement(Hero, { slug })).split('<figure class="atlas"')[0];
    assert.equal(after, before, slug);
  }
});

test('one Home selection renders matching existing hero, active counts, controls and Home anchors in all four states', () => {
  const { Hero } = load(resolve(root, 'src/components/hero.tsx'));
  const initial = Hero({});
  const edges = html => [...html.matchAll(/<path[^>]*data-path="[^"]+"[^>]*>/g)].map(match => match[0]);
  const global = renderToStaticMarkup(initial);
  // Seed the actual shared provider for SSR contracts. Browser clicks/layout are separate QA.
  for (const selected of [null, 'ai-data', 'software', 'digital', null]) {
    const html = renderToStaticMarkup(React.cloneElement(initial, { selected }));
    const active = projects.filter(project => !selected || project.careerPaths.includes(selected));
    const desktop = [...html.matchAll(/<(a|span)\b([^>]*data-project-id="[^"]+"[^>]*)>/g)]
      .map(([, tag, attrs]) => ({ tag, ...attributes(attrs) })).filter(card => card.class.includes('atlas-node'));
    assert.equal(desktop.filter(card => card.tag === 'a').length, active.length);
    assert.deepEqual(desktop.filter(card => card.tag === 'a').map(card => card['data-project-id']), Array.from(active, project => project.id));
    assert.ok(desktop.filter(card => card.tag === 'a').every(card => card.href === `#${card['data-project-id']}`), 'Home selection never changes anchor destinations');
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, 'only the selected presentation is exposed');
    assert.deepEqual(edges(html), edges(global), 'all twelve original connections stay identical');
    assert.match(html, /aria-live="polite" aria-atomic="true"/);
    assert.ok(html.includes(`data-selection="${selected ?? 'all'}"`));
    const controls = [...html.matchAll(/<button\b([^>]*data-filter="[^"]+"[^>]*)>/g)].map(([, attrs]) => attributes(attrs));
    assert.ok(controls.every(control => control.type === 'button' && control['aria-pressed'] === String(control['data-filter'] === (selected ?? 'all'))));
    if (selected) {
      const route = renderToStaticMarkup(React.createElement(Hero, { slug: selected }));
      const copy = text => text.match(/<div class="hero-copy">[\s\S]*?<\/h1>[\s\S]*?<p class="availability">[\s\S]*?<\/p><\/div><\/div>/)?.[0];
      assert.ok(copy(route));
      assert.equal(copy(html), copy(route), 'Home reuses the exact route presentation, typography classes and CTAs');
      assert.ok(html.includes(`data-identity="${pathIdentity[selected]}"`));
      assert.ok(html.includes(`${active.length} active / 9 projects`));
      assert.ok(html.includes(`${active.length} active projects.`), 'the live caption announces the current count');
      assert.ok(!html.includes('id="hero-heading"'), 'the personal hero is not duplicated under the selected presentation');
    } else {
      assert.equal(html, global, 'returning to Global restores the full initial personal composition and graph');
    }
  }
});
