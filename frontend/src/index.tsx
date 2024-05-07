import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { CssBaseline } from '@mui/material';
import ContextProvider from './context';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Auth0Provider
    domain={process.env.DOMAIN}
    clientId={process.env.CLIENTID}
    authorizationParams={{
      redirect_uri: window.location.origin + '/authentication',
    }}
  >
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ContextProvider>
    </ThemeProvider>
  </Auth0Provider>
);
