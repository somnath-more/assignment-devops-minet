import { Box, Divider, styled } from '@mui/material';
import CustomButton from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Typography from 'components/atoms/Typography';
import theme from 'theme';
import AvatarDropDown from '../../../../public/assets/icons/avatardropdown.svg';

export interface HeaderProps {
  title: string;
  isButtonRequired: boolean;
  onClickBuyButton?: () => void;
  onClickSellButton?: () => void;
}

const StyledButtonBox = styled(Box)({
  justifyContent: 'flex-start',
  display: 'flex',
  flexDirection: 'row',
  gap: '12px',
});
const StyledOuterBox = styled(Box)({
  display: 'flex',
  height: '100%',
  padding: '20px 24px',
  justifyContent: 'space-between',
  alignContent: 'center',
  backgroundColor: theme.palette.background.default,
});
const StyledLeftBox = styled(Box)({
  justifyContent: 'flex-start',
  display: 'flex',
  alignItems: 'center',
  gap: '21px',
});
const StyeledAvatarBox = styled(Box)({
  justifyContent: 'flex-start',
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
});

const StyledTypoBox = styled(Box)({
  marginTop: '5px',
});

const Header = ({
  title,
  isButtonRequired,
  onClickBuyButton,
  onClickSellButton,
}: HeaderProps) => {
  return (
    <StyledOuterBox>
      <StyledTypoBox>
        <Typography variant="h6" color={theme.palette.minet_text.high_emphasis}>
          {title}
        </Typography>
      </StyledTypoBox>
      <StyledLeftBox>
        {isButtonRequired && (
          <StyledButtonBox>
            <CustomButton
              variant="contained"
              onClick={onClickSellButton}
              sx={{
                width: '120px',
                height: '42px',
                padding: '0px 16px',
                borderRadius: '4px',
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: theme.palette.minet_warning[300],
                boxShadow: 'none',
                fontWeight: 'bold',
                fontVariant: 'body1',
                border: '1px',
                '&:hover': {
                  backgroundColor: theme.palette.minet_warning[300],
                },
              }}
            >
              SELL
            </CustomButton>
            <CustomButton
              variant="contained"
              onClick={onClickBuyButton}
              sx={{
                width: '120px',
                height: '42px',
                padding: '0px 16px',
                borderRadius: '4px',
                justifyContent: 'center',
                alignContent: 'center',
                boxShadow: 'none',
                backgroundColor: theme.palette.primary[500],
                fontWeight: 'bold',
                fontVariant: 'body1',
                border: '1px',
              }}
            >
              BUY
            </CustomButton>
          </StyledButtonBox>
        )}
        <Divider orientation="vertical" variant="middle" flexItem />
        <StyeledAvatarBox>
          <Icon src={AvatarDropDown} alt="AvatarDropDown" />
        </StyeledAvatarBox>
      </StyledLeftBox>
    </StyledOuterBox>
  );
};

export default Header;
