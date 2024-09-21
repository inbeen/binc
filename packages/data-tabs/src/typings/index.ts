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
  /** 指定当前选中的页签 */
  activeKey?: string;
  /** 容器的 className */
  className?: string;
  /** 可选的筛选项配置 */
  items: (DataTabsGroup | DataTabsItem)[];
  /** 容器的 style */
  style?: CSSProperties;
  /** 变更选中页签的回调 */
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
