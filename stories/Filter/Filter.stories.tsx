import type { Meta, StoryObj } from '@storybook/react';
import { Filter } from '@binc/filter';
import DemoTest from './Test';
import { itemsMap } from './utils';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Filter> = {
  title: 'Component/Filter',
  component: Filter,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  argTypes: {
    allowClear: {
      description: '是否允许清除',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    allowSave: {
      description: '是否支持保存功能',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    value: { description: '指定当前选中的筛选内容' },
    defaultValue: { description: '指定默认选中的筛选内容' },
    saveData: { description: '指定当前保存的筛选记录' },
    defaultSaveData: { description: '指定默认保存的筛选项记录' },
    items: {
      description: '可选的筛选项配置',
      options: Object.keys(itemsMap),
      mapping: itemsMap,
      control: {
        type: 'select'
      }
    },
    onChange: { description: '变更筛选内容的回调' },
    onSaveData: { description: '保存筛选内容的回调' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
const Template: Story = {
  args: {
    defaultValue: [{ name: 'select', value: '1' }],
    items: itemsMap.all
  },
  render: Filter
};

export const Base: Story = Template;

export const Clear: Story = {
  ...Template,
  args: {
    ...Template.args,
    allowClear: true
  }
};

export const Save: Story = {
  ...Template,
  args: {
    ...Template.args,
    allowSave: true
  }
};

export const Test: Story = {
  ...Template,
  render: DemoTest
};
