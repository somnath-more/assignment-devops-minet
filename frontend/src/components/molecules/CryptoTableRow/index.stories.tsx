import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CryptoTableRow, { CryptoTableRowProps } from '.';
import {
  BITCOIN_CRYPTO_CONSTANTS,
  ETHEREUM_CRYPTO_CONSTANTS,
} from 'utils/constants';

export default {
  title: 'Molecules/CryptoTableRow',
  component: CryptoTableRow,
} as Meta;

const Template: StoryFn<CryptoTableRowProps> = (args) => (
  <CryptoTableRow {...args} />
);

export const BitCoinRow = Template.bind({});
BitCoinRow.args = {
  cryptoSrc: BITCOIN_CRYPTO_CONSTANTS.BITCOIN_SRC,
  cryptoName: BITCOIN_CRYPTO_CONSTANTS.BITCOIN_NAME,
  cryptoLabel: BITCOIN_CRYPTO_CONSTANTS.BITCOIN_LABEL,
  cryptoPrice: BITCOIN_CRYPTO_CONSTANTS.BITCOIN_PRICE,
  cryptoChange: BITCOIN_CRYPTO_CONSTANTS.BITCOIN_CHANGE,
  cryptMarketCap: BITCOIN_CRYPTO_CONSTANTS.BITCOIN_MARKET_CAP,
  cryptoWatchList: BITCOIN_CRYPTO_CONSTANTS.BITCOIN_WATCHLIST,
  onIconClick: action('Icon clicked'),
  onRowClick: action('Row clicked'),
};

export const EthereumRow = Template.bind({});
EthereumRow.args = {
  cryptoSrc: ETHEREUM_CRYPTO_CONSTANTS.ETHEREUM_SRC,
  cryptoName: ETHEREUM_CRYPTO_CONSTANTS.ETHEREUM_NAME,
  cryptoLabel: ETHEREUM_CRYPTO_CONSTANTS.ETHEREUM_LABEL,
  cryptoPrice: ETHEREUM_CRYPTO_CONSTANTS.ETHEREUM_PRICE,
  cryptoChange: ETHEREUM_CRYPTO_CONSTANTS.ETHEREUM_CHANGE,
  cryptMarketCap: ETHEREUM_CRYPTO_CONSTANTS.ETHEREUM_MARKET_CAP,
  cryptoWatchList: ETHEREUM_CRYPTO_CONSTANTS.ETHEREUM_WATCHLIST,
  onIconClick: action('Icon clicked'),
  onRowClick: action('Row clicked'),
};
