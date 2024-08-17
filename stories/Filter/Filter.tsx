import { useCallback, useMemo } from 'react';
import { Filter } from '@binc/filter';
// import { Input } from 'antd';
import type { FilterProps, FilterItem, FilterValue } from '@binc/filter';

const Demo = (props: FilterProps) => {
  const handleChange = useCallback((val: FilterValue[]) => {
    console.log(val);
  }, []);

  const items: FilterItem[] = useMemo(
    () => [
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
      // { name: 'custom', label: '自定义', component: <Input placeholder="custom" /> }
    ],
    []
  );

  return (
    <Filter
      {...props}
      defaultValue={[{ name: 'select', value: '1' }]}
      allowClear
      allowSave
      items={items}
      onChange={handleChange}
    />
  );
};

export default Demo;
