import { Meta, StoryFn } from '@storybook/react';
import LogoTypography, { CustomProps } from '.';
import Google from '../../../../public/assets/icons/Google.png';
import Microsoft from '../../../../public/assets/icons/Microsoft.png';
import FaceBook from '../../../../public/assets/icons/FaceBook.png';
import { action } from '@storybook/addon-actions';

export default {
  title: 'molecules/SocialCard',
  component: LogoTypography,
} as Meta;

const Template: StoryFn<CustomProps> = (args) => <LogoTypography {...args} />;

export const LogoWithGoogle = Template.bind({});
LogoWithGoogle.args = {
  logo: Google,
  alt: 'Google',
  label: 'Google',
  onClick: action('clicked'),
};

export const LogoWithMicrosoft = Template.bind({});
LogoWithMicrosoft.args = {
  logo: Microsoft,
  alt: 'Microsoft',
  label: 'Microsoft',
};

export const LogoWithFacebook = Template.bind({});
LogoWithFacebook.args = {
  logo: FaceBook,
  alt: 'FaceBook',
  label: 'FaceBook',
};
