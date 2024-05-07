import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import PurchaseCard from '.';
import Bitcoin from '../../../../public/assets/icons/Bitcoin.svg';

export default {
  title: 'Organisms/PurchaseCard',
  component: PurchaseCard,
} as Meta;

const Template: StoryFn<typeof PurchaseCard> = (args) => (
  <PurchaseCard {...args} />
);

export const BuyCard = Template.bind({});
BuyCard.args = {
  coin: 'BTC',
  coinValue: 3406069.54,
  totalBalance: 34000.0,
  isBuycard: true,
};

export const SellCard = Template.bind({});
SellCard.args = {
  coinsrc: Bitcoin,
  coinName: 'Bitcoin',
  coin: 'BTC',
  coinValue: 3406069.54,
  totalBalance: 34000.0,
  coinQuantity: 1,
  isBuycard: false,
};
