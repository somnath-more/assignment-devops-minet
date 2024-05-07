import { render } from 'test-setUp';
import CryptoCard from '.';
import {
  CRYPTO_CARD_MOCK_DATA,
  WALLET_DATA,
  convertToInterNationalSystem,
} from 'utils/constants';
import theme from 'theme';

describe('cryptoCard component', () => {
  test('it should render with portfolio variant', () => {
    const { getByText, getByTestId } = render(
      <CryptoCard {...CRYPTO_CARD_MOCK_DATA} variant="portfolio" />
    );
    const cryptoCard = getByTestId('crypto-card');
    expect(cryptoCard).toBeInTheDocument();
    const bitcoin = getByText(CRYPTO_CARD_MOCK_DATA.subTitle);
    expect(bitcoin).toBeInTheDocument();
    const amount = getByText(
      convertToInterNationalSystem(CRYPTO_CARD_MOCK_DATA.amount)
    );
    expect(amount).toBeInTheDocument();
  });

  test('it should render with portfolio variant with negative percentage', () => {
    const { getByText, getByTestId } = render(
      <CryptoCard
        {...CRYPTO_CARD_MOCK_DATA}
        variant="portfolio"
        percentage={-20}
      />
    );
    const cryptoCard = getByTestId('crypto-card');
    expect(cryptoCard).toBeInTheDocument();
  });

  test('it should render with correlation variant', () => {
    const { getByText, getByTestId } = render(
      <CryptoCard {...CRYPTO_CARD_MOCK_DATA} variant="correlation" />
    );
    const cryptoCard = getByTestId('crypto-card');
    expect(cryptoCard).toBeInTheDocument();
    const bitcoin = getByText(CRYPTO_CARD_MOCK_DATA.subTitle);
    expect(bitcoin).toBeInTheDocument();
    const amount = getByText(
      convertToInterNationalSystem(CRYPTO_CARD_MOCK_DATA.amount)
    );
    expect(amount).toBeInTheDocument();
  });

  test('it should render with wallet variant', () => {
    const { getByText, getByTestId } = render(
      <CryptoCard {...WALLET_DATA} variant="wallet" />
    );
    const cryptoCard = getByTestId('crypto-card');
    expect(cryptoCard).toBeInTheDocument();
    const bitcoin = getByText(CRYPTO_CARD_MOCK_DATA.subTitle);
    expect(bitcoin).toBeInTheDocument();
    const amount = getByText(
      convertToInterNationalSystem(CRYPTO_CARD_MOCK_DATA.amount)
    );
    expect(amount).toBeInTheDocument();
  });
});
