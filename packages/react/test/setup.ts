import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach } from 'vitest';

// React's act() needs this flag; Testing Library sets it only around its own helpers.
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// Any React warning (act, keys, hydration, invalid props) fails the test that caused it.
const errors: unknown[][] = [];
const originalError = console.error;
beforeEach(() => {
  errors.length = 0;
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };
});
afterEach(async () => {
  if (typeof document !== 'undefined') (await import('@testing-library/react')).cleanup();
  console.error = originalError;
  if (errors.length) throw new Error(`console.error dipanggil:\n${errors.map((args) => args.map(String).join(' ')).join('\n')}`);
});

// jsdom has no layout APIs; components that measure or float need these to exist. The server rendering test runs in
// Node, where none of this applies.
if (typeof window !== 'undefined') {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver;
  window.matchMedia ??= ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
  // jsdom has no Popover API: showPopover/hidePopover toggle an attribute the tests can read.
  if (!('showPopover' in HTMLElement.prototype)) {
    Object.assign(HTMLElement.prototype, {
      showPopover(this: HTMLElement) {
        this.setAttribute('data-popover-open', '');
      },
      hidePopover(this: HTMLElement) {
        this.removeAttribute('data-popover-open');
      },
    });
  }
}
