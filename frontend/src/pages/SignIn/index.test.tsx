import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignInPage from '.';
import { render } from 'test-setUp';

describe('SignInPage Component', () => {
  test('it should render Typography component', () => {
    render(<SignInPage />);
    const loginTemplate = screen.getByTestId('login-template');
    expect(loginTemplate).toBeInTheDocument();
    const forgetPassword = screen.getByText('Forgot Password');
    fireEvent.click(forgetPassword);
    const signUp = screen.getByText('Signup');
    fireEvent.click(signUp);
  });
});
