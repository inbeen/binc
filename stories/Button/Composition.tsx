import { useState, useCallback } from 'react';
import { Row, Col } from 'antd';
import { Input } from '@binc/input';
import type { InputProps } from '@binc/input';

const Composition = (props: InputProps) => {
  const [val, setVal] = useState('123');

  const handleChange = useCallback((e) => {
    console.log('默认变化', e.target.value);
  }, []);

  const handleChange2 = useCallback((e) => {
    const val = e.target.value;
    console.log('受控变化', val);
    setVal(val);
  }, []);

  return (
    <>
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
    </>
  );
};

export default Composition;
