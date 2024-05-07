import { render } from 'test-setUp';
import LoginTemplate from '.';
import { LOGIN_TEMPLATE } from 'utils/constants';

describe('login template', () => {
  test('it should render image ', () => {
    const { getByTestId, getByAltText } = render(
      <LoginTemplate variant="login">
        <h1> children</h1>
      </LoginTemplate>
    );
    const component = getByTestId(LOGIN_TEMPLATE.COMPONENT_TEST_ID);
    expect(component).toBeInTheDocument();
    const image = getByAltText(LOGIN_TEMPLATE.IMAGE_ALT_MESSAGE);
    expect(image).toBeInTheDocument();
  });
  test('it should render children', () => {
    const { getByTestId, getByText } = render(
      <LoginTemplate variant="sign-up">
        <h1> children</h1>
      </LoginTemplate>
    );
    const component = getByTestId(LOGIN_TEMPLATE.COMPONENT_TEST_ID);
    expect(component).toBeInTheDocument();
    const children = getByText('children');
    expect(children).toBeInTheDocument();
  });
});
