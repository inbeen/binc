import type { InputProps as IInputProps } from 'antd';
import type { TextAreaProps as ITextAreaProps } from 'antd/lib/input';

export interface InputProps extends IInputProps {
  /** 是否支持中文模式，拼写时不触发变更事件 */
  composition?: boolean;
}

export interface TextAreaProps extends ITextAreaProps {
  /** 是否支持中文模式，拼写时不触发变更事件 */
  composition?: boolean;
}

export type UseLogicProps<T> = T extends HTMLInputElement ? InputProps : TextAreaProps;
