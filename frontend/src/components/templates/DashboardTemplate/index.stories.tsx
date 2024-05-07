import React from 'react';
import Dashboard, { IDashBoardProps } from '.';
import { Meta, StoryFn } from '@storybook/react';
import Header from 'components/organisms/Header';

export default {
  title: 'Template/Dashboard',
  component: Dashboard,
} as Meta<typeof Dashboard>;

const Template: StoryFn<IDashBoardProps> = (args) => {
  return <Dashboard {...args} />;
};

export const DashBoard = Template.bind({});
DashBoard.args = {
  header: <Header title={'DashBoard'} isButtonRequired={true} />,
};
