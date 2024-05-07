import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentTransactionRow from '.';
import { RECENT_TRANSACTION_ROW } from 'utils/constants';

describe('RecentTransactionRow Component', () => {
  test('it should render Typography component', () => {
    render(
      <RecentTransactionRow
        height="94px"
        width="398px"
        transactionDate={new Date('2023-01-01')}
        cryptoLabel={RECENT_TRANSACTION_ROW.cryptoLabel}
        cryptoQuantity={RECENT_TRANSACTION_ROW.cryptoQuantity}
        totalAmount={RECENT_TRANSACTION_ROW.totalAmount}
        chipLabel={RECENT_TRANSACTION_ROW.purchasedChipLabel}
      />
    );
    const date = new Date('2023-01-01');
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const formattedDate = `${month} ${day}`;

    expect(screen.getByText(formattedDate)).toBeInTheDocument();
    expect(screen.getByText('Jan 1')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin BTC')).toBeInTheDocument();
    expect(screen.getByText('+ 0.005 BTC')).toBeInTheDocument();
    expect(screen.getByText('- $50')).toBeInTheDocument();
    expect(screen.getByText('Purchased')).toBeInTheDocument();
  });

  test('it should not render transaction date when transactionDate is not provided', () => {
    render(
      <RecentTransactionRow
        height="94px"
        width="398px"
        cryptoLabel={RECENT_TRANSACTION_ROW.cryptoLabel}
        cryptoQuantity={RECENT_TRANSACTION_ROW.cryptoQuantity}
        totalAmount={RECENT_TRANSACTION_ROW.totalAmount}
        chipLabel={RECENT_TRANSACTION_ROW.purchasedChipLabel}
      />
    );

    expect(screen.queryByText(/Jan \d/)).not.toBeInTheDocument();
  });
});
