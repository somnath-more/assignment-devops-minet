import { Box, styled } from '@mui/material';
import Icon from 'components/atoms/Icon';
import Typography from 'components/atoms/Typography';
import React, { useContext, useEffect, useState } from 'react';
import theme from 'theme';
import { MY_WALLET_CARD } from 'utils/constants';
import RUPEE from '../../../../public/assets/icons/Rupee.svg';
import Image from 'components/atoms/Image';
import DefaultTransaction from '../../../../public/assets/icons/DefaultTransaction.svg';
import RecentTransactionRow from 'components/molecules/RecentTransactionRow';
import { getTransactionData, getWalletData } from 'services';
import { MinetStore } from '../../../context';

export type TransactionDataProps = {
  id: number;
  userId: number;
  transactionDate: Date;
  cryptoLabel: string;
  cryptoQuantity: number;
  totalAmount: number;
  chipLabel: string;
  otherUser: string;
};

export interface MyWalletCardProps {
  height?: string;
  width?: string;
}

export type TransactionData = {
  id: number;
  amount: number;
  quantity: number;
  transactionType: string;
  transactionStatus: string;
  coinName: string;
  status: string;
  transactionDate: '2023-10-30';
  receiverName: string;
};

const StyledIconTypography = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
});

const StyledCoinLabelBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const StyledHeaderBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '10px',
});

const StyledSubHeaderBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: '22px',
  marginTop: '1.5rem',
  marginBottom: '0.75rem',
});

const StyledTransactionBox = styled(Box)({
  width: '100%',
  height: '94px',
  gap: '15px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const StyledImageBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '3rem',
});

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '0px 14px 0px 24px',
  marginTop: '12px',
  backgroundColor: theme.palette.background.default,
  minHeight: '440px',
});

const MyWalletCard = ({ height, width }: MyWalletCardProps) => {
  const { userDetails } = useContext(MinetStore);
  const userId = userDetails.id;
  const intialUsdCoin = '0.00';
  const [fetchTransaction, setFetchTransaction] = useState<TransactionData[]>(
    []
  );
  const [usdCoin, setUsdCoin] = useState(intialUsdCoin);
  useEffect(() => {
    getWalletData(userId).then((response) => {
      const data = response.data;

      if (data) {
        const amount = data.amount;
        setUsdCoin(amount);
      } else {
        setUsdCoin(intialUsdCoin);
      }
    });
    getTransactionData(userId).then((response) => {
      const fetchedData = response.data;
      setFetchTransaction(fetchedData.reverse());
    });
  }, [userId]);

  const formatCryptoLabel = (coinName) => {
    if (coinName === 'Bitcoin') {
      return (coinName = 'Bitcoin BTC');
    } else if (coinName === 'Ethereum') {
      return (coinName = 'Ethereum ETC');
    }
    return coinName;
  };

  const formatCryptoQuantity = (coinName, quantity) => {
    if (coinName === 'Bitcoin') {
      return `${quantity} BTC`;
    } else if (coinName === 'Ethereum') {
      return `${quantity} ETC`;
    }
    return quantity;
  };
  return (
    <StyledBox width={width} height={height}>
      <Typography
        variant="subtitle1"
        color={theme.palette.minet_text.high_emphasis}
      >
        {MY_WALLET_CARD.header}
      </Typography>
      <StyledHeaderBox>
        <StyledIconTypography>
          <Icon src={RUPEE} alt="rupee" height="42px" width="42px" />
          <StyledCoinLabelBox>
            <Typography
              variant="body1"
              color={theme.palette.minet_text.high_emphasis}
            >
              {MY_WALLET_CARD.usdCoin}
            </Typography>
            <Typography
              variant="caption2"
              color={theme.palette.minet_text.medium_emphasis}
            >
              {MY_WALLET_CARD.Dollar}
            </Typography>
          </StyledCoinLabelBox>
        </StyledIconTypography>

        <Typography
          variant="body1"
          color={theme.palette.minet_text.high_emphasis}
        >
          $ {usdCoin}
        </Typography>
      </StyledHeaderBox>

      <StyledSubHeaderBox>
        <Typography
          variant="subtitle1"
          color={theme.palette.minet_text.high_emphasis}
        >
          {MY_WALLET_CARD.recentTransaction}
        </Typography>
        <Typography variant="caption2" color={theme.palette.primary[500]}>
          {MY_WALLET_CARD.viewAll}
        </Typography>
      </StyledSubHeaderBox>
      {fetchTransaction.length > 0 ? (
        <StyledTransactionBox data-testid="transaction-box">
          {fetchTransaction?.map((item) => (
            <RecentTransactionRow
              key={item.id}
              height="100%"
              width="100%"
              transactionDate={item.transactionDate}
              cryptoLabel={formatCryptoLabel(item.coinName)}
              cryptoQuantity={formatCryptoQuantity(
                item.coinName,
                item.quantity
              )}
              totalAmount={item.amount}
              chipLabel={item.transactionType}
            />
          ))}
        </StyledTransactionBox>
      ) : (
        <StyledImageBox>
          <Image data-testid="image-box" src={DefaultTransaction} />
        </StyledImageBox>
      )}
    </StyledBox>
  );
};

export default MyWalletCard;
