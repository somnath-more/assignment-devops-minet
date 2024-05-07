import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tabs from '.';

describe('Tabs Component', () => {
  test('it should render Typography component', () => {
    const onTabChange = jest.fn();
    render(<Tabs selectedTab="all_assests" onTabChange={onTabChange} />);

    const firstTab = screen.getByText('All Assests');
    expect(firstTab).toBeInTheDocument();
  });

  test('triggers onTabChange callback when a tab is clicked', () => {
    const onTabChange = jest.fn();

    const { getByTestId } = render(
      <Tabs selectedTab="all_assests" onTabChange={onTabChange} />
    );
    fireEvent.click(getByTestId('tab2'));
    expect(onTabChange).toHaveBeenCalledWith('watchlist');
  });

  test('it should apply correct styles when selectedTab is all_assests', () => {
    const onTabChange = jest.fn();

    const { getByTestId } = render(
      <Tabs selectedTab="all_assests" onTabChange={onTabChange} />
    );

    const tab1 = getByTestId('tab1');
    expect(tab1).toHaveStyle('color: #1976D2;');
  });

  test('it should apply correct styles when selectedTab is not all_assests', () => {
    const onTabChange = jest.fn();

    const { getByTestId } = render(
      <Tabs selectedTab="watchlist" onTabChange={onTabChange} />
    );
    const tab2 = getByTestId('tab2');
    expect(tab2).toHaveStyle('color: #1976D2;');
  });
});
