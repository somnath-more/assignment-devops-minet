import { Box, Stack, styled } from '@mui/material';
import Typography from 'components/atoms/Typography';
import Image from 'components/atoms/Image';
import theme from 'theme';

export interface CustomProps {
  logo: string;
  alt: string;
  label: string;
  onClick?: () => void;
}

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '157.33px',
  height: '96px',
  borderRadius: '12px',
  border: `1px solid ${theme.palette.minet_grey[100]}`,
  gap: '8px',
  backgroundColor: theme.palette.primary[100],
});

const StyleStack = styled(Stack)({
  alignItems: 'center',
  padding: '20px 40px',
});

const StyleLogo = styled(Image)({
  width: '20px',
  height: '20px',
});

const LogoTypography = ({ logo, alt, label, onClick }: CustomProps) => {
  return (
    <StyledBox onClick={onClick}>
      <StyleStack>
        <StyleLogo src={logo} alt={alt}></StyleLogo>
        <Typography
          variant="body1"
          aria-label={label}
          color={theme.palette.minet_text.medium_emphasis}
        >
          {label}
        </Typography>
      </StyleStack>
    </StyledBox>
  );
};

export default LogoTypography;
