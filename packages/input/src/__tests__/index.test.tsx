import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Input, TextArea } from '..';

describe('Input', () => {
  it('should work', () => {
    const { asFragment } = render(<Input />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });
});

describe('Textarea', () => {
  it('should work', () => {
    const { asFragment } = render(<TextArea />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });
});
