import theme from 'theme';
import Bitcoin from '../../../public/assets/icons/Bitcoin.svg';
import Failed from '../../../public/assets/images/FailedTransaction.svg';
import Processing from '../../../public/assets/images/ProcessingTransaction.svg';
import Success from '../../../public/assets/images/SuccessTransaction.svg';
import Google from '../../../public/assets/icons/Google.png';
import Microsoft from '../../../public/assets/icons/Microsoft.png';
import FaceBook from '../../../public/assets/icons/FaceBook.png';
import Logo from '../../../public/assets/icons/Logo.svg';
import Dashboard from '../../../public/assets/icons/Dashboard.svg';
import DashboardSelect from '../../../public/assets/icons/DashboardSelect.svg';
import Portfolio from '../../../public/assets/icons/Portfolio.svg';
import Trade from '../../../public/assets/icons/Trade.svg';
import Notification from '../../../public/assets/icons/Notification.svg';
import Logout from '../../../public/assets/icons/Logout.svg';

import Binance from '../../../public/assets/icons/Binance.svg';
import DogeCoin from '../../../public/assets/icons/DogeCoin.svg';
import XRP from '../../../public/assets/icons/xrp.svg';
import Cardano from '../../../public/assets/icons/Cardano.svg';
import Polkadot from '../../../public/assets/icons/Polkadot.svg';

import Ethereum from '../../../public/assets/icons/Ethereum.svg';
import Tether from '../../../public/assets/icons/Tether.svg';
import USDCoin from '../../../public/assets/icons/USDCoin.svg';
import { TransactionDataProps } from 'components/organisms/MyWalletCard';
import { CryptoDataRecord } from 'components/model';

export const GRAPH_MOCK_POINTS_DATA = [
  {
    name: 'JUN 8',
    uv: 2000,
    pv: 2800,
    amt: 4500,
  },
  {
    name: 'JUN 15',
    uv: 2500,
    pv: 2398,
    amt: 2210,
  },
  {
    name: 'JUN 22',
    uv: 2800,
    pv: 2800,
    amt: 2290,
  },
  {
    name: 'JUN 29',
    uv: 3450,
    pv: 3408,
    amt: 2000,
  },
  {
    name: 'JUL 6',
    uv: 3400,
    pv: 3400,
    amt: 2181,
  },
  {
    name: 'JUL 13',
    uv: 3500,
    pv: 2700,
    amt: 2500,
  },
  {
    name: 'JUL 20',
    uv: 4800,
    pv: 2800,
    amt: 2100,
  },
];
export const SINGLE_GRAPH_MOCK_POINTS_DATA = [
  {
    name: 'JUNE 8',
    uv: 4000,
  },
  {
    name: 'JUNE 15',
    uv: 3000,
  },
  {
    name: 'JUNE 22',
    uv: 2000,
  },
  {
    name: 'JUNE 29',
    uv: 1890,
  },
  {
    name: 'JULY 6',
    uv: 2390,
  },
  {
    name: 'JUL 13',
    uv: 3490,
  },
];

export const INDIVIDUAL_GRAPH_DATA = [
  {
    dataKey: 'uv',
    stroke: theme.palette.minet_error.main,
    fill: theme.palette.minet_error[100],
  },
  {
    dataKey: 'pv',
    stroke: theme.palette.primary.main,
    fill: theme.palette.primary[500],
  },
];
export const DELIVERY_CARD_DATA = [
  { type: 'Instant', duration: '2-5 minutes', fee: '0.001' },
  { type: 'Faster', duration: '4 hours', fee: '0.0001' },
  { type: 'Fast', duration: '120 hours', fee: '0.00001' },
];
export const GRAPH_TIME_ARRAY = ['1H', '24H', '1W', '1M', '1Y', 'ALL'];
export const GRAPH_COIN_DATA = [
  {
    name: 'Current Value',
    percentage: -1,
    amount: 10000,
  },
  {
    name: 'BitCoin',
    percentage: +908,
    amount: 10000,
  },
];

export const GRAPH_COIN_DATA_EMPTY = [
  {
    name: 'Total Investment',
    percentage: 0,
    amount: 0.0,
  },
];
export const convertToInterNationalSystem = (rupee: number) => {
  return rupee.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'USD',
  });
};

export const BUY_SELL_Card = {
  headingBuyLabel: 'You are buying',
  headingSellLabel: 'You are selling',
  paymentBuyLabel: 'Payment method',
  paymentSellLabel: 'Paying through',
  deliveryLabel: 'Delivery fees',
  depositLabel: 'Deposit to',
  transactionFeeLabel: 'Transaction fee',
  totalLabel: 'Total',
};

export const USDCOIN = 'USD Coin';
export const CASH = 'Cash';
export const CASH_DEPOSIT = 'CASH DEPOSIT';
export const WITHDRAWAL = 'WITHDRAWAL';

