import { Meta, StoryFn } from '@storybook/react';
import WishlistCard, { IWishlistCardProps } from '.';
import { PORTFOLIO_GRAPH_DATA } from 'utils/constants';
import { action } from '@storybook/addon-actions';

const meta: Meta = {
  component: WishlistCard,
  title: 'organisms/wishlistCard',
};
export default meta;
const TEMPLATE: StoryFn<IWishlistCardProps> = (args) => (
  <WishlistCard {...args} />
);
export const Default = TEMPLATE.bind({});
Default.args = {
  portfolioGraphData: PORTFOLIO_GRAPH_DATA,
  watchListHandler: action('key'),
};

export const WishlistWithTwoGraphs = TEMPLATE.bind({});
WishlistWithTwoGraphs.args = {
  portfolioGraphData: PORTFOLIO_GRAPH_DATA.slice(0, 2),
  watchListHandler: action('key'),
};
