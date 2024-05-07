import ResetPasswordCard from 'components/molecules/ResetPasswordCard';
import { ForgotPassword } from 'components/organisms/ForgotPassword';
import ResetPassword from 'components/organisms/ResetPassword';
import LoginTemplate from 'components/templates/LoginTemplate';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordPage = () => {
  const [isForgetPassword, setForgetPassword] = useState(true);
  const [isPasswordMatched, setPasswordMatched] = useState(true);
  const navigate = useNavigate();
  const handleSwitchToResetPage = () => {
    setForgetPassword(false);
  };

  const handleSwitchToSuccessPasswordCard = () => {
    setPasswordMatched(false);
  };
  const handleLoginScreen = () => {
    navigate('/login');
  };
  return (
    <div>
      {isForgetPassword ? (
        <LoginTemplate variant={'login'}>
          {
            <ForgotPassword
              onClickResetPage={handleSwitchToResetPage}
              onClickLogIn={handleLoginScreen}
            />
          }
        </LoginTemplate>
      ) : (
        <LoginTemplate variant={'login'}>
          {isPasswordMatched ? (
            <ResetPassword
              onClickResetButton={handleSwitchToSuccessPasswordCard}
            />
          ) : (
            <ResetPasswordCard onClick={handleLoginScreen} />
          )}{' '}
        </LoginTemplate>
      )}
    </div>
  );
};

export default ForgetPasswordPage;
