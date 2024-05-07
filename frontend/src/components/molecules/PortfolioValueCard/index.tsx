import { Box, Stack, Tab, Tabs, styled } from '@mui/material';
import Image from 'components/atoms/Image';
import Typography from 'components/atoms/Typography';
import React from 'react';
import theme from 'theme';
import ProfitArrow from '../../../../public/assets/images/ProfitArrow.svg';
import LossArrow from '../../../../public/assets/images/LossArrow.svg';
import { convertToInterNationalSystem } from 'utils/constants';

const Divider = styled(Box)({
  width: '1px',
  height: '54px',
  backgroundColor: theme.palette.minet_grey[100],
});

const LeftBox = styled(Stack)({
  flexDirection: 'row',
  gap: '24px',
  alignItems: 'center',
});

const MainStack = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const DateBlocks = styled(Box)({
  width: '304px',
});

const DateTabs = styled(Stack)({
  padding: '10px 16px',
  border: `1px solid ${theme.palette.minet_grey[100]}`,
  borderRadius: '4px',
  '& .MuiTabs-root': {
    minHeight: '0px',
    alignItems: 'center',
  },
  justifyContent: 'center',
});

const StyledCoin = styled(Stack)({
  flexDirection: 'row',
  gap: '24px',
});

const StyledTabs = styled(Tabs)({
  '& .MuiButtonBase-root': {
    width: '32px',
    minWidth: '0px',
    height: '32px',
    minHeight: '0',
  },
  '& .MuiTabs-flexContainer': {
    gap: '16px',
  },
  '.tab-1M': {
    backgroundColor: theme.palette.primary[300],
    borderRadius: '50%',
  },
});

type CoinType = {
  name: string;
  percentage: number;
  amount: number;
};

export interface IPortfolioProps {
  variant: 'individual' | 'portfolio';
  timeArray: string[];
  coinData: CoinType[];
}

const PercentageComponent = ({ percentage }: { percentage: number }) => {
  return (
    <Stack direction={'row'} alignItems={'center'}>
      <Image
        src={percentage < 0 ? LossArrow : ProfitArrow}
        alt="profit-arrow"
      />
      <Typography
        variant="overline"
        color={
          percentage < 0
            ? theme.palette.minet_error[500]
            : theme.palette.minet_success[500]
        }
      >
        {percentage < 0 ? '' : '+'}
        {percentage.toString()}
      </Typography>
    </Stack>
  );
};

const PortfolioValueCard = ({
  variant,
  timeArray,
  coinData,
}: IPortfolioProps) => {
  return (
    <MainStack data-testid="portfolio-card">
      {variant === 'portfolio' ? (
        <LeftBox>
          {coinData.map((eachCoin, index) => {
            return (
              <StyledCoin key={eachCoin.name}>
                {index > 0 && <Divider data-testid="divider" />}
                <Stack gap={'8px'}>
                  <Stack direction={'row'} alignItems={'center'}>
                    <Typography
                      variant="caption1"
                      color={theme.palette.minet_text.medium_emphasis}
                    >
                      {eachCoin.name}
                    </Typography>
                    <PercentageComponent percentage={eachCoin.percentage} />
                  </Stack>
                  <Box>
                    <Typography
                      variant="h6"
                      color={theme.palette.minet_text.high_emphasis}
                    >
                      {convertToInterNationalSystem(eachCoin.amount)}
                    </Typography>
                  </Box>
                </Stack>
              </StyledCoin>
            );
          })}
        </LeftBox>
      ) : (
        <Stack gap="8px" data-testid="individual">
          <Box>
            <Typography
              variant="caption1"
              color={theme.palette.minet_text.medium_emphasis}
            >
              {coinData[0].name}
            </Typography>
            <Typography
              variant="h6"
              color={theme.palette.minet_text.high_emphasis}
            >
              {convertToInterNationalSystem(coinData[0].amount)}
            </Typography>
          </Box>
          <PercentageComponent percentage={coinData[0].percentage} />
        </Stack>
      )}
      <DateBlocks data-testid="date-block">
        <DateTabs>
          <StyledTabs
            aria-label="disabled tabs example"
            indicatorColor="primary"
            color="primary"
            value={variant === 'portfolio' ? 3 : 100}
          >
            {timeArray.map((item) => {
              return (
                <Tab
                  label={item}
                  disabled={item !== '1M'}
                  key={item}
                  className={`tab-${variant === 'portfolio' ? 'item' : item}`}
                  disableRipple
                />
              );
            })}
          </StyledTabs>
        </DateTabs>
      </DateBlocks>
    </MainStack>
  );
};

export default PortfolioValueCard;
