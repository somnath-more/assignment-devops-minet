import React, { useEffect, useState } from 'react';
import { Box, Card, Paper, Stack, Typography, styled } from '@mui/material';
import Icon from 'components/atoms/Icon';
import CustomTextField from 'components/atoms/TextFields';
import theme from 'theme';
import Search from '../../../../public/assets/icons/SearchIcon.svg';
import Filter from '../../../../public/assets/icons/Filter.svg';
import ChevronDown from '../../../../public/assets/icons/chevron-down.svg';
import TransactionTableRow, {
  ITransactionTableRow,
} from 'components/molecules/TransactionTableRow';
import {
  COIN_HISTORY_CARD,
  convertToInterNationalSystem,
} from 'utils/constants';

const StyledBox = styled(Box)({
  padding: '1.5rem 1.5rem 1.5rem 1.5rem;',
  borderBottom: `1px solid ${theme.palette.minet_grey[100]}`,
  backgroundColor: theme.palette.background.default,
});

const StyledTextfield = styled(CustomTextField)({
  '&.MuiTextField-root .MuiOutlinedInput-root': {
    height: '40px',
  },
});

const StyledDropDown = styled(Stack)({
  borderRadius: '4px',
  border: `1px solid ${theme.palette.minet_grey[100]}`,
  backgroundColor: theme.palette.background.default,
});

const MainBox = styled(Box)({
  height: 'auto',
  marginTop: '1.5rem',
});

const Table = styled(Stack)({
  height: '93%',
  '.search-word': {
    color: 'red',
  },
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.minet_grey[300],
    borderRadius: '5px',
  },
  overflow: 'scroll',
});
const Divider = styled(Box)({
  color: 'red',
  height: '28px',
  width: '1px',
  backgroundColor: theme.palette.minet_grey[100],
});

const AmountBox = styled(Box)({
  alignItems: 'flex-start',
  display: 'flex',
  padding: '1rem 1.5rem',
  backgroundColor: theme.palette.minet_grey[50]
});

const CustomEndIcon = () => (
  <Stack direction="row" alignItems={'center'}>
    <Icon src={Search} />
    <Divider />
    <Icon src={Filter} />
  </Stack>
);

export interface ICoinHistoryCard {
  value: number;
  amount: number;
  transactionHistoryData: ITransactionTableRow[];
  status: boolean;
}

const CoinHistoryCard = ({
  value,
  amount,
  status,
  transactionHistoryData,
}: ICoinHistoryCard) => {
  const [transactionData, setTransactionData] = useState<
    ITransactionTableRow[]
  >(transactionHistoryData);
  const [inputValues, setInputValues] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTransactionData(transactionHistoryData);
    setInputValues(value);
    const searchReg = new RegExp(value, 'i');
    const data = transactionHistoryData.filter((item: ITransactionTableRow) =>
      searchReg.test(item.coinName)
    );
    setTransactionData(data);
  };

  useEffect(() => {
    setTransactionData(transactionHistoryData);
  }, [transactionHistoryData]);

  return (
    <MainBox data-testid={COIN_HISTORY_CARD.TEST_ID}>
      {status && (
        <AmountBox>
          <Typography
            variant="subtitle1"
            color={theme.palette.minet_text.high_emphasis}
          >
            {`Total balance: ${value + ' '}BTC (${convertToInterNationalSystem(
              amount
            )})`}
          </Typography>
        </AmountBox>
      )}

      <Stack height={'91%'} marginTop={'1rem'}>
        <Stack
          direction={'row'}
          gap="12px"
          justifyContent={'flex-end'}
          marginBottom={'.75rem'}
        >
          <StyledTextfield
            placeholder={COIN_HISTORY_CARD.TEXTFIELD_PLACEHOLDER}
            onChange={onChange}
            value={inputValues}
            InputProps={{
              endAdornment: <CustomEndIcon />,
            }}
            sx={{
              backgroundColor: theme.palette.background.default,
            }}
          />
          <StyledDropDown
            direction={'row'}
            alignItems={'center'}
            padding={'4px'}
            width={'77px'}
            justifyContent={'space-between'}
          >
            <Typography
              variant="caption1"
              color={theme.palette.minet_text.high_emphasis}
              marginLeft={'8px'}
            >
              {COIN_HISTORY_CARD.ONE_MILLION}
            </Typography>
            <Icon src={ChevronDown} alt={COIN_HISTORY_CARD.CHEVRON_ALT_TEXT} />
          </StyledDropDown>
        </Stack>
        <Table overflow={'scroll'}>
          {transactionData.length > 0 ? (
            transactionData.map((item) => (
              <Box
                key={item.transactionDate}
                sx={{
                  backgroundColor: theme.palette.background.default,
                }}
              >
                <StyledBox
                  key={item.transactionDate}
                  data-testid={COIN_HISTORY_CARD.TABLE_ROW_TEST_ID}
                >
                  <TransactionTableRow {...item} />
                </StyledBox>
              </Box>
            ))
          ) : (
            <Stack alignItems={'center'}>
              <Typography variant="body1" color={theme.palette.minet_grey[500]}>
                {`Coin name with word: `}
                <span className="search-word">{inputValues}</span>
                {` is not found`}
              </Typography>
            </Stack>
          )}
        </Table>
      </Stack>
    </MainBox>
  );
};

export default CoinHistoryCard;
