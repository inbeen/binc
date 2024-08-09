import type { ChangeEvent, ChangeEventHandler, CompositionEvent, CompositionEventHandler } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { UseLogicProps } from '../typings';

export default <T extends HTMLInputElement | HTMLTextAreaElement>(props: UseLogicProps<T>) => {
  const { value, composition, onCompositionStart, onCompositionEnd, onChange } = props;

  const controlled = 'value' in props;

  const [val, setVal] = useState<UseLogicProps<T>['value']>(value || '');

  const isComposition = useRef<boolean>(false);
  const changeVal = useRef<UseLogicProps<T>['value']>(value || '');
  const event = useRef<ChangeEvent<T> | undefined>();

  useEffect(() => {
    if (controlled && composition) {
      setVal(value);
    }
  }, [controlled, value, composition]);

  const handleCompositionStart = useCallback(
    (e: CompositionEvent<T>) => {
      isComposition.current = true;
      onCompositionStart && (onCompositionStart as CompositionEventHandler<T>)(e);
    },
    [onCompositionStart]
  );

  const handleCompositionEnd = useCallback(
    (e: CompositionEvent<T>) => {
      if (event.current) {
        if (changeVal.current !== event.current.target.value) {
          changeVal.current = event.current.target.value;
          onChange && (onChange as ChangeEventHandler<T>)(event.current);
        }
        event.current = undefined;
      }
      isComposition.current = false;
      onCompositionEnd && (onCompositionEnd as CompositionEventHandler<T>)(e);
    },
    [onCompositionEnd, onChange]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<T>) => {
      const newVal = e.target.value;
      setVal(newVal);
      if (isComposition.current) {
        event.current = e;
      } else {
        changeVal.current = e.target.value;
        onChange && (onChange as ChangeEventHandler<T>)(e);
      }
    },
    [onChange]
  );

  if (composition) {
    return {
      value: val,
      onCompositionStart: handleCompositionStart,
      onCompositionEnd: handleCompositionEnd,
      onChange: handleChange
    };
  }

  return {};
};