export const INSTANT = 'Instant : 2-5 min';
export const TRANSACTION_SUBTITLE = 'Transaction fees : 0.001 BTC';
export const ALL_ASSESTS = 'All Assests';
export const WATCHLIST = 'Watchlist';
export type CryptoNamesAndShortcuts = {
  [key: string]: string;
};
export const CRYPTO_NAMES_AND_SHORTCUTS: CryptoNamesAndShortcuts = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  tether: 'THR',
  xrp: 'XRP',
};

export const RESET_PASSWORD_CARD = 'Reset Password';
export const RESET_PASSWORD_CARD_SUCCESS_MSG = 'Password reset successful';
export const RESET_PASSWORD_CARD_DESCRIPTION =
  'Click on button below to proceed to login';
export const RESET_PASSWORD_CARD_BUTTON = 'Login';

export const CRYPTO_CARD_MOCK_DATA = {
  variant: 'portfolio',
  title: 'Bitcoin',
  subTitle: 'BTC',
  amount: 10000,
  percentage: 20,
  image: Bitcoin,
};
export const WALLET_DATA = {
  variant: 'wallet',
  title: 'Bitcoin',
  subTitle: 'BTC',
  amount: 10000,
  image: Bitcoin,
};

export const BITCOIN_PRICE_DATA_PER_HOUR = [
  {
    name: '1hr',
    amount: 27800,
  },
  {
    name: '2hr',
    amount: 28509.7,
  },
  {
    name: '3hr',
    amount: 27161.2,
  },
  {
    name: '4hr',
    amount: 26852.8,
  },
  {
    name: '5hr',
    amount: 26863.5,
  },
  {
    name: '6hr',
    amount: 26761.1,
  },
  {
    name: '7hr',
    amount: 26876.6,
  },
  {
    name: '8hr',
    amount: 27391.0,
  },
  {
    name: '9hr',
    amount: 27581.4,
  },
  {
    name: '10hr',
    amount: 27922.7,
  },
  {
    name: '11hr',
    amount: 27961.1,
  },
  {
    name: '12hr',
    amount: 28321.9,
  },
];
export const ETHEREUM_PRICE_DATA_PER_HOUR = [
  {
    name: '1hr',
    amount: 27800,
  },
  {
    name: '2hr',
    amount: 28509.7,
  },
  {
    name: '3hr',
    amount: 27161.2,
  },
  {
    name: '4hr',
    amount: 26852.8,
  },
  {
    name: '5hr',
    amount: 26863.5,
  },
  {
    name: '6hr',
    amount: 26761.1,
  },
  {
    name: '7hr',
    amount: 26876.6,
  },
  {
    name: '8hr',
    amount: 27391.0,
  },
  {
    name: '9hr',
    amount: 27581.4,
  },
  {
    name: '10hr',
    amount: 27922.7,
  },
  {
    name: '11hr',
    amount: 27961.1,
  },
  {
    name: '12hr',
    amount: 27321.9,
  },
];
export const PORTFOLIO_GRAPH_DATA = [
  {
    key: 1,
    name: 'Bitcoin',
    amount: 300439.93,
    percentage: +100,
    duration: '24 h',
    graphData: BITCOIN_PRICE_DATA_PER_HOUR,
    Logo: Bitcoin,
  },
  {
    key: 2,
    name: 'Ethereum',
    amount: 1297.24,
    percentage: +100,
    duration: '24 h',
    graphData: ETHEREUM_PRICE_DATA_PER_HOUR,
    Logo: Ethereum,
  },
  {
    key: 3,
    name: 'Binance',
    amount: 2618.24,
    duration: '24 h',
    graphData: [
      ...BITCOIN_PRICE_DATA_PER_HOUR.slice(0, -1),
      {
        name: '12hr',
        amount: 26936.9,
      },
    ],
    Logo: Binance,
  },
  {
    key: 4,
    name: 'Tether',
    amount: 74.14,
    percentage: +100,
    duration: '24 h',
    graphData: ETHEREUM_PRICE_DATA_PER_HOUR,
    Logo: Tether,
  },
];
export const convertToInterNationalSystemWithOutDecimals = (rupee: number) => {
  return rupee.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    style: 'currency',
    currency: 'USD',
  });
};
export const IMAGE_MAP = {
  failed: Failed,
  processing: Processing,
  success: Success,
};
export const TRANSACTION_MOCK_DATA = {
  transactionStatus: 'success',
  month: 'Feb',
  date: 21,
  paymentType: 'purchased',
  coinName: 'Bitcoin',
  senderName: 'Ben',
  amount: 1000,
  quantity: 0.0001,
};

