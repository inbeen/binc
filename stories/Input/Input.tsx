import { useState, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { Row, Col } from 'antd';
import { Input } from '@binc/input';
import type { InputProps } from '@binc/input';

const Composition = (props: InputProps) => {
  const { onChange } = props;

  const [val, setVal] = useState('123');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      console.log('默认变化', e.target.value);
      onChange && onChange(e);
    },
    [onChange]
  );

  const handleChange2 = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      console.log('受控变化', val);
      setVal(val);
      onChange && onChange(e);
    },
    [onChange]
  );

  return (
    <div style={{ width: 360 }}>
      <Row gutter={[8, 8]} align="middle" style={{ marginBottom: 8 }}>
        <Col span={8}>默认</Col>
        <Col span={16}>
          <Input {...props} onChange={handleChange} />
        </Col>
      </Row>
      <Row gutter={[8, 8]} align="middle">
        <Col span={8}>受控</Col>
        <Col span={16}>
          <Input {...props} value={val} onChange={handleChange2} />
        </Col>
      </Row>
    </div>
  );
};

export default Composition;
