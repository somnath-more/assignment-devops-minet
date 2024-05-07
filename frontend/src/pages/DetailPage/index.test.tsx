import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailPage from '.';
import * as services from 'services';
import { render } from 'test-setUp';
import ContextProvider from '../../context';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest
    .fn()
    .mockReturnValue({ state: { name: 'Dodge', label: 'DGE' } }),
}));

jest.mock('services', () => ({
  fetchCryptoCoinInfoWithId: jest.fn(),
  getTransactionById: jest.fn(),
}));

describe('Detail Page Component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('it should render typography', () => {
    render(
      <ContextProvider>
        <DetailPage />
      </ContextProvider>
    );
    screen.debug();
  });
  test('it should call handleTabChange with the correct value', () => {
    render(
      <ContextProvider>
        <DetailPage />
      </ContextProvider>
    );

    fireEvent.click(screen.getByText('Wallet'));
    expect(screen.getByText('Wallet')).toBeInTheDocument();
  });

  test('it should fetch crypto coin info and display it', async () => {
    const mockCryptoCoinInfo = {
      id: 1,
      cryptoName: 'Dodge',
      cryptoSrc: 'https://example.com/dodge.png',
      totalSupply: '18.8M DGE',
      cryptoPrice: 3285553.73,
      cryptoChange: 1.06,
      cryptoMarketCap: '$60.1T',
      cryptoVolume: '$2.9T',
      cryptoLabel: 'DGE',
    };

    const mockTransactionData = [
      {
        date: '2023-11-01',
        amount: 500,
        quantity: 10,
        transactionType: 'purchase',
        transactionStatus: 'success',
        coinName: 'Dodge',
        receiverName: 'John Doe',
      },
    ];

    const fetchCryptoCoinInfoMock = jest.spyOn(
      services,
      'fetchCryptoCoinInfoWithId'
    );
    const getTransactionByIdMock = jest.spyOn(services, 'getTransactionById');

    fetchCryptoCoinInfoMock.mockResolvedValue(mockCryptoCoinInfo);
    getTransactionByIdMock.mockResolvedValue(mockTransactionData);
    render(
      <ContextProvider>
        <DetailPage />
      </ContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Dodge')).toBeInTheDocument();
      expect(screen.getByText('DGE')).toBeInTheDocument();
      expect(screen.getByText('18.8M DGE')).toBeInTheDocument();
      expect(screen.getByText('$60.1T')).toBeInTheDocument();
      expect(screen.getByText('$2.9T')).toBeInTheDocument();
    });

    fetchCryptoCoinInfoMock.mockRestore();
    getTransactionByIdMock.mockRestore();
    const sellBtn = screen.getByText('SELL');
    fireEvent.click(sellBtn);
    const buyBtn = screen.getByText('BUY');
    fireEvent.click(buyBtn);
  });

  test('handles API error gracefully', async () => {
    jest
      .spyOn(services, 'fetchCryptoCoinInfoWithId')
      .mockRejectedValue(new Error('Internal Server Error'));

    render(
      <ContextProvider>
        <DetailPage />
      </ContextProvider>
    );

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  }, 10000);
});
