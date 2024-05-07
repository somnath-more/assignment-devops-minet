import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CryptoSelectCard from '.';
import * as services from '../../../services/index';

describe('CryptoSelectCard Component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
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

    render(<CryptoSelectCard selectedTab="BTC" />);
    await waitFor(() => {
      expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    jest
      .spyOn(services, 'fetchCryptoCoinInfo')
      .mockRejectedValue(new Error('Internal Server Error'));

    render(<CryptoSelectCard selectedTab="BTC" />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  }, 10000);
});
