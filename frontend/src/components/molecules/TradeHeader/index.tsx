import { Box } from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';
import Image from '../../atoms/Image';
import CustomButton from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import WatchList from '../../../../public/assets/icons/watchlist star.svg';
import Typography from '../../atoms/Typography';
import ArrowImg from '../../../../public/assets/icons/Vector.svg';
import Divider from '../../../../public/assets/images/Divider.svg';
import theme from '../../../theme';

export interface ITradeHeader {
  iconSrc: string;
  coinName: string;
  coinSymbol: string;
  coinValue: number;
  marketCapValue: string;
  volumeValue: string;
  circulatingSupplyValue: string;
}

const StyledContainer = styled(Box)({
  border: `1px solid ${theme.palette.minet_grey.main}`,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '24px',
  borderRadius: '4px',
  width: '100%',
  flexWrap: 'wrap'
});

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap'
});

const StyledBitCoinBox = styled(Box)({
  paddingLeft: '15px',
});

const StyledInnerBox = styled(Box)({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
});

const StyledValueBox = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap'
});

const CustomData = styled(Box)({
  marginTop: '4px',
  paddingLeft: '24px',
});

const TradeHeader: React.FC<ITradeHeader> = ({
  iconSrc,
  coinName,
  coinSymbol,
  coinValue,
  marketCapValue,
  volumeValue,
  circulatingSupplyValue,
}) => {
  return (
    <StyledContainer>
      <StyledBox>
        <Image src={iconSrc} alt="coinName" width="49px" height="49px" />
        <StyledBitCoinBox>
          <Typography
            variant="h6"
            style={{ color: theme.palette.minet_text.high_emphasis }}
          >
            {coinName}
          </Typography>
          <StyledInnerBox>
            <Typography
              variant="body1"
              style={{ color: theme.palette.minet_text.medium_emphasis }}
            >
              {coinSymbol}
            </Typography>
            <Icon src={ArrowImg} />
            <Typography
              variant="overline"
              style={{
                color:
                  coinValue > 0
                    ? theme.palette.minet_success[500]
                    : theme.palette.minet_error[500],
              }}
            >
              {coinValue >= 0 ? `+${coinValue}%` : `${coinValue}%`}
            </Typography>
          </StyledInnerBox>
        </StyledBitCoinBox>
        <Image
          src={Divider}
          style={{ paddingLeft: '24px', marginTop: '4px' }}
        />
        <StyledValueBox>
          <CustomData>
            <Typography
              variant="caption1"
              style={{ color: theme.palette.minet_text.medium_emphasis }}
            >
              Market Cap
            </Typography>
            <Typography
              variant="body1"
              style={{ color: theme.palette.minet_text.high_emphasis }}
            >
              {marketCapValue}
            </Typography>
          </CustomData>
          <CustomData>
            <Typography
              variant="caption1"
              style={{ color: theme.palette.minet_text.medium_emphasis }}
            >
              Vol. 24H
            </Typography>
            <Typography
              variant="body1"
              style={{ color: theme.palette.minet_text.high_emphasis }}
            >
              {volumeValue}
            </Typography>
          </CustomData>
          <CustomData>
            <Typography
              variant="caption1"
              style={{ color: theme.palette.minet_text.medium_emphasis }}
            >
              Circulating Supply
            </Typography>
            <Typography
              variant="body1"
              style={{ color: theme.palette.minet_text.high_emphasis }}
            >
              {circulatingSupplyValue}
            </Typography>
          </CustomData>
        </StyledValueBox>
      </StyledBox>
      <Box>
        <CustomButton variant="outlined" startIcon={<Icon src={WatchList} />}>
          ADD TO WATCHLIST
        </CustomButton>
      </Box>
    </StyledContainer>
  );
};

export default TradeHeader;
