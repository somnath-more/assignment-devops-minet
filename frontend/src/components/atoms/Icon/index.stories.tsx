import Icon, { IIconProps } from '.';
import Watch from '../../../../public/assets/icons/Icon.svg';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Atoms/Icon',
  component: Icon,
} as Meta;

const Template: StoryFn<IIconProps> = (args) => <Icon {...args} />;

export const WatchList = Template.bind({});
WatchList.args = {
  src: Watch,
  alt: 'WatchList',
  width: '32px',
  height: '32px',
  onClick: action('clicked'),
};
