import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RecentTransactionRow, { RecentTransactionRowProps } from '.';
import { RECENT_TRANSACTION_ROW } from 'utils/constants';

export default {
  title: 'Molecules/RecentTransactionRow',
  component: RecentTransactionRow,
} as Meta;

const Template: StoryFn<RecentTransactionRowProps> = (args) => (
  <RecentTransactionRow {...args} />
);

export const SoldTab = Template.bind({});
SoldTab.args = {
  width: '398px',
  height: '94px',
  transactionDate: RECENT_TRANSACTION_ROW.transactionDate,
  cryptoLabel: RECENT_TRANSACTION_ROW.cryptoLabel,
  cryptoQuantity: RECENT_TRANSACTION_ROW.cryptoQuantity,
  totalAmount: RECENT_TRANSACTION_ROW.totalAmount,
  chipLabel: RECENT_TRANSACTION_ROW.purchasedChipLabel,
};

export const PurchasedTab = Template.bind({});
PurchasedTab.args = {
  width: '398px',
  height: '94px',
  transactionDate: RECENT_TRANSACTION_ROW.transactionDate,
  cryptoLabel: RECENT_TRANSACTION_ROW.cryptoLabel,
  cryptoQuantity: RECENT_TRANSACTION_ROW.cryptoQuantity,
  totalAmount: RECENT_TRANSACTION_ROW.totalAmount,
  chipLabel: RECENT_TRANSACTION_ROW.soldChipLabel,
};
