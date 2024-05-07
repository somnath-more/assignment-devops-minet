import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CryptoTableRow from '.';
import { BITCOIN_CRYPTO_CONSTANTS } from 'utils/constants';

describe('CryptoTableRow Component', () => {
  test('it should render Typography component', () => {
    const mockOnIconClick = jest.fn();
    const mockOnRowClick = jest.fn();

    render(
      <CryptoTableRow
        cryptoSrc={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_SRC}
        cryptoName={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_NAME}
        cryptoLabel={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_LABEL}
        cryptoPrice={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_PRICE}
        cryptMarketCap={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_MARKET_CAP}
        cryptoWatchList={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_WATCHLIST}
        onIconClick={mockOnIconClick}
        onRowClick={mockOnRowClick}
        cryptoChange={0}
      />
    );

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('$50000')).toBeInTheDocument();
    expect(screen.getByText('$1.2T')).toBeInTheDocument();
  });

  test('it should mock the onClick event', () => {
    const mockOnIconClick = jest.fn();
    const mockOnRowClick = jest.fn();

    render(
      <CryptoTableRow
        cryptoSrc={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_SRC}
        cryptoName={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_NAME}
        cryptoLabel={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_LABEL}
        cryptoPrice={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_PRICE}
        cryptoChange={0}
        cryptMarketCap={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_MARKET_CAP}
        cryptoWatchList={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_WATCHLIST}
        onIconClick={mockOnIconClick}
        onRowClick={mockOnRowClick}
      />
    );

    fireEvent.click(screen.getByTestId('first-cell'));
    expect(mockOnRowClick).toHaveBeenCalled();

    fireEvent.click(screen.getByTestId('icon-id'));
    expect(mockOnIconClick).toHaveBeenCalled();
  });

  test('it should render the color correctly when cryptoChange is positive', () => {
    const mockOnIconClick = jest.fn();
    const mockOnRowClick = jest.fn();

    render(
      <CryptoTableRow
        cryptoSrc={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_SRC}
        cryptoName={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_NAME}
        cryptoLabel={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_LABEL}
        cryptoPrice={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_PRICE}
        cryptoChange={5.2}
        cryptMarketCap={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_MARKET_CAP}
        cryptoWatchList={true}
        onIconClick={mockOnIconClick}
        onRowClick={mockOnRowClick}
      />
    );
  });

  test('it should render the color correctly when cryptoChange is negative', () => {
    const mockOnIconClick = jest.fn();
    const mockOnRowClick = jest.fn();

    render(
      <CryptoTableRow
        cryptoSrc={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_SRC}
        cryptoName={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_NAME}
        cryptoLabel={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_LABEL}
        cryptoPrice={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_PRICE}
        cryptoChange={-5.2}
        cryptMarketCap={BITCOIN_CRYPTO_CONSTANTS.BITCOIN_MARKET_CAP}
        cryptoWatchList={false}
        onIconClick={mockOnIconClick}
        onRowClick={mockOnRowClick}
      />
    );
  });
});
