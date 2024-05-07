import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LogoTypography, { CustomProps } from '.';
import theme from '../../../theme';
import { ThemeProvider } from '@mui/material';

const mockOnClick = jest.fn();

const testProps: CustomProps = {
  logo: 'path-to-image',
  alt: 'Alt Text',
  label: 'Test Label',
  onClick: mockOnClick,
};

test('renders LogoTypography component correctly', () => {
  render(
    <ThemeProvider theme={theme}>
      <LogoTypography {...testProps} />
    </ThemeProvider>
  );

  expect(screen.getByText('Test Label')).toBeInTheDocument();

  const image = screen.getByRole('img');
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'path-to-image');

  fireEvent.click(screen.getByText('Test Label'));
  expect(mockOnClick).toHaveBeenCalled();
});