export const ForgotPasswordConstants = {
  FORGOT_PASSWORD: 'Forgot Password',
  BACK_TO: 'Back To',
  LOG_IN: 'Login',
  SEND_LINK: 'Send Reset Link',
  EMAIL: 'Email',
  EMIAL_ID: 'you@company.com',
  RESET_CODE: 'Reset Code',
  RESET_PLACEHOLDER_VALUE: '8 digits code',
  RESET_PASSWORD: 'Reset Password',
  EMAIL_REGREX: /\S+@\S+\.\S+/,
};
export const RESET_PASSWORD_HEADING = 'Enter Password';
export const RESET_PASSWORD_PLACEHOLDER = 'Enter Password';
export const RESET_PASSWORD_RE_HEADING = 'Re-Enter Password';
export const RESET_PASSWORD_DESCRIPTION =
  'A min of 8 charaters with atleasr 1 special character and number included';
export const RESET_PASSWORD_BUTTON = 'Reset Password';
export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const BITCOIN_CRYPTO_CONSTANTS = {
  BITCOIN_SRC: Bitcoin,
  BITCOIN_NAME: 'Bitcoin',
  BITCOIN_LABEL: 'BTC',
  BITCOIN_PRICE: 50000,
  BITCOIN_CHANGE: '-5.2',
  BITCOIN_MARKET_CAP: '$1.2T',
  BITCOIN_WATCHLIST: true,
};

export const ETHEREUM_CRYPTO_CONSTANTS = {
  ETHEREUM_SRC: Ethereum,
  ETHEREUM_NAME: 'Ethereum',
  ETHEREUM_LABEL: 'ETC',
  ETHEREUM_PRICE: 50000,
  ETHEREUM_CHANGE: '+5.2',
  ETHEREUM_MARKET_CAP: '$1.2T',
  ETHEREUM_WATCHLIST: false,
};

export const RECENT_TRANSACTION_ROW = {
  transactionDate: new Date('1990-01-01'),
  cryptoLabel: 'Bitcoin BTC',
  cryptoQuantity: '0.005 BTC',
  totalAmount: '$50',
  purchasedChipLabel: 'Purchased',
  soldChipLabel: 'Sold',
};
let DUMMY_PASSWORD = 'aaaa';
for (let i = 0; i < 10; i++) {
  DUMMY_PASSWORD += DUMMY_PASSWORD;
}
export const SIGN_UP_ORGANISM = {
  signUpTitle: ' Signup with Minet',
  nameHeader: 'Full Name',
  namePlaceHolder: 'Eg: John Doe',
  emailHeader: 'Email',
  emailPlaceHolder: 'you@company.com',
  passwordHeader: 'Password',
  passwordPlaceHolder: 'Create Password',
  passwordWithLengthFifty: DUMMY_PASSWORD,
  passwordErrorMessage:
    'A min of 8 charaters with atleast 1 special character and number included',
  signUpBtnName: 'Sign up',
  dividerName: 'Or',
  nameWithNumbers: 'Ben12',
  correctName: 'ben ben',
  correctPassword: 'Ben@12345',
  email: 'ben123@gmail.com',
  emailWithOutGmail: 'ben@123',
};

export const INITIAL_INPUT_VALUES = {
  fullName: '',
  email: '',
  password: '',
};
export const THIRD_PARTY_CARD = [
  { logo: Google, alt: 'Google', label: 'Google' },
  {
    logo: Microsoft,
    alt: 'Microsoft',
    label: 'Microsoft',
  },
  {
    logo: FaceBook,
    alt: 'FaceBook',
    label: 'FaceBook',
  },
];

export const MY_WALLET_CARD = {
  header: 'My wallets',
  usdCoin: 'USD Coin',
  Dollar: 'US Dollar',
  recentTransaction: 'Recent transaction',
  viewAll: 'View All ',
  usdAmount: '$ 34,000.00',
};

export const TransactionData: TransactionDataProps[] = [
  {
    id: 1,
    transactionDate: new Date('1990-06-23'),
    cryptoLabel: 'Bitcoin BTC',
    cryptoQuantity: '-0.0234510 BTC',
    totalAmount: '+$34,000.00',
    chipLabel: 'Sold',
    userId: 1,
    otherUser: 'userName',
  },
  {
    id: 2,
    transactionDate: new Date('1990-06-14'),
    cryptoLabel: 'Bitcoin BTC',
    cryptoQuantity: '+0.0010 BTC',
    totalAmount: '-$34,000.00',
    chipLabel: 'Purchased',
    userId: 1,
    otherUser: 'userName',
  },
];
export const sampleCryptoData = [
  {
    id: 1,
    cryptoSrc: Bitcoin,
    cryptoName: 'Bitcoin',
    cryptoPrice: '$3406069',
    cryptoLabel: 'BTC',
  },
  {
    id: 2,
    cryptoSrc: Ethereum,
    cryptoName: 'Ethereum',
    cryptoPrice: '$3406069',
    cryptoLabel: 'ETH',
  },
  {
    id: 3,
    cryptoSrc: Binance,
    cryptoName: 'Binance',
    cryptoPrice: '$3406069',
    cryptoLabel: 'BIN',
  },
  {
    id: 4,
    cryptoSrc: Tether,
    cryptoName: 'Tether',
    cryptoPrice: '$3406069',
    cryptoLabel: 'THR',
  },
  {
    id: 5,
    cryptoSrc: Cardano,
    cryptoName: 'Cardano',
    cryptoPrice: '$3406069',
    cryptoLabel: 'CDO',
  },
  {
    id: 6,
    cryptoSrc: XRP,
    cryptoName: 'XRP',
    cryptoPrice: '$3406069',
    cryptoLabel: 'XRP',
  },
  {
    id: 7,
    cryptoSrc: DogeCoin,
    cryptoName: 'DogeCoin',
    cryptoPrice: '$3406069',
    cryptoLabel: 'DGC',
  },
  {
    id: 8,
    cryptoSrc: Polkadot,
    cryptoName: 'Polkadot',
    cryptoPrice: '$3406069',
    cryptoLabel: 'PKT',
  },
];

