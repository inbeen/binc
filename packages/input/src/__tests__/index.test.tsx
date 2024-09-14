import { describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Input, TextArea } from '..';

describe('Input', () => {
  it('should work', () => {
    const { asFragment } = render(<Input />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  describe('Input controlled', () => {
    it('should control when not composition', () => {
      const { container } = render(<Input />);
      fireEvent.change(container.querySelector('input')!, { target: { value: 'test' } });
      expect(container.querySelector('input')?.value).toBe('test');
    });

    it('should control when composition', () => {
      const { container } = render(<Input composition />);
      fireEvent.change(container.querySelector('input')!, { target: { value: 'test' } });
      expect(container.querySelector('input')?.value).toBe('test');
    });
  });
});

describe('Textarea', () => {
  it('should work', () => {
    const { asFragment } = render(<TextArea />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });
});
