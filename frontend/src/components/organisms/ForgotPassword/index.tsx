import styled from '@emotion/styled';
import { Box, Paper } from '@mui/material';
import CustomButton from 'components/atoms/Button';
import { TextFields } from 'components/atoms/TextFields/index.stories';
import Typography from 'components/atoms/Typography';
import { useContext, useState } from 'react';
import theme from 'theme';
import { ForgotPasswordConstants } from 'utils/constants';
import { getUserDetailsByEmail } from 'services';
import { MinetStore } from '../../../context';

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  justifyContent: 'center',
  alignContent: 'center',
  height: '100vh',
  paddingLeft: '96px',
  paddingRight: '96px',
});

const StyledOutlinedBox = styled(Box)({
  padding: '0px ,32px,0px,32px',
  display: 'flex',
  justifyContent: 'center',
});

const StyledInnerBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  width: '100%',
});

export interface ForgotPasswordProps {
  onClickLogIn?: () => void;
  onClickResetPage?: () => void;
}
export const ForgotPassword = ({
  onClickLogIn,
  onClickResetPage,
}: ForgotPasswordProps) => {
  const { setUserDetails } = useContext(MinetStore);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [emailError, setEmailError] = useState('');
  const [resetCodeError, setResetCodeError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const [_showReset, setShowReset] = useState(false);
  const isEmailValid = (email: string) => {
    const emailRegex = ForgotPasswordConstants.EMAIL_REGREX;
    return emailRegex.test(email);
  };
  const handleEmailChange = (e: any) => {
    const mailValue = e.target.value;
    setEmail(mailValue);
    setEmailError(isEmailValid(mailValue) ? '' : 'Invalid email');
    setIsButtonDisabled(!isEmailValid(mailValue));
  };

  const handleResetValue = (e: any) => {
    const resetCodeValue = e.target.value;
    setResetCode(resetCodeValue);
    const regex = /^[0-9]{8}$/;
    setResetCodeError(regex.test(resetCodeValue) ? '' : 'Invalid reset code');
    setIsButtonDisabled(!regex.test(resetCodeValue));
  };
  const onClickForgot = async () => {
    const enteredEmail = email;
    try {
      const user = await getUserDetailsByEmail(enteredEmail);
      if (!user) {
        setEmailError('Email not found');
      } else {
        if (showVerification) {
          setShowReset(true);
          setIsButtonDisabled(false);
          if (onClickResetPage) {
            onClickResetPage();
          }
          setUserDetails((prev: any) => ({
            ...prev,
            id: user.data.id,
            email: user.data.email,
          }));
        } else {
          setShowVerification(true);
          setIsButtonDisabled(false);
        }
      }
    } catch (error) {
      console.error('Error checking the mail:', error);
    }
  };

  return (
    <StyledPaper>
      <StyledOutlinedBox>
        <StyledInnerBox>
          <Typography variant="h4" data-testid="forgot-heading">
            {ForgotPasswordConstants.FORGOT_PASSWORD}
          </Typography>

          {!showVerification ? (
            <>
              <Typography variant="caption1" data-testid="forgot-label">
                {ForgotPasswordConstants.EMAIL}
              </Typography>
              <TextFields
                data-testid="textfield"
                placeholder={ForgotPasswordConstants.EMIAL_ID}
                value={email}
                onChange={handleEmailChange}
              ></TextFields>
              {emailError && (
                <Typography variant="caption2" color={'red'}>
                  {emailError}
                </Typography>
              )}
            </>
          ) : (
            <>
              <Typography variant="caption1" data-testid="forgot-label">
                {ForgotPasswordConstants.RESET_CODE}
              </Typography>
              <TextFields
                data-testid="textfield"
                placeholder={ForgotPasswordConstants.RESET_PLACEHOLDER_VALUE}
                value={resetCode}
                onChange={handleResetValue}
              ></TextFields>
              {resetCodeError && (
                <Typography
                  variant="caption2"
                  color={'red'}
                  data-testid="test-error"
                >
                  {resetCodeError}
                </Typography>
              )}
            </>
          )}
          <CustomButton
            variant="contained"
            onClick={onClickForgot}
            disabled={isButtonDisabled}
            sx={{
              height: '42px',
              borderRadius: '4px',
              padding: '0px 16px',
              gap: '10px',
            }}
          >
            {!showVerification
              ? ForgotPasswordConstants.SEND_LINK
              : ForgotPasswordConstants.RESET_PASSWORD}
          </CustomButton>
          <Box>
            <Typography
              data-testid="back-to-login"
              variant="caption2"
              sx={{ color: `${theme.palette.minet_grey[500]}` }}
            >
              {ForgotPasswordConstants.BACK_TO}
            </Typography>
            <Typography
              data-testid="login-link"
              variant="caption1"
              sx={{
                color: `${theme.palette.primary[500]}`,
                cursor: 'pointer',
                marginLeft: '4px',
              }}
              onClick={onClickLogIn}
            >
              {ForgotPasswordConstants.LOG_IN}
            </Typography>
          </Box>
        </StyledInnerBox>
      </StyledOutlinedBox>
    </StyledPaper>
  );
};
