import { Box, styled } from '@mui/material';
import Chip from 'components/atoms/Chip';
import Icon from 'components/atoms/Icon';
import Typography from 'components/atoms/Typography';
import React from 'react';
import theme from 'theme';
import SUCCESS from '../../../../public/assets/icons/Success.svg';

export interface RecentTransactionRowProps {
  height?: string;
  width?: string;
  transactionDate?: Date;
  cryptoLabel: string;
  cryptoQuantity: string;
  totalAmount: string;
  chipLabel: string;
}

export const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const InnerBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const DateTypoBox = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: '0.5rem',
});

export const CryptoTypoBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '.25rem',
});

export const StatusTypoBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const ChipContainer = styled(Box)({
  minWidth: '67px',
});

export const TransactionBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
});

const RecentTransactionRow = ({
  height,
  width,
  transactionDate,
  cryptoLabel,
  cryptoQuantity,
  totalAmount,
  chipLabel,
}: RecentTransactionRowProps) => {
  let formattedDate: string | undefined;
  if (transactionDate) {
    const date = new Date(transactionDate);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    formattedDate = `${month} ${day}`;
  }

  const isPurchase = chipLabel === 'PURCHASED';
  const symbol = isPurchase ? '-' : '+';
  const quantitysymbol = isPurchase ? '+' : '-';
  return (
    <StyledBox>
      <DateTypoBox>
        <Typography
          variant="caption2"
          color={theme.palette.minet_text.high_emphasis}
        >
          {formattedDate}
        </Typography>
      </DateTypoBox>
      <TransactionBox>
        <Icon src={SUCCESS} />
        <InnerBox>
          <CryptoTypoBox>
            <Typography
              variant="body1"
              color={theme.palette.minet_text.high_emphasis}
              textTransform={'none'}
            >
              {cryptoLabel}
            </Typography>
            <Typography
              variant="body1"
              color={theme.palette.minet_text.high_emphasis}
            >
              {`${quantitysymbol} ${cryptoQuantity}`}
            </Typography>
          </CryptoTypoBox>
          <StatusTypoBox>
            <ChipContainer>
              <Chip
                label={chipLabel === 'PURCHASED' ? 'Purchased' : 'Sold' }
                style={{
                  borderRadius: '100px',
                  background: theme.palette.minet_grey[100],
                  ...theme.typography.caption2,
                  color: theme.palette.minet_grey[500],
                  height: '20px',
                }}
              />
            </ChipContainer>
            <Typography
              variant="caption2"
              color={theme.palette.minet_text.medium_emphasis}
            >
              {`${symbol} ${totalAmount}`}
            </Typography>
          </StatusTypoBox>
        </InnerBox>
      </TransactionBox>
    </StyledBox>
  );
};

export default RecentTransactionRow;
