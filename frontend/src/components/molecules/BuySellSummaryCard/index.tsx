import { Card, Stack, styled, Divider, Box } from '@mui/material';
import Typography from 'components/atoms/Typography';
import { BUY_SELL_Card } from 'utils/constants';
import theme from '../../../theme';
import CustomButton from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import wallet from '../../../../public/assets/icons/wallet.svg';
import bankcard from '../../../../public/assets/icons/card.svg';
import delivery from '../../../../public/assets/icons/DeliveryIcon.svg';
import dollor from '../../../../public/assets/icons/dollor.svg';
import cyptocoin from '../../../../public/assets/icons/CryptoCoin.svg';

const StyleCard = styled(Card)({
  width: '100%',
  height: '700px',
  border: `1px solid ${theme.palette.minet_grey[100]}`,
  borderRadius: '4px',
});

const StyledHeadingStack = styled(Stack)({
  width: '100%',
  height: '122px',
  padding: '24px, 24px, 8px, 24px',
  borderRadius: '4px, 4px, 0px, 0px',
  gap: '12px',
  textAlign: 'center',
  justifyContent: 'center',
});
const StyleStackTimeLine = styled(Stack)({
  width: '100%',
  padding: '24px 0px 0px 24px',
  gap: '8px',
});
const StyledStackTotal = styled(Stack)({
  width: '100%',
  height: '100%',
  padding: '24px',
  gap: '24px',
});

const StyledDivider = styled(Divider)({
  width: '70%',
  border: '1px dashed',
  angle: '-0.41 deg',
  margin: '10px 0',
  color: theme.palette.minet_grey[300],
});

interface TimelineCardProps {
  src: string;
  headLabel: string;
  subHeadLabel: string;
}
const StyledInBox = styled(Box)({
  display: 'flex',
  gap: '2px',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
});
export const TimelineCard = ({
  src,
  headLabel,
  subHeadLabel,
}: TimelineCardProps) => {
  return (
    <Box
      gap={'10px'}
      sx={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}
    >
      <Icon src={src} alt={src} width="42px" height="42px"></Icon>
      <StyledInBox>
        <Typography
          variant="caption2"
          color={theme.palette.minet_text.medium_emphasis}
        >
          {headLabel}
        </Typography>
        <Typography
          variant="body1"
          color={theme.palette.minet_text.high_emphasis}
        >
          {subHeadLabel}
        </Typography>
      </StyledInBox>
    </Box>
  );
};

export interface BuySellCardProps {
  isBuying: boolean;
  coinQty: string;
  coinValue: string;
  paymentMethod: string;
  deliveryFees: string;
  depositTo: string;
  priceOfQty: string;
  transactionFee: string;
  total: string;
  buttonLabel: string;
  buttonDisable?: boolean;
  onClick?: () => void;
}

const BuySellCard = ({
  isBuying,
  coinQty,
  coinValue,
  paymentMethod,
  deliveryFees,
  depositTo,
  priceOfQty,
  transactionFee,
  total,
  buttonLabel,
  buttonDisable,
  onClick,
}: BuySellCardProps) => {
  return (
    <StyleCard>
      <StyledHeadingStack>
        <Typography
          variant="caption1"
          color={theme.palette.minet_text.medium_emphasis}
        >
          {isBuying
            ? BUY_SELL_Card.headingBuyLabel
            : BUY_SELL_Card.headingSellLabel}
        </Typography>
        <Typography variant="h6" color={theme.palette.minet_text.high_emphasis}>
          {coinQty}
        </Typography>
        <Typography
          variant="caption1"
          color={theme.palette.minet_text.medium_emphasis}
        >
          {coinValue}
        </Typography>
      </StyledHeadingStack>
      <Divider />
      <StyleStackTimeLine>
        <TimelineCard
          src={isBuying ? bankcard : cyptocoin}
          headLabel={
            isBuying
              ? BUY_SELL_Card.paymentBuyLabel
              : BUY_SELL_Card.paymentSellLabel
          }
          subHeadLabel={paymentMethod}
        />
        <Divider
          sx={{
            borderLeft: '1px dashed grey',
            height: '25px',
            margin: '0 20px',
            borderRight: 'none',
          }}
          orientation="vertical"
        />
        <TimelineCard
          src={delivery}
          headLabel={BUY_SELL_Card.deliveryLabel}
          subHeadLabel={deliveryFees}
        />
        <Divider
          sx={{
            borderLeft: '1px dashed grey',
            height: '25px',
            margin: '0 20px',
            borderRight: 'none',
          }}
          orientation="vertical"
        />
        <TimelineCard
          src={isBuying ? wallet : dollor}
          headLabel={BUY_SELL_Card.depositLabel}
          subHeadLabel={depositTo}
        />
      </StyleStackTimeLine>
      <Divider sx={{ padding: '10px' }} />
      <StyledStackTotal
        sx={{
          '& .MuiButton-root:hover': {
            backgroundColor: isBuying
              ? theme.palette.primary[500]
              : theme.palette.minet_warning[300],
          },
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="overline"
            color={theme.palette.minet_text.high_emphasis}
            sx={{
              flex: '0 0 auto',
            }}
          >
            {coinQty}
          </Typography>
          <StyledDivider
            orientation="horizontal"
            sx={{
              flex: '1',
              margin: `0  ${theme.spacing(1)}`,
            }}
          />
          <Typography
            variant="overline"
            color={theme.palette.minet_text.high_emphasis}
            sx={{
              flex: '0 0 auto',
            }}
          >
            {priceOfQty}
          </Typography>
        </Stack>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="overline"
            color={theme.palette.minet_text.high_emphasis}
            sx={{ textTransform: 'none', flex: '0 0 20%' }}
          >
            {BUY_SELL_Card.transactionFeeLabel}
          </Typography>
          <StyledDivider
            orientation="horizontal"
            sx={{
              flex: '1',
              margin: `0  ${theme.spacing(1)}`,
            }}
          />
          <Typography
            variant="overline"
            color={theme.palette.minet_text.high_emphasis}
            sx={{
              flex: '0 0 auto',
            }}
          >
            {transactionFee}
          </Typography>
        </Stack>
        <Stack
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            color={theme.palette.minet_text.high_emphasis}
            sx={{
              flex: '0 0 auto',
            }}
          >
            {BUY_SELL_Card.totalLabel}
          </Typography>
          <StyledDivider
            orientation="horizontal"
            sx={{
              flex: '1',
              margin: `0  ${theme.spacing(1)}`,
            }}
          />
          <Typography
            variant="body1"
            color={theme.palette.minet_text.high_emphasis}
            sx={{
              flex: '0 0 auto',
            }}
          >
            {total}
          </Typography>
        </Stack>
        <CustomButton
          variant="contained"
          sx={{
            width: '100%',
            height: '42px',
            padding: '0px 16px',
            alignContent: 'center',
            justifyContent: 'center',
            gap: '10px',
            borderRadius: '4px',
            backgroundColor: isBuying
              ? theme.palette.primary[500]
              : theme.palette.minet_warning[300],
          }}
          onClick={onClick}
          disabled={buttonDisable}
        >
          {buttonLabel}
        </CustomButton>
      </StyledStackTotal>
    </StyleCard>
  );
};

export default BuySellCard;
