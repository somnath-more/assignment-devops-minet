import CryptoTableRow from 'components/molecules/CryptoTableRow';
import React, { useContext, useEffect, useState } from 'react';
import {
  TRADE_HEADER_CHANGE,
  TRADE_HEADER_MARKET_CAP,
  TRADE_HEADER_NAME,
  TRADE_HEADER_PRICE,
  TRADE_HEADER_WATCH,
  TRADE_HEADER_WATCHLIST_PLACEHOLDER,
  NO_ASSETS_FOUND,
} from 'utils/constants';
import styled from '@emotion/styled';
import Typography from 'components/atoms/Typography';
import Tabs from 'components/molecules/Tabs';
import { CircularProgress, InputAdornment } from '@mui/material';
import Search from '../../../../public/assets/icons/SearchIcon.svg';
import Icon from 'components/atoms/Icon';
import ArrowDown from '../../../../public/assets/icons/chevron-down.svg';
import CustomTextField from 'components/atoms/TextFields';
import ArrowUpDown from '../../../../public/assets/icons/arrowupdown.svg';
import theme from 'theme';
import { WatchlistInterface, CryptoItem } from 'components/model';
import {
  deleteWatchlistItem,
  getByCryptoCurrency,
  getWatchlistItem,
  postToWatchlist,
} from 'services';
import { MinetStore } from '../../../context';
import {
  getCryptoIconById,
  getCryptoIdByKey,
  getCryptoKeyById,
} from 'utils/constants/helperFunction';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '../../../../public/assets/icons/cancelicon.svg';

interface TradeItem {
  id: number;
  coinName: string;
  coinSrc: string;
  coinSymbol: string;
  coinPrice: number;
  coinChange: number;
  coinMarketCap: string;
  coinWatchlist: boolean;
}
const StyledMainContainer = styled.div({
  backgroundColor: theme.palette.primary[100],
});

const StyledInnerContainer = styled.div({
  padding: '2vh 1vw',
});

const StyledHeader = styled.div({
  display: 'flex',
  marginTop: '15px',
});

const StyledTypography = styled(Typography)({
  display: 'flex',
});

const StyledBorder = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
  marginBottom: '2rem',
});

const StyledInnerBorder = styled.div({
  display: 'flex',
  gap: '12px',
  width: '50%',
  paddingTop: '12px',
});

const StyledTextField = styled(CustomTextField)({
  height: '40px',
  width: '100%',
  '& .MuiInputBase-input': {
    ...theme.typography.body2,
    color: theme.palette.minet_text.high_emphasis,
    background: theme.palette.background.paper,
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    paddingRight: '6px',
    fieldset: {
      borderRadius: '4px',
      border: `1px solid #E4E4E5`,
    },
    ':hover fieldset': {
      border: `1px solid #E4E4E5`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid #0052FF`,
    },
  },
});

const StyledTextFields = styled(CustomTextField)({
  height: '40px',
  width: '100%',
  '& .MuiInputBase-input': {
    ...theme.typography.body1,
    color: theme.palette.minet_grey[500],
    background: theme.palette.background.paper,
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
    fieldset: {
      borderRadius: '4px',
      border: `1px solid #E4E4E5`,
    },
    ':hover fieldset': {
      border: `1px solid #E4E4E5`,
    },
  },
});

const StyledEmptyMessage = styled(Typography)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60vh',
  fontSize: '1.5rem',
});

