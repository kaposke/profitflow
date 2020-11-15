import React, { useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SpiralSpinner } from 'react-spinners-kit'

import AppCard from '../../components/AppCard';
import Logo from '../../components/Logo';
import { useAuth } from '../../contexts/auth';
import VerificationService from '../../services/account-verification.service'

import { Container } from './styles';

const Verify: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { saveAuthCredentials } = useAuth();
  const themeContext = useContext(ThemeContext);

  const token = new URLSearchParams(useLocation().search).get('token');

  useEffect(() => {
    async function verifyAccount() {
      if (!token)
        return;

      const response = await VerificationService.verify(token);
      const { token: authToken, name, email, verified } = response.data;

      saveAuthCredentials(authToken, name, email, verified);
      history.push('/');
    }

    verifyAccount();
  }, [history, saveAuthCredentials, token]);

  return (
    <Container>
      <AppCard>
        <Logo />
        <div className="content">
          <p>{t('verifyingAccount')}</p>
          <SpiralSpinner backColor={themeContext.colors.green} frontColor={themeContext.colors.red} />
        </div>
      </AppCard>
    </Container>
  );
}

export default Verify;