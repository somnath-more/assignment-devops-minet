import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import USDCoin from '.';

describe('USD Coin component', () => {
  test('it should render Typography component', () => {
    render(<USDCoin />);

    const textElement = screen.getByText('USD Coin');
    expect(textElement).toBeInTheDocument();
  });

  test('its should render image component', () => {
    render(<USDCoin />);

    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
  });
});
