import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Filter } from '..';

describe('Filter', () => {
  it('should work', () => {
    const { asFragment } = render(<Filter items={[]} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });
});
