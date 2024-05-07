import CustomButton from 'components/atoms/Button';
import Typography from 'components/atoms/Typography';
import TextFieldWithTypography from 'components/molecules/TextFieldTypography';
import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import theme from 'theme';
import { IconButton, InputAdornment } from '@mui/material';
import { Email, Visibility, VisibilityOff } from '@mui/icons-material';
import { MinetStore } from '../../../context';

import {
  PASSWORD_REGEX,
  RESET_PASSWORD_BUTTON,
  RESET_PASSWORD_DESCRIPTION,
  RESET_PASSWORD_HEADING,
  RESET_PASSWORD_PLACEHOLDER,
  RESET_PASSWORD_RE_HEADING,
} from 'utils/constants';
import { updatePassword } from 'services';
import { useNavigate } from 'react-router-dom';

export interface IResetPassword {
  onClickResetButton: () => void;
}

interface PasswordShowState {
  showPassword: boolean;
}
const StyledContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  justifyContent: 'center',
  alignContent: 'center',
  height: '90vh',
  paddingLeft: '96px',
  paddingRight: '96px',
});

const ResetPassword: React.FC<IResetPassword> = ({ onClickResetButton }) => {
  const { userDetails } = useContext(MinetStore);
  const [showState1, setShowState1] = useState<PasswordShowState>({
    showPassword: false,
  });
  const [showState2, setShowState2] = useState<PasswordShowState>({
    showPassword: false,
  });

  const [password, setPassword] = useState('');
  const [newpasswordState, setNewPasswordState] = useState('');
  const [error, setError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const validatePassword = (password: string) => {
    return PASSWORD_REGEX.test(password);
  };

  const handleClickShowPassword1 = () => {
    setShowState1((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const handleClickShowPassword2 = () => {
    setShowState2((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleResetPassword = async () => {
    try {
      if (password === newpasswordState && validatePassword(password)) {
        const id = userDetails.id;
        const response = await updatePassword(id, password);
        if (response) {
          setError('Password Matched');

          onClickResetButton();
        }
      } else {
        setError('Password didnot match');
      }
    } catch (error) {
      setError('An error occurred while updating the password');
    }
  };

  useEffect(() => {
    setIsButtonDisabled(password.length <= 0 || newpasswordState.length <= 0);
  }, [password, newpasswordState]);

  return (
    <StyledContainer>
      <Typography data-testid="reset-password" variant="h4">
        Reset Password
      </Typography>
      <TextFieldWithTypography
        heading={RESET_PASSWORD_HEADING}
        type={showState1.showPassword ? 'text' : 'password'}
        placeholder={RESET_PASSWORD_PLACEHOLDER}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword1}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                data-testid="toggle-show-password-button"
              >
                {showState1.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextFieldWithTypography>
      <TextFieldWithTypography
        heading={RESET_PASSWORD_RE_HEADING}
        type={showState2.showPassword ? 'text' : 'password'}
        placeholder={RESET_PASSWORD_PLACEHOLDER}
        onChange={(e) => setNewPasswordState(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword2}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                data-testid="toggle-show-password-button1"
              >
                {showState2.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextFieldWithTypography>
      <Typography
        variant="caption2"
        style={{ color: theme.palette.minet_text.light_emphasis }}
      >
        {RESET_PASSWORD_DESCRIPTION}
      </Typography>
      {error && (
        <Typography
          variant="caption2"
          style={{ color: theme.palette.minet_error[500] }}
        >
          {error}
        </Typography>
      )}
      <CustomButton
        variant="contained"
        style={{
          width: '100%',
          height: '42px',
          textTransform: 'none',
          background: isButtonDisabled
            ? theme.palette.minet_success[100]
            : theme.palette.primary[500],
          color: theme.palette.background.default,
        }}
        onClick={handleResetPassword}
        disabled={isButtonDisabled}
        data-testid="reset-password-button"
      >
        {RESET_PASSWORD_BUTTON}
      </CustomButton>
    </StyledContainer>
  );
};

export default ResetPassword;
