import React from 'react';
import { render, screen } from '@testing-library/react';
import Typography from '.';
import '@testing-library/jest-dom';

describe('Typography Component', () => {
  test('Renders Typography component with basic props', () => {
    render(<Typography>Test Text</Typography>);
    const typographyElement = screen.getByText('Test Text');
    expect(typographyElement).toBeInTheDocument();
  });

  test('Renders Typography component with a specific variant', () => {
    render(<Typography variant="h3">Test Text</Typography>);
    const typographyElement = screen.getByText('Test Text');
    expect(typographyElement).toHaveClass('MuiTypography-h3');
  });
});
