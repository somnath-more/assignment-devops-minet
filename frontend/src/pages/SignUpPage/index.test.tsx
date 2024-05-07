import { render } from 'test-setUp';
import SignUpPage from '.';
import { SIGN_UP_ORGANISM } from 'utils/constants';
import { fireEvent } from '@testing-library/react';
import ContextProvider from 'context';

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
    if (url.includes('users?email=abc@gmail.com')) {
      return Promise.resolve({
        data: [MOCK_SIGN_UP_PAGE_DATA.INPUTS],
      });
    } else if (url.includes('users?email=test@gmail.com')) {
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
  post: jest.fn().mockImplementation((url) => {
    if (url.includes('/wallet')) {
      return Promise.resolve({
        data: [{ id: '1' }],
      });
    } else if (url.includes('/users')) {
      return Promise.resolve({
        data: [{ id: '1' }],
      });
    }
  }),
}));

describe('Sign up page', () => {
  const fillInputValues = (email) => {
    const { getByText, getByPlaceholderText, getByTestId, getAllByRole } =
      render(
        <ContextProvider>
          <SignUpPage />
        </ContextProvider>
      );
    const component = getByTestId('sign-up-organism');
    expect(component).toBeInTheDocument();
    const signUpInputFields = getAllByRole('textbox');

    fireEvent.change(signUpInputFields[0], {
      target: {
        value: MOCK_SIGN_UP_PAGE_DATA.INPUTS.name,
      },
    });
    fireEvent.change(signUpInputFields[1], {
      target: {
        value: email,
      },
    });
    fireEvent.blur(signUpInputFields[0]);
    const password = getByPlaceholderText('Create Password');
    fireEvent.change(password, {
      target: {
        value: MOCK_SIGN_UP_PAGE_DATA.INPUTS.password,
      },
    });
    fireEvent.change(password, {
      target: {
        value: MOCK_SIGN_UP_PAGE_DATA.INPUTS.password,
      },
    });
    const signUp = getByText(SIGN_UP_ORGANISM.signUpBtnName);
    expect(signUp).not.toBeDisabled();
    fireEvent.click(signUp);
  };
  test('it should render component', () => {
    fillInputValues(MOCK_SIGN_UP_PAGE_DATA.INPUTS.email);
  });
  test('it should render component with new email', () => {
    fillInputValues('test@gmail.com');
  });
  test('it should render component with network error', () => {
    fillInputValues('network@gmail.com');
  });
});
