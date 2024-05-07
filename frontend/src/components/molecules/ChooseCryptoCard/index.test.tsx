import React from 'react';
import { render } from '@testing-library/react';
import ChooseCryptoCard, { ChooseCryptoProps } from '.';
import BitCoin from '../../../../public/assets/images/BitCoin.png';

const mockCryptoCardProps: ChooseCryptoProps = {
  cryptoCardSrc: BitCoin,
  cryptoCardLabel: 'Bitcoin',
  cryptoCardDescription: '$3,406,069.54',
  cryptoCardSelected: true,
};

describe('ChooseCryptoCard', () => {
  it('it should render the component with provided props', () => {
    const { getByText } = render(<ChooseCryptoCard {...mockCryptoCardProps} />);

    expect(getByText('Bitcoin')).toBeInTheDocument();
    expect(getByText('$3,406,069.54')).toBeInTheDocument();
  });

  it('it should apply the selected border style when cryptoCardSelected is true', () => {
    const { getByTestId } = render(
      <ChooseCryptoCard {...mockCryptoCardProps} />
    );
    const cryptoCard = getByTestId('styled-box');

    expect(cryptoCard).toBeInTheDocument();
    const computedStyles = window.getComputedStyle(cryptoCard);

    expect(computedStyles.border).toBe('2px solid blue');
  });

  it('it should not apply the selected border style when cryptoCardSelected is false', () => {
    const { getByTestId } = render(
      <ChooseCryptoCard {...mockCryptoCardProps} cryptoCardSelected={false} />
    );
    const cryptoCard = getByTestId('styled-box');

    expect(cryptoCard).toBeInTheDocument();
    const computedStyles = window.getComputedStyle(cryptoCard);

    expect(computedStyles.border).toBe('');
  });
});
