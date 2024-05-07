import React from 'react';
import ResetPasswordComp from '.';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('ResetPasswordCard', () => {
  it('should render the ResetPassword', () => {
    render(<ResetPasswordComp />);

    expect(screen.getByText('Reset Password')).toBeInTheDocument();
  });

  it('should perform onClick function', () => {
    const onClickMock = jest.fn();

    render(<ResetPasswordComp onClick={onClickMock} />);
    const loginButton = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(loginButton);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
