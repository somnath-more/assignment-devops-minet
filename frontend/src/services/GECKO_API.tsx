import axios from 'axios';
import { COIN_GECKO_BASE_URL } from 'utils/constants';

export default axios.create({
  baseURL: COIN_GECKO_BASE_URL,
  headers: {
    'content-Type': 'application/json',
  },
});
