import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyWalletCard from '.';
import * as services from 'services';
import { render } from 'test-setUp';
import { MinetStore } from 'context';

jest.mock('services', () => ({
  getWalletData: jest.fn().mockResolvedValueOnce as any,
  getTransactionData: jest.fn().mockResolvedValueOnce as any,
}));

jest.mock('services', () => ({
  getWalletData: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          userId: 1,
          transactionDate: '2023-9-8',
          transactionType: 'Purchased',
          availableAmount: '8000.86',
          id: 1,
        },
      ],
    })
  ),
  getTransactionData: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          id: 1,
          amount: 1023400,
          quantity: 23420.0201,
          transactionType: 'purchased',
          transactionStatus: 'success',
          coinName: 'BitCoin',
          status: 'purchased',
          date: '2023-10-30',
          receiverName: 'xyz',
          userId: 1,
          cryptoId: 1,
        },
        {
          id: 3,
          amount: 102400,
          quantity: 123.0201,
          transactionType: 'purchased',
          transactionStatus: 'success',
          coinName: 'Ethereum',
          status: 'purchased',
          date: '2023-10-30',
          receiverName: 'xyz',
          userId: 1,
          cryptoId: 2,
        },
        {
          id: 3,
          amount: 102400,
          quantity: 123.0201,
          transactionType: 'purchased',
          transactionStatus: 'success',
          coinName: 'SomeOtherCoin',
          status: 'purchased',
          date: '2023-10-30',
          receiverName: 'xyz',
          userId: 1,
          cryptoId: 2,
        },
      ],
    })
  ),
}));

describe('MyWalletCard Component', () => {
  const userDetails = {
    id: 1,
  };
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should render the typography elements', async () => {
    render(
      <MinetStore.Provider value={{ userDetails }}>
        <MyWalletCard height={'344px'} width={'388px'} />
      </MinetStore.Provider>
    );

    expect(screen.getByText('My wallets')).toBeInTheDocument();
    expect(screen.getByText('USD Coin')).toBeInTheDocument();
    expect(screen.getByText('Recent transaction')).toBeInTheDocument();
    expect(screen.getByText('View All')).toBeInTheDocument();
  });

  test('it should render transaction when image is true', async () => {
    render(
      <MinetStore.Provider value={{ userDetails }}>
        <MyWalletCard height={'344px'} width={'388px'} />
      </MinetStore.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('transaction-box')).toBeInTheDocument();
    });
  });

  test('it should render default image when image is false', async () => {
    render(
      <MinetStore.Provider value={{ userDetails }}>
        {' '}
        <MyWalletCard image={false} height={'344px'} width={'388px'} />{' '}
      </MinetStore.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('image-box')).toBeInTheDocument();
    });
  });

  test('it should set USD Coin to initial value when wallet data is empty', async () => {
    jest.spyOn(services, 'getWalletData').mockResolvedValueOnce({ data: [] });

    render(
      <MinetStore.Provider value={{ userDetails }}>
        <MyWalletCard height={'344px'} width={'388px'} />
      </MinetStore.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('$ 0.00')).toBeInTheDocument();
    });
  });
});
