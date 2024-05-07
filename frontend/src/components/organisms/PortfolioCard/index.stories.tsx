import { Meta, StoryFn } from '@storybook/react';
import PortfolioCard, { IPortfolioCard } from '.';
import React from 'react';

export default {
  title: 'Organisms/PortfolioCard',
  component: PortfolioCard,
} as Meta<typeof PortfolioCard>;

const Template: StoryFn<IPortfolioCard> = (args) => <PortfolioCard {...args} />;

export const MyPortfolioCard = Template.bind({});
MyPortfolioCard.args = {
  totalAmount: 14078.27,
  height: '200px',
  width: '400px',
};
