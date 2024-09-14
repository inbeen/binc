import { Fragment, memo, useContext, useMemo } from 'react';
import Item from './item';
import useGroup from '../hooks/use-group';
import { Context } from '../utils';
import { DataTabsGroupProps } from '../typings';

const DataTabsGroup = (props: DataTabsGroupProps) => {
  const ctx = useContext(Context);

  const { showList, restList } = useGroup(props, ctx);

  const itemsRender = useMemo(
    () =>
      showList.map((item, idx) => (
        <Fragment key={item.key}>
          {idx > 0 && <div className="binc-data-tabs__divided" />}
          <Item key={item.key} data={item} />
        </Fragment>
      )),
    [showList]
  );

  return (
    <div className="binc-data-tabs__group">
      {itemsRender}
      {restList.length ? (
        <Fragment key="_key">
          {showList.length > 0 && <div className="binc-data-tabs__divided" />}
          <Item key="rest" data={restList} />
        </Fragment>
      ) : null}
    </div>
  );
};

export default memo(DataTabsGroup);
