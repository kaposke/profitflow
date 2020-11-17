import React, { useContext } from 'react';
import CookieConsent from "react-cookie-consent";
import { ThemeContext } from 'styled-components'

// import { Container } from './styles';

const CookieConsentStyled: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <CookieConsent
      style={{
        background: themeContext.colors.card,
        color: themeContext.colors.text
      }}

      buttonStyle={{
        background: themeContext.colors.green,
        color: themeContext.colors.textLight,
      }}
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
}

export default CookieConsentStyled;