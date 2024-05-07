import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AtomChip from '.';

describe('AtomChip', () => {
  it('renders the chip with the provided label', () => {
    const { getByText } = render(<AtomChip label="BitCoin" />);
    expect(getByText('BitCoin')).toBeTruthy();
  });

  it('calls the onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <AtomChip label="BitCoin" onClick={onClickMock} />
    );

    fireEvent.click(getByText('BitCoin'));
    expect(onClickMock).toHaveBeenCalled();
  });
});
