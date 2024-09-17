import { useEffect, useState, useCallback, useMemo } from 'react';
import { DataTabs } from '@binc/data-tabs';
import type { DataTabsProps } from '@binc/data-tabs';
import { flatItems, nestItems } from './utils';

const Test = (props: DataTabsProps) => {
  const [done, setDone] = useState<boolean>(false);
  const [key, setKey] = useState<string | undefined>();

  useEffect(() => {
    setTimeout(() => {
      setDone(true);
    }, 3000);
  }, []);

  const handleChange = useCallback((activeKey: string) => {
    setKey(activeKey);
  }, []);

  const items = useMemo(() => (done ? nestItems : flatItems), [done]);

  return (
    <div className="storybook-demo-data-tabs">
      <DataTabs {...props} items={items} activeKey={key} onChange={handleChange} />
    </div>
  );
};

export default Test;
