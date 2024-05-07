import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TradeHeaderWatchList from '.';
import {
  MOCK_CRYPTO_DATA_TEST,
  MOCK_WATCHLIST_DATA_TEST,
} from 'utils/constants';
import ContextProvider from 'context';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest
    .fn()
    .mockReturnValue({ state: { name: 'Dodge', label: 'DGE' } }),
}));

jest.mock('../../../services/GECKO_API', () => ({
  get: jest.fn().mockImplementation(() => {
    return Promise.resolve({
      data: MOCK_CRYPTO_DATA_TEST,
      status: 200,
    });
  }),
}));

jest.mock('../../../services/API', () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url.includes('/watchlist?user')) {
      return Promise.resolve({
        data: MOCK_WATCHLIST_DATA_TEST,
      });
    }
  }),
  post: jest.fn().mockImplementation((url, payload) => {
    if (url.includes('/watchlist')) {
      return Promise.resolve();
    }
  }),
  delete: jest.fn().mockImplementation((url, payload) => {
    if (url.includes('/watchlist')) {
      return Promise.resolve();
    }
  }),
}));

describe('TradeHeaderWatchList component', () => {
  it('should handles the search input change correctly', () => {
    render(
      <BrowserRouter>
        <ContextProvider>
          <TradeHeaderWatchList />
        </ContextProvider>
      </BrowserRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search all assests');
    fireEvent.change(searchInput, { target: { value: 'Bitcoin' } });

    expect(searchInput).toHaveValue('Bitcoin');
  });

  it('should update the selected tab', () => {
    render(
      <BrowserRouter>
        <ContextProvider>
          <TradeHeaderWatchList />
        </ContextProvider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('tab1')).toBeInTheDocument();
    const watchlistTab = screen.getByTestId('tab2');
    fireEvent.click(watchlistTab);
    expect(screen.getByTestId('tab2')).toBeInTheDocument();
  });

  it('should display message if no assets found', () => {
    jest.mock('../../../services/GECKO_API', () => ({
      get: jest.fn().mockImplementation(() => {
        return Promise.resolve({
          data: {},
        });
      }),
    }));
    render(
      <BrowserRouter>
        <ContextProvider>
          <TradeHeaderWatchList />
        </ContextProvider>
      </BrowserRouter>
    );
    const noAssetsMessage = screen.getByText('No Assets found');
    expect(noAssetsMessage).toBeInTheDocument();
  });

  it('should toggle the watchlist on icon click', () => {
    render(
      <BrowserRouter>
        <ContextProvider>
          <TradeHeaderWatchList />
        </ContextProvider>
      </BrowserRouter>
    );
    const watchlistIcon = screen.getAllByAltText('img')[0];
    fireEvent.click(watchlistIcon);
  });

  it('should toggle the all_Assests on icon click for all assets', async () => {
    render(
      <BrowserRouter>
        <ContextProvider>
          <TradeHeaderWatchList />
        </ContextProvider>
      </BrowserRouter>
    );
    await waitFor(() => {
      const BitcoinCrypto = screen.getByText('Bitcoin');
      expect(BitcoinCrypto).toBeInTheDocument();
    });
    const watchlistIcon = screen.getAllByTestId('icon-id')[0];
    fireEvent.click(watchlistIcon);
  });

  it('should toggle the watchlist on icon click for watchlist', async () => {
    render(
      <BrowserRouter>
        <ContextProvider>
          <TradeHeaderWatchList />
        </ContextProvider>
      </BrowserRouter>
    );
    await waitFor(() => {
      const BitcoinCrypto = screen.getByText('Bitcoin');
      expect(BitcoinCrypto).toBeInTheDocument();
    });
    const watchlistIcon = screen.getAllByTestId('icon-id')[0];
    fireEvent.click(watchlistIcon);
    const watchlistTab = screen.getByTestId('tab2');
    fireEvent.click(watchlistTab);
    await waitFor(() => {
      const BitcoinCrypto = screen.getByText('Ethereum');
      expect(BitcoinCrypto).toBeInTheDocument();
    });
    const watchlistIcon2 = screen.getAllByTestId('icon-id')[0];
    fireEvent.click(watchlistIcon2);
  });

  it('should handles row click in all assets tab to redirect trade', async () => {
    render(
      <BrowserRouter>
        <ContextProvider>
          <TradeHeaderWatchList />
        </ContextProvider>
      </BrowserRouter>
    );
    await waitFor(() => {
      const BitcoinCrypto = screen.getByText('Bitcoin');
      expect(BitcoinCrypto).toBeInTheDocument();
    });

    const multipleRowWithId = screen.getAllByTestId('first-cell');
    const firstRowItem = multipleRowWithId[0];
    fireEvent.click(firstRowItem);
  });

  it('should handles row click in Watchlist tab to redirect trade', async () => {
    render(
      <BrowserRouter>
        <ContextProvider>
          <TradeHeaderWatchList />
        </ContextProvider>
      </BrowserRouter>
    );
    await waitFor(() => {
      const BitcoinCrypto = screen.getByText('Bitcoin');
      expect(BitcoinCrypto).toBeInTheDocument();
    });
    const watchlistIcon = screen.getAllByTestId('icon-id')[0];
    fireEvent.click(watchlistIcon);
    const watchlistTab = screen.getByTestId('tab2');
    fireEvent.click(watchlistTab);
    await waitFor(() => {
      const BitcoinCrypto = screen.getByText('Ethereum');
      expect(BitcoinCrypto).toBeInTheDocument();
    });
    const multipleRowWithId = screen.getAllByTestId('first-cell');
    const firstRowItem = multipleRowWithId[0];
    fireEvent.click(firstRowItem);
  });
});