export const TRADE_LIST_DATA = [
  {
    id: 1,
    coinName: 'BitCoin',
    coinSrc: Bitcoin,
    coinSymbol: 'BTC',
    coinPrice: 50000,
    coinChange: 1.06,
    coinMarketCap: '$60.1T',
    coinWatchlist: false,
  },
  {
    id: 2,
    coinName: 'Ethereum',
    coinSrc: Bitcoin,
    coinSymbol: 'ETH',
    coinPrice: 216678.1,
    coinChange: -5.49,
    coinMarketCap: '$25.4T',
    coinWatchlist: false,
  },
  {
    id: 3,
    coinName: 'Ethereum 2',
    coinSrc: Bitcoin,
    coinSymbol: 'ETH2',
    coinPrice: 74.3,
    coinChange: -5.49,
    coinMarketCap: '$25.4T',
    coinWatchlist: false,
  },
  {
    id: 4,
    coinName: 'Tether',
    coinSrc: Bitcoin,
    coinSymbol: 'THR',
    coinPrice: 74.31,
    coinChange: 1.11,
    coinMarketCap: '$4.6T',
    coinWatchlist: false,
  },
  {
    id: 5,
    coinName: 'Bitcoin Coin',
    coinSrc: Bitcoin,
    coinSymbol: 'BNB',
    coinPrice: 24942.54,
    coinChange: -5.49,
    coinMarketCap: '$1.2T',
    coinWatchlist: false,
  },
  {
    id: 6,
    coinName: 'Cardano',
    coinSrc: Bitcoin,
    coinSymbol: 'ADA',
    coinPrice: 104.52,
    coinChange: 1.11,
    coinMarketCap: '$3.4T',
    coinWatchlist: false,
  },
  {
    id: 7,
    coinName: 'XRP',
    coinSrc: Bitcoin,
    coinSymbol: 'XRP',
    coinPrice: 57.21,
    coinChange: 1.11,
    coinMarketCap: '$2.5T',
    coinWatchlist: false,
  },
  {
    id: 8,
    coinName: 'Dodge Coin',
    coinSrc: Bitcoin,
    coinSymbol: 'XRP',
    coinPrice: 17.64,
    coinChange: -5.49,
    coinMarketCap: '$4.6T',
    coinWatchlist: true,
  },
];
export const TRADE_HEADER_WATCHLIST_PLACEHOLDER = 'Search all assests';
export const TRADE_HEADER_NAME = 'Name';
export const TRADE_HEADER_PRICE = 'Price';
export const TRADE_HEADER_CHANGE = 'Change';
export const TRADE_HEADER_MARKET_CAP = 'MarketCap';
export const TRADE_HEADER_WATCH = 'Watch';

export const EMAIL_REGREX = /\S+@\S+\.\S+/;
export const PASSWORD_REGREX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const PASSWORD_ERROR =
  'A min of 8 charaters with atleast 1 special character and number included';

export const LOGIN = {
  header: 'Login to Minet',
  emailHeading: 'Email',
  emailPlaceholder: 'Enter your email',
  passwordHeading: 'Password',
  passwordPlaceholder: 'Enter your password',
  forgotPassword: 'Forgot Password',
  signIn: 'Sign In',
  OR: 'OR',
  googleLabel: 'Google',
  facebookLabel: 'Facebook',
  microsoftLabel: 'Microsoft',
  doNotHaveAccount: 'Don’t have an account?',
  signUp: 'Signup',
};

export const COIN_HISTORY_CARD = {
  TEST_ID: 'coin-history-card',
  ONE_MILLION: '1M',
  CHEVRON_ALT_TEXT: 'chevron-down',
  TABLE_ROW_TEST_ID: 'coin-transaction-row',
  TEXTFIELD_PLACEHOLDER: 'Search all assets',
};

