import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CryptoSelectCard, { CryptoSelectCardProps } from '.';

export default {
  title: 'Organisms/CryptoSelectCard',
  component: CryptoSelectCard,
} as Meta;

const Template: StoryFn<CryptoSelectCardProps> = (args) => (
  <CryptoSelectCard {...args} />
);

export const BitcoinTab = Template.bind({});
BitcoinTab.args = {
  selectedTab: 'BTC',
  width: '100%',
};

export const EthereumTab = Template.bind({});
EthereumTab.args = {
  selectedTab: 'ETH',
  width: '100%',
};
