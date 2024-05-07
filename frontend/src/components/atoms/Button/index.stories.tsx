import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CustomButton, { IButtonProps } from '.';

export default {
  title: 'Atoms/Button',
  component: CustomButton,
} as Meta;

const Template: StoryFn<IButtonProps> = (args) => <CustomButton {...args} />;

export const Buy = Template.bind({});
Buy.args = {
  children: 'Buy',
  variant: 'contained',
  style: {
    width: '120px',
    height: '42px',
    borderRadius: '4px',
    border: '1px',
    backgroundColor: '#FFA74F',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontVariant: 'body1',
  },
  onClick: () => {
    alert('Primary Button Clicked!');
  },
};
