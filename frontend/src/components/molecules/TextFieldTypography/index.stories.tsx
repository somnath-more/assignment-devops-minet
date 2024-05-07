import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TextFieldWithTypography, { TextFieldWithTypographyProps } from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Molecules/TextFieldWithTypography',
  component: TextFieldWithTypography,
} as Meta;

const Template: StoryFn<TextFieldWithTypographyProps> = (args) => (
  <TextFieldWithTypography {...args} />
);

export const EmailTextField = Template.bind({});
EmailTextField.args = {
  height: '74px',
  width: '512px',
  heading: 'Email',
  helperText: 'Enter your email address',
  type: 'email',
  placeholder: 'Enter your email address',
  onChange: action('Textfield changed'),
};

export const NameTextField = Template.bind({});
NameTextField.args = {
  height: '74px',
  width: '512px',
  heading: 'Name',
  helperText: 'Enter your name',
  type: 'name',
  placeholder: 'Enter your name',
  onChange: action('Textfield changed'),
};
