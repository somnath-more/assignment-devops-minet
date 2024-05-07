import React from 'react';
import TradeHeader, { ITradeHeader } from '.';
import BitCoin from '../../../../public/assets/icons/Bitcoin.svg';
import Ethereum from '../../../../public/assets/images/Etherum.svg';
import { Meta, StoryFn } from '@storybook/react';
export default {
  title: 'Molecules/TradeHeader',
  component: TradeHeader,
} as Meta<typeof TradeHeader>;

const Template: StoryFn<ITradeHeader> = (args) => <TradeHeader {...args} />;

export const BitCoinHeader = Template.bind({});
BitCoinHeader.args = {
  iconSrc: BitCoin,
  coinName: 'Bitcoin',
  coinSymbol: 'BTC',
  coinValue: 8.2,
  marketCapValue: '$64.2T',
  volumeValue: '$2.9T',
  circulatingSupplyValue: '18.8M BitCoin',
};

export const EthereumHeader = Template.bind({});
EthereumHeader.args = {
  iconSrc: Ethereum,
  coinName: 'Ethereum',
  coinSymbol: 'ETH',
  coinValue: 0.64,
  marketCapValue: '$162.92B',
  volumeValue: '$11.5B',
  circulatingSupplyValue: '122.60M ETH',
};
