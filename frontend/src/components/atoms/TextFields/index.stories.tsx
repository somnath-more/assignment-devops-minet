import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import CustomTextField from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Atoms/TextField',
  component: CustomTextField,
} as Meta<typeof CustomTextField>;

const Template: StoryFn<typeof CustomTextField> = (args) => (
  <CustomTextField {...args} />
);

export const TextFields = Template.bind({});
TextFields.args = {
  placeholder: 'you@company.com',
  variant: 'outlined',
  onChange: action('onChange event'),
  style: {
    width: '512px',
    height: '48px',
    padding: ' 12px, 16px, 12px, 16px',
    borderRadius: '8px',
    gap: '8px',
  },
};
