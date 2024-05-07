import React from 'react';
import { Box, Stack, Typography, styled } from '@mui/material';
import Image from 'components/atoms/Image';
import theme from 'theme';
import { convertToInterNationalSystem } from 'utils/constants';

const CryptoNameCard = styled(Stack)({
  flexDirection: 'row',
  gap: theme.spacing(1),
});

const CorrelationInfoStack = styled(Stack)({
  '.correlation': {
    color: theme.palette.minet_text.medium_emphasis,
  },
});

export interface ICryptoCard {
  variant: 'portfolio' | 'correlation' | 'wallet';
  title: string;
  subTitle: string;
  amount: number;
  percentage?: number;
  image: string;
}
const CryptoCard = ({
  variant,
  title,
  subTitle,
  amount,
  percentage = 0,
  image,
}: ICryptoCard) => {
  const sign = percentage < 0 ? '' : '+';
  const color =
    percentage < 0
      ? theme.palette.minet_error[500]
      : theme.palette.minet_success[500];

  return (
    <Box
      padding={theme.spacing(1)}
      paddingLeft={theme.spacing(3)}
      paddingRight={theme.spacing(1.5)}
      data-testid="crypto-card"
    >
      <Stack direction={'row'} justifyContent={'space-between'}>
        <CryptoNameCard>
          <Box>
            <Image
              src={image}
              alt="bitcoin"
              data-testid="bitcoin-svg"
              height="42px"
              width="42px"
            />
          </Box>
          <Box>
            <Typography
              variant="body1"
              color={theme.palette.minet_text.high_emphasis}
            >
              {title}
            </Typography>
            <Typography
              variant="caption2"
              color={theme.palette.minet_text.medium_emphasis}
            >
              {subTitle.toUpperCase()}
            </Typography>
          </Box>
        </CryptoNameCard>
        <CorrelationInfoStack alignItems={'flex-end'} justifyContent={'center'}>
          <Typography>{convertToInterNationalSystem(amount)}</Typography>
          {variant !== 'wallet' && (
            <Typography variant="caption2" color={color} className={variant}>
              {variant === 'portfolio' ? sign : ''}
              {`${percentage.toString()}%`}
            </Typography>
          )}
        </CorrelationInfoStack>
      </Stack>
    </Box>
  );
};

export default CryptoCard;
