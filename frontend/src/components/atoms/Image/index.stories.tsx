import Image, { IImageProps } from '.';
import { Meta, StoryFn } from '@storybook/react';
import SignUpImage from '../../../../public/assets/images/SignUpImage.svg';

export default {
  title: 'Atoms/Images',
  component: Image,
} as Meta;

const Template: StoryFn<IImageProps> = (args) => <Image {...args} />;

export const SignUp = Template.bind({});
SignUp.args = {
  src: SignUpImage,
  alt: 'SignUpImage',
};

export const Avatar = Template.bind({});
Avatar.args = {
  src: SignUpImage,
  alt: 'Avatar',
  style: {
    borderRadius: '50%',
  },
  width: '50px',
};
