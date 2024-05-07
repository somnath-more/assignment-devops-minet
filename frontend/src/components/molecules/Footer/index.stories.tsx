import { Meta, StoryFn } from '@storybook/react';
import Footer, { FooterProps } from '.';

export default {
  title: 'molecules/Footer',
  component: Footer,
} as Meta;

const Template: StoryFn<FooterProps> = (args) => <Footer {...args} />;

export const FooterEx = Template.bind({});
FooterEx.args = {
  label: 'Dashboard',
  career: 'Careers',
  privacy: 'Legals & Privacy',
  copyright: '@ 2021 Minet',
  language: 'English',
  help: 'NEED HELP',
};