export const CHOOSE_CRYPTO = 'Choose Crypto';
export const PURCHASE_CARD_BUY = 'Buy Crypto';
export const PURCHASE_CARD_SELL = 'Sell Crypto';
export const PURCHASE_CARD_PAYMENT_METHOD = 'Payment Method';
export const PURCHASE_TOTAL_BALANCE = 'Total Balance';
export const PURCHASE_CARD_DEFAULT = 'Default';
export const PURCHASE_CARD_AMOUNT_DETAILS = 'Amount details';
export const PURCHASE_CARD_SPEED_DELIVERY = 'Select speed delivery';
export const PURCHASE_CARD_DEPOSIT_TO = 'Deposit to';
export const PURCHASE_CARD_USD_COIN = 'USD Coin (Cash)';
export const PURCHASE_CARD_USD_COIN_CASH = 'USD coin (cash)';

export const TRADE_TABLE_DATA = [
  {
    id: 1,
    coinName: 'BitCoin',
    coinSrc: Bitcoin,
    coinSymbol: 'BTC',
    coinPrice: 328553.73,
    coinChange: 1.06,
  },
  {
    id: 2,
    coinName: 'Ethereum',
    coinSrc: Bitcoin,
    coinSymbol: 'ETH',
    coinPrice: 216678.1,
    coinChange: -5.49,
  },
  {
    id: 3,
    coinName: 'Ethereum 2',
    coinSrc: Bitcoin,
    coinSymbol: 'ETH2',
    coinPrice: 74.3,
    coinChange: -5.49,
  },
  {
    id: 4,
    coinName: 'Tether',
    coinSrc: Bitcoin,
    coinSymbol: 'USDT',
    coinPrice: 74.31,
    coinChange: 0.11,
  },
  {
    id: 5,
    coinName: 'Bitcoin Coin',
    coinSrc: Bitcoin,
    coinSymbol: 'BNB',
    coinPrice: 24942.54,
    coinChange: -3.69,
  },
  {
    id: 6,
    coinName: 'Cardano',
    coinSrc: Bitcoin,
    coinSymbol: 'ADA',
    coinPrice: 104.52,
    coinChange: -1.82,
  },
  {
    id: 7,
    coinName: 'XRP',
    coinSrc: Bitcoin,
    coinSymbol: 'XRP',
    coinPrice: 57.21,
    coinChange: 1.11,
  },
  {
    id: 8,
    coinName: 'Dodge Coin',
    coinSrc: Bitcoin,
    coinSymbol: 'XRP',
    coinPrice: 17.64,
    coinChange: -6.96,
  },
  {
    id: 9,
    coinName: 'USD Coin',
    coinSrc: Bitcoin,
    coinSymbol: 'XRP',
    coinPrice: 74.26,
    coinChange: 1.01,
  },
];

export const PORTFOLIO_DATA = 'My portfolio';
export const PORTFOLIO_TOTAL_BALANCE = 'Total Balance';

export const LOGIN_TEMPLATE = {
  IMAGE_ALT_MESSAGE: 'login-banner',
  COMPONENT_TEST_ID: 'login-template',
};

export const SIDE_NAV_BAR = [
  {
    id: 1,
    label: 'Logo',
    altIcon: Logo,
    icon: Logo,
  },
  {
    id: 2,
    label: 'Dashboard',
    altIcon: DashboardSelect,
    icon: Dashboard,
  },
  {
    id: 3,
    label: 'Portfolio',
    altIcon: Portfolio,
    icon: Portfolio,
  },
  {
    id: 4,
    label: 'Trade',
    altIcon: Trade,
    icon: Trade,
  },
  {
    id: 5,
    label: 'Notification',
    altIcon: Notification,
    icon: Notification,
  },
  {
    id: 6,
    label: 'Logout',
    altIcon: Logout,
    icon: Logout,
  },
];

export const DASHBOARD_TEMPLATE_TEST_ID = 'main_container';
export const FOOTER_LABEL = 'Dashboard';
export const FOOTER_CAREER = 'Careers';
export const FOOTER_PRIVACY = 'Legals & Privacy';
export const FOOTER_COPYRIGHT = '@ 2021 Minet';
export const FOOTER_LANGUAGE = 'English';
export const FOOTER_HELP = 'NEED HELP';

export const PriceCorrelations = [
  {
    image: Bitcoin,
    title: 'Bitcoin',
    subTitle: 'Moves tightly together',
    amount: 3285553.73,
    percentage: 100,
  },
  {
    image: Ethereum,
    title: 'Ethereum',
    subTitle: 'Moves tightly together',
    amount: 230966.85,
    percentage: 86,
  },
  {
    image: XRP,
    title: 'XRP',
    subTitle: 'Moves tightly together',
    amount: 60.2,
    percentage: 10,
  },
  {
    image: Tether,
    title: 'Tether',
    subTitle: 'Moves tightly together',
    amount: 74.28,
    percentage: 2,
  },
  {
    image: Ethereum,
    title: 'Ethereum 2',
    subTitle: 'Moves tightly together',
    amount: 60.2,
    percentage: 10,
  },
  {
    image: Bitcoin,
    title: 'Dodge Coin',
    subTitle: 'Moves tightly together',
    amount: 74.28,
    percentage: 2,
  },
];

