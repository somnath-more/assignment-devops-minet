import React, { useContext, useState } from 'react';
import TextFieldWithTypography from 'components/molecules/TextFieldTypography';
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  styled,
} from '@mui/material';
import Button from 'components/atoms/Button';
import minetTheme from 'theme';
import Typography from 'components/atoms/Typography';
import LogoTypography from 'components/molecules/SocialCard';
import GOOGLE from '../../../../public/assets/icons/Google.png';
import FACEBOOK from '../../../../public/assets/icons/FaceBook.png';
import MICROSOFT from '../../../../public/assets/icons/Microsoft.png';
import {
  EMAIL_REGREX,
  LOGIN,
  PASSWORD_ERROR,
  PASSWORD_REGREX,
} from 'utils/constants';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MinetStore } from '../../../context';
import { getUserDetailsByEmail, getWalletDetails, loginUser } from 'services';

interface PasswordShowState {
  showPassword: boolean;
}

export interface LoginProps {
  padding?: string;
  onForgotClick: () => void;
  onSocialClick: () => void;
  onSignupClick: () => void;
}

const CustomStyledOuterBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '512px',
  '& .MuiOutlinedInput-root , .MuiTextField-root': {
    height: '42px',
  },
});

const CustomStyleButton = styled(Button)({
  width: '100%',
  height: '42px',
  borderRadius: '4px',
  padding: '0px 16px 0px 16px',
  textTransform: 'none',
  color: minetTheme.palette.background.default,
  backgroundColor: minetTheme.palette.primary[500],
  '&:disabled': {
    color: minetTheme.palette.background.default,
    background: minetTheme.palette.minet_success[100],
  },
  marginTop: '1rem',
});

const SocialBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  height: '96px',
  cursor: 'pointer',
  marginBottom: '1rem',
});

const CustomStyledFooterTypography = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
});

const Login = ({
  padding,
  onForgotClick,
  onSocialClick,
  onSignupClick,
}: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showState, setShowState] = useState<PasswordShowState>({
    showPassword: false,
  });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const { setUserDetails, setNetworkError } = useContext(MinetStore);

  const isEmailValid = (email: string) => {
    const emailRegex = EMAIL_REGREX;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password: string) => {
    const passwordRegex = PASSWORD_REGREX;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e: any) => {
    const mailValue = e.target.value;
    if (!isEmailValid(mailValue)) {
      setEmail(mailValue);
      setEmailError('Fill the email field');
      setIsButtonDisabled(true);
    } else {
      setEmail(mailValue);
      setEmailError('');
      setIsButtonDisabled(
        !isEmailValid(mailValue) || !isPasswordValid(password)
      );
    }
  };

  const handlePasswordChange = (e: any) => {
    const passwordValue = e.target.value;
    if (!isPasswordValid(passwordValue)) {
      setPassword(passwordValue);
      setPasswordError(PASSWORD_ERROR);
      setIsButtonDisabled(true);
    } else {
      setPassword(passwordValue);
      setPasswordError('');
      setIsButtonDisabled(
        !isEmailValid(email) || !isPasswordValid(passwordValue)
      );
    }
  };

  const handleClickShowPassword = () => {
    setShowState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleLoginClick = async () => {
    try {
      const userData = {
        email: email,
        password: password,
      };

      const userResponse = await loginUser(userData);

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
    } catch (error) {
      console.log(error);

      if (
        error.response.data.message === `User with email:${email}is not present`
      ) {
        setStatus('Invalid Email or Password');
      } else if ((error.response.data.message = 'Invalid credentials')) {
        setStatus('Invalid Email or Password');
      } else setNetworkError(true);
    }
  };

  return (
    <CustomStyledOuterBox padding={padding}>
      <Typography
        variant="h4"
        textTransform={'none'}
        color={minetTheme.palette.minet_text.high_emphasis}
        style={{
          marginBottom: '1rem',
        }}
      >
        {LOGIN.header}
      </Typography>
      <TextFieldWithTypography
        heading={LOGIN.emailHeading}
        type="email"
        placeholder={LOGIN.emailPlaceholder}
        onChange={handleEmailChange}
        helperText={<Typography variant="caption2">{emailError}</Typography>}
        value={email}
      />
      <TextFieldWithTypography
        heading={LOGIN.passwordHeading}
        placeholder={LOGIN.passwordPlaceholder}
        type={showState.showPassword ? 'text' : 'password'}
        onChange={handlePasswordChange}
        value={password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                data-testid="toggle-show-password-button"
              >
                {showState.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Typography
        variant="body2"
        textTransform={'none'}
        color={minetTheme.palette.primary[500]}
        style={{
          cursor: 'pointer',
          marginTop: '1rem',
        }}
        onClick={onForgotClick}
      >
        {LOGIN.forgotPassword}
      </Typography>
      <CustomStyleButton
        variant="contained"
        onClick={handleLoginClick}
        disabled={isButtonDisabled}
      >
        <Typography
          variant="button"
          textTransform={'none'}
          color={minetTheme.palette.background.default}
        >
          {LOGIN.signIn}
        </Typography>
      </CustomStyleButton>
      <Box data-testid="box-id">{<Typography>{status}</Typography>}</Box>

      <Divider sx={{ marginBottom: '1.5rem' }}>
        <Typography
          variant="caption1"
          textTransform={'none'}
          color={minetTheme.palette.minet_text.medium_emphasis}
        >
          {LOGIN.OR}
        </Typography>
      </Divider>

      <SocialBox>
        <LogoTypography
          logo={GOOGLE}
          alt={'Google'}
          label={LOGIN.googleLabel}
          onClick={onSocialClick}
        />
        <LogoTypography
          logo={FACEBOOK}
          alt={'Facebook'}
          label={LOGIN.facebookLabel}
        />
        <LogoTypography
          logo={MICROSOFT}
          alt={'Microsoft'}
          label={LOGIN.microsoftLabel}
        />
      </SocialBox>
      <CustomStyledFooterTypography>
        <Typography
          variant="body1"
          textTransform={'none'}
          color={minetTheme.palette.minet_text.medium_emphasis}
        >
          {LOGIN.doNotHaveAccount}
        </Typography>
        <Typography
          variant="body1"
          textTransform={'none'}
          color={minetTheme.palette.primary[500]}
          onClick={onSignupClick}
          style={{ cursor: 'pointer' }}
        >
          {LOGIN.signUp}
        </Typography>
      </CustomStyledFooterTypography>
    </CustomStyledOuterBox>
  );
};

export default Login;
