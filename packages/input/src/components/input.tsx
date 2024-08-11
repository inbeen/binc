import { forwardRef } from 'react';
import type { LegacyRef } from 'react';
import { Input as AntdInput } from 'antd';
import type { InputRef } from 'antd';
import useLogic from '../hooks/useLogic';
import type { InputProps } from '../typings';

const Input = forwardRef((props: InputProps, ref: LegacyRef<InputRef>) => {
  const payload = useLogic<HTMLInputElement>(props);

  return <AntdInput ref={ref} {...props} {...payload} />;
});

export default Input;
