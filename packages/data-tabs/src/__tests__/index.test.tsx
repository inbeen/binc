import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { DataTabs } from '..';
import { flatItems, nestItems } from './data';

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

describe('DataTabs', () => {
  it('should flat items work', () => {
    const { asFragment, container } = render(<DataTabs activeKey="c" items={flatItems} />);
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(container.querySelectorAll('.binc-data-tabs__group').length).toBe(5);
  });

  it('shoule nest items work', () => {
    const { asFragment, container } = render(<DataTabs activeKey="c" items={nestItems} />);
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(container.querySelectorAll('.binc-data-tabs__group').length).toBe(3);
  });
});
