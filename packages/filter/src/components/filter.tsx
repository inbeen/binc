import { Dropdown, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import useFilter from '../hooks/use-filter';
import Save from './save';
import type { FilterProps } from '../typings';

const Filter = (props: FilterProps) => {
  const { allowClear, allowSave } = props;

  const { value, saveData, itemsRender, addProps, handleClear, handleSave, handleSelect } = useFilter(props);

  return (
    <div className="binc-filter">
      {itemsRender}

      <Dropdown menu={addProps.menu} trigger={['click']}>
        <Button className="binc-filter__btn binc-filter__btn__new" icon={<PlusOutlined />} disabled={addProps.disabled}>
          New
        </Button>
      </Dropdown>

      {allowSave && <Save value={value} saveData={saveData} onSelect={handleSelect} onSave={handleSave} />}

      {allowClear && (
        <Button
          className="binc-filter__btn binc-filter__btn__clear"
          icon={<DeleteOutlined />}
          onClick={handleClear}
          disabled={!value.length}
        />
      )}
    </div>
  );
};

export default Filter;
