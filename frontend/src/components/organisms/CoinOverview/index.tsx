import { Box, Stack } from '@mui/material';
import Typography from 'components/atoms/Typography';
import Graph, { IGraphProps } from 'components/molecules/Graph';
import website from '../../../../public/assets/icons/website.svg';
import paper from '../../../../public/assets/icons/paperwork.svg';
import CryptoCard from 'components/molecules/CryptoCard';
import theme from '../../../theme';
import PortfolioValueCard, {
  IPortfolioProps,
} from 'components/molecules/PortfolioValueCard';
import Icon from 'components/atoms/Icon';
import styled from '@emotion/styled';
import { CartesianGrid, XAxis } from 'recharts';
import {
  PriceCorrelations,
  Coin_Overview_Heading,
  Coin_Overview_Sub_Heading,
} from 'utils/constants';

export interface CoinOverviewProps {
  portfolioProps: IPortfolioProps;
  graphProps: IGraphProps;
}
const StyledTypoBox = styled(Box)({
  width: '70%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const StyledPriceCorrelationBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '30%',
  gap: '16px',
  padding: '16px 0px 16px 2px',
  borderRadius: '4px',
  border: `1px solid ${theme.palette.minet_grey[100]}`,
  background: theme.palette.background.default,
});
const MainDiv = styled.div({
  width: '100%',
  maxHeight: '250px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.minet_grey[300],
    borderRadius: '3px',
  },
});
const StyledOuterBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  borderRadius: '4px',
  background: theme.palette.background.default,
  border: `1px solid ${theme.palette.minet_grey[100]}`,
  padding: '1.5rem',
});

const CoinOverview = ({ portfolioProps, graphProps }: CoinOverviewProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: '1.5rem',
      }}
    >
      <StyledOuterBox>
        <PortfolioValueCard {...portfolioProps} />
        <Box width="100%" height="268px">
          <Graph {...graphProps}>
            <CartesianGrid
              vertical={false}
              stroke={theme.palette.minet_grey[300]}
            />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
          </Graph>
        </Box>
      </StyledOuterBox>

      <Stack
        flexDirection={'row'}
        gap={'24px'}
        justifyContent={'space-between'}
        paddingTop={'1.5rem'}
        paddingBottom={'2rem'}
      >
        <StyledTypoBox>
          <Stack>
            <Typography
              variant="body1"
              color={theme.palette.minet_text.high_emphasis}
              marginBottom={'.5rem'}
            >
              <b>{Coin_Overview_Heading}</b>
            </Typography>
            <Typography variant="body2" width="100%" marginBottom={'1.5rem'}>
              {Coin_Overview_Sub_Heading}
            </Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                variant="body1"
                color={theme.palette.minet_text.high_emphasis}
              >
                <b>Resources</b>
              </Typography>
              <Stack direction={'row'} alignItems={'center'}>
                <Icon src={website} alt="website" />
                <Typography variant="body2" color={theme.palette.primary[500]}>
                  Official Website
                </Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'}>
                <Icon src={paper} alt="paper" />
                <Typography variant="body2" color={theme.palette.primary[500]}>
                  White Paper
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </StyledTypoBox>

        <StyledPriceCorrelationBox>
          <Stack>
            <Typography
              variant="subtitle1"
              sx={{ marginLeft: '24px',marginBottom: '.5rem'}}
              color={theme.palette.minet_text.high_emphasis}
            >
              Price correlation with
            </Typography>
            <MainDiv>
              {PriceCorrelations.map((option) => (
                <Box key={option.title}>
                  <CryptoCard
                    variant="correlation"
                    amount={option.amount}
                    image={option.image}
                    title={option.title}
                    subTitle={option.subTitle}
                    percentage={option.percentage}
                  />
                </Box>
              ))}
            </MainDiv>
          </Stack>
        </StyledPriceCorrelationBox>
      </Stack>
    </Box>
  );
};

export default CoinOverview;
