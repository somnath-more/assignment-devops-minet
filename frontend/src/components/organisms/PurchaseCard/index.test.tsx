import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PurchaseCard from '.';
import * as services from '../../../services/index';

describe('PurchaseCard Component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSetValue = jest.fn();

  const defaultProps = {
    coinsrc: 'coin-icon.png',
    coinName: 'Bitcoin',
    coin: 'BTC',
    coinValue: 50000,
    totalBalance: 100000,
    coinQuantity: 5,
    isBuycard: true,
    onSliderChange: mockSetValue,
  };

  it('renders with buy card content', () => {
    const { getByText } = render(<PurchaseCard {...defaultProps} />);
    expect(getByText('Buy Crypto')).toBeInTheDocument();
  });

  it('renders with sell card content', () => {
    const { getByText } = render(
      <PurchaseCard {...defaultProps} isBuycard={false} />
    );
    expect(getByText('Sell Crypto')).toBeInTheDocument();
    expect(getByText('Total Balance')).toBeInTheDocument();
  });

  it('renders CryptoSelectCard component correctly', async () => {
    jest.spyOn(services, 'fetchCryptoCoinInfo').mockResolvedValue([
      {
        id: 1,
        cryptoSrc: 'path/to/image',
        cryptoName: 'Bitcoin',
        cryptoPrice: 5000,
        cryptoLabel: 'BTC',
      },
    ]);

    render(<PurchaseCard {...defaultProps} isBuycard={false} />);
    await waitFor(() => {
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    jest
      .spyOn(services, 'fetchCryptoCoinInfo')
      .mockRejectedValue(new Error('Internal Server Error'));

    render(<PurchaseCard {...defaultProps} isBuycard={false} />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  }, 10000);

  it('clicking on "Buy max" button sets the slider to 100', () => {
    jest.spyOn(services, 'fetchCryptoCoinInfo').mockResolvedValue([
      {
        id: 1,
        cryptoSrc: 'path/to/image',
        cryptoName: 'Bitcoin',
        cryptoPrice: 5000,
        cryptoLabel: 'BTC',
      },
    ]);

    const { getByText } = render(<PurchaseCard {...defaultProps} />);
    const buyMaxButton = getByText('Buy max');
    fireEvent.click(buyMaxButton);
    expect(defaultProps.onSliderChange).toHaveBeenCalled();
  });

  it('clicking on "Sell max" button sets the slider to 100', () => {
    jest.spyOn(services, 'fetchCryptoCoinInfo').mockResolvedValue([
      {
        id: 1,
        cryptoSrc: 'path/to/image',
        cryptoName: 'Bitcoin',
        cryptoPrice: 5000,
        cryptoLabel: 'BTC',
      },
    ]);

    const { getByText } = render(
      <PurchaseCard {...defaultProps} isBuycard={false} />
    );
    const sellMaxButton = getByText('Sell max');
    fireEvent.click(sellMaxButton);
    expect(defaultProps.onSliderChange).toHaveBeenCalled();
  });

  it('changing the slider change', () => {
    jest.spyOn(services, 'fetchCryptoCoinInfo').mockResolvedValue([
      {
        id: 1,
        cryptoSrc: 'path/to/image',
        cryptoName: 'Bitcoin',
        cryptoPrice: 5000,
        cryptoLabel: 'BTC',
      },
    ]);
    render(<PurchaseCard {...defaultProps} />);

    const sliderElement = screen.getByRole('slider');
    fireEvent.change(sliderElement, { target: { value: 75 } });
  });

  test('handleSliderChange function works as expected', () => {
    jest.spyOn(services, 'fetchCryptoCoinInfo').mockResolvedValue([
      {
        id: 1,
        cryptoSrc: 'path/to/image',
        cryptoName: 'Bitcoin',
        cryptoPrice: 5000,
        cryptoLabel: 'BTC',
      },
    ]);
    const mockOnSliderChange = jest.fn();

    render(
      <PurchaseCard
        coinName="Bitcoin"
        coin="BTC"
        coinValue={10000}
        totalBalance={10000}
        coinQuantity={1}
        isBuycard={true}
        onSliderChange={mockOnSliderChange}
      />
    );

    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: 50 } });

    expect(mockOnSliderChange).toHaveBeenCalledWith(0.5, 5000);
  });

  test('handleSliderChange function works as expected', () => {
    jest.spyOn(services, 'fetchCryptoCoinInfo').mockResolvedValue([
      {
        id: 1,
        cryptoSrc: 'path/to/image',
        cryptoName: 'Bitcoin',
        cryptoPrice: 5000,
        cryptoLabel: 'BTC',
      },
    ]);

    const mockOnSliderChange = jest.fn();

    render(
      <PurchaseCard
        coinName="Bitcoin"
        coin="BTC"
        coinValue={10000}
        totalBalance={10000}
        coinQuantity={1}
        isBuycard={false}
        onSliderChange={mockOnSliderChange}
      />
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 50 } });
    expect(mockOnSliderChange).toHaveBeenCalledWith(0.5, 5000);
  });
});
