import { Box, Stack } from '@mui/material';
import BuySellCard from 'components/molecules/BuySellSummaryCard';
import PurchaseCard from 'components/organisms/PurchaseCard';
import { DashBoard } from 'components/templates/DashboardTemplate/index.stories';
import React, { useContext, useEffect, useState } from 'react';
import {
  CRYPTO_DUMMY_DATA,
  CRYPTO_INFO,
  ICryptoDummyData,
  RUPEE_COIN,
  SELL,
  TRANSACTIONS_NULL_DATA,
  convertToInterNationalSystem,
} from 'utils/constants';
import {
  deleteCryptoHoldingsById,
  getCoinHoldingByUserId,
  getCryptoById,
  getCryptoHoldingsById,
  getWalletDetails,
  postTransaction,
  postTransactionDetails,
  updateCryptoHoldings,
  updateWalletDetails,
} from 'services';
import PaymentSuccessCard from 'components/molecules/PaymentSuccessCard';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  formatCurrentDate,
  getCryptoKeyById,
} from 'utils/constants/helperFunction';
import { MinetStore } from '../../context';

interface ITransaction {
  quantity: number | null;
  price: number | null;
  userId: number | null;
  cryptoId: number | null;
  id: number | null;
}

const SellPage = () => {
  const [holdingsData, setHoldingsData] = useState<ITransaction>(
    TRANSACTIONS_NULL_DATA
  );
  const [sellScreen, setSellScreen] = useState<boolean>(true);
  const [cryptoData, setCryptoData] = useState(CRYPTO_DUMMY_DATA);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const { userDetails, setNetworkError } = useContext(MinetStore);
  const location = useLocation();
  const cryptoLabel = location.state;
  console.log(cryptoLabel);

  let bitCoinPrice = 3406069.54;
  const userId = userDetails.id;

  const cryptoId = cryptoLabel.id;
  useEffect(() => {
    (async () => {
      try {
        const holdingsResponse = await getCoinHoldingByUserId(
          getCryptoKeyById(cryptoId),
          userId
        );
        console.log(holdingsResponse);

        if (holdingsResponse.data[0] !== undefined) {
          setHoldingsData(holdingsResponse.data[0]);
          setCryptoData(holdingsResponse.data[0].crypto);
        }
      } catch (error) {
        // setNetworkError(true);
      }
    })();
  }, []);

  const transactionFee = 1000;
  const coinValue = sliderValue * bitCoinPrice;

  const coinAmount = sliderValue * cryptoData.current_price;
  const navigate = useNavigate();
  console.log(sliderValue, '---slider');

  const sellClickHandler = async () => {
    try {
      const postData = {
        amount: coinAmount,
        quantity: sliderValue,
        transactionType: 'SOLD',
        transactionStatus: 'SUCCESS',
        transactionDate: formatCurrentDate(new Date()),
        receiverName: 'xyz',
        userId: userId,
        cryptoId: cryptoData.id,
        coinName: cryptoLabel.name,
      };
      const response = await postTransactionDetails(postData);

      await getCoinHoldingByUserId(getCryptoKeyById(cryptoId), userId)
        .then(async (res) => {
          if (holdingsData.quantity === sliderValue) {
            console.log('delete');

            deleteCryptoHoldingsById(res.data[0].id);
          } else {
            const amount = parseFloat(coinAmount.toFixed(2)) - 1000;
            const holdings = res.data[0];
            await updateCryptoHoldings(
              {
                quantity: holdings.quantity - sliderValue,
                amount: holdings.amount - amount + 1000,
              },
              holdings.id
            );
          }
          await getWalletDetails(userDetails.id).then(async (res) => {
            await updateWalletDetails(res.data.id, {
              amount:
                res.data.amount + parseFloat(coinAmount.toFixed(2)) - 1000,
            });
            setSellScreen(false);
          });
        })
        .catch(() => {
          console.log('catch ');
        });
    } catch {}
  };

  return (
    <DashBoard header={''}>
      {sellScreen ? (
        <Stack direction={'row'} data-testid="sell-page">
          <Box margin="24px" width={'67%'}>
            <PurchaseCard
              coinName={cryptoData.name}
              coin={cryptoData.symbol.toUpperCase()}
              coinQuantity={holdingsData.quantity}
              coinValue={cryptoData.current_price}
              totalBalance={holdingsData.amount}
              isBuycard={false}
              coinsrc={cryptoData.cryptoSrc}
              onSliderChange={(value) => {
                setSliderValue(parseFloat(value.toFixed(7)));
              }}
            />
          </Box>
          <Box width="38.6vw">
            <BuySellCard
              isBuying={false}
              coinQty={`${sliderValue} BTC`}
              coinValue={`1${
                cryptoData.symbol
              } = ${convertToInterNationalSystem(bitCoinPrice)}`}
              paymentMethod={`${cryptoData.name} wallet`}
              deliveryFees={`0.001 ${cryptoData.symbol.toUpperCase()}`}
              depositTo={RUPEE_COIN}
              priceOfQty={`$${coinAmount.toFixed(2)}`}
              transactionFee={convertToInterNationalSystem(transactionFee)}
              total={(coinAmount - transactionFee).toFixed(2)}
              buttonLabel={SELL}
              buttonDisable={sliderValue === 0}
              onClick={sellClickHandler}
            />
          </Box>
        </Stack>
      ) : (
        <Box>
          <PaymentSuccessCard
            onClick={() => {
              navigate('/usd');
            }}
            blnAmount={`${sliderValue} BTC`}
            buttonText1={CRYPTO_INFO.sellButton}
            buttonText2={CRYPTO_INFO.goToUsdCoinButton}
            textArea1={CRYPTO_INFO.sellCompletedText}
            textArea2={CRYPTO_INFO.balanceCheckText}
          />
        </Box>
      )}
    </DashBoard>
  );
};

export default SellPage;
