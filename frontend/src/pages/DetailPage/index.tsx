import { Box, Tab } from '@mui/material';
import Typography from 'components/atoms/Typography';
import TradeHeader from 'components/molecules/TradeHeader';
import CoinHistoryCard from 'components/organisms/CoinHistoryCard';
import CoinOverview from 'components/organisms/CoinOverview';
import Header from 'components/organisms/Header';
import { DashBoard } from 'components/templates/DashboardTemplate/index.stories';
import React, { useContext, useEffect, useState } from 'react';
import {
  GRAPH_TIME_ARRAY,
  SINGLE_GRAPH_MOCK_POINTS_DATA,
  INDIVIDUAL_GRAPH_DATA,
  months,
  WALLET,
  OVERVIEW,
  convertToInterNationalSystem,
} from 'utils/constants';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import theme from 'theme';
import {
  fetchCryptoCoinInfoWithId,
  getTransactionByIdAndCryptoId,
} from 'services/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { ITransactionTableRow } from 'components/molecules/TransactionTableRow';
import { MinetStore } from '../../context';
import { getCryptoIconByName } from 'utils/constants/helperFunction';

export interface CoinDetailInterface {
  cryptoSrc: string;
  crytoName?: string;
  cryptoLabel?: string;
  totalSupply?: string;
  cryptoPrice: number;
  cryptoChange: number;
  cryptoMarketCap: string;
  cryptoVolume: string;
}

const DetailPage = () => {
  const [value, setValue] = React.useState('1');
  const [coin, setCoins] = useState<CoinDetailInterface[]>([]);
  const [transactionDetails, setTransactionDetails] = useState<
    ITransactionTableRow[]
  >([]);
  const [amount, setAmount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const { setNetworkError } = useContext(MinetStore);
  const { userDetails } = useContext(MinetStore);
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const userId = userDetails.id;
  const location = useLocation();
  const cryptoCoin = location.state;
  const navigate = useNavigate();
  const cryptoCoinId = cryptoCoin.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCryptoCoinInfoWithId(cryptoCoinId);
        setCoins(response);
      } catch (error) {
        setNetworkError(true);
      }
    };
    fetchData();
  }, [cryptoCoinId]);

  useEffect(() => {
    let tempAmount = 0;
    let tempQuantity = 0;

    const fetchTransactionDetails = async () => {
      try {
        const response = await getTransactionByIdAndCryptoId(
          userId,
          cryptoCoinId
        );
        const tempTransaction = response.map((item: any) => {
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

          tempAmount = tempAmount + transactionData.amount;
          tempQuantity = tempQuantity + transactionData.quantity;

          return transactionData;
        });
        setAmount(tempAmount);
        setQuantity(tempQuantity);
        setTransactionDetails(tempTransaction);
      } catch (error) {
        setNetworkError(true);
      }
    };
    fetchTransactionDetails();
  }, [cryptoCoinId]);

  return (
    <div>
      <DashBoard
        header={
          <Header
            title={'TRADE'}
            isButtonRequired={true}
            onClickSellButton={() => {
              navigate('/sell', {
                state: {
                  id: cryptoCoinId,
                  name: 'Bitcoin',
                  label: 'BTC',
                },
              });
            }}
            onClickBuyButton={() => {
              navigate('/buying', {
                state: {
                  id: cryptoCoinId,
                  name: 'Bitcoin',
                  label: 'BTC',
                },
              });
            }}
          />
        }
      >
        <Box width={'99%'} padding={'1.5rem 0 2rem 1.5rem'}>
          <Box width={'100%'} marginRight={'10.5rem'} bgcolor={'white'}>
            <TradeHeader
              iconSrc={getCryptoIconByName(coin.name)}
              coinName={coin.name}
              coinSymbol={coin.symbol?.toUpperCase() || ''}
              coinValue={coin.price_change_percentage_24h}
              marketCapValue={coin.market_cap}
              volumeValue={coin.total_volume}
              circulatingSupplyValue={coin.circulating_supply}
            />
          </Box>

          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: theme.palette.minet_grey[100],
              }}
              marginTop={'1.5rem'}
            >
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label={
                    <Typography
                      variant="subtitle2"
                      sx={{ textTransform: 'none' }}
                    >
                      {OVERVIEW}
                    </Typography>
                  }
                  value={'1'}
                ></Tab>
                <Tab
                  label={
                    <Typography
                      variant="subtitle2"
                      sx={{ textTransform: 'none' }}
                    >
                      {WALLET}
                    </Typography>
                  }
                  value={'2'}
                ></Tab>
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: '0px' }}>
              <CoinOverview
                portfolioProps={{
                  variant: 'individual',
                  coinData: [
                    {
                      name: 'Current Value',
                      percentage: `${coin.price_change_percentage_24h + '%'}`,
                      amount: coin.current_price ? coin.current_price : 0,
                    },
                    {
                      name: 'BitCoin',
                      percentage: +908,
                      amount: 10000,
                    },
                  ],
                  timeArray: GRAPH_TIME_ARRAY,
                }}
                graphProps={{
                  GraphPointsData: SINGLE_GRAPH_MOCK_POINTS_DATA,
                  GraphsIndividualData: INDIVIDUAL_GRAPH_DATA,
                }}
              />
            </TabPanel>
            <TabPanel
              value="2"
              sx={{ padding: '0px', height: 'auto', overflow: 'hidden' }}
            >
              <CoinHistoryCard
                value={quantity.toFixed(7)}
                amount={`${convertToInterNationalSystem(
                  parseFloat(amount.toFixed(2))
                )}`}
                transactionHistoryData={transactionDetails}
                status={true}
              ></CoinHistoryCard>
            </TabPanel>
          </TabContext>
        </Box>
      </DashBoard>
    </div>
  );
};

export default DetailPage;
