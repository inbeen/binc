import { memo, useContext, useMemo } from 'react';
import { Dropdown, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import useItem from '../hooks/use-item';
import { Context } from '../utils';
import type { DataTabsItemProps } from '../typings';

const DataTabsItem = (props: DataTabsItemProps) => {
  const context = useContext(Context);

  const { className, style, ref, value, data, list, handleClick } = useItem(props, context);

  const { title } = data;

  const menu = useMemo(
    () =>
      list.map((item) => ({
        key: item.key,
        disabled: item.disabled,
        label: (
          <Popover title={item.title} content={item.value} placement="left" align={{ offset: [-24, 0] }}>
            <div onClick={() => handleClick(item)}>{item.title}</div>
          </Popover>
        )
      })),
    [list, handleClick]
  );

  return (
    <div className={className} style={style} onClick={() => handleClick(data)}>
      <div className="binc-data-tabs__item__header">
        <div className="binc-data-tabs__item__title">{title}</div>
        {list.length > 0 && (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown menu={{ items: menu }} trigger={['click']}>
              <DownOutlined className="binc-data-tabs__item__arrow" />
            </Dropdown>
          </div>
        )}
      </div>
      <div className="binc-data-tabs__item__value" ref={ref}>
        {value}
      </div>
    </div>
  );
};

export default memo(DataTabsItem);
