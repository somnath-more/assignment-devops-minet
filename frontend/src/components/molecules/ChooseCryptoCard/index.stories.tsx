import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ChooseCryptoCard, { ChooseCryptoProps } from '.';
import BitCoin from '../../../../public/assets/images/BitCoin.png';
import Ethereum from '../../../../public/assets/images/Ethereum.png';

export default {
  title: 'Molecules/ChooseCryptoCard',
  component: ChooseCryptoCard,
} as Meta;

const Template: StoryFn<ChooseCryptoProps> = (args) => (
  <ChooseCryptoCard {...args} />
);
export const BitCoinCard = Template.bind({});
BitCoinCard.args = {
  cryptoCardSrc: BitCoin,
  cryptoCardDescription: '$3,406,069.54',
  cryptoCardLabel: 'Bitcoin',
  cryptoCardSelected: true,
};

export const EthereumCard = Template.bind({});
EthereumCard.args = {
  cryptoCardSrc: Ethereum,
  cryptoCardDescription: '$3,406,069.54',
  cryptoCardLabel: 'Ethereum',
  cryptoCardSelected: false,
};
