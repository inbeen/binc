import { Modal, Input, Button, Dropdown } from 'antd';
import { SaveOutlined, DatabaseOutlined } from '@ant-design/icons';
import useSave from '../hooks/use-save';
import type { FilterSaveProps } from '../typings';

const Save = (props: FilterSaveProps) => {
  const { value, saveData } = props;
  const { open, loading, disabled, menuProps, handleOpen, handleCancel, handleOk, handleInput, handleClose } =
    useSave(props);

  return (
    <>
      <Button className="binc-filter__btn" icon={<SaveOutlined />} onClick={handleOpen} disabled={!value.length} />

      {saveData.length > 0 && (
        <Dropdown menu={menuProps} trigger={['click']}>
          <Button className="binc-filter__btn" icon={<DatabaseOutlined />} />
        </Dropdown>
      )}

      <Modal
        title="Save"
        open={open}
        confirmLoading={loading}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled }}
        onClose={handleClose}
      >
        <Input placeholder="Please input title" onChange={handleInput} />
      </Modal>
    </>
  );
};

export default Save;
