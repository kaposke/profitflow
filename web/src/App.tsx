import React from 'react';
import { toast } from 'react-toastify';

import { ThemeContextProvider } from './contexts/theme';
import { GlobalStyle } from './styles/global'
import { AuthProvider } from './contexts/auth';
import Routes from './routes';

toast.configure({
  position: "bottom-left",
  hideProgressBar: true,
});

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
