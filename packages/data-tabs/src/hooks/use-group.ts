import { useMemo } from 'react';
import { DataTabsContext, DataTabsGroupProps } from '../typings';

const useLogic = (props: DataTabsGroupProps, context: DataTabsContext) => {
  const { name, items } = props;
  const { groupConfig } = context;

  const { showList, restList } = useMemo(() => {
    const showNum = groupConfig[name] || 1;

    if (items.length === showNum) {
      return { showList: items, restList: [] };
    }

    return {
      showList: items.slice(0, showNum - 1),
      restList: items.slice(showNum - 1)
    };
  }, [name, items, groupConfig]);

  return {
    showList,
    restList
  };
};

export default useLogic;
