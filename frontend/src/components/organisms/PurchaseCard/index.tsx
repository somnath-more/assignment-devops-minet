import Typography from 'components/atoms/Typography';
import React, { useEffect, useState } from 'react';
import CryptoSelectCard from '../CryptoSelectCard';
import Slider from 'components/atoms/Slider';
import styled from '@emotion/styled';
import CustomButton from 'components/atoms/Button';
import theme from 'theme';
import Image from 'components/atoms/Image';
import Rupee from '../../../../public/assets/icons/Rupee.svg';
import DeliveryCard from 'components/molecules/DeliveryCard';

import {
  DELIVERY_CARD_DATA,
  INSTANT,
  PURCHASE_CARD_AMOUNT_DETAILS,
  PURCHASE_CARD_BUY,
  PURCHASE_CARD_DEFAULT,
  PURCHASE_CARD_DEPOSIT_TO,
  PURCHASE_CARD_PAYMENT_METHOD,
  PURCHASE_CARD_SELL,
  PURCHASE_CARD_SPEED_DELIVERY,
  PURCHASE_CARD_USD_COIN,
  PURCHASE_CARD_USD_COIN_CASH,
  PURCHASE_TOTAL_BALANCE,
  TRANSACTION_SUBTITLE,
} from 'utils/constants';
import {
  formattedBalance,
  getCryptoIconByName,
} from 'utils/constants/helperFunction';

export interface AmountDetailsCardsProps {
  coinsrc?: string;
  coinName: string;
  coin: string;
  coinValue: number;
  totalBalance: number;
  isBuycard: boolean;
  coinQuantity?: number;
  onSliderChange: (bitcoinQuantity: number, amount: number) => void;
}
const StyledSliderBox = styled.div({
  border: `1px solid ${theme.palette.minet_grey[100]}`,
  borderRadius: '4px',
  marginTop: '1.5rem',
  backgroundColor: theme.palette.background.default,
  padding: '24px',
});

const StyledTypography = styled(Typography)({
  padding: '0px 0px 12px 0px',
});

const USDInnerBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '.25rem',
});
const StyledSliderAmountBox = styled.div({
  border: `1px solid ${theme.palette.minet_grey[100]}`,
  borderRadius: '4px',
  padding: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '80px',
});

const StyledSliderAmount = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const SliderContainer = styled.div({
  display: 'flex',
  justifyContent: 'start',
  paddingLeft: '50px',
});

const MainConatiner = styled.div({
  padding: '0px 24px 24px 24px',
});

const UsdContainer = styled.div({
  border: `1px solid ${theme.palette.minet_grey[100]}`,
  padding: '24px',
  borderRadius: '4px',
  backgroundColor: theme.palette.background.default,
});

const CoinDefaultBox = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  border: `1px solid ${theme.palette.minet_grey[100]}`,
  borderRadius: '4px',
  padding: '24px',
  alignItems: 'center',
});

