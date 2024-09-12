import type { Meta } from '@storybook/react';
import { DataTabs } from '@binc/data-tabs';
import Demo from './DataTabs';
import './index.scss';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Component/DataTabs',
  component: DataTabs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    backgrounds: {
      default: 'gray'
    }
  }
} satisfies Meta<typeof DataTabs>;

export default meta;
// type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const demo = Demo;
