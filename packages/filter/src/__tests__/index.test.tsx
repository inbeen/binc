import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import { Input } from 'antd';
import { Filter, FilterItem, FilterProps, FilterValue } from '..';

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

const defaultValue: FilterValue[] = [
  { name: 'select', value: '1' },
  { name: 'input', value: '123' },
  { name: 'cascader', value: '1' },
  { name: 'date', value: undefined },
  { name: 'date-range', value: undefined }
];

const saveData = [{ key: '1', title: 'test', value: defaultValue }];

describe('Filter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should work', () => {
    const { asFragment } = render(<Filter items={[]} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should items and value correct', () => {
    const { container } = render(<Filter value={defaultValue} items={defaultItems} />);
    expect(container.querySelectorAll('.binc-filter__item').length).toBe(defaultValue.length);
  });

  it('should change trigger event correct', () => {
    const eventFn = vi.fn();
    let eventValue: FilterValue[] = [];
    let eventPayload: FilterValue | undefined = undefined;
    const handleChange: FilterProps['onChange'] = (val, payload) => {
      eventFn(val, payload);
      eventValue = val;
      eventPayload = payload;
    };
    const { container, baseElement } = render(
      <Filter defaultValue={defaultValue} items={defaultItems} onChange={handleChange} />
    );
    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
    act(() => {
      vi.runAllTimers();
    });
    fireEvent.click(baseElement.querySelector('.ant-select-item-option')!);
    const match = eventValue.find((v) => v.name === 'select');
    expect(match?.value).toBe('0');
    expect(eventPayload!).toStrictEqual({ name: 'select', value: '0' });
  });

  it('should add action correctly', () => {
    const { container, baseElement } = render(<Filter defaultValue={defaultValue.slice(0, 1)} items={defaultItems} />);
    expect(container.querySelectorAll('.binc-filter__item').length).toBe(1);
    fireEvent.click(container.querySelector('.binc-filter__btn__new')!);
    act(() => {
      vi.runAllTimers();
    });
    fireEvent.click(baseElement.querySelector('.ant-dropdown-menu-item')!);
    expect(container.querySelectorAll('.binc-filter__item').length).toBe(2);
  });

  it('should custom item render correctly', () => {
    const { container } = render(
      <Filter
        defaultValue={[{ name: 'custom', value: '123' }]}
        items={[{ name: 'custom', label: '自定义', component: <Input placeholder="custom" /> }]}
      />
    );

    expect(container.querySelectorAll('.binc-filter__item').length).toBe(1);
    expect(container.querySelector('input')?.value).toBe('123');
  });

  describe('Filter allowClear', () => {
    it('should allowSave render correct', () => {
      const { container } = render(<Filter allowClear items={defaultItems} />);
      expect(container.querySelectorAll('.binc-filter__btn').length).toBe(2);
    });

    it('should change when click', () => {
      const { container } = render(<Filter allowClear defaultValue={defaultValue} items={defaultItems} />);
      expect(container.querySelectorAll('.binc-filter__item').length).toBe(defaultValue.length);
      fireEvent.click(container.querySelector('.binc-filter__btn__clear')!);
      expect(container.querySelectorAll('.binc-filter__item').length).toBe(0);
    });
  });

  describe('Filter allowSave', () => {
    it('should allowSave render correct', () => {
      const { container } = render(<Filter allowSave saveData={saveData} items={defaultItems} />);
      expect(container.querySelectorAll('.binc-filter__btn').length).toBe(3);
    });
  });
});
