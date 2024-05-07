import { TableCell, TableRow, styled } from '@mui/material';
import { Box } from '@mui/system';
import Icon from 'components/atoms/Icon';
import React from 'react';
import Star from '../../../../public/assets/icons/Star.svg';
import UnStar from '../../../../public/assets/icons/Unstar.svg';
import Typography from 'components/atoms/Typography';
import theme from 'theme';

export interface CryptoTableRowProps {
  cryptoSrc: string;
  cryptoName: string;
  cryptoLabel: string;
  cryptoPrice: number;
  cryptoChange: number;
  cryptMarketCap: string;
  cryptoWatchList: boolean;
  onIconClick?: () => void;
  onRowClick?: () => void;
  sx?: object;
  style?: React.CSSProperties;
}

const StyledFirstColumnBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
});

const StyledTypographyBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '.25rem',
});

const StyledFirstCell = styled(TableCell)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderBottom: 0,
  height: '2.625rem',
  width: '20.75vw',
  cursor: 'pointer',
});

const StyledSecondCell = styled(TableCell)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderBottom: 0,
  height: '2.625rem',
  width: '20.75vw',
});

const StyledThirdCell = styled(TableCell)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderBottom: 0,
  height: '2.625rem',
  width: '20.75vw',
});

const StyledFourthCell = styled(TableCell)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderBottom: 0,
  height: '2.625rem',
  width: '21.00vw',
});

const StyledFifthCell = styled(TableCell)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderBottom: 0,
  height: '2.625rem',
  width: '9.75vw',
});

const StyledRow = styled(TableRow)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  padding: '5px',
  background: theme.palette.primary.contrastText,
  border: '1px solid',
  borderColor: theme.palette.minet_grey[100],
  borderRadius: '4px',
  marginTop: '1.15vh',
  width: '100%',
  height: '7.7vh',
});

const StyledCryptoName = styled(Typography)({
  color: theme.palette.minet_text.high_emphasis,
  fontWeight: '600',
});

const CryptoTableRow = ({
  cryptoSrc,
  cryptoName,
  cryptoLabel,
  cryptoPrice,
  cryptoChange,
  cryptMarketCap,
  cryptoWatchList,
  onIconClick,
  onRowClick,
  sx,
  style,
}: CryptoTableRowProps) => {
  return (
    <StyledRow sx={sx} style={style}>
      <StyledFirstCell onClick={onRowClick} data-testid="first-cell">
        <StyledFirstColumnBox>
          <Icon src={cryptoSrc} alt="coinName" width="42px" height="42px" />
          <StyledTypographyBox>
            <StyledCryptoName children={cryptoName} variant="body1" />
            <Typography
              children={cryptoLabel}
              variant="overline"
              color={theme.palette.minet_text.medium_emphasis}
            />
          </StyledTypographyBox>
        </StyledFirstColumnBox>
      </StyledFirstCell>
      <StyledSecondCell>
        <Typography
          children={`$${cryptoPrice}`}
          variant="body2"
          color={theme.palette.minet_text.high_emphasis}
        />
      </StyledSecondCell>
      <StyledThirdCell>
        <Typography
          variant="body2"
          style={{
            color:
              cryptoChange > 0
                ? theme.palette.minet_success[500]
                : theme.palette.minet_error[500],
          }}
        >
          {cryptoChange >= 0 ? `+${cryptoChange}%` : `${cryptoChange}%`}
        </Typography>
      </StyledThirdCell>
      <StyledFourthCell>
        <Typography
          children={cryptMarketCap}
          variant="body2"
          color={theme.palette.minet_text.high_emphasis}
        />
      </StyledFourthCell>
      <StyledFifthCell>
        <Icon
          data-testid="icon-id"
          width="19px"
          height="18px"
          src={cryptoWatchList ? Star : UnStar}
          onClick={onIconClick}
          style={{
            cursor: 'pointer',
          }}
        />
      </StyledFifthCell>
    </StyledRow>
  );
};

export default CryptoTableRow;
