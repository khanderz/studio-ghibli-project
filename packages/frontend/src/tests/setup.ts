import { cleanup } from '@testing-library/react';
import { expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});
