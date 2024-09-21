import type { ReactElement } from 'react';
import type { SelectProps, DatePickerProps, InputProps, CascaderProps } from 'antd';
import type { RangePickerProps } from 'antd/lib/date-picker';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FilterItemValue = any;
export interface FilterValue {
  name: string;
  value: FilterItemValue;
}

export interface BaseFilterItem {
  name: string;
  label: string;
  initialValue?: FilterItemValue;
}

export interface FilterItemForSelect extends BaseFilterItem {
  type: 'select';
  payload?: Partial<SelectProps>;
}

export interface FilterItemForInput extends BaseFilterItem {
  type: 'input';
  payload?: Partial<InputProps>;
}

export interface FilterItemForCascader extends BaseFilterItem {
  type: 'cascader';
  payload?: Partial<CascaderProps>;
}

export interface FilterItemForDate extends BaseFilterItem {
  type: 'date';
  payload?: Partial<DatePickerProps>;
}

export interface FilterItemForDateRange extends BaseFilterItem {
  type: 'date-range';
  payload?: Partial<RangePickerProps>;
}

export interface FilterItemForCustom extends BaseFilterItem {
  type?: 'custom';
  component: ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: Record<string, any>;
}

export type FilterItem =
  | FilterItemForSelect
  | FilterItemForInput
  | FilterItemForCascader
  | FilterItemForDate
  | FilterItemForDateRange
  | FilterItemForCustom;

export interface FilterSaveData {
  key: string | number;
  title: string;
  value: FilterValue[];
}

export interface FilterProps {
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否支持保存功能 */
  allowSave?: boolean;
  /** 指定当前选中的筛选内容 */
  value?: FilterValue[];
  /** 指定默认选中的筛选内容 */
  defaultValue?: FilterValue[];
  /** 指定当前保存的筛选记录 */
  saveData?: FilterSaveData[];
  /** 指定默认保存的筛选项记录 */
  defaultSaveData?: FilterSaveData[];
  /** 可选的筛选项配置 */
  items: FilterItem[];
  /** 变更筛选内容的回调 */
  onChange?: (value: FilterValue[], payload?: FilterValue) => void;
  /** 保存筛选内容的回调 */
  onSaveData?: (data: FilterSaveData[], payload?: FilterSaveData) => Promise<void> | void;
}

export interface FilterItemProps {
  value: FilterItemValue;
  config: FilterItem;
  onChange: (name: string, value: FilterItemValue) => void;
}

export interface FilterSaveProps {
  value: FilterValue[];
  saveData: FilterSaveData[];
  onSelect: (key: string) => void;
  onSave: (title: string) => Promise<void> | void;
}
