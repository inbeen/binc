import { Input as AntdInput } from 'antd';
import useLogic from '../hooks/useLogic';
import type { TextAreaProps } from '../typings';

const TextArea = (props: TextAreaProps) => {
  const payload = useLogic<HTMLTextAreaElement>(props);

  return <AntdInput.TextArea {...props} {...payload} />;
};

export default TextArea;
