import { cloneElement, useCallback, useMemo } from 'react';
import type { ChangeEvent } from 'react';
import { Select, Cascader, Input, DatePicker } from 'antd';
import type { FilterItemProps } from '../typings';

const useLogic = (props: FilterItemProps) => {
  const { value, config, onChange } = props;

  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...params: any[]) => {
      config.payload?.onChange && config.payload.onChange(...params);
      onChange(config.name, params[0]);
    },
    [config, onChange]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      config.payload?.onChange && config.payload.onChange(e);
      onChange(config.name, val);
    },
    [config, onChange]
  );

  const component = useMemo(() => {
    switch (config.type) {
      case 'select': {
        const pl = config.payload || {};
        return <Select {...pl} value={value} onChange={handleChange} />;
      }
      case 'input': {
        const pl = config.payload || {};
        return <Input {...pl} value={value} onChange={handleInputChange} />;
      }
      case 'cascader': {
        const pl = config.payload || {};
        // @ts-expect-error 忽略 multiple
        return <Cascader {...pl} value={value} onChange={handleChange} />;
      }
      case 'date': {
        const pl = config.payload || {};
        return <DatePicker {...pl} value={value} onChange={handleChange} />;
      }
      case 'date-range': {
        const pl = config.payload || {};
        return <DatePicker.RangePicker {...pl} value={value} onChange={handleChange} />;
      }
      default: {
        const pl = config.payload || {};
        const payload = {
          ...pl,
          value,
          onChange: handleChange
        };
        return cloneElement(config.component, payload);
      }
    }
  }, [value, config, handleChange, handleInputChange]);

  return { component };
};

export default useLogic;
