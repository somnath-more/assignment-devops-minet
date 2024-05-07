import React from 'react';
import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import ForgetPasswordPage from '.';
import { getUserDetailsByEmail } from 'services';
import ContextProvider, { MinetStore } from 'context';
import { render } from '../../test-setUp';
jest.mock('../../services', () => {
  return {
    getUserDetailsByEmail: async (email: string) => {
      if (email === 'test@gmail.com') {
        return { data: [{}] };
      } else {
        return { data: [] };
      }
    },
  };
});

jest.mock('../../services/API', () => ({
  patch: jest.fn().mockImplementation((url) => {
    if (url.includes('users/1')) {
      return Promise.resolve({
        data: { id: 1 },
      });
    } else if (url.includes('users/1')) {
      return Promise.resolve({
        data: [],
      });
    } else {
      return Promise.reject({
        response: {
          status: 404,
        },
      });
    }
  }),
  post: jest.fn().mockResolvedValue({ id: 2 }),
}));

describe('ForgetPasswordPage', () => {
  it('renders the ForgotPassword component initially', () => {
    render(
      <ContextProvider>
        <ForgetPasswordPage />
      </ContextProvider>
    );
    const forgotPasswordButton = screen.getByText('Forgot Password');
    expect(forgotPasswordButton).toBeInTheDocument();
    const login = screen.getByText('Login');
    fireEvent.click(login);
  });

  it('switches to ResetPassword component when the "Forgot Password" button is clicked', () => {
    render(
      <ContextProvider>
        <ForgetPasswordPage />
      </ContextProvider>
    );
    const forgotPasswordButton = screen.getByText('Forgot Password');
    fireEvent.click(forgotPasswordButton);
  });

  it('should render the Reset Code UI after successful email lookup', async () => {
    const { getByTestId } = render(
      <ContextProvider>
        <ForgetPasswordPage />
      </ContextProvider>
    );
    const emailEntered = 'test@gmail.com';
    const emailInput = screen.getByPlaceholderText('you@company.com');
    fireEvent.change(emailInput, { target: { value: emailEntered } });
    const forgotButton = screen.getByText('Send Reset Link');
    fireEvent.click(forgotButton);
    const resetCodeInput = getByTestId('textfield');
    expect(resetCodeInput).toBeInTheDocument();
  });
});

describe('ForgotPassword Component', () => {
  it('should render the component with email input', () => {
    const { getByTestId } = render(
      <ContextProvider>
        <ForgetPasswordPage />
      </ContextProvider>
    );
    const emailInput = getByTestId('textfield');
    expect(emailInput).toBeInTheDocument();
  });

  it('should render the Reset Code UI after successful email lookup', async () => {
    const { getByTestId } = render(
      <ContextProvider>
        <ForgetPasswordPage />
      </ContextProvider>
    );
    const emailEntered = 'test@gmail.com';
    const emailInput = screen.getByPlaceholderText('you@company.com');
    fireEvent.change(emailInput, { target: { value: emailEntered } });
    const forgotButton = screen.getByText('Send Reset Link');
    fireEvent.click(forgotButton);
    const resetCodeInput = getByTestId('textfield');
    expect(resetCodeInput).toBeInTheDocument();
  });
});

jest.mock('services', () => ({
  getUserDetailsByEmail: jest.fn(),
}));

test('should show reset page when showVerification is true', async () => {
  const onClickResetPage = jest.fn();
  const user = { data: [{ id: 1, name: 'John Doe' }] };
  getUserDetailsByEmail.mockImplementation(() => Promise.resolve(user));
  const { container, getByPlaceholderText, getByText } = render(
    <ContextProvider>
      <ForgetPasswordPage />
    </ContextProvider>
  );
  const emailEntered = 'test@gmail.com';
  const emailInput = getByPlaceholderText('you@company.com');
  fireEvent.change(emailInput, { target: { value: emailEntered } });
  fireEvent.click(getByText('Send Reset Link'));
  await screen.findByText('Reset Password');
  const resetCodeEntered = '12345678';
  const resetCodeInput = getByPlaceholderText('8 digits code');
  fireEvent.change(resetCodeInput, { target: { value: resetCodeEntered } });
  fireEvent.click(getByText('Reset Password'));
  expect(
    container.querySelector('[data-testid="forgot-heading"]').textContent
  ).toBe('Forgot Password');
});

test('should show error message when email is not found', async () => {
  const getUserDetailsByEmailMock = jest.fn();
  getUserDetailsByEmailMock.mockResolvedValue({ data: [] });
  getUserDetailsByEmail.mockImplementation(getUserDetailsByEmailMock);

  render(
    <ContextProvider>
      <ForgetPasswordPage />
    </ContextProvider>
  );

  const emailInput = screen.getByPlaceholderText('you@company.com');
  const forgotButton = screen.getByText('Send Reset Link');

  fireEvent.change(emailInput, {
    target: { value: 'nonexistent@example.com' },
  });
  fireEvent.click(forgotButton);

  const errorMessage = await screen.findByText('Email not found');
  expect(errorMessage).toBeInTheDocument();
});

test('should show the error msg for the reset code ', async () => {
  const onClickResetPage = jest.fn();
  const user = { data: [{ id: 1, name: 'John Doe' }] };
  getUserDetailsByEmail.mockImplementation(() => Promise.resolve(user));
  const userDetails = [{ id: 1 }];
  const { container, getByPlaceholderText, getByText } = render(
    <MinetStore.Provider value={{ userDetails }}>
      <ForgetPasswordPage />
    </MinetStore.Provider>
  );
  const emailEntered = 'test@gmail.com';
  const emailInput = getByPlaceholderText('you@company.com');
  fireEvent.change(emailInput, { target: { value: emailEntered } });
  fireEvent.click(getByText('Send Reset Link'));
  await screen.findByText('Reset Password');
  const resetCodeEntered = '12345678';
  const resetCodeInput = getByPlaceholderText('8 digits code');
  fireEvent.change(resetCodeInput, { target: { value: resetCodeEntered } });
  act(() => {
    fireEvent.click(getByText('Reset Password'));
  });
  await waitFor(() => {
    const text = screen.getByText('Re-Enter Password');
    expect(text).toBeInTheDocument();
  });
  const passwordInputs = screen.getAllByPlaceholderText('Enter Password');
  const passwordInput = passwordInputs[0];
  const reEnterPasswordInput = passwordInputs[1];

  fireEvent.change(passwordInput, { target: { value: 'Pooja@151' } });
  fireEvent.change(reEnterPasswordInput, {
    target: { value: 'Pooja@151' },
  });

  const resetPasswordButton = screen.getByText((content, element) => {
    return (
      content === 'Reset Password' && element.tagName.toLowerCase() === 'button'
    );
  });
  fireEvent.click(resetPasswordButton);
});
