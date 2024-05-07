import CustomButton from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Typography from 'components/atoms/Typography';
import React from 'react';
import Tick from '../../../../public/assets/icons/tick-circle.svg';
import styled from '@emotion/styled';
import theme from 'theme';
import {
  RESET_PASSWORD_CARD,
  RESET_PASSWORD_CARD_BUTTON,
  RESET_PASSWORD_CARD_DESCRIPTION,
  RESET_PASSWORD_CARD_SUCCESS_MSG,
} from 'utils/constants';

export interface IResetPasswordProps {
  onClick?: () => void;
}

const StyledBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  alignContent: 'center',
  height: '90vh',
  justifyContent: 'center',
  paddingLeft: '64px',
  paddingRight: '64px',
});

const StyledContainer = styled.div({
  border: `1px solid ${theme.palette.minet_grey[100]}`,
  padding: '24px',
  borderRadius: '12px',
  gap: '12px',
  display: 'flex',
  backgroundColor: `${theme.palette.primary[100]}`,
});

const ResetPasswordCard: React.FC<IResetPasswordProps> = ({ onClick }) => {
  return (
    <StyledBox data-testid="reset-card">
      <Typography
        variant="h4"
        style={{ color: theme.palette.minet_text.high_emphasis }}
      >
        {RESET_PASSWORD_CARD}
      </Typography>
      <StyledContainer>
        <Icon src={Tick} />
        <div>
          <Typography
            variant="body1"
            style={{ color: theme.palette.minet_text.high_emphasis }}
          >
            {RESET_PASSWORD_CARD_SUCCESS_MSG}
          </Typography>
          <Typography
            variant="body2"
            style={{ color: theme.palette.minet_text.medium_emphasis }}
          >
            {RESET_PASSWORD_CARD_DESCRIPTION}
          </Typography>
        </div>
      </StyledContainer>
      <CustomButton
        variant="contained"
        style={{ width: '100%', height: '42px', textTransform: 'none' }}
        onClick={onClick}
      >
        {RESET_PASSWORD_CARD_BUTTON}
      </CustomButton>
    </StyledBox>
  );
};

export default ResetPasswordCard;
