import { Meta, StoryFn } from '@storybook/react';
import DeliveryCard, { IDeliveryCardProps } from '.';
import {
  DELIVERY_CARD_DATA,
  INSTANT,
  TRANSACTION_SUBTITLE,
} from 'utils/constants';

const meta: Meta = {
  component: DeliveryCard,
  title: 'molecules/deliveryCard',
};
export default meta;

const DEFAULT: StoryFn<IDeliveryCardProps> = (args) => (
  <DeliveryCard {...args} />
);
export const Primary = DEFAULT.bind({});
Primary.args = {
  deliveryCardDetails: DELIVERY_CARD_DATA,
  title: INSTANT,
  subTitle: TRANSACTION_SUBTITLE,
};