export const Coin_Overview_Data = [
  {
    name: 'Current Value',
    percentage: '8.2%',
    amount: '$3,285,553.73',
  },
];

export const Coin_Overview_Heading = 'About Bitcoin';
export const Coin_Overview_Sub_Heading =
  'The world’s first cryptocurrency, Bitcoin is stored and exchanged securely on the internet through a digital ledger known as a blockchain. Bitcoins are divisible into smaller units known as satoshis each satoshi is worth 0.00000001 bitcoin.';

enum TransactionStatus {
  Failed = 'failed',
  Processing = 'processing',
  Success = 'success',
}

enum PaymentType {
  Purchased = 'purchased',
  Sold = 'sold',
}

export const TRANSACTIONS_HISTORY = [
  {
    transactionStatus: TransactionStatus.Success,
    month: 'Feb',
    date: 28,
    paymentType: PaymentType.Purchased,
    coinName: 'Bitcoin',
    senderName: 'Badgley',
    amount: 900,
    quantity: 0.001,
  },
  {
    transactionStatus: TransactionStatus.Success,
    month: 'Feb',
    date: 25,
    paymentType: PaymentType.Purchased,
    coinName: 'Bitcoin',
    senderName: 'Jane Cooper',
    amount: 1800,
    quantity: 0.023,
  },
  {
    transactionStatus: TransactionStatus.Success,
    month: 'Feb',
    date: 20,
    paymentType: PaymentType.Purchased,
    coinName: 'Bitcoin',
    senderName: 'Leslie Alexander',
    amount: 1200,
    quantity: 0.003,
  },
  {
    transactionStatus: TransactionStatus.Success,
    month: 'Feb',
    date: 18,
    paymentType: PaymentType.Purchased,
    coinName: 'Bitcoin',
    senderName: 'Guy Hawkins',
    amount: 1000,
    quantity: 0.015,
  },
  {
    transactionStatus: TransactionStatus.Success,
    month: 'Feb',
    date: 15,
    paymentType: PaymentType.Purchased,
    coinName: 'Bitcoin',
    senderName: 'Jenny Wilson',
    amount: 3200,
    quantity: 0.065,
  },
  {
    transactionStatus: TransactionStatus.Success,
    month: 'Feb',
    date: 13,
    paymentType: PaymentType.Purchased,
    coinName: 'Bitcoin',
    senderName: 'Jacob Jones',
    amount: 9000,
    quantity: 0.09,
  },
  {
    transactionStatus: TransactionStatus.Success,
    month: 'Feb',
    date: 10,
    paymentType: PaymentType.Purchased,
    coinName: 'Bitcoin',
    senderName: 'Theresa Webb',
    amount: 1800,
    quantity: 0.002,
  },
];
export const CONTEXT_USER_DETAILS = {
  id: null,
  userName: null,
  balance: null,
  token: null,
  authenticated: false,
};
export const MOCK_CRYPTO_DATA = {
  id: 1,
  cryptoName: 'Bitcoin',
  cryptoSrc:
    'https://s3-alpha-sig.figma.com/img/3081/886d/bb95f08981a385cf742cbde18bac74e1?Expires=1699228800&Signature=EFt22tLefBzk6yfsMz11hwh5WynE8fQ-ogQPbXXnmlhHb6ckH6zbpJ8akhjL1MBd7JjnWIKbUMY9cjJNCR5NHPoMGYEPBj7kg-WzlyndTKxZtTIs74i0Ws-Rh3F0jpVSyYENwi8-MhxRDu1EFJ47-wE~1QXDAAz1nMOXG2Hjy--CSn1Bu0g7LLurkTXYGkaLWJ3QwW2J1XgiVLMvywp8~Qt1zwLiy-5b~tG5vhY5Fk0DXMfycOJz5d4HCGnV2XM~0yZW4Df4CF-FRLEe6msXBkjWzCEz63Mr3tReIxyClJeIqmxYKROyG9Vfij2WkwVXqtRv27DokPbA8IS~LIYR-A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  totalSupply: 18800000,
  cryptoPrice: 3285553.73,
  cryptoChange: '+1.06%',
  cryptoMarketCap: 60100000000000,
  cryptoVolume: '$2.9T',
  cryptoLabel: 'BTC',
};
export const MOCK_HOLDINGS_DATA = {
  id: 1,
  quantity: 0.023451,
  purchasePrice: 74.31,
  purchaseDate: '2023-7-23',
  sellPrice: 714.31,
  brokerName: 'test',
  userId: 1,
  cryptoId: 1,
};

export const LOGIN_ERROR = 'Invalid username or password';

export const USER_CREDENTIALS = {
  email: 'test@gmail.com',
  password: 'Abcd@123',
};

// export const BASE_URL = 'https://bc128be.spcluster.tk/api/v1';
export const BASE_URL = 'http://localhost:9191/api/v1';
export const COIN_GECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export const TRADE = 'Trade';
export const NO_ASSETS_FOUND = 'No Assets found';

