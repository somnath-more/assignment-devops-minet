import { Meta, StoryFn } from '@storybook/react';
import CryptoCard, { ICryptoCard } from '.';
import Bitcoin from '../../../../public/assets/icons/Bitcoin.svg';
import BitcoinBlackLogo from '../../../../public/assets/images/BitcoinBlackLogo.svg';
import Dollar from '../../../../public/assets/images/Dollar.svg';

const meta: Meta = {
  component: CryptoCard,
  title: 'molecules/cryptoCard',
};
export default meta;

const TEMPLATE: StoryFn<ICryptoCard> = (args) => <CryptoCard {...args} />;

export const Portfolio = TEMPLATE.bind({});
Portfolio.args = {
  variant: 'portfolio',
  title: 'Bitcoin',
  subTitle: 'BTC',
  amount: 10000,
  percentage: 20,
  image: Bitcoin,
};

export const Correlation = TEMPLATE.bind({});
Correlation.args = {
  variant: 'correlation',
  title: 'Bitcoin',
  subTitle: 'Moves tightly together',
  amount: 10000,
  percentage: 20,
  image: BitcoinBlackLogo,
};

export const Wallet = TEMPLATE.bind({});
Wallet.args = {
  variant: 'wallet',
  title: 'Bitcoin',
  subTitle: 'Moves tightly together',
  amount: 10000,
  image: Dollar,
};
