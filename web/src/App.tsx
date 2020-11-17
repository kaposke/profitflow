import React from 'react';
import { ModalProvider } from 'styled-react-modal';

import './config/toast';
import './config/yup';

import { ThemeContextProvider } from './contexts/theme';
import { GlobalStyle } from './styles/global';
import { AuthProvider } from './contexts/auth';
import Routes from './routes';
import CookieConsentStyled from './components/CookieConsentStyled';

function App() {
  return (
    <ThemeContextProvider>
      <ModalProvider>

        <GlobalStyle />
        <AuthProvider>
          <Routes />
          <CookieConsentStyled />
        </AuthProvider>

      </ModalProvider>
    </ThemeContextProvider>
  );
}

export default App;
