import GECKO_API from './GECKO_API';
import { CryptoDataRecord } from 'components/model';

const ids =
  'bitcoin,ethereum,litecoin,ripple,cardano,tether,binancecoin,usd-coin';
const vsCurrencies = 'usd';
const includeMarketCap = true;
const include24hrVol = true;
const include24hrChange = true;

const cryptoMarketUrl = `/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}&include_market_cap=${includeMarketCap}&include_24hr_vol=${include24hrVol}&include_24hr_change=${include24hrChange}`;

export const getCryptoMarketDetails = async (): Promise<
  CryptoDataRecord | undefined
> => {
  try {
    const response = await GECKO_API.get(cryptoMarketUrl);

    if (response.status === 200) {
      const data: CryptoDataRecord = response.data;
      return data;
    } else {
      throw new Error('Request failed with status: ' + response.status);
    }
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
};
