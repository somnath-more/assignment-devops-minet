import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material';

export type TypographyProps = MuiTypographyProps;

const Typography = (props: TypographyProps) => {
  return <MuiTypography {...props}>{props.children}</MuiTypography>;
};

export default Typography;
