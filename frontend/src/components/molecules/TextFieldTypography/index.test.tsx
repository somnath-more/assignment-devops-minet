import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextFieldWithTypography from '.';

describe('TextFieldWithTypography Component', () => {
  test('it should render Typography correctly', () => {
    const mockChange = jest.fn();
    render(
      <TextFieldWithTypography
        heading="Email"
        width="74px"
        height="512px"
        type="email"
        placeholder="Enter your Email"
        onChange={mockChange}
      />
    );
    const headingElement = screen.getByText('Email');
    expect(headingElement).toBeInTheDocument();
  });

  test('it should render placeholder correctly', () => {
    const mockChange = jest.fn();
    render(
      <TextFieldWithTypography
        placeholder="Enter your Email"
        width="74px"
        height="512px"
        heading="Email"
        type="email"
        onChange={mockChange}
      />
    );
    const placeholderElement = screen.getByPlaceholderText('Enter your Email');
    expect(placeholderElement).toBeInTheDocument();
  });

  test('it should call onChange handler when input value changes', () => {
    const mockChange = jest.fn();
    render(
      <TextFieldWithTypography
        placeholder="Enter your Email"
        width="74px"
        height="512px"
        heading="Email"
        type="email"
        onChange={mockChange}
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter your Email');
    fireEvent.change(inputElement, { target: { value: 'test@example.com' } });

    expect(inputElement).toHaveValue('test@example.com');
    expect(mockChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'test@example.com',
        }),
      })
    );
  });
});
