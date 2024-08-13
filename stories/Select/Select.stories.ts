import type { Meta } from '@storybook/react';
import { Input } from '@binc/input';
import DropdownSelect from './Dropdown';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Component/Select',
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  }
} satisfies Meta<typeof Input>;

export default meta;
// type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const dropdownSelect = DropdownSelect;
