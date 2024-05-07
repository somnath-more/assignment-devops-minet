import 'cors';
import API from './API';
import { WatchlistInterface } from 'components/model';
import { idToCryptoMap } from 'utils/constants';

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const postUserData = async (object) => {
  return await API.post('/users', object);
};

export const getUserDetailsByEmail = async (email: string) => {
  return await API.get(`/users?email=${email}`);
};

export const updatePassword = async (userId: number, password: string) => {
  return await API.patch(`/users/${userId}`, { password });
};

export const getTransactionById = async (userId: number) => {
  try {
    const response = await API.get(`transactions/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get transaction');
  }
};

export const getTransactionByIdAndCryptoId = async (
  userId: number,
  cryptoId: number
) => {
  const coinName = idToCryptoMap[cryptoId];
  try {
    const response = await API.get(
      `transactions/users/${userId}?cryptoId=${coinName}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Could not get transaction');
  }
};

export const getAllTransaction = async () => {
  try {
    const response = await API.get('/transactions');
    return response.data;
  } catch (error) {
    throw new Error('Failed to get transaction');
  }
};

export const getCryptoById = async (id) => {
  return await API.get(`/cryptocurrencys/${id}`);
};
export const getWalletAmountByUserId = async (userId) => {
  return await API.get(`/wallets?userId=${userId}`);
};
export const getCoinHoldingByUserId = async (coinId, userId) => {
  return await API.get(`/holdings/users/${userId}?cryptoId=${coinId}`);
};

export const postTransaction = async (data) => {
  return await API.post('/transactions', data);
};
export const postCryptoHoldings = async (data) => {
  return await API.post('/holdings', data);
};
export const updateCryptoHoldings = async (data, cryptoId) => {
  return await API.patch(`/holdings/${cryptoId}`, data);
};
export const getCryptoHoldingsById = async (userId, cryptoId) => {
  return await API.get(`/holdings?userId=${userId}&cryptoId=${cryptoId}`);
};
export const deleteCryptoHoldingsById = async (cryptoId) => {
  return await API.delete(`/holdings/${cryptoId}`);
};
export const getUserDetails = async (id: number) => {
  try {
    const response = await API.get(`users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get user');
  }
};

export const fetchCryptoCoinInfo = async () => {
  try {
    const response = await API.get(`/cryptos`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get crypto coin');
  }
};
export const fetchCryptoCoinInfoWithId = async (id) => {
  const coinName = idToCryptoMap[id];
  try {
    const response = await API.get(`/cryptos/${coinName}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get crypto coin');
  }
};

export const updateWalletDetails = async (id: number, data: any) => {
  return await API.patch(`/wallets/${id}`, data);
};
export const getWalletDetails = async (userId: number) => {
  const response = await API.get(`/wallets?userId=${userId}`);
  return response;
};

export const postWalletDetails = async (data: any) => {
  return await API.post(`/wallets`, data);
};

export const postTransactionDetails = async (data: any) => {
  return await API.post(`/transactions`, data);
};

export const postCryptoHolding = async (data: any) => {
  return await API.post(`/holdings`, data);
};

export const getWalletData = async (userId: number) => {
  return await API.get(`/wallets?userId=${userId}`);
};

export const getTransactionData = async (userId: number) => {
  return await API.get(`/transactions/users/${userId}`);
};

export const getByCryptoCurrency = async () => {
  return await API.get(`/cryptos`);
};

export const getByWatchListData = async (userId: number) => {
  return await API.get(`/watchlists/users/${userId}`);
};

export const getWatchlistItem = async (userId: number, cryptoId: number) => {
  return await API.get(`/watchlists/users/${userId}/cryptos/${cryptoId}`);
};

export const getCryptoHoldingsByCryptoId = async (
  userId: number,
  cryptoId: number
) => {
  return await API.get(`/watchlists?user=${userId}&crypto=${cryptoId}`);
};

export const postToWatchlist = async (payload: WatchlistInterface) => {
  return await API.post('/watchlists', payload);
};

export const deleteWatchlistItem = async (id: number) => {
  return await API.delete(`/watchlists/${id}`);
};

export const getCryptoHolding = async (userId: number, cryptoId: number) => {
  const coinName = idToCryptoMap[cryptoId];

  const response = await API.get(
    `/holdings/users/${userId}?cryptoId=${coinName}`
  );
  return response;
};

export const getCryptoHoldingByUserID = async (userId: number) => {
  const response = await API.get(`/holdings/users/${userId}`);
  return response;
};

export const updateCryptoHolding = async (id: number, amount: number) => {
  const response = await API.patch(`/holdings/${id}`, { amount: amount });
  return response.data;
};

export const loginUser = async (data: any) => {
  const response = await API.post('/users/login', data);
  return response;
};

export const saveNewUser = async (data) => {
  const response = await API.post(`/users/signup`, data);
  return response;
};