const CoinStyledTypography = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const PurchaseCard: React.FC<AmountDetailsCardsProps> = ({
  coinName,
  coin,
  coinValue,
  totalBalance,
  coinQuantity,
  isBuycard,
  onSliderChange,
}) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const updatedValue = value;
    const bitcoinQuantity = isBuycard
      ? Number(((totalBalance / coinValue) * (updatedValue / 100)).toFixed(7))
      : (coinQuantity && coinQuantity * (value / 100)) || 0;
    const amount = isBuycard
      ? (totalBalance * (updatedValue / 100)).toFixed(2)
      : (coinQuantity &&
          (coinQuantity * coinValue * (updatedValue / 100)).toFixed(2)) ||
        '0.00';
    onSliderChange(bitcoinQuantity, parseFloat(amount));
  }, [value]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const updatedValue = newValue as number;
    setValue(updatedValue);

    const bitcoinQuantity = isBuycard
      ? Number(((totalBalance / coinValue) * (updatedValue / 100)).toFixed(7))
      : (coinQuantity && coinQuantity * (updatedValue / 100)) || 0;

    const amount = isBuycard
      ? (totalBalance * (updatedValue / 100)).toFixed(2)
      : (coinQuantity &&
          (coinQuantity * coinValue * (updatedValue / 100)).toFixed(2)) ||
        '0.00';
    onSliderChange(bitcoinQuantity, parseFloat(amount));
  };

  const onButtonClick = () => {
    setValue(100);
  };

  return (
    <div>
      {isBuycard ? (
        <StyledTypography variant="subtitle1">
          {PURCHASE_CARD_BUY}
        </StyledTypography>
      ) : (
        <StyledTypography variant="subtitle1">
          {PURCHASE_CARD_SELL}
        </StyledTypography>
      )}
      <CryptoSelectCard selectedTab={isBuycard ? coin : coin.toLowerCase()} />
      <MainConatiner></MainConatiner>
      {isBuycard ? (
        <UsdContainer>
          <Typography
            variant="body1"
            color={theme.palette.minet_text.high_emphasis}
            style={{ padding: '0px 0px 24px 0px' }}
          >
            <b>{PURCHASE_CARD_PAYMENT_METHOD}</b>
          </Typography>
          <StyledSliderAmountBox>
            <StyledSliderAmount>
              <Image src={Rupee} height="32px" width="32px" />
              <USDInnerBox>
                <Typography variant="caption1">USD Coin(Cash)</Typography>
                <Typography
                  variant="subtitle1"
                  style={{ color: theme.palette.minet_text.medium_emphasis }}
                >
                  {coin === 'btc'
                    ? `${PURCHASE_TOTAL_BALANCE} - $${(
                        totalBalance + 1000
                      ).toFixed(2)}`
                    : `${PURCHASE_TOTAL_BALANCE} - $${(
                        totalBalance + 30
                      ).toFixed(2)}`}
                </Typography>
              </USDInnerBox>
            </StyledSliderAmount>
            <Typography
              variant="caption1"
              style={{ color: theme.palette.minet_text.medium_emphasis }}
            >
              {PURCHASE_CARD_DEFAULT}
            </Typography>
          </StyledSliderAmountBox>
        </UsdContainer>
      ) : (
        <UsdContainer>
          <Typography variant="body1" style={{ padding: '0px 0px 24px 0px' }}>
            {PURCHASE_TOTAL_BALANCE}
          </Typography>
          <CoinDefaultBox>
            <CoinStyledTypography variant="caption1">
              <Image
                src={getCryptoIconByName(coinName)}
                height="32px"
                width="32px"
              />
              {coinName}
            </CoinStyledTypography>
            <CoinStyledTypography variant="subtitle1">
              {coinQuantity ? coinQuantity.toFixed(7) : '0.00000'}
              <Typography variant="subtitle1">{coin}</Typography>
            </CoinStyledTypography>
          </CoinDefaultBox>
        </UsdContainer>
      )}

      <StyledSliderBox>
        <Typography
          variant="body1"
          color={theme.palette.minet_text.high_emphasis}
          style={{ padding: '0px 0px 24px 24px' }}
        >
          <b>{PURCHASE_CARD_AMOUNT_DETAILS}</b>
        </Typography>
        <MainConatiner>
          <StyledSliderAmountBox>
            {isBuycard ? (
              <Typography variant="subtitle1">
                {'$' + formattedBalance(Math.abs(totalBalance * (value / 100)))}
              </Typography>
            ) : (
              <Typography variant="subtitle1">
                {(coinQuantity && (coinQuantity * (value / 100)).toFixed(7)) ||
                  '0.00000'}
              </Typography>
            )}
            <CustomButton
              variant="outlined"
              onClick={onButtonClick}
              style={{ height: '42px', textTransform: 'none' }}
            >
              {isBuycard ? 'Buy max' : 'Sell max'}
            </CustomButton>
          </StyledSliderAmountBox>
          <SliderContainer>
            <Slider value={value} onChange={handleSliderChange} />
            <Typography
              variant="caption1"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.minet_text.medium_emphasis,
              }}
            >
              {'1' +
                (coin ? coin.toUpperCase() : '') +
                ' = $ ' +
                formattedBalance(coinValue)}
            </Typography>
          </SliderContainer>
          <StyledSliderAmountBox>
            {isBuycard ? (
              <Typography variant="subtitle1">
                {Math.abs((totalBalance / coinValue) * (value / 100))
                  .toFixed(7)
                  .toString()}
              </Typography>
            ) : (
              <Typography variant="subtitle1">
                {' '}
                {'$' +
                  formattedBalance(
                    coinQuantity && coinQuantity * coinValue * (value / 100)
                  )}
              </Typography>
            )}
            {isBuycard ? (
              <Typography
                variant="body1"
                style={{ color: theme.palette.minet_text.medium_emphasis }}
              >
                {coin ? coin.toUpperCase() : ''}
              </Typography>
            ) : (
              <Typography
                variant="body1"
                style={{ color: theme.palette.minet_text.medium_emphasis }}
              >
                {PURCHASE_CARD_USD_COIN_CASH}
              </Typography>
            )}
          </StyledSliderAmountBox>
        </MainConatiner>
      </StyledSliderBox>
      <MainConatiner></MainConatiner>
      {isBuycard ? (
        <UsdContainer>
          <Typography variant="body1" style={{ padding: '0px 24px 24px 0px' }}>
            {PURCHASE_CARD_SPEED_DELIVERY}
          </Typography>
          <DeliveryCard
            deliveryCardDetails={DELIVERY_CARD_DATA}
            title={INSTANT}
            subTitle={TRANSACTION_SUBTITLE}
          />
        </UsdContainer>
      ) : (
        <UsdContainer>
          <Typography variant="body1" style={{ padding: '0px 24px 24px 0px' }}>
            {PURCHASE_CARD_DEPOSIT_TO}
          </Typography>
          <CoinDefaultBox>
            <CoinStyledTypography variant="caption1">
              <Image src={Rupee} height="32px" width="32px" />
              {PURCHASE_CARD_USD_COIN}
            </CoinStyledTypography>
            <Typography
              variant="caption1"
              style={{ color: theme.palette.minet_text.medium_emphasis }}
            >
              {PURCHASE_CARD_DEFAULT}
            </Typography>
          </CoinDefaultBox>
        </UsdContainer>
      )}
    </div>
  );
};

export default PurchaseCard;
