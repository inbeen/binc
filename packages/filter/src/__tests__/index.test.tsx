import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Filter, FilterItem } from '..';

const defaultItems: FilterItem[] = [
  {
    name: 'select',
    label: '选择',
    type: 'select',
    payload: { options: Array.from({ length: 5 }).map((_, idx: number) => ({ label: idx, value: idx.toString() })) }
  },
  { name: 'input', label: '输入框', type: 'input', initialValue: 'initial value' },
  {
    name: 'cascader',
    label: '级联选择',
    type: 'cascader',
    payload: { options: Array.from({ length: 5 }).map((_, idx: number) => ({ label: idx, value: idx.toString() })) }
  },
  { name: 'date', label: '日期选择', type: 'date' },
  { name: 'date-range', label: '日期范围', type: 'date-range' }
];

const defaultValue = [
  { name: 'select', value: '1' },
  { name: 'input', value: '123' },
  { name: 'cascader', value: '1' },
  { name: 'date', value: undefined },
  { name: 'date-range', value: undefined }
];

const saveData = [{ key: '1', title: 'test', value: defaultValue }];

describe('Filter', () => {
  it('should work', () => {
    const { asFragment } = render(<Filter items={[]} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should items and value correct', () => {
    const { container } = render(<Filter value={defaultValue} items={defaultItems} />);
    expect(container.querySelectorAll('.binc-filter__item').length).toBe(defaultValue.length);
  });

  describe('Filter allowClear', () => {
    it('should allowSave render correct', () => {
      const { container } = render(<Filter allowClear items={defaultItems} />);
      expect(container.querySelectorAll('.binc-filter__btn').length).toBe(2);
    });

    // TODO
    // it('should change when click', () => {
    //   const { container } = render(<Filter allowClear defaultValue={defaultValue} items={defaultItems} />);
    //   expect(container.querySelectorAll('.binc-filter__item').length).toBe(defaultValue.length);
    //   fireEvent.click(container.querySelector('.binc-filter__clear')!);
    // });
  });

  describe('Filter allowSave', () => {
    it('should allowSave render correct', () => {
      const { container } = render(<Filter allowSave saveData={saveData} items={defaultItems} />);
      expect(container.querySelectorAll('.binc-filter__btn').length).toBe(3);
    });
  });
});
