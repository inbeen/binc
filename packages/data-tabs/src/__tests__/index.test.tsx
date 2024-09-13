import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { DataTabs } from '..';

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

describe('DataTabs', () => {
  it('should work', () => {
    const { asFragment } = render(<DataTabs items={[]} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });
});
