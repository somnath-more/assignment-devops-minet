export interface CryptoData {
  usd: number;
  usd_market_cap: number;
  usd_24h_vol: number;
  usd_24h_change: number;
}

export interface CryptoDataRecord {
  [key: string]: CryptoData;
}

export interface WatchlistInterface {
  id?: number;
  userId?: number;
  cryptoId?: number;
}

export interface CryptoItem {
  id: string;
  name: string;
  coinSrc?: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  coinWatchlist?: boolean;
  total_volume: number;
  circulating_supply: number;
  image?: string;
}
