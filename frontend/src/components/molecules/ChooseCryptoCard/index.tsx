import { Box, Stack, styled } from '@mui/material';
import Icon from 'components/atoms/Icon';
import Typography from 'components/atoms/Typography';
import theme from '../../../theme';
import tickIcon from '../../../../public/assets/icons/TickIcon.svg';

export interface ChooseCryptoProps {
  cryptoCardSrc: string;
  cryptoCardLabel: string;
  cryptoCardDescription: string;
  cryptoCardSelected?: true | false;
  onClick?: () => void;
}

const StyledBox = styled(Box)({
  width: '100%',
  borderRadius: '4px',
  padding: '24px',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  cursor: 'pointer',
});

const StyledStack = styled(Stack)({
  alignItems: 'center',
  flexDirection: 'column',
  display: 'flex',
});

const TickIcon = styled(Icon)({
  top: '8px',
  right: '5px',
  position: 'absolute',
});
const ChooseCryptoCard = ({
  cryptoCardSrc,
  cryptoCardLabel,
  cryptoCardDescription,
  cryptoCardSelected,
  onClick,
}: ChooseCryptoProps) => {
  return (
    <StyledBox
      data-testid="styled-box"
      sx={{ border: cryptoCardSelected ? '2px solid blue' : 'none' }}
      onClick={onClick}
      key={cryptoCardLabel}
    >
      <StyledStack>
        <Icon
          src={cryptoCardSrc}
          alt={cryptoCardLabel}
          width="56px"
          height="56px"
        />
        <Typography
          variant="body1"
          color={theme.palette.minet_grey[500]}
          style={{
            paddingBottom: '10px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {cryptoCardLabel}
        </Typography>
        <Typography
          variant="caption1"
          color={theme.palette.minet_text.medium_emphasis}
          style={{ paddingBottom: '10px' }}
        >
          {cryptoCardDescription}
        </Typography>
      </StyledStack>
      {cryptoCardSelected && (
        <TickIcon src={tickIcon} width="34.407px" height="30.439px" />
      )}
    </StyledBox>
  );
};

export default ChooseCryptoCard;
