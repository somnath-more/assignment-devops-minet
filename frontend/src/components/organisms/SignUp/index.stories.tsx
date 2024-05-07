import { Meta, StoryFn } from '@storybook/react';
import SignUp, { ISignUpProps } from '.';
import { action } from '@storybook/addon-actions';

const meta: Meta = {
  component: SignUp,
  title: 'organisms/signUp',
};
export default meta;
const TEMPLATE: StoryFn<ISignUpProps> = (args) => <SignUp {...args} />;
export const Default = TEMPLATE.bind({});
Default.args = {
  onClick: (fullName, email, password) => {
    action(`User: ${fullName}, Email: ${email}, Password: ${password}`);
    return '';
  },
};
