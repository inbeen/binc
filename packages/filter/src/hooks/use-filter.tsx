import { useCallback, useEffect, useMemo, useState } from 'react';
import Item from '../components/item';
import { getDefaultValue } from '../utils';
import type { FilterProps, FilterItem, FilterItemValue, FilterValue, FilterSaveData } from '../typings';

const useLogic = (props: FilterProps) => {
  const { value, saveData, items, onChange, onSaveData } = props;

  const controlled = 'value' in props;
  const saveControl = 'saveData' in props;

  const [innerValue, setInnerValue] = useState<FilterValue[]>(getDefaultValue('defaultValue', 'value', props));
  const [innerData, setInnerData] = useState<FilterSaveData[]>(getDefaultValue('defaultSaveData', 'saveData', props));

  useEffect(() => {
    if (controlled) {
      setInnerValue(value || []);
    }
  }, [controlled, value]);

  useEffect(() => {
    if (saveControl) {
      setInnerData(saveData || []);
    }
  }, [saveControl, saveData]);

  const handleChange = useCallback(
    (name: string, value: FilterItemValue) => {
      const res = innerValue.slice();
      const idx = res.findIndex((item) => item.name === name);
      if (idx === -1) {
        return;
      }
      const match = res[idx];
      if (value === match.value) {
        return;
      }
      const newVal = { name, value };
      res.splice(idx, 1, newVal);
      if (!controlled) {
        setInnerValue(res);
      }
      onChange && onChange(res, newVal);
    },
    [controlled, innerValue, onChange]
  );

  const handleAdd = useCallback(
    (key: string) => {
      const match = items.find((item: FilterItem) => item.name === key);
      if (!match) {
        return;
      }
      const res = innerValue.slice();
      const { name, initialValue } = match;
      const newVal = { name, value: initialValue };
      res.push(newVal);
      if (!controlled) {
        setInnerValue(res);
      }
      onChange && onChange(res, newVal);
    },
    [controlled, innerValue, items, onChange]
  );

  const handleClear = useCallback(() => {
    if (!controlled) {
      setInnerValue([]);
    }
    onChange && onChange([]);
  }, [controlled, onChange]);

  const handleSave = useCallback(
    async (title: string) => {
      const id = Date.now().toString();
      const record = { key: id, title, value: innerValue };
      const newVal = innerData.slice();
      newVal.push(record);
      if (onSaveData) {
        return Promise.resolve(onSaveData(innerData, record)).then(() => {
          if (!saveControl) {
            setInnerData(newVal);
          }
        });
      }
      if (!saveControl) {
        setInnerData(newVal);
      }
    },
    [saveControl, innerData, innerValue, onSaveData]
  );

  const handleSelect = useCallback(
    (key: string) => {
      const match = innerData.find((data) => data.key === key);
      if (!match) {
        return;
      }
      if (!controlled) {
        setInnerValue(match.value);
      }
      onChange && onChange(match.value);
    },
    [innerData, controlled, onChange]
  );

  const handleDelete = useCallback(
    (key: string | number) => {
      const idx = innerData.findIndex((data) => data.key === key);
      if (idx === -1) {
        return;
      }
      const newVal = innerData.slice();
      const [match] = newVal.splice(idx, 1);
      if (!saveControl) {
        setInnerData(newVal);
      }
      onSaveData && onSaveData(newVal, match);
    },
    [saveControl, innerData, onSaveData]
  );

  const itemsRender = useMemo(
    () =>
      innerValue
        .map((val: FilterValue) => {
          const config = items.find((item: FilterItem) => item.name === val.name);
          if (config) {
            return <Item key={val.name} config={config} value={val.value} onChange={handleChange} />;
          }
          return undefined;
        })
        .filter(Boolean),
    [innerValue, items, handleChange]
  );

  const addProps = useMemo(() => {
    const rest = items.filter((item: FilterItem) => {
      const match = innerValue.find((val: FilterValue) => val.name === item.name);
      return !match;
    });

    return {
      menu: {
        items: rest.map((item: FilterItem) => ({ key: item.name, label: item.label })),
        // @ts-expect-error 忽略 key
        onClick: ({ key }) => handleAdd(key)
      },
      disabled: !rest.length
    };
  }, [innerValue, items, handleAdd]);

  return {
    value: innerValue,
    saveData: innerData,
    itemsRender,
    addProps,
    handleChange,
    handleAdd,
    handleClear,
    // save 相关
    handleSave,
    handleSelect,
    handleDelete
  };
};

export default useLogic;
