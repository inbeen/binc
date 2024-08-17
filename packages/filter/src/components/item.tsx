import useItem from '../hooks/use-item';
import type { FilterItemProps } from '../typings';

const FilterItem = (props: FilterItemProps) => {
  const { component } = useItem(props);

  return <div className="binc-filter__item">{component}</div>;
};

export default FilterItem;
