import React, { useContext, useEffect, useState } from 'react';
import Typography from 'components/atoms/Typography';
import CryptoCard from 'components/molecules/CryptoCard';
import { PORTFOLIO_DATA, PORTFOLIO_TOTAL_BALANCE } from 'utils/constants';
import styled from '@emotion/styled';
import MockButton from '../../../../public/assets/images/MockButton.svg';
import Image from 'components/atoms/Image';
import Divider from '../../../../public/assets/images/HorizontalDivider.svg';
import theme from 'theme';
import { getByCryptoCurrency, getCryptoHoldingByUserID } from 'services/index';
import { MinetStore } from '../../../context';
import { Stack } from '@mui/material';
import { getCryptoIconByName } from 'utils/constants/helperFunction';

export interface IPortfolioCard {
  totalAmount?: number;
  height?: string;
  width?: string;
}

type CryptoData = {
  id: number;
  cryptoName: string;
  totalSupply: string;
  cryptoPrice: number;
  cryptoChange: number;
  cryptoMarketCap: string;
  cryptoVolume: string;
  cryptoSrc: string;
  cryptoLabel: string;
};

const MainContainer = styled.div((props: IPortfolioCard) => ({
  width: `${props.width ?? '100%'}`,
  backgroundColor: theme.palette.background.default,
}));

const Container = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0px 34px 0px 24px',
  alignItems: 'center',
});

const TotalContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingRight: '15px',
});

const TotalBox = styled.div({
  padding: '0px 24px 0px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const StyledBox = styled.div((props: IPortfolioCard) => ({
  paddingTop: '10px',
  width: '390px',
  height: `${props.height ?? '150px'}`,
  gap: '4px',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  position: 'relative',
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: `${theme.palette.minet_grey[300]}`,
    width: '5px',
    height: '150px',
    position: 'absolute',
    right: '5px',
    top: '0',
    bottom: '0',
    borderRadius: '3px',
    pointerEvents: 'none',
  },
}));

const InnerList = styled.div({
  padding: '0px 12px 0px 0px',
  background: theme.palette.background.default,
  '&:hover': {
    boxShadow: `0px 1px 10px 0px ${theme.palette.minet_grey[100]}`,
  },
  cursor: 'pointer',
});

const PortfolioCard: React.FC<IPortfolioCard> = ({
  totalAmount,
  width,
  height,
}) => {
  const [userBalance, setUserBalance] = useState(0);

  const formattedTotalAmount =
    userBalance !== undefined
      ? userBalance.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '0.00';

  const { userDetails } = useContext(MinetStore);
  const userId = userDetails.id;
  const [portfolioData, setPortfolioData] = useState<CryptoData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const cryptoHoldingResponse = await getCryptoHoldingByUserID(userId);
      const cryptocurrencyResponse = await getByCryptoCurrency();
      const cryptoHoldingData = cryptoHoldingResponse.data;
      const cryptocurrencyData = cryptocurrencyResponse.data;
      const combinedData = cryptoHoldingData.map((holding) => {
        const cryptoInfo = cryptocurrencyData.find(
          (crypto) => crypto.id === holding.crypto.id
        );
        if (cryptoInfo) {
          return {
            id: cryptoInfo.id,
            cryptoName: cryptoInfo.name,
            totalSupply: cryptoInfo.circulating_supply,
            cryptoPrice: holding.amount,
            cryptoChange: cryptoInfo.price_change_percentage_24h,
            cryptoMarketCap: cryptoInfo.market_cap,
            cryptoVolume: cryptoInfo.total_volume,
            cryptoSrc: cryptoInfo.image,
            cryptoLabel: cryptoInfo.symbol,
            amount: holding.amount,
            quantity: holding.quantity,
          };
        }
        return null;
      });

      const filteredCombinedData = combinedData.filter(Boolean);

      const totalBalance = filteredCombinedData.reduce(
        (total, crypto) => total + crypto.amount,
        0
      );

      setUserBalance(totalBalance);
      setPortfolioData(filteredCombinedData);
    };

    fetchData();
  }, [userId]);

  return (
    <MainContainer width={width}>
      <Container>
        <Typography
          variant="subtitle1"
          style={{
            color: theme.palette.minet_text.high_emphasis,
          }}
        >
          {PORTFOLIO_DATA}
        </Typography>
        <Image src={MockButton} />
      </Container>
      <StyledBox height={height}>
        {portfolioData.length > 0 ? (
          portfolioData.map((coin) => (
            <InnerList key={coin.id}>
              <CryptoCard
                variant={'portfolio'}
                title={coin.cryptoName}
                subTitle={coin.cryptoLabel}
                amount={coin.cryptoPrice}
                image={getCryptoIconByName(coin.cryptoName)}
                percentage={coin.cryptoChange}
              />
            </InnerList>
          ))
        ) : (
          <Stack justifyContent={'center'} alignItems={'center'}>
            <Typography variant="body1"> No portfolio</Typography>
          </Stack>
        )}
      </StyledBox>
      <TotalBox>
        <Image src={Divider} />
        <TotalContainer>
          <Typography
            variant="body1"
            style={{ color: theme.palette.minet_text.medium_emphasis }}
          >
            {PORTFOLIO_TOTAL_BALANCE}
          </Typography>
          <Typography
            variant="body1"
            style={{ color: theme.palette.minet_text.high_emphasis }}
          >
            ${formattedTotalAmount}
          </Typography>
        </TotalContainer>
        <Image src={Divider} />
      </TotalBox>
    </MainContainer>
  );
};

export default PortfolioCard;
