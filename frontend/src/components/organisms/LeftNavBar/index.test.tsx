import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../test-setUp';
import LeftNavBar from '.';
import ContextProvider from 'context';

describe('LeftNavBar', () => {
  test('should render component', () => {
    const element = render(
      <ContextProvider>
        <LeftNavBar />
      </ContextProvider>
    );
    expect(element).toBeDefined();
  });
  test('should render component and navigates to dashboard', () => {
    render(
      <ContextProvider>
        <LeftNavBar />
      </ContextProvider>
    );
    const dashboardIcon = screen.getByTestId('icon-Dashboard');
    fireEvent.click(dashboardIcon);
  });

  it('should call logout when Logout button is clicked', () => {
    render(
      <ContextProvider>
        <LeftNavBar />
      </ContextProvider>
    );
    const logoutButton = screen.getByTestId('icon-Logout');
    fireEvent.click(logoutButton);
    expect(logoutButton).toBeInTheDocument();
  });

  test('should render component and navigate no where', () => {
    render(
      <ContextProvider>
        <LeftNavBar />
      </ContextProvider>
    );
    const logoutIcon = screen.getByTestId('icon-Trade');
    fireEvent.click(logoutIcon);
  });
});
