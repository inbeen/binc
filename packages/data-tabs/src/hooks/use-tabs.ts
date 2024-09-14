import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash-es';
import { calcTabs, EMPTY_OBJ, MIN_ITEM_WIDTH } from '../utils';
import type { DataTabsProps, DataTabsGroupConfig } from '../typings';

const useLogic = (props: DataTabsProps) => {
  const { className, style = EMPTY_OBJ, activeKey, items, onChange } = props;

  const controlled = 'activeKey' in props;

  const [key, setKey] = useState<string | undefined>(activeKey);
  const [itemWidth, setItemWidth] = useState<number>(MIN_ITEM_WIDTH);
  const [minWidth, setMinWidth] = useState<number | undefined>();
  const [groupConfig, setGroupConfig] = useState<DataTabsGroupConfig>({});

  const dom = useRef<HTMLDivElement>(null);
  const cb = useRef(
    debounce(
      (entries: ResizeObserverEntry[], items: DataTabsProps['items']) => {
        if (!entries.length) {
          return;
        }
        const { width: containerWidth } = entries[0].contentRect;
        const { itemWidth: iw, minWidth: cw, groupConfig: gc } = calcTabs(items, containerWidth);
        setItemWidth(iw);
        setMinWidth(cw);
        setGroupConfig(gc);
        console.log(gc);
      },
      10,
      { leading: true }
    )
  );

  const listener = useCallback((entries: ResizeObserverEntry[]) => cb.current(entries, items), [items]);

  useEffect(() => {
    const observer = new ResizeObserver(listener);
    if (dom.current) {
      observer.observe(dom.current);
    }
    return () => observer.disconnect();
  }, [listener]);

  useEffect(() => {
    if (controlled) {
      setKey(activeKey);
    }
  }, [controlled, activeKey]);

  const cls = useMemo(() => `binc-data-tabs${className ? ` ${className}` : ''}`, [className]);

  const sty = useMemo(() => {
    if (minWidth) {
      return { ...style, minWidth };
    }
    return style;
  }, [style, minWidth]);

  const handleChange = useCallback(
    (k: string) => {
      if (key === k) {
        return;
      }
      if (!controlled) {
        setKey(k);
      }
      onChange && onChange(k);
    },
    [key, controlled, onChange]
  );

  return {
    className: cls,
    style: sty,
    ref: dom,
    activeKey: key,
    itemWidth,
    groupConfig,
    handleChange
  };
};

export default useLogic;
