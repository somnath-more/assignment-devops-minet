import { Box, Grid, Stack, Typography, styled } from '@mui/material';
import Chip from 'components/atoms/Chip';
import React, { useContext, useEffect, useRef, useState } from 'react';
import theme from 'theme';
import Graph from 'components/molecules/Graph';
import {
  PORTFOLIO_GRAPH_DATA,
  convertToInterNationalSystem,
} from 'utils/constants';
import { YAxis } from 'recharts';
import Image from 'components/atoms/Image';
import ProfitArrow from '../../../../public/assets/images/ProfitArrow.svg';
import LossArrow from '../../../../public/assets/images/LossArrow.svg';
import { getProfitOrLossPercentage } from 'utils/constants/helperFunctions';
import { getByCryptoCurrency, getByWatchListData } from 'services';
import { MinetStore } from '../../../context';
import { getCryptoIconByName } from 'utils/constants/helperFunction';
const StyledGraphCard = styled(Box)({
  flexGrow: '1',
});

const CoinInfoCard = styled(Stack)({
  flexDirection: 'row',
  gap: theme.spacing(1.5),
});

const StyledStack = styled(Stack)({
  gap: '12px',
  padding: theme.spacing(3),
  borderRadius: '4px',
  border: `1px solid ${theme.palette.minet_grey[100]}`,
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#ECECF7',
  },
});

const StyledChip = styled(Chip)({
  height: '18px',
});

interface GraphDataPoint {
  name: string;
  amount: number;
}

interface PortfolioItem {
  key: number;
  name: string;
  amount: number;
  duration: string;
  graphData: GraphDataPoint[];
  Logo: string;
}

export interface IWishlistCardProps {
  portfolioGraphData: PortfolioItem[];
  watchListHandler: (key: number) => void;
}
const WishlistCard = ({
  portfolioGraphData,
  watchListHandler,
}: IWishlistCardProps) => {
  const itemSize = portfolioGraphData.length > 2 ? 6 : 12;
  const { userDetails } = useContext(MinetStore);
  const userId = userDetails.id;
  const [watchlist, setWatchlist] = useState<PortfolioItem[]>([]);
  const isFirstTimeRef = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const watchlistResponse = await getByWatchListData(userId);
        const watchlistedItems = watchlistResponse.data;
        const cryptoResponse = await getByCryptoCurrency();
        const cryptoData = cryptoResponse.data;
        const mappedData = watchlistedItems.map((watchlist) => {
          const cryptoInfo = cryptoData.find(
            (crypto) => crypto.id === watchlist.cryptoId
          );
          if (cryptoInfo) {
            const selectedId = isFirstTimeRef.current ? 0 : 1;
            const portfolioItem: PortfolioItem = {
              key: cryptoInfo.id,
              name: cryptoInfo.name,
              amount: cryptoInfo.current_price,
              duration: '24h',
              graphData: PORTFOLIO_GRAPH_DATA[selectedId].graphData,
              Logo: cryptoInfo.image,
            };
            isFirstTimeRef.current = !isFirstTimeRef.current;

            return portfolioItem;
          }
        });
        if (mappedData.length === 0) {
          const bitcoinItem = PORTFOLIO_GRAPH_DATA.find(
            (item) => item.name === 'Bitcoin'
          );
          if (bitcoinItem) {
            setWatchlist([bitcoinItem]);
          }
        } else {
          setWatchlist(mappedData.filter(Boolean));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Grid container spacing={3} data-testid="wishlist-card">
      {watchlist.slice(0, 4).map((item, index) => {
        const analyzedData = getProfitOrLossPercentage(item.graphData);
        return (
          <Grid
            item
            xs={portfolioGraphData.length === 3 && index === 2 ? 12 : itemSize}
            key={item.name}
            data-testid={`wishlist-${item.key}`}
            onClick={() => {
              watchListHandler(item.key, item.name);
            }}
          >
            <StyledStack direction={'row'} data-testid="wishlist">
              <CoinInfoCard>
                <Box>
                  <img
                    src={getCryptoIconByName(item.name)}
                    alt={item.name}
                    style={{ height: '42px', width: '42px' }}
                  />
                </Box>
                <Stack justifyContent={'space-between'}>
                  <Box>
                    <Typography
                      variant="body1"
                      color={theme.palette.minet_text.high_emphasis}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color={theme.palette.minet_text.high_emphasis}
                    >
                      {convertToInterNationalSystem(item.amount)}
                    </Typography>
                  </Box>
                  <Box>
                    <StyledChip
                      label={
                        <Typography
                          variant="overline"
                          style={{ textTransform: 'none' }}
                        >
                          {item.duration}
                        </Typography>
                      }
                    />
                  </Box>
                </Stack>
              </CoinInfoCard>
              <StyledGraphCard>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'flex-end'}
                >
                  <Image
                    src={analyzedData.percentage < 0 ? LossArrow : ProfitArrow}
                    alt="profit-arrow"
                  />
                  <Typography
                    variant="overline"
                    color={
                      analyzedData.percentage < 0
                        ? theme.palette.minet_error[500]
                        : theme.palette.minet_success[500]
                    }
                  >
                    {analyzedData.percentage < 0 ? '' : '+'}
                    {analyzedData.percentage.toFixed(2).toString()}%
                  </Typography>
                </Stack>
                <Box height={'3.6rem'}>
                  <Graph
                    GraphPointsData={item.graphData}
                    GraphsIndividualData={[
                      {
                        dataKey: 'amount',
                        stroke:
                          analyzedData.percentage < 0
                            ? theme.palette.minet_error.main
                            : theme.palette.minet_success.main,
                        fill:
                          analyzedData.percentage < 0
                            ? theme.palette.minet_error[100]
                            : theme.palette.minet_success[100],
                      },
                    ]}
                  >
                    <YAxis
                      domain={[analyzedData.lowest]}
                      allowDataOverflow={true}
                      tickLine={false}
                      axisLine={false}
                      hide={true}
                    />
                  </Graph>
                </Box>
              </StyledGraphCard>
            </StyledStack>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default WishlistCard;
