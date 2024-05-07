import Header from 'components/organisms/Header';
import WishlistCard from 'components/organisms/WishlistCard';
import { DashBoard } from 'components/templates/DashboardTemplate/index.stories';
import React, { useContext, useEffect, useState } from 'react';
import {
  CRYPTO_NAMES_AND_SHORTCUTS,
  DASHBOARD_DISCOVER_ASSETS,
  DASHBOARD_PORTFOLIO_VALUE,
  DASHBOARD_TITLE,
  DASHBOARD_VIEW_WATCHLIST,
  DASHBOARD_WATCHLIST,
  PORTFOLIO_GRAPH_DATA,
} from 'utils/constants';
import styled from '@emotion/styled';
import Typography from 'components/atoms/Typography';
import PortfolioCard from 'components/organisms/PortfolioCard';
import MyWalletCard from 'components/organisms/MyWalletCard';
import Icon from 'components/atoms/Icon';
import StraightLine from '../../../public/assets/icons/straightline.svg';
import ArrowLeft from '../../../public/assets/icons/arrowleft.svg';
import Edit from '../../../public/assets/icons/edit.svg';
import IconSelect from '../../../public/assets/icons/IconSelect.svg';
import LeftBody from './LeftContainer';
import { getByWatchListData } from 'services';
import { MinetStore } from '../../context';
import Button from 'components/atoms/Button';
import { useNavigate } from 'react-router-dom';
import theme from 'theme';
import { Box } from '@mui/material';
import { getCryptoIdByKey } from 'utils/constants/helperFunction';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
});

const RightContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 3,
  padding: '24px',
});

const LeftContainer = styled.div({
  borderLeft: `1px solid ${theme.palette.minet_grey[100]}`,
  backgroundColor: theme.palette.background.default,
  flex: 1,
});

const WalletCard = styled.div({
  display: 'flex',
});

const StylePortfolioCard = styled.div({
  marginTop: '20px',
});

const StyledTypography = styled(Typography)({
  padding: '24px 0px 24px 0px',
});

const TopHeader = styled.div({
  display: 'flex',
  paddingBottom: '5px',
});

const TopLeftHeader = styled.div({
  display: 'flex',
  width: '50%',
  alignItems: 'center',
  gap: '12px',
});

const TopRightHeader = styled.div({
  display: 'flex',
  width: '50%',
  alignItems: 'center',
  gap: '12px',
  justifyContent: 'flex-end',
});
const StyledButton = styled(Button)({
  textTransform: 'none',
});

const DashBoardPage = () => {
  const navigate = useNavigate();
  const { userDetails } = useContext(MinetStore);
  const handleWatchLIst = (id, name) => {
    navigate('/trade', {
      state: {
        id: getCryptoIdByKey(id),
        name: name,
        label: CRYPTO_NAMES_AND_SHORTCUTS[name.toLowerCase()],
      },
    });
  };
  const userId = userDetails.id;
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    getByWatchListData(userId).then((response) => {
      const watchlistedItems = response.data;
      setWatchlist(watchlistedItems);
    });
  }, [userId]);
  const viewAllAssertsHandler = () => {
    navigate('/watch-list');
  };

  return (
    <div>
      <DashBoard
        header={<Header title={DASHBOARD_TITLE} isButtonRequired={true} />}
      >
        <Container>
          <RightContainer>
            <TopHeader>
              <TopLeftHeader>
                <Typography variant="subtitle1">
                  {DASHBOARD_WATCHLIST}
                </Typography>
                <Icon src={StraightLine} />
                <StyledButton variant="text" onClick={viewAllAssertsHandler}>
                  <Typography
                    variant="caption1"
                    style={{ cursor: 'pointer !important' }}
                  >
                    {DASHBOARD_DISCOVER_ASSETS}
                  </Typography>
                  <Icon src={ArrowLeft} />
                </StyledButton>
              </TopLeftHeader>
              <TopRightHeader>
                <StyledButton variant="text" onClick={viewAllAssertsHandler}>
                  <Typography variant="caption1">
                    {DASHBOARD_VIEW_WATCHLIST}
                  </Typography>
                </StyledButton>
                <Icon src={Edit} />
                <Icon src={StraightLine} />
                <Icon src={IconSelect} />
              </TopRightHeader>
            </TopHeader>
            <Box>
              <WishlistCard
                portfolioGraphData={PORTFOLIO_GRAPH_DATA.slice(
                  0,
                  watchlist.length
                )}
                watchListHandler={handleWatchLIst}
              />
            </Box>
            <StyledTypography variant="subtitle1">
              {DASHBOARD_PORTFOLIO_VALUE}
            </StyledTypography>
            <LeftBody />
          </RightContainer>
          <LeftContainer>
            <StylePortfolioCard>
              <PortfolioCard />
            </StylePortfolioCard>
            <WalletCard>
              <MyWalletCard usdCoin="$34000.00" height="313px" width="398px" />
            </WalletCard>
          </LeftContainer>
        </Container>
      </DashBoard>
    </div>
  );
};

export default DashBoardPage;
