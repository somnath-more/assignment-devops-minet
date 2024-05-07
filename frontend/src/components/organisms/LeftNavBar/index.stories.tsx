import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import LeftNavBar from '.';

export default {
  title: 'Organisms/LeftNavBar',
  component: LeftNavBar,
} as Meta;

const Template: StoryFn<typeof LeftNavBar> = () => <LeftNavBar />;

export const SideNavBar = Template.bind({});
SideNavBar.args = {};
