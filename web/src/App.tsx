import React from 'react';

import './config/toast';
import './config/yup';

import { ThemeContextProvider } from './contexts/theme';
import { GlobalStyle } from './styles/global'
import { AuthProvider } from './contexts/auth';
import Routes from './routes';


function App() {
  return (
    <ThemeContextProvider>

      <GlobalStyle />
      <AuthProvider>
        <Routes />
      </AuthProvider>
      
    </ThemeContextProvider>
  );
}

export default App;
