import React, { createContext, useState } from 'react';
interface ContextProps {
  children: React.ReactNode;
}
export const MinetStore = createContext('');
const ContextProvider = ({ children }: ContextProps) => {
  const [userDetails, setUserDetails] = useState({
    id: null,
    userName: null,
    balance: null,
    token: null,
  });
  const [purchaseDetails, setPurchaseDetails] = useState('');
  return (
    <MinetStore.Provider
      value={[userDetails, setUserDetails, purchaseDetails, setPurchaseDetails]}
    >
      {children}
    </MinetStore.Provider>
  );
};

export default ContextProvider;
