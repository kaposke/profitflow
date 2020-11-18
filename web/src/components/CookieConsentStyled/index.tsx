import React, { useContext } from 'react';
import CookieConsent from "react-cookie-consent";
import { useTranslation } from 'react-i18next';
import { ThemeContext } from 'styled-components'

// import { Container } from './styles';

const CookieConsentStyled: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const { t } = useTranslation();

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

      buttonText={t('cookieConsentButton')}
    >
      {t('cookieWarning')}
    </CookieConsent>
  );
}

export default CookieConsentStyled;