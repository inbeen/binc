import { useCallback, useMemo } from 'react';
import { Filter } from '@binc/filter';
import type { FilterProps, FilterItem, FilterValue } from '@binc/filter';
import { itemsMap } from './utils';

const Test = (props: FilterProps) => {
  const handleChange = useCallback((val: FilterValue[]) => {
    console.log(val);
  }, []);

  const items: FilterItem[] = useMemo(() => itemsMap.all, []);

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

export default Test;
