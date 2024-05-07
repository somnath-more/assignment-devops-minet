import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TabsComponent, { TabsProps } from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Molecules/Tabs',
  component: TabsComponent,
} as Meta;

const Template: StoryFn<TabsProps> = (args) => <TabsComponent {...args} />;

export const AllAssetsTab = Template.bind({});
AllAssetsTab.args = {
  selectedTab: 'all_assests',
  onTabChange: action('onTabChange'),
};

export const WatchlistTab = Template.bind({});
WatchlistTab.args = {
  selectedTab: 'watchlist',
  onTabChange: action('onTabChange'),
};
