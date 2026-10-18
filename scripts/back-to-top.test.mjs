import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const source = readFileSync(new URL('../src/components/back-to-top.tsx', import.meta.url), 'utf8');
const output = ts.transpileModule(source, { compilerOptions: {
  module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
} }).outputText;

// Execute the real component with browser API doubles; no layout is simulated.
function load(react = React, browser = {}) {
  const entry = { exports: {} };
  vm.runInNewContext(output, {
    module: entry, exports: entry.exports, ...browser,
    require: name => name === 'react' ? react : name.endsWith('.module.css')
      ? { __esModule: true, default: { control: 'control' } } : require(name),
  });
  return entry.exports.BackToTop;
}

test('server rendering stays hidden without accessing browser APIs', () => {
  assert.equal(renderToStaticMarkup(React.createElement(load())), '');
});

test('threshold, native button, passive subscription cleanup and motion preference', () => {
  let subscription;
  let reducedMotion = false;
  let listener;
  const calls = [];
  const window = {
    scrollY: 0,
    addEventListener: (event, callback, options) => {
      assert.equal(event, 'scroll');
      assert.equal(options.passive, true);
      listener = callback;
    },
    removeEventListener: (event, callback) => {
      assert.equal(event, 'scroll');
      assert.equal(callback, listener);
      listener = undefined;
    },
    matchMedia: query => {
      assert.equal(query, '(prefers-reduced-motion: reduce)');
      return { matches: reducedMotion };
    },
    scrollTo: options => calls.push(['scroll', options.top, options.behavior]),
  };
  const document = { getElementById: id => {
    assert.equal(id, 'main');
    return { focus: options => calls.push(['focus', options.preventScroll]) };
  } };
  const BackToTop = load({ useSyncExternalStore: (subscribe, snapshot, serverSnapshot) => {
    subscription = subscribe;
    assert.equal(serverSnapshot(), false);
    return snapshot();
  } }, { window, document });

  for (const offset of [0, 399, 400]) {
    window.scrollY = offset;
    assert.equal(BackToTop(), null);
  }
  window.scrollY = 401;
  const button = BackToTop();
  assert.equal(button.type, 'button');
  assert.equal(button.props.type, 'button');
  assert.equal(button.props['aria-label'], 'Back to top');
  assert.equal(button.props.children.props['aria-hidden'], 'true');

  let notifications = 0;
  const unsubscribe = subscription(() => notifications++);
  listener();
  assert.equal(notifications, 1);
  unsubscribe();
  assert.equal(listener, undefined);

  button.props.onClick();
  reducedMotion = true;
  button.props.onClick();
  assert.deepEqual(calls, [
    ['focus', true], ['scroll', 0, 'smooth'],
    ['focus', true], ['scroll', 0, 'instant'],
  ]);
  window.scrollY = 0;
  assert.equal(BackToTop(), null);
});
