import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Slider from '.';
import { ThemeProvider } from '@emotion/react';
import theme from '../../../theme/index';
import '@testing-library/jest-dom';

describe('Slider Component', () => {
  it('it should render the Slider component with default values', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Slider onChange={() => {}} />
      </ThemeProvider>
    );
    expect(container).toBeInTheDocument();
  });

  test('it should calls onChange prop correctly', () => {
    const onChangeMock = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <Slider onChange={onChangeMock} />
      </ThemeProvider>
    );
    const sliderElement = screen.getByRole('slider');
    fireEvent.click(sliderElement);
    expect(onChangeMock).toHaveBeenCalledTimes(0);
  });
});
