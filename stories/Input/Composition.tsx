import { useState } from 'react';
import { Input } from '@binc/input';

const Composition = () => {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');

  return (
    <div>
      默认模式：{val1}
      <br />
      <br />
      <Input placeholder="请输入" onChange={(e) => setVal1(e.target.value)} />
      <br />
      <br />
      <br />
      中文模式：{val2}
      <br />
      <br />
      <Input placeholder="请输入" composition onChange={(e) => setVal2(e.target.value)} />
    </div>
  );
};

export default Composition;
