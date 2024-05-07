import { render } from 'test-setUp';
import SellPage from '.';
import { fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import {
  CRYPTO_INFO,
  MOCK_CRYPTO_DATA,
  MOCK_HOLDINGS_DATA,
  SELL,
  SELL_MAX,
  USD_VALUE,
} from 'utils/constants';
import { useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));
jest.mock('../../services/API', () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url.includes('/cryptocurrency/1')) {
      return Promise.resolve({
        data: MOCK_CRYPTO_DATA,
      });
    } else if (url.includes('/cryptoholding?userId=1&cryptoId=1')) {
      return Promise.resolve({
        data: [MOCK_HOLDINGS_DATA],
      });
    } else if (url.includes('/cryptoholding?cryptoId=1')) {
      return Promise.resolve({
        data: [
          {
            quantity: 0.03330042,
            price: 56711.77,
            userId: 1,
            cryptoId: 10,
            id: 14,
            amount: 56711.77,
          },
        ],
      });
    }
  }),
  post: jest.fn().mockResolvedValue({ id: 1 }),
  patch: jest.fn().mockResolvedValue({ id: 1 }),
  delete: jest.fn().mockResolvedValue({ id: 1 }),
}));
describe('sell page', () => {
  test('it should render component', async () => {
    const mockLocation = {
      state: {
        id: 1,
        label: 'BTC',
        name: 'Bitcoin',
      },
    };

    useLocation.mockReturnValue(mockLocation);
    const { getByTestId, getByText } = render(<SellPage />);
    const component = getByTestId('sell-page');
    expect(component).toBeInTheDocument();

    await waitFor(() => {
      const usdPage = getByText(USD_VALUE);
      expect(usdPage).toBeInTheDocument();
    });
    const buyMaxButton = getByText(SELL_MAX);
    act(() => {
      fireEvent.click(buyMaxButton);
    });
    const Sell = getByTestId(SELL);

    await waitFor(() => {
      expect(Sell).not.toBeDisabled();
    });

    fireEvent.click(Sell);
  });
  test('it should render the successfully', async () => {
    const mockLocation = {
      state: {
        id: 1,
        label: 'BTC',
        name: 'Bitcoin',
      },
    };

    useLocation.mockReturnValue(mockLocation);
    const { getByTestId, getByText, getByRole } = render(<SellPage />);
    await waitFor(() => {
      const usdPage = getByText('0.0234510');
      expect(usdPage).toBeInTheDocument();
    });
    const Sell = getByTestId(SELL);
    const slider = getByRole('slider');
    act(() => {
      fireEvent.change(slider, {
        target: {
          value: 10,
        },
      });
    });
    await waitFor(() => {
      expect(Sell).not.toBeDisabled();
    });

    fireEvent.click(Sell);
    await waitFor(() => {
      const usdPage = getByText(CRYPTO_INFO.sellCompletedText);
      expect(usdPage).toBeInTheDocument();
    });
    const usdBtn = getByText(CRYPTO_INFO.goToUsdCoinButton);
    fireEvent.click(usdBtn);
  });
});
