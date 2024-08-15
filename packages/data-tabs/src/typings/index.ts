import type { CSSProperties } from 'react';

export interface DataTabsGroup {
  key: string;
  items: DataTabsItem[];
}

export type DataTabsGroupConfig = Record<string, number>;

export interface DataTabsItem {
  key: string;
  title: string;
  value: number | string;
  disabled?: boolean;
}

export interface DataTabsGroupProps {
  name: string;
  items: DataTabsItem[];
}

export interface DataTabsItemProps {
  data: DataTabsItem | DataTabsItem[];
}

export interface DataTabsProps {
  activeKey?: string;
  className?: string;
  items: (DataTabsGroup | DataTabsItem)[];
  style?: CSSProperties;
  onChange?: (key: string) => void;
}

export interface DataTabsContext {
  activeKey?: string;
  itemWidth: number;
  groupConfig: DataTabsGroupConfig;
  handleChange: (key: string) => void;
}

export interface UseItemProps {
  data: DataTabsItem;
}
