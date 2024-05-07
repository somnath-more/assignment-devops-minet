import { GRAPH_COIN_DATA, GRAPH_TIME_ARRAY } from 'utils/constants';
import PortfolioValueCard from '.';
import { render } from 'test-setUp';

describe('portfolio card', () => {
  test('it should render component with variant portfolio', () => {
    const { getByText, getByTestId } = render(
      <PortfolioValueCard
        variant="portfolio"
        coinData={GRAPH_COIN_DATA}
        timeArray={GRAPH_TIME_ARRAY}
      />
    );
    const totalInvestment = getByText(GRAPH_COIN_DATA[0].name);
    expect(totalInvestment).toBeInTheDocument();
    const divider = getByTestId('divider');
    expect(divider).toBeInTheDocument();
    const dateBlock = getByTestId('date-block');
    expect(dateBlock).toBeInTheDocument();
  });

  test('it should render component with variant individual with negative percentage', () => {
    const { getByText, getByTestId } = render(
      <PortfolioValueCard
        variant="individual"
        coinData={GRAPH_COIN_DATA}
        timeArray={GRAPH_TIME_ARRAY}
      />
    );
    const totalInvestment = getByText(GRAPH_COIN_DATA[0].name);
    expect(totalInvestment).toBeInTheDocument();
    const negative = getByText(`${GRAPH_COIN_DATA[0].percentage}`);
    expect(negative).toBeInTheDocument();
    const individual = getByTestId('individual');
    expect(individual).toBeInTheDocument();
    const dateBlock = getByTestId('date-block');
    expect(dateBlock).toBeInTheDocument();
  });

  test('it should render component with variant individual with positive percentage', () => {
    const { getByText, getByTestId } = render(
      <PortfolioValueCard
        variant="individual"
        coinData={[GRAPH_COIN_DATA[1]]}
        timeArray={GRAPH_TIME_ARRAY}
      />
    );
    const totalInvestment = getByText(GRAPH_COIN_DATA[1].name);
    expect(totalInvestment).toBeInTheDocument();
    const positive = getByText(`+${GRAPH_COIN_DATA[1].percentage}`);
    expect(positive).toBeInTheDocument();
    const individual = getByTestId('individual');
    expect(individual).toBeInTheDocument();
    const dateBlock = getByTestId('date-block');
    expect(dateBlock).toBeInTheDocument();
  });
});
