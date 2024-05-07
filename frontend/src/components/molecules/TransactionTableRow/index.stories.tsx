import { Meta, StoryFn } from '@storybook/react';
import TransactionTableRow, { ITransactionTableRow } from '.';

const meta: Meta = {
  component: TransactionTableRow,
  title: 'molecules/TransactionTableRow',
};
export default meta;

const TEMPLATE: StoryFn<ITransactionTableRow> = (args) => (
  <TransactionTableRow {...args} />
);
export const Default = TEMPLATE.bind({});
Default.args = {
  transactionStatus: 'success',
  month: 'Feb',
  date: 21,
  paymentType: 'purchased',
  coinName: 'Bitcoin',
  senderName: 'Ben',
  amount: 1000,
  quantity: 0.0001,
};
