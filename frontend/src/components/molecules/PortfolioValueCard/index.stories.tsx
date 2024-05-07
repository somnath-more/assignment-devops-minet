import { Meta, StoryFn } from '@storybook/react';
import PortfolioValueCard, { IPortfolioProps } from '.';
import { GRAPH_COIN_DATA, GRAPH_TIME_ARRAY } from 'utils/constants';

const meta: Meta = {
  component: PortfolioValueCard,
  title: 'molecules/portfolioValueCard',
};
export default meta;
const TEMPLATE: StoryFn<IPortfolioProps> = (args) => (
  <PortfolioValueCard {...args} />
);
export const Portfolio = TEMPLATE.bind({});
Portfolio.args = {
  variant: 'portfolio',
  coinData: GRAPH_COIN_DATA,
  timeArray: GRAPH_TIME_ARRAY,
};

export const Individual = TEMPLATE.bind({});
Individual.args = {
  variant: 'individual',
  coinData: GRAPH_COIN_DATA,
  timeArray: GRAPH_TIME_ARRAY,
};
