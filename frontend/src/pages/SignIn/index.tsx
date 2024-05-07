import { useAuth0 } from '@auth0/auth0-react';
import { Box, Stack, styled } from '@mui/material';
import Login from 'components/organisms/Login';
import LoginTemplate from 'components/templates/LoginTemplate';
import { useNavigate } from 'react-router-dom';

const StyledBox = styled(Box)({
  height: '91vh',
  width: '35.6vw',
});
const SignInStack = styled(Stack)({
  overflowY: 'scroll',
});

const SignInPage = () => {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const handleForgotClick = () => {
    navigate('/forget-password');
  };
  const handleSocialClick = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2',
      },
    });
  };
  const handleSignupClick = () => {
    navigate('/sign-up');
  };

  return (
    <LoginTemplate data-testid="login-template" variant={'login'}>
      <SignInStack
        width={'50vw'}
        height={'100vh'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <StyledBox>
          <Login
            onForgotClick={handleForgotClick}
            onSocialClick={handleSocialClick}
            onSignupClick={handleSignupClick}
          />
        </StyledBox>
      </SignInStack>
    </LoginTemplate>
  );
};

export default SignInPage;
