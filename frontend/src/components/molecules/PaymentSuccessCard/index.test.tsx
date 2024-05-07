import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PaymentSuccessCard from '.';

describe('PaymentSuccessCard', () => {
  const defaultProps = {
    blnAmount: '0.0234510 BTC',
    textArea1: 'Purchase is completed, please check your',
    textArea2: 'balance in your crypto wallet',
    buttonText1: 'BUY CRYPTO',
    buttonText2: 'GO TO USD COIN',
  };

  it('renders the PaymentSuccessCard', () => {
    render(<PaymentSuccessCard {...defaultProps} />);
    expect(screen.getByText('0.0234510 BTC')).toBeInTheDocument();
    expect(
      screen.getByText('Purchase is completed, please check your')
    ).toBeInTheDocument();
    expect(
      screen.getByText('balance in your crypto wallet')
    ).toBeInTheDocument();
    expect(screen.getByText('BUY CRYPTO')).toBeInTheDocument();
    expect(screen.getByText('GO TO USD COIN')).toBeInTheDocument();
  });

  it('calls the onClick function when the "GO TO USD COIN" button is clicked', () => {
    const onClick = jest.fn();
    render(<PaymentSuccessCard {...defaultProps} onClick={onClick} />);

    const goToUsdCoinButton = screen.getByText('GO TO USD COIN');
    fireEvent.click(goToUsdCoinButton);

    expect(onClick).toHaveBeenCalled();
  });
});
