import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@binc/input';
import DemoComposition from './Composition';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Input> = {
  title: 'Component/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // More on tags: https://storybook.js.org/docs/writing-stories/tags
  // tags: ['!dev'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    composition: {
      table: {
        defaultValue: { summary: 'false' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Composition: Story = {
  render: DemoComposition
};
