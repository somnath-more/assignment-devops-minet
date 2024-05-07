import { render } from 'test-setUp';
import AuthenticationPage from '.';
import ContextProvider from '../../context';
import { useAuth0 } from '@auth0/auth0-react';

const MOCK_SIGN_UP_PAGE_DATA = {
  INPUTS: {
    id: 2,
    email: 'abc@gmail.com',
    password: 'abcA123@',
    name: 'abc',
  },
};
jest.mock('../../services/API', () => ({
  get: jest.fn().mockImplementation((url) => {
    if (url.includes('users?email=auth0abc@gmail.com')) {
      return Promise.resolve({
        data: [MOCK_SIGN_UP_PAGE_DATA.INPUTS],
      });
    } else if (url.includes('users?email=auth0test@gmail.com')) {
      return Promise.resolve({
        data: [],
      });
    } else {
      return Promise.reject({
        response: {
          status: 404,
        },
      });
    }
  }),
  post: jest.fn().mockResolvedValue({ id: 2 }),
}));

jest.mock('@auth0/auth0-react');
describe('authentication page', () => {
  test('it should render component', () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { name: 'aaa', email: MOCK_SIGN_UP_PAGE_DATA.INPUTS.email },
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
    render(
      <ContextProvider>
        <AuthenticationPage />
      </ContextProvider>
    );
    // fillInputValues(MOCK_SIGN_UP_PAGE_DATA.INPUTS.email);
  });
  test('it should render component with is authenticated as false', () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: { name: 'aaa', email: MOCK_SIGN_UP_PAGE_DATA.INPUTS.email },
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
    render(
      <ContextProvider>
        <AuthenticationPage />
      </ContextProvider>
    );
  });
  test('it should render component with new email', () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { name: 'aaa', email: 'test@gmail.com' },
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
    render(
      <ContextProvider>
        <AuthenticationPage />
      </ContextProvider>
    );
  });
  test('it should render component with network error', () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { name: 'aaa', email: 'test1@gmail.com' },
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
    render(
      <ContextProvider>
        <AuthenticationPage />
      </ContextProvider>
    );
  });
});
