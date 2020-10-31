import React from 'react';
import { useTranslation } from 'react-i18next';

import { Container, LandingContent } from './styles';
import CenteredLayout from '../../layouts/CenteredLayout';
import RegisterForm from '../../components/RegisterForm'
// import laptopMockup from '../../assets/images/laptopMockupProfitFlow.png'
// import iphoneMockup from '../../assets/images/iphoneMockupProfitFlow.png'
import mockups from '../../assets/images/profitFlowMockups.png'
import Logo from '../../components/Logo';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

const Register: React.FC = () => {
  const { t } = useTranslation();

  return (
    <CenteredLayout>
      <Container>
        <Link to='/login' className='signIn-button'>{t('signIn')} <FiLogIn /></Link>
        <LandingContent>
          <Logo />
          <h2>{t('landingSubtitle')}</h2>
          <p>{t('landingDescription')}</p>

          <div className="mockup-images">
            <img src={mockups} alt='Laptop Mockup' />
          </div>
        </LandingContent>
        <div className="register">
          <RegisterForm />
        </div>
      </Container>
    </CenteredLayout>
  );
}

export default Register;