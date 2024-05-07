import '@testing-library/jest-dom';
import 'resize-observer-polyfill';
window.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
