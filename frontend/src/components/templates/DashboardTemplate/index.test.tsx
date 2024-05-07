import { fireEvent, screen } from '@testing-library/react';
import Dashboard from '.';
import Header from 'components/organisms/Header';
import { render } from './../../../test-setUp';

describe('dashbpard template', () => {
  test('it should render header , main content and footer ', () => {
    const { getByTestId } = render(
      <Dashboard
        header={<Header title={'DashBoard'} isButtonRequired={true} />}
      />
    );
    const component = getByTestId('main_container');
    expect(component).toBeInTheDocument();
  });

  test('it should render the navbar', () => {
    render(
      <Dashboard
        header={<Header title={'DashBoard'} isButtonRequired={true} />}
      />
    );
    const component = screen.getByTestId('icon-Dashboard');
    fireEvent.click(component);
  });
});
