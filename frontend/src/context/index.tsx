import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CONTEXT_USER_DETAILS } from '../utils/constants';
interface ContextProps {
  children: React.ReactNode;
}

export const MinetStore = createContext();
const ContextProvider = ({ children }: ContextProps) => {
  interface UserDetails {
    id: string | null;
    userName: string | null;
    balance: number | null;
    token: string | null;
    authenticated: boolean;
  }

  type SetUserDetails = Dispatch<SetStateAction<UserDetails>>;

  type SetPurchaseDetails = Dispatch<SetStateAction<string>>;

  const [userDetails, setUserDetails] = useState<UserDetails>(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    return storedUserDetails
      ? JSON.parse(storedUserDetails)
      : CONTEXT_USER_DETAILS;
  });

  const [networkError, setNetworkError] = useState<boolean>(false);

  useEffect(() => {
    if (userDetails) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    } else {
      localStorage.removeItem('user');
    }
  }, [userDetails]);

  const values = useMemo(
    () => ({
      userDetails,
      setUserDetails,
      networkError,
      setNetworkError,
    }),
    [networkError, userDetails]
  );

  return <MinetStore.Provider value={values}>{children}</MinetStore.Provider>;
};

export default ContextProvider;
