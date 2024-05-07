import { Meta, StoryFn } from '@storybook/react';
import CoinHistoryCard, { ICoinHistoryCard } from '.';
import { TRANSACTIONS_HISTORY } from 'utils/constants';

const meta: Meta = {
  component: CoinHistoryCard,
  title: 'organisms/CoinHistoryCard',
};

export default meta;
const TEMPLATE: StoryFn<ICoinHistoryCard> = (args) => (
  <CoinHistoryCard {...args} />
);
export const Default = TEMPLATE.bind({});
Default.args = {
  value: 0.023451,
  amount: 85553.73,
  transactionHistoryData: TRANSACTIONS_HISTORY,
};
