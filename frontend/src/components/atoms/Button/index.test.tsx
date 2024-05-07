import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from '.';

describe('CustomButton', () => {
  it('renders the button with the provided children', () => {
    const buttonText = 'Buy';
    render(<CustomButton>{buttonText}</CustomButton>);

    const button = screen.getByText(buttonText);
    expect(button).toBeTruthy();
  });

  it('calls the onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    const buttonText = 'Buy';
    render(<CustomButton onClick={onClickMock}>{buttonText}</CustomButton>);

    const button = screen.getByText(buttonText);
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });
});
