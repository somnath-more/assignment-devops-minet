import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import Slider from '.';

export default {
  title: 'atoms/slider',
  component: Slider,
} as Meta<typeof Slider>;

const Template: StoryFn<typeof Slider> = (args) => <Slider {...args} />;

export const VerticalSlider = Template.bind({});
VerticalSlider.args = {
  onChange: action('Slider value changed'),
};
