import { Meta, StoryFn } from '@storybook/react';
import BuySellSummaryCard from '.';
import BuySellCard, { BuySellCardProps } from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Molecules/BuySellSummaryCard',
  component: BuySellSummaryCard,
} as Meta;

const Template: StoryFn<BuySellCardProps> = (args) => <BuySellCard {...args} />;

export const BuyCard = Template.bind({});
BuyCard.args = {
  isBuying: true,
  coinQty: '0.5234510 ETH',
  coinValue: '1ETH = $1,297.93',
  paymentMethod: 'Visa credit ...8845',
  deliveryFees: '0.005 ETH',
  depositTo: 'Etherium wallet',
  priceOfQty: '$648.54',
  transactionFee: '$30.00',
  total: '$678.54',
  buttonLabel: 'Buy Now',
  buttonDisable: false,
  onClick: action('clicked'),
};

export const SellCard = Template.bind({});
SellCard.args = {
  isBuying: false,
  coinQty: '0.5234510 ETH',
  coinValue: '1ETH = $1,297.93',
  paymentMethod: 'Bitcoin wallet',
  deliveryFees: '0.005 ETH',
  depositTo: 'Rupee Coin',
  priceOfQty: '$648.54',
  transactionFee: '$30.00',
  total: '$678.54',
  buttonLabel: 'Sell Now',
  buttonDisable: false,
  onClick: action('clicked'),
};
