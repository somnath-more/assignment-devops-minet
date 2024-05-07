import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Typography from 'components/atoms/Typography';
import Image from 'components/atoms/Image';
import Graph from 'components/molecules/Graph';
import theme from 'theme';
import { CartesianGrid, XAxis } from 'recharts';
import ArrowLeftChip from '../../../public/assets/icons/chevron-left.svg';
import ArrowRight from '../../../public/assets/icons/chevron-right.svg';
import {
  CHIP_MAP,
  DASHBOARD_CURRENCY,
  DASHBOARD_INFO,
  DASHBOARD_TOTAL_INVESTMENT,
  GRAPH_COIN_DATA_EMPTY,
  GRAPH_MOCK_POINTS_DATA,
  GRAPH_TIME_ARRAY,
  INDIVIDUAL_GRAPH_DATA,
} from 'utils/constants';
import PortfolioValueCard from 'components/molecules/PortfolioValueCard';
import { Box } from '@mui/material';
import Icon from 'components/atoms/Icon';
import Chip from 'components/atoms/Chip';
import info from '../../../public/assets/icons/info.svg';
import EmptyState from '../../../public/assets/images/EmptyState.svg';
import { getCryptoHoldingByUserID } from 'services';
import { MinetStore } from '../../context';

const StyledImage = styled.div({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '42px',
});

const TotalInvestmentContainer = styled.div({
  border: `1px solid ${theme.palette.minet_grey[100]}`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '4px',
  padding: '24px',
  marginBottom: '10px',
});

const StyledChipContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
});

const StyledTexted = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '12px',
  marginTop: '10px',
});

const StyledDotBox = styled.div({
  display: 'flex',
  float: 'right',
  justifyContent: 'space-between',
  gap: '8px',
  paddingBottom: '10px',
});

const StyledDotBitcoin = styled.span({
  color: 'orange',
  fontSize: '20px',
  lineHeight: 0,
});

const StyledDotEthereum = styled.span({
  color: 'red',
  fontSize: '20px',
  lineHeight: 0,
});
const StyledDotTotalInvestment = styled.span({
  color: 'blue',
  fontSize: '20px',
  lineHeight: 0,
});

interface Graphdata {
  dataKey: string;
  stroke: string;
  fill: string | undefined;
}

const LeftContainer = () => {
  const [updatedGraph, setUpdatedGraph] = useState<Graphdata[]>(
    INDIVIDUAL_GRAPH_DATA
  );
  const [transactionFetchedData, setTransactionFetchedData] = useState([]);
  const [coindata, setCoinData] = useState(GRAPH_COIN_DATA_EMPTY);
  const [coinLabel, setCoinLabel] = useState('BitCoin');
  const [selectedChip, setSelectedChip] = useState(CHIP_MAP[0].label);
  const { userDetails } = useContext(MinetStore);
  const userId = userDetails.id;

  const handleGraph = (label) => {
    getCryptoHoldingByUserID(userId).then((response) => {
      const cryptoHoldingData = response.data;
      let updatedLabel = label;

      const selectedCryptoId = cryptoHoldingData.find(
        (crypto) => crypto.crypto.id === updatedLabel.toLowerCase()
      );

      if (selectedCryptoId) {
        updatedLabel = selectedCryptoId.crypto.id;
        console.log('....', selectedCryptoId.crypto.id);
      }

      let coinInvestment = 0;
      let totalInvestment = 0;

      cryptoHoldingData.forEach((crypto) => {
        console.log('.....inside', crypto);
        console.log('crypto.id', crypto.crypto.id);
        console.log('selectedCryptoId', selectedCryptoId);
        if (crypto.crypto.id === updatedLabel.toLowerCase()) {
          coinInvestment += crypto.amount;
        }
        totalInvestment += crypto.amount;
      });

      if (updatedLabel === 'bitcoin') {
        const newGraphData = [
          {
            dataKey: 'uv',
            stroke: theme.palette.primary.main,
            fill: theme.palette.primary[300],
          },
          {
            dataKey: 'pv',
            stroke: theme.palette.minet_warning.main,
            fill: theme.palette.minet_warning.light,
          },
        ];
        setUpdatedGraph(newGraphData);
        console.log('....label',label);
        setSelectedChip(label);
      } else if (updatedLabel === 'ethereum') {
        const newGraphData = [
          {
            dataKey: 'uv',
            stroke: theme.palette.primary.main,
            fill: theme.palette.primary[300],
          },
          {
            dataKey: 'pv',
            stroke: theme.palette.minet_error.main,
            fill: theme.palette.minet_error[100],
          },
        ];
        setUpdatedGraph(newGraphData);
        setSelectedChip(label);
      }

      const coinLabel = label;
      setCoinLabel(coinLabel);

      const updatedCoinData = [
        {
          name: 'Total Investment',
          percentage: -1.23,
          amount: totalInvestment,
        },
        {
          name: coinLabel,
          percentage: 1.2,
          amount: coinInvestment,
        },
      ];
      setCoinData(updatedCoinData);
    });
  };

  useEffect(() => {
    getCryptoHoldingByUserID(userId).then((response) => {
      const transactionData = response.data;
      setTransactionFetchedData(transactionData);
    });
  }, [userId]);

  return (
    <div>
      <TotalInvestmentContainer>
        {transactionFetchedData.length > 0 ? (
          <>
            <div>
              <PortfolioValueCard
                variant={'portfolio'}
                timeArray={GRAPH_TIME_ARRAY}
                coinData={coindata}
              />
            </div>
            <StyledDotBox>
              <Typography variant="caption1">
                {coinLabel === 'Bitcoin' ? (
                  <StyledDotBitcoin>&bull;</StyledDotBitcoin>
                ) : (
                  <StyledDotEthereum>&bull;</StyledDotEthereum>
                )}
                {coinLabel === 'Bitcoin' ? 'Bitcoin' : 'Ethereum'}
              </Typography>
              <Typography variant="caption1">
                <StyledDotTotalInvestment>&bull;</StyledDotTotalInvestment>
                {DASHBOARD_TOTAL_INVESTMENT}
              </Typography>
            </StyledDotBox>
            <Box width="100%" height="268px">
              <Graph
                GraphPointsData={GRAPH_MOCK_POINTS_DATA}
                GraphsIndividualData={updatedGraph}
              >
                <CartesianGrid
                  vertical={false}
                  stroke={theme.palette.minet_grey[300]}
                />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
              </Graph>
            </Box>

            <StyledTexted>
              <Typography variant="body1">{DASHBOARD_INFO}</Typography>
              <Typography
                variant="caption2"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Icon src={info} />
                {DASHBOARD_CURRENCY}
              </Typography>
            </StyledTexted>
            <StyledChipContainer>
              <Icon src={ArrowLeftChip} />
              {CHIP_MAP.map((chip) => (
                <Chip
                  key={chip.id}
                  label={chip.label}
                  onClick={() => handleGraph(chip.label)}
                  style={{
                    ...chip.style,
                    border: chip.label === selectedChip ? 'none' : 'none',
                  }}
                  data-testid="clip-mock"
                />
              ))}
              <Icon src={ArrowRight} />
            </StyledChipContainer>
          </>
        ) : (
          <div>
            <PortfolioValueCard
              variant={'portfolio'}
              timeArray={GRAPH_TIME_ARRAY}
              coinData={coindata}
            />
            <StyledImage>
              <Image src={EmptyState} />
            </StyledImage>
          </div>
        )}
      </TotalInvestmentContainer>
    </div>
  );
};

export default LeftContainer;
