import type { Meta, StoryObj } from '@storybook/react';
import { DataTabs } from '@binc/data-tabs';
import DemoTest from './Test';
import './index.scss';
import { nestItems } from './utils';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DataTabs> = {
  title: 'Component/DataTabs',
  component: DataTabs,
  parameters: {
    // More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
    backgrounds: {
      default: 'gray'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
const Template: Story = {
  args: {
    activeKey: 'a',
    items: nestItems
  },
  render: DataTabs
};

export const Base: Story = Template;

export const Test: Story = {
  ...Template,
  render: DemoTest
};
