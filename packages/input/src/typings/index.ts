import type { InputProps as IInputProps } from 'antd';
import type { TextAreaProps as ITextAreaProps } from 'antd/lib/input';

export interface InputProps extends IInputProps {
  composition?: boolean;
}

export interface TextAreaProps extends ITextAreaProps {
  composition?: boolean;
}

export type UseLogicProps<T> = T extends HTMLInputElement ? InputProps : TextAreaProps;
