import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
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

  it('should trigger event correct', () => {
    let changeKey = '';
    const handleChange = (key: string) => (changeKey = key);
    const { container } = render(<DataTabs items={flatItems} onChange={handleChange} />);
    fireEvent.click(container.querySelector('.binc-data-tabs__item')!);
    expect(changeKey).toBe('total');
  });

  it('should no trigger event when click active one', () => {
    let changeKey = '';
    const handleChange = (key: string) => (changeKey = key);
    const { container } = render(<DataTabs activeKey="total" items={flatItems} onChange={handleChange} />);
    fireEvent.click(container.querySelector('.binc-data-tabs__item')!);
    expect(changeKey).toBe('');
  });
});
