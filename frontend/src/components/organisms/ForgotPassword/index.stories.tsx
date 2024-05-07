import { Meta, StoryFn } from '@storybook/react';
import { ForgotPassword, ForgotPasswordProps } from '.';

export default {
  title: 'organisms/ForgotPassword',
  component: ForgotPassword,
} as Meta;

const Template: StoryFn<ForgotPasswordProps> = (args) => (
  <ForgotPassword {...args} />
);

export const ForgotPasswordMail = Template.bind({});
