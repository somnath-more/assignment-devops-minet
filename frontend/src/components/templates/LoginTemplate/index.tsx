import { Box, Stack, styled } from '@mui/material';
import React from 'react';
import LoginBanner from '../../../../public/assets/images/LoginBanner.svg';
import SignUpBanner from '../../../../public/assets/images/SignUpBanner.svg';
import { LOGIN_TEMPLATE } from 'utils/constants';

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
export interface ILoginTemplate {
  children: React.ReactNode;
  variant: 'login' | 'sign-up';
}
const LoginTemplate = ({ children, variant }: ILoginTemplate) => {
  return (
    <Stack
      width="100%"
      height="100%"
      direction={'row'}
      data-testid={LOGIN_TEMPLATE.COMPONENT_TEST_ID}
    >
      <Stack
        width="50vw"
        height={'100vh'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <StyledImage
          src={variant === 'login' ? LoginBanner : SignUpBanner}
          alt={LOGIN_TEMPLATE.IMAGE_ALT_MESSAGE}
        />
      </Stack>
      <Box width="50vw" height={'100vh'}>
        {children}
      </Box>
    </Stack>
  );
};

export default LoginTemplate;
