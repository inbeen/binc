import { createContext } from 'react';
import type { DataTabsItem, DataTabsGroup, DataTabsGroupConfig, DataTabsContext } from '../typings';

export const GROUP_GAP = 16;
export const GROUP_PADDING = 16 * 2;
export const DIVIDED_WIDTH = 16 * 2 + 1;
export const MIN_ITEM_WIDTH = 120;
export const EMPTY_OBJ = {};
export const EMPTY_FUNC = () => {};

export const Context = createContext<DataTabsContext>({
  itemWidth: 120,
  handleChange: EMPTY_FUNC,
  groupConfig: EMPTY_OBJ
});

export const validate = (value: number | string): boolean => {
  if (typeof value === 'number') {
    return true;
  }
  if (typeof value === 'string') {
    return /^(-?[0-9])+.?[0-9]*/.test(value);
  }
  return false;
};

export const unitMap = new Map([
  ['t', Math.pow(10, 12)],
  ['b', Math.pow(10, 9)],
  ['m', Math.pow(10, 6)],
  ['k', Math.pow(10, 3)]
]);

export const format = (value: number | string): string => {
  if (!validate(value)) {
    return 'invalid';
  }
  const val = value.toString();
  const isNegative = val.indexOf('-') === 0;
  const [integer] = (isNegative ? val.slice(1) : val).split('.');
  for (const [unit, base] of unitMap.entries()) {
    if (Number(integer) > base) {
      return `${isNegative ? '-' : ''}${Math.round((Number(integer) / base) * 100) / 100}${unit}`;
    }
  }
  return val;
};

export const getGroupWidth = (num: number) => num * GROUP_PADDING + (num - 1) * GROUP_GAP;

export const getGroupConfig = (num: number, items: (DataTabsItem | DataTabsGroup)[]): DataTabsGroupConfig => {
  const config = items.reduce((res: DataTabsGroupConfig, item: DataTabsItem | DataTabsGroup) => {
    res[item.key] = 1;
    return res;
  }, {});

  if (num <= items.length) {
    return config;
  }

  let remain = num - items.length;
  for (let i = 0; i < items.length && remain > 0; i++) {
    const item = items[i];
    const list = (item as DataTabsGroup).items;
    if (list) {
      const len = list.length;
      const add = Math.min(remain, len - 1);
      config[item.key] += add;
      remain -= add;
    }
  }

  return config;
};

export const calcWidth = (config: DataTabsGroupConfig, containerWidth: number) => {
  const mark = { divided: 0, group: 0, item: 0 };
  Object.keys(config).forEach((key: string) => {
    mark.group += 1;
    mark.divided += config[key] - 1;
    mark.item += config[key];
  });

  const present = mark.group * GROUP_PADDING + (mark.group - 1) * GROUP_GAP + mark.divided * DIVIDED_WIDTH;
  const itemWidth = Math.max(MIN_ITEM_WIDTH, Math.floor((containerWidth - present) / mark.item));
  const minWidth = itemWidth === MIN_ITEM_WIDTH ? present + mark.item * MIN_ITEM_WIDTH : undefined;

  return { itemWidth, minWidth };
};

export const calcTabs = (items: (DataTabsItem | DataTabsGroup)[], containerWidth: number) => {
  const maxShow = Math.floor((containerWidth - getGroupWidth(items.length)) / MIN_ITEM_WIDTH);
  let config: DataTabsGroupConfig = {};
  let widthMap: { itemWidth: number; minWidth?: number } = { itemWidth: 0, minWidth: undefined };
  for (let max = Math.max(items.length, maxShow); max >= items.length; max--) {
    config = getGroupConfig(max, items);
    widthMap = calcWidth(config, containerWidth);
    if (!widthMap.minWidth) {
      max = 0;
    }
  }

  return {
    groupConfig: config,
    ...widthMap
  };
};
