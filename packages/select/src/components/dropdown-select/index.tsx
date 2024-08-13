import { Select } from 'antd';
import useDropdown from '../../hooks/use-dropdown';
import type { DropdownSelectProps } from '../../typings';
import './index.scss';

const DropdownSelect = (props: DropdownSelectProps) => {
  const payload = useDropdown(props);

  return <Select {...props} {...payload} />;
};

export default DropdownSelect;
