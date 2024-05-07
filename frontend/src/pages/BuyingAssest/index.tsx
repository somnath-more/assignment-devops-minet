import { Box } from '@mui/material';
import { styled } from '@mui/system';
import BuySellCard from 'components/molecules/BuySellSummaryCard';
import Header from 'components/organisms/Header';
import PurchaseCard from 'components/organisms/PurchaseCard';
import Dashboard from 'components/templates/DashboardTemplate';
import { useContext, useEffect, useState } from 'react';
import {
  fetchCryptoCoinInfoWithId,
  getCryptoHolding,
  getWalletDetails,
  postCryptoHolding,
  postTransactionDetails,
  updateCryptoHolding,
  updateWalletDetails,
} from '../../services/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatCurrentDate } from 'utils/constants/helperFunction';
import {
  BITCOIN_DELIVERY,
  BITCOIN_FEE,
  BITCOIN_VALUE,
  BITCOIN_WALLET,
  BUY_CRYPTO_BUTTON,
  BUY_NOW,
  CHECKOUT,
  ERROR,
  ETHEREUM_DELIVERY,
  ETHEREUM_FEE,
  ETHEREUM_VALUE,
  ETHEREUM_WALLET,
  PAYMENT_METHOD,
  PURCHASE_COMPLETE_1,
  PURCHASE_COMPLETE_2,
  TRANSACTION_TYPE,
  USD_COIN_BUTTON,
} from 'utils/constants';
import PaymentSuccessCard from 'components/molecules/PaymentSuccessCard';
import { MinetStore } from '../../context';

const CustomStyledMainBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.5rem',
  marginLeft: '1.5rem',
  marginTop: '1.5rem',
});

const BuyingAssest = () => {
  const [currentState, setCurrentState] = useState<number>(0);
  const [purchasedValue, setPurchaseValue] = useState<number>(0);
  const [cryptoData, setCryptoData] = useState([]);
  const [balance, setBalance] = useState<number>(0);
  const [buyingAmount, setBuyingAmount] = useState<number>(0);
  const location = useLocation();
  const cryptoLabel = location.state;
  const { userDetails } = useContext(MinetStore);
  const userId = userDetails.id;
  const navigate = useNavigate();
  const cryptoCoinId = cryptoLabel.id;

  useEffect(() => {
    getWalletDetails(userId)
      .then((res) => {
        setBalance(res.data.amount);
      })
      .catch((error) => {
        console.error(ERROR, error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const cryptoCoins = await fetchCryptoCoinInfoWithId(cryptoCoinId);
      setCryptoData(cryptoCoins);
    };
    fetchData();
  }, []);

  const handleSliderChange = (value: number, amount: number) => {
    setBuyingAmount(amount);
    setPurchaseValue(value);
  };

  const handleDisableButton = (): boolean => {
    const totalBalanceValue = parseFloat(
      totalBalance(cryptoLabel).replace('$', '')
    );
    return totalBalanceValue <= 0 || totalBalanceValue > balance;
  };

  const handleBuyClick = async () => {
    try {
      const currentDate = new Date();
      const totalBalanceValue = parseFloat(
        totalBalance(cryptoLabel).replace('$', '')
      );

      const cryptoCoins = await fetchCryptoCoinInfoWithId(cryptoCoinId);

      const transactionData = {
        amount: totalBalanceValue,
        quantity: parseFloat(`${purchasedValue}`),
        transactionType: TRANSACTION_TYPE,
        transactionStatus: 'SUCCESS',
        coinName: cryptoCoins.name,
        transactionDate: formatCurrentDate(currentDate),
        receiverName: 'xyz',
        userId: userId,
        cryptoId: cryptoCoins.id,
      };

      const newWalletData = {
        amount: balance - totalBalanceValue,
      };
      const wallet = await updateWalletDetails(
        userDetails.walletId,
        newWalletData
      );

      const holdings = await getCryptoHolding(userId, cryptoCoinId);
      const newHolding = {
        userId: userId,
        crypto: cryptoCoins,
        amount: totalBalanceValue,
        quantity: purchasedValue,
      };

      if (holdings.data.length !== 0) {
        const updatedAmount = (holdings.data[0].amount + totalBalanceValue) / 2;
        await updateCryptoHolding(holdings.data[0].id, updatedAmount);
      } else {
        await postCryptoHolding(newHolding);
      }

      const response = await postTransactionDetails(transactionData);
      if (response.status === 201) {
        setCurrentState(1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalBalance = (cryptoLabel: any): string => {
    let totalAmount: number;
    if (cryptoData.symbol === 'btc' && buyingAmount > 0) {
      totalAmount = buyingAmount + 1000;
    } else if (buyingAmount > 0) {
      totalAmount = buyingAmount + 30;
    } else {
      totalAmount = 0;
    }
    return `$${totalAmount.toFixed(2)}`;
  };

  return (
    <div>
      {currentState == 0 && (
        <Dashboard
          header={<Header title={CHECKOUT} isButtonRequired={false} />}
        >
          <CustomStyledMainBox>
            <Box width={'67%'} marginTop={'2rem'} marginBottom={'2.25rem'}>
              <PurchaseCard
                coinName={cryptoData.name}
                coin={cryptoData.symbol}
                coinValue={cryptoData.current_price}
                totalBalance={
                  cryptoData.symbol === 'btc' ? balance - 1000 : balance - 30
                }
                isBuycard={true}
                onSliderChange={handleSliderChange}
              />
            </Box>
            <Box width={'38.6vw'} marginTop={'.56rem'}>
              <BuySellCard
                data-testid="buy-card"
                isBuying={true}
                coinQty={
                  cryptoData.symbol === 'btc'
                    ? `${Math.abs(purchasedValue)} BTC`
                    : `${Math.abs(purchasedValue)} ETH`
                }
                coinValue={`1${
                  cryptoData.symbol ? cryptoData.symbol.toUpperCase() : ''
                } = $${cryptoData.current_price}`}
                paymentMethod={PAYMENT_METHOD}
                deliveryFees={
                  cryptoData.symbol === 'btc'
                    ? BITCOIN_DELIVERY
                    : ETHEREUM_DELIVERY
                }
                depositTo={
                  cryptoData.symbol === 'btc' ? BITCOIN_WALLET : ETHEREUM_WALLET
                }
                priceOfQty={`$${Math.abs(buyingAmount)}`}
                transactionFee={
                  cryptoData.symbol === 'btc' ? BITCOIN_FEE : ETHEREUM_FEE
                }
                total={totalBalance(cryptoLabel)}
                buttonLabel={BUY_NOW}
                buttonDisable={handleDisableButton()}
                onClick={handleBuyClick}
              />
            </Box>
          </CustomStyledMainBox>
        </Dashboard>
      )}
      {currentState === 1 && (
        <Dashboard header={<Header title={CHECKOUT} isButtonRequired={true} />}>
          <PaymentSuccessCard
            blnAmount={`${
              purchasedValue + ' ' + cryptoData.symbol.toUpperCase()
            }`}
            textArea1={PURCHASE_COMPLETE_1}
            textArea2={PURCHASE_COMPLETE_2}
            buttonText1={BUY_CRYPTO_BUTTON}
            buttonText2={USD_COIN_BUTTON}
            onClick={() => {
              navigate('/usd');
            }}
          />
        </Dashboard>
      )}
    </div>
  );
};

export default BuyingAssest;
