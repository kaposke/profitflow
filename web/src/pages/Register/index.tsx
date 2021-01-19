import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Container, HeaderContainer, HeaderContent, HeaderInfo, BodyContent } from './styles';
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
    <Container>
      <div id='top' />
      <HeaderContainer>
        <HeaderContent>
          <Link to='/login' className='signIn-button'>{t('signIn')} <FiLogIn /></Link>
          <HeaderInfo>
            <Logo />
            <h2>{t('landingSubtitle')}</h2>
            <p>{t('landingDescription')}</p>

            <div className="mockup-images">
              <img src={mockups} alt='Laptop Mockup' />
            </div>
          </HeaderInfo>
          <div id='register' className="register">
            <RegisterForm />
          </div>
        </HeaderContent>
      </HeaderContainer>

      <CenteredLayout>
        <BodyContent>
          <h3><Trans i18nKey='landingBodyTitle'><span className='green'></span><span className='red'></span></Trans></h3>
          <p><Trans i18nKey='landingBodyDescription'><span className='green'></span><span className='red'></span></Trans></p>
          <p><Trans i18nKey='landingBodyListDescription'><span className='green'></span><span className='red'></span></Trans></p>
          <ul>
            <li>{t('landingBodyListItem1')}</li>
            <li>{t('landingBodyListItem2')}</li>
            <li>{t('landingBodyListItem3')}</li>
            <li>{t('landingBodyListItem4')}</li>
          </ul>

          <p className='disclaimer'><Trans i18nKey='landingBodyDisclaimer'><span className='green'></span><span className='red'></span><a href='#top'></a></Trans></p>
        </BodyContent>
      </CenteredLayout>
    </Container>
  );
}

export default Register;