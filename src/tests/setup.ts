import '@testing-library/jest-dom/vitest';

// Polyfill window.matchMedia for responsive UI and theme tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Polyfill ResizeObserver for chart containers and responsive layouts
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = MockResizeObserver as any;
global.ResizeObserver = MockResizeObserver as any;

// Polyfill window.scrollTo
window.scrollTo = () => {};

// Mock HTMLCanvasElement getContext for Leaflet/visual tests
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = (() => null) as any;
}
