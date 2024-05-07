import { render } from 'test-setUp';
import SignUp from '.';
import { fireEvent } from '@testing-library/react';
import { SIGN_UP_ORGANISM } from 'utils/constants';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('@auth0/auth0-react');
describe('sign up ', () => {
  const mockFn = jest.fn();
  const user = {
    email: 'null@gmail.com',
    email_verified: true,
    sub: 'google-oauth2|12345678901234',
    name: 'auth0',
  };
  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user,
      loginWithRedirect: jest.fn(),
    });
  });
  test('it should render component', () => {
    const { getByText, getByPlaceholderText, getByTestId, getAllByRole } =
      render(<SignUp onClick={jest.fn(() => Promise.resolve('Success'))} />);
    const component = getByTestId('sign-up-organism');
    expect(component).toBeInTheDocument();
    const signUpInputFields = getAllByRole('textbox');

    fireEvent.change(signUpInputFields[0], {
      target: {
        value: SIGN_UP_ORGANISM.correctName,
      },
    });
    fireEvent.change(signUpInputFields[1], {
      target: {
        value: SIGN_UP_ORGANISM.email,
      },
    });
    fireEvent.blur(signUpInputFields[0]);
    const password = getByPlaceholderText('Create Password');
    fireEvent.change(password, {
      target: {
        value: SIGN_UP_ORGANISM.correctPassword,
      },
    });
    fireEvent.change(password, {
      target: {
        value: SIGN_UP_ORGANISM.correctPassword,
      },
    });
    const eye = getByTestId('eye');
    fireEvent.click(eye);
    fireEvent.click(eye);
    const signUp = getByText(SIGN_UP_ORGANISM.signUpBtnName);
    expect(signUp).not.toBeDisabled();
    fireEvent.click(signUp);
  });
  test('it should render component with catch block', () => {
    const { getByText, getByPlaceholderText, getByTestId, getAllByRole } =
      render(
        <SignUp onClick={jest.fn(() => Promise.reject('Network error'))} />
      );
    const component = getByTestId('sign-up-organism');
    expect(component).toBeInTheDocument();
    const signUpInputFields = getAllByRole('textbox');

    fireEvent.change(signUpInputFields[0], {
      target: {
        value: SIGN_UP_ORGANISM.correctName,
      },
    });
    fireEvent.change(signUpInputFields[1], {
      target: {
        value: SIGN_UP_ORGANISM.email,
      },
    });
    fireEvent.blur(signUpInputFields[0]);
    const password = getByPlaceholderText('Create Password');
    fireEvent.change(password, {
      target: {
        value: SIGN_UP_ORGANISM.correctPassword,
      },
    });
    fireEvent.change(password, {
      target: {
        value: SIGN_UP_ORGANISM.correctPassword,
      },
    });
    const eye = getByTestId('eye');
    fireEvent.click(eye);
    fireEvent.click(eye);
    const signUp = getByText(SIGN_UP_ORGANISM.signUpBtnName);
    expect(signUp).not.toBeDisabled();
    fireEvent.click(signUp);
  });

  test('it should render component with  errors', () => {
    const { getByPlaceholderText, getByTestId, getAllByRole, getByLabelText } =
      render(<SignUp onClick={mockFn} />);
    const component = getByTestId('sign-up-organism');
    expect(component).toBeInTheDocument();
    const signUpInputFields = getAllByRole('textbox');

    fireEvent.change(signUpInputFields[0], {
      target: {
        value: SIGN_UP_ORGANISM.passwordWithLengthFifty,
      },
    });
    fireEvent.change(signUpInputFields[0], {
      target: {
        value: SIGN_UP_ORGANISM.nameWithNumbers,
      },
    });

    const password = getByPlaceholderText(SIGN_UP_ORGANISM.passwordPlaceHolder);
    fireEvent.change(password, {
      target: {
        value: SIGN_UP_ORGANISM.nameWithNumbers,
      },
    });
    fireEvent.change(signUpInputFields[1], {
      target: {
        value: SIGN_UP_ORGANISM.emailWithOutGmail,
      },
    });
    fireEvent.blur(signUpInputFields[0]);
    fireEvent.change(signUpInputFields[1], {
      target: {
        value: SIGN_UP_ORGANISM.email,
      },
    });
    fireEvent.change(password, {
      target: {
        value: SIGN_UP_ORGANISM.correctPassword,
      },
    });
    const eye = getByTestId('eye');
    fireEvent.click(eye);
    fireEvent.click(eye);
  });

  test('it should render component with  errors', () => {
    const { getByPlaceholderText, getByTestId, getAllByRole } = render(
      <SignUp onClick={mockFn} />
    );
    const component = getByTestId('sign-up-organism');
    expect(component).toBeInTheDocument();
    const signUpInputFields = getAllByRole('textbox');

    const password = getByPlaceholderText(SIGN_UP_ORGANISM.passwordPlaceHolder);
    fireEvent.change(password, {
      target: {
        value: SIGN_UP_ORGANISM.nameWithNumbers,
      },
    });
    fireEvent.change(signUpInputFields[0], {
      target: {
        value: SIGN_UP_ORGANISM.nameWithNumbers,
      },
    });
    fireEvent.change(password, {
      target: {
        value: SIGN_UP_ORGANISM.correctPassword,
      },
    });
    fireEvent.blur(signUpInputFields[0]);
  });

  test('it should render third party apps', () => {
    const { getByText } = render(<SignUp onClick={mockFn} />);
    const google = getByText('Google');
    fireEvent.click(google);
    const login = getByText('Login');
    fireEvent.click(login);
  });
});
