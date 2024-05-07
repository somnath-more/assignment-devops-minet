import { fireEvent } from '@testing-library/react';
import DeliveryCard from '.';
import { render } from '../../../test-setUp';
import {
  DELIVERY_CARD_DATA,
  INSTANT,
  TRANSACTION_SUBTITLE,
} from 'utils/constants';
describe('delivery card ', () => {
  it('render component', () => {
    const { getByText } = render(
      <DeliveryCard
        deliveryCardDetails={DELIVERY_CARD_DATA}
        title={INSTANT}
        subTitle={TRANSACTION_SUBTITLE}
      />
    );
    const title = getByText('Instant');
    expect(title).toBeInTheDocument();
  });
  it('check expand icon', () => {
    const { getByTestId } = render(
      <DeliveryCard
        deliveryCardDetails={DELIVERY_CARD_DATA}
        title={INSTANT}
        subTitle={TRANSACTION_SUBTITLE}
      />
    );
    const expandIcon = getByTestId('ExpandMoreIcon');
    expect(expandIcon).toBeInTheDocument();
  });
  it('check expand is working or not ', () => {
    const { getByTestId, getByText } = render(
      <DeliveryCard
        deliveryCardDetails={DELIVERY_CARD_DATA}
        title={INSTANT}
        subTitle={TRANSACTION_SUBTITLE}
      />
    );
    const expandIcon = getByTestId('ExpandMoreIcon');
    expect(expandIcon).toBeInTheDocument();
    fireEvent.click(expandIcon);
    const fourHours = getByText(DELIVERY_CARD_DATA[1].type);
    expect(fourHours).toBeInTheDocument();
  });
});
