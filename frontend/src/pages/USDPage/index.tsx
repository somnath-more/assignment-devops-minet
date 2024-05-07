import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Typography from 'components/atoms/Typography';
import { ITransactionTableRow } from 'components/molecules/TransactionTableRow';
import USDCoin from 'components/molecules/USDCoin';
import CoinHistoryCard from 'components/organisms/CoinHistoryCard';
import Header from 'components/organisms/Header';
import { DashBoard } from 'components/templates/DashboardTemplate/index.stories';
import { MinetStore } from '../../context';
import React, { useContext, useEffect, useState } from 'react';
import { getTransactionById, getWalletDetails } from 'services';
import minetTheme from 'theme';
import { PURCHASE_TOTAL_BALANCE, WALLET, months } from 'utils/constants';

const StyledUSDBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '1.5rem',
  marginTop: '1.5rem',
});

const StyledTypographyBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '2.2rem',
  marginTop: '1.5rem',
});

const HeaderBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '97%',
  height: '60px',
  backgroundColor: minetTheme.palette.minet_grey[50],
  boxShadow: 'none',
  marginLeft: '2.2rem',
  marginTop: '0.75rem',
  padding: '1.5rem',
});

const USDPage = () => {
  const [allTransactions, setAllTransactions] = useState<
    ITransactionTableRow[]
  >([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { userDetails } = useContext(MinetStore);
  const userId = userDetails.id;

  useEffect(() => {
    let tempPurchasedAmount = 0;
    let tempSoldAmount = 0;
    const fetchAllTransactions = () => {
      let tempTransaction: React.SetStateAction<ITransactionTableRow[]> = [];
      getTransactionById(userId)
        .then((response) => {
          tempTransaction = response.map(
            (item: {
              date: string | number | Date;
              amount: any;
              quantity: any;
              transactionType: any;
              transactionStatus: any;
              coinName: any;
              receiverName: any;
            }) => {
              const date = new Date(item.transactionDate);
              const transactionData = {
                amount: item.amount,
                quantity: item.quantity,
                paymentType:
                  item.transactionType === 'PURCHASED' ? 'Purchased' : 'Sold',
                transactionStatus: item.transactionStatus.toLowerCase(),
                coinName: item.coinName,
                month: months[date.getMonth() - 1],
                transactionDate: date.getDate(),
                senderName: item.receiverName,
              };

              if (
                transactionData.paymentType === 'Purchased' &&
                transactionData.transactionStatus === 'success'
              ) {
                tempPurchasedAmount += transactionData.amount;
              } else {
                tempSoldAmount += transactionData.amount;
              }
              return transactionData;
            }
          );
        })

        .then(() => {
          setAllTransactions(tempTransaction);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      const walletResponse = getWalletDetails(userDetails.id).then((res) => {
        setTotalAmount(res.data.amount);
      });
    };

    fetchAllTransactions();
  }, []);

  return (
    <div>
      <DashBoard header={<Header title={'TRADE'} isButtonRequired={true} />}>
        <StyledUSDBox>
          <USDCoin height="104px" />
        </StyledUSDBox>
        <StyledTypographyBox>
          <Typography
            variant="subtitle2"
            color={minetTheme.palette.minet_grey.high_emphasis}
          >
            {WALLET}
          </Typography>
        </StyledTypographyBox>
        <HeaderBox>
          <Typography
            variant="subtitle2"
            color={minetTheme.palette.minet_grey.high_emphasis}
            sx={{ marginLeft: '25px' }}
          >
            {PURCHASE_TOTAL_BALANCE}
          </Typography>
          <Typography
            variant="subtitle2"
            color={minetTheme.palette.minet_grey[500]}
            sx={{ marginRight: '25px' }}
          >
            $ {totalAmount}
          </Typography>
        </HeaderBox>
        <Box marginLeft={'2.2rem'} marginTop={'.75rem'} width={'97%'}>
          <CoinHistoryCard
            value={0.023451}
            amount={85553.73}
            transactionHistoryData={allTransactions}
            status={false}
          />
        </Box>
      </DashBoard>
    </div>
  );
};

export default USDPage;
