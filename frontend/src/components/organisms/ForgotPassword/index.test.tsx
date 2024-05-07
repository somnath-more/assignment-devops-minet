import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ForgotPassword } from '../ForgotPassword';
import { getUserDetailsByEmail } from 'services';
import ContextProvider from 'context';

jest.mock('../../../services', () => {
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
describe('ForgotPassword Component', () => {
  const onClickForgot = jest.fn();
  const onClickLogIn = jest.fn();

  it('renders without errors', () => {
    const { container } = render(
      <ContextProvider>
        <ForgotPassword onClickForgot={onClickForgot} />
      </ContextProvider>
    );
    expect(container).toBeInTheDocument();
  });

  it('displays login link', () => {
    const { getByTestId } = render(
      <ContextProvider>
        <ForgotPassword onClickForgot={onClickForgot} />
      </ContextProvider>
    );
    const loginLink = getByTestId('login-link');
    expect(loginLink).toBeInTheDocument();
  });

  it('displays the heading', () => {
    const { getByTestId } = render(
      <ContextProvider>
        <ForgotPassword onClickForgot={onClickForgot} />
      </ContextProvider>
    );
    const heading = getByTestId('forgot-heading');
    expect(heading.textContent).toBe('Forgot Password');
  });

  test('renders ForgotPassword component with email input', () => {
    const { getByTestId } = render(
      <ContextProvider>
        <ForgotPassword />
      </ContextProvider>
    );
    const emailInput = getByTestId('textfield');
    expect(emailInput).toBeInTheDocument();
  });

  it('should call onClickForgot when the button is clicked', () => {
    render(
      <ContextProvider>
        <ForgotPassword
          onClickForgot={onClickForgot}
          onClickLogIn={onClickLogIn}
        />
      </ContextProvider>
    );

    const emailInput = screen.getByPlaceholderText('you@company.com');
    fireEvent.change(emailInput, { target: { value: 'test@exampl' } });
    fireEvent.click(screen.getByText('Send Reset Link'));
  });

  it('should fails as we enter wrong reset code', () => {
    const { getAllByTestId } = render(
      <ContextProvider>
        <ForgotPassword onClickForgot={onClickForgot} />
      </ContextProvider>
    );
    const resetCode = 987654;
    const resettextfield = getAllByTestId('textfield')[1];
    expect(resettextfield).not.toBe(resetCode);
  });
});

describe('ForgotPassword Component', () => {
  it('should render the component with email input', () => {
    const { getByTestId } = render(
      <ContextProvider>
        <ForgotPassword />
      </ContextProvider>
    );
    const emailInput = getByTestId('textfield');
    expect(emailInput).toBeInTheDocument();
  });

  it('should render the Reset Code UI after successful email lookup', async () => {
    const { getByTestId } = render(
      <ContextProvider>
        <ForgotPassword />
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
      <ForgotPassword onClickResetPage={onClickResetPage} />
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
      <ForgotPassword />
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
  const { container, getByPlaceholderText, getByText } = render(
    <ContextProvider>
      <ForgotPassword onClickResetPage={onClickResetPage} />
    </ContextProvider>
  );
  const emailEntered = 'test@gmail.com';
  const emailInput = getByPlaceholderText('you@company.com');
  fireEvent.change(emailInput, { target: { value: emailEntered } });
  fireEvent.click(getByText('Send Reset Link'));
  await screen.findByText('Reset Password');
  const resetCodeEntered = '123456';
  const resetCodeInput = getByPlaceholderText('8 digits code');
  fireEvent.change(resetCodeInput, { target: { value: resetCodeEntered } });
  fireEvent.click(getByText('Reset Password'));
  expect(
    container.querySelector('[data-testid="forgot-heading"]').textContent
  ).toBe('Forgot Password');
  const errorMessage = screen.getByText('Invalid reset code');
  expect(errorMessage).toBeInTheDocument();
});
