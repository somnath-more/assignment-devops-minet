import React from 'react';
import { ChipProps } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import Chip from '.';
import theme from 'theme';

export default {
  title: 'Atoms/Chip',
  component: Chip,
} as Meta;

const Template: StoryFn<ChipProps> = (args) => <Chip {...args} />;

export const BitCoinChip = Template.bind({});
BitCoinChip.args = {
  label: 'BitCoin',
  onClick: () => alert('Chip Clicked'),
  style: {
    borderRadius: '4px',
    border: '2px solid ',
    borderColor: theme.palette.minet_warning.main,
    background: theme.palette.minet_warning.light,
    ...theme.typography.body2,
    color: theme.palette.minet_text.high_emphasis,
  },
};
