import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash-es';
import { format } from '../utils';
import type { DataTabsContext, DataTabsItem, DataTabsItemProps } from '../typings';

const useLogic = (props: DataTabsItemProps, context: DataTabsContext) => {
  const { data } = props;

  const { activeKey, itemWidth, handleChange } = context;

  // 当前展示标签
  const [selected, setSelected] = useState<string | undefined>();
  // 当前展示标签的值
  const [innerVal, setInnerVal] = useState<string | number | undefined>();
  // 数组格式化 方便计算
  const dataList = useMemo(() => (Array.isArray(data) ? data : [data]), [data]);

  // 更新当前展示的标签
  useEffect(() => {
    const match = dataList.find((item: DataTabsItem) => item.key === activeKey);
    if (match) {
      setSelected(activeKey);
    }
  }, [dataList, activeKey]);

  // 获取展示标签和折叠列表
  const [displayData, foldList] = useMemo(() => {
    const foldList = dataList.slice();
    const idx = foldList.findIndex((item: DataTabsItem) => item.key === selected);
    const displayData = foldList.splice(Math.max(idx, 0), 1)[0];

    return [displayData, foldList];
  }, [dataList, selected]);

  const { value } = displayData;

  const cache = useRef<{ max: number; val: string }>({ max: 0, val: value.toString() });
  const dom = useRef<HTMLDivElement>(null);
  const cb = useRef(
    debounce((entries: ResizeObserverEntry[], val: string | number) => {
      if (!entries.length) {
        return;
      }
      const { scrollWidth, clientWidth } = entries[0].target;
      const { max, val: fVal } = cache.current;
      // 存在缓存
      if (max) {
        if (clientWidth >= max) {
          setInnerVal(val);
        } else {
          setInnerVal(fVal);
        }
        return;
      }
      if (scrollWidth > clientWidth) {
        const newVal = format(val);
        setInnerVal(newVal);
        cache.current.val = newVal;
        cache.current.max = scrollWidth;
      }
    }, 10)
  );

  const listener = useCallback((entries: ResizeObserverEntry[]) => cb.current(entries, value), [value]);

  useEffect(() => {
    const observer = new ResizeObserver(listener);
    if (dom.current) {
      observer.observe(dom.current);
    }
    return () => observer.disconnect();
  }, [listener]);

  useEffect(() => {
    cache.current = { max: 0, val: value.toString() };
    setInnerVal(value);
  }, [value]);

  const className = useMemo(
    () =>
      `binc-data-tabs__item${activeKey === displayData.key ? ' binc-data-tabs__item--active' : ''}${
        displayData.disabled ? '  binc-data-tabs__item--disabled' : ''
      }`,
    [activeKey, displayData]
  );

  const style = useMemo(() => ({ width: itemWidth }), [itemWidth]);

  const handleClick = useCallback(
    (item: DataTabsItem) => {
      const { key, disabled } = item;
      if (disabled) {
        return;
      }
      handleChange(key);
    },
    [handleChange]
  );

  return {
    className,
    style,
    ref: dom,
    value: innerVal,
    data: displayData,
    list: foldList,
    handleClick
  };
};

export default useLogic;
