import { useCallback, useMemo, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { message } from 'antd';
import { FilterSaveProps } from '../typings';

const useSave = (props: FilterSaveProps) => {
  const { saveData, onSave, onSelect } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const title = useRef<string>('');

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClose = useCallback(() => {
    setLoading(false);
    setDisabled(true);
    title.current = '';
  }, []);

  const handleOk = useCallback(async () => {
    if (!title.current.length) {
      message.error('Title cannot be empty.');
      return;
    }
    if (saveData.find((data) => data.title === title.current)) {
      message.error('Title already exists.');
      return;
    }
    setLoading(true);
    return Promise.resolve(onSave(title.current)).then(() => {
      setOpen(false);
      setLoading(false);
    });
  }, [saveData, onSave]);

  const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    title.current = val;
    setDisabled(!val);
  }, []);

  const menuProps = useMemo(() => {
    const items = saveData.map((data) => ({ key: data.key, label: data.title }));

    return {
      items,
      // @ts-expect-error 忽略 eslint
      onClick: ({ key }) => onSelect(key)
    };
  }, [saveData, onSelect]);

  return {
    open,
    loading,
    disabled,
    menuProps,
    handleOpen,
    handleCancel,
    handleOk,
    handleInput,
    handleClose
  };
};

export default useSave;
