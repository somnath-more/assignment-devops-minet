import { render } from 'test-setUp';
import CoinHistoryCard from '.';
import { fireEvent } from '@testing-library/react';
import { TRANSACTIONS_HISTORY } from 'utils/constants';

describe('coin history card', () => {
  test('it should render the transactions', () => {
    const { getByTestId, getByRole } = render(
      <CoinHistoryCard
        value={0.023451}
        amount={85553.73}
        transactionHistoryData={TRANSACTIONS_HISTORY}
      />
    );
    const component = getByTestId('coin-history-card');
    expect(component).toBeInTheDocument();
    const inputField = getByRole('textbox');
    expect(inputField).toBeInTheDocument();
    fireEvent.change(inputField, {
      target: { value: 'bitcoin' },
    });
    fireEvent.change(inputField, {
      target: {
        value: 'z',
      },
    });
  });
  test('it should give a error message', () => {
    const message = 'ZZZ';
    const { getByText, getByRole } = render(
      <CoinHistoryCard
        value={0.023451}
        amount={85553.73}
        transactionHistoryData={TRANSACTIONS_HISTORY}
      />
    );
    const inputField = getByRole('textbox');
    expect(inputField).toBeInTheDocument();
    fireEvent.change(inputField, {
      target: { value: message },
    });
    const errorMessage = getByText(message);
    expect(errorMessage).toBeInTheDocument();
  });
});
