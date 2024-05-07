import { Box, Stack, styled } from '@mui/material';
import Typography from 'components/atoms/Typography';

import theme from '../../../theme';
import CustomButton from 'components/atoms/Button';
import ArrowButtonIcon from '../../../../public/assets/icons/chevron-down.svg';
import Icon from 'components/atoms/Icon';

export interface FooterProps {
  label: string;
  career: string;
  privacy: string;
  copyright: string;
  language: string;
  help: string;
}
const StyledStack = styled(Stack)({
  top: '1080px',
  left: '80px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});
const StyledNavBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '24px',
  flexGrow: 1,
});

const StyleFooterSubBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '24px',
  paddingRight: '1rem',
});
const Footer = ({
  label,
  career,
  privacy,
  copyright,
  language,
  help,
}: FooterProps) => {
  return (
    <StyledStack>
      <StyledNavBox>
        <Typography variant="body2" color={theme.palette.primary[500]}>
          {label}
        </Typography>
        <Typography variant="body2" color={theme.palette.primary[500]}>
          {career}
        </Typography>
        <Typography variant="body2" color={theme.palette.primary[500]}>
          {privacy}
        </Typography>
        <Typography
          variant="body2"
          color={theme.palette.minet_text.high_emphasis}
        >
          {copyright}
        </Typography>
      </StyledNavBox>
      <StyleFooterSubBox>
        <CustomButton
          variant="outlined"
          style={{
            display: 'flex',
            height: '42px',
            width: '170px',
            borderRadius: '4px',
            padding: '4px 12px',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderColor: `${theme.palette.minet_grey[100]}`,
            color: `${theme.palette.minet_text.high_emphasis}`,
          }}
          endIcon={<Icon src={ArrowButtonIcon}></Icon>}
        >
          {language}
        </CustomButton>
        <CustomButton
          variant="outlined"
          sx={{ width: '109px', height: '42px', borderRadius: '4px' }}
        >
          {help}
        </CustomButton>
      </StyleFooterSubBox>
    </StyledStack>
  );
};

export default Footer;
