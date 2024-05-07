import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import MyWalletCard, { MyWalletCardProps } from '.';
import { MY_WALLET_CARD, TransactionData } from 'utils/constants';

export default {
  title: 'Organisms/MyWalletCard',
  component: MyWalletCard,
} as Meta;

const Template: StoryFn<MyWalletCardProps> = (args) => (
  <MyWalletCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  image: true,
  usdCoin: MY_WALLET_CARD.usdAmount,
  transactionData: TransactionData,
};