export const CRYPTO_NAME_LIST = {
  bitcoin: 'Bitcoin',
  ethereum: 'Ethereum',
  cardano: 'Cardano',
  tether: 'Tether',
  xrp: 'XRP',
  litecoin: 'Litecoin',
  polkadot: 'Polkadot',
  chainlink: 'Chainlink',
  stellar: 'Stellar',
  binancecoin: 'Binance',
  'usd-coin': 'USD Coin',
  ripple: 'XRP',
  'ethereum-classic': 'Ethereum Classic',
};

export const CRYPTO_SYMBOL_LIST = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  cardano: 'ADA',
  tether: 'USDT',
  xrp: 'XRP',
  litecoin: 'LITECOIN',
  polkadot: 'DOT',
  chainlink: 'LINK',
  stellar: 'XLM',
  binancecoin: 'BNB',
  'usd-coin': 'XRP',
  ripple: 'XRP',
  'ethereum-classic': 'UCDC',
};

export const CRYPTO_ID_LIST = {
  binancecoin: 1,
  bitcoin: 2,
  cardano: 3,
  dogecoin: 4,
  ethereum: 5,
  litecoin: 6,
  ripple: 7,
  tether: 8,
  'usd-coin': 9,
  xrp: 10,
  polkadot: 11,
  chainlink: 12,
  stellar: 13,
  'ethereum-classic': 14,
};

export const CRYPTO_KEY_LIST = {
  1: 'binancecoin',
  2: 'bitcoin',
  3: 'cardano',
  4: 'dogecoin',
  5: 'ethereum',
  6: 'litecoin',
  7: 'ripple',
  8: 'tether',
  9: 'usd-coin',
  10: 'xrp',
  11: 'polkadot',
  12: 'chainlink',
  13: 'stellar',
  14: 'ethereum-classic',
};

export const CRYPTO_ICONS = {
  bitcoin: Bitcoin,
  ethereum: Ethereum,
  binancecoin: Binance,
  cardano: Cardano,
  tether: Tether,
  'usd-coin': USDCoin,
  ripple: XRP,
  dogecoin: DogeCoin,
};

export const CRYPTO_ICONS_BY_NAME = {
  Bitcoin: Bitcoin,
  Ethereum: Ethereum,
  Binance: Binance,
  Cardano: Cardano,
  Tether: Tether,
  'USD Coin': USDCoin,
  XRP: XRP,
};

export const MOCK_CRYPTO_DATA_TEST: CryptoDataRecord | undefined = {
  bitcoin: {
    usd: 60000,
    usd_market_cap: 1100000000,
    usd_24h_vol: 5000000,
    usd_24h_change: 5,
  },
  ethereum: {
    usd: 3500,
    usd_market_cap: 40000,
    usd_24h_vol: 2000000,
    usd_24h_change: 4,
  },
  tether: {
    usd: 5000,
    usd_market_cap: 11000000000000,
    usd_24h_vol: 5000000,
    usd_24h_change: 5,
  },
  binancecoin: {
    usd: 3500,
    usd_market_cap: 400000000,
    usd_24h_vol: 2000000,
    usd_24h_change: 4,
  },
};

export const MOCK_WATCHLIST_DATA_TEST = {
  watchlist: [
    {
      id: 1,
      user: 2,
      crypto: 1,
    },
    {
      user: 2,
      crypto: 2,
      id: 2,
    },
  ],
};
export const CRYPTO_INFO = {
  sellButton: 'SELL CRYPTO',
  goToUsdCoinButton: 'GO TO USD COIN',
  sellCompletedText: 'Sell is completed,',
  balanceCheckText: 'please check your balance in your Rupee coin',
};
export const TRANSACTIONS_NULL_DATA = {
  quantity: 0,
  price: 0,
  userId: null,
  cryptoId: null,
  id: null,
};
export const CRYPTO_DUMMY_DATA = {
  cryptoName: 'Bitcoin',
  cryptoSrc: '',
  totalSupply: 0,
  cryptoPrice: 0,
  cryptoChange: '0',
  cryptoMarketCap: '$60.1T',
  cryptoVolume: '$2.9T',
  cryptoLabel: 'BTC',
  coinValue: 0,
  symbol: 'btc',
};
export type ICryptoDummyData = {
  cryptoName: string;
  cryptoSrc: string;
  totalSupply: number;
  cryptoPrice: number;
  cryptoChange: string;
  cryptoMarketCap: string;
  cryptoVolume: string;
  cryptoLabel: string;
};

export const RUPEE_COIN = 'Rupee Coin';
export const SELL = 'Sell';
export const SELL_MAX = 'Sell max';
export const USD_VALUE = '0.0234510';

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const WALLET = 'Wallet';
export const OVERVIEW = 'Overview';
export const CURRENT_VALUE = 'Current Value';
export interface TransactionDetail {
  amount: number;
  quantity: number;
  paymentType: string;
  transactionStatus: string;
  coinName: string;
  month: string;
  date: number;
  senderName: string;
}