const StyledCricularProgress = styled(CircularProgress)({
  position: 'relative',
  top: '30vh',
  left: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const TradeHeaderWatchList = () => {
  const { userDetails } = useContext(MinetStore);
  const [selectedTab, setSelectedTab] = useState<string>('all_assests');
  const [tradeData, setTradeData] = useState<TradeItem[]>([]);
  const [tradeTable, setTradeTable] = useState<TradeItem[]>([]);
  const [searchData, setSearchData] = useState<string>('');
  const [cryptoDetails, setCryptoDetails] = useState<CryptoItem[] | undefined>(
    []
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const cryptoDataBe = await getByCryptoCurrency();
        setCryptoDetails(cryptoDataBe.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (cryptoDetails == null || cryptoDetails == undefined) {
        return;
      }
      setLoading(true);
      const transformedCryptoData = transformCyptoData(cryptoDetails);

      const sortedData = [...(await transformedCryptoData)].sort((a, b) => {
        const aValue = parseFloat(a.coinMarketCap.replace(/[^0-9.-]+/g, ''));
        const bValue = parseFloat(b.coinMarketCap.replace(/[^0-9.-]+/g, ''));
        return bValue - aValue;
      });

      setTradeData(sortedData);
      setTradeTable(sortedData);
      setLoading(false);
    };

    fetchData();
  }, [cryptoDetails]);

  const formatMarketCap = (marketCap: number): string => {
    if (marketCap >= 1e12) {
      return (marketCap / 1e12).toFixed(1) + 'T';
    } else if (marketCap >= 1e9) {
      return (marketCap / 1e9).toFixed(1) + 'B';
    } else if (marketCap >= 1e6) {
      return (marketCap / 1e6).toFixed(1) + 'M';
    } else {
      return marketCap.toFixed(2);
    }
  };

  const transformCyptoData = async (
    inputData: CryptoItem[]
  ): Promise<TradeItem[]> => {
    const tradeItems: TradeItem[] = [];

    if (inputData == null || inputData == undefined) {
      return tradeItems;
    }
    let id = 100;

    for (const item of inputData) {
      const tradeItem: TradeItem = {
        id: getCryptoIdByKey(item.id, id),
        coinName: item.name,
        coinSrc: getCryptoIconById(item.id),
        coinSymbol: item.symbol,
        coinPrice: parseFloat(item?.current_price.toFixed(2)),
        coinChange: parseFloat(item?.price_change_percentage_24h.toFixed(2)),
        coinMarketCap: formatMarketCap(item.market_cap),
        coinWatchlist: await setWatchlist(getCryptoIdByKey(item.id, id)),
      };
      tradeItems.push(tradeItem);
      id++;
    }

    return tradeItems;
  };

  const setWatchlist = async (cryptoId: number) => {
    const watchlistItem = await getWatchlistItem(
      userDetails.id,
      getCryptoKeyById(cryptoId)
    );
    if (
      watchlistItem != null &&
      watchlistItem.status === 200 &&
      watchlistItem.data
    ) {
      return true;
    }
    return false;
  };

  const handleTabChange = (newValue: string) => {
    setSelectedTab(newValue);
  };

  const handleWatchlistRepo = async (
    isWatchlisted: boolean,
    cryptoId: number
  ) => {
    const watchlistItem = await getWatchlistItem(
      userDetails.id,
      getCryptoKeyById(cryptoId)
    );

    if (isWatchlisted && !watchlistItem.data) {
      const paylod: WatchlistInterface = {
        userId: userDetails.id,
        cryptoId: getCryptoKeyById(cryptoId),
      };
      await postToWatchlist(paylod);
    } else if (!isWatchlisted && watchlistItem.data) {
      await deleteWatchlistItem(watchlistItem.data.id);
    }
  };

  const handleWatchList = (coinId: number) => {
    const updatedTradeData = [...tradeData];

    const coin = updatedTradeData.find((coin) => coin.id === coinId);

    if (coin) {
      coin.coinWatchlist = !coin.coinWatchlist;
      handleWatchlistRepo(coin.coinWatchlist, coinId);
    }

    setTradeData(updatedTradeData);
  };

  const filteredData = tradeData.filter((coin) => {
    return (
      coin.coinName.toLowerCase().includes(searchData.toLowerCase()) &&
      coin.coinWatchlist
    );
  });

  const filteredSearchData = tradeTable.filter((coin) =>
    coin.coinName.toLowerCase().includes(searchData.toLowerCase())
  );

  const handleRowClick = (id: number, name: string, label: string) => {
    navigate('/trade', { state: { id: id, name: name, label: label } });
  };

  const handleClearSearch = () => {
    setSearchData('');
  };

  const renderInputAdornmentIcon = () => (
    <InputAdornment position="end">
      {searchData ? (
        <Icon
          src={CancelIcon}
          onClick={handleClearSearch}
          style={{ cursor: 'pointer' }}
        />
      ) : (
        <Icon src={Search} />
      )}
    </InputAdornment>
  );

  return (
    <StyledMainContainer>
      <StyledInnerContainer>
        <StyledBorder>
          <Tabs selectedTab={selectedTab} onTabChange={handleTabChange} />
          <StyledInnerBorder>
            <StyledTextField
              placeholder={TRADE_HEADER_WATCHLIST_PLACEHOLDER}
              size="small"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              InputProps={{
                endAdornment: renderInputAdornmentIcon(),
              }}
              style={{ flex: 2 }}
            />
            <StyledTextFields
              type="text"
              size="small"
              value="24h"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon src={ArrowDown} />
                  </InputAdornment>
                ),
              }}
              style={{ flex: 1 }}
            />
            <StyledTextFields
              value="All assests"
              type="text"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon src={ArrowDown} />
                  </InputAdornment>
                ),
              }}
              style={{ flex: 1.5 }}
            />
          </StyledInnerBorder>
        </StyledBorder>
        <StyledHeader>
          <StyledTypography
            variant="caption1"
            style={{ width: '20.75vw', marginLeft: '20px' }}
          >
            {TRADE_HEADER_NAME}
          </StyledTypography>
          <StyledTypography
            variant="caption1"
            style={{ width: '20.75vw', justifyContent: 'flex-start' }}
          >
            {TRADE_HEADER_PRICE}
          </StyledTypography>
          <StyledTypography
            variant="caption1"
            style={{ width: '20.75vw', justifyContent: 'flex-start' }}
          >
            {TRADE_HEADER_CHANGE}
          </StyledTypography>
          <StyledTypography
            variant="caption1"
            style={{ width: '20.75vw', justifyContent: 'flex-start' }}
          >
            {TRADE_HEADER_MARKET_CAP}
            <Icon src={ArrowUpDown} style={{ paddingLeft: '5px' }} />
          </StyledTypography>
          <StyledTypography
            variant="caption1"
            style={{ width: '9.75vw', justifyContent: 'flex-start' }}
          >
            {TRADE_HEADER_WATCH}
          </StyledTypography>
        </StyledHeader>
        {loading ? (
          <StyledCricularProgress />
        ) : (
          selectedTab === 'all_assests' &&
          (filteredSearchData.length === 0 ? (
            <StyledEmptyMessage>{NO_ASSETS_FOUND}</StyledEmptyMessage>
          ) : (
            filteredSearchData.map((coin) => (
              <CryptoTableRow
                key={coin.id}
                cryptoSrc={coin.coinSrc}
                cryptoName={coin.coinName}
                cryptoLabel={coin.coinSymbol}
                cryptoPrice={coin.coinPrice}
                cryptoChange={coin.coinChange}
                cryptMarketCap={coin.coinMarketCap}
                cryptoWatchList={coin.coinWatchlist}
                onIconClick={() => handleWatchList(coin.id)}
                onRowClick={() =>
                  handleRowClick(coin.id, coin.coinName, coin.coinSymbol)
                }
              />
            ))
          ))
        )}
        {selectedTab === 'watchlist' &&
          (filteredData.length === 0 ? (
            <StyledEmptyMessage>{NO_ASSETS_FOUND}</StyledEmptyMessage>
          ) : (
            filteredData.map((coin) => (
              <CryptoTableRow
                key={coin.id}
                cryptoSrc={coin.coinSrc}
                cryptoName={coin.coinName}
                cryptoLabel={coin.coinSymbol}
                cryptoPrice={coin.coinPrice}
                cryptoChange={coin.coinChange}
                cryptMarketCap={coin.coinMarketCap}
                cryptoWatchList={coin.coinWatchlist}
                onIconClick={() => handleWatchList(coin.id)}
                onRowClick={() =>
                  handleRowClick(coin.id, coin.coinName, coin.coinSymbol)
                }
              />
            ))
          ))}
      </StyledInnerContainer>
    </StyledMainContainer>
  );
};

export default TradeHeaderWatchList;
