import React from 'react';
import { render } from '@testing-library/react';
import BuySellCard from '.';

describe('BuySellCard Component', () => {
  const props = {
    coinQty: '10 BTC',
    coinValue: '$50,000',
    paymentMethod: 'Credit Card',
    deliveryFees: '$10',
    depositTo: 'My Wallet',
    priceOfQty: '$500,000',
    transactionFee: '$5',
    total: '$500,015',
    buttonLabel: 'Buy Now',
    buttonDisable: false,
  };
  it('it should render the Buy Card with  heading text', () => {
    const { getByText } = render(<BuySellCard isBuying={true} {...props} />);
    expect(getByText(props.depositTo)).toBeInTheDocument();
    expect(getByText('You are buying')).toBeInTheDocument();
  });

  it('it should render the Sell Card with provided props', () => {
    const { getByText } = render(<BuySellCard isBuying={false} {...props} />);
    expect(getByText(props.depositTo)).toBeInTheDocument();
    expect(getByText('You are selling')).toBeInTheDocument();
  });
});
