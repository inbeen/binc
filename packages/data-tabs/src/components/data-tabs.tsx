import { useMemo } from 'react';
import Group from './group';
import useTabs from '../hooks/use-tabs';
import { Context } from '../utils';
import type { DataTabsProps } from '../typings';

const DataTabs = (props: DataTabsProps) => {
  const { items } = props;

  const { className, style, ref, activeKey, itemWidth, groupConfig, handleChange } = useTabs(props);

  const groupRender = useMemo(
    () => items.map((item) => <Group key={item.key} name={item.key} items={'items' in item ? item.items : [item]} />),
    [items]
  );

  return (
    <Context.Provider value={{ activeKey, itemWidth, groupConfig, handleChange }}>
      <div className={className} style={style} ref={ref}>
        {groupRender}
      </div>
    </Context.Provider>
  );
};

export default DataTabs;
