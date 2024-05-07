import { Box, Stack, styled } from '@mui/material';
import React from 'react';
import theme from 'theme';
import Image from 'components/atoms/Image';
import Chip from 'components/atoms/Chip';
import Typography from 'components/atoms/Typography';

import {
  CRYPTO_NAMES_AND_SHORTCUTS,
  IMAGE_MAP,
  convertToInterNationalSystemWithOutDecimals,
} from 'utils/constants';

const StyledChip = styled(Chip)({
  height: '25px',
  backgroundColor: theme.palette.minet_grey[50],
  marginLeft: theme.spacing(1),
});

const BitcoinInfoCard = styled(Stack)({
  flexDirection: 'row',
  gap: theme.spacing(1.5),
  alignItems: 'center',
});

const AmountCard = styled(Stack)({
  alignItems: 'flex-end',
});

export interface ITransactionTableRow {
  transactionStatus: 'failed' | 'processing' | 'SUCCESS';
  month: string;
  transactionDate: number;
  paymentType: 'Purchased' | 'Sold';
  coinName: string;
  senderName: string;
  amount: number;
  quantity: number;
}

const TransactionTableRow = ({
  transactionStatus,
  month,
  transactionDate,
  paymentType,
  coinName,
  senderName,
  amount,
  quantity,
}: ITransactionTableRow) => {
  const shortcut: string = CRYPTO_NAMES_AND_SHORTCUTS[coinName.toLowerCase()];
  const sign = paymentType === 'Purchased' ? '-' : '+';
  const quantitySign = paymentType === 'Purchased' ? '+' : '-';

  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      data-testid="transaction-table-row"
    >
      <BitcoinInfoCard>
        <Stack>
          <Typography
            variant="caption2"
            color={theme.palette.minet_text.medium_emphasis}
          >
            {month}
          </Typography>
          <Typography
            variant="subtitle2"
            color={theme.palette.minet_text.high_emphasis}
          >
            {transactionDate}
          </Typography>
        </Stack>
        <Image
          src={IMAGE_MAP[transactionStatus]}
          alt={`${transactionStatus}-transaction-state`}
        />
        <Box>
          <Typography
            variant="body1"
            color={theme.palette.minet_text.high_emphasis}
          >
            {coinName}
          </Typography>
          <Box>
            <Typography
              variant="caption2"
              color={theme.palette.minet_text.medium_emphasis}
            >
              {`From ${senderName}`}
            </Typography>
            <StyledChip
              label={
                <Typography
                  variant="caption2"
                  color={theme.palette.minet_grey[500]}
                >
                  {paymentType}
                </Typography>
              }
            />
          </Box>
        </Box>
      </BitcoinInfoCard>
      <AmountCard>
        <Typography
          variant="body1"
          color={theme.palette.minet_text.high_emphasis}
        >
          {`${quantitySign + quantity} ${shortcut}`}
        </Typography>
        <Typography
          variant="caption2"
          color={theme.palette.minet_text.medium_emphasis}
        >
          {sign + convertToInterNationalSystemWithOutDecimals(amount)}
        </Typography>
      </AmountCard>
    </Stack>
  );
};

export default TransactionTableRow;
