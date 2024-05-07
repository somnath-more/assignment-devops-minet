import React from 'react';
import PortfolioCard from '.';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { MinetStore } from '../../../context';
const mockTotalAmount = 22;
jest.mock('services', () => ({
   getCryptoHoldingByUserID: jest.fn().mockResolvedValue({
    data: [
      {
        userId: 24,
        cryptoId: 1,
        amount: 11,
        quantity: 0.0029128,
        id: 5,
      },
      {
        userId: 24,
        cryptoId: 2,
        amount: 11,
        quantity: 0.0345582,
        id: 6,
      },
    ],
  }),
  getCryptoHolding: jest.fn().mockResolvedValue({
    data: [
      {
        userId: 19,
        cryptoId: 1,
        amount: 11,
        quantity: 0.0031397,
        id: 5,
      },
      {
        userId: 19,
        cryptoId: 2,
        amount: 11,
        quantity: 0.0031397,
        id: 7,
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
const userDetails = {
  id: 1,
};

test('it should render Portfolio card', () => {
  const { container } = render(
    <MinetStore.Provider value={{ userDetails }}>
      <PortfolioCard totalAmount={mockTotalAmount} />
    </MinetStore.Provider>
  );
  expect(container).toBeInTheDocument();
});

test('it should display the portfolio data', () => {
  const { getByText } = render(
    <MinetStore.Provider value={{ userDetails }}>
      <PortfolioCard totalAmount={mockTotalAmount} />
    </MinetStore.Provider>
  );
  const portfolioData = getByText('My portfolio');
  expect(portfolioData).toBeInTheDocument();
});

it('should render with default props when not provided', () => {
  const { getByText, getAllByText } = render(
    <MinetStore.Provider value={{ userDetails }}>
      <PortfolioCard />
    </MinetStore.Provider>
  );
  expect(getByText('Total Balance')).toBeInTheDocument();
  const elementsWithDefaultText = getAllByText(/0.00/);
  expect(elementsWithDefaultText.length).toBeGreaterThan(0);
});

it('should render with the total amount ', async () => {
  const { getByText } = render(
    <MinetStore.Provider value={{ userDetails }}>
      <PortfolioCard />
    </MinetStore.Provider>
  );
  expect(getByText('Total Balance')).toBeInTheDocument();
  await waitFor(() => {
    expect(
      getByText(
        `$${mockTotalAmount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      )
    ).toBeInTheDocument();
  });
});
