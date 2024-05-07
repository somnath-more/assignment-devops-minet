import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import ResetPassword from '.';
import { MinetStore } from '../../../context';
import { render } from './../../../test-setUp';

jest.mock('../../../services/API', () => ({
  patch: jest.fn().mockImplementation((url) => {
    if (url.includes('users/10')) {
      return Promise.resolve({
        data: { id: 1 },
      });
    } else if (url.includes('users/10')) {
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

jest.mock('services', () => ({
  updatePassword: jest.fn(),
}));

describe('reset password', () => {
  const userDetails = { id: 1 };

  test('it should handle password reset when passwords match', async () => {
    render(
      <MinetStore.Provider value={{}}>
        <ResetPassword onClickResetButton={() => {}} />
      </MinetStore.Provider>
    );
    const passwordInputs = screen.getAllByPlaceholderText('Enter Password');
    const passwordInput = passwordInputs[0];
    const reEnterPasswordInput = passwordInputs[1];

    fireEvent.change(passwordInput, { target: { value: 'ValidPass!1' } });
    fireEvent.change(reEnterPasswordInput, {
      target: { value: 'ValidPass!1' },
    });

    const resetPasswordButton = screen.getByText((content, element) => {
      return (
        content === 'Reset Password' &&
        element.tagName.toLowerCase() === 'button'
      );
    });
    fireEvent.click(resetPasswordButton);
  });

  test('it should handle password reset when passwords match failing', async () => {
    const userDetails = { id: 1 };
    render(
      <MinetStore.Provider value={{ userDetails }}>
        <ResetPassword onClickResetButton={() => {}} />
      </MinetStore.Provider>
    );
    const passwordInputs = screen.getAllByPlaceholderText('Enter Password');
    const passwordInput = passwordInputs[0];
    const reEnterPasswordInput = passwordInputs[1];

    fireEvent.change(passwordInput, { target: { value: 'ValidPass!1' } });
    fireEvent.change(reEnterPasswordInput, {
      target: { value: 'ValidPass!1' },
    });

    const resetPasswordButton = screen.getByText((content, element) => {
      return (
        content === 'Reset Password' &&
        element.tagName.toLowerCase() === 'button'
      );
    });
    fireEvent.click(resetPasswordButton);
  });

  test('it should render ResetPassword component', () => {
    const { getByTestId } = render(
      <MinetStore.Provider value={{ userDetails }}>
        <ResetPassword onClickResetButton={() => {}} />
      </MinetStore.Provider>
    );
    expect(getByTestId('reset-password')).toBeInTheDocument();
  });

  test('it should handle password reset when passwords didnot match', async () => {
    render(
      <MinetStore.Provider value={{ userDetails }}>
        <ResetPassword onClickResetButton={() => {}} />
      </MinetStore.Provider>
    );
    const passwordInputs = screen.getAllByPlaceholderText('Enter Password');
    const passwordInput = passwordInputs[0];
    const reEnterPasswordInput = passwordInputs[1];
    fireEvent.change(passwordInput, { target: { value: 'ValidPass!19' } });
    fireEvent.change(reEnterPasswordInput, {
      target: { value: 'ValidPass!1' },
    });
    const resetPasswordButton = screen.getByText((content, element) => {
      return (
        content === 'Reset Password' &&
        element.tagName.toLowerCase() === 'button'
      );
    });
    fireEvent.click(resetPasswordButton);
  });

  test('it should toggle password input visibility', () => {
    const { getByTestId } = render(
      <MinetStore.Provider value={{ userDetails }}>
        <ResetPassword onClickResetButton={() => {}} />
      </MinetStore.Provider>
    );
    const toggleButton = getByTestId('toggle-show-password-button');
    const passwordInputs = document.querySelectorAll(
      'input[placeholder="Enter Password"]'
    );
    const passwordInput = passwordInputs[0];
    const newpasswordInput = passwordInputs[1];
    const initialPasswordType = passwordInput.getAttribute('type');
    const initialNewPasswordType = newpasswordInput.getAttribute('type');
    expect(initialPasswordType).toBe('password');
    expect(initialNewPasswordType).toBe('password');
    fireEvent.click(toggleButton);
    expect(passwordInput.getAttribute('type')).toBe('text');
    fireEvent.click(toggleButton);
    expect(passwordInput.getAttribute('type')).toBe('password');
  });

  test('it should prevent default behavior', () => {
    const preventDefault = jest.fn();
    const e = { preventDefault };
    const { getByTestId } = render(
      <MinetStore.Provider value={{ userDetails }}>
        <ResetPassword onClickResetButton={() => {}} />
      </MinetStore.Provider>
    );
    const toggleButton = getByTestId('toggle-show-password-button');
    fireEvent.mouseDown(toggleButton, e);
    expect(preventDefault).toHaveBeenCalledTimes(0);
  });

  test('it should toggle password input visibility for second button', () => {
    const { getByTestId } = render(
      <MinetStore.Provider value={{ userDetails }}>
        <ResetPassword onClickResetButton={() => {}} />
      </MinetStore.Provider>
    );
    const toggleButton = getByTestId('toggle-show-password-button1');
    const passwordInputs = document.querySelectorAll(
      'input[placeholder="Enter Password"]'
    );
    const newpasswordInput = passwordInputs[1];
    const initialNewPasswordType = newpasswordInput.getAttribute('type');
    expect(initialNewPasswordType).toBe('password');
    fireEvent.click(toggleButton);
    expect(newpasswordInput.getAttribute('type')).toBe('text');
    fireEvent.click(toggleButton);
    expect(newpasswordInput.getAttribute('type')).toBe('password');
  });
});
