import { useAuth0 } from '@auth0/auth0-react';
import { MinetStore } from '../../context';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Stack } from '@mui/material';
import {
  getUserDetailsByEmail,
  getWalletDetails,
  loginUser,
  postUserData,
  postWalletDetails,
  saveNewUser,
} from 'services/index';

const AuthenticationPage = () => {
  const { isAuthenticated, user } = useAuth0();
  const { setUserDetails, userDetails } = useContext(MinetStore);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      setUserDetails((prev) => ({
        ...prev,
        id: 0,
      }));
      const { email, name: fullName } = user;
      const authEmail = `auth0${email}`;
      const password = 'bagfhgrekbeerehje';
      try {
        loginUser({
          email: authEmail,
          password,
        })
          .then(async (res) => {
            const userResponse = res;
            if (userResponse.status !== 404) {
              localStorage.setItem('token', userResponse.data.token);
            }
            const walletResponse = await getWalletDetails(userResponse.data.id);
            setUserDetails({
              email: userResponse.data.email,
              id: userResponse.data.id,
              walletId: walletResponse.data.id,
            });
            navigate('/');
          })
          .catch((error) => {
            if (
              error.response.data.message ===
              `User with email:${authEmail}is not present`
            ) {
              saveNewUser({
                firstName: fullName,
                email: authEmail,
                password,
              }).then((res) => {
                postWalletDetails({
                  userId: res.data.id,
                  amount: 34000,
                }).then((res) => {
                  console.log(res.data, 'wallet');
                  navigate('/login');
                });
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [isAuthenticated, user]);
  return (
    <Stack
      data-testid="loading"
      style={{
        width: '100vw',
        height: '100vh',
      }}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <CircularProgress
        sx={{
          width: '50vw',
          height: '50vh',
        }}
      />
    </Stack>
  );
};

export default AuthenticationPage;
