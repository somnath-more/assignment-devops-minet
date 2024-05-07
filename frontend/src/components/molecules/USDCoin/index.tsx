import React from 'react';
import { Box, styled } from '@mui/material';
import Icon from '../../atoms/Icon/index';
import Typography from '../../atoms/Typography/index';
import Rupee from '../../../../public/assets/icons/Rupee.svg';
import { CASH, CASH_DEPOSIT, USDCOIN, WITHDRAWAL } from 'utils/constants';
import theme from 'theme';
import Button from '../../atoms/Button/index';

export interface USDCoinProps {
  width?: string;
  height?: string;
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  border: '1px solid',
  borderRadius: '4px',
  marginLeft: '10px',
  paddingLeft: '1rem',
  borderColor: theme.palette.minet_grey[100],
  backgroundColor: theme.palette.background.default
});

const StyledIconTypography = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  width: '50%',
  alignItems: 'center',
  gap: '1rem',
});

const StyledTypographyBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const StyledButtonBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  width: '50%',
  gap: '1rem',
  marginRight: '20px',
});

const StyledButton = styled(Button)({
  borderRadius: '4px',
  width: '136px',
  height: '42px',
});

const USDCoin = (props: USDCoinProps) => (
  <StyledBox width={props.width} height={props.height}>
    <StyledIconTypography>
      <Icon src={Rupee} />
      <StyledTypographyBox>
        <Typography variant="h6" color={theme.palette.minet_grey[500]}>
          {USDCOIN}
        </Typography>
        <Typography
          variant="body1"
          color={theme.palette.minet_text.medium_emphasis}
        >
          {CASH}
        </Typography>
      </StyledTypographyBox>
    </StyledIconTypography>
    <StyledButtonBox>
      <StyledButton variant="outlined">
        <Typography variant="button" color={theme.palette.primary[500]}>
          {CASH_DEPOSIT}
        </Typography>
      </StyledButton>
      <StyledButton variant="outlined">
        <Typography variant="button" color={theme.palette.primary[500]}>
          {WITHDRAWAL}
        </Typography>
      </StyledButton>
    </StyledButtonBox>
  </StyledBox>
);

export default USDCoin;
