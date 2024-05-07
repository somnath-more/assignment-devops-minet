import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography, styled } from '@mui/material';
import CustomButton from 'components/atoms/Button';
import TextFieldWithTypography from 'components/molecules/TextFieldTypography';
import React, { useState } from 'react';
import theme from 'theme';
import {
  evaluatePasswordStrength,
  validateEmailFormat,
} from 'utils/constants/helperFunction';
import LogoTypography from 'components/molecules/SocialCard';
import {
  INITIAL_INPUT_VALUES,
  SIGN_UP_ORGANISM,
  THIRD_PARTY_CARD,
} from 'utils/constants';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Middle = styled(Stack)({
  marginTop: '30px',
  gap: theme.spacing(3),
  '& .MuiOutlinedInput-root , .MuiTextField-root': {
    height: '43px',
  },
});
const Footer = styled(Stack)({
  gap: '32px',
  paddingTop: '32px',
});
const StyledButton = styled(CustomButton)({
  textTransform: 'none',
  '&.Mui-disabled ': {
    backgroundColor: theme.palette.primary[300],
    opacity: 0.6,
  },
});
const Divider = styled(Box)({
  height: '1px',
  width: '46.7%',
  backgroundColor: theme.palette.minet_grey[100],
});
const StyledLogoTypographyBox = styled(Box)({
  cursor: 'pointer',
});
export interface ISignUpProps {
  onClick: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<string>;
}
const SignUp = ({ onClick }: ISignUpProps) => {
  const [inputValues, setInputValues] = useState(INITIAL_INPUT_VALUES);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState('');

  const onFocusOut = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (value.length < 50) {
      setError('');
      switch (name) {
        case 'password':
          return onPasswordChange(event);
        case 'email':
          return onEmailChange(event);
        case 'fullName':
          return onNameChange(event);
      }
    } else {
      setError('Input should not be greater than 50 ');
    }
  };
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
    if (!validateEmailFormat(value.trim())) {
      setError('Invalid email format');
    } else errorHandler();
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setInputValues((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));

    if (!evaluatePasswordStrength(value.trim()))
      setError("Password doesn't reached the requirement");
    else {
      errorHandler();
    }
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const regExForDigit = /[^a-zA-Z\s{2,}]/g;
    if (!regExForDigit.test(value)) {
      setInputValues((prev) => ({
        ...prev,
        [name]: value,
      }));
      errorHandler();
    } else {
      setError('numbers and special characters are not allowed in full name');
    }
  };

  const errorHandler = () => {
    if (
      !validateEmailFormat(inputValues.email.trim()) &&
      inputValues.email.length !== 0
    ) {
      setError('Invalid email format');
      return setError('Invalid email format');
    }
    const error =
      !evaluatePasswordStrength(inputValues.password.trim()) &&
      inputValues.password.length !== 0
        ? "Password doesn't meets the requirement"
        : '';
    return setError(error);
  };

  const signUpClickHandler = () => {
    onClick(inputValues.fullName, inputValues.email, inputValues.password)
      .then((message) => {
        setError(message);
      })
      .catch((message) => {
        setError(message);
      });
  };

  const navigate = useNavigate();

  const loginClickHandler = () => {
    navigate('/login');
  };

  const { loginWithRedirect } = useAuth0();
  const thirdPartyClickHandler = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2',
      },
    });
  };
  const btnDisable =
    inputValues.email.length === 0 ||
    inputValues.fullName.length === 0 ||
    inputValues.password.length === 0 ||
    error !== '';

  return (
    <Box data-testid="sign-up-organism">
      <Box>
        <Typography variant="h4" color={theme.palette.minet_text.high_emphasis}>
          {SIGN_UP_ORGANISM.signUpTitle}
        </Typography>
      </Box>
      <Middle>
        <TextFieldWithTypography
          heading={SIGN_UP_ORGANISM.nameHeader}
          type={'text'}
          placeholder={SIGN_UP_ORGANISM.namePlaceHolder}
          TextFieldProps={{
            value: inputValues.fullName,
            name: 'fullName',
            onChange: onChange,
            onBlur: onFocusOut,
          }}
          data-testid="name"
        />
        <TextFieldWithTypography
          heading={SIGN_UP_ORGANISM.emailHeader}
          type={'text'}
          placeholder={SIGN_UP_ORGANISM.emailPlaceHolder}
          onChange={onChange}
          TextFieldProps={{
            value: inputValues.email,
            name: 'email',
          }}
          data-testid="email"
        />
        <TextFieldWithTypography
          heading={SIGN_UP_ORGANISM.passwordHeader}
          type={passwordVisibility ? 'text' : 'password'}
          placeholder={SIGN_UP_ORGANISM.passwordPlaceHolder}
          onChange={onChange}
          TextFieldProps={{
            name: 'password',
            value: inputValues.password,
            InputProps: {
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setPasswordVisibility((prev) => !prev);
                  }}
                  edge="end"
                >
                  {passwordVisibility ? (
                    <VisibilityOff data-testid="eye" />
                  ) : (
                    <Visibility data-testid="eye" />
                  )}
                </IconButton>
              ),
            },
          }}
          data-testid="password"
        />
        <Typography variant="caption2" color={theme.palette.minet_grey[500]}>
          {SIGN_UP_ORGANISM.passwordErrorMessage}
        </Typography>
        {
          <Typography variant="caption1" color="red">
            {error}{' '}
          </Typography>
        }
        <StyledButton
          variant="contained"
          disabled={btnDisable}
          onClick={signUpClickHandler}
        >
          {SIGN_UP_ORGANISM.signUpBtnName}
        </StyledButton>
      </Middle>
      <Footer>
        <Stack direction={'row'} alignItems={'center'}>
          <Divider />
          <Typography
            variant="caption1"
            color={theme.palette.minet_text.medium_emphasis}
            margin={theme.spacing(0.5)}
          >
            {SIGN_UP_ORGANISM.dividerName}
          </Typography>
          <Divider />
        </Stack>
        <Stack
          direction={'row'}
          gap={theme.spacing(2.5)}
          justifyContent={'space-between'}
        >
          {THIRD_PARTY_CARD.map((item) => {
            return (
              <StyledLogoTypographyBox key={item.label}>
                <LogoTypography
                  {...item}
                  key={item.label}
                  onClick={thirdPartyClickHandler}
                />
              </StyledLogoTypographyBox>
            );
          })}
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography
            variant="body1"
            color={theme.palette.minet_text.medium_emphasis}
          >
            Already have an account?
          </Typography>
          <StyledButton
            variant="text"
            disableRipple
            onClick={loginClickHandler}
          >
            <Typography variant="body1">Login</Typography>
          </StyledButton>
        </Stack>
      </Footer>
    </Box>
  );
};

export default SignUp;
