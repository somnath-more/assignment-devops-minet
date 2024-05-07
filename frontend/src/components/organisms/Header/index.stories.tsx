import Header, { HeaderProps } from '.';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Organism/Header',
  component: Header,
};

const Template: StoryFn<HeaderProps> = (args) => <Header {...args} />;

export const DashboardHeader = Template.bind({});
DashboardHeader.args = {
  title: 'Dashboard',
  isButtonRequired: true,
  onClickBuyButton: action('BuyButtonClicked'),
  onClickSellButton: action('SellButtonClicked'),
};

export const CheckoutHeader = Template.bind({});
CheckoutHeader.args = {
  title: 'Checkout',
  isButtonRequired: false,
  onClickBuyButton: action('BuyButtonClicked'),
  onClickSellButton: action('SellButtonClicked'),
};
