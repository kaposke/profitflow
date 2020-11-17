import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CenteredLayout from '../../layouts/CenteredLayout';
import AppCard from '../AppCard';
import Button from '../Button';

import { Container } from './styles';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <CenteredLayout>
        <Container>
          <AppCard>
            <div dangerouslySetInnerHTML={
              { __html: t('privacyPolicy') }
            }></div>
            <Link to='/'><Button>{t('back')}</Button></Link>
          </AppCard>
        </Container>
      </CenteredLayout>
    </div>
  );
}

export default PrivacyPolicy;