import React from 'react';
import { render, screen } from '@testing-library/react';
import TradingScreen from '.';
import '@testing-library/jest-dom';
import ContextProvider from 'context';
import { BrowserRouter } from 'react-router-dom';

describe('TradingScreen component', () => {
  it('should render the component', () => {
    render(
      <BrowserRouter>
        <ContextProvider>
          <TradingScreen />
        </ContextProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('Trade')).toBeInTheDocument();
  });
});
