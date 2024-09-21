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
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    allowSave: {
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    items: {
      options: Object.keys(itemsMap),
      mapping: itemsMap,
      control: {
        type: 'select'
      }
    }
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
