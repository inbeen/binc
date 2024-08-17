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
  allowClear?: boolean;
  allowSave?: boolean;
  value?: FilterValue[];
  defaultValue?: FilterValue[];
  saveData?: FilterSaveData[];
  defaultSaveData?: FilterSaveData[];
  items: FilterItem[];
  onChange?: (value: FilterValue[], payload?: FilterValue) => void;
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
