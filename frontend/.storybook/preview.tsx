import type { Preview } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import theme from '../src/theme/index';
import '../src/index.css';
import React from 'react';
const minetViewPort = {
  minetPay: {
    name: 'minetPay',
    styles: {
      width: '1440px',
      height: '768px',
    },
  },
};
export const withMuiTheme = (Story) => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <Story />
    </BrowserRouter>
  </ThemeProvider>
);

export const decorators = [withMuiTheme];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
