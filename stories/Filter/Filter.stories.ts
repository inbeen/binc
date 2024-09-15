import type { Meta } from '@storybook/react';
import { Filter } from '@binc/filter';
import Demo from './Filter';
import { itemsMap } from './utils';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Component/Filter',
  component: Filter,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  argTypes: {
    items: {
      options: Object.keys(itemsMap),
      mapping: itemsMap,
      control: {
        type: 'select'
      }
    }
  }
} satisfies Meta<typeof Filter>;

export default meta;
// type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const demo = Demo;
