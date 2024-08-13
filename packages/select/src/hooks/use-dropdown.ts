import { useMemo } from 'react';
import type { DropdownSelectProps } from '../typings';

const useDropdown = (props: DropdownSelectProps) => {
  const { className, popupMatchSelectWidth } = props;

  const cls = useMemo(() => {
    return `binc-dropdown-select${className ? ` ${className}` : ''}`;
  }, [className]);

  const popupWidth = useMemo(() => {
    if (popupMatchSelectWidth) {
      return popupMatchSelectWidth;
    }
    return 240;
  }, [popupMatchSelectWidth]);

  return {
    className: cls,
    popupMatchSelectWidth: popupWidth
  };
};

export default useDropdown;
