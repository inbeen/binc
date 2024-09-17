export const flatItems = [
  { key: 'total', title: '总览', value: '123456789' },
  { key: 'a', title: '条件A', value: '100000000' },
  { key: 'b', title: '条件B', value: '23000000' },
  { key: 'c', title: '条件C', value: '456000' },
  { key: 'long', title: '非常长的条件，测试溢出情况', value: 789 }
];

export const nestItems = [
  { key: 'total', title: '总览', value: '123456789' },
  { key: 'a', title: '条件A', value: '100000000' },
  {
    key: 'group',
    items: [
      { key: 'b', title: '条件B', value: '23000000' },
      { key: 'c', title: '条件C', value: '456000', disabled: true },
      { key: 'd', title: '条件D', value: '0', disabled: true },
      { key: 'e', title: '条件E', value: '0', disabled: true },
      { key: 'long', title: '非常长的条件，测试溢出情况', value: 789 }
    ]
  }
];
