import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '.';
import { ThemeProvider } from '@emotion/react';
import theme from 'theme';
import { render } from '../../../test-setUp';
import * as services from 'services';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import ContextProvider from 'context';

jest.mock('../../../services/API', () => ({
  getUserDetailsByEmail: jest.fn(),
  getWalletDetails: jest.fn(),
}));

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

jest.mock('axios');
describe('Login Component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('it should render typography element and validate email field', () => {
    const mockOnForgotClick = jest.fn();
    const mockOnSocialClick = jest.fn();
    const mockOnLoginClick = jest.fn();
    const mockOnSignupClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <Login
            padding={'0px 64px 0 64px'}
            onForgotClick={mockOnForgotClick}
            onSocialClick={mockOnSocialClick}
            onSignupClick={mockOnSignupClick}
          />
        </ContextProvider>
      </ThemeProvider>
    );

    const emailInput = screen.getByPlaceholderText('Enter your email');

    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
    expect(screen.getByText('Fill the email field')).toBeInTheDocument();
    expect(mockOnLoginClick).not.toHaveBeenCalled();

    fireEvent.change(emailInput, {
      target: { value: 'validemail@example.com' },
    });
    expect(screen.queryByText('Fill the email field')).not.toBeInTheDocument();
    expect(mockOnLoginClick).not.toHaveBeenCalled();

    fireEvent.change(emailInput, { target: { value: '' } });
    expect(screen.getByText('Fill the email field')).toBeInTheDocument();
    expect(mockOnLoginClick).not.toHaveBeenCalled();
  });

  test('it should render typography element and validate password field', () => {
    const mockOnForgotClick = jest.fn();
    const mockOnSocialClick = jest.fn();
    const mockOnLoginClick = jest.fn();
    const mockOnSignupClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <Login
            padding={'0px 64px 0 64px'}
            onForgotClick={mockOnForgotClick}
            onSocialClick={mockOnSocialClick}
            onSignupClick={mockOnSignupClick}
          />
        </ContextProvider>
      </ThemeProvider>
    );

    const passwordInput = screen.getByPlaceholderText('Enter your password');

    fireEvent.change(passwordInput, { target: { value: 'invalidPassword' } });
    expect(
      screen.getByText(
        'A min of 8 charaters with atleast 1 special character and number included'
      )
    ).toBeInTheDocument();
    expect(mockOnLoginClick).not.toHaveBeenCalled();

    fireEvent.change(passwordInput, { target: { value: 'ValidP@ssword123' } });
    expect(
      screen.queryByText(
        'A min of 8 charaters with atleast 1 special character and number included'
      )
    ).not.toBeInTheDocument();
    expect(mockOnLoginClick).not.toHaveBeenCalled();

    fireEvent.change(passwordInput, { target: { value: '' } });
    expect(
      screen.getByText(
        'A min of 8 charaters with atleast 1 special character and number included'
      )
    ).toBeInTheDocument();
    expect(mockOnLoginClick).not.toHaveBeenCalled();
  });

  test('it should render textfield component', () => {
    const mockOnForgotClick = jest.fn();
    const mockOnSocialClick = jest.fn();
    const mockOnSignupClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <Login
            padding={'0px 64px 0 64px'}
            onForgotClick={mockOnForgotClick}
            onSocialClick={mockOnSocialClick}
            onSignupClick={mockOnSignupClick}
          />
        </ContextProvider>
      </ThemeProvider>
    );

    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(passwordInput, { target: { value: 'Abcd' } });
  });

  test('it should prevent default behavior', () => {
    const mockOnForgotClick = jest.fn();
    const mockOnSocialClick = jest.fn();
    const mockOnSignupClick = jest.fn();
    const preventDefault = jest.fn();
    const e = { preventDefault };
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <Login
            padding={'0px 64px 0 64px'}
            onForgotClick={mockOnForgotClick}
            onSocialClick={mockOnSocialClick}
            onSignupClick={mockOnSignupClick}
          />
        </ContextProvider>
      </ThemeProvider>
    );
    const toggleButton = getByTestId('toggle-show-password-button');
    fireEvent.mouseDown(toggleButton, e);
    expect(preventDefault).toHaveBeenCalledTimes(0);
  });

  test('it should toggle showPassword state on button click', () => {
    const mockOnForgotClick = jest.fn();
    const mockOnSocialClick = jest.fn();
    const mockOnSignupClick = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <Login
            padding={'0px 64px 0 64px'}
            onForgotClick={mockOnForgotClick}
            onSocialClick={mockOnSocialClick}
            onSignupClick={mockOnSignupClick}
          />
        </ContextProvider>
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle-show-password-button');

    expect(
      screen.getByPlaceholderText('Enter your password').getAttribute('type')
    ).toBe('password');

    fireEvent.click(toggleButton);

    expect(
      screen.getByPlaceholderText('Enter your password').getAttribute('type')
    ).toBe('text');

    fireEvent.click(toggleButton);

    expect(
      screen.getByPlaceholderText('Enter your password').getAttribute('type')
    ).toBe('password');
  });

  test('it should handle login click and update user details', async () => {
    const mockOnForgotClick = jest.fn();
    const mockOnSocialClick = jest.fn();
    const mockOnSignupClick = jest.fn();

    const mockUserDetailsInfo = {
      id: 1,
      email: 'leebali554@gmail.com',
    };

    const mockWalletDetailsInfo = {
      id: 1,
    };

    const getUserDetailsByEmailMock = jest.spyOn(
      services,
      'getUserDetailsByEmail'
    );
    getUserDetailsByEmailMock.mockResolvedValue({
      data: [mockUserDetailsInfo],
    });

    const getWalletDetailsMock = jest.spyOn(services, 'getWalletDetails');
    getWalletDetailsMock.mockResolvedValue({ data: [mockWalletDetailsInfo] });

    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockImplementation(
      () => navigateMock
    );

    const { getByText, getByPlaceholderText } = render(
      <ThemeProvider theme={theme}>
        <ContextProvider>
          <Login
            padding={'0px 64px 0 64px'}
            onForgotClick={mockOnForgotClick}
            onSocialClick={mockOnSocialClick}
            onSignupClick={mockOnSignupClick}
          />
        </ContextProvider>
      </ThemeProvider>
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const loginButton = getByText('Sign In');

    fireEvent.change(emailInput, { target: { value: 'leebali554@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Pooja@151' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getUserDetailsByEmailMock).toHaveBeenCalledWith(
        'leebali554@gmail.com'
      );
    });

    getUserDetailsByEmailMock.mockRestore();
    getWalletDetailsMock.mockRestore();
  });
});
