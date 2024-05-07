import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from '.';

const onClickBuyButton = jest.fn();
const onClickSellButton = jest.fn();

const defaultProps = {
  title: 'Test Title',
  isButtonRequired: true,
  onClickBuyButton,
  onClickSellButton,
};

test('Header component renders with provided props', () => {
  const { getByText } = render(<Header {...defaultProps} />);

  expect(getByText('Test Title')).toBeInTheDocument();

  expect(getByText('SELL')).toBeInTheDocument();
  expect(getByText('BUY')).toBeInTheDocument();
});

test('Header component does not render buttons when isButtonRequired is false', () => {
  const { queryByText } = render(
    <Header {...defaultProps} isButtonRequired={false}></Header>
  );

  expect(queryByText('SELL')).toBeNull();
  expect(queryByText('BUY')).toBeNull();
});

test('Clicking on "SELL" button calls onClickSellButton', () => {
  const { getByText } = render(<Header {...defaultProps} />);
  const sellButton = getByText('SELL');

  fireEvent.click(sellButton);
  expect(onClickSellButton).toHaveBeenCalledTimes(1);
});

test('Clicking on "BUY" button calls onClickBuyButton', () => {
  const { getByText } = render(<Header {...defaultProps} />);
  const buyButton = getByText('BUY');

  fireEvent.click(buyButton);
  expect(onClickBuyButton).toHaveBeenCalledTimes(1);
});
