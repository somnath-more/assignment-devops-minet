import type { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PaymentSuccessCard, { IPaymentSuccessful } from '.';

export default {
  title: 'Molecules/PaymentSuccessfulCard',
  component: PaymentSuccessCard,
} as Meta;

const Template: StoryFn<IPaymentSuccessful> = (args) => (
  <PaymentSuccessCard {...args} />
);

export const BuySuccess = Template.bind({});
BuySuccess.args = {
  blnAmount: '0.0234510 BTC',
  buttonText1: 'BUY CRYPTO',
  buttonText2: 'GO TO USD COIN',
  textArea1: 'Purchase is completed, please check your',
  textArea2: 'balance in your crypto wallet',
  onClick: action('clicked'),
};

export const SellSuccess = Template.bind({});
SellSuccess.args = {
  blnAmount: '0.5234510 ETH',
  buttonText1: 'SELL CRYPTO',
  buttonText2: 'GO TO USD COIN',
  textArea1: 'Sell is completed, please check your',
  textArea2: 'balance in your Rupee coin',
  onClick: action('clicked'),
};
