import { render } from 'test-setUp';
import WishlistCard from '.';
import { PORTFOLIO_GRAPH_DATA } from 'utils/constants';
import { fireEvent, waitFor } from '@testing-library/react';

jest.mock('services', () => ({
  getByWatchListData: jest.fn().mockResolvedValue({
    data: [
      {
        id: 1,
        userId: 1,
        cryptoId: 1,
      },
      {
        id: 2,
        userId: 1,
        cryptoId: 2,
      },
    ],
  }),
  getByCryptoCurrency: jest.fn().mockResolvedValue({
    data: [
      {
        id: 1,
        cryptoName: 'Bitcoin',
        cryptoSrc:
          'https://s3-alpha-sig.figma.com/img/3081/886d/bb95f08981a385cf742cbde18bac74e1?Expires=1699228800&Signature=EFt22tLefBzk6yfsMz11hwh5WynE8fQ-ogQPbXXnmlhHb6ckH6zbpJ8akhjL1MBd7JjnWIKbUMY9cjJNCR5NHPoMGYEPBj7kg-WzlyndTKxZtTIs74i0Ws-Rh3F0jpVSyYENwi8-MhxRDu1EFJ47-wE~1QXDAAz1nMOXG2Hjy--CSn1Bu0g7LLurkTXYGkaLWJ3QwW2J1XgiVLMvywp8~Qt1zwLiy-5b~tG5vhY5Fk0DXMfycOJz5d4HCGnV2XM~0yZW4Df4CF-FRLEe6msXBkjWzCEz63Mr3tReIxyClJeIqmxYKROyG9Vfij2WkwVXqtRv27DokPbA8IS~LIYR-A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        totalSupply: '18.8M BTC',
        cryptoPrice: 3285553.73,
        cryptoChange: '1.06%',
        cryptoMarketCap: '$60.1T',
        cryptoVolume: '$2.9T',
        cryptoLabel: 'BTC',
      },
      {
        id: 2,
        cryptoName: 'Ethereum',
        cryptoSrc:
          'https://s3-alpha-sig.figma.com/img/4d98/98f1/34ba65c8fe125aa34b85606d353a3805?Expires=1699228800&Signature=N8UtIYYzRNbi1e6a~o9IJ9SllsugRATB3xqCYA9MMOxVBpwdAUQeX7x9YyW7teLxETFUONVZM3wYMBWE8agfwGFR3d0xtPaPmjiiv2zcKmeXnt3hYZJgwg904ycRNOZRyfHMSyZDkxePthpLj4sV3BqRok3hqpSe3pxR8hcXmKQAaVL0xOM-anHialQqyroWc66cUG-TAIVqQRCGz8BYCq4ySCbzb3djJOzhKIHWV5FDq1ZffNH4Dc9pxCbgglG0v4Iwm9qy8Vo6bQrLD0FdMg6lZ6vWqnKceKHFRGULqEiEtrFkL0CjZdsImxeZVy1HqG2YPManHAt6h1vJAZQL3g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        cryptoPrice: 216678.1,
        cryptoMarketCap: '$162.92',
        cryptoChange: '5.49%',
        cryptoVolume: '$11.5T',
        totalSupply: '122.60M ETH',
        cryptoLabel: 'ETH',
      },
    ],
  }),
}));

describe('wishlist card', () => {
  const mockFn = jest.fn();

  test('it should render WishlistCard component', async () => {
    const { getByTestId } = render(
      <WishlistCard
        portfolioGraphData={PORTFOLIO_GRAPH_DATA}
        watchListHandler={mockFn}
      />
    );
    expect(getByTestId('wishlist-card')).toBeInTheDocument();
  });

  test('should render WishlistCard component with three graphs', async () => {
    const { getByTestId } = render(
      <WishlistCard
        portfolioGraphData={PORTFOLIO_GRAPH_DATA.slice(0, 3)}
        watchListHandler={mockFn}
      />
    );

    const wishlistCard = getByTestId('wishlist-card');
    expect(wishlistCard).toBeInTheDocument();
    await waitFor(() => {
      const bitcoin = getByTestId('wishlist-1');
      expect(bitcoin).toBeInTheDocument();
    });
  });

  test('should render WishlistCard component with two graphs', async () => {
    const { getAllByTestId, getByTestId } = render(
      <WishlistCard
        portfolioGraphData={PORTFOLIO_GRAPH_DATA.slice(0, 2)}
        watchListHandler={mockFn}
      />
    );

    const wishlistCard = getByTestId('wishlist-card');
    expect(wishlistCard).toBeInTheDocument();
    await waitFor(() => {
      const bitcoin = getByTestId('wishlist-1');
      expect(bitcoin).toBeInTheDocument();
    });
    const wishlists = getAllByTestId('wishlist');
    expect(wishlists).toHaveLength(2);
  });

  test('should call watchListHandler function on click', async () => {
    const { getByTestId } = render(
      <WishlistCard
        portfolioGraphData={PORTFOLIO_GRAPH_DATA.slice(0, 2)}
        watchListHandler={mockFn}
      />
    );
    await waitFor(() => {
      const bitcoin = getByTestId('wishlist-1');
      fireEvent.click(bitcoin);
    });
    expect(mockFn).toHaveBeenCalledWith(1);
  });

  test('should render WishlistCard component', async () => {
    const { getByTestId, getByText, getByAltText } = render(
      <WishlistCard
        portfolioGraphData={PORTFOLIO_GRAPH_DATA}
        watchListHandler={mockFn}
      />
    );
    const wishlistCard = getByTestId('wishlist-card');
    expect(wishlistCard).toBeInTheDocument();
    await waitFor(() => {
      const bitcoin = getByText('Bitcoin');
      expect(bitcoin).toBeInTheDocument();
      const bitcoinImage = getByAltText('Bitcoin');
      expect(bitcoinImage).toBeInTheDocument();
    });
  });
  test('should set Bitcoin in the watchlist when mappedData is empty', async () => {
    jest
      .spyOn(require('services'), 'getByWatchListData')
      .mockResolvedValue({ data: [] });
    const { getByTestId } = render(
      <WishlistCard
        portfolioGraphData={PORTFOLIO_GRAPH_DATA}
        watchListHandler={mockFn}
      />
    );

    await waitFor(() => {
      const bitcoin = getByTestId('wishlist-1');
      expect(bitcoin).toBeInTheDocument();
    });
  });
  test('should set Bitcoin in the watchlist when mappedData is empty', async () => {
    jest
      .spyOn(require('services'), 'getByWatchListData')
      .mockResolvedValue({ data: [] });
    jest
      .spyOn(require('services'), 'getByCryptoCurrency')
      .mockRejectedValue(new Error('Test error'));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const { getByTestId } = render(
      <WishlistCard
        portfolioGraphData={PORTFOLIO_GRAPH_DATA}
        watchListHandler={mockFn}
      />
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error fetching data:',
        new Error('Test error')
      );
    });
    consoleErrorSpy.mockRestore();
  });
});
