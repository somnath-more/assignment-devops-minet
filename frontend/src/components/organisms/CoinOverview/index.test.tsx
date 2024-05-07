import { render, screen } from '@testing-library/react';
import CoinOverview from '.';
import theme from '../../../theme';

import Bitcoin from '../../../public/assets/icons/Bitcoin.svg';
import Ethereum from '../../../public/assets/icons/Ethereum.svg';
import Xrp from '../../../public/assets/icons/Xrp.svg';
import Tether from '../../../public/assets/icons/Tether.svg';

const mockPortfolioProps = {
  variant: 'individual',
  coinData: [
    {
      name: 'Total Investment',
      percentage: -1,
      amount: 10000,
    },
  ],
  timeArray: ['1H', '24H', '1W', '1M', '1Y', 'ALL'],
};

const mockGraphProps = {
  GraphPointsData: [
    {
      name: 'JUNE 8',
      uv: 4000,
    },
    {
      name: 'JUNE 15',
      uv: 3000,
    },
    {
      name: 'JUNE 22',
      uv: 2000,
    },
    {
      name: 'JUNE 29',
      uv: 1890,
    },
    {
      name: 'JULY 6',
      uv: 2390,
    },
    {
      name: 'JUL 13',
      uv: 3490,
    },
  ],
  GraphsIndividualData: [
    {
      dataKey: 'uv',
      stroke: theme.palette.minet_error.main,
      fill: theme.palette.minet_error[100],
    },
    {
      dataKey: 'pv',
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary[300],
    },
  ],
};

const mockPriceCorrelationsData = [
  {
    image: Bitcoin,
    title: 'Bitcoin',
    subTitle: 'Moves tightly together',
    amount: 3285553.73,
    percentage: 100,
  },
  {
    image: Ethereum,
    title: 'Ethereum',
    subTitle: 'Moves tightly together',
    amount: 230966.85,
    percentage: 86,
  },
  {
    image: Xrp,
    title: 'XRP',
    subTitle: 'Moves tightly together',
    amount: 60.2,
    percentage: 10,
  },
  {
    image: Tether,
    title: 'Tether',
    subTitle: 'Moves tightly together',
    amount: 74.28,
    percentage: 2,
  },
  {
    image: Ethereum,
    title: 'Ethereum 2',
    subTitle: 'Moves tightly together',
    amount: 60.2,
    percentage: 10,
  },
  {
    image: Bitcoin,
    title: 'Dodge Coin',
    subTitle: 'Moves tightly together',
    amount: 74.28,
    percentage: 2,
  },
];

test('renders CoinOverview component with mock data', () => {
  render(
    <CoinOverview
      portfolioProps={{ ...mockPortfolioProps, variant: 'individual' }}
      graphProps={{ ...mockGraphProps }}
      priceCorrelationsData={{ ...mockPriceCorrelationsData }}
    />
  );

  const portfolioValueCard = screen.getByText('Bitcoin');
  expect(portfolioValueCard).toBeInTheDocument();

  const aboutBitcoinText = screen.getByText('About Bitcoin');
  expect(aboutBitcoinText).toBeInTheDocument();

  const officialWebsiteText = screen.getByText('Official Website');
  expect(officialWebsiteText).toBeInTheDocument();

  const priceCorrelationTitle = screen.getByText('Price correlation with');
  expect(priceCorrelationTitle).toBeInTheDocument();

  const subtitleElements = screen.getAllByText('Moves tightly together');

  const firstSubtitleElement = subtitleElements[0];
  expect(firstSubtitleElement).toBeInTheDocument();

  const secondSubtitleElement = subtitleElements[1];
  expect(secondSubtitleElement).toBeInTheDocument();
});
