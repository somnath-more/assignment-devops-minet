import { Box, Grid, styled } from '@mui/material';
import Typography from 'components/atoms/Typography';
import ChooseCryptoCard from 'components/molecules/ChooseCryptoCard';
import React, { useEffect, useState } from 'react';
import { fetchCryptoCoinInfo } from '../../../services/index';
import minetTheme from 'theme';
import { CHOOSE_CRYPTO } from 'utils/constants';
import { getCryptoIconByName } from 'utils/constants/helperFunction';
export interface CryptoSelectCardProps {
  selectedTab: string;
  width?: string;
}

const CustomStyledMainBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'column',
  padding: '24px',
  gap: '1rem',
  border: '1px solid',
  borderColor: minetTheme.palette.minet_grey[100],
  backgroundColor: minetTheme.palette.background.default,
  overflowY: 'scroll',
  overflowX: 'scroll',
  '&::-webkit-scrollbar': {
    width: '5px',
    height: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: minetTheme.palette.minet_grey[300],
    borderRadius: '3px',
  },
});

const CustomStyledCryptoBox = styled(Box)({
  width: '100%',
  maxHeight: '328px',
});

const CustomStyledGrid = styled(Grid)({
  marginBottom: '1rem',
});

const CryptoSelectCard = ({ selectedTab, width }: CryptoSelectCardProps) => {
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCryptoCoinInfo();
        setCrypto(data);
      } catch {
        console.error('Failed to fetch user details:');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {}, []);

  return (
    <CustomStyledMainBox width={width}>
      <Typography
        variant="body1"
        color={minetTheme.palette.minet_text.high_emphasis}
      >
        <b>{CHOOSE_CRYPTO}</b>
      </Typography>

      <CustomStyledCryptoBox>
        <Grid container>
          {crypto.map((item: any) => (
            <CustomStyledGrid item xs={3} key={item.id}>
              <ChooseCryptoCard
                cryptoCardSrc={getCryptoIconByName(item.name)}
                cryptoCardLabel={item.name}
                cryptoCardDescription={`$${' ' + item.current_price}`}
                cryptoCardSelected={selectedTab === item.symbol}
              />
            </CustomStyledGrid>
          ))}
        </Grid>
      </CustomStyledCryptoBox>
    </CustomStyledMainBox>
  );
};

export default CryptoSelectCard;