export interface ApiResponse {
  amount: number;
  quantity: number;
  transactionType: string;
  transactionStatus: string;
  coinName: string;
  date: string;
  receiverName: string;
}
export const TRANSACTION_TYPE = 'PURCHASED';
export const BITCOIN_VALUE = '1BTC = $3,406,069.54';
export const ETHEREUM_VALUE = '1ETH = $216678.1';
export const PAYMENT_METHOD = 'Visa credit ...8845';
export const BITCOIN_DELIVERY = '0.001 BTC';
export const ETHEREUM_DELIVERY = '0.005 ETH';
export const BITCOIN_WALLET = 'Bitcoin wallet';
export const ETHEREUM_WALLET = 'Etherium wallet';
export const BITCOIN_FEE = '$1,000.00';
export const ETHEREUM_FEE = '$30.00';
export const BUY_NOW = 'Buy Now';
export const ERROR = 'Failed to fetch user details:';

export const PURCHASE_COMPLETE_1 = 'Purchase is completed, please check your';
export const PURCHASE_COMPLETE_2 =
  'please check your balance in your crypto wallet';
export const BUY_CRYPTO_BUTTON = 'BUY CRYPTO';
export const USD_COIN_BUTTON = 'GO TO USD COIN';
export const DASHBOARD = 'Dashboard';
export const CHECKOUT = 'Checkout';

const handleGraph = () => {};

export const CHIP_MAP = [
  {
    id: 1,
    label: 'Bitcoin',
    onClick: handleGraph,
    style: {
      borderRadius: '4px',
      border: '2px solid ',
      borderColor: theme.palette.minet_warning.main,
      background: theme.palette.minet_warning.main,
      ...theme.typography.body2,
      color: theme.palette.minet_text.high_emphasis,
    },
  },
  {
    id: 2,
    label: 'XRP',
    onClick: handleGraph,
    style: {
      borderRadius: '4px',
      border: '2px solid ',
      borderColor: theme.palette.minet_grey.main,
      background: theme.palette.minet_grey.light,
      ...theme.typography.body2,
      color: theme.palette.minet_text.high_emphasis,
    },
  },
  {
    id: 3,
    label: 'Polkadot',
    onClick: handleGraph,
    style: {
      borderRadius: '4px',
      borderColor: theme.palette.minet_grey.main,
      background: '#ff9999',
      ...theme.typography.body2,
      color: theme.palette.minet_text.high_emphasis,
    },
  },
  {
    id: 4,
    label: 'Ethereum',
    onClick: handleGraph,
    style: {
      borderRadius: '4px',
      borderColor: theme.palette.minet_grey.light,
      background: ' #a3c2c2',
      ...theme.typography.body2,
      color: theme.palette.minet_text.high_emphasis,
    },
  },
  {
    id: 5,
    label: 'Tether',
    onClick: handleGraph,
    style: {
      borderRadius: '4px',
      borderColor: theme.palette.primary.light,
      background: '#d1e0e0',
      ...theme.typography.body2,
      color: theme.palette.minet_text.high_emphasis,
    },
  },
  {
    id: 6,
    label: 'Etherum 2',
    onClick: handleGraph,
    style: {
      borderRadius: '4px',
      borderColor: theme.palette.primary.main,
      background: '#b3cccc',
      ...theme.typography.body2,
      color: theme.palette.minet_text.high_emphasis,
    },
  },
  {
    id: 7,
    label: 'Dodge Coin',
    onClick: handleGraph,
    style: {
      borderRadius: '4px',
      borderColor: theme.palette.primary.main,
      background: '#ffe6ff',
      ...theme.typography.body2,
      color: theme.palette.minet_text.high_emphasis,
    },
  },
];

export const DASHBOARD_TITLE = 'DashBoard';
export const DASHBOARD_WATCHLIST = 'Watchlist';
export const DASHBOARD_DISCOVER_ASSETS = 'Discover assests';
export const DASHBOARD_VIEW_WATCHLIST = 'View Watchlist';
export const DASHBOARD_PORTFOLIO_VALUE = 'My portfolio value';
export const DASHBOARD_TOTAL_INVESTMENT = 'Total Investment';
export const DASHBOARD_CURRENCY =
  'Click on currency name below to display it on the graph';
export const DASHBOARD_INFO = '10 coins (3 active)';

export const idToCryptoMap = {
  1: 'binancecoin',
  2: 'bitcoin',
  3: 'cardano',
  4: 'dogecoin',
  5: 'ethereum',
  6: 'litecoin',
  7: 'ripple',
  8: 'tether',
  9: 'usd-coin',
  10: 'xrp',
  11: 'polkadot',
  12: 'chainlink',
  13: 'stellar',
  14: 'ethereum-classic',
};
