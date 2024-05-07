import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BuyingAssest from '.';
import * as services from '../../services/index';
import { useLocation } from 'react-router-dom';
import { TRANSACTION_TYPE } from 'utils/constants';
import { render } from '../../test-setUp';
import { MinetStore } from 'context';
import { formatCurrentDate } from 'utils/constants/helperFunction';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('../../services/index', () => ({
  ...jest.requireActual('../../services/index'),
  updateCryptoHolding: jest.fn(),
  postCryptoHolding: jest.fn(),
}));

jest.mock('../../services/index', () => ({
  getUserDetails: jest.fn(),
  getCryptoHolding: jest.fn(),
  updateCryptoHolding: jest.fn(),
  postCryptoHolding: jest.fn(),
  postWalletDetails: jest.fn(),
  postTransactionDetails: jest.fn(),
  getWalletDetails: jest.fn(),
  updateWalletDetails: jest.fn(),
}));

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: '', status: 201 })),
  },
}));

describe('Buying Assests Component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const getWalletDetails = jest.spyOn(services, 'getWalletDetails');
    getWalletDetails.mockResolvedValue({
      data: [
        {
          id: 1,
          userId: 1,
          amount: 100000,
        },
      ],
    });

    const updateWalletDetails = jest.spyOn(services, 'updateWalletDetails');
    updateWalletDetails.mockResolvedValue({
      data: [
        {
          id: 1,
          userId: 1,
          amount: 100000,
        },
      ],
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
    email: 'abc@gmail.com',
  };
  test('handles successful buy click', async () => {
    const mockLocation = {
      state: {
        id: 1,
        label: 'BTC',
        name: 'Bitcoin',
      },
    };

    useLocation.mockReturnValue(mockLocation);

    services.getUserDetails.mockResolvedValueOnce({ balance: 100000 });

    const getCryptoHoldingMock = jest.spyOn(services, 'getCryptoHolding');
    getCryptoHoldingMock.mockResolvedValueOnce({
      data: [{ id: 1, amount: 500 }],
    });

    const updateCryptoHoldingMock = jest.spyOn(services, 'updateCryptoHolding');
    updateCryptoHoldingMock.mockResolvedValueOnce({});

    render(
      <MinetStore.Provider value={{ userDetails }}>
        <BuyingAssest />
      </MinetStore.Provider>
    );

    await waitFor(() => {
      const testElement = screen.getByText('Total Balance - $100000');
      expect(testElement).toBeInTheDocument();
    });

    const buyMax = screen.getByText('Buy max');
    expect(buyMax).toBeInTheDocument();
    fireEvent.click(buyMax);

    const buyButton = screen.getByText('Buy Now');

    await waitFor(() => {
      expect(buyButton).not.toBeDisabled();
    });
    fireEvent.click(buyButton);

    await waitFor(() => {
      expect(services.updateCryptoHolding).toHaveBeenCalledWith(1, 50250);
    });
  });

  test('handles successful when cryptoholding is empty', async () => {
    const mockLocation = {
      state: {
        id: 1,
        label: 'BTC',
        name: 'Bitcoin',
      },
    };

    useLocation.mockReturnValue(mockLocation);

    services.getUserDetails.mockResolvedValueOnce({ balance: 100000 });

    const getCryptoHoldingMock = jest.spyOn(services, 'getCryptoHolding');
    getCryptoHoldingMock.mockResolvedValueOnce({
      data: [],
    });
    const getWalletDetails = jest.spyOn(services, 'getWalletDetails');
    getWalletDetails.mockResolvedValue({
      data: [
        {
          id: 1,
          userId: 1,
          amount: 100000,
        },
      ],
    });

    const postCryptoHoldingMock = jest.spyOn(services, 'postCryptoHolding');
    postCryptoHoldingMock.mockResolvedValueOnce({});

    render(
      <MinetStore.Provider value={{ userDetails }}>
        <BuyingAssest />
      </MinetStore.Provider>
    );

    await waitFor(() => {
      const testElement = screen.getByText('Total Balance - $100000');
      expect(testElement).toBeInTheDocument();
    });

    const buyMax = screen.getByText('Buy max');
    expect(buyMax).toBeInTheDocument();
    fireEvent.click(buyMax);

    const buyButton = screen.getByText('Buy Now');

    await waitFor(() => {
      expect(buyButton).not.toBeDisabled();
    });
    fireEvent.click(buyButton);

    const expectedHolding = {
      userId: 3,
      cryptoId: 1,
      amount: 100000,
    };
    await waitFor(() => {
      expect(services.updateWalletDetails).toHaveBeenCalledTimes(1);
    });
  });

  test('handles successful buy click and post call the transactions', async () => {
    const mockLocation = {
      state: {
        id: 1,
        label: 'BTC',
        name: 'Bitcoin',
      },
    };

    useLocation.mockReturnValue(mockLocation);

    const postTransactionDetailsMock = jest.spyOn(
      services,
      'postTransactionDetails'
    );
    const axiosResponse = {
      data: '',
      status: 201,
    };

    postTransactionDetailsMock.mockResolvedValueOnce(axiosResponse);

    services.getUserDetails.mockResolvedValueOnce({ balance: 100000 });

    const getCryptoHoldingMock = jest.spyOn(services, 'getCryptoHolding');
    getCryptoHoldingMock.mockResolvedValueOnce({
      data: [{ id: 1, amount: 500 }],
    });

    const updateCryptoHoldingMock = jest.spyOn(services, 'updateCryptoHolding');
    updateCryptoHoldingMock.mockResolvedValueOnce({});

    render(
      <MinetStore.Provider value={{ userDetails }}>
        <BuyingAssest />
      </MinetStore.Provider>
    );

    await waitFor(() => {
      const testElement = screen.getByText('Total Balance - $100000');
      expect(testElement).toBeInTheDocument();
    });

    const buyMax = screen.getByText('Buy max');
    fireEvent.click(buyMax);

    const buyButton = screen.getByText('Buy Now');

    await waitFor(() => {
      expect(buyButton).not.toBeDisabled();
    });

    fireEvent.click(buyButton);

    const currentDate = new Date();
    await waitFor(() => {
      const expectedTransactionData = {
        amount: 100000,
        quantity: 0.0301319,
        transactionType: TRANSACTION_TYPE,
        transactionStatus: 'success',
        coinName: 'Bitcoin',
        transactionDate: formatCurrentDate(currentDate),
        receiverName: 'xyz',
        userId: 1,
        cryptoId: 1,
      };
      expect(
        screen.getByText('Purchase is completed, please check your')
      ).toBeInTheDocument();
    });
  });

  test('handles successful buy click and sets currentState to 1', async () => {
    const mockLocation = {
      state: {
        id: 1,
        label: 'BTC',
        name: 'Bitcoin',
      },
    };

    useLocation.mockReturnValue(mockLocation);

    const postTransactionDetailsMock = jest.spyOn(
      services,
      'postTransactionDetails'
    );

    const responseMock = {
      status: 201,
      data: '',
    };

    postTransactionDetailsMock.mockResolvedValueOnce(responseMock);

    services.getUserDetails.mockResolvedValueOnce({ balance: 100000 });

    const getCryptoHoldingMock = jest.spyOn(services, 'getCryptoHolding');
    getCryptoHoldingMock.mockResolvedValueOnce({
      data: [{ id: 1, amount: 500 }],
    });

    const updateCryptoHoldingMock = jest.spyOn(services, 'updateCryptoHolding');
    updateCryptoHoldingMock.mockResolvedValueOnce({});

    render(
      <MinetStore.Provider value={{ userDetails }}>
        <BuyingAssest />
      </MinetStore.Provider>
    );

    await waitFor(() => {
      const testElement = screen.getByText('Total Balance - $100000');
      expect(testElement).toBeInTheDocument();
    });

    const buyMax = screen.getByText('Buy max');
    fireEvent.click(buyMax);

    const buyButton = screen.getByText('Buy Now');

    await waitFor(() => {
      expect(buyButton).not.toBeDisabled();
    });

    fireEvent.click(buyButton);

    await waitFor(() => {
      expect(services.postTransactionDetails).toHaveBeenCalled();
      expect(
        screen.getByText('Purchase is completed, please check your')
      ).toBeInTheDocument();
    });
    const usdBtn = screen.getByText('GO TO USD COIN');
    fireEvent.click(usdBtn);
  });

  test('handles successful buy click when cryptoCoin is Ethereum', async () => {
    const mockLocation = {
      state: {
        id: 1,
        label: 'ETH',
        name: 'Ethereum',
      },
    };

    useLocation.mockReturnValue(mockLocation);
    services.getUserDetails.mockResolvedValueOnce({ balance: 100000 });

    render(
      <MinetStore.Provider value={{ userDetails }}>
        <BuyingAssest />
      </MinetStore.Provider>
    );

    await waitFor(() => {
      const testElement = screen.getByText('Total Balance - $100000');
      expect(testElement).toBeInTheDocument();
    });

    const buyMax = screen.getByText('Buy max');
    expect(buyMax).toBeInTheDocument();
    fireEvent.click(buyMax);

    const buyButton = screen.getByText('Buy Now');

    await waitFor(() => {
      expect(buyButton).not.toBeDisabled();
    });
    fireEvent.click(buyButton);
  });

  test('handles API error gracefully', async () => {
    jest
      .spyOn(services, 'getUserDetails')
      .mockRejectedValue(new Error('Internal Server Error'));

    render(<BuyingAssest />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  }, 10000);
});
