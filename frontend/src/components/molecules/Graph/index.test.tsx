import { render } from '../../../test-setUp';
import Graph from '.';
import {
  SINGLE_GRAPH_MOCK_POINTS_DATA,
  INDIVIDUAL_GRAPH_DATA,
} from 'utils/constants';
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

describe('Graph', () => {
  it('includes the correct data-testid attribute', () => {
    const { getByRole } = render(
      <div
        style={{
          width: '100px',
          height: '100px',
        }}
      >
        <Graph
          GraphPointsData={SINGLE_GRAPH_MOCK_POINTS_DATA}
          GraphsIndividualData={INDIVIDUAL_GRAPH_DATA}
        />
      </div>
    );
    const graph = getByRole('region');
    expect(graph).toBeInTheDocument();
  });
});
