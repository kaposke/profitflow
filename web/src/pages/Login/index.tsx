import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next'

import { Container, LandingContent } from './styles';
import Logo from '../../components/Logo';
import CenteredLayout from '../../layouts/CenteredLayout';
import laptopMockup from '../../assets/images/laptopMockupProfitFlow.png'
import iphoneMockup from '../../assets/images/iphoneMockupProfitFlow.png'
import LoginForm from '../../components/LoginForm';

const Login: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <CenteredLayout>
      <Container>
        <LandingContent>
          <Logo />
          <h2>{t('landingSubtitle')}</h2>
          <p>{t('landingDescription')}</p>

          <div className="mockup-images">
            <div className='laptop-mockup'>
              <img src={laptopMockup} alt='Laptop Mockup' />
            </div>
            <div className="phone-mockup">
              <img src={iphoneMockup} alt='Phone Mockup' />
            </div>
          </div>
        </LandingContent>
        <div className="login">
          <LoginForm />
        </div>
      </Container>
    </CenteredLayout>
  );
}

export default Login;