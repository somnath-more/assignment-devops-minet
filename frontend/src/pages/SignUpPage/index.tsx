import { Box, Stack, styled } from '@mui/material';
import SignUp from 'components/organisms/SignUp';
import LoginTemplate from 'components/templates/LoginTemplate';
import { MinetStore } from '../../context';
import React, { useContext } from 'react';
import {
  getUserDetailsByEmail,
  postUserData,
  postWalletDetails,
  saveNewUser,
} from 'services';
import { useNavigate } from 'react-router-dom';

const StyledBox = styled(Box)({
  height: '91vh',
  width: '35.6vw',
});
const SignUpStack = styled(Stack)({
  overflowY: 'scroll',
});
const SignUpPage = () => {
  const { setUserDetails, setNetworkError } = useContext(MinetStore);
  const navigate = useNavigate();
  const signUpclickHandler = (
    fullName: string,
    email: string,
    password: string
  ) => {
    return new Promise<string>((resolve, reject) => {
      saveNewUser({
        firstName: fullName,
        email,
        password,
      })
        .then((res) => {
          console.log(res.data);
          postWalletDetails({
            userId: res.data.id,
            amount: 34000,
          }).then((res) => {
            console.log(res.data, 'wallet');
            navigate('/login');
          });
        })
        .catch((error) => {
          if (
            error.response.data.message ===
            `User with email already exists: ${email}`
          ) {
            console.log('iff ');

            return resolve('User already exist');
          } else {
            setNetworkError(true);
          }
        });
    });
  };

  return (
    <LoginTemplate variant="sign-up">
      <SignUpStack
        width={'50vw'}
        height={'100vh'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <StyledBox>
          <SignUp onClick={signUpclickHandler} />
        </StyledBox>
      </SignUpStack>
    </LoginTemplate>
  );
};

export default SignUpPage;
