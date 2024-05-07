import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Login, { LoginProps } from '.';

export default {
  title: 'Organisms/Login',
  component: Login,
} as Meta;

const Template: StoryFn<LoginProps> = (args) => <Login {...args} />;

export const LoginCard = Template.bind({});
LoginCard.args = {
  padding: '20px',
  onForgotClick: action('Forgot Password Clicked'),
  onSocialClick: action('Social Button Clicked'),
  onLoginClick: action('Login Button Clicked'),
  onSignupClick: action('Sign Up Clicked'),
};
