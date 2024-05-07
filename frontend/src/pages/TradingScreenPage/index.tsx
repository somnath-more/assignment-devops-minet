import Header from 'components/organisms/Header';
import TradeHeaderWatchList from 'components/organisms/TradeHeaderWatchList';
import Dashboard from 'components/templates/DashboardTemplate';
import { TRADE } from 'utils/constants';

const TradingScreen = () => {
  return (
    <Dashboard header={<Header title={TRADE} isButtonRequired={true} />}>
      <TradeHeaderWatchList />
    </Dashboard>
  );
};

export default TradingScreen;
