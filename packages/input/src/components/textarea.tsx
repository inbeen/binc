import { forwardRef } from 'react';
import type { LegacyRef } from 'react';
import { Input as AntdInput } from 'antd';
import type { TextAreaRef } from 'antd/lib/input/TextArea';
import useLogic from '../hooks/useLogic';
import type { TextAreaProps } from '../typings';

const TextArea = forwardRef((props: TextAreaProps, ref: LegacyRef<TextAreaRef>) => {
  const payload = useLogic<HTMLTextAreaElement>(props);

  return <AntdInput.TextArea ref={ref} {...props} {...payload} />;
});

export default TextArea;
