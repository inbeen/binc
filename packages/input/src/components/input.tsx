import { Input as AntdInput } from 'antd';
import useLogic from '../hooks/useLogic';
import type { InputProps } from '../typings';

const Input = (props: InputProps) => {
  const payload = useLogic<HTMLInputElement>(props);

  return <AntdInput {...props} {...payload} />;
};

export default Input;
