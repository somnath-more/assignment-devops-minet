import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TradeHeader from '.';
import theme from 'theme';

describe('TradeHeader', () => {
  const defaultProps = {
    coinName: 'Bitcoin',
    coinSymbol: 'BTC',
    coinValue: 8.2,
    marketCapValue: '$64.2T',
    volumeValue: '$2.9T',
    circulatingSupplyValue: '18.8M BitCoin',
  };

  it('should render the TradeHeader with positive coinvalue', () => {
    render(<TradeHeader iconSrc={''} {...defaultProps} />);

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('$64.2T')).toBeInTheDocument();
    expect(screen.getByText('$2.9T')).toBeInTheDocument();
    expect(screen.getByText('18.8M BitCoin')).toBeInTheDocument();

    const coinValueElement = screen.getByText('+8.2');
    expect(coinValueElement).toBeInTheDocument();

    expect(coinValueElement).toHaveStyle(
      `color: ${theme.palette.minet_success[500]}`
    );
  });

  it('should render the TradeHeader with negative coinvalue', () => {
    const defaultPropsNegative = {
      ...defaultProps,
      coinValue: -5.5,
    };

    render(<TradeHeader iconSrc={''} {...defaultPropsNegative} />);

    const coinValueElementNegative = screen.getByText('-5.5');
    expect(coinValueElementNegative).toHaveStyle(
      `color: ${theme.palette.minet_error[500]}`
    );
  });
});
