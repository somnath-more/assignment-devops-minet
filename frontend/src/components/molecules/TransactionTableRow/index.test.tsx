import { render } from 'test-setUp';
import TransactionTableRow from '.';
import {
  TRANSACTION_MOCK_DATA,
  convertToInterNationalSystemWithOutDecimals,
} from 'utils/constants';

describe('transaction table row component', () => {
  test('it should render component', () => {
    const { getByText, getByTestId, getByAltText } = render(
      <TransactionTableRow
        {...TRANSACTION_MOCK_DATA}
        transactionStatus="success"
        paymentType="Sold"
      />
    );
    const component = getByTestId('transaction-table-row');
    expect(component).toBeInTheDocument();
    const month = getByText(TRANSACTION_MOCK_DATA.month);
    expect(month).toBeInTheDocument();
    const successImage = getByAltText(
      `${TRANSACTION_MOCK_DATA.transactionStatus}-transaction-state`
    );
    expect(successImage).toBeInTheDocument();
  });

  test('it should render with payment type as purchased', () => {
    const { getByText } = render(
      <TransactionTableRow
        {...TRANSACTION_MOCK_DATA}
        transactionStatus="success"
        paymentType="Purchased"
      />
    );
    const purchased = getByText('Purchased');
    expect(purchased).toBeInTheDocument();
    const senderName = getByText(`From ${TRANSACTION_MOCK_DATA.senderName}`);
    expect(senderName).toBeInTheDocument();
  });
});
