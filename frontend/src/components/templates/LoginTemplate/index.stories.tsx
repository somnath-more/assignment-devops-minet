import { Meta, StoryFn } from '@storybook/react';
import LoginTemplate, { ILoginTemplate } from '.';
import { Box } from '@mui/material';
import theme from 'theme';

const meta: Meta = {
  component: LoginTemplate,
  title: 'template/LoginTemplate',
};
export default meta;

const TEMPLATE: StoryFn<ILoginTemplate> = (args) => <LoginTemplate {...args} />;
export const Login = TEMPLATE.bind({});
Login.args = {
  children: (
    <Box
      width="100%"
      height="100%"
      sx={{
        backgroundColor: theme.palette.minet_grey.main,
      }}
    >
      {' '}
    </Box>
  ),
  variant: 'login',
};
export const SignUp = TEMPLATE.bind({});
SignUp.args = {
  children: (
    <Box
      width="100%"
      height="100%"
      sx={{
        backgroundColor: theme.palette.minet_grey.main,
      }}
    >
      {' '}
    </Box>
  ),
  variant: 'sign-up',
};
