import React from 'react';
import { waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import USDPage from '.';
import * as services from 'services';
import { MinetStore } from '../../context';
import { render } from 'test-setUp';

jest.mock('services', () => ({
  getTransactionById: jest.fn(() => Promise.resolve([])),
  postWalletDetails: jest.fn(() => Promise.resolve({})),
  getWalletDetails: jest.fn(),
}));

describe('USDPage', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const getTransactionByIdMock = jest.spyOn(services, 'getWalletDetails');

    getTransactionByIdMock.mockResolvedValue({
      data: [{ id: 1, amount: 1000 }],
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
  const userDetails = {
    id: 1,
  };

  test('it should fetch transactions and update state accordingly for transaction type Purchased', async () => {
    const mockTransactions = [
      {
        date: '2023-11-02',
        amount: 100,
        quantity: 1,
        transactionType: 'Purchased',
        transactionStatus: 'success',
        coinName: 'Bitcoin',
        receiverName: 'John Doe',
      },
    ];

    const mockTotalAmount = 100;

    (services.getTransactionById as jest.Mock).mockResolvedValue(
      mockTransactions
    );
    (services.postWalletDetails as jest.Mock).mockResolvedValue({});
    render(
      <MinetStore.Provider value={{ userDetails }}>
        <USDPage />
      </MinetStore.Provider>
    );

    await waitFor(() => {
      expect(services.getTransactionById).toHaveBeenCalledTimes(1);
    });
  });

  test('it should fetch transactions and update state accordingly for transaction type Sold', async () => {
    const mockTransactions = [
      {
        date: '2023-11-02',
        amount: 100,
        quantity: 1,
        transactionType: 'Sold',
        transactionStatus: 'success',
        coinName: 'Bitcoin',
        receiverName: 'John Doe',
      },
    ];

    (services.getTransactionById as jest.Mock).mockResolvedValue(
      mockTransactions
    );
    (services.postWalletDetails as jest.Mock).mockResolvedValue({});
    render(
      <MinetStore.Provider value={{ userDetails }}>
        <USDPage />
      </MinetStore.Provider>
    );

    await waitFor(() => {
      expect(services.getTransactionById).toHaveBeenCalledTimes(1);
    });
  });

  test('handles API error gracefully', async () => {
    jest
      .spyOn(services, 'getTransactionById')
      .mockRejectedValue(new Error('Internal Server Error'));

    render(
      <MinetStore.Provider value={{ userDetails }}>
        <USDPage />
      </MinetStore.Provider>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  }, 10000);
});
