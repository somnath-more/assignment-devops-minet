import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface CustomPalette {
    minet_text: Palette['primary'];
    minet_success: Palette['primary'];
    minet_warning: Palette['primary'];
    minet_error: Palette['primary'];
    minet_grey: Palette['primary'];
  }
  interface Palette extends CustomPalette {}

  interface CustomPaletteOptions {
    minet_text: PaletteOptions['primary'];
    minet_success: PaletteOptions['primary'];
    minet_warning: Palette['primary'];
    minet_error: PaletteOptions['primary'];
    minet_grey: PaletteOptions['primary'];
  }

  interface PaletteOptions extends CustomPaletteOptions {}

  interface CustomPaletteColor {
    light_emphasis?: string;
    medium_emphasis?: string;
    high_emphasis?: string;
    50?: string;
    100?: string;
    300?: string;
    500?: string;
    700?: string;
    900?: string;
  }

  interface PaletteColor extends CustomPaletteColor {}

  interface SimplePaletteColorOptions extends CustomPaletteColor {}

  interface CustomTypographyCSSProperties {
    button: React.CSSProperties;
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
    overline: React.CSSProperties;
    h4: React.CSSProperties;
    h6: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    subtitle1: React.CSSProperties;
    subtitle2: React.CSSProperties;
  }

  interface TypographyVariants {
    button: React.CSSProperties;
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
    overline: React.CSSProperties;
    h4: React.CSSProperties;
    h6: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    subtitle1: React.CSSProperties;
    subtitle2: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    button: React.CSSProperties;
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
    overline: React.CSSProperties;
    h4: React.CSSProperties;
    h6: React.CSSProperties;
    body1: React.CSSProperties;
    body2: React.CSSProperties;
    subtitle1: React.CSSProperties;
    subtitle2: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    button?: true;
    caption1?: true;
    caption2?: true;
    overline?: true;
    h4?: true;
    h6?: true;
    body1?: true;
    body2?: true;
    subtitle1?: true;
    subtitle2?: true;
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: '#FFFFFF',
    },
    primary: {
      main: '#0052FF',
      100: '#FAFCFF',
      300: '#66A1FF',
      500: '#0052FF',
      900: '#00177A',
      contrastText: '#FFFFFF',
    },
    minet_text: {
      main: '#7D7D89',
      light_emphasis: '#B2B2B9',
      medium_emphasis: '#7D7D89',
      high_emphasis: '#343446',
      contrastText: 'white',
    },
    minet_success: {
      main: '#46BF31',
      100: '#E9F7EC',
      500: '#46BF31',
    },
    minet_warning: {
      main: '#FFA74F',
      100: '#FFF6ED',
      300: '#FFA74F',
      contrastText: '#FFFFFF',
      light: '#FFF6ED',
      dark: '#FFA74F',
    },
    minet_error: {
      main: '#B71A33',
      100: '#F3E6EB',
      500: '#B71A33',
    },
    minet_grey: {
      main: '#ECECF7',
      50: '#F2F2F7',
      100: '#ECECF7',
      300: '#B4B4CF',
      500: '#4B4B60',
      700: '#252545',
      900: '#0E0E2E',
    },
  },
  typography: {
    fontFamily: 'Graphik',
    h4: {
      fontFamily: 'GraphikSemiBold',
      fontSize: '40px',
      lineHeight: '54px',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontFamily: 'GraphikRegular',
      fontSize: '24px',
      lineHeight: '34px',
      fontWeight: 400,
      letterSpacing: '0em',
    },
    subtitle1: {
      fontFamily: 'GraphikSemiBold',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '28px',
      letterSpacing: '0.1px',
    },
    subtitle2: {
      fontFamily: 'GraphikRegular',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '28px',
      letterSpacing: '0.1px',
    },
    body1: {
      fontFamily: 'GraphikRegular',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '22px',
      letterSpacing: '0.16px',
    },
    body2: {
      fontFamily: 'GraphikRegular',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '22px',
      letterSpacing: '0.16px',
    },
    button: {
      fontFamily: 'GraphikMedium',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '42px',
    },
    caption1: {
      fontFamily: 'GraphikMedium',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '16px',
    },
    caption2: {
      fontFamily: 'GraphikRegular',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '16px',
      letterSpacing: '0.01em',
    },
    overline: {
      fontFamily: 'GraphikRegular',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '14px',
      letterSpacing: '0.06px',
    },
  },
});

export default theme;
