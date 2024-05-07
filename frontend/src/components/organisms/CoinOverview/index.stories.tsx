import { Meta, StoryFn } from '@storybook/react';
import CoinOverview, { CoinOverviewProps } from '.';
import {
  GRAPH_COIN_DATA,
  GRAPH_TIME_ARRAY,
  INDIVIDUAL_GRAPH_DATA,
  SINGLE_GRAPH_MOCK_POINTS_DATA,
} from 'utils/constants';

export default {
  title: 'organisms/CoinOverview',
  component: CoinOverview,
} as Meta;

const Template: StoryFn<CoinOverviewProps> = (args) => (
  <CoinOverview {...args} />
);

export const CoinOverviews = Template.bind({});
CoinOverviews.args = {
  portfolioProps: {
    variant: 'individual',
    coinData: GRAPH_COIN_DATA,
    timeArray: GRAPH_TIME_ARRAY,
  },
  graphProps: {
    GraphPointsData: SINGLE_GRAPH_MOCK_POINTS_DATA,
    GraphsIndividualData: INDIVIDUAL_GRAPH_DATA,
  },
};
